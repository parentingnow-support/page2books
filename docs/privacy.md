# Privacy — Page2Books

**Last updated:** 2026-08-27

Page2Books is a Chrome extension with two modes in one popup:

- **Invoice** — turn the current page into an invoice draft and export PDF  
- **Expense** — turn a receipt or billing page into an expense row and export CSV

## What we access

- **Active tab** — when you click Extract, we read the current page DOM in that tab to find title/amount candidates (and similar fields for expenses).
- **Session storage** — the invoice draft is kept briefly in Chrome session storage so the print/PDF tab can render it. It is not synced to the cloud.
- **Local storage** — saved expense rows (merchant, date, amount, category, memo, source URL) are stored in `chrome.storage.local` on your device only. Not synced to a server.
- **Network** — none (no `host_permissions`).

## What we do not do

- No accounts or sign-in  
- No analytics or advertising SDKs  
- No selling or renting personal data  
- No collecting browsing history beyond the page you explicitly extract  
- No cloud upload of page contents or saved expenses

## Data leaving your device

None for the core flows. Processing stays on your device.

- **Invoice:** extract → edit → PDF (session storage only for print handoff)  
- **Expense:** extract → edit → save locally → CSV download when you click Export CSV

## Contact

Issues: https://github.com/parentingnow-support/page2books/issues
