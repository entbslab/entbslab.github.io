# 운영 · 저장소 관리 가이드

대상: 센터 홈페이지를 관리하는 조교/담당자. 개발 지식이 없어도 따라 할 수 있도록 작성했습니다.

---

## 1. 구조 한눈에 보기

```
GitHub 저장소 (screamingpeanut01/ku_entbs_page)
 └ site/                       ← 실제로 배포되는 웹사이트 폴더
    ├ index.html               홈
    ├ about.html               센터 소개 · 센터장 인사말
    ├ people.html              연구진
    ├ research.html            연구 프로젝트 · 논문 · 세미나
    ├ news.html                공지 · 소식 · 자료실
    ├ contact.html             오시는 길
    ├ admin/                   ★ 관리자 화면 (사이트주소/admin/). 설정은 admin/config.yml
    ├ data/                    ★ 모든 콘텐츠. 관리자 화면이 이 파일들을 고침
    │   ├ notices.json  news.json  members.json  research.json  resources.json
    │   ├ about.json    (설립 목적 · 활동분야 · 인사말)
    │   └ settings.json (센터명 · 연락처 · 메뉴 · 배너)
    └ assets/                  디자인(style.css), 공통 스크립트(main.js), uploads/(관리자 화면 업로드 파일)
 └ .github/workflows/deploy.yml   main 브랜치에 push되면 site/ 를 gh-pages 브랜치로 복사(자동 배포)
 └ docs/                       계획서(PLAN), 개요(SUMMARY), 이 가이드, 관리자 설정(ADMIN_SETUP)
```

- **서버·DB 없음.** HTML/CSS/JS/JSON 파일만 GitHub Pages에 올라갑니다. 호스팅 비용 0원.
- **자동 배포.** `main` 브랜치의 `site/` 폴더가 바뀌면 GitHub Actions가 `gh-pages` 브랜치에 복사하고, GitHub Pages가 그 브랜치를 서빙합니다. 1~2분 내 반영.
- `gh-pages` 브랜치는 자동 생성물이므로 **직접 편집하지 않습니다.** 항상 `main`의 `site/`만 수정합니다.
- 배포 주소(테스트): `https://screamingpeanut01.github.io/ku_entbs_page/`
- 관리자 화면: `https://screamingpeanut01.github.io/ku_entbs_page/admin/`

## 2. 콘텐츠 수정 (기본: 관리자 화면)

1. `사이트주소/admin/` 접속 → GitHub로 로그인 (최초 설정은 `docs/ADMIN_SETUP.md`)
2. 왼쪽 메뉴에서 **공지사항 / 센터 소식 / 연구진 / 연구 활동 / 자료실 / 소개·설정** 선택
3. 목록에서 **항목 추가** 또는 기존 항목 클릭 → 폼 입력 → **저장**
4. 1~2분 뒤 사이트 새로고침(Ctrl+F5)으로 확인. 저장소 **Actions** 탭에 초록 체크가 뜨면 배포 완료

관리자 화면이 하는 일은 `site/data/*.json` 파일을 대신 고쳐 커밋하는 것뿐입니다. 그래서 아래 3절처럼 GitHub에서 직접 고쳐도 결과는 같습니다.

## 3. 콘텐츠 수정 (대안: GitHub 웹에서 JSON 직접 편집)

관리자 화면이 잠시 안 될 때 쓰는 방법입니다. 저장소에 **Write 권한**이 있어야 합니다.

1. GitHub에서 저장소 열기 → `site/data/notices.json` 등 클릭 → 연필 아이콘(Edit)
2. 기존 블록 `{ ... }` 하나를 복사해 붙여넣고 값만 수정
3. **Commit changes** → 한 줄 요약 입력 → **Commit directly to the main branch**

규칙
- 날짜는 `"YYYY-MM-DD"`. 정렬은 자동(최신순, 고정공지 우선)
- 블록 사이 쉼표 `,` 필수, 마지막 블록 뒤에는 쉼표 없음
- 문장 안 큰따옴표는 `\"` 로 표기
- 저장 후 Actions 탭에 빨간 X가 뜨거나 사이트가 흰 화면이면 문법 오류. **Commits → 해당 커밋 → Revert** 로 즉시 되돌림

## 4. 파일·사진

- 관리자 화면의 사진/파일 필드에서 업로드하면 `site/assets/uploads/`에 저장되고 경로가 자동 입력됩니다.
- GitHub에서 직접 올릴 때는 `site/assets/uploads/` → **Add file → Upload files**, JSON에는 `"assets/uploads/파일명.pdf"` 로 연결
- 파일명은 영문·숫자·하이픈 권장 (예: `2026-workshop.pdf`)
- 히어로 배경 사진: `site/assets/hero.jpg`로 올린 뒤 `style.css`의 `.hero` 배경에 연결 (개발 가능자)

## 5. 저장소 관리

### 계정·권한
- 저장소 소유자: 현재 개인 계정(`screamingpeanut01`). **장기 운영을 위해 센터용 GitHub Organization(예: `ku-cesm`)을 만들어 저장소를 이관(Transfer)하는 것을 권장.** 담당자가 바뀌어도 조직이 소유하므로 계정 문제로 사이트가 사라지지 않음. 이관 후에는 `site/admin/config.yml`의 `repo:` 값을 새 경로로 바꿔야 함.
- 관리자 추가: Settings → Collaborators → Add people → 상대 GitHub 아이디 → 권한 `Write`. 수락하면 관리자 화면 로그인도 가능
- 교수님 계정은 `Admin`, 조교는 `Write` 권장

### 브랜치 규칙
- `main` 하나만 사용. `main`에 커밋 = 즉시 배포
- 큰 개편(디자인 변경 등)은 별도 브랜치에서 작업 후 Pull Request로 합치기. 콘텐츠 수정은 main에 바로

### 커밋 메시지
관리자 화면은 `관리자: 공지사항 수정` 형식으로 자동 기록. 직접 편집 시에도 `분류: 내용` 형식 권장

### 백업
- GitHub 자체가 전체 이력을 보관. 추가로 연 1회 Code → Download ZIP 으로 내려받아 센터 드라이브에 보관 권장

### 문제 발생 시 확인 순서
1. Actions 탭에 빨간 X → 해당 실행 클릭 → 오류 메시지 확인. 대부분 JSON 문법 오류(쉼표·따옴표)
2. 사이트 상단에 "데이터를 불러오지 못했습니다" → `site/data/*.json` 중 하나가 깨짐. 최근 커밋 Revert
3. 관리자 화면 로그인 문제 → `docs/ADMIN_SETUP.md` 문제 해결 표

## 6. 도메인 연결 (test-entbs.com 등)

### 6-1. 도메인 구매 (결제 필요 · 담당자가 직접)
| 등록업체 | .com 가격(연) | 비고 |
|---|---|---|
| 가비아 | 약 ₩24,000 (프로모션 시 ₩13,500) | 국내 결제, 세금계산서, .kr 가능 |
| 호스팅케이알 | 약 ₩15,000~18,000 | 국내 결제, 저렴 |
| Cloudflare Registrar | 약 $10~11 | 원가 판매, 해외 카드, .kr 불가 |

권장: 센터 운영비로 결제할 수 있도록 **가비아**에서 구매하고 소유자 정보는 센터/교수님 명의로. 자동 연장 켜기.

### 6-2. GitHub Pages에 도메인 연결
1. `main` 브랜치의 `site/` 폴더에 `CNAME` 파일(확장자 없음)을 만들고 도메인 한 줄만 적어 커밋
   ```
   test-entbs.com
   ```
   (Settings → Pages에서 직접 입력하면 gh-pages 브랜치에만 기록되어 다음 배포 때 지워지므로 반드시 `site/CNAME`으로 관리)
2. 도메인 등록업체 DNS 설정에 아래 레코드 추가
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  screamingpeanut01.github.io
   ```
3. 10분~수 시간 후 Settings → Pages 에서 DNS check 성공 → **Enforce HTTPS** 체크
4. www 주소는 GitHub Pages가 자동으로 apex 도메인으로 넘겨줍니다. 사이트 코드에는 도메인이 들어 있지 않아 고칠 파일이 없습니다.
5. 관리자 화면 GitHub 로그인을 설정했다면 2곳 갱신: GitHub OAuth 앱의 Homepage URL, Worker의 `ALLOWED_DOMAINS`. 토큰 로그인만 쓰는 동안은 할 일 없음

### 6-3. Cloudflare Pages로 옮길 경우 (선택)
대역폭 무제한과 DDoS 보호가 필요해지면 Cloudflare Pages로 이전 가능. Pages → Connect to Git → 이 저장소 → Build output directory `site` → Custom domain 추가. 저장소·콘텐츠·관리자 화면은 그대로.

## 7. 정식 오픈 체크리스트
1. `(예시)` 항목 전부 실제 내용으로 교체, 인사말 원고·사진 반영
2. 관리자 화면 GitHub 로그인 설정 완료 (`ADMIN_SETUP.md` 1~5단계)
3. 소개·설정 → 사이트 설정 → 상단 안내 배너 비우기
4. 도메인 구매·연결
5. 저장소를 센터 Organization으로 이관, 관리자 권한 정리
