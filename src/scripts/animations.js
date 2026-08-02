import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, qsa } from './utils.js';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  if (prefersReducedMotion) {
    qsa('.reveal').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  qsa('.reveal').forEach((el, index) => {
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      delay: index % 4 === 0 ? 0.1 : 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%'
      }
    });
  });

  qsa('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      yPercent: Number(el.dataset.parallax || 12),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scrub: true
      }
    });
  });
}
