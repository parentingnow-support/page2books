# Chrome Web Store — listing playbook

Submit at [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole).  
One-time **$5** developer registration (Google account).

## Package

```bash
bash scripts/pack-cws.sh
# → dist/page2invoice-cws.zip
```

Upload the zip only (runtime files). Do **not** include `docs/`, `.cursor/`, `scripts/`, `.git/`.

## Store listing (English) — fill

**Name:** Page2Invoice  

**Short description (≤132 chars):**
```
Turn the current page into an invoice draft in one click.
```

**Detailed description:**
```
Page2Invoice extracts invoice candidates from the page you are viewing.

• One-click extract from the active tab
• Editable invoice draft
• PDF export without an account

How to use:
1. Click the toolbar icon to open the popup
2. Click Extract from current page
3. Edit the draft and export PDF

Privacy: Page content is processed on-device for extract→draft→PDF. No accounts, no analytics SDK, no sale of data.
```

**Category:** Productivity  
**Language:** English  
**Screenshots:** `docs/cws-screenshot-1280x800.png` (1280×800 or 1280×800 JPEG)  
**Store icon (128×128):** `docs/cws-store-icon-128.png`  
**Official URL:** `https://github.com/parentingnow-support/page2invoice`  
**Support URL:** `https://github.com/parentingnow-support/page2invoice/issues`  
**Privacy policy URL:** `https://github.com/parentingnow-support/page2invoice/blob/main/docs/privacy.md`

## Privacy (dashboard)

Fill honestly to match [`privacy.md`](./privacy.md) and `manifest.json`:

- **Single purpose:** one sentence
- **sidePanel:** why
- **tabs:** usually “active tab URL only for …”
- **storage:** local prefs or remove permission
- **Host permissions:** list each host and why
- **Remote code:** No (default)
- **Data disclosure:** only what you actually send

## Submit checklist

1. Pay $5 developer fee if first time  
2. **New item** → Upload zip  
3. Store listing (name, short, detailed, screenshot, **store icon**)  
4. Privacy practices + policy URL  
5. Distribution: Public  
6. If free + external tip only → stay **non-seller** (no in-store payments)  
7. **Submit for review**

## After submit

- Paste store URL into README + launch-post comment when approved.
- Community post can ship **before** CWS approval (unpacked install).

## Asset sizes (remember)

| Asset | Size |
| --- | --- |
| Store icon | 128×128 PNG |
| Screenshot | 1280×800 (or 640×400) |
| Toolbar icons | 16 / 48 / 128 in `icons/` |
