import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/ui";
import { business } from "@/lib/site/data";
import { seo } from "@/lib/site/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact SB Digital Studios | Book a Free Website Call, Kettering",
      description: "Book a free, no-obligation call about your website, WordPress or WooCommerce project. Based in Kettering, Northamptonshire.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your website" lead="Tell me what you need and I'll reply within one working day." />
      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <ul className="space-y-4">
            <li className="flex gap-4 rounded-2xl border border-border bg-card p-5"><Mail className="h-5 w-5 text-primary" /><a href={`mailto:${business.email}`}>{business.email}</a></li>
            <li className="flex gap-4 rounded-2xl border border-border bg-card p-5"><MapPin className="h-5 w-5 text-primary" />{business.address.town}, {business.address.postcode}</li>
            <li className="flex gap-4 rounded-2xl border border-border bg-card p-5"><Clock className="h-5 w-5 text-primary" />{business.hours}</li>
          </ul>
          <EnquiryForm source="/contact" />
        </div>
      </Section>
    </>
  );
}
