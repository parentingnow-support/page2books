# 개발 계획 (PRD) — Page2Books

> Bootstrap + Phase 1 plan. 확정 결정은 `decisions.md`로 올린다.  
> 출처: app-school `2026-08-05-웹페이지원클릭송장생성확장` (+ Expense: `page2expense`).

## 1. 제품

| | |
| --- | --- |
| **이름** | Page2Books (formerly Page2Invoice) |
| **한 줄** | Turn any page into an invoice or expense — one click, no account. |
| **타깃 사용자** | 프리랜서 · 용역 사업자 · 소규모 매장 — 이메일/채팅/상품 페이지를 보고 송장을 다시 타이핑하기 싫은 사람 |
| **핵심 문제** | 기존 invoicing 도구는 수동 입력. 페이지에 이미 있는 품명·금액을 다시 옮겨 적어야 함 |
| **성공 지표** | 7일 내 **실제 invoicing 생성 5명** (설치 수 아님). 실패: 일반 페이지 3곳 이상에서 DOM 추출 실패 |

## 2. 범위

### In scope (Phase 1)

- [x] MV3 popup scaffold + “Extract from current page”
- [x] 페이지에서 품명/금액/수량 **후보** 추출 (휴리스틱 → 사용자 편집)
- [x] 기본 송장 초안 편집 (발신 · 수신 · 품목 · 금액 · 세금)
- [x] PDF 내보내기 (`window.print()` 우선)
- [x] `node scripts/selfcheck.mjs` PASS
- [x] README: 30초 Load unpacked

### Out of Scope (Phase 1)

- Accounts / cloud sync / analytics
- Pro paywall · 구독
- 완벽한 사이트별 파서 / Schema.org 전수 지원
- Side panel 상시 편집 UI
- CWS paid item

### In scope (Phase 2 — Expense, 2026-08-27)

- [x] Invoice | Expense 탭 (동일 popup, 공유 Extract)
- [x] Expense: extract → merchant/amount/date/category/memo 편집
- [x] `chrome.storage.local` 저장 + 목록 + 삭제
- [x] CSV export (UTF-8 BOM)
- [x] `fixtures/demo-receipt.html` · selfcheck expense/CSV 케이스

### Out of Scope (Phase 2)

- Page2Books 리브랜딩 · Pro/LTD · 홈택스 · 계정/동기화

## 3. 스택

See [`STACK.md`](./STACK.md).

## 4. 정보 구조

| Surface | Role |
| --- | --- |
| Toolbar popup | Invoice / Expense tabs + shared Extract CTA |
| Injected function | One-shot DOM candidate scrape |
| `src/feature.js` | Pure normalize / draft builders |
| `src/expense/*` | Local list + CSV export |

## 5. 수익 / 계정

| | |
| --- | --- |
| **수익** | Tip first → see [`FUNDING.md`](./FUNDING.md) |
| **계정** | None in Phase 1 |

## 6. Phase DoD

Phase 1 done when:

1. Unpacked: open a real commerce/estimate page → Extract → edit draft → PDF once
2. Selfcheck passes
3. Funnel “Before launch” items checked ([`FUNNEL.md`](./FUNNEL.md))
