#!/usr/bin/env python3
"""Build DECK_LBS_PER_SQ mapping from Deck Weights.xlsx.

Usage:
  python3 tools/build_weights.py

Reads sheet: Canam Deck Catalog
Writes: weights.js in project root
"""

from __future__ import annotations

import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

NS_MAIN = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NS_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
NS_PKG_REL = "http://schemas.openxmlformats.org/package/2006/relationships"


def col_to_index(cell_ref: str) -> int:
    letters = "".join(ch for ch in cell_ref if ch.isalpha())
    total = 0
    for ch in letters:
        total = total * 26 + (ord(ch.upper()) - 64)
    return total


def parse_shared_strings(zf: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in zf.namelist():
        return []

    root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
    strings: list[str] = []
    for si in root.findall(f"{{{NS_MAIN}}}si"):
        parts = [t.text or "" for t in si.findall(f".//{{{NS_MAIN}}}t")]
        strings.append("".join(parts))
    return strings


def parse_cell_value(cell: ET.Element, shared_strings: list[str]) -> str:
    value_node = cell.find(f"{{{NS_MAIN}}}v")
    if value_node is None or value_node.text is None:
        return ""

    raw = value_node.text
    if cell.attrib.get("t") == "s":
        return shared_strings[int(raw)]
    return raw


def read_sheet_rows(zf: zipfile.ZipFile, sheet_name: str) -> list[dict[str, str]]:
    workbook = ET.fromstring(zf.read("xl/workbook.xml"))

    sheet_rel_id = None
    for sheet in workbook.findall(f".//{{{NS_MAIN}}}sheet"):
        if sheet.attrib.get("name") == sheet_name:
            sheet_rel_id = sheet.attrib.get(f"{{{NS_REL}}}id")
            break

    if not sheet_rel_id:
        raise RuntimeError(f"Sheet '{sheet_name}' not found")

    rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
    sheet_target = None
    for rel in rels.findall(f"{{{NS_PKG_REL}}}Relationship"):
        if rel.attrib.get("Id") == sheet_rel_id:
            sheet_target = rel.attrib.get("Target")
            break

    if not sheet_target:
        raise RuntimeError(f"Relationship for sheet '{sheet_name}' not found")

    sheet_path = f"xl/{sheet_target}"
    worksheet = ET.fromstring(zf.read(sheet_path))
    shared_strings = parse_shared_strings(zf)

    rows: list[dict[str, str]] = []
    for row in worksheet.findall(f".//{{{NS_MAIN}}}sheetData/{{{NS_MAIN}}}row"):
        row_values: dict[str, str] = {}
        for cell in row.findall(f"{{{NS_MAIN}}}c"):
            ref = cell.attrib.get("r", "")
            row_values[ref] = parse_cell_value(cell, shared_strings)
        rows.append(row_values)
    return rows


def normalize_number(value: str) -> float | None:
    if value is None:
        return None
    text = str(value).strip()
    if text == "":
        return None
    text = text.replace(",", "")
    try:
        return float(text)
    except ValueError:
        return None


def stringify_number(value: float) -> int | float:
    if abs(value - round(value)) < 1e-9:
        return int(round(value))
    return round(value, 4)


def canonical_key(depth: str, profile: str, gage: str) -> str:
    depth_text = str(depth or "").strip()
    profile_text = str(profile or "").strip()
    gage_text = str(gage or "").strip()

    if depth_text.endswith(".0"):
        depth_text = depth_text[:-2]

    profile_text = profile_text.replace(" ", "")
    return f"{depth_text}{profile_text}{gage_text}".upper()


def build_mapping(rows: list[dict[str, str]]) -> dict[str, dict[str, int]]:
    header_row = None
    for row in rows:
        values = [v.strip() for v in row.values() if v.strip()]
        if "CONCAT" in values and "UNC" in values and "G30" in values and "G60" in values and "G90" in values:
            header_row = row
            break

    if header_row is None:
        raise RuntimeError("Could not locate header row containing CONCAT/UNC/G30/G60/G90")

    col_by_header: dict[str, list[int]] = {}
    for ref, value in header_row.items():
        header = value.strip().upper()
        if header in {"DEPTH", "PROFILE", "GAUGE", "UNC", "G30", "G60", "G90"}:
            col_by_header.setdefault(header, []).append(col_to_index(ref))

    needed = {"DEPTH", "PROFILE", "GAUGE", "UNC", "G30", "G60", "G90"}
    missing = needed.difference(col_by_header.keys())
    if missing:
        raise RuntimeError(f"Missing required columns: {sorted(missing)}")

    for key in col_by_header:
        col_by_header[key].sort()

    depth_col = col_by_header["DEPTH"][0]
    # Use the first PROFILE column (VULCRAFT PROFILE).
    profile_col = col_by_header["PROFILE"][0]
    gage_col = col_by_header["GAUGE"][0]
    finish_cols = {
        "UNC": col_by_header["UNC"][0],
        "G30": col_by_header["G30"][0],
        "G60": col_by_header["G60"][0],
        "G90": col_by_header["G90"][0],
    }

    mapping: dict[str, dict[str, int]] = {}

    def get_by_col(row: dict[str, str], col_index: int) -> str:
        for ref, val in row.items():
            if col_to_index(ref) == col_index:
                return val
        return ""

    for row in rows:
        depth_raw = get_by_col(row, depth_col).strip()
        profile_raw = get_by_col(row, profile_col).strip()
        gage_raw = get_by_col(row, gage_col).strip()

        if depth_raw == "" or profile_raw == "" or gage_raw == "":
            continue

        key = canonical_key(depth_raw, profile_raw, gage_raw)

        finish_map: dict[str, int] = {}
        for finish, col_index in finish_cols.items():
            raw = get_by_col(row, col_index)
            num = normalize_number(raw)
            if num is not None:
                finish_map[finish] = int(round(num))

        if finish_map:
            mapping[key] = finish_map

    return dict(sorted(mapping.items(), key=lambda kv: kv[0]))


def write_weights_js(output_path: Path, mapping: dict[str, dict[str, int | float]]) -> None:
    content = (
        "// Auto-generated by tools/build_weights.py\n"
        "// Command: python3 tools/build_weights.py\n"
        "const DECK_LBS_PER_SQ = "
        + json.dumps(mapping, indent=2, ensure_ascii=True)
        + ";\n\n"
        "window.DECK_LBS_PER_SQ = DECK_LBS_PER_SQ;\n"
    )
    output_path.write_text(content, encoding="utf-8")


def main() -> int:
    project_root = Path(__file__).resolve().parents[1]
    workbook_path = project_root / "Deck Weights.xlsx"
    output_path = project_root / "weights.js"

    if not workbook_path.exists():
        print("ERROR: Deck Weights.xlsx not found in project root", file=sys.stderr)
        return 1

    with zipfile.ZipFile(workbook_path) as zf:
        rows = read_sheet_rows(zf, "Canam Deck Catalog")

    mapping = build_mapping(rows)
    write_weights_js(output_path, mapping)
    print(f"Wrote {output_path} with {len(mapping)} keys")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
