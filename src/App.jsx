import { useEffect } from 'react';
import './styles/main.scss';
import { Layout } from './components/Layout.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { ServicesPage } from './pages/ServicesPage.jsx';
import { PortfolioPage } from './pages/PortfolioPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { initNavigation } from './scripts/navigation.js';
import { initSmoothScroll } from './scripts/scroll.js';
import { initAnimations } from './scripts/animations.js';
import { initCursor } from './scripts/cursor.js';
import { initTestimonialsSlider } from './scripts/slider.js';
import { initContactForm } from './scripts/contact.js';
import { initCounters } from './scripts/counter.js';
import { initAccordion } from './scripts/accordion.js';

function getRoute(pathname) {
  const path = (pathname.replace(/\/$/, '') || '/').replace(/\.html$/, '');
  return path || '/';
}

function getPageMeta(route) {
  if (route === '/services') {
    return {
      title: 'Services | SB Digital Studios',
      description:
        'Website services for Kettering and UK businesses, including startup launches, WordPress development, SEO foundations, and ongoing support.'
    };
  }

  if (route === '/portfolio') {
    return {
      title: 'Portfolio | SB Digital Studios',
      description:
        'Explore website projects designed to attract local customers and wider UK enquiries.'
    };
  }

  if (route === '/about') {
    return {
      title: 'About | SB Digital Studios',
      description:
        'Meet SB Digital Studios, an independent web partner helping businesses grow in Kettering and across the UK.'
    };
  }

  if (route === '/contact') {
    return {
      title: 'Contact | SB Digital Studios',
      description:
        'Contact SB Digital Studios to launch or upgrade your website for local Kettering visibility and UK-wide growth.'
    };
  }

  return {
    title: 'SB Digital Studios | Premium Web Design & WordPress Development UK',
    description:
      'SB Digital Studios helps Kettering and UK businesses go from no website to a trusted, lead-generating online presence.'
  };
}

function renderPage(route) {
  if (route === '/services') return <ServicesPage />;
  if (route === '/portfolio') return <PortfolioPage />;
  if (route === '/about') return <AboutPage />;
  if (route === '/contact') return <ContactPage />;
  return <HomePage />;
}

export default function App() {
  const route = getRoute(window.location.pathname);

  useEffect(() => {
    const meta = getPageMeta(route);
    document.title = meta.title;

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', meta.description);

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
  }, [route]);

  return <Layout pathname={route}>{renderPage(route)}</Layout>;
}
