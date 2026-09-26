'use strict';
(() => {
  const aliases = new Set(['governance','roles','daily','customer','studio','sales','marketing','data','ai','digital','security']);
  const section = location.hash.slice(1);
  if ((location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) && aliases.has(section)) {
    location.replace(`${section}.html`);
    return;
  }
  const form = document.querySelector('#filters');
  const search = document.querySelector('#searchInput');
  const status = document.querySelector('#statusFilter');
  const cards = [...document.querySelectorAll('[data-record]')];
  const filter = () => {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const match = terms.every(term => card.dataset.search.includes(term)) && (!status.value || card.dataset.status === status.value);
      card.hidden = !match;
      if (match) count++;
    });
    document.querySelector('#resultCount').textContent = `${count} procedure${count === 1 ? '' : 's'}`;
    document.querySelector('#noResults').hidden = count !== 0;
  };
  if (form) {
    form.addEventListener('submit', e => e.preventDefault());
    search.addEventListener('input', filter);
    status.addEventListener('change', filter);
    form.addEventListener('reset', () => { search.value = ''; status.value = ''; filter(); });
  }
  const button = document.querySelector('#menuButton');
  const sidebar = document.querySelector('#sidebar');
  const close = () => { sidebar.classList.remove('open'); button.setAttribute('aria-expanded','false'); button.setAttribute('aria-label','Open navigation'); };
  button.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && sidebar.classList.contains('open')) { close(); button.focus(); } });
})();
