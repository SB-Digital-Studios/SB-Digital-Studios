import '../styles/main.scss';
import { initNavigation } from './navigation.js';
import { initSmoothScroll } from './scroll.js';
import { initAnimations } from './animations.js';
import { initCursor } from './cursor.js';
import { initTestimonialsSlider } from './slider.js';
import { initContactForm } from './contact.js';
import { initCounters } from './counter.js';
import { initAccordion } from './accordion.js';

document.documentElement.classList.add('js-ready');

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

initNavigation();
initSmoothScroll();
initAnimations();
initCursor();
initTestimonialsSlider();
initContactForm();
initCounters();
initAccordion();
