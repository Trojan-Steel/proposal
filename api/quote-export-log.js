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
      quote_ref: normalizeText(snapshot.quoteRef),
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

    const { data: exportRows, error: exportError, status: exportStatus } = await supabase
      .from("quote_exports")
      .insert([row])
      .select("id")
      .limit(1);

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
      return res.status(500).json({ ok: false, error: "Failed to write export row." });
    }

    const exportId = Array.isArray(exportRows) && exportRows[0] ? exportRows[0].id : null;
    if (!exportId) {
      return res.status(500).json({ ok: false, error: "Failed to resolve export row id." });
    }

    return res.status(200).json({ ok: true, export_id: exportId, export_uuid: exportUuid });
  } catch (error) {
    console.error("quote-export-log failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
};
