/* 공통 헤더/푸터 렌더링 + 유틸. 콘텐츠는 data/content.js 에서 관리합니다. */
(function () {
  const S = window.SITE;
  const path = location.pathname.split('/').pop() || 'index.html';
  const navHtml = S.nav.map(n => `<a href="${n.href}" class="${n.href === path ? 'active' : ''}">${n.label}</a>`).join('');
  document.getElementById('site-header').innerHTML = `
    <div class="container">
      <a class="brand" href="index.html">
        <span class="mark">KU</span>
        <span class="name">${S.name.ko}<small>${S.name.en}</small></span>
      </a>
      <nav class="nav" id="nav">${navHtml}</nav>
      <button class="nav-toggle" aria-label="menu" onclick="document.getElementById('nav').classList.toggle('open')">&#9776;</button>
    </div>`;
  document.getElementById('site-footer').innerHTML = `
    <div class="container">
      <div>
        <h4>${S.name.ko}</h4>
        <div>${S.name.en}</div>
        <div style="margin-top:10px">${S.contact.address}</div>
        <div>TEL ${S.contact.tel} &middot; <a href="mailto:${S.contact.email}">${S.contact.email}</a></div>
      </div>
      <div><h4>Menu</h4>${S.nav.map(n => `<div><a href="${n.href}">${n.label}</a></div>`).join('')}</div>
      <div><h4>Links</h4>${S.links.map(l => `<div><a href="${l.href}" target="_blank" rel="noopener">${l.label}</a></div>`).join('')}</div>
      <div class="copy">&copy; ${new Date().getFullYear()} ${S.name.en}, Korea University. All rights reserved.</div>
    </div>`;
  if (S.testBanner) {
    const b = document.createElement('div');
    b.className = 'banner';
    b.textContent = S.testBanner;
    document.body.prepend(b);
  }
})();

window.fmtDate = d => d.replace(/-/g, '.');
window.initials = name => /[가-힣]/.test(name) ? name[0] : name.replace(/\s.*/, '').slice(0, 2);
window.tabs = function (root) {
  const btns = root.querySelectorAll('.tabs button');
  const panels = root.querySelectorAll('.panel');
  btns.forEach(b => b.onclick = () => {
    btns.forEach(x => x.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    b.classList.add('active');
    root.querySelector('#' + b.dataset.panel).classList.add('active');
  });
  const hash = location.hash.slice(1);
  const target = hash && root.querySelector(`[data-panel="${hash}"]`);
  if (target) target.click();
};
