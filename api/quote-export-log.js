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
    const snapshot = isPlainObject(payload?.snapshot) ? payload.snapshot : null;
    const exportUuid = normalizeText(payload?.export_uuid || snapshot?.export_uuid);
    if (!snapshot || !exportUuid) {
      return res.status(400).json({ ok: false, error: "Missing snapshot/export_uuid." });
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
      project_name: normalizeText(snapshot.projectName),
      selected_option_name: normalizeText(snapshot.selectedOptionName),
      is_boost_on: Boolean(snapshot.isBoostOn),
      final_subtotal: toNumberOrZero(snapshot.finalSubtotal),
      total_margin_dollars: toNumberOrZero(snapshot.totalMarginDollars),
      total_margin_pct: toNumberOrZero(snapshot.totalMarginPct),
      deck_supplier: normalizeText(snapshot.deckSupplier),
      joist_supplier: normalizeText(snapshot.joistSupplier),
      app_version: normalizeText(snapshot.appVersion || "trojan-estimator-web"),
      snapshot_json: snapshot,
    };

    const { data: exportRows, error: exportError, status: exportStatus } = await supabase
      .from("quote_exports")
      .upsert(row, { onConflict: "export_uuid" })
      .select("id")
      .limit(1);

    if (exportError) {
      console.error("quote-export-log: export upsert failed", {
        operation: "quote_exports.upsert",
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

    const deckLines = Array.isArray(snapshot.deckLines) ? snapshot.deckLines : [];
    const joistLines = Array.isArray(snapshot.joistLines) ? snapshot.joistLines : [];
    const pricingLines = Array.isArray(snapshot.pricingLines) ? snapshot.pricingLines : [];

    await supabase.from("quote_export_deck_lines").delete().eq("export_id", exportId);
    await supabase.from("quote_export_joist_lines").delete().eq("export_id", exportId);
    await supabase.from("quote_export_pricing_lines").delete().eq("export_id", exportId);

    if (deckLines.length) {
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
      const { error } = await supabase.from("quote_export_deck_lines").insert(deckPayload);
      if (error) {
        console.error("quote-export-log: deck lines insert failed", {
          operation: "quote_export_deck_lines.insert",
          code: error.code || "",
          message: error.message || "",
        });
      }
    }

    if (joistLines.length) {
      const joistPayload = joistLines.map((line, index) => ({
        export_id: exportId,
        row_index: index,
        description: normalizeText(line.description),
        manufacturer: normalizeText(line.manufacturer),
        units: toNumberOrZero(line.units),
        tons: toNumberOrZero(line.tons),
        raw_json: line,
      }));
      const { error } = await supabase.from("quote_export_joist_lines").insert(joistPayload);
      if (error) {
        console.error("quote-export-log: joist lines insert failed", {
          operation: "quote_export_joist_lines.insert",
          code: error.code || "",
          message: error.message || "",
        });
      }
    }

    if (pricingLines.length) {
      const pricingPayload = pricingLines.map((line, index) => ({
        export_id: exportId,
        row_index: index,
        label: normalizeText(line.label),
        amount: toNumberOrZero(line.amount),
        raw_json: line,
      }));
      const { error } = await supabase.from("quote_export_pricing_lines").insert(pricingPayload);
      if (error) {
        console.error("quote-export-log: pricing lines insert failed", {
          operation: "quote_export_pricing_lines.insert",
          code: error.code || "",
          message: error.message || "",
        });
      }
    }

    return res.status(200).json({ ok: true, export_id: exportId, export_uuid: exportUuid });
  } catch (error) {
    console.error("quote-export-log failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
};
