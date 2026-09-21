# 엔터테인먼트경영연구센터 홈페이지 (목업)

고려대학교 미디어학부 엔터테인먼트경영연구센터(Center for Entertainment Strategy and Management) 홈페이지 목업.

- 테스트 배포: https://screamingpeanut01.github.io/ku_entbs_page/
- 계획서: [docs/PLAN.md](docs/PLAN.md)
- 운영·저장소 관리 가이드: [docs/OPERATIONS.md](docs/OPERATIONS.md)

## 로컬 미리보기
```bash
npx serve -l 8080 site
```

## 콘텐츠 수정
`site/data/content.js` 한 파일에서 공지·소식·연구진·성과·자료실을 관리합니다. `main`에 커밋하면 GitHub Actions가 자동 배포합니다.
