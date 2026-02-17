const MAX_BODY_BYTES = 2_000_000;
const LINES_PER_PAGE = 46;
const CHARS_PER_LINE = 95;

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function formatMoney(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return "-";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatNumber(value, digits = 2) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return "-";
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(amount);
}

function safeText(value, fallback = "-") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function wrapText(text, maxChars = CHARS_PER_LINE) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [""];
  }
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars) {
      line = candidate;
      continue;
    }
    if (line) {
      lines.push(line);
      line = "";
    }
    if (word.length <= maxChars) {
      line = word;
      continue;
    }
    let remaining = word;
    while (remaining.length > maxChars) {
      lines.push(remaining.slice(0, maxChars));
      remaining = remaining.slice(maxChars);
    }
    line = remaining;
  }
  if (line) {
    lines.push(line);
  }
  return lines.length ? lines : [""];
}

function escapePdfText(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r?\n/g, " ");
}

function chunkArray(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function buildContentStream(lines) {
  const textLines = lines.map((line) => `(${escapePdfText(line)}) Tj`);
  return ["BT", "/F1 11 Tf", "14 TL", "50 742 Td", ...textLines.flatMap((line) => [line, "T*"]), "ET"].join("\n");
}

function buildSimplePdf(pages) {
  const objects = [];
  const pageEntries = [];
  const fontId = 3;
  const firstDynamicId = 4;

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  let dynamicId = firstDynamicId;
  for (const pageLines of pages) {
    const pageId = dynamicId++;
    const contentId = dynamicId++;
    const stream = buildContentStream(pageLines);
    objects[contentId] = `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`;
    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    pageEntries.push(`${pageId} 0 R`);
  }

  objects[2] = `<< /Type /Pages /Count ${pageEntries.length} /Kids [${pageEntries.join(" ")}] >>`;

  const output = ["%PDF-1.4"];
  const offsets = [0];
  for (let id = 1; id < objects.length; id += 1) {
    const objectBody = objects[id];
    if (!objectBody) {
      continue;
    }
    offsets[id] = Buffer.byteLength(output.join("\n"), "utf8") + 1;
    output.push(`${id} 0 obj`);
    output.push(objectBody);
    output.push("endobj");
  }

  const xrefOffset = Buffer.byteLength(output.join("\n"), "utf8") + 1;
  output.push("xref");
  output.push(`0 ${objects.length}`);
  output.push("0000000000 65535 f ");
  for (let id = 1; id < objects.length; id += 1) {
    const offset = offsets[id] || 0;
    output.push(`${String(offset).padStart(10, "0")} 00000 n `);
  }
  output.push("trailer");
  output.push(`<< /Size ${objects.length} /Root 1 0 R >>`);
  output.push("startxref");
  output.push(String(xrefOffset));
  output.push("%%EOF");

  return Buffer.from(`${output.join("\n")}\n`, "utf8");
}

function collectLineItems(proposalData) {
  const rows = [];

  const addRows = (section, list, mapper) => {
    if (!Array.isArray(list)) {
      return;
    }
    for (const item of list) {
      if (!isPlainObject(item)) {
        continue;
      }
      rows.push({ section, ...mapper(item) });
    }
  };

  addRows("Deck", proposalData.deckLines, (item) => ({
    description: safeText(item.type, "Deck Item"),
    quantity: `${formatNumber(item.sqs)} sqs`,
    weight: `${formatNumber(item.tons)} tons`,
  }));
  addRows("Accessories", proposalData.accessoriesLines, (item) => ({
    description: safeText(item.type, "Accessory"),
    quantity: `${formatNumber(item.screwCount, 0)} units`,
    weight: `${formatNumber(item.tons)} tons`,
  }));
  addRows("Joists", proposalData.joistLines, (item) => ({
    description: safeText(item.description, "Joist Item"),
    quantity: `${formatNumber(item.units, 0)} units`,
    weight: `${formatNumber(item.tons)} tons`,
  }));
  addRows("Other", proposalData.lines, (item) => ({
    description: safeText(item.description || item.type, "Line Item"),
    quantity: safeText(item.quantity ?? item.units ?? item.sqs, "-"),
    weight: safeText(item.weight ?? item.tons, "-"),
  }));

  return rows;
}

function buildProposalLines(proposalData) {
  const lines = [];
  const pushWrapped = (text = "") => {
    for (const wrapped of wrapText(text)) {
      lines.push(wrapped);
    }
  };

  lines.push("TROJAN STEEL PROPOSAL");
  lines.push("");
  pushWrapped(`Project: ${safeText(proposalData.projectName)}`);
  pushWrapped(`Location: ${safeText(proposalData.locationText)}`);
  pushWrapped(
    `Quote Ref: ${safeText(proposalData.quoteRef)} | Proposal Date: ${safeText(proposalData.proposalDate)} | Valid Until: ${safeText(proposalData.validUntilDate)}`,
  );
  lines.push("");
  lines.push("PROJECT OVERVIEW");
  pushWrapped(`Takeoff by Trojan: ${safeText(proposalData.takeoffByTrojan)}`);
  pushWrapped(`Cut List Provided: ${safeText(proposalData.cutListProvided)}`);
  pushWrapped(`Specs Reviewed: ${safeText(proposalData.specsReviewed)}`);
  pushWrapped(`Submittals Lead Time: ${safeText(proposalData.submittalsLeadTime)}`);
  pushWrapped(`Fabrication Lead Time: ${safeText(proposalData.fabricationLeadTime)}`);
  lines.push("");
  lines.push("LINE ITEMS");

  const lineItems = collectLineItems(proposalData);
  if (!lineItems.length) {
    lines.push("No line items were provided.");
  } else {
    for (const [index, item] of lineItems.entries()) {
      pushWrapped(`${index + 1}. [${item.section}] ${item.description}`);
      pushWrapped(`   Qty: ${safeText(item.quantity)} | Weight: ${safeText(item.weight)}`);
    }
  }

  lines.push("");
  lines.push("TOTALS");
  const totals = isPlainObject(proposalData.totals) ? proposalData.totals : {};
  pushWrapped(`Total Deck Tons: ${formatNumber(totals.totalDeckTons)}`);
  pushWrapped(`Total Joist Tons: ${formatNumber(totals.totalJoistTons)}`);
  pushWrapped(`Grand Total: ${formatMoney(totals.grandTotal)}`);
  lines.push("");
  lines.push("CONTACT");
  pushWrapped(`Phone: ${safeText(proposalData.contactPhone)}`);
  pushWrapped(`Email: ${safeText(proposalData.contactEmail)}`);

  const conditions = Array.isArray(proposalData.documentConditions) ? proposalData.documentConditions : [];
  if (conditions.length) {
    lines.push("");
    lines.push("CONDITIONS");
    for (const [index, item] of conditions.entries()) {
      pushWrapped(`${index + 1}. ${safeText(item)}`);
    }
  }

  return lines;
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

function buildProposalPdf(proposalData) {
  const lines = buildProposalLines(proposalData);
  const pages = chunkArray(lines, LINES_PER_PAGE);
  return buildSimplePdf(pages.length ? pages : [["TROJAN STEEL PROPOSAL", "", "No proposal data found."]]);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST with JSON { proposalData: ... }." });
  }

  try {
    const payload = await readRequestJson(req);
    const proposalData = payload && isPlainObject(payload.proposalData) ? payload.proposalData : null;

    if (!proposalData) {
      return res.status(400).json({
        error: "Missing proposalData object in request body.",
        expected: { proposalData: { projectName: "Example Project", quoteRef: "TROJ0001" } },
      });
    }

    const pdfBuffer = buildProposalPdf(proposalData);
    res.status(200);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="proposal.pdf"');
    res.setHeader("Cache-Control", "no-store");
    return res.send(pdfBuffer);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status = /json|request body/i.test(message) ? 400 : 500;
    return res.status(status).json({
      error: message,
      hint: 'POST JSON body like: { "proposalData": { ... } }',
    });
  }
};
