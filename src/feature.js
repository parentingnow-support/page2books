/**
 * Pure helpers — selfcheck / phase1 tests run without Chrome.
 */

export function isRestrictedUrl(url) {
  if (!url) return true;
  return (
    url.startsWith("chrome://") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("edge://") ||
    url.startsWith("about:") ||
    url.startsWith("devtools://") ||
    url.startsWith("file://")
  );
}

/** @returns {{ host: string, path: string }} */
export function summarizeUrl(url) {
  try {
    const u = new URL(url);
    return { host: u.host, path: u.pathname + u.search };
  } catch {
    return { host: "", path: "" };
  }
}

/**
 * Normalize a money-like token to a best-effort number.
 * ponytail: KR/EN heuristics only — upgrade when locale fixtures land.
 * @returns {number|null}
 */
export function normalizeAmountToken(token) {
  if (!token) return null;
  const cleaned = String(token).replace(/[^\d.,-]/g, "").replace(/,/g, "");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** @returns {'KRW'|'USD'|'EUR'|'OTHER'} */
export function detectCurrency(token) {
  const t = String(token || "");
  if (/[€]|EUR/i.test(t)) return "EUR";
  if (/[₩￦]|원|KRW/i.test(t)) return "KRW";
  if (/\$|USD/i.test(t)) return "USD";
  return "OTHER";
}

const AMOUNT_RE =
  /(?:₩|￦|KRW|USD|\$|€)\s?-?[\d,]+(?:\.\d+)?|-?[\d,]+(?:\.\d+)?\s?(?:원|KRW|USD|EUR)/gi;

/**
 * Extract invoice candidates from plain page text (+ optional hints).
 * Used by selfcheck and mirrored by the in-page scraper.
 */
export function extractCandidatesFromText({
  title = "",
  url = "",
  text = "",
  names = [],
} = {}) {
  const body = String(text || "").slice(0, 20000);
  const money = body.match(AMOUNT_RE) || [];
  const amounts = [...new Set(money.map((m) => m.trim()))].slice(0, 12);
  const nameHints = [
    ...names,
    title,
    ...[...body.matchAll(/^#{0,3}\s*(.{4,80})$/gm)].map((m) => m[1].trim()),
  ]
    .map((n) => String(n || "").trim())
    .filter((n) => n && n.length < 120);
  const uniqueNames = [...new Set(nameHints)].slice(0, 8);

  const currency =
    amounts.map(detectCurrency).find((c) => c !== "OTHER") || "KRW";

  return {
    title: title || uniqueNames[0] || "",
    url,
    names: uniqueNames,
    amounts,
    currency,
  };
}

function todayStamp() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

/** @typedef {{ description: string, qty: number, unitPrice: number }} InvoiceLine */
/** @typedef {{ number: string, date: string, from: string, to: string, taxPercent: number, currency: string, notes: string, lines: InvoiceLine[], sourceUrl: string }} InvoiceDraft */
/** @typedef {{ merchant: string, date: string, amount: number, currency: string, category: string, memo: string, sourceUrl: string }} ExpenseDraft */

/** @returns {InvoiceDraft} */
export function buildDraftFromExtract(extract, opts = {}) {
  const ex = extract || {};
  const amount = normalizeAmountToken(ex.amounts?.[0]) ?? 0;
  const description =
    ex.names?.[0] || ex.title || "Item from page" || "Line item";
  return {
    number: opts.number || `INV-${todayStamp()}`,
    date: opts.date || new Date().toISOString().slice(0, 10),
    from: opts.from || "",
    to: opts.to || "",
    taxPercent: Number.isFinite(opts.taxPercent) ? opts.taxPercent : 0,
    currency: ex.currency || "KRW",
    notes: ex.url ? `Source: ${ex.url}` : "",
    sourceUrl: ex.url || "",
    lines: [
      {
        description: String(description).slice(0, 160),
        qty: 1,
        unitPrice: amount,
      },
    ],
  };
}

/** @returns {ExpenseDraft} */
export function buildExpenseFromExtract(extract, opts = {}) {
  const ex = extract || {};
  const amount = normalizeAmountToken(ex.amounts?.[0]) ?? 0;
  return {
    merchant: String(ex.names?.[0] || ex.title || "").slice(0, 160),
    date: opts.date || new Date().toISOString().slice(0, 10),
    amount,
    currency: ex.currency || "KRW",
    category: opts.category || "",
    memo: ex.url ? `Source: ${ex.url}` : opts.memo || "",
    sourceUrl: ex.url || "",
  };
}

export function lineTotal(line) {
  const qty = Number(line?.qty) || 0;
  const price = Number(line?.unitPrice) || 0;
  return qty * price;
}

export function invoiceTotals(draft) {
  const subtotal = (draft?.lines || []).reduce((s, line) => s + lineTotal(line), 0);
  const taxPercent = Number(draft?.taxPercent) || 0;
  const tax = subtotal * (taxPercent / 100);
  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
}

export function formatMoney(amount, currency = "KRW") {
  const n = Number(amount) || 0;
  if (currency === "KRW") {
    return `₩${Math.round(n).toLocaleString("en-US")}`;
  }
  if (currency === "EUR") {
    return `€${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (currency === "USD") {
    return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Printable invoice HTML (full document). */
export function renderInvoiceHtml(draft) {
  const d = draft || buildDraftFromExtract({});
  const { subtotal, tax, total } = invoiceTotals(d);
  const rows = (d.lines || [])
    .map((line, i) => {
      const lt = lineTotal(line);
      return `<tr>
        <td>${i + 1}</td>
        <td>${escapeHtml(line.description)}</td>
        <td class="num">${escapeHtml(line.qty)}</td>
        <td class="num">${escapeHtml(formatMoney(line.unitPrice, d.currency))}</td>
        <td class="num">${escapeHtml(formatMoney(lt, d.currency))}</td>
      </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Invoice ${escapeHtml(d.number)}</title>
  <style>
    :root { color-scheme: light; }
    body { font-family: "Segoe UI", system-ui, sans-serif; margin: 40px; color: #111; }
    h1 { margin: 0 0 4px; font-size: 28px; }
    .meta { color: #555; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .box { border: 1px solid #ddd; border-radius: 8px; padding: 12px 14px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: #777; margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    th, td { border-bottom: 1px solid #e5e5e5; padding: 8px 6px; text-align: left; font-size: 14px; }
    th { font-size: 12px; color: #666; }
    td.num, th.num { text-align: right; }
    .totals { margin-left: auto; width: 260px; }
    .totals div { display: flex; justify-content: space-between; padding: 4px 0; }
    .totals .grand { font-weight: 700; font-size: 16px; border-top: 1px solid #111; margin-top: 6px; padding-top: 8px; }
    .notes { margin-top: 24px; color: #555; font-size: 13px; white-space: pre-wrap; }
    @media print {
      body { margin: 16px; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <h1>Invoice</h1>
  <div class="meta">${escapeHtml(d.number)} · ${escapeHtml(d.date)}</div>
  <div class="grid">
    <div class="box"><div class="label">From</div>${escapeHtml(d.from) || "—"}</div>
    <div class="box"><div class="label">Bill to</div>${escapeHtml(d.to) || "—"}</div>
  </div>
  <table>
    <thead>
      <tr><th>#</th><th>Description</th><th class="num">Qty</th><th class="num">Price</th><th class="num">Amount</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="totals">
    <div><span>Subtotal</span><span>${escapeHtml(formatMoney(subtotal, d.currency))}</span></div>
    <div><span>Tax (${escapeHtml(d.taxPercent)}%)</span><span>${escapeHtml(formatMoney(tax, d.currency))}</span></div>
    <div class="grand"><span>Total</span><span>${escapeHtml(formatMoney(total, d.currency))}</span></div>
  </div>
  ${d.notes ? `<div class="notes">${escapeHtml(d.notes)}</div>` : ""}
</body>
</html>`;
}
