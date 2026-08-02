const SERVICES = [
  ['Website Design', 'Clean, modern interfaces that guide visitors toward action and enquiries.'],
  ['Startup Website Launch', 'From no website to a polished launch with clear pages, tracking, and enquiry flow.'],
  ['WordPress Development', 'Custom WordPress builds that stay editable, stable, and easy to scale.'],
  ['WooCommerce', 'High-converting ecommerce setup with streamlined purchase journeys.'],
  ['Website Care Plans', 'Monthly updates, backups, and technical support from one accountable partner.'],
  ['SEO Foundations', 'On-page structure, metadata, and technical setup for stronger rankings.'],
  ['Performance Optimisation', 'Core Web Vitals improvements that make your website feel instantly better.'],
  ['Custom Features', 'Built-to-fit functionality for your exact service model and operations.']
];

const PROCESS = [
  ['1. Discovery', 'We clarify your goals, services, audience, and offer positioning.'],
  ['2. Planning', 'I map the structure, content flow, and conversion priorities.'],
  ['3. Design', 'You get premium layouts with practical UX and clear hierarchy.'],
  ['4. Development', 'I build fast, accessible pages with clean, maintainable code.'],
  ['5. Testing', 'Cross-device QA, speed checks, and accessibility polish.'],
  ['6. Launch', 'Confident go-live with tracking, handover, and next-step recommendations.']
];

const STACK = [
  'WordPress',
  'WooCommerce',
  'PHP',
  'JavaScript',
  'SCSS',
  'Vite',
  'GSAP',
  'Git',
  'MySQL',
  'Performance Engineering'
];

const TESTIMONIALS = [
  ['Working directly with one senior expert made everything faster. Our new site finally reflects our quality.', 'Olivia Hart, Founder at Hart Legal'],
  ['The build was focused, practical, and refreshingly clear. We saw better lead quality within weeks.', 'Sam Ridley, Owner at Northline'],
  ['No layers of account managers. Just smart execution and excellent communication from start to finish.', 'Aamir Patel, Director at SignalOps'],
  ['Agency-level design with direct accountability. Exactly what we were looking for.', 'Chloe Evans, Co-founder at Bristle & Co']
];

export function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <span className="hero__shape hero__shape--a" data-parallax="-12" aria-hidden="true"></span>
        <span className="hero__shape hero__shape--b" data-parallax="12" aria-hidden="true"></span>
        <div className="hero__grid">
          <div className="reveal">
            <p className="hero__eyebrow type-caption">Kettering + UK Wide Web Partner</p>
            <h1 className="hero__title" id="hero-title">
              Launch your business online and start winning customers.
            </h1>
            <p className="hero__subtitle">
              Based in Kettering and working across the UK, I help new and growing businesses go
              from zero online presence to a trusted, lead-generating website.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="/contact" data-magnetic>
                Start My Website
              </a>
              <a className="button button--ghost" href="/portfolio">
                See Proof of Work
              </a>
            </div>
          </div>

          <aside className="hero__panel reveal" aria-label="Studio highlights">
            <p className="type-caption">Built for New Businesses</p>
            <h2 className="type-h2">From startup launch to established local brand.</h2>
            <p className="type-body is-muted">
              If you currently have no website, I handle the full journey: structure, design,
              build, SEO foundations, and launch support.
            </p>
          </aside>
        </div>
      </section>

      <section className="stats section section--tight" aria-label="Agency statistics">
        <div className="container stats__grid">
          <article className="card reveal">
            <p className="type-display-lg" data-counter="8" data-suffix="+">
              0+
            </p>
            <p className="type-small is-muted">Years Experience</p>
          </article>
          <article className="card reveal">
            <p className="type-display-lg" data-counter="100" data-suffix="+">
              0+
            </p>
            <p className="type-small is-muted">Projects Delivered</p>
          </article>
          <article className="card reveal">
            <p className="type-display-lg" data-counter="1">
              0
            </p>
            <p className="type-small is-muted">WordPress Expert</p>
          </article>
          <article className="card reveal">
            <p className="type-display-lg" data-counter="100" data-suffix="%">
              0%
            </p>
            <p className="type-small is-muted">Direct Kettering + UK Delivery</p>
          </article>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="coverage-title">
        <div className="container">
          <p className="section-label type-caption">Coverage</p>
          <h2 className="section-title type-h2 reveal" id="coverage-title">
            Local visibility in Kettering, plus reach across the UK.
          </h2>
          <div className="why__grid">
            <article className="card reveal">
              <h3 className="type-h4">Local Search Ready</h3>
              <p className="type-body is-muted">Built to help customers in Kettering and nearby areas find you first.</p>
            </article>
            <article className="card reveal">
              <h3 className="type-h4">Nationwide Positioning</h3>
              <p className="type-body is-muted">Messaging and SEO structure designed to attract non-local enquiries too.</p>
            </article>
            <article className="card reveal">
              <h3 className="type-h4">Trust from Day One</h3>
              <p className="type-body is-muted">A professional presence that makes a new business look established.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="services surface" id="services" aria-labelledby="services-title">
        <div className="container">
          <p className="section-label type-caption">Services</p>
          <h2 className="section-title type-h1 reveal" id="services-title">
            Practical services for new businesses and teams ready to grow.
          </h2>
          <div className="card-grid">
            {SERVICES.map(([title, copy]) => (
              <article className="card reveal" key={title}>
                <h3 className="type-h4">{title}</h3>
                <p className="type-body is-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio section" id="portfolio" aria-labelledby="portfolio-title">
        <div className="container">
          <p className="section-label type-caption">Portfolio</p>
          <h2 className="section-title type-h1 reveal" id="portfolio-title">
            Selected projects focused on leads, speed, and clarity.
          </h2>
          <div className="portfolio__grid">
            <article className="project reveal">
              <img
                className="project__media"
                src="/projects/project-1.svg"
                alt="Luxury interiors website concept"
                loading="lazy"
                width="960"
                height="600"
              />
              <div className="project__body">
                <h3 className="type-h3">Aster &amp; Oak Interiors</h3>
                <p className="type-body is-muted">
                  Independent business brand refresh with a clearer offer, premium visuals, and stronger
                  enquiry flow.
                </p>
                <a className="button button--secondary" href="/portfolio">
                  View Project
                </a>
              </div>
            </article>
            <article className="project reveal">
              <img
                className="project__media"
                src="/projects/project-2.svg"
                alt="Ecommerce fashion store concept"
                loading="lazy"
                width="960"
                height="600"
              />
              <div className="project__body">
                <h3 className="type-h3">Northline Apparel</h3>
                <p className="type-body is-muted">
                  Ecommerce uplift through improved navigation, product storytelling, and faster
                  page performance.
                </p>
                <a className="button button--secondary" href="/portfolio">
                  View Project
                </a>
              </div>
            </article>
            <article className="project reveal">
              <img
                className="project__media"
                src="/projects/project-3.svg"
                alt="SaaS website concept"
                loading="lazy"
                width="960"
                height="600"
              />
              <div className="project__body">
                <h3 className="type-h3">SignalOps Platform</h3>
                <p className="type-body is-muted">
                  Service-led SaaS site with cleaner messaging, improved trust signals, and better
                  conversion routes.
                </p>
                <a className="button button--secondary" href="/portfolio">
                  View Project
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="process surface" id="process" aria-labelledby="process-title">
        <div className="container">
          <p className="section-label type-caption">Process</p>
          <h2 className="section-title type-h1 reveal" id="process-title">
            A simple, transparent process from first call to launch.
          </h2>
          <div className="process__timeline">
            {PROCESS.map(([title, copy]) => (
              <article className="process__step reveal" key={title}>
                <h3 className="type-h4">{title}</h3>
                <p className="type-body is-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stack section" aria-labelledby="stack-title">
        <div className="container">
          <p className="section-label type-caption">Technology Stack</p>
          <h2 className="section-title type-h1 reveal" id="stack-title">
            Modern tooling chosen for speed, reliability, and longevity.
          </h2>
          <div className="stack__grid">
            {STACK.map((item) => (
              <article className="card reveal" key={item}>
                <p className="type-h4">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials surface" aria-labelledby="testimonials-title">
        <div className="container">
          <p className="section-label type-caption">Testimonials</p>
          <h2 className="section-title type-h1 reveal" id="testimonials-title">
            Trusted by business owners who want expert-level execution.
          </h2>
          <div className="swiper testimonials__slider reveal" aria-label="Client testimonials slider">
            <div className="swiper-wrapper">
              {TESTIMONIALS.map(([quote, author]) => (
                <article className="swiper-slide testimonials__card" key={author}>
                  <p className="type-body-lg">“{quote}”</p>
                  <p className="type-small is-muted">{author}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about section" id="about" aria-labelledby="about-title">
        <div className="container grid grid--2">
          <div className="reveal">
            <p className="section-label type-caption">About</p>
            <h2 className="section-title type-h1" id="about-title">
              An independent partner with the standards of a premium studio.
            </h2>
            <p className="section-copy type-body">
              I work with founders and small teams that need better websites without a bloated
              agency process. You get strategic thinking, polished design, and dependable
              development in one place.
            </p>
          </div>
          <aside className="card reveal">
            <h3 className="type-h3">Approach</h3>
            <p className="type-body is-muted">
              Keep things focused: clear decisions, measurable priorities, and websites that do the
              job commercially.
            </p>
          </aside>
        </div>
      </section>

      <section className="why surface" aria-labelledby="why-title">
        <div className="container">
          <p className="section-label type-caption">Why Choose Us</p>
          <h2 className="section-title type-h1 reveal" id="why-title">
            Why businesses choose an independent partner model.
          </h2>
          <div className="why__grid">
            <article className="card reveal">
              <h3 className="type-h4">Direct Communication</h3>
              <p className="type-body is-muted">You always speak with the person building your site.</p>
            </article>
            <article className="card reveal">
              <h3 className="type-h4">Faster Decisions</h3>
              <p className="type-body is-muted">No agency layers slowing down delivery.</p>
            </article>
            <article className="card reveal">
              <h3 className="type-h4">Premium Craft</h3>
              <p className="type-body is-muted">Design and code quality that elevates your brand.</p>
            </article>
            <article className="card reveal">
              <h3 className="type-h4">Built for Leads</h3>
              <p className="type-body is-muted">Every section is designed to support enquiries.</p>
            </article>
            <article className="card reveal">
              <h3 className="type-h4">SEO & Accessibility</h3>
              <p className="type-body is-muted">Strong technical foundations from day one.</p>
            </article>
            <article className="card reveal">
              <h3 className="type-h4">Ongoing Partnership</h3>
              <p className="type-body is-muted">Optional monthly support after launch.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="faq section" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <p className="section-label type-caption">FAQ</p>
          <h2 className="section-title type-h1 reveal" id="faq-title">
            Common questions before we start.
          </h2>
          <div className="accordion">
            <article className="accordion__item reveal">
              <button className="accordion__trigger type-h4" aria-expanded="false">
                How long does a project take?<span className="accordion__icon">+</span>
              </button>
              <div className="accordion__content">
                <div className="accordion__inner type-body">
                  Most service websites launch within 2-6 weeks, depending on content readiness
                  and scope.
                </div>
              </div>
            </article>
            <article className="accordion__item reveal">
              <button className="accordion__trigger type-h4" aria-expanded="false">
                Do you work with existing WordPress sites?<span className="accordion__icon">+</span>
              </button>
              <div className="accordion__content">
                <div className="accordion__inner type-body">
                  Yes. I can redesign and rebuild around your existing content while improving speed
                  and usability.
                </div>
              </div>
            </article>
            <article className="accordion__item reveal">
              <button className="accordion__trigger type-h4" aria-expanded="false">
                Can you provide ongoing support?<span className="accordion__icon">+</span>
              </button>
              <div className="accordion__content">
                <div className="accordion__inner type-body">
                  Absolutely. Care plans include updates, monitoring, backups, and conversion
                  improvements.
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="contact surface" id="contact" aria-labelledby="contact-title">
        <div className="container contact__grid">
          <div className="reveal">
            <p className="section-label type-caption">Contact</p>
            <h2 className="section-title type-h1" id="contact-title">
              Ready for a website that does your business justice?
            </h2>
            <p className="section-copy type-body">
              Share where you are now and where you want to be. I will reply with practical next
              steps, a clear scope, and an estimated timeline.
            </p>
            <div className="contact__map type-body" role="img" aria-label="Map placeholder for UK service area">
              UK Based, Remote First
            </div>
          </div>
          <form className="form contact__form reveal" aria-label="Project enquiry form">
            <div className="form__field">
              <label className="form__label" htmlFor="name">Name</label>
              <input className="form__input" id="name" name="name" autoComplete="name" required />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="email">Email</label>
              <input
                className="form__input"
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="service">Service Needed</label>
              <input
                className="form__input"
                id="service"
                name="service"
                placeholder="Website Design, SEO, WooCommerce..."
                required
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="message">Project Brief</label>
              <textarea className="form__textarea" id="message" name="message" rows="6" required></textarea>
            </div>
            <button className="button button--primary" type="submit" data-magnetic>
              Send Brief
            </button>
            <p className="contact__status type-small" aria-live="polite"></p>
          </form>
        </div>
      </section>
    </>
  );
}
