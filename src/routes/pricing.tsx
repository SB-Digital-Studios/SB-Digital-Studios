import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, FaqList, PlansGrid } from "@/components/site/blocks";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/ui";
import { generalFaqs, oneOffFrom } from "@/lib/site/data";
import { seo } from "@/lib/site/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    seo({
      title: "Website Pricing | Monthly, Bi-Monthly or One-Off | SB Digital Studios",
      description: `Clear website prices: care plans from £39/month, bespoke sites from £55/month, WooCommerce shops from £95/month, or one-off builds from £${oneOffFrom}.`,
      path: "/pricing",
    }),
  component: Pricing,
});

function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Clear prices. Pay the way that suits you." lead="Monthly, every 2 months, or once. Every quote is fixed before work starts." />
      <Section className="pt-0"><PlansGrid /></Section>
      <Section className="pt-0">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Bespoke build", `From £${oneOffFrom.toLocaleString()}`, "One-off payment, 50% to start, 50% at launch."],
            ["WooCommerce shop", "From £2,400", "One-off payment for a full shop build."],
            ["Ad-hoc work", "£45/hour", "Fixes, front-end and agency white-label work."],
          ].map(([t, p, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-xl font-bold">{t}</h3>
              <p className="mt-3 font-display text-3xl font-bold text-primary">{p}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <SectionHeading eyebrow="FAQ" title="Pricing questions" center />
        <FaqList faqs={generalFaqs} />
      </Section>
      <CtaBand />
    </>
  );
}
