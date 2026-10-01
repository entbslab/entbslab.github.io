/* 공통 스크립트
   - data/*.json 을 읽어 window.SITE 로 합친 뒤, 헤더/푸터를 그리고 각 페이지의 render(S) 를 호출합니다.
   - 콘텐츠는 /admin 관리 화면(또는 GitHub에서 data/*.json 직접 편집)으로 수정합니다.

   보안: 관리자가 입력한 값은 모두 html`...` 템플릿으로만 화면에 넣습니다.
   html`` 은 끼워 넣는 값의 특수문자(< > & " ')를 자동으로 바꿔, 입력값 속 태그·스크립트가 실행되지 않게 합니다.
   링크·이미지 주소는 safeUrl() 로 http(s)·mailto·tel·상대경로만 허용합니다(javascript: 등 차단). */

/* ---------- 안전한 출력 도구 ---------- */
class SafeHTML { constructor(s) { this.s = s; } toString() { return this.s; } }
window.raw = s => new SafeHTML(String(s));
window.esc = v => {
  if (v instanceof SafeHTML) return v.s;
  if (Array.isArray(v)) return v.map(esc).join('');
  if (v === null || v === undefined || v === false) return '';
  return String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
};
window.html = (strings, ...vals) => raw(strings.reduce((out, s, i) => out + s + (i < vals.length ? esc(vals[i]) : ''), ''));
window.safeUrl = u => {
  u = String(u || '').trim();
  if (!u) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(u) && !/^(https?|mailto|tel):/i.test(u)) return '#';
  return u;
};
window.cssUrl = u => { u = safeUrl(u); return u && u !== '#' ? 'url(' + JSON.stringify(u) + ')' : ''; };
window.nl2br = t => raw(esc(t).replace(/\n/g, '<br>'));
window.setHTML = (id, h) => { const el = document.getElementById(id); if (el) el.innerHTML = String(h); };

/* ---------- 공통 유틸 ---------- */
window.fmtDate = d => (d || '').slice(0, 10).replace(/-/g, '.');
window.initials = name => /[가-힣]/.test(name || '') ? name[0] : String(name || '').replace(/\s.*/, '').slice(0, 2);
window.avatar = m => m.photo
  ? html`<img class="avatar" src="${safeUrl(m.photo)}" alt="${m.name}" style="object-fit:cover">`
  : html`<div class="avatar">${initials(m.name)}</div>`;
window.byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '');

/* ---------- 데이터 로드 + 헤더/푸터 ---------- */
(async function () {
  const get = f => fetch('data/' + f + '.json', { cache: 'no-cache' }).then(r => r.json());
  const [settings, about, members, notices, news, projects, publications, seminars, resources] = await Promise.all(
    ['settings', 'about', 'members', 'notices', 'news', 'projects', 'publications', 'seminars', 'resources'].map(get));
  const byOrder = (a, b) => (a.order ?? 100) - (b.order ?? 100);
  const S = window.SITE = {
    ...settings, ...about,
    members: (members.items || []).sort(byOrder),
    notices: notices.items || [],
    news: news.items || [],
    projects: (projects.items || []).sort(byOrder),
    publications: publications.items || [],
    seminars: seminars.items || [],
    resources: resources.items || []
  };

  const path = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '') + '.html';
  setHTML('site-header', html`
    <div class="container">
      <a class="brand" href="index.html">
        ${S.logo ? html`<img class="mark" src="${safeUrl(S.logo)}" alt="">` : raw('<span class="mark">KU</span>')}
        <span class="name">${S.name.ko}<small>${S.name.en}</small></span>
      </a>
      <nav class="nav" id="nav">${S.nav.map(n => html`<a href="${safeUrl(n.href)}" class="${n.href === path ? 'active' : ''}">${n.label}</a>`)}</nav>
      <button class="nav-toggle" aria-label="menu" type="button">&#9776;</button>
    </div>`);
  document.querySelector('.nav-toggle').onclick = () => document.getElementById('nav').classList.toggle('open');

  setHTML('site-footer', html`
    <div class="container">
      <div>
        <h4>${S.name.ko}</h4>
        <div>${S.name.en}</div>
        <div style="margin-top:10px">${S.contact.address}</div>
        <div>TEL ${S.contact.tel} &middot; <a href="${safeUrl('mailto:' + S.contact.email)}">${S.contact.email}</a></div>
      </div>
      <div><h4>Menu</h4>${S.nav.map(n => html`<div><a href="${safeUrl(n.href)}">${n.label}</a></div>`)}</div>
      <div><h4>Links</h4>${S.links.map(l => html`<div><a href="${safeUrl(l.href)}" target="_blank" rel="noopener">${l.label}</a></div>`)}
        <div style="margin-top:14px"><a href="admin/" style="font-size:.8rem;opacity:.6">관리자</a></div></div>
      <div class="copy">&copy; ${new Date().getFullYear()} ${S.name.en}, Korea University. All rights reserved.</div>
    </div>`);

  const hero = document.querySelector('.hero');
  const firstBanner = cssUrl(((S.heroImages || [])[0] || {}).image || S.heroImage);
  if (hero && firstBanner) {
    hero.classList.add('has-img');
    hero.style.backgroundImage = 'linear-gradient(120deg, rgba(43,0,16,.85), rgba(139,0,41,.6)), ' + firstBanner;
  }
  if (S.testBanner) {
    const b = document.createElement('div');
    b.className = 'banner';
    b.textContent = S.testBanner;
    document.body.prepend(b);
  }
  if (typeof window.render === 'function') window.render(S);
})().catch(err => {
  console.error(err);
  document.getElementById('site-header').innerHTML = '<div class="container" style="color:#8B0029">데이터를 불러오지 못했습니다. data/*.json 형식을 확인하세요.</div>';
});
