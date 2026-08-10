# 의사결정 로그 — Page2Invoice

> 대화·기획에서 **확정된 것**만 기록한다. 상세 스펙은 `develop_plan.md`.  
> 새 결정을 내릴 때 이 파일 **상단**에 항목을 추가한다.

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

### D-00 제품 시드 (확정)

| | |
| --- | --- |
| **상태** | **확정** (2026-08-10) |
| **결정** | 제품명 `Page2Invoice` · 폴더 `page2invoice` · 한 줄 `Turn the current page into an invoice draft in one click.` |
| **출처** | codingwalks/app-school `cycles/2026-08-05-웹페이지원클릭송장생성확장` (GO-MVP) |
| **공개 레포** | https://github.com/parentingnow-support/page2invoice |
| **Tip URL** | https://parentingnow.gumroad.com/l/tip |
