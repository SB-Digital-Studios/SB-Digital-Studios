import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-workspace.jpg";
import { CtaBand, FaqList, PlansGrid, ServiceCards, StandardSections, TrustRow } from "@/components/site/blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Eyebrow, Section, SectionHeading, cta } from "@/components/site/ui";
import { generalFaqs } from "@/lib/site/data";
import { localBusinessJsonLd, seo } from "@/lib/site/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({
      title: "SB Digital Studios | Bespoke Websites, WordPress & WooCommerce, Kettering",
      description:
        "Bespoke website design, WordPress, WooCommerce and front-end development in Kettering, Northamptonshire. Low upfront cost, pay monthly or every 2 months.",
      path: "/",
    }),
    scripts: [localBusinessJsonLd(["Kettering", "Northamptonshire", "United Kingdom"])],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-glow">
        <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Kettering · Northamptonshire · UK</Eyebrow>
            <h1 className="text-5xl font-extrabold md:text-7xl">
              Bespoke websites with <span className="text-ember">low upfront cost</span> and one fixed monthly payment.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Hand-built websites, WordPress and WooCommerce shops for local businesses, by Spencer Blackler, a developer with 8+ years' experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className={cta({ size: "lg" })}>Book a free call</Link>
              <Link to="/pay-monthly-websites" className={cta({ variant: "outline", size: "lg" })}>How pay monthly works</Link>
            </div>
          </div>
          <div className="relative">
            <img src={hero} alt="Laptop and phone showing a bespoke business website" width={1280} height={960} className="rounded-3xl border border-border shadow-ember" />
          </div>
        </div>
        <div className="container-site pb-16"><TrustRow /></div>
      </section>

      <Section>
        <SectionHeading eyebrow="Services" title={<>One developer, <span className="text-ember">everything web</span></>} intro="Front-end, WordPress and WooCommerce, built properly and looked after for you." />
        <ServiceCards />
      </Section>

      <StandardSections />

      <Section className="pt-0">
        <SectionHeading eyebrow="Pricing" title="Simple plans, no surprises" center />
        <PlansGrid />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading eyebrow="Get in touch" title="What are you looking for?" intro="Tell me a little about your project and I'll reply within one working day with honest advice and a price." />
          <EnquiryForm source="/" />
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="FAQ" title="Good questions" center />
        <FaqList faqs={generalFaqs} />
      </Section>

      <CtaBand />
    </>
  );
}
