# Mentality — Extension Factory

> Distilled from shipping a small niche Chrome utility (side panel). Defaults, not dogma.

## Build

1. **YAGNI ladder** — skip building if unused; reuse; stdlib; platform API; then minimum code.
2. **One composition, one job** — Phase 1 = one first-value path. No dashboard of half-features.
3. **Pure helpers in `src/`** — anything without `chrome.*` should be unit-checkable via `selfcheck.mjs`.
4. **No bundler until pain** — Load unpacked from repo root beats Vite ceremony for v0.
5. **Minimal permissions** — every host_permission needs a real `fetch` or documented reason.
6. **Bug = shared guard** — fix the helper once, not each caller.

## Ship

1. **Metric = real use** — ~10 people who got value on a real page, not install count.
2. **README = install landing** — 30-second Load unpacked before CWS exists.
3. **Community smoke > friend smoke** when friends aren't the audience (e.g. niche forums).
4. **Automated smoke first** — selfcheck stops regressions; human/community validates product.
5. **Show / post before polish** — ship Phase 1, fix the one UX that blocks, then deepen.

## Money

1. **Tip before Pro** — `$3–5` tip feels like thanks; Pro after signal.
2. **No price CTA on first launch** — trust first.
3. **KR payout reality** — prefer Gumroad (bank payout). BMC / GitHub Sponsors often need Stripe and may fail for KR.
4. **CWS non-seller** if you're not selling in-store — avoids payment-profile waits for free+tip extensions.
5. **Pro ladder (indie utility)** — tip `$5` → one-time Pro ~`$9` → avoid `$25+` until the feature clearly earns it.

## Scope hygiene

1. **Do not mix unrelated products** into this repo.
2. **Out of scope until ~10 users** — ads, SEO landing farms, SaaS login, analytics SDKs.
3. **Privacy matches behavior** — CWS declaration and `privacy.md` must equal what the code does.

## Agent defaults

- Read docs hub before coding; write decisions only when confirmed.
- Prefer deletion and short diffs.
- Leave one runnable check for non-trivial logic.
- Never commit `.env` or tokens.
