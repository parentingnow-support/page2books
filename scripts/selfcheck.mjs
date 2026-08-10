#!/usr/bin/env node
/** Self-check for pure helpers (no Chrome). */
import {
  buildDraftFromExtract,
  detectCurrency,
  extractCandidatesFromText,
  formatMoney,
  invoiceTotals,
  isRestrictedUrl,
  lineTotal,
  normalizeAmountToken,
  renderInvoiceHtml,
  summarizeUrl,
} from "../src/feature.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

assert(isRestrictedUrl("chrome://extensions"), "isRestrictedUrl chrome://");
assert(!isRestrictedUrl("https://example.com/path"), "isRestrictedUrl https");
assert(isRestrictedUrl("file:///tmp/x.html"), "isRestrictedUrl file");

const s = summarizeUrl("https://www.example.com/a/b?q=1#hash");
assert(s.host === "www.example.com" && s.path === "/a/b?q=1", `summarizeUrl ${JSON.stringify(s)}`);

assert(normalizeAmountToken("₩12,000") === 12000, "normalizeAmountToken KRW");
assert(normalizeAmountToken("$19.99") === 19.99, "normalizeAmountToken USD");
assert(detectCurrency("12,000원") === "KRW", "detectCurrency KRW");
assert(detectCurrency("$19.99") === "USD", "detectCurrency USD");

const sampleText = `
Acme Desk Lamp
Premium LED lamp for freelancers

Price: ₩45,000
Also from: $12.00
`;

const extracted = extractCandidatesFromText({
  title: "Acme Desk Lamp | Shop",
  url: "https://shop.example.com/lamp",
  text: sampleText,
  names: ["Acme Desk Lamp"],
});
assert(extracted.amounts.length >= 1, "extract amounts");
assert(extracted.currency === "KRW", `currency ${extracted.currency}`);
assert(extracted.names.some((n) => /Lamp/i.test(n)), "extract names");

const draft = buildDraftFromExtract(extracted);
assert(draft.lines[0].unitPrice === 45000, `unitPrice ${draft.lines[0].unitPrice}`);
assert(draft.lines[0].qty === 1, "qty");
assert(lineTotal(draft.lines[0]) === 45000, "lineTotal");

draft.taxPercent = 10;
const totals = invoiceTotals(draft);
assert(totals.subtotal === 45000, "subtotal");
assert(totals.tax === 4500, "tax");
assert(totals.total === 49500, "total");
assert(formatMoney(49500, "KRW") === "₩49,500", `formatMoney ${formatMoney(49500, "KRW")}`);

const html = renderInvoiceHtml(draft);
assert(html.includes("Invoice"), "html title");
assert(html.includes("Acme Desk Lamp"), "html description");
assert(html.includes("₩49,500"), "html total");
assert(!html.includes("<script"), "html no script");

console.log("ok page2invoice selfcheck");
