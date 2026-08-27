# 의사결정 로그 — Page2Books

> 대화·기획에서 **확정된 것**만 기록한다. 상세 스펙은 `develop_plan.md`.  
> 새 결정을 내릴 때 이 파일 **상단**에 항목을 추가한다.

---

## 2026-08-27

### D-05 Page2Books 리브랜딩 (확정)

| | |
| --- | --- |
| **상태** | **확정** (2026-08-27) |
| **결정** | 제품명 `Page2Books` · 폴더 `page2books` · 레포 `parentingnow-support/page2books`. CWS 리써밋 **전** 적용 |
| **한 줄** | Turn any page into an invoice or expense — one click, no account. |
| **이전** | `Page2Invoice` / `page2invoice` (D-00, app-school 송장-only 시드) |
| **이유** | Invoice+Expense 통합 후 송장-only 이름이 스토어·사용자 기대와 불일치. 승인 전 rename이 최소 비용 |
| **비범위** | 아이콘 교체 · GitHub repo rename은 operator (로컬·문서·zip 먼저) |

### D-04 Invoice + Expense 통합 MVP (확정)

| | |
| --- | --- |
| **상태** | **확정** (2026-08-27) |
| **결정** | `page2expense` 별도 제품 대신 **동일 확장·동일 popup**에 Expense 탭 추가 |
| **이유** | 프리랜서 1인이 송장·경비를 같이 처리. extract UX·local-first·팁 패턴 공유. app-school `page2expense`는 Expense 모드 스펙으로 흡수 |
| **MVP** | Invoice 탭(기존 PDF) + Expense 탭(extract → edit → `storage.local` → CSV export). KR 카테고리 7종 |
| **비범위** | Pro/LTD · 홈택스 · 계정/동기화 |
| **근거** | assist-ops `2026-08-18-page2expense` = P2I 거울상(비용) |

---

## 2026-08-10

### D-03 커밋 identity = parentingnow only (확정)

| | |
| --- | --- |
| **상태** | **확정** (2026-08-10) |
| **결정** | 모든 커밋 author/committer = `parentingnow <315293947+parentingnow-support@users.noreply.github.com>` |
| **이유** | 공개 레포 contributor에 `wai-khkim` / `codingwalks` / `cursoragent` 가 섞이면 안 됨 |
| **장치** | repo-local `user.*` · `.githooks/pre-commit` · `AGENTS.md` · `.cursor/rules/00-commit-identity.mdc` |
| **금지** | `--no-verify`로 훅 우회 (사용자가 명시할 때만) |

### D-01 스택 = Chrome MV3 Popup + on-demand extract (확정)

| | |
| --- | --- |
| **상태** | **확정** (2026-08-10) |
| **결정** | 스택 프로필 `mv3-popup`. Extract는 버튼 클릭 시 `scripting.executeScript`. SoT = [`STACK.md`](./STACK.md) |
| **이유** | app-school ticket = popup one-shot. Side panel 기본값보다 MVP에 맞음. `<all_urls>` content_scripts 대신 `activeTab`으로 최소 권한 |
| **비범위** | Side panel · React/Vite · 상시 content_script |
| **변경 방법** | 새 D-xx + `STACK.md` 교체 + `AGENTS.md` Stack 한 줄 갱신 |

### D-02 수익 = tip first, Pro later (확정)

| | |
| --- | --- |
| **상태** | **확정** (2026-08-10) |
| **결정** | 첫 배포는 **무료**. 후원은 Gumroad tip (~$5) → https://parentingnow.gumroad.com/l/tip. Pro는 실사용 ~10명 이후 |
| **이유** | hn-sidekick과 동일 KR 정산 경로 ([`FUNDING.md`](./FUNDING.md)) |
| **비범위** | CWS 유료 아이템 · 구독 · 광고 SDK · BMC/GitHub Sponsors |

### D-00 제품 시드 (확정, superseded by D-05)

| | |
| --- | --- |
| **상태** | **확정** (2026-08-10) → 이름은 D-05에서 `Page2Books`로 변경 |
| **결정** | 제품명 `Page2Invoice` · 폴더 `page2invoice` · 한 줄 `Turn the current page into an invoice draft in one click.` |
| **출처** | codingwalks/app-school `cycles/2026-08-05-웹페이지원클릭송장생성확장` (GO-MVP) |
| **공개 레포** | 당시 `parentingnow-support/page2invoice` → D-05에서 `page2books` |
| **Tip URL** | https://parentingnow.gumroad.com/l/tip |
