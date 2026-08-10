/**
 * Popup — extract page → editable invoice draft → print/PDF.
 */
import {
  buildDraftFromExtract,
  formatMoney,
  invoiceTotals,
  isRestrictedUrl,
  summarizeUrl,
} from "./src/feature.js";

const STORAGE_KEY = "page2invoiceDraft";

const el = {
  statusMsg: () => document.getElementById("statusMsg"),
  pageUrl: () => document.getElementById("pageUrl"),
  extractBtn: () => document.getElementById("extractBtn"),
  draft: () => document.getElementById("draft"),
  lines: () => document.getElementById("lines"),
  totals: () => document.getElementById("totals"),
  invNumber: () => document.getElementById("invNumber"),
  invDate: () => document.getElementById("invDate"),
  invFrom: () => document.getElementById("invFrom"),
  invTo: () => document.getElementById("invTo"),
  invCurrency: () => document.getElementById("invCurrency"),
  invTax: () => document.getElementById("invTax"),
  invNotes: () => document.getElementById("invNotes"),
  addLineBtn: () => document.getElementById("addLineBtn"),
  pdfBtn: () => document.getElementById("pdfBtn"),
};

/** @type {import('./src/feature.js').InvoiceDraft|null} */
let draft = null;

function setStatus(msg) {
  el.statusMsg().textContent = msg;
}

async function activeTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0] || null;
}

/** Runs in the page context via chrome.scripting.executeScript */
function extractCandidatesInPage() {
  const text = (document.body?.innerText || "").slice(0, 20000);
  const money =
    text.match(
      /(?:₩|￦|KRW|USD|\$|€)\s?-?[\d,]+(?:\.\d+)?|-?[\d,]+(?:\.\d+)?\s?(?:원|KRW|USD|EUR)/gi
    ) || [];
  const amounts = [...new Set(money.map((m) => m.trim()))].slice(0, 12);

  const names = [];
  const og = document.querySelector('meta[property="og:title"]')?.content;
  if (og) names.push(og);
  document
    .querySelectorAll('[itemprop="name"], h1, h2')
    .forEach((node) => {
      const t = (node.textContent || "").trim();
      if (t && t.length < 120) names.push(t);
    });

  const title = document.title || "";
  const allNames = [...new Set([title, ...names].filter(Boolean))].slice(0, 8);

  let currency = "KRW";
  for (const a of amounts) {
    if (/[€]|EUR/i.test(a)) {
      currency = "EUR";
      break;
    }
    if (/[₩￦]|원|KRW/i.test(a)) {
      currency = "KRW";
      break;
    }
    if (/\$|USD/i.test(a)) {
      currency = "USD";
      break;
    }
  }

  return {
    title,
    url: location.href,
    names: allNames,
    amounts,
    currency,
  };
}

function readDraftFromForm() {
  if (!draft) return null;
  const lines = [...el.lines().querySelectorAll(".line")].map((row) => ({
    description: row.querySelector(".desc")?.value || "",
    qty: Number(row.querySelector(".qty")?.value) || 0,
    unitPrice: Number(row.querySelector(".price")?.value) || 0,
  }));
  return {
    ...draft,
    number: el.invNumber().value.trim(),
    date: el.invDate().value,
    from: el.invFrom().value,
    to: el.invTo().value,
    currency: el.invCurrency().value,
    taxPercent: Number(el.invTax().value) || 0,
    notes: el.invNotes().value,
    lines: lines.length ? lines : draft.lines,
  };
}

function renderTotals() {
  const current = readDraftFromForm();
  if (!current) return;
  const { subtotal, tax, total } = invoiceTotals(current);
  const c = current.currency;
  el.totals().innerHTML = `
    <div><span>Subtotal</span><span>${formatMoney(subtotal, c)}</span></div>
    <div><span>Tax</span><span>${formatMoney(tax, c)}</span></div>
    <div class="grand"><span>Total</span><span>${formatMoney(total, c)}</span></div>
  `;
}

function renderLines() {
  if (!draft) return;
  el.lines().innerHTML = "";
  draft.lines.forEach((line, idx) => {
    const row = document.createElement("div");
    row.className = "line";
    row.innerHTML = `
      <label>Description<input class="desc" type="text" /></label>
      <div class="row3">
        <label>Qty<input class="qty" type="number" min="0" step="1" /></label>
        <label>Price<input class="price" type="number" min="0" step="0.01" /></label>
        <button type="button" class="remove" title="Remove line">✕</button>
      </div>
    `;
    row.querySelector(".desc").value = line.description || "";
    row.querySelector(".qty").value = String(line.qty ?? 1);
    row.querySelector(".price").value = String(line.unitPrice ?? 0);
    row.querySelector(".remove").addEventListener("click", () => {
      draft = readDraftFromForm();
      draft.lines.splice(idx, 1);
      if (!draft.lines.length) {
        draft.lines.push({ description: "", qty: 1, unitPrice: 0 });
      }
      fillForm(draft);
    });
    row.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        draft = readDraftFromForm();
        renderTotals();
      });
    });
    el.lines().appendChild(row);
  });
}

function fillForm(next) {
  draft = next;
  el.invNumber().value = next.number || "";
  el.invDate().value = next.date || "";
  el.invFrom().value = next.from || "";
  el.invTo().value = next.to || "";
  el.invCurrency().value = next.currency || "KRW";
  el.invTax().value = String(next.taxPercent ?? 0);
  el.invNotes().value = next.notes || "";
  renderLines();
  renderTotals();
  el.draft().classList.remove("hidden");
}

async function showActivePage() {
  const tab = await activeTab();
  const url = tab?.url || "";
  el.pageUrl().textContent = url || "(no active tab)";

  if (!tab?.id || !url || isRestrictedUrl(url)) {
    setStatus("Open a normal https page, then extract.");
    el.extractBtn().disabled = true;
    return null;
  }

  setStatus(`Ready on ${summarizeUrl(url).host || "page"}.`);
  el.extractBtn().disabled = false;
  return tab;
}

async function onExtract() {
  const tab = await showActivePage();
  if (!tab?.id) return;

  setStatus("Extracting…");
  el.extractBtn().disabled = true;
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractCandidatesInPage,
    });
    const next = buildDraftFromExtract(result || {});
    fillForm(next);
    const n = result?.amounts?.length || 0;
    setStatus(
      n
        ? `Draft ready · ${n} amount candidate(s). Edit, then export PDF.`
        : "Draft ready · no amounts found; fill price manually."
    );
  } catch (err) {
    setStatus(err?.message || "Extract failed on this page.");
  } finally {
    el.extractBtn().disabled = false;
  }
}

async function onPdf() {
  const current = readDraftFromForm();
  if (!current) {
    setStatus("Extract a page first.");
    return;
  }
  draft = current;
  setStatus("Opening print view…");
  try {
    await chrome.storage.session.set({ [STORAGE_KEY]: current });
    await chrome.tabs.create({
      url: chrome.runtime.getURL("print.html"),
    });
  } catch (err) {
    setStatus(err?.message || "Could not open print view.");
  }
}

function wireForm() {
  ["invNumber", "invDate", "invFrom", "invTo", "invCurrency", "invTax", "invNotes"].forEach(
    (key) => {
      el[key]().addEventListener("input", () => {
        draft = readDraftFromForm();
        renderTotals();
      });
    }
  );
  el.addLineBtn().addEventListener("click", () => {
    draft = readDraftFromForm() || buildDraftFromExtract({});
    draft.lines.push({ description: "", qty: 1, unitPrice: 0 });
    fillForm(draft);
  });
  el.pdfBtn().addEventListener("click", () => onPdf());
}

showActivePage();
wireForm();
el.extractBtn().addEventListener("click", () => onExtract());
