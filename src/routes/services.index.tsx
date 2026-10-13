import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, ServiceCards, StandardSections } from "@/components/site/blocks";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/ui";
import { seo } from "@/lib/site/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo({
      title: "Web Design, WordPress & WooCommerce Services | SB Digital Studios",
      description: "Bespoke websites, WordPress, WooCommerce, front-end development and hosting & care plans from a Kettering-based developer.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Everything your website needs, from one developer" lead="Pick a single service or combine them into one monthly plan." />
      <Section className="pt-0"><ServiceCards /></Section>
      <StandardSections />
      <CtaBand />
    </>
  );
}
