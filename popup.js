/**
 * Popup — Phase 0 scaffold: show active URL + inject extract stub.
 * Phase 1 fills invoice draft + PDF (see docs/develop_plan.md).
 */
import { isRestrictedUrl, summarizeUrl } from "./src/feature.js";

const el = {
  statusMsg: () => document.getElementById("statusMsg"),
  pageUrl: () => document.getElementById("pageUrl"),
  extractBtn: () => document.getElementById("extractBtn"),
  result: () => document.getElementById("result"),
  resultBody: () => document.getElementById("resultBody"),
};

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
      /(?:₩|￦|KRW|USD|\$|€)\s?[\d,]+(?:\.\d+)?|[\d,]+(?:\.\d+)?\s?(?:원|KRW|USD)/gi
    ) || [];
  const title = document.title || "";
  return {
    title,
    url: location.href,
    amounts: [...new Set(money)].slice(0, 12),
  };
}

async function showActivePage() {
  const tab = await activeTab();
  const url = tab?.url || "";
  el.pageUrl().textContent = url || "(no active tab)";
  el.result().classList.add("hidden");

  if (!tab?.id || !url || isRestrictedUrl(url)) {
    setStatus("Open a normal web page, then extract.");
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
    el.resultBody().textContent = JSON.stringify(result, null, 2);
    el.result().classList.remove("hidden");
    setStatus("Candidates from this page (draft extract).");
  } catch (err) {
    setStatus(err?.message || "Extract failed on this page.");
  } finally {
    el.extractBtn().disabled = false;
  }
}

showActivePage();
el.extractBtn().addEventListener("click", () => onExtract());
