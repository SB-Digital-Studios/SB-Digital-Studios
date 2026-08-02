export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner reveal">
          <p className="section-label type-caption">About</p>
          <h1 className="type-display-lg">Independent by model. Premium by standard.</h1>
          <p className="type-body-lg section-copy">
            I run SB Digital Studios as a solo practice for businesses that want strategic clarity,
            strong creative direction, and technically excellent delivery in one partner.
          </p>
        </div>
      </section>

      <section className="about section" aria-labelledby="about-title">
        <div className="container grid grid--2">
          <div className="reveal">
            <h2 className="section-title type-h1" id="about-title">
              One point of contact from discovery to launch.
            </h2>
            <p className="section-copy type-body">
              Over 8+ years I have helped founders, consultants, and small teams replace outdated
              websites with faster, clearer digital platforms that support sales.
            </p>
          </div>
          <aside className="card reveal">
            <h3 className="type-h3">What I Value</h3>
            <p className="type-body is-muted">
              Sharp communication, measurable priorities, and quality execution without unnecessary
              complexity.
            </p>
          </aside>
        </div>
      </section>

      <section className="why surface" aria-labelledby="why-title">
        <div className="container">
          <p className="section-label type-caption">Why Choose Us</p>
          <h2 className="section-title type-h1 reveal" id="why-title">
            Why owner-led businesses choose to work with me.
          </h2>
          <div className="why__grid">
            <article className="card reveal"><h3 className="type-h4">Direct Collaboration</h3><p className="type-body is-muted">No account managers. You work directly with the specialist.</p></article>
            <article className="card reveal"><h3 className="type-h4">Commercial Focus</h3><p className="type-body is-muted">Every decision supports enquiries, sales, or operational efficiency.</p></article>
            <article className="card reveal"><h3 className="type-h4">High Craft Standards</h3><p className="type-body is-muted">Polished design, clean code, and strong UX fundamentals.</p></article>
            <article className="card reveal"><h3 className="type-h4">Technical Confidence</h3><p className="type-body is-muted">Modern architecture with long-term maintainability in mind.</p></article>
            <article className="card reveal"><h3 className="type-h4">SEO + Accessibility</h3><p className="type-body is-muted">Built-in best practices that support discoverability and usability.</p></article>
            <article className="card reveal"><h3 className="type-h4">Long-Term Support</h3><p className="type-body is-muted">Optional retainers for updates, performance, and growth.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}
