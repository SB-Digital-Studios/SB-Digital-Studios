export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

export const qs = (selector, scope = document) => scope.querySelector(selector);

export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
