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
    ├ data/content.js          ★ 모든 콘텐츠(공지, 연구진, 성과…)가 이 파일 하나에 있음
    └ assets/                  디자인(style.css), 공통 스크립트(main.js), 이미지, 첨부파일
 └ .github/workflows/deploy.yml   main 브랜치에 push되면 site/ 를 gh-pages 브랜치로 복사(자동 배포)
 └ docs/                       계획서, 이 가이드
```

- **서버·DB 없음.** HTML/CSS/JS 파일만 GitHub Pages에 올라갑니다. 호스팅 비용 0원.
- **자동 배포.** `main` 브랜치의 `site/` 폴더가 바뀌면 GitHub Actions가 `gh-pages` 브랜치에 복사하고, GitHub Pages가 그 브랜치를 서빙합니다. 1~2분 내 반영.
- `gh-pages` 브랜치는 자동 생성물이므로 **직접 편집하지 않습니다.** 항상 `main`의 `site/`만 수정합니다.
- 배포 주소(테스트): `https://screamingpeanut01.github.io/ku_entbs_page/`

## 2. 콘텐츠 수정 방법 (가장 쉬운 방법: GitHub 웹에서 직접 편집)

설치할 것 없이 브라우저만 있으면 됩니다. GitHub 계정이 있고 저장소에 **Write 권한**(collaborator)이 있어야 합니다.

1. GitHub에서 저장소 열기 → `site/data/content.js` 클릭
2. 오른쪽 위 연필 아이콘(Edit this file) 클릭
3. 내용 수정 (아래 3절 참고)
4. 오른쪽 위 **Commit changes** → 변경 내용 한 줄 요약(예: `공지: 10월 세미나 안내 추가`) → **Commit directly to the main branch** → Commit
5. 저장소 상단 **Actions** 탭에서 초록 체크가 뜨면 배포 완료. 사이트 새로고침(Ctrl+F5)

> 잘못 고쳐서 사이트가 깨진 경우: 저장소 **Commits** 목록에서 이전 커밋의 `<>` 버튼 → 해당 파일 → Edit → 이전 내용을 복사해 되돌리면 됩니다. 모든 변경 이력이 남으므로 되돌릴 수 없는 실수는 없습니다.

## 3. content.js 편집 규칙

파일 안에는 항목별 배열이 있습니다. **기존 블록 하나를 복사해서 붙여넣고 값만 바꾸는 것**이 가장 안전합니다.

### 공지사항 추가
```js
notices: [
  { date: "2026-10-01", title: "10월 정기 세미나 안내", pinned: true, body: "10월 16일 목요일 오후 4시, 미디어관 1207호" },
  { date: "2026-09-15", title: "...", pinned: false, body: "..." },   // ← 기존 항목
],
```
- `date`: 반드시 `"YYYY-MM-DD"`. 정렬은 자동(최신순, 고정공지 우선)
- `pinned: true`로 두면 "공지" 뱃지와 함께 맨 위 고정
- 각 블록 끝의 쉼표 `,`를 빠뜨리지 않기 (마지막 항목은 없어도 됨)
- 문장 안에 큰따옴표 `"`를 쓰려면 작은따옴표 `'`로 바꾸거나 `\"`로 표기

### 연구진 추가/수정
```js
{ name: "홍길동", role: "공동연구원", aff: "OO대학교", email: "", field: "연구분야" },
```
- `role`은 `"센터장"`, `"공동연구원"`, `"Research Fellow"` 중 하나 (페이지 분류 기준)
- 순서 = 배열 순서. 위로 올리면 앞에 표시됨

### 논문·프로젝트·세미나·자료실
각각 `publications`, `projects`, `seminars`, `resources` 배열. 필드 이름은 파일 상단 주석과 기존 항목을 그대로 따라 쓰면 됩니다.

### 자료실 파일 올리기
1. GitHub 저장소에서 `site/assets/` 폴더 열기 → **Add file → Upload files** → PDF 등 업로드 → Commit
2. `content.js`의 `resources`에 `file: "assets/파일명.pdf"` 로 연결
- 파일명은 영문·숫자·하이픈만 사용 (한글·공백 금지, 예: `2026-workshop.pdf`)

### 사진 넣기
- 연구진 사진: `site/assets/people/` 에 `kimjh.jpg` 처럼 올리고, 필요 시 `people.html`의 아바타를 `<img>`로 교체 (개발자 요청 사항)
- 히어로/배경 사진: `assets/hero.jpg`로 올린 뒤 `style.css`의 `.hero` 배경에 연결

### 테스트 배너 끄기
정식 오픈 시 `content.js`의 `testBanner: "..."` 값을 `testBanner: ""` 로 비웁니다.

## 4. 저장소 관리

### 계정·권한
- 저장소 소유자: 현재 개인 계정(`screamingpeanut01`). **장기 운영을 위해 센터용 GitHub Organization(예: `ku-cesm`)을 만들어 저장소를 이관(Transfer)하는 것을 권장.** 담당자가 바뀌어도 조직이 소유하므로 계정 문제로 사이트가 사라지지 않음.
- 관리자 추가: Settings → Collaborators → Add people → 상대 GitHub 아이디 → 권한 `Write`
- 교수님 계정은 `Admin`, 조교는 `Write` 권장

### 브랜치 규칙
- `main` 하나만 사용. `main`에 커밋 = 즉시 배포
- 큰 개편(디자인 변경 등)은 별도 브랜치에서 작업 후 Pull Request로 합치기. 소규모 공지 수정은 main에 바로 커밋해도 됨

### 커밋 메시지 관례
`분류: 내용` 형식으로 간단히. 예) `공지: 10월 세미나`, `연구진: 홍길동 추가`, `자료실: 워크숍 PDF`

### 백업
- GitHub 자체가 전체 이력을 보관. 추가로 연 1회 Code → Download ZIP 으로 내려받아 센터 드라이브에 보관 권장

### 문제 발생 시 확인 순서
1. Actions 탭에 빨간 X → 해당 실행 클릭 → 오류 메시지 확인. 대부분 `content.js` 문법 오류(쉼표·따옴표 누락)
2. 사이트가 흰 화면 → 브라우저 F12 → Console에 빨간 오류 → `content.js` 해당 줄 확인
3. 최근 커밋을 되돌리기(Revert): Commits → 해당 커밋 → `...` → Revert

## 5. 도메인 연결 (test-entbs.com 등)

### 5-1. 도메인 구매 (결제 필요 · 담당자가 직접)
| 등록업체 | .com 가격(연) | 비고 |
|---|---|---|
| Cloudflare Registrar | 약 $10~11 | 원가 판매, 해외 카드 결제 |
| 가비아 | 약 ₩24,000 (프로모션 시 ₩13,500) | 국내 결제, 세금계산서 가능 |

권장: 센터 운영비로 결제할 수 있도록 **가비아**에서 구매하고 소유자 정보는 센터/교수님 명의로.

### 5-2. GitHub Pages에 도메인 연결
1. `main` 브랜치의 `site/` 폴더에 `CNAME` 파일(확장자 없음)을 만들고 도메인 한 줄만 적어 커밋
   ```
   test-entbs.com
   ```
   배포되면 저장소 → Settings → Pages → Custom domain 에 자동 반영됨. (Settings에서 직접 입력하면 gh-pages 브랜치에만 기록되어 다음 배포 때 지워지므로 반드시 `site/CNAME`으로 관리)
2. 도메인 등록업체 DNS 설정에 아래 레코드 추가
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  screamingpeanut01.github.io
   ```
3. 10분~수 시간 후 Settings → Pages 에서 DNS check 성공 → **Enforce HTTPS** 체크
4. 이후 `https://test-entbs.com` 과 `https://www.test-entbs.com` 모두 접속 가능

### 5-3. Cloudflare Pages로 옮길 경우 (선택)
대역폭 무제한과 DDoS 보호가 필요해지면 Cloudflare Pages로 이전 가능. Cloudflare 계정에서 Pages → Connect to Git → 이 저장소 선택 → Build output directory `site` → Custom domain 추가. 저장소·콘텐츠는 그대로 사용.

## 6. 다음 단계 (정식 구축 시)
1. 교수님 검토 후 실제 텍스트·사진 교체 (`(예시)` 항목 전부 제거)
2. 관리 화면(Decap CMS) 도입 여부 결정: `/admin`에서 폼으로 입력하는 방식. `content.js` 직접 편집이 부담스러울 때
3. 도메인 구매·연결, 테스트 배너 제거
4. 저장소를 센터 Organization으로 이관, 관리자 권한 정리
