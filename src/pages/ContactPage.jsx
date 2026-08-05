const FAQ = [
  ['I have no website yet. Can you help from scratch?', 'Yes. I can take you from zero online presence to a fully launched website with clear messaging and lead capture.'],
  ['How long does a typical project take?', 'Most brochure and service websites are completed within 2-6 weeks depending on scope and content readiness.'],
  ['Can you work with my existing website?', 'Yes. I can improve an existing WordPress site or rebuild key templates without disrupting your day-to-day operations.'],
  ['Do you offer ongoing support?', 'Yes. I offer monthly support for updates, performance monitoring, content changes, and technical improvements.']
];

export function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner reveal">
          <p className="section-label type-caption">Contact</p>
          <h1 className="type-display-lg">Let us map your website from startup to trusted brand.</h1>
          <p className="type-body-lg section-copy">
            Whether you have no current site or need a complete upgrade, I will map practical next
            steps for local growth in Kettering and wider reach across the UK.
          </p>
        </div>
      </section>

      <section className="faq section" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <p className="section-label type-caption">FAQ</p>
          <h2 className="section-title type-h1 reveal" id="faq-title">
            Before we start
          </h2>
          <div className="accordion">
            {FAQ.map(([question, answer]) => (
              <article className="accordion__item reveal" key={question}>
                <button className="accordion__trigger type-h4" aria-expanded="false">
                  {question}
                  <span className="accordion__icon">+</span>
                </button>
                <div className="accordion__content">
                  <div className="accordion__inner type-body">{answer}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact surface" id="contact" aria-labelledby="contact-title">
        <div className="container contact__grid">
          <div className="reveal">
            <p className="section-label type-caption">Project Enquiry</p>
            <h2 className="section-title type-h1" id="contact-title">
              Tell me what you want to build.
            </h2>
            <p className="section-copy type-body">
              You will receive a response within one business day with indicative scope, timeline,
              and the best next action.
            </p>
            <div className="contact__map type-body" role="img" aria-label="Map placeholder for UK service area">
              UK Based, Remote First
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
              Send Brief
            </button>
            <p className="contact__status type-small" aria-live="polite"></p>
          </form>
        </div>
      </section>
    </>
  );
}
