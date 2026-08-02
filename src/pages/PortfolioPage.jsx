const PROJECTS = [
  [
    '/projects/project-1.svg',
    'Luxury interiors website concept',
    'Aster & Oak Interiors',
    'Independent interior consultant. Repositioned offer and launched a premium enquiry-focused website.'
  ],
  [
    '/projects/project-2.svg',
    'Ecommerce fashion store concept',
    'Northline Apparel',
    'Owner-led ecommerce brand. Improved product hierarchy, speed, and checkout conversion flow.'
  ],
  [
    '/projects/project-3.svg',
    'SaaS website concept',
    'SignalOps Platform',
    'Lean SaaS team. Clarified positioning and rebuilt key pages for better demo intent.'
  ]
];

const TESTIMONIALS = [
  ['I finally had one strategic partner who could both design and build at a high level.', 'Olivia Hart, Founder at Hart Legal'],
  ['The website now reflects the quality of our service and converts far better.', 'Sam Ridley, Owner at Northline'],
  ['Fast turnaround, thoughtful UX decisions, and no wasted back-and-forth.', 'Aamir Patel, Founder at SignalOps']
];

export function PortfolioPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner reveal">
          <p className="section-label type-caption">Portfolio</p>
          <h1 className="type-display-lg">Recent work built for real business outcomes.</h1>
          <p className="type-body-lg section-copy">
            Selected projects across service businesses, ecommerce, and SaaS where clarity,
            credibility, and conversions were the priority.
          </p>
        </div>
      </section>

      <section className="portfolio section" aria-labelledby="portfolio-title">
        <div className="container">
          <h2 className="section-title type-h1 reveal" id="portfolio-title">Featured projects</h2>
          <div className="portfolio__grid">
            {PROJECTS.map(([src, alt, title, copy]) => (
              <article className="project reveal" key={title}>
                <img
                  className="project__media"
                  src={src}
                  alt={alt}
                  loading="lazy"
                  width="960"
                  height="600"
                />
                <div className="project__body">
                  <h3 className="type-h3">{title}</h3>
                  <p className="type-body is-muted">{copy}</p>
                  <a className="button button--secondary" href="/contact">
                    Discuss a Similar Project
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials surface" aria-labelledby="testimonials-title">
        <div className="container">
          <p className="section-label type-caption">Testimonials</p>
          <h2 className="section-title type-h1 reveal" id="testimonials-title">
            Feedback from founders and owner-led teams.
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
    </>
  );
}
