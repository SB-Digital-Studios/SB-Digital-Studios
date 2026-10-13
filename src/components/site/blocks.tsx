import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { useState } from "react";
import { BIMONTHLY_DISCOUNT, comparison, oneOffFrom, plans, process, services } from "@/lib/site/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Section, SectionHeading, cta } from "./ui";

export function TrustRow() {
  const items = ["Pay monthly or every 2 months", "Domain always in your name", "Direct line to your developer", "Reply within one working day"];
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium">
          <Check className="h-4 w-4 shrink-0 text-highlight" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ServiceCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Link
          key={s.slug}
          to="/services/$slug"
          params={{ slug: s.slug }}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/60"
        >
          <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
          <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
          <p className="mt-3 flex-1 text-muted-foreground">{s.short}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
      <Link
        to="/pay-monthly-websites"
        className="group flex flex-col rounded-2xl bg-ember p-7 text-primary-foreground transition-all hover:-translate-y-1"
      >
        <span className="font-display text-sm opacity-70">06</span>
        <h3 className="mt-6 text-2xl font-bold">Pay-Monthly Websites</h3>
        <p className="mt-3 flex-1 opacity-85">A bespoke website with no big upfront bill. One fixed payment, monthly or every 2 months.</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          See how it works <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-surface">
          <tr>
            <th className="p-4 font-semibold">Feature</th>
            <th className="p-4 font-semibold text-primary">SB Digital Studios</th>
            <th className="p-4 font-semibold text-muted-foreground">Wix / GoDaddy</th>
            <th className="p-4 font-semibold text-muted-foreground">Typical agency</th>
          </tr>
        </thead>
        <tbody>
          {comparison.map((r) => (
            <tr key={r.feature} className="border-t border-border">
              <td className="p-4 font-medium">{r.feature}</td>
              <td className="p-4"><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-highlight" />{r.sb}</span></td>
              <td className="p-4 text-muted-foreground"><span className="inline-flex items-center gap-2"><Minus className="h-4 w-4" />{r.diy}</span></td>
              <td className="p-4 text-muted-foreground"><span className="inline-flex items-center gap-2"><Minus className="h-4 w-4" />{r.agency}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProcessSteps() {
  return (
    <ol className="grid gap-5 md:grid-cols-4">
      {process.map((p, i) => (
        <li key={p.title} className="rounded-2xl border border-border bg-card p-6">
          <span className="text-ember font-display text-4xl font-bold">{i + 1}</span>
          <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-3xl">
      {faqs.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger className="text-left text-lg font-semibold">{f.q}</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function PlansGrid() {
  const [cycle, setCycle] = useState<"monthly" | "bimonthly">("monthly");
  return (
    <div>
      <div className="mx-auto mb-10 flex w-fit rounded-full border border-border bg-surface p-1" role="group" aria-label="Billing cycle">
        {(["monthly", "bimonthly"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCycle(c)}
            aria-pressed={cycle === c}
            className={cn("rounded-full px-5 py-2 text-sm font-semibold transition-colors", cycle === c ? "bg-ember text-primary-foreground" : "text-muted-foreground")}
          >
            {c === "monthly" ? "Monthly" : "Every 2 months (save 5%)"}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => {
          const price = cycle === "monthly" ? p.monthly : Math.round(p.monthly * 2 * (1 - BIMONTHLY_DISCOUNT));
          return (
            <div key={p.name} className={cn("relative flex flex-col rounded-2xl border bg-card p-8", p.featured ? "border-primary shadow-ember" : "border-border")}>
              {p.featured && <span className="absolute -top-3 left-8 rounded-full bg-ember px-3 py-1 text-xs font-bold text-primary-foreground">Most popular</span>}
              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              <p className="mt-6">
                <span className="text-sm text-muted-foreground">from </span>
                <span className="font-display text-5xl font-bold">£{price}</span>
                <span className="text-muted-foreground">{cycle === "monthly" ? "/month" : " every 2 months"}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-highlight" />{f}</li>
                ))}
              </ul>
              <Link to="/contact" className={cta({ variant: p.featured ? "ember" : "outline" }) + " mt-8"}>Get started</Link>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Prefer to pay once? Bespoke builds from £{oneOffFrom.toLocaleString()}. 12-month minimum on monthly plans, then 30 days' notice. Prices exclude VAT if applicable.
      </p>
    </div>
  );
}

export function CtaBand({ title = "Ready for a website that brings in work?", text = "Book a free, no-obligation 20-minute call. No jargon, no pressure." }: { title?: string; text?: string }) {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface bg-glow p-10 text-center md:p-16">
        <h2 className="mx-auto max-w-2xl text-4xl font-bold md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className={cta({ size: "lg" })}>Book a free call</Link>
          <Link to="/pricing" className={cta({ variant: "outline", size: "lg" })}>See pricing</Link>
        </div>
      </div>
    </Section>
  );
}

export function StandardSections() {
  return (
    <>
      <Section>
        <SectionHeading eyebrow="Why SB" title={<>How we <span className="text-ember">compare</span></>} intro="Everything done for you, without the big upfront bill or the lock-in." />
        <ComparisonTable />
      </Section>
      <Section className="pt-0">
        <SectionHeading eyebrow="Process" title="Four simple steps" />
        <ProcessSteps />
      </Section>
    </>
  );
}
