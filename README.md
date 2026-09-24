# 엔터테인먼트경영연구센터 홈페이지 (목업)

고려대학교 미디어학부 엔터테인먼트경영연구센터(Center for Entertainment Strategy and Management) 홈페이지 목업.

- 테스트 배포: https://entbslab.github.io/
- 관리자 화면: https://entbslab.github.io/admin/
- 계획서: [docs/PLAN.md](docs/PLAN.md)
- 운영 개요(작동·비용·계정): [docs/SUMMARY.md](docs/SUMMARY.md)
- 운영·저장소 관리 가이드: [docs/OPERATIONS.md](docs/OPERATIONS.md)
- 관리자 화면 설정: [docs/ADMIN_SETUP.md](docs/ADMIN_SETUP.md)

## 로컬 미리보기
```bash
npm run dev
```

## 콘텐츠 수정
`/admin/` 관리자 화면(Sveltia CMS, Decap 호환)에서 편집하면 `site/data/<컬렉션>/*.json`(한 건 = 파일 하나)에 커밋되고 GitHub Actions가 합본을 만들어 자동 배포합니다. JSON을 GitHub에서 직접 고쳐도 됩니다.
