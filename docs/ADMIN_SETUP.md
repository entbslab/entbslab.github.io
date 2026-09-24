# 관리자 화면(/admin) 설정 절차

관리 화면은 Sveltia CMS(Decap CMS 호환 오픈소스)입니다. 사이트 주소 뒤에 `/admin/`을 붙이면 열립니다.
로그인은 GitHub 계정으로 하며, 저장소에 Write 권한이 있는 사람만 편집할 수 있습니다.

GitHub Pages에는 서버 코드가 없어 로그인 중계 역할을 하는 작은 프로그램(Worker)이 하나 필요합니다.
아래 절차는 **한 번만** 하면 됩니다. 소요 약 20분. 비용 0원.

필요한 것: 저장소 소유 GitHub 계정 로그인, Cloudflare 무료 계정 (없으면 https://dash.cloudflare.com/sign-up 에서 이메일로 생성)

---

## 0단계. Worker 설정 전에 지금 바로 써보기 (토큰 로그인)

Worker 없이도 관리 화면을 쓸 수 있는 임시 방법입니다. 관리자 각자가 GitHub에서 토큰을 발급받아 로그인합니다.

1. GitHub → 프로필 → Settings → Developer settings → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
2. 입력값
   - Token name: `KU CESM admin`
   - Expiration: 1년 (만료되면 다시 발급)
   - Repository access: **Only select repositories** → `entbs-lab` 선택
   - Permissions → Repository permissions → **Contents: Read and write** (다른 권한은 불필요)
3. **Generate token** → 표시된 토큰 문자열 복사 (이 화면을 벗어나면 다시 볼 수 없음)
4. `/admin/` 접속 → **Sign In Using Access Token** → 토큰 붙여넣기 → 로그인

토큰은 비밀번호와 같으므로 메신저나 문서에 남기지 말고, 브라우저가 기억하게 두면 됩니다. 정식 운영에서는 아래 1~4단계의 GitHub 로그인 방식이 더 편하고 안전합니다.

---

## 1단계. Cloudflare Worker 배포 (로그인 중계)

1. https://github.com/sveltia/sveltia-cms-auth 접속
2. README의 **Deploy to Cloudflare Workers** 버튼 클릭 → Cloudflare 로그인 → 안내에 따라 배포
   - Worker 이름은 알아보기 쉽게 `ku-cesm-auth` 등으로
3. 배포가 끝나면 Worker 주소가 나옵니다. 예) `https://ku-cesm-auth.<계정명>.workers.dev`
   → 이 주소를 메모합니다. (아래에서 두 번 씁니다)

## 2단계. GitHub OAuth 앱 등록

1. GitHub 로그인 → 오른쪽 위 프로필 → **Settings** → 왼쪽 맨 아래 **Developer settings** → **OAuth Apps** → **New OAuth App**
   - 저장소가 Organization 소유라면 Organization Settings → Developer settings → OAuth Apps 에서 등록
2. 입력값
   | 항목 | 값 |
   |---|---|
   | Application name | `KU CESM 홈페이지 관리자` (아무 이름) |
   | Homepage URL | `https://entbslab.github.io/entbs-lab/` (도메인 연결 후엔 그 주소) |
   | Authorization callback URL | `https://ku-cesm-auth.<계정명>.workers.dev/callback` ← 1단계 주소 + `/callback` |
3. **Register application** → 화면에 **Client ID** 표시
4. **Generate a new client secret** → **Client Secret** 표시 (이 화면을 벗어나면 다시 볼 수 없으니 바로 4단계로)

## 3단계. Worker에 GitHub 앱 정보 입력

1. https://dash.cloudflare.com → Workers & Pages → 1단계에서 만든 Worker 클릭 → **Settings** → **Variables and Secrets**
2. 아래 3개를 추가 (Type은 Secret 권장)
   | 이름 | 값 |
   |---|---|
   | `GITHUB_CLIENT_ID` | 2단계의 Client ID |
   | `GITHUB_CLIENT_SECRET` | 2단계의 Client Secret |
   | `ALLOWED_DOMAINS` | `entbslab.github.io` (도메인 연결 후엔 `test-entbs.com, www.test-entbs.com` 처럼 쉼표로 추가) |
3. **Deploy** (또는 Save) 클릭

## 4단계. 사이트 설정 파일에 Worker 주소 입력

저장소의 `site/admin/config.yml` 에서 아래 줄을 1단계 주소로 바꾸고 커밋합니다. (GitHub 웹에서 연필 아이콘으로 편집 가능)
```yaml
  base_url: https://REPLACE-ME.workers.dev
```
↓
```yaml
  base_url: https://ku-cesm-auth.<계정명>.workers.dev
```
1~2분 뒤 배포가 끝나면 설정 완료입니다.

## 5단계. 로그인 확인

1. `https://entbslab.github.io/entbs-lab/admin/` 접속
2. **Sign in with GitHub** → GitHub 로그인 → 처음 한 번 **Authorize** 클릭
3. 왼쪽에 공지사항 · 센터 소식 · 연구진 · 연구 활동 · 자료실 · 소개/설정 메뉴가 보이면 성공

---

## 관리 화면 사용법

### 공지 추가·수정·삭제
1. `/admin/` → 로그인 → 왼쪽 **공지사항** → 공지 목록 화면 (검색·정렬 가능)
2. 추가: 오른쪽 위 **새 공지** → 제목, 날짜, 상단 고정 여부, 본문, 사진, 첨부파일 입력 → **저장**
3. 수정: 목록에서 공지 클릭 → 수정 → **저장**
4. 삭제: 공지 화면 상단 메뉴의 **삭제** (목록에서 여러 건 선택 후 일괄 삭제도 가능)
5. 1~2분 뒤 사이트에 반영

센터 소식, 연구진, 연구 프로젝트, 논문·출판, 세미나·포럼, 자료실도 같은 방식입니다.

### 표시 순서
- 공지·소식·세미나·자료는 날짜순 자동 정렬(최신이 위), 논문은 연도순.
- 연구진·프로젝트는 "표시 순서" 숫자가 작을수록 앞에 나옵니다 (10, 20, 30… 으로 두면 사이에 끼워 넣기 쉬움).

### 사진·파일 올리기
- 입력 폼의 사진/파일 필드에서 **선택** → 업로드. 파일은 `site/assets/uploads/`에 저장되고 경로가 자동 입력됩니다.
- 파일명은 영문·숫자·하이픈 권장 (한글 파일명도 동작하지만 주소가 길어짐)

### 사이트 이름·연락처·메뉴 바꾸기
- **소개 · 설정** → **사이트 설정**. 상단 안내 배너를 비우면 노란 테스트 배너가 사라집니다.

### 관리자 추가
- 저장소 Settings → Collaborators → Add people → 상대 GitHub 아이디 → **Write**
- 초대를 수락하면 그 사람도 `/admin/`에 로그인해 편집할 수 있습니다. 별도 비밀번호 발급은 없습니다.

---

## 문제 해결

| 증상 | 원인 · 조치 |
|---|---|
| 로그인 버튼을 눌러도 창이 닫히고 아무 일 없음 | 3단계 `ALLOWED_DOMAINS`에 현재 사이트 도메인이 없음. 추가 후 Deploy |
| "redirect_uri mismatch" | 2단계 callback URL이 Worker 주소 + `/callback` 과 정확히 일치하는지 확인 |
| 로그인은 되는데 저장이 안 됨 | 해당 GitHub 계정에 저장소 Write 권한이 없음 |
| 설정 오류(config) 메시지 | `site/admin/config.yml`의 들여쓰기·콜론 확인. 가장 최근 수정을 Revert |
| 도메인을 바꿨더니 로그인 안 됨 | 2단계 Homepage URL, 3단계 ALLOWED_DOMAINS, `config.yml`의 site_url 세 곳을 새 도메인으로 갱신 |

## 참고: 관리 화면 없이도 편집 가능
관리 화면이 잠시 안 되더라도 `site/data/*.json` 파일을 GitHub 웹에서 직접 고치면 동일하게 반영됩니다. 데이터는 항상 저장소에 있고, 관리 화면은 그 파일을 편하게 고치는 도구일 뿐입니다.
