const chromium = require("@sparticuz/chromium");
const puppeteerCore = require("puppeteer-core");

const MAX_BODY_BYTES = 2_000_000;
const LOAD_TIMEOUT_MS = 45_000;

function sanitizeFilenamePart(value, fallback = "proposal") {
  const cleaned = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return cleaned || fallback;
}

function resolveBaseUrl(req) {
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "").trim();
  if (!host) {
    return "";
  }
  const protoHeader = String(req.headers["x-forwarded-proto"] || "https").split(",")[0].trim();
  const protocol = protoHeader || "https";
  return `${protocol}://${host}`;
}

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

async function launchBrowser() {
  const executablePath = await chromium.executablePath();
  return puppeteerCore.launch({
    args: chromium.args,
    defaultViewport: { width: 1400, height: 1800, deviceScaleFactor: 1 },
    executablePath,
    headless: true,
  });
}

async function waitForAllImages(page) {
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve();
              return;
            }
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
      ),
    );
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
    return res.status(405).json({ error: "Method not allowed. Use POST with JSON { proposalData: ... }." });
  }

  let browser;
  let page;
  try {
    const payload = await readRequestJson(req);
    const proposalData = payload && isPlainObject(payload.proposalData) ? payload.proposalData : null;
    if (!proposalData) {
      return res.status(400).json({
        error: "Missing proposalData object in request body.",
        expected: { proposalData: { projectName: "Example Project", quoteRef: "TROJ0001" } },
      });
    }

    const baseUrl = resolveBaseUrl(req);
    if (!baseUrl) {
      return res.status(400).json({ error: "Unable to resolve host for proposal rendering." });
    }

    browser = await launchBrowser();
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(LOAD_TIMEOUT_MS);
    page.setDefaultTimeout(LOAD_TIMEOUT_MS);

    await page.setRequestInterception(true);
    page.on("request", (interceptedRequest) => {
      const requestUrl = interceptedRequest.url();
      if (requestUrl.includes("fonts.googleapis.com") || requestUrl.includes("fonts.gstatic.com")) {
        interceptedRequest.abort();
        return;
      }
      interceptedRequest.continue();
    });

    await page.evaluateOnNewDocument((data) => {
      window.localStorage.setItem("proposalData_v1", JSON.stringify(data));
    }, proposalData);

    const targetUrl = `${baseUrl}/tools/proposal.html?render=1&serverPdf=1`;
    await page.goto(targetUrl, { waitUntil: "networkidle0" });
    await page.waitForSelector(".proposal-page");

    await page.emulateMediaType("print");
    await page.evaluate(async () => {
      if (document.fonts && typeof document.fonts.ready?.then === "function") {
        try {
          await document.fonts.ready;
        } catch (_error) {
          // Continue if fonts API fails.
        }
      }
    });
    await waitForAllImages(page);

    await page.addStyleTag({
      content: `
        @page { size: Letter; margin: 0.5in; }
        html, body {
          background: #ffffff !important;
          margin: 0 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          font-family: Arial, Helvetica, sans-serif !important;
        }
        .proposal-tools { display: none !important; }
        .proposal-shell {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .proposal-root {
          display: block !important;
          gap: 0 !important;
          overflow: visible !important;
        }
        .proposal-page {
          width: auto !important;
          min-height: 0 !important;
          height: auto !important;
          margin: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          overflow: visible !important;
          break-inside: avoid-page;
          page-break-inside: avoid;
          page-break-before: auto !important;
        }
        .proposal-page.page-break {
          break-after: page;
          page-break-after: always;
        }
        .proposal-page:last-child {
          break-after: auto !important;
          page-break-after: auto !important;
        }
      `,
    });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
      },
      timeout: LOAD_TIMEOUT_MS,
    });

    const filename = `${sanitizeFilenamePart(proposalData.projectName, "proposal")}-${sanitizeFilenamePart(
      proposalData.quoteRef,
      "quote",
    )}.pdf`;

    res.status(200);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Cache-Control", "no-store");
    return res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("proposal-render failed", {
      message,
      stack: error instanceof Error ? error.stack : "",
    });
    const status = /json|request body|missing/i.test(message) ? 400 : 500;
    return res.status(status).json({
      error: message,
      hint: 'POST JSON body like: { "proposalData": { ... } }',
    });
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
};
