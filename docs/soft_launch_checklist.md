# Soft launch checklist — Page2Invoice

> Code/docs in repo. Publisher account + store forms = operator.

## Legend

| Tag | Meaning |
| --- | --- |
| **Repo** | Agent/code can complete |
| **Console** | Operator only (CWS / Gumroad / GitHub) |

## Before anyone else installs

### Repo

- [x] `YOUR_*` placeholders gone from user-facing strings
- [x] Phase 1 DoD met ([`develop_plan.md`](./develop_plan.md))
- [x] `node scripts/selfcheck.mjs` PASS
- [ ] Load unpacked smoke on a **real** target page
- [x] README 30-second install path
- [ ] `docs/demo.png` (or equivalent)
- [x] `docs/privacy.md` matches manifest permissions
- [x] `.env` not committed; `.gitignore` covers secrets
- [ ] Icons not leftover solid placeholders (or accept as temp)

### Console (optional this week)

- [ ] Public GitHub repo + push
- [ ] Gumroad tip product (can wait until after first signals)
- [ ] CWS $5 registration (can wait; unpacked is enough to launch)
