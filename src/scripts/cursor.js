import { isDesktop, qsa, qs, prefersReducedMotion } from './utils.js';

export function initCursor() {
  if (!isDesktop || prefersReducedMotion) return;

  const cursor = qs('.cursor');
  if (!cursor) return;

  const magneticElements = qsa('[data-magnetic]');

  const onMove = (event) => {
    cursor.style.opacity = '1';
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  };

  window.addEventListener('mousemove', onMove, { passive: true });

  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const bounds = el.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}
