# Project status — Page2Books

> Update when finishing a meaningful chunk. Agents: do not invent progress.

| | |
| --- | --- |
| **Phase** | Phase 4 done — rebranded Page2Invoice → Page2Books; CWS resubmit pending |
| **Version** | `0.2.0` (Invoice + Expense tabs) |
| **Stack** | `mv3-popup` |
| **Next** | Operator: GitHub repo rename → `pack-cws.sh` → CWS upload + screenshots → resubmit |
| **Blockers** | CWS dashboard (publisher `burots`) |

## Done

- [x] Factory bootstrap + public parentingnow-support repo (was `page2invoice`)
- [x] Extract candidates from active tab
- [x] Editable invoice draft UI + Print / Save as PDF
- [x] Expense tab (extract → edit → `storage.local` → CSV export)
- [x] `npm test` (selfcheck + phase1 fixtures)
- [x] Privacy + CWS listing copy (expense local storage)
- [x] **Page2Books rebrand** (manifest, popup, docs, zip name)
- [x] Popup + listing shot assets (Invoice; Expense mock in `scripts/`)

## Now

- [ ] GitHub: rename repo `page2invoice` → `page2books` (Settings → Rename)
- [ ] CWS: upload `dist/page2books-cws.zip` (v0.2.0) + listing from [`CWS.md`](./CWS.md) (**Name: Page2Books**)
- [ ] CWS: screenshots — Invoice + Expense (`scripts/cws-screenshot*.html`)
- [ ] After approval → store URL in README + FUNNEL

## Later

- [ ] Soft launch ([`FUNNEL.md`](./FUNNEL.md))
- [ ] Pro / paywall (after ~10 real users)
