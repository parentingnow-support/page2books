# Stack — Page2Invoice

> Source of truth for tooling. Change only with a new `decisions.md` entry.

## Profile: `mv3-popup` (+ on-demand extract)

| Layer | Choice |
| --- | --- |
| Platform | Chrome Manifest V3 |
| UI | Toolbar **popup** (`popup.html`) |
| Page access | `chrome.scripting.executeScript` on user click (`activeTab`) |
| Language | Vanilla JS modules (`"type": "module"`) |
| Bundler | **None** (Load unpacked = repo root) |
| PDF (Phase 1) | Prefer `window.print()` / print CSS; html2pdf only if print path fails DoD |
| Tests | `node scripts/selfcheck.mjs` (pure helpers) |
| Package | `scripts/pack-cws.sh` → `dist/page2invoice-cws.zip` |

## Permissions (Phase 1)

| Permission | Why |
| --- | --- |
| `activeTab` | Read active tab + inject extract on gesture |
| `scripting` | `executeScript` for DOM candidate scrape |
| `host_permissions` | **None** until a real remote fetch exists |

## Why not default side panel

App-school MVP is a one-shot “Extract → draft → PDF” flow. Popup fits; side panel can wait for a later D-xx if editing needs persistence.

## Must NOT assume

- React, Tailwind, TypeScript, or a build step
- Backend / accounts / analytics
- Persistent `<all_urls>` content_scripts
- Paid CWS listing or IAP on day one
