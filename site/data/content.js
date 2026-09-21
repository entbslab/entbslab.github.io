/* =====================================================================
   사이트 콘텐츠 데이터
   - 공지, 소식, 연구진, 연구성과, 자료실은 모두 이 파일 하나에서 관리합니다.
   - 항목을 추가하려면 배열에 { ... } 블록을 하나 복사해 붙여넣고 값을 바꾸면 됩니다.
   - 날짜는 "YYYY-MM-DD" 형식. 최신순 정렬은 자동입니다.
   - (예시) 표시가 있는 항목은 목업용 샘플 데이터입니다. 실제 내용으로 교체하세요.
   ===================================================================== */
window.SITE = {
  name: { ko: "엔터테인먼트경영연구센터", en: "Center for Entertainment Strategy and Management" },
  tagline: { en: "Entertainment, Strategy & Management", ko: "엔터테인먼트 산업과 경영의 다학제적 연구 허브" },
  testBanner: "이 페이지는 테스트 목업입니다. 일부 콘텐츠는 예시 데이터입니다.",  // 정식 오픈 시 "" 로 비우세요
  contact: {
    address: "서울특별시 성북구 안암로 145 고려대학교 미디어관 1207호",
    tel: "02-3290-5039",
    email: "evolve@korea.ac.kr",
    mapUrl: "https://map.naver.com/p/search/고려대학교%20미디어관"
  },
  nav: [
    { label: "HOME", href: "index.html" },
    { label: "ABOUT", href: "about.html" },
    { label: "PEOPLE", href: "people.html" },
    { label: "RESEARCH", href: "research.html" },
    { label: "NEWS", href: "news.html" },
    { label: "CONTACT", href: "contact.html" }
  ],
  links: [
    { label: "고려대학교 미디어학부", href: "https://mediacom.korea.ac.kr/" },
    { label: "센터 소개 (미디어학부)", href: "https://mediacom.korea.ac.kr/laboratory/center05.html" },
    { label: "고려대학교", href: "https://www.korea.ac.kr/" }
  ],

  /* 설립 목적 / 활동분야 (미디어학부 센터 소개 페이지 기준) */
  mission: "엔터테인먼트 산업과 경영에 대한 체계적, 다학제적 이해를 도모하는 연구 허브를 조성하고 지속가능한 엔터테인먼트 산업 토대를 마련하기 위해 설립되었습니다.",
  areas: [
    { title: "연구·세미나·정책 기획", desc: "건강한 엔터테인먼트 산업을 위한 연구, 세미나, 정책 기획" },
    { title: "산학 협력 공동연구", desc: "엔터테인먼트 경영·산업·기술(엔터테크)을 포괄하는 학제간 공동연구" },
    { title: "팬덤 · IP 비즈니스", desc: "디지털 플랫폼을 통한 팬덤 산업과 IP 비즈니스의 다차원적 이해" },
    { title: "기업 자문", desc: "글로벌 경쟁 환경에서의 엔터테인먼트 기업 전략 자문" },
    { title: "전문인력 양성", desc: "엔터테인먼트 비즈니스 전문인력 양성 교육 활동" }
  ],

  /* 센터장 인사말 (예시 원고 - 교수님 원고로 교체) */
  greeting: {
    name: "김정환",
    title: "센터장 · 고려대학교 미디어학부 / 글로벌엔터테인먼트학부 교수",
    paragraphs: [
      "(예시) 엔터테인먼트경영연구센터를 찾아주셔서 감사합니다.",
      "(예시) 본 센터는 엔터테인먼트 산업과 경영을 체계적이고 다학제적으로 이해하기 위한 연구 허브로서, 산업계·학계·정책 영역을 잇는 협력 기반 연구를 수행합니다.",
      "(예시) 팬덤과 IP 비즈니스, 엔터테크, 글로벌 전략 등 산업의 지속가능한 성장을 위한 주제를 함께 탐구해 나가겠습니다."
    ]
  },

  /* 연구진 */
  members: [
    { name: "김정환", role: "센터장", aff: "고려대학교 미디어학부 / 글로벌엔터테인먼트학부", email: "evolve@korea.ac.kr", field: "엔터테인먼트 · 플랫폼 · 테크놀로지" },
    { name: "김성철", role: "공동연구원", aff: "고려대학교 미디어학부", field: "" },
    { name: "최세정", role: "공동연구원", aff: "고려대학교 미디어학부", field: "" },
    { name: "정윤혁", role: "공동연구원", aff: "고려대학교 미디어학부", field: "" },
    { name: "최보름", role: "공동연구원", aff: "연세대학교", field: "" },
    { name: "조성인", role: "공동연구원", aff: "서강대학교", field: "" },
    { name: "김주희", role: "공동연구원", aff: "동덕여자대학교", field: "" },
    { name: "임철민", role: "공동연구원", aff: "전북대학교", field: "" },
    { name: "김진주", role: "공동연구원", aff: "Erasmus University", field: "" },
    { name: "하진경", role: "Research Fellow", aff: "박사", field: "" }
  ],

  /* 공지사항 */
  notices: [
    { date: "2026-09-15", title: "(예시) 2026년 2학기 센터 정기 세미나 일정 안내", pinned: true, body: "2학기 정기 세미나는 격주 목요일 오후 4시, 미디어관 1207호에서 진행됩니다." },
    { date: "2026-09-01", title: "(예시) 연구 참여 대학원생 모집", pinned: false, body: "팬덤 플랫폼 연구 과제에 참여할 대학원생을 모집합니다. 관심 있는 분은 이메일로 연락 바랍니다." },
    { date: "2026-08-20", title: "(예시) 센터 홈페이지 개편 안내", pinned: false, body: "센터 홈페이지를 새롭게 개편하였습니다." },
    { date: "2026-07-10", title: "(예시) 하계 워크숍 자료 공유", pinned: false, body: "자료실에서 발표 자료를 내려받을 수 있습니다." },
    { date: "2026-06-02", title: "(예시) 산학협력 파트너 기관 모집", pinned: false, body: "" }
  ],

  /* 센터 소식 (행사, 언론 등) */
  news: [
    { date: "2026-09-10", tag: "행사", title: "(예시) 엔터테크 포럼 2026 개최", summary: "AI와 팬덤 플랫폼의 미래를 주제로 산학 전문가가 참여한 포럼을 개최했습니다.", link: "" },
    { date: "2026-08-28", tag: "언론", title: "(예시) 김정환 센터장, K-팝 IP 비즈니스 인터뷰", summary: "디지털 플랫폼 시대의 IP 확장 전략에 관한 인터뷰가 보도되었습니다.", link: "" },
    { date: "2026-07-15", tag: "연구", title: "(예시) 팬덤 산업 실태조사 결과 발표", summary: "국내 팬덤 소비 행태에 대한 조사 결과를 발표했습니다.", link: "" }
  ],

  /* 연구 프로젝트 */
  projects: [
    { period: "2026 – 2027", title: "(예시) 디지털 플랫폼 기반 팬덤 산업 생태계 연구", sponsor: "한국연구재단", summary: "팬덤 플랫폼의 가치 창출 구조와 지속가능성 분석" },
    { period: "2025 – 2026", title: "(예시) 엔터테크 산업 동향 및 정책 방향 연구", sponsor: "정부 기관", summary: "AI·XR 기술과 엔터테인먼트 산업 융합 동향 조사" },
    { period: "2025", title: "(예시) 글로벌 IP 비즈니스 전략 자문", sponsor: "민간 기업", summary: "K-콘텐츠 IP의 해외 확장 전략 수립 자문" }
  ],

  /* 논문·출판 */
  publications: [
    { year: 2026, type: "국제학술지", authors: "Kim, J., et al.", title: "(예시) Fandom platforms and the economics of participation", venue: "Journal of Media Economics", link: "" },
    { year: 2025, type: "국내학술지", authors: "김정환 외", title: "(예시) 엔터테크 산업의 가치사슬 변화에 관한 연구", venue: "한국언론학보", link: "" },
    { year: 2025, type: "저서", authors: "김정환 외", title: "(예시) 엔터테인먼트 경영의 이해", venue: "출판사", link: "" },
    { year: 2024, type: "보고서", authors: "엔터테인먼트경영연구센터", title: "(예시) 팬덤 산업 실태조사 보고서", venue: "센터 발간", link: "" }
  ],

  /* 세미나·포럼 */
  seminars: [
    { date: "2026-09-25", title: "(예시) 정기 세미나: 생성형 AI와 콘텐츠 제작", speaker: "OOO 교수", place: "미디어관 1207호" },
    { date: "2026-10-16", title: "(예시) 정기 세미나: 팬 플랫폼 데이터 분석", speaker: "OOO 박사", place: "미디어관 1207호" }
  ],

  /* 자료실 */
  resources: [
    { date: "2026-07-10", title: "(예시) 2026 하계 워크숍 발표자료", file: "#", desc: "PDF, 3.2MB" },
    { date: "2026-03-02", title: "(예시) 센터 소개 브로슈어", file: "#", desc: "PDF, 1.1MB" }
  ]
};
