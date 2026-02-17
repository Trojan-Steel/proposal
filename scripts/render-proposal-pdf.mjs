import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import process from "node:process";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function getArg(flag, fallback = "") {
  const match = process.argv.find((arg) => arg.startsWith(`${flag}=`));
  if (!match) {
    return fallback;
  }
  return match.slice(flag.length + 1);
}

function sanitizeOutputPath(rawPath) {
  const resolved = path.resolve(projectRoot, rawPath || "output/proposal-email.pdf");
  return resolved;
}

function serveStatic(rootDir, port = 4173) {
  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url || "/", `http://127.0.0.1:${port}`);
    const pathname = decodeURIComponent(requestUrl.pathname || "/");
    let requestedPath = path.join(rootDir, pathname);
    if (pathname.endsWith("/")) {
      requestedPath = path.join(rootDir, pathname, "index.html");
    }
    if (!path.extname(requestedPath)) {
      requestedPath = `${requestedPath}.html`;
    }
    const normalizedRoot = path.resolve(rootDir) + path.sep;
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
      const ext = path.extname(normalizedRequested).toLowerCase();
      const contentTypes = {
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
      res.setHeader("Content-Type", contentTypes[ext] || "application/octet-stream");
      res.end(buffer);
    });
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  const dataPathArg = getArg("--data", "data/proposal-data.sample.json");
  const outputPathArg = getArg("--out", "output/proposal-email.pdf");
  const dataPath = path.resolve(projectRoot, dataPathArg);
  const outputPath = sanitizeOutputPath(outputPathArg);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(dataPath)) {
    throw new Error(
      `Proposal data JSON not found at ${dataPath}. Pass --data=/absolute/or/relative/path/to.json`,
    );
  }

  const proposalData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  fs.mkdirSync(outputDir, { recursive: true });

  const server = await serveStatic(projectRoot, 4173);
  const browser = await puppeteer.launch({ headless: "new" });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 2 });
    await page.evaluateOnNewDocument((data) => {
      window.localStorage.setItem("proposalData_v1", JSON.stringify(data));
    }, proposalData);

    const targetUrl = "http://127.0.0.1:4173/tools/proposal.html?v=render";
    await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 30000 });
    await page.waitForSelector(".proposal-page", { timeout: 20000 });
    await page.evaluateHandle("document.fonts.ready");

    const pageCount = await page.$$eval(".proposal-page", (nodes) => nodes.length);
    if (pageCount < 1) {
      throw new Error("No proposal pages were rendered.");
    }

    await page.pdf({
      path: outputPath,
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
      },
    });

    console.log(`PDF generated: ${outputPath}`);
    console.log(`Pages rendered: ${pageCount}`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
