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

function toNumberOrZero(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function normalizeText(value) {
  return String(value || "").trim();
}

function isMissingSchemaError(error) {
  const code = String(error?.code || "");
  const message = String(error?.message || "");
  return code === "42P01" || code === "42703" || /does not exist|column/i.test(message);
}

async function insertDetailRows(supabase, tableName, rows, operationLabel) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return { ok: true, skipped: true, inserted: 0 };
  }
  const { error } = await supabase.from(tableName).insert(rows);
  if (!error) {
    return { ok: true, inserted: rows.length };
  }
  if (isMissingSchemaError(error)) {
    console.warn("quote-export-log: detail table missing, skipped", {
      operation: operationLabel,
      table: tableName,
      code: error.code || "",
      message: error.message || "",
    });
    return { ok: true, skipped: true, inserted: 0 };
  }
  return { ok: false, error, inserted: 0 };
}

function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
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
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const payload = await readRequestJson(req);
    const header = isPlainObject(payload?.header) ? payload.header : null;
    const snapshot = isPlainObject(header?.snapshot_json) ? header.snapshot_json : null;
    const exportUuid = normalizeText(header?.export_uuid);
    if (!header || !snapshot || !exportUuid) {
      return res.status(400).json({ ok: false, error: "Missing header payload or export_uuid." });
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
      app_version: normalizeText(header.app_version || "web-1"),
      snapshot_json: snapshot,
    };

    let insertResult = await supabase.from("quote_exports").insert([row]).select("id").limit(1);
    let { data: exportRows, error: exportError, status: exportStatus } = insertResult;

    // Schema-tolerant fallback in case optional columns are missing in production.
    if (exportError && /project_location|column/i.test(String(exportError.message || ""))) {
      const fallbackRow = { ...row };
      delete fallbackRow.project_location;
      insertResult = await supabase.from("quote_exports").insert([fallbackRow]).select("id").limit(1);
      exportRows = insertResult.data;
      exportError = insertResult.error;
      exportStatus = insertResult.status;
    }

    if (exportError) {
      if (String(exportError.code || "") === "23505") {
        return res.status(200).json({ ok: true, duplicate: true, export_uuid: exportUuid });
      }
      console.error("quote-export-log: export upsert failed", {
        operation: "quote_exports.insert",
        status: exportStatus,
        code: exportError.code || "",
        message: exportError.message || "",
        details: exportError.details || "",
      });
      return res.status(500).json({ ok: false, error: `Failed to write export row (${exportError.code || "unknown"}).` });
    }

    const exportId = Array.isArray(exportRows) && exportRows[0] ? exportRows[0].id : null;
    if (!exportId) {
      return res.status(500).json({ ok: false, error: "Failed to resolve export row id." });
    }

    const deckLines =
      Array.isArray(snapshot.deckLines) && snapshot.deckLines.length > 0
        ? snapshot.deckLines
        : Array.isArray(snapshot?.proposalData?.deckLines)
          ? snapshot.proposalData.deckLines
          : [];
    const joistLines =
      Array.isArray(snapshot.joistLines) && snapshot.joistLines.length > 0
        ? snapshot.joistLines
        : Array.isArray(snapshot?.proposalData?.joistLines)
          ? snapshot.proposalData.joistLines
          : [];
    const pricingLines = Array.isArray(snapshot.pricingLines) ? snapshot.pricingLines : [];

    const deckPayload = deckLines.map((line, index) => ({
      export_id: exportId,
      row_index: index,
      line_type: normalizeText(line.type),
      manufacturer: normalizeText(line.manufacturer),
      sqs: toNumberOrZero(line.sqs),
      tons: toNumberOrZero(line.tons),
      units: toNumberOrZero(line.units),
      raw_json: line,
    }));
    const joistPayload = joistLines.map((line, index) => ({
      export_id: exportId,
      row_index: index,
      description: normalizeText(line.description),
      manufacturer: normalizeText(line.manufacturer),
      units: toNumberOrZero(line.units),
      tons: toNumberOrZero(line.tons),
      raw_json: line,
    }));
    const pricingPayload = pricingLines.map((line, index) => ({
      export_id: exportId,
      row_index: index,
      label: normalizeText(line.label),
      amount: toNumberOrZero(line.amount),
      raw_json: line,
    }));

    const deckInsert = await insertDetailRows(
      supabase,
      "quote_export_deck_lines",
      deckPayload,
      "quote_export_deck_lines.insert",
    );
    if (!deckInsert.ok) {
      console.error("quote-export-log: deck detail insert failed", {
        operation: "quote_export_deck_lines.insert",
        code: deckInsert.error.code || "",
        message: deckInsert.error.message || "",
      });
    }
    const joistInsert = await insertDetailRows(
      supabase,
      "quote_export_joist_lines",
      joistPayload,
      "quote_export_joist_lines.insert",
    );
    if (!joistInsert.ok) {
      console.error("quote-export-log: joist detail insert failed", {
        operation: "quote_export_joist_lines.insert",
        code: joistInsert.error.code || "",
        message: joistInsert.error.message || "",
      });
    }
    const pricingInsert = await insertDetailRows(
      supabase,
      "quote_export_pricing_lines",
      pricingPayload,
      "quote_export_pricing_lines.insert",
    );
    if (!pricingInsert.ok) {
      console.error("quote-export-log: pricing detail insert failed", {
        operation: "quote_export_pricing_lines.insert",
        code: pricingInsert.error.code || "",
        message: pricingInsert.error.message || "",
      });
    }

    return res.status(200).json({
      ok: true,
      export_id: exportId,
      export_uuid: exportUuid,
      detail: {
        deck_rows_requested: deckPayload.length,
        joist_rows_requested: joistPayload.length,
        pricing_rows_requested: pricingPayload.length,
        deck_rows_inserted: deckInsert.inserted || 0,
        joist_rows_inserted: joistInsert.inserted || 0,
        pricing_rows_inserted: pricingInsert.inserted || 0,
      },
    });
  } catch (error) {
    console.error("quote-export-log failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
};
