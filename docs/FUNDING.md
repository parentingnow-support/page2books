# Funding — tips & Pro

> Default for KR-based solo: **Gumroad tip first**. Record the live URL in `decisions.md`.

## Why Gumroad (default)

| Channel | KR bank payout? | Notes |
| --- | --- | --- |
| **Gumroad tip** | Yes (typical path) | `$5` tip product; link from README / `.github/FUNDING.yml` |
| Buy Me a Coffee | Often Stripe | May be unavailable / painful for KR |
| GitHub Sponsors | Stripe | Same KR constraint |
| CWS paid item | Google payments | Extra seller verification — skip until you truly sell in-store |

## Tip (sooner)

1. Create a Gumroad product (~`$5`, “tip / coffee”).
2. Put URL in `.github/FUNDING.yml` (`custom:`).
3. README one-liner only after soft launch signal — not as the hero CTA on day 0.

**Copy:**
```
Useful? Tip on Gumroad — ~$5
https://parentingnow.gumroad.com/l/tip
```

## Pro (later — after ~10 real users)

| | Choice |
|--|--------|
| **Feature** | **One** clear unlock (not a bundle of maybes) |
| **Price** | ~`$9` one-time |
| **Fallback** | Drop Pro, keep `$5` tip |

Do **not** implement Pro in Phase 1.

## FUNDING.yml example

See [`.github/FUNDING.yml.example`](../.github/FUNDING.yml.example). Copy to `FUNDING.yml` when the tip URL is live.

## Must NOT

- Fake tip URLs in public README
- Put price CTA in the first community post
- Add analytics “to measure conversion” before first value works
