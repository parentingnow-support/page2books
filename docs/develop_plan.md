# 개발 계획 (PRD) — Page2Invoice

> Bootstrap + Phase 1 plan. 확정 결정은 `decisions.md`로 올린다.  
> 출처: app-school `2026-08-05-웹페이지원클릭송장생성확장`.

## 1. 제품

| | |
| --- | --- |
| **이름** | Page2Invoice |
| **한 줄** | Turn the current page into an invoice draft in one click. |
| **타깃 사용자** | 프리랜서 · 용역 사업자 · 소규모 매장 — 이메일/채팅/상품 페이지를 보고 송장을 다시 타이핑하기 싫은 사람 |
| **핵심 문제** | 기존 invoicing 도구는 수동 입력. 페이지에 이미 있는 품명·금액을 다시 옮겨 적어야 함 |
| **성공 지표** | 7일 내 **실제 invoicing 생성 5명** (설치 수 아님). 실패: 일반 페이지 3곳 이상에서 DOM 추출 실패 |

## 2. 범위

### In scope (Phase 1)

- [x] MV3 popup scaffold + “Extract from current page”
- [ ] 페이지에서 품명/금액/수량 **후보** 추출 (휴리스틱 → 사용자 편집)
- [ ] 기본 송장 초안 편집 (발신 · 수신 · 품목 · 금액 · 세금)
- [ ] PDF 내보내기 (`window.print()` 우선)
- [ ] `node scripts/selfcheck.mjs` PASS
- [ ] README: 30초 Load unpacked

### Out of Scope (Phase 1)

- Accounts / cloud sync / analytics
- Pro paywall · 구독
- 완벽한 사이트별 파서 / Schema.org 전수 지원
- Side panel 상시 편집 UI
- CWS paid item

## 3. 스택

See [`STACK.md`](./STACK.md).

## 4. 정보 구조

| Surface | Role |
| --- | --- |
| Toolbar popup | Extract CTA + draft preview |
| Injected function | One-shot DOM candidate scrape |
| `src/feature.js` | Pure normalize / URL helpers |

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
