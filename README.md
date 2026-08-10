# Page2Invoice

[![Tip on Gumroad · ~$5](docs/gumroad-tip-banner.png)](https://parentingnow.gumroad.com/l/tip)

Chrome extension: turn the **current page** into an **invoice draft** in one click — no account.

Extract title/amount candidates from the page you’re viewing, edit the draft, then export PDF from Chrome’s print dialog.

Privacy: [`docs/privacy.md`](docs/privacy.md)

## Try in ~30 seconds

1. Clone this repo (or [download ZIP](https://github.com/parentingnow-support/page2invoice/archive/refs/heads/main.zip) and unzip).
2. Open `chrome://extensions` → enable **Developer mode**.
3. **Load unpacked** → select this folder (the one with `manifest.json`).
4. Open a product, estimate, or quote page.
5. Click the **Page2Invoice** toolbar icon → **Extract from current page** → edit → **Export PDF (print)** → choose **Save as PDF**.

```bash
git clone https://github.com/parentingnow-support/page2invoice.git
cd page2invoice
# then Load unpacked → this directory
```

Optional check (no Chrome): `npm test`

## What you get

- One-click extract of title / amount candidates from the active tab  
- Editable invoice draft (from, bill-to, line items, tax, notes)  
- PDF export via Chrome print (**Save as PDF**)

## Not yet

Chrome Web Store listing · perfect site-specific parsers · accounts / sync · Pro

## Develop

```bash
npm test                 # selfcheck + phase1 fixtures
npm run smoke            # Chrome + demo product page extract
```
