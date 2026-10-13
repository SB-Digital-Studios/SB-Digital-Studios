import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CtaBand, FaqList, PlansGrid, StandardSections } from "@/components/site/blocks";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/ui";
import { generalFaqs } from "@/lib/site/data";
import { seo } from "@/lib/site/seo";

export const Route = createFileRoute("/pay-monthly-websites")({
  head: () =>
    seo({
      title: "Pay-Monthly Websites, Kettering | Monthly or Every 2 Months | SB Digital Studios",
      description: "A bespoke website, hosting and support for one fixed payment, monthly or every 2 months. Domain in your name and an option to buy outright.",
      path: "/pay-monthly-websites",
    }),
  component: PayMonthly,
});

const promises = [
  "No big upfront bill: design, build, hosting and support in one payment",
  "Pay monthly, or every 2 months and save 5%",
  "Your domain is registered in your name, always",
  "12-month minimum, then 30 days' notice to cancel",
  "Option to buy the site outright for a fee agreed upfront",
  "Monthly changes included, so your site never goes stale",
];

function PayMonthly() {
  return (
    <>
      <PageHero eyebrow="Pay monthly" title={<>A premium website, <span className="text-ember">without the upfront cost</span></>} lead="Spread the cost of a bespoke website into simple, fixed payments, with none of the lock-in worries." />
      <Section className="pt-0">
        <SectionHeading title="The SB promise" intro="The biggest worry with pay-monthly websites is 'what do I own if I stop paying?'. Here's the honest answer." />
        <ul className="grid gap-4 md:grid-cols-2">
          {promises.map((p) => (
            <li key={p} className="flex gap-4 rounded-2xl border border-border bg-card p-5"><Check className="h-5 w-5 shrink-0 text-highlight" />{p}</li>
          ))}
        </ul>
      </Section>
      <Section className="pt-0">
        <SectionHeading eyebrow="Plans" title="Choose your plan" center />
        <PlansGrid />
      </Section>
      <StandardSections />
      <Section className="pt-0">
        <SectionHeading eyebrow="FAQ" title="Pay-monthly questions" center />
        <FaqList faqs={generalFaqs} />
      </Section>
      <CtaBand />
    </>
  );
}
