#!/usr/bin/env node
/**
 * Phase 1 fixture test — extract → draft → printable HTML.
 * No Chrome required.
 */
import {
  buildDraftFromExtract,
  extractCandidatesFromText,
  invoiceTotals,
  renderInvoiceHtml,
} from "../src/feature.js";

const fixtures = [
  {
    name: "kr-product",
    title: "원목 모니터 스탠드",
    url: "https://store.example.kr/stand",
    text: "원목 모니터 스탠드\n높이 조절 가능\n판매가 32,000원\n배송비 3,000원",
    expectCurrency: "KRW",
    expectPrice: 32000,
  },
  {
    name: "usd-saas",
    title: "SidePay — simple invoices",
    url: "https://sidepay.example.com/",
    text: "SidePay\nOne-time $9\nNo subscription",
    expectCurrency: "USD",
    expectPrice: 9,
  },
  {
    name: "email-quote",
    title: "Re: Website redesign quote",
    url: "https://mail.example.com/u/0/#inbox/abc",
    text: "Hi,\nWebsite redesign package: ₩1,200,000\nIncludes 5 pages.\nThanks",
    expectCurrency: "KRW",
    expectPrice: 1200000,
  },
];

let failed = 0;
for (const fx of fixtures) {
  const ex = extractCandidatesFromText({
    title: fx.title,
    url: fx.url,
    text: fx.text,
  });
  const draft = buildDraftFromExtract(ex);
  const okCurrency = draft.currency === fx.expectCurrency;
  const okPrice = draft.lines[0].unitPrice === fx.expectPrice;
  const html = renderInvoiceHtml({
    ...draft,
    from: "Parenting Now",
    to: "Client Co.",
    taxPercent: 0,
  });
  const okHtml =
    html.includes(draft.lines[0].description.slice(0, 12)) &&
    html.includes("Invoice");
  const pass = okCurrency && okPrice && okHtml;
  console.log(
    `${pass ? "PASS" : "FAIL"} ${fx.name} currency=${draft.currency} price=${draft.lines[0].unitPrice} total=${invoiceTotals(draft).total}`
  );
  if (!pass) failed += 1;
}

if (failed) {
  console.error(`phase1 fixtures failed: ${failed}`);
  process.exit(1);
}
console.log("ok page2invoice phase1 fixtures");
