/**
 * Popup — extract page → editable invoice draft → print/PDF.
 */
import {
  buildDraftFromExtract,
  buildExpenseFromExtract,
  formatMoney,
  invoiceTotals,
  isRestrictedUrl,
} from "./src/feature.js";
import { categoryLabel } from "./src/expense/categories-kr.js";
import { expensesToCsv } from "./src/expense/csv.js";
import {
  addExpenseItem,
  loadExpenses,
  removeExpenseItem,
  saveExpenses,
} from "./src/expense/storage.js";

const STORAGE_KEY = "page2booksDraft";
const MODE = { invoice: "invoice", expense: "expense" };

const el = {
  statusMsg: () => document.getElementById("statusMsg"),
  pageUrl: () => document.getElementById("pageUrl"),
  extractBtn: () => document.getElementById("extractBtn"),
  tabInvoice: () => document.getElementById("tab-invoice"),
  tabExpense: () => document.getElementById("tab-expense"),
  panelInvoice: () => document.getElementById("panel-invoice"),
  panelExpense: () => document.getElementById("panel-expense"),
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
  expMerchant: () => document.getElementById("expMerchant"),
  expDate: () => document.getElementById("expDate"),
  expAmount: () => document.getElementById("expAmount"),
  expCurrency: () => document.getElementById("expCurrency"),
  expCategory: () => document.getElementById("expCategory"),
  expMemo: () => document.getElementById("expMemo"),
  saveExpenseBtn: () => document.getElementById("saveExpenseBtn"),
  exportCsvBtn: () => document.getElementById("exportCsvBtn"),
  expenseList: () => document.getElementById("expenseList"),
  expenseCount: () => document.getElementById("expenseCount"),
};

/** @type {import('./src/feature.js').InvoiceDraft|null} */
let draft = null;
/** @type {import('./src/expense/storage.js').ExpenseEntry[]} */
let expenses = [];
/** @type {'invoice'|'expense'} */
let activeMode = MODE.invoice;
let lastExpenseSourceUrl = "";

function setStatus(msg) {
  el.statusMsg().textContent = msg;
}

/** @param {'invoice'|'expense'} mode */
function setMode(mode) {
  activeMode = mode;
  const isInvoice = mode === MODE.invoice;

  el.tabInvoice().setAttribute("aria-selected", String(isInvoice));
  el.tabExpense().setAttribute("aria-selected", String(!isInvoice));
  el.tabInvoice().tabIndex = isInvoice ? 0 : -1;
  el.tabExpense().tabIndex = isInvoice ? -1 : 0;

  el.panelInvoice().hidden = !isInvoice;
  el.panelExpense().hidden = isInvoice;
}

/** @param {import('./src/feature.js').ExpenseDraft} entry */
function fillExpenseForm(entry) {
  el.expMerchant().value = entry.merchant || "";
  el.expAmount().value = entry.amount ? String(entry.amount) : "";
  el.expCurrency().value = entry.currency || "KRW";
  el.expDate().value = entry.date || new Date().toISOString().slice(0, 10);
  el.expCategory().value = entry.category || "";
  el.expMemo().value = entry.memo || "";
  lastExpenseSourceUrl = entry.sourceUrl || "";
}

function readExpenseFromForm() {
  return {
    merchant: el.expMerchant().value.trim(),
    date: el.expDate().value || new Date().toISOString().slice(0, 10),
    amount: Number(el.expAmount().value) || 0,
    currency: el.expCurrency().value || "KRW",
    category: el.expCategory().value || "",
    memo: el.expMemo().value.trim(),
    sourceUrl: lastExpenseSourceUrl,
  };
}

function shortDate(iso) {
  if (!iso) return "—";
  const parts = iso.split("-");
  return parts.length === 3 ? `${parts[1]}/${parts[2]}` : iso;
}

function renderExpenseList() {
  el.expenseCount().textContent = String(expenses.length);
  el.expenseList().innerHTML = "";

  if (!expenses.length) {
    const empty = document.createElement("div");
    empty.className = "line expense-empty";
    empty.textContent = "No saved expenses yet.";
    el.expenseList().appendChild(empty);
    return;
  }

  [...expenses].reverse().forEach((row) => {
    const line = document.createElement("div");
    line.className = "line";
    line.innerHTML = `
      <span class="cell-date">${shortDate(row.date)}</span>
      <span class="amt">${formatMoney(row.amount, row.currency)}</span>
      <span class="cell-cat">${categoryLabel(row.category)}</span>
      <span class="cell-merchant" title="${escapeAttr(row.merchant)}">${escapeHtml(row.merchant || "—")}</span>
      <button type="button" class="remove" title="Remove">✕</button>
    `;
    line.querySelector(".remove").addEventListener("click", () => onRemoveExpense(row.id));
    el.expenseList().appendChild(line);
  });
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

async function refreshExpenseList() {
  expenses = await loadExpenses();
  renderExpenseList();
}

async function onSaveExpense() {
  const entry = readExpenseFromForm();
  if (!entry.amount) {
    setStatus("Enter an amount before saving.");
    return;
  }
  try {
    expenses = addExpenseItem(expenses, entry);
    await saveExpenses(expenses);
    renderExpenseList();
    setStatus(`Saved. ${expenses.length} expense(s) on this device.`);
  } catch (err) {
    setStatus(err?.message || "Could not save expense.");
  }
}

function downloadCsv(text) {
  const blob = new Blob([`\uFEFF${text}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `page2books-expenses-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

async function onExportCsv() {
  if (!expenses.length) {
    expenses = await loadExpenses();
  }
  if (!expenses.length) {
    setStatus("No saved expenses to export.");
    return;
  }
  try {
    downloadCsv(expensesToCsv(expenses, categoryLabel));
    setStatus(`Exported ${expenses.length} expense(s) to CSV.`);
  } catch (err) {
    setStatus(err?.message || "Could not export CSV.");
  }
}

async function onRemoveExpense(id) {
  try {
    expenses = removeExpenseItem(expenses, id);
    await saveExpenses(expenses);
    renderExpenseList();
    setStatus(`Removed. ${expenses.length} expense(s) on this device.`);
  } catch (err) {
    setStatus(err?.message || "Could not remove expense.");
  }
}

function readyStatusMessage() {
  return activeMode === MODE.expense
    ? "Ready to extract expense from this page"
    : "Ready to extract data from this page";
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
    <div><span>Tax (${current.taxPercent || 0}%)</span><span>${formatMoney(tax, c)}</span></div>
    <div class="grand"><span>Total</span><span>${formatMoney(total, c)}</span></div>
  `;
}

function lineAmount(row) {
  const qty = Number(row.querySelector(".qty")?.value) || 0;
  const price = Number(row.querySelector(".price")?.value) || 0;
  return qty * price;
}

function renderLines() {
  if (!draft) return;
  el.lines().innerHTML = "";
  draft.lines.forEach((line, idx) => {
    const row = document.createElement("div");
    row.className = "line";
    row.innerHTML = `
      <input class="desc" type="text" placeholder="Description" />
      <input class="qty" type="number" min="0" step="1" />
      <input class="price" type="number" min="0" step="0.01" />
      <span class="amt"></span>
      <button type="button" class="remove" title="Remove line">✕</button>
    `;
    row.querySelector(".desc").value = line.description || "";
    row.querySelector(".qty").value = String(line.qty ?? 1);
    row.querySelector(".price").value = String(line.unitPrice ?? 0);
    const paintAmt = () => {
      const c = el.invCurrency()?.value || draft.currency || "KRW";
      row.querySelector(".amt").textContent = formatMoney(lineAmount(row), c);
    };
    paintAmt();
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
        paintAmt();
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
    setStatus("Open a normal https page.");
    el.extractBtn().disabled = true;
    return null;
  }

  setStatus(readyStatusMessage());
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
    const extract = result || {};
    const n = extract.amounts?.length || 0;

    if (activeMode === MODE.expense) {
      fillExpenseForm(buildExpenseFromExtract(extract));
      setStatus(
        n
          ? "Expense ready. Edit, then save."
          : "Expense ready. No amounts found — fill amount."
      );
    } else {
      fillForm(buildDraftFromExtract(extract));
      setStatus(
        n
          ? "Draft ready. Edit, then export PDF."
          : "Draft ready. No amounts found — fill price."
      );
    }
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

function paintLineAmounts() {
  const c = el.invCurrency()?.value || "KRW";
  el.lines().querySelectorAll(".line").forEach((row) => {
    const amt = row.querySelector(".amt");
    if (amt) amt.textContent = formatMoney(lineAmount(row), c);
  });
}

function wireForm() {
  ["invNumber", "invDate", "invFrom", "invTo", "invCurrency", "invTax", "invNotes"].forEach(
    (key) => {
      el[key]().addEventListener("input", () => {
        draft = readDraftFromForm();
        paintLineAmounts();
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
  el.saveExpenseBtn().addEventListener("click", () => onSaveExpense());
  el.exportCsvBtn().addEventListener("click", () => onExportCsv());
}

function wireTabs() {
  el.tabInvoice().addEventListener("click", () => {
    setMode(MODE.invoice);
    showActivePage();
  });
  el.tabExpense().addEventListener("click", () => {
    setMode(MODE.expense);
    showActivePage();
    refreshExpenseList();
  });
}

setMode(MODE.invoice);
showActivePage();
wireForm();
wireTabs();
refreshExpenseList();
el.extractBtn().addEventListener("click", () => onExtract());
