import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CtaBand, FaqList, StandardSections } from "@/components/site/blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/site/ui";
import { generalFaqs, services } from "@/lib/site/data";
import { localServiceJsonLd, seo } from "@/lib/site/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Service not found | SB Digital Studios" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.service;
    const path = `/services/${params.slug}`;
    return {
      ...seo({ title: `${s.title} | SB Digital Studios, Kettering`, description: `${s.short} ${s.forWho}`, path }),
      scripts: [localServiceJsonLd({ path, serviceName: s.title, serviceType: s.title, description: s.short, areaServed: ["Kettering", "Northamptonshire"] })],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Service" title={s.title} lead={s.intro} />
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title="What's included" />
            <ul className="space-y-4">
              {s.points.map((p) => (
                <li key={p} className="flex gap-4 rounded-2xl border border-border bg-card p-5"><Check className="h-5 w-5 shrink-0 text-highlight" />{p}</li>
              ))}
            </ul>
            <p className="mt-8 text-muted-foreground"><strong className="text-foreground">Ideal for:</strong> {s.forWho}</p>
          </div>
          <div>
            <SectionHeading title="Get a free quote" />
            <EnquiryForm source={`/services/${s.slug}`} />
          </div>
        </div>
      </Section>
      <StandardSections />
      <Section className="pt-0">
        <SectionHeading eyebrow="FAQ" title="Questions" center />
        <FaqList faqs={generalFaqs} />
      </Section>
      <CtaBand />
    </>
  );
}
