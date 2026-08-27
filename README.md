# Page2Books

> **Formerly Page2Invoice** — same extension, now Invoice + Expense in one popup.

[![Tip on Gumroad · ~$5](docs/gumroad-tip-banner.png)](https://parentingnow.gumroad.com/l/tip)

Chrome extension: turn the **current page** into an **invoice draft** or **expense row** in one click — no account.

**Invoice tab:** extract → edit → export PDF.  
**Expense tab:** extract → edit → save locally → export CSV.

Privacy: [`docs/privacy.md`](docs/privacy.md)

## Try in ~30 seconds

1. Clone this repo (or [download ZIP](https://github.com/parentingnow-support/page2books/archive/refs/heads/main.zip) and unzip).
2. Open `chrome://extensions` → enable **Developer mode**.
3. **Load unpacked** → select this folder (the one with `manifest.json`).
4. Open a product page **or** a receipt/billing page.
5. Click the toolbar icon → choose **Invoice** or **Expense** → **Extract** → edit → **Export PDF** or **Save** + **Export CSV**.

```bash
git clone https://github.com/parentingnow-support/page2books.git
cd page2books
npm test
# then Load unpacked → this directory
```

## What you get

- One-click extract from the active tab (shared across both modes)
- **Invoice:** editable draft (from, bill-to, line items, tax, notes) → PDF via Chrome print
- **Expense:** merchant, amount, KR category, memo → saved on device → CSV export

## Not yet

CWS resubmit · perfect site-specific parsers · accounts / sync · Pro

## Develop

```bash
npm test                 # selfcheck + phase1 fixtures
npm run smoke            # Chrome + demo product page extract
bash scripts/pack-cws.sh # → dist/page2books-cws.zip
```

Fixtures: `fixtures/demo-product.html` (invoice), `fixtures/demo-receipt.html` (expense).
