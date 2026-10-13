import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/blocks";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/ui";
import { seo } from "@/lib/site/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Spencer Blackler | SB Digital Studios, Kettering",
      description: "SB Digital Studios is run by Spencer Blackler, a Kettering web developer with 8+ years in WordPress, WooCommerce and front-end development.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="Hi, I'm Spencer." lead="I run SB Digital Studios from Kettering, building websites for small businesses and agencies across Northamptonshire and the UK." />
      <Section className="pt-0">
        <div className="grid max-w-4xl gap-6 text-lg text-muted-foreground">
          <p>I've spent 8+ years building for the web, from WordPress and WooCommerce sites to React front-ends and custom PHP. I started SB Digital Studios to give local businesses what bigger agencies often don't: a direct line to the person actually building their site.</p>
          <p>You won't get account managers or jargon. You'll get honest advice, a clear price, and a website built to bring in work, then looked after month after month.</p>
          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {[["8+", "years' experience"], ["1:1", "direct with your developer"], ["1 day", "reply time"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-ember font-display text-4xl font-bold">{n}</p>
                <p className="mt-1 text-sm">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
