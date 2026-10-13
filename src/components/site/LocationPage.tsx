import { Link } from "@tanstack/react-router";
import { Check, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { business } from "@/lib/site/data";
import { CtaBand, FaqList, ServiceCards, StandardSections, TrustRow } from "./blocks";
import { EnquiryForm } from "./EnquiryForm";
import { Eyebrow, Section, SectionHeading, cta } from "./ui";

export type LocationContent = {
  path: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  defaultService?: string;
  introTitle: string;
  intro: string[];
  highlights: string[];
  areas: string[];
  faqs: { q: string; a: string }[];
};

export function LocationPage({ c }: { c: LocationContent }) {
  return (
    <>
      <section className="relative overflow-hidden bg-glow">
        <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="text-5xl font-extrabold md:text-6xl">{c.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{c.lead}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Low upfront cost", "Fixed monthly payment", "Free no-obligation call", "Local, Kettering-based"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium"><Check className="h-4 w-4 text-highlight" />{t}</li>
              ))}
            </ul>
          </div>
          <EnquiryForm source={c.path} compact defaultService={c.defaultService} />
        </div>
      </section>

      <div className="border-y border-border bg-surface">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="font-display text-xl font-bold">In a rush? Email and hear back the same working day.</p>
          <a href={`mailto:${business.email}`} className={cta({ variant: "outline" })}><Mail className="h-4 w-4" />{business.email}</a>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Local" title={c.introTitle} />
            <div className="space-y-4 text-lg text-muted-foreground">
              {c.intro.map((p) => <p key={p}>{p}</p>)}
            </div>
            <Link to="/contact" className={cta({ size: "lg" }) + " mt-8"}>Start today</Link>
          </div>
          <div className="space-y-4">
            {c.highlights.map((h) => (
              <div key={h} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                <p>{h}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-highlight">Areas covered</p>
              <p className="mt-2 text-muted-foreground">{c.areas.join(" · ")}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <TrustRow />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Services" title="What I can build for you" />
        <ServiceCards />
      </Section>

      <StandardSections />

      <Section className="pt-0">
        <SectionHeading eyebrow="FAQ" title="Questions people ask" center />
        <FaqList faqs={c.faqs} />
      </Section>

      <CtaBand />
    </>
  );
}
