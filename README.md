# Page2Invoice

[![Tip on Gumroad · ~$5](docs/gumroad-tip-banner.png)](https://parentingnow.gumroad.com/l/tip)

Chrome extension: turn the **current page** into an **invoice draft** in one click.

Extract item/amount candidates from the page you’re viewing, edit a simple invoice, then export PDF — no account.

Privacy: [`docs/privacy.md`](docs/privacy.md)

## Try in ~30 seconds

1. Clone this repo (or [download ZIP](https://github.com/parentingnow-support/page2invoice/archive/refs/heads/main.zip) and unzip).
2. Open `chrome://extensions` → enable **Developer mode**.
3. **Load unpacked** → select this folder (the one with `manifest.json`).
4. Open a normal product / estimate / email page (or `fixtures/demo-product.html` via a local static server).
5. Click the **Page2Invoice** toolbar icon → **Extract from current page** → edit → **Export PDF (print)**.

```bash
git clone https://github.com/parentingnow-support/page2invoice.git
cd page2invoice
# then Load unpacked → this directory
```

## What works today

- One-click extract of title / amount candidates from the active tab  
- Editable invoice draft (from, bill-to, lines, tax, notes)  
- PDF via Chrome print dialog (**Save as PDF**)

## Coming next

Chrome Web Store listing · better site-specific parsers

## Not planned for now

Accounts · sync · analytics · Pro paywall
