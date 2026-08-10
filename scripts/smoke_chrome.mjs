#!/usr/bin/env node
/**
 * Chrome smoke: serve fixture → load page in Chrome → run in-page extract
 * equivalent → build invoice HTML. Uses system Chrome + puppeteer-core (npx).
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import {
  buildDraftFromExtract,
  extractCandidatesFromText,
  renderInvoiceHtml,
} from "../src/feature.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FIXTURE = path.join(ROOT, "fixtures", "demo-product.html");
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function startServer() {
  const html = fs.readFileSync(FIXTURE);
  const server = http.createServer((req, res) => {
    if (req.url === "/" || req.url === "/demo-product.html") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(html);
      return;
    }
    res.writeHead(404);
    res.end("not found");
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  return { server, url: `http://127.0.0.1:${port}/demo-product.html` };
}

async function loadPuppeteer() {
  try {
    return await import("puppeteer-core");
  } catch {
    // install ephemeral local copy under /tmp so we don't dirty package.json
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "p2i-pup-"));
    await new Promise((resolve, reject) => {
      const child = spawn(
        "npm",
        ["install", "--no-save", "--prefix", dir, "puppeteer-core@24"],
        { stdio: "inherit" }
      );
      child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error("npm install puppeteer-core failed"))));
    });
    return import(pathToFileURL(path.join(dir, "node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js")).href);
  }
}

async function main() {
  assert(fs.existsSync(CHROME), `Chrome not found at ${CHROME}`);
  assert(fs.existsSync(FIXTURE), "fixture missing");

  const { server, url } = await startServer();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "p2i-chrome-"));
  let browser;

  try {
    const puppeteer = await loadPuppeteer();
    browser = await puppeteer.default.launch({
      executablePath: CHROME,
      headless: true,
      args: [
        `--user-data-dir=${profile}`,
        `--disable-extensions-except=${ROOT}`,
        `--load-extension=${ROOT}`,
        "--no-first-run",
        "--no-default-browser-check",
      ],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });

    const domExtract = await page.evaluate(() => {
      const text = (document.body?.innerText || "").slice(0, 20000);
      const money =
        text.match(
          /(?:₩|￦|KRW|USD|\$|€)\s?-?[\d,]+(?:\.\d+)?|-?[\d,]+(?:\.\d+)?\s?(?:원|KRW|USD|EUR)/gi
        ) || [];
      const amounts = [...new Set(money.map((m) => m.trim()))].slice(0, 12);
      const names = [];
      const og = document.querySelector('meta[property="og:title"]')?.content;
      if (og) names.push(og);
      document.querySelectorAll('[itemprop="name"], h1, h2').forEach((node) => {
        const t = (node.textContent || "").trim();
        if (t && t.length < 120) names.push(t);
      });
      const title = document.title || "";
      return {
        title,
        url: location.href,
        names: [...new Set([title, ...names].filter(Boolean))].slice(0, 8),
        amounts,
        text,
      };
    });

    assert(domExtract.amounts.some((a) => /32/.test(a)), `amounts ${JSON.stringify(domExtract.amounts)}`);
    assert(domExtract.names.some((n) => /스탠드|stand/i.test(n)), `names ${JSON.stringify(domExtract.names)}`);

    const fromText = extractCandidatesFromText({
      title: domExtract.title,
      url: domExtract.url,
      text: domExtract.text,
      names: domExtract.names,
    });
    const draft = buildDraftFromExtract(fromText, {
      from: "Smoke Tester",
      to: "Demo Client",
    });
    assert(draft.lines[0].unitPrice === 32000, `price ${draft.lines[0].unitPrice}`);
    const html = renderInvoiceHtml({ ...draft, taxPercent: 10 });
    assert(html.includes("₩35,200"), "taxed total in html");

    const out = path.join(profile, "invoice-smoke.html");
    fs.writeFileSync(out, html);
    console.log(`ok chrome smoke · fixture ${url}`);
    console.log(`invoice html → ${out}`);
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
