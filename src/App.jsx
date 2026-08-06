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

const BASE_URL = 'https://sbdigitalstudios.co.uk';

function getRoute(pathname) {
  const path = (pathname.replace(/\/$/, '') || '/').replace(/\.html$/, '');
  return path || '/';
}

function getPageMeta(route) {
  if (route === '/services') {
    return {
      title: 'Web Design Services in Kettering | SB Digital Studios',
      description:
        'Web design services for Kettering, Corby, Wellingborough, Rushden, and Northampton businesses, including WordPress development and SEO foundations.',
      path: '/services'
    };
  }

  if (route === '/portfolio') {
    return {
      title: 'Web Design Portfolio | SB Digital Studios Kettering',
      description:
        'Explore website projects designed to attract local customers in Kettering and surrounding towns, while supporting wider UK enquiries.',
      path: '/portfolio'
    };
  }

  if (route === '/about') {
    return {
      title: 'About | Kettering Web Designer at SB Digital Studios',
      description:
        'Meet SB Digital Studios, an independent Kettering web partner helping businesses grow across Northamptonshire and the UK.',
      path: '/about'
    };
  }

  if (route === '/contact') {
    return {
      title: 'Contact a Web Designer in Kettering | SB Digital Studios',
      description:
        'Contact SB Digital Studios to launch or upgrade your website for stronger local visibility across Kettering and surrounding areas.',
      path: '/contact'
    };
  }

  return {
    title: 'Web Design Kettering | SB Digital Studios',
    description:
      'SB Digital Studios helps Kettering, Corby, Wellingborough, and Northamptonshire businesses build trusted, lead-generating websites.',
    path: '/'
  };
}

function setMeta(selector, attribute, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.setAttribute(attribute, value);
  }
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
    const canonicalUrl = `${BASE_URL}${meta.path === '/' ? '/' : meta.path}`;

    document.title = meta.title;

    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }

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
