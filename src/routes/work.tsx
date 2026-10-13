import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, ProcessSteps } from "@/components/site/blocks";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/ui";
import { seo } from "@/lib/site/seo";

export const Route = createFileRoute("/work")({
  head: () =>
    seo({
      title: "Our Work & Case Studies | SB Digital Studios",
      description: "Websites, WordPress builds and WooCommerce shops by SB Digital Studios, Kettering. Case studies from real local clients.",
      path: "/work",
    }),
  component: Work,
});

const types = [
  { t: "Local service businesses", d: "Clinics, salons and trades that need enquiries from local search." },
  { t: "WooCommerce shops", d: "Independent retailers selling products online with simple checkout." },
  { t: "Agency white-label", d: "Front-end and WordPress builds delivered under agency brands." },
];

function Work() {
  return (
    <>
      <PageHero eyebrow="Work" title="Real projects, real results" lead="Case studies from recent client launches are being added here. Ask on our call and I'll walk you through live examples." />
      <Section className="pt-0">
        <div className="grid gap-5 md:grid-cols-3">
          {types.map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-xl font-bold">{x.t}</h3>
              <p className="mt-2 text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <SectionHeading eyebrow="Process" title="How every project runs" />
        <ProcessSteps />
      </Section>
      <CtaBand title="Could your business be the next case study?" />
    </>
  );
}
