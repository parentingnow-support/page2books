import { buildDraftFromExtract, renderInvoiceHtml } from "./src/feature.js";

const STORAGE_KEY = "page2invoiceDraft";

async function main() {
  const stored = await chrome.storage.session.get(STORAGE_KEY);
  const draft = stored[STORAGE_KEY] || buildDraftFromExtract({});
  const html = renderInvoiceHtml(draft);
  const doc = document.getElementById("doc");
  const frame = document.createElement("iframe");
  frame.setAttribute("title", "Invoice preview");
  doc.replaceChildren(frame);
  const frameDoc = frame.contentDocument;
  frameDoc.open();
  frameDoc.write(html);
  frameDoc.close();

  document.getElementById("printBtn").addEventListener("click", () => {
    frame.contentWindow.focus();
    frame.contentWindow.print();
  });

  // Auto-open print dialog once preview is ready.
  setTimeout(() => {
    try {
      frame.contentWindow.focus();
      frame.contentWindow.print();
    } catch (_) {
      /* user can click the button */
    }
  }, 250);
}

main().catch((err) => {
  document.getElementById("doc").textContent =
    err?.message || "Could not load invoice draft.";
});
