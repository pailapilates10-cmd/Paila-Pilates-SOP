const searchInput = document.getElementById('searchInput');
const searchable = [...document.querySelectorAll('[data-searchable]')];
const noResults = document.getElementById('noResults');
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const navLinks = [...document.querySelectorAll('.nav-link')];

searchInput?.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  searchable.forEach((item) => {
    const match = !query || item.textContent.toLowerCase().includes(query);
    item.hidden = !match;
    if (match) visibleCount += 1;
  });

  noResults.hidden = visibleCount > 0;
});

menuButton?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
    sidebar.classList.remove('open');
  });
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  },
  { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] }
);

sections.forEach((section) => observer.observe(section));
