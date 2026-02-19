const chromium = require("@sparticuz/chromium");
const fs = require("fs");
const path = require("path");
const puppeteerCore = require("puppeteer-core");
const { createClient } = require("@supabase/supabase-js");

const MAX_BODY_BYTES = 2_000_000;

function loadProposalAssets() {
  const roots = [path.resolve(__dirname, ".."), process.cwd()];
  for (const root of roots) {
    const dir = path.join(root, "public", "tools");
    try {
      const html = fs.readFileSync(path.join(dir, "proposal.html"), "utf8");
      const css = fs.readFileSync(path.join(dir, "proposal.css"), "utf8");
      const js = fs.readFileSync(path.join(dir, "proposal.js"), "utf8");
      return { html, css, js };
    } catch (_) {
      continue;
    }
  }
  return null;
}
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

function sanitizeStorageSegment(value, fallback = "project") {
  const cleaned = String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9 _-]+/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/ /g, "-")
    .replace(/-+/g, "-")
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

function getSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !serviceRoleKey) {
    return null;
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
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
  const payload = await readRequestJson(req);
  const proposalData = payload && isPlainObject(payload.proposalData) ? payload.proposalData : null;
  const exportUuid = String(payload?.export_uuid || "").trim();
  const projectNameForStorage = String(payload?.project_name || proposalData?.projectName || "").trim();
  if (!proposalData) {
    return res.status(400).json({
      error: "Missing proposalData object in request body.",
      expected: { proposalData: { projectName: "Example Project", quoteRef: "TROJ0001" } },
    });
  }

  const proto =
    (req.headers["x-forwarded-proto"] || "https").toString().split(",")[0].trim();
  const host =
    (req.headers["x-forwarded-host"] || req.headers.host || "").toString().split(",")[0].trim();

  const SITE_ORIGIN = process.env.SITE_ORIGIN || (host ? `${proto}://${host}` : "");

  if (!SITE_ORIGIN) {
    return res.status(500).json({ error: "SITE_ORIGIN not configured" });
  }

  try {
    browser = await launchBrowser();
    page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2
    });

    page.setDefaultNavigationTimeout(LOAD_TIMEOUT_MS);
    page.setDefaultTimeout(LOAD_TIMEOUT_MS);

    const assets = loadProposalAssets();
    if (assets) {
      const initScript = `<script>(function(){localStorage.setItem("proposalData_v1",${JSON.stringify(JSON.stringify(proposalData))});})();</script>`;
      const htmlWithCss = assets.html.replace(
        /<link[^>]+href="[^"]*proposal\.css[^"]*"[^>]*\/?>/i,
        () => `<style>${assets.css}</style>`,
      );
      const htmlWithJs = htmlWithCss.replace(
        /<script[^>]+src="[^"]*proposal\.js[^"]*"[^>]*><\/script>/i,
        () => `${initScript}\n    <script>${assets.js}</script>`,
      );
      await page.setContent(htmlWithJs, {
        waitUntil: "load",
        timeout: LOAD_TIMEOUT_MS,
      });
    } else {
      const proposalUrl = `${SITE_ORIGIN}/tools/proposal.html`;
      await page.goto(proposalUrl, { waitUntil: "load" });
      await page.evaluate((data) => {
        localStorage.setItem("proposalData_v1", JSON.stringify(data));
      }, proposalData);
      await page.reload({ waitUntil: "load" });
    }

    await page.waitForSelector("#proposalRoot", { timeout: 20000 });

    await page.waitForFunction(
      () => {
        const slot = document.querySelector("[data-proposal-conditions-slot]");
        return slot && slot.innerText && slot.innerText.length > 0;
      },
      { timeout: 15000 },
    );

    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    });

    await page.emulateMediaType("print");
    await waitForAllImages(page);

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

    if (exportUuid && projectNameForStorage) {
      try {
          const supabase = getSupabaseAdminClient();
          if (supabase) {
            const folder = sanitizeStorageSegment(projectNameForStorage, "project");
            const pdfPath = `${folder}/${exportUuid}.pdf`;
            const uploadResult = await supabase.storage.from("proposals").upload(pdfPath, Buffer.from(pdfBuffer), {
              contentType: "application/pdf",
              upsert: true,
            });
          if (uploadResult.error) {
            throw uploadResult.error;
          }
          const signedUrl = null;
          const { error: upsertError } = await supabase.from("quote_exports").upsert(
            {
              export_uuid: exportUuid,
              pdf_path: pdfPath,
              pdf_url: signedUrl ?? null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "export_uuid" },
          );
          if (upsertError) {
            throw upsertError;
          }

        }
      } catch (uploadError) {
        console.error("proposal-render pdf upload/link failed", {
          message: uploadError instanceof Error ? uploadError.message : String(uploadError),
          export_uuid: exportUuid,
        });
      }
    }

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
