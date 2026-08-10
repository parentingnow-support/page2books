# Privacy — Page2Invoice

**Last updated:** 2026-08-10

Page2Invoice is a Chrome extension that turns the current page into an invoice draft in one click.

## What we access

- **Active tab** — when you click Extract, we read the current page DOM in that tab to find invoice candidates (title, amounts, etc.).
- **Session storage** — the invoice draft is kept briefly in Chrome session storage so the print/PDF tab can render it. It is not synced to the cloud.
- **Network** — none in Phase 1 (no `host_permissions`).

## What we do not do

- No accounts or sign-in  
- No analytics or advertising SDKs  
- No selling or renting personal data  
- No collecting browsing history beyond the page you explicitly extract  
- No cloud upload of page contents

## Data leaving your device

None for the core extract → draft → PDF flow. Processing stays on your device.

## Contact

Issues: https://github.com/parentingnow-support/page2invoice/issues
