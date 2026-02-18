const { createClient } = require("@supabase/supabase-js");

const MAX_BODY_BYTES = 3_000_000;

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

async function readRequestJson(req) {
  if (isPlainObject(req.body)) {
    return req.body;
  }
  if (typeof req.body === "string") {
    return req.body ? JSON.parse(req.body) : {};
  }
  if (Buffer.isBuffer(req.body)) {
    return req.body.length ? JSON.parse(req.body.toString("utf8")) : {};
  }
  const chunks = [];
  let totalBytes = 0;
  for await (const chunk of req) {
    totalBytes += chunk.length;
    if (totalBytes > MAX_BODY_BYTES) {
      throw new Error("Request body too large");
    }
    chunks.push(chunk);
  }
  if (!chunks.length) {
    return {};
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function normalizeText(value) {
  return String(value || "").trim();
}

function toNumberOrZero(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}
function toNumberOrNull(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}
function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !serviceRoleKey) {
    return null;
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed. Use POST." });
  }

  try {
    const payload = await readRequestJson(req);
    const exportUuid = normalizeText(payload?.export_uuid);
    const header = isPlainObject(payload?.header) ? payload.header : null;
    const snapshotJson = isPlainObject(payload?.snapshot_json) ? payload.snapshot_json : null;
    const lineItems = toArray(payload?.line_items);
    if (!exportUuid || !header || !snapshotJson) {
      return res.status(400).json({
        ok: false,
        error: "Missing required payload fields: export_uuid, header, snapshot_json.",
      });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return res.status(500).json({
        ok: false,
        error: "Supabase server environment not configured.",
      });
    }

    const row = {
      export_uuid: exportUuid,
      project_name: normalizeText(header.project_name),
      project_location: normalizeText(header.project_location),
      selected_option_name: normalizeText(header.selected_option_name),
      is_boost_on: Boolean(header.is_boost_on),
      final_subtotal: toNumberOrZero(header.final_subtotal),
      total_margin_dollars: toNumberOrZero(header.total_margin_dollars),
      total_margin_pct: toNumberOrZero(header.total_margin_pct),
      deck_supplier: normalizeText(header.deck_supplier),
      joist_supplier: normalizeText(header.joist_supplier),
      app_version: normalizeText(header.app_version),
      snapshot_json: snapshotJson,
    };

    const { error } = await supabase.from("quote_exports").upsert(row, { onConflict: "export_uuid" });
    if (error) {
      console.error("log-quote-export failed", {
        operation: "quote_exports.upsert",
        code: error.code || "",
        message: error.message || "",
        details: error.details || "",
      });
      return res.status(500).json({ ok: false, error: error.message || "Failed to write quote export." });
    }

    if (lineItems.length) {
      const { error: delErr } = await supabase.from("quote_line_items").delete().eq("export_uuid", exportUuid);
      if (delErr) {
        console.error("log-quote-export failed", {
          operation: "quote_line_items.delete",
          code: delErr.code || "",
          message: delErr.message || "",
          details: delErr.details || "",
        });
        return res.status(500).json({ ok: false, error: delErr.message || "Failed to reset line items." });
      }

      const cleanItems = lineItems
        .filter((li) => isPlainObject(li))
        .map((li, idx) => ({
          export_uuid: exportUuid,
          line_no: Number.isFinite(Number(li.line_no)) ? Number(li.line_no) : idx + 1,
          item_type: normalizeText(li.item_type),
          description: normalizeText(li.description),
          quantity: toNumberOrNull(li.quantity),
          uom: normalizeText(li.uom),
          weight_lbs: toNumberOrNull(li.weight_lbs),
          tons: toNumberOrNull(li.tons),
          unit_price: toNumberOrNull(li.unit_price),
          extended_price: toNumberOrNull(li.extended_price),
          unit_cost: toNumberOrNull(li.unit_cost),
          extended_cost: toNumberOrNull(li.extended_cost),
          margin: toNumberOrNull(li.margin),
          margin_pct: toNumberOrNull(li.margin_pct),
          supplier_key: normalizeText(li.supplier_key),
          deck_profile: normalizeText(li.deck_profile),
          deck_depth_in: toNumberOrNull(li.deck_depth_in),
          deck_width_in: toNumberOrNull(li.deck_width_in),
          deck_gauge: normalizeText(li.deck_gauge),
          deck_finish: normalizeText(li.deck_finish),
          deck_paint: normalizeText(li.deck_paint),
          deck_grade: toNumberOrNull(li.deck_grade),
          deck_measure_method: normalizeText(li.deck_measure_method),
          deck_sqs_count: Number.isFinite(Number(li.deck_sqs_count)) ? Number(li.deck_sqs_count) : null,
          joist_series: normalizeText(li.joist_series),
          joist_mark: normalizeText(li.joist_mark),
          joist_length_ft: toNumberOrNull(li.joist_length_ft),
          joist_qty: Number.isFinite(Number(li.joist_qty)) ? Number(li.joist_qty) : null,
          accessory_type: normalizeText(li.accessory_type),
          accessory_spec: normalizeText(li.accessory_spec),
          accessory_qty: toNumberOrNull(li.accessory_qty),
          spec_json: isPlainObject(li.spec_json) ? li.spec_json : {},
        }));

      if (cleanItems.length) {
        const { error: insErr } = await supabase.from("quote_line_items").insert(cleanItems);
        if (insErr) {
          console.error("log-quote-export failed", {
            operation: "quote_line_items.insert",
            code: insErr.code || "",
            message: insErr.message || "",
            details: insErr.details || "",
          });
          return res.status(500).json({ ok: false, error: insErr.message || "Failed to write line items." });
        }
      }
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unexpected server error.",
    });
  }
};
