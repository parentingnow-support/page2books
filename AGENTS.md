# Page2Books — agent notes

- **Product:** Chrome MV3 popup — **Page2Books**: extract page → Invoice PDF or Expense CSV (tabs). D-04, D-05.
- **Repo:** local → `parentingnow-support/page2books` (public): https://github.com/parentingnow-support/page2books
- **Commit identity (required):** author/committer **only** `parentingnow-support <315293947+parentingnow-support@users.noreply.github.com>`. Never `parentingnow`, `wai-khkim`, `codingwalks`, `cursoragent`, or personal emails. Never any `Co-authored-by:` trailer (GitHub adds them as contributors). Hooks: `.githooks/pre-commit` + `.githooks/commit-msg`. Push: `PARENTINGNOW_GH_TOKEN` from `.env`.
- **Push auth:** local `.env` — `PARENTINGNOW_GH_TOKEN` (public push), `GH_TOKEN` defaults to parentingnow. Never commit.
- **Tips:** Gumroad `$5` → https://parentingnow.gumroad.com/l/tip (`.github/FUNDING.yml`). KR bank payout via Gumroad; not BMC/GitHub Sponsors.
- **Source idea:** app-school `2026-08-05-웹페이지원클릭송장생성확장` (GO-MVP).
- **Funnel:** `docs/FUNNEL.md` — GitHub / CWS; metric = real invoice generations.
- Self-check: `node scripts/selfcheck.mjs`
