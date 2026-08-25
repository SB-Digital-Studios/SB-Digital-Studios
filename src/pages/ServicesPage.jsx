const SERVICES = [
  ['Website Design', 'I design clear, modern pages that build trust and drive action.'],
  ['Startup Website Launch', 'From no current website to a complete launch with clear content structure.'],
  ['WordPress Development', 'Custom WordPress builds that are easy to manage and extend.'],
  ['WooCommerce', 'Conversion-focused ecommerce builds with better buying journeys.'],
  ['Website Care Plans', 'Ongoing updates, security, and technical support each month.'],
  ['SEO Foundations', 'Technical setup and on-page structure ready for long-term rankings.'],
  ['Performance Optimisation', 'Speed improvements that create a faster, smoother user experience.'],
  ['Custom Features', 'Purpose-built functionality for your exact service workflow.']
];

const PROCESS = [
  ['1. Discovery', 'I learn your offer, audience, and commercial goals.'],
  ['2. Planning', 'You get a clear page plan and conversion priorities.'],
  ['3. Design', 'I shape the visual direction and user journey.'],
  ['4. Development', 'Clean implementation with performance and SEO in mind.'],
  ['5. Testing', 'Cross-device checks and accessibility polish before launch.'],
  ['6. Launch', 'Deployment, handover, and optional ongoing support.']
];

const STACK = ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'SCSS', 'Vite', 'GSAP', 'Git', 'MySQL'];

export function ServicesPage() {
  const showTechnologySection = false;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner reveal">
          <p className="section-label type-caption">Services</p>
          <h1 className="type-display-lg">Services built to attract local and non-local customers.</h1>
          <p className="type-body-lg section-copy">
            Perfect for businesses starting from zero online presence and for teams ready to scale.
            I work locally in Kettering and remotely with clients across the UK.
          </p>
        </div>
      </section>

      <section className="services surface" aria-labelledby="services-title">
        <div className="container">
          <h2 className="section-title type-h1 reveal" id="services-title">Core capabilities</h2>
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

      <section className="process section" id="process">
        <div className="container">
          <p className="section-label type-caption">Process</p>
          <h2 className="section-title type-h1 reveal">Simple process. Clear checkpoints. No agency friction.</h2>
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

      {showTechnologySection && (
        <section className="stack surface">
          <div className="container">
            <p className="section-label type-caption">Technology</p>
            <h2 className="section-title type-h1 reveal">Tooling chosen for reliability, speed, and maintainability.</h2>
            <div className="stack__grid">
              {STACK.map((item) => (
                <article className="card reveal" key={item}>
                  <p className="type-h4">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
