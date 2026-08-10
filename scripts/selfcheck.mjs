#!/usr/bin/env node
/** Minimal self-check for pure helpers (no Chrome). */
import {
  isRestrictedUrl,
  normalizeAmountToken,
  summarizeUrl,
} from "../src/feature.js";

if (!isRestrictedUrl("chrome://extensions")) {
  throw new Error("isRestrictedUrl chrome://");
}
if (isRestrictedUrl("https://example.com/path")) {
  throw new Error("isRestrictedUrl https");
}

const s = summarizeUrl("https://www.example.com/a/b?q=1#hash");
if (s.host !== "www.example.com" || s.path !== "/a/b?q=1") {
  throw new Error(`summarizeUrl ${JSON.stringify(s)}`);
}

if (normalizeAmountToken("₩12,000") !== "12000") {
  throw new Error("normalizeAmountToken KRW");
}
if (normalizeAmountToken("$19.99") !== "19.99") {
  throw new Error("normalizeAmountToken USD");
}

console.log("ok page2invoice selfcheck");
