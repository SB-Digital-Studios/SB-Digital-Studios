import Lenis from 'lenis';
import { prefersReducedMotion } from './utils.js';

export function initSmoothScroll() {
  if (prefersReducedMotion) return null;

  const lenis = new Lenis({
    autoRaf: false,
    smoothTouch: false,
    duration: 1.15,
    wheelMultiplier: 0.95
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return lenis;
}
