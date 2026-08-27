# Chrome Web Store — listing playbook

Submit at [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole).  
One-time **$5** developer registration (Google account).

## Package

```bash
bash scripts/pack-cws.sh
# → dist/page2books-cws.zip
```

Upload **`dist/page2books-cws.zip`** (also copied to Desktop as `page2books-cws.zip`).  
Runtime files only — no `docs/`, `.cursor/`, `scripts/`, `.git/`.

## Store listing (English)

**Name:** Page2Books  

**Short description (≤132 chars):**
```
Invoice PDF & expense CSV from the current page — one click, no account.
```

**Detailed description:**
```
Page2Books helps freelancers turn the page you’re viewing into bookkeeping drafts — on your device, no account.

Two modes in one popup:

INVOICE
• One-click extract of title and amount candidates from the active tab
• Edit from / bill-to / line items / tax / notes
• Export PDF via Chrome print (Save as PDF)

EXPENSE
• Extract merchant, amount, and date from receipt or billing pages
• Pick a KR category, add a memo, save on this device
• Export all saved expenses to CSV

How to use:
1. Click the Page2Books toolbar icon
2. Choose Invoice or Expense
3. Click Extract on the page you’re viewing
4. Edit, then Export PDF (invoice) or Save + Export CSV (expense)

Privacy: page content is processed on your device. Invoice drafts use session storage only for printing. Saved expenses stay in Chrome local storage on this device. No analytics SDK, no sale of data.
```

**Category:** Productivity  
**Language:** English  
**Screenshots:** `docs/cws-screenshot-1280x800.png` (Invoice tab; also JPEG). Optional second shot: open `scripts/cws-screenshot-expense.html` in a browser and capture 1280×800 for the Expense tab. Product page + popup only — **no** fake store chrome, stars, ratings, user counts, or Featured/Free/#1 badges (CWS Red Nickel). Desktop: `~/Desktop/page2books-cws-screenshot.png` / `.jpg`  
**Store icon (128×128):** `docs/cws-store-icon-128.png` (Desktop: `~/Desktop/page2books-cws-icon128.png`)  
**Official URL:** `https://github.com/parentingnow-support/page2books`  
**Support URL:** `https://github.com/parentingnow-support/page2books/issues`  
**Privacy policy URL:** `https://github.com/parentingnow-support/page2books/blob/main/docs/privacy.md`

## Privacy (dashboard) — fill

Match [`privacy.md`](./privacy.md) + `manifest.json` permissions (`activeTab`, `scripting`, `storage`):

- **Single purpose:** Extract title/amount candidates from the active page and help the user create an invoice PDF or save/export expense rows on-device.
- **activeTab:** Access the page the user is viewing only after they click Extract, to read title/amount candidates from that tab’s DOM.
- **scripting:** Inject a one-shot extract script into the active tab when the user clicks Extract.
- **storage:** (1) Invoice draft in Chrome **session** storage for print/PDF handoff. (2) Saved expense rows in Chrome **local** storage on this device only. Not synced to a server.
- **Host permissions:** None.
- **Remote code:** No.
- **Data disclosure:** None sold; no remote collection for the core flow. Processing stays on-device. (If the form asks about “website content”: yes — read from the active tab only on explicit Extract.)

## Submit checklist

1. Pay $5 developer fee if first time (same publisher as other parentingnow / burots items if already paid)  
2. **New item** → Upload `page2books-cws.zip`  
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
| **Status** | 거부됨 (Red Nickel — fake store screenshot). v0.2.0 adds Expense tab; upload new zip + screenshots, then resubmit. |
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
