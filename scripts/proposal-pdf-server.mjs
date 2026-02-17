import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const host = "localhost";
const port = Number.parseInt(process.env.PROPOSAL_PORT || process.env.PORT || "4174", 10);
const ROUTES = [
  "GET /health",
  "GET /proposal-api/health",
  "POST /render",
  "POST /proposal-api/render",
  "POST /api/proposal-pdf",
];

let browser;
try {
  browser = await puppeteer.launch({ headless: "new" });
} catch (error) {
  console.error("Failed to launch Puppeteer for proposal server.");
  console.error(error);
  process.exit(1);
}

function sanitizeFilename(value) {
  const raw = String(value || "proposal").trim().toLowerCase();
  const cleaned = raw
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return cleaned || "proposal";
}

function getContentType(ext) {
  const map = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
  };
  return map[ext] || "application/octet-stream";
}

function sendJson(res, status, body) {
  const json = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(json);
}

async function readRequestJson(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
    const totalBytes = chunks.reduce((sum, item) => sum + item.length, 0);
    if (totalBytes > 2_000_000) {
      throw new Error("Request body too large");
    }
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function renderProposalPdf(proposalData) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 2 });
    await page.evaluateOnNewDocument((data) => {
      window.localStorage.setItem("proposalData_v1", JSON.stringify(data));
    }, proposalData);
    await page.goto(`http://${host}:${port}/tools/proposal.html?render=1`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    await page.waitForSelector(".proposal-page", { timeout: 20000 });
    await page.evaluateHandle("document.fonts.ready");
    const pdfBuffer = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      format: "Letter",
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
      },
    });
    return pdfBuffer;
  } finally {
    await page.close();
  }
}

const server = http.createServer(async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }
    const requestUrl = new URL(req.url || "/", `http://${host}:${port}`);
    if (req.method === "GET" && (requestUrl.pathname === "/health" || requestUrl.pathname === "/proposal-api/health")) {
      sendJson(res, 200, { ok: true });
      return;
    }
    if (
      req.method === "POST" &&
      (requestUrl.pathname === "/render" ||
        requestUrl.pathname === "/proposal-api/render" ||
        requestUrl.pathname === "/api/proposal-pdf")
    ) {
      const payload = await readRequestJson(req);
      const proposalData = payload?.proposalData && typeof payload.proposalData === "object" ? payload.proposalData : null;
      if (!proposalData) {
        sendJson(res, 400, { error: "Missing proposalData payload" });
        return;
      }
      const pdf = await renderProposalPdf(proposalData);
      const projectName = sanitizeFilename(proposalData.projectName);
      const quoteRef = sanitizeFilename(proposalData.quoteRef);
      const filename = `${projectName || "project"}-${quoteRef || "proposal"}.pdf`;
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Cache-Control", "no-store");
      res.end(pdf);
      return;
    }

    const pathname = decodeURIComponent(requestUrl.pathname || "/");
    let requestedPath = path.join(projectRoot, pathname);
    if (pathname.endsWith("/")) {
      requestedPath = path.join(projectRoot, pathname, "index.html");
    }
    if (!path.extname(requestedPath)) {
      requestedPath = `${requestedPath}.html`;
    }
    const normalizedRoot = path.resolve(projectRoot) + path.sep;
    const normalizedRequested = path.resolve(requestedPath);
    if (!normalizedRequested.startsWith(normalizedRoot)) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }
    fs.readFile(normalizedRequested, (error, buffer) => {
      if (error) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }
      res.setHeader("Content-Type", getContentType(path.extname(normalizedRequested).toLowerCase()));
      res.end(buffer);
    });
  } catch (error) {
    sendJson(res, 500, {
      error: String(error?.message || error),
      stack: typeof error?.stack === "string" ? error.stack : "",
    });
  }
});

server.listen(port, host, () => {
  console.log(`Proposal PDF server listening on http://${host}:${port}`);
  console.log(`Routes: ${ROUTES.join(", ")}`);
});

process.on("SIGINT", async () => {
  await browser.close();
  server.close(() => process.exit(0));
});
