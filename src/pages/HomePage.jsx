const SERVICES = [
  {
    title: 'Launch Website',
    description:
      'Perfect for businesses with no current online presence. We design and launch a complete site that looks premium from day one.',
    deliverables: ['5 strategic pages', 'Conversion-focused copy guidance', 'Mobile-first build + SEO setup']
  },
  {
    title: 'Website Refresh',
    description:
      'For outdated sites that no longer reflect your quality. We redesign the experience and improve clarity so visitors trust you faster.',
    deliverables: ['Modern visual redesign', 'Improved UX + conversion flow', 'Speed and performance upgrades']
  },
  {
    title: 'Growth Support',
    description:
      'Ongoing monthly support to keep your site sharp, secure, and conversion-ready as your business grows.',
    deliverables: ['Monthly updates and backups', 'Landing page and CTA optimization', 'Analytics insights and recommendations']
  }
];

const RESULTS = [
  ['2-4 Weeks', 'Typical launch timeline'],
  ['100+', 'Projects delivered'],
  ['1:1', 'Direct senior partnership']
];

const TESTIMONIALS = [
  ['We went from having no website to looking like a serious premium brand. Enquiries started in the first week after launch.', 'Sophie Lane, Owner at Lane Aesthetics'],
  ['The new site feels high-end without feeling intimidating. It finally matches how we run the business in real life.', 'Daniel Moore, Founder at Moore & Stone Interiors'],
  ['Clear process, beautiful execution, and zero agency fluff. Every page has a purpose and converts better.', 'Hannah Reed, Director at Reed Wellness Clinic']
];

const TRUST_POINTS = [
  'Built for local service businesses',
  'Mobile-first and SEO-ready',
  'Clear pricing and timelines',
  'Direct access to your developer'
];

export function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <span className="hero__shape hero__shape--a" data-parallax="-12" aria-hidden="true"></span>
        <span className="hero__shape hero__shape--b" data-parallax="12" aria-hidden="true"></span>
        <div className="hero__grid">
          <div className="hero__content reveal">
            <p className="hero__eyebrow type-caption">Premium Websites for Local Businesses</p>
            <h1 className="hero__title" id="hero-title">
              Look established online and turn visitors into enquiries.
            </h1>
            <p className="hero__subtitle">
              We design sleek, minimal, conversion-focused websites for businesses with no website
              or outdated ones. Luxury feel, approachable tone, and built to win trust fast.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="/contact" data-magnetic>
                Book a Free Strategy Call
              </a>
              <a className="button button--ghost" href="/portfolio">
                View Recent Work
              </a>
            </div>
            <ul className="hero__trust type-small" aria-label="Key trust points">
              {TRUST_POINTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="hero__panel reveal" aria-label="Expected outcomes">
            <p className="type-caption">Expected Outcomes</p>
            <div className="hero__results">
              {RESULTS.map(([value, label]) => (
                <article className="hero__result" key={label}>
                  <p className="type-h3">{value}</p>
                  <p className="type-small is-muted">{label}</p>
                </article>
              ))}
            </div>
            <p className="type-body is-muted">
              Every website is designed around one goal: make it easy for ideal clients to trust
              you quickly and take the next step.
            </p>
          </aside>
        </div>
      </section>

      <section className="proof section section--tight" aria-labelledby="proof-title">
        <div className="container">
          <p className="section-label type-caption">Social Proof</p>
          <h2 className="section-title type-h2 reveal" id="proof-title">
            Trusted by ambitious local founders and service businesses.
          </h2>
          <div className="proof__grid">
            {TESTIMONIALS.map(([quote, author]) => (
              <article className="card proof__card reveal" key={author}>
                <p className="type-body">"{quote}"</p>
                <p className="type-small is-muted">{author}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services surface" id="services" aria-labelledby="services-title">
        <div className="container">
          <p className="section-label type-caption">Service Breakdown</p>
          <h2 className="section-title type-h1 reveal" id="services-title">
            Everything you need to launch, refresh, and grow with confidence.
          </h2>
          <div className="services__grid">
            {SERVICES.map((service) => (
              <article className="card reveal" key={service.title}>
                <h3 className="type-h4">{service.title}</h3>
                <p className="type-body is-muted">{service.description}</p>
                <ul className="services__list type-small">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about section" id="about" aria-labelledby="about-title">
        <div className="container about__grid">
          <div className="reveal">
            <p className="section-label type-caption">About</p>
            <h2 className="section-title type-h1" id="about-title">
              Independent by design. Premium by standard.
            </h2>
            <p className="section-copy type-body">
              You get a direct partner who understands local businesses, customer psychology, and
              clean conversion-driven design. No account manager layers. No template shortcuts.
            </p>
            <p className="section-copy type-body">
              Just strategic thinking, refined visual design, and dependable development that helps
              your business look as credible online as it does in person.
            </p>
          </div>
          <aside className="card about__panel reveal" aria-label="Why clients choose us">
            <h3 className="type-h3">Why this works</h3>
            <ul className="about__list type-body is-muted">
              <li>Clear brand messaging that attracts the right customers</li>
              <li>Minimal layouts that guide attention to your offer and CTA</li>
              <li>Trust-focused design details that increase enquiries</li>
              <li>Fast, mobile-first performance for modern browsing habits</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="process surface" id="process" aria-labelledby="process-title">
        <div className="container">
          <p className="section-label type-caption">Process</p>
          <h2 className="section-title type-h1 reveal" id="process-title">
            A simple booking-to-launch process.
          </h2>
          <div className="process__timeline">
            <article className="process__step reveal">
              <h3 className="type-h4">1. Book a Call</h3>
              <p className="type-body is-muted">Share your goals, services, and current situation.</p>
            </article>
            <article className="process__step reveal">
              <h3 className="type-h4">2. Receive Your Plan</h3>
              <p className="type-body is-muted">Get a clear scope, timeline, and investment before we start.</p>
            </article>
            <article className="process__step reveal">
              <h3 className="type-h4">3. Launch with Confidence</h3>
              <p className="type-body is-muted">Go live with a high-end website designed to convert.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact surface" id="contact" aria-labelledby="contact-title">
        <div className="container contact__grid">
          <div className="reveal">
            <p className="section-label type-caption">Book a Call</p>
            <h2 className="section-title type-h1" id="contact-title">
              Ready for a website that feels premium and drives enquiries?
            </h2>
            <p className="section-copy type-body">
              Tell us about your business and we will send a clear recommendation, timeline, and
              next steps. No pressure, no hard sell.
            </p>
            <div className="contact__details card">
              <p className="type-small">What happens next</p>
              <ol className="contact__steps type-body is-muted">
                <li>1. We review your brief within 24 hours.</li>
                <li>2. You get a tailored scope and investment range.</li>
                <li>3. We schedule your kickoff and begin the build.</li>
              </ol>
            </div>
          </div>
          <form
            className="form contact__form reveal"
            aria-label="Project enquiry form"
            method="post"
            action="/api/contact.php"
          >
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
            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor="company_hp">Company</label>
              <input
                className="form__input"
                id="company_hp"
                name="company_hp"
                tabIndex="-1"
                autoComplete="new-password"
              />
            </div>
            <button className="button button--primary" type="submit" data-magnetic>
              Request My Website Plan
            </button>
            <p className="contact__status type-small" aria-live="polite"></p>
          </form>
        </div>
      </section>
    </>
  );
}
