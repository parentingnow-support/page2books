# Chrome Web Store — listing playbook

Submit at [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole).  
One-time **$5** developer registration (Google account).

## Package

```bash
bash scripts/pack-cws.sh
# → dist/page2invoice-cws.zip
```

Upload **`dist/page2invoice-cws.zip`** (also copied to Desktop as `page2invoice-cws.zip`).  
Runtime files only — no `docs/`, `.cursor/`, `scripts/`, `.git/`.

## Store listing (English)

**Name:** Page2Invoice  

**Short description (≤132 chars):**
```
Turn the current page into an invoice draft in one click.
```

**Detailed description:**
```
Page2Invoice turns the page you’re viewing into an editable invoice draft — then export PDF. No account.

• One-click extract of title and amount candidates from the active tab
• Edit from / bill-to / line items / tax / notes
• Export PDF via Chrome print (Save as PDF)

How to use:
1. Click the Page2Invoice toolbar icon
2. Click Extract from current page
3. Edit the draft
4. Click Export PDF (print) → Save as PDF

Privacy: page content is processed on your device for extract → draft → PDF. No accounts, no analytics SDK, no sale of data. Drafts stay in Chrome session storage only for printing.
```

**Category:** Productivity  
**Language:** English  
**Screenshots:** `docs/cws-screenshot-1280x800.png` (Desktop: `~/Desktop/page2invoice-cws-screenshot.png`)  
**Store icon (128×128):** `docs/cws-store-icon-128.png` (Desktop: `~/Desktop/page2invoice-cws-icon128.png`)  
**Official URL:** `https://github.com/parentingnow-support/page2invoice`  
**Support URL:** `https://github.com/parentingnow-support/page2invoice/issues`  
**Privacy policy URL:** `https://github.com/parentingnow-support/page2invoice/blob/main/docs/privacy.md`

## Privacy (dashboard) — fill

Match [`privacy.md`](./privacy.md) + `manifest.json` permissions (`activeTab`, `scripting`, `storage`):

- **Single purpose:** Extract invoice candidates from the active page and help the user edit/export an invoice draft as PDF on-device.
- **activeTab:** Access the page the user is viewing only after they click Extract, to read title/amount candidates from that tab’s DOM.
- **scripting:** Inject a one-shot extract script into the active tab when the user clicks Extract.
- **storage:** Keep the invoice draft briefly in Chrome session storage so the print/PDF tab can render it. Not synced to a server.
- **Host permissions:** None.
- **Remote code:** No.
- **Data disclosure:** None sold; no remote collection for the core flow. Processing stays on-device. (If the form asks about “website content”: yes — read from the active tab only on explicit Extract.)

## Submit checklist

1. Pay $5 developer fee if first time (same publisher as other parentingnow / burots items if already paid)  
2. **New item** → Upload `page2invoice-cws.zip`  
3. Store listing (name, short, detailed, screenshot, **store icon**)  
4. Privacy practices + policy URL above  
5. Distribution: **Public**  
6. Free + Gumroad tip off-store → stay **non-seller** (no in-store payments)  
7. **Submit for review**

## Submission record

| | |
| --- | --- |
| **Publisher** | `burots` (`parentingnow.support@gmail.com`) |
| **Item ID** | `alghfalfbeglnoffbmcjmongekjecpne` |
| **Dashboard** | [devconsole item](https://chrome.google.com/webstore/devconsole/dbd1aaf7-30a2-4f9c-a7e5-2388d2d06cf1/alghfalfbeglnoffbmcjmongekjecpne/edit) |
| **Status** | 검토 대기 중 (submitted) |
| **Store URL** | _(add when approved)_ `https://chromewebstore.google.com/detail/alghfalfbeglnoffbmcjmongekjecpne` |

## Operator notes

- Dashboard login + Submit must be done in the publisher Google account (automation cannot finish this step).  
- When approved: paste store URL into README + FUNNEL; update this file + `PROJECT_STATUS.md`.

## Asset sizes

| Asset | Size |
| --- | --- |
| Store icon | 128×128 PNG |
| Screenshot | 1280×800 PNG/JPEG |
| Toolbar icons | 16 / 48 / 128 in `icons/` |
