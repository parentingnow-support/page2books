# Funnel — Page2Books

```
인지 → 설치 → 첫 가치 1회 → 재사용 → (선택) 공유/후원 → (나중) Pro
```

| 단계 | 채널 / 액션 |
|------|-------------|
| 인지 | Freelance / HN / indie communities · CWS search (“invoice”, “expense”) |
| 설치 | GitHub(README) 또는 Chrome Web Store |
| 첫 가치 | Extract → draft filled → PDF once |
| 재사용 | 매주 invoicing 할 때 같은 플로우 |
| 공유 | Post update · star/issue · tip |
| 나중 | Pro one-time (after ~10 real users) |

**지표:** 7일 내 실제 송장 생성 ~5명 (설치 수 아님).  
**포지션:** Web-page → invoice or expense autofill — not another blank form or cloud receipt SaaS.

## Checklist

### Before launch

- [ ] Phase 1 first-value works unpacked on a real page
- [ ] README: 30초 Load unpacked
- [ ] Demo screenshot — `docs/demo.png`
- [ ] `node scripts/selfcheck.mjs` PASS
- [ ] Privacy draft matches permissions ([`privacy.md`](./privacy.md))

### Launch week

- [x] Public repo pushed (`main`) with privacy URLs
- [ ] Community / Show-style post (draft below)
- [x] CWS submit ([`CWS.md`](./CWS.md)) — pending review (`alghfalfbeglnoffbmcjmongekjecpne`)
- [x] Account: **non-seller** (free; tip via Gumroad outside store)

### After launch

- [ ] Track ~5–10 “used / installed / broken” signals
- [ ] Fix the single worst UX blocker
- [ ] Add tip link ([`FUNDING.md`](./FUNDING.md)) — tip before Pro

## Launch post draft (English) — fill when public

**Title (≤80 chars):**
```
Show HN: Page2Books – invoice PDF & expense CSV from any page
```

**Body:**
```
Every invoicing tool wants me to re-type amounts I already see on a page.
So I made a tiny Chrome popup that extracts candidates and drafts an invoice.

Page2Books: open a product/estimate/email page → click Extract → edit → PDF.
No account.

Repo: https://github.com/parentingnow-support/page2books

Install (unpacked until the Web Store listing is up):
1. Clone/download the repo
2. chrome://extensions → Developer mode → Load unpacked → folder with manifest.json
3. Open a normal page → click the toolbar icon → Extract

Today: extract candidates + draft + PDF. Not yet: perfect site parsers, sync, Pro.

If you try it, I’d love a one-liner on whether it actually helped.
```

**CTA (one):** Repo install — no price. Add CWS link in a comment when approved.

## Out of scope (now)

광고 · SEO 장문 랜딩 · 풀 SaaS · 로그인 · Pro 구현 · CWS 유료 아이템.
