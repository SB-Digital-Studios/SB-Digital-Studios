const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  // { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/contact#faq' }
];

const FOOTER_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' }
];

function normalizePath(pathname) {
  let path = pathname.replace(/\/$/, '') || '/';
  if (path.endsWith('.html')) path = path.slice(0, -5) || '/';
  return path;
}

function isActivePath(currentPath, href) {
  const target = normalizePath(href.split('#')[0]);
  return currentPath === target;
}

export function Layout({ pathname, children }) {
  const currentPath = normalizePath(pathname);

  return (
    <>
      <a className="skip-link type-small" href="#main-content">
        Skip to main content
      </a>
      <div className="cursor" aria-hidden="true"></div>

      <header className="header" id="top">
        <div className="header__inner">
          <a className="header__logo" href="/" aria-label="SB Digital Studios home">
            <img className="header__logo-mark" src="/sb-logo.svg" alt="" />
          </a>

          <nav className="nav" aria-label="Primary navigation">
            <button
              className="nav__toggle"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="site-menu"
            >
              Menu
            </button>
            <ul className="nav__list" id="site-menu">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    className="nav__link"
                    href={item.href}
                    aria-current={isActivePath(currentPath, item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="button button--primary" href="/contact" data-magnetic>
                  Work With Me
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="footer">
        <div className="footer__grid">
          <div>
            <h2 className="type-h4">SB Digital Studios</h2>
            <p className="type-body">
              Independent web design and development for businesses that want fast decisions,
              direct communication, and measurable growth.
            </p>
          </div>
          <div>
            <h2 className="type-h4">Navigation</h2>
            <ul className="type-body">
              {FOOTER_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="type-h4">Contact</h2>
            <p className="type-body">
              <a href="mailto:hello@sbdigitalstudios.co.uk">hello@sbdigitalstudios.co.uk</a>
            </p>
            <p className="type-body">
              <a href="tel:+441234567890">+44 1234 567 890</a>
            </p>
          </div>
          <div>
            <h2 className="type-h4">Social</h2>
            <ul className="type-body">
              <li>
                <a href="#" aria-label="LinkedIn">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" aria-label="Behance">
                  Behance
                </a>
              </li>
              <li>
                <a href="#" aria-label="Dribbble">
                  Dribbble
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer__legal type-small">
          © <span id="year">2026</span> SB Digital Studios. All rights reserved.
        </p>
      </footer>
    </>
  );
}
