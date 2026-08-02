import { qs } from './utils.js';

export function initNavigation() {
  const header = qs('.header');
  const toggle = qs('.nav__toggle');
  const list = qs('.nav__list');

  if (!header || !toggle || !list) return;

  const syncHeader = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 24);
  };

  const closeMenu = () => {
    list.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const setActiveLink = () => {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    list.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      const url = new URL(href, window.location.origin);
      const linkPath = url.pathname.replace(/\/$/, '') || '/';
      const isCurrent = linkPath === currentPath;

      if (link.classList.contains('nav__link')) {
        if (isCurrent) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      }
    });
  };

  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  list.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!list.classList.contains('is-open')) return;
    if (event.target.closest('.nav')) return;
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMenu();
  });

  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
  setActiveLink();
}
