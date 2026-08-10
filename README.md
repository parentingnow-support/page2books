# Page2Invoice

[![Tip on Gumroad · ~$5](docs/gumroad-tip-banner.svg)](https://parentingnow.gumroad.com/l/tip)

Chrome extension: turn the **current page** into an **invoice draft** in one click — extract items/amounts, fill a simple template, export PDF.

App-school source: `cycles/2026-08-05-웹페이지원클릭송장생성확장` (GO-MVP).

**Phase 1 (target):** popup → extract from active tab → editable invoice draft → PDF.  
Funnel: [`docs/FUNNEL.md`](docs/FUNNEL.md) · CWS: [`docs/CWS.md`](docs/CWS.md) · Privacy: [`docs/privacy.md`](docs/privacy.md)

## Try in ~30 seconds

1. Clone this repo (or [download ZIP](https://github.com/parentingnow-support/page2invoice/archive/refs/heads/main.zip) and unzip).
2. Open `chrome://extensions` → enable **Developer mode**.
3. **Load unpacked** → select this folder (the one with `manifest.json`).
4. Open a normal product / estimate / email page.
5. Click the **Page2Invoice** toolbar icon → **Extract from current page**.

```bash
git clone https://github.com/parentingnow-support/page2invoice.git
cd page2invoice
# then Load unpacked → this directory
```

Optional check (no Chrome): `node scripts/selfcheck.mjs`

## What you get (when Phase 1 lands)

- One-click extract of name / amount / qty candidates from the page DOM  
- Editable invoice draft (seller, buyer, line items, tax)  
- PDF export (print or html→pdf)

## Not yet

Account / sync · multi-currency polish · Chrome Web Store listing · Pro

## Layout

| Path | Role |
|------|------|
| `manifest.json` | MV3 + popup |
| `background.js` | Service worker (minimal) |
| `popup.html` / `.css` / `.js` | Extract + draft UI |
| `src/` | Pure helpers (selfcheckable) |
| `icons/` | Toolbar icons |

## Develop

```bash
node scripts/selfcheck.mjs
```

Public repo: [parentingnow-support/page2invoice](https://github.com/parentingnow-support/page2invoice)

**Metric:** 7 days → ~5 people who actually generated an invoice (not install count).
