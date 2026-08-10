# Project status — Page2Invoice

> Update when finishing a meaningful chunk. Agents: do not invent progress.

| | |
| --- | --- |
| **Phase** | Phase 1 build (extract → draft → PDF) |
| **Stack** | `mv3-popup` |
| **Next** | Operator: upload zip in CWS dashboard → Submit for review |
| **Blockers** | CWS Submit requires publisher Google account (cannot automate) |

## Done

- [x] Factory bootstrap + public parentingnow-support repo
- [x] Extract candidates from active tab
- [x] Editable invoice draft UI
- [x] Print / Save as PDF view
- [x] `node scripts/selfcheck.mjs` + `test_phase1.mjs`
- [x] CWS package + listing assets (`dist/page2invoice-cws.zip`, store icon, 1280×800 screenshot)

## Now

- [ ] CWS dashboard: New item → upload zip → listing → privacy → Submit
- [ ] Soft launch ([`FUNNEL.md`](./FUNNEL.md)) after/with review
