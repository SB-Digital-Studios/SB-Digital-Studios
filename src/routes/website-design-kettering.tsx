import { createFileRoute } from "@tanstack/react-router";
import { LocationPage, type LocationContent } from "@/components/site/LocationPage";
import { localServiceJsonLd, seo } from "@/lib/site/seo";

const c: LocationContent = {
  path: "/website-design-kettering",
  eyebrow: "Website design Kettering",
  title: <>Bespoke website design in Kettering, with <span className="text-ember">low upfront cost</span></>,
  lead: "Custom-designed, hand-built websites for Kettering businesses, sole traders and trades. Pay once, or spread it into a fixed monthly payment.",
  defaultService: "Bespoke website",
  introTitle: "A Kettering web designer you can actually meet",
  intro: [
    "I'm Spencer, a web developer based in Kettering. I design and build websites for local businesses that want more enquiries, not just a nice-looking homepage.",
    "Every site starts with a conversation about your customers and goals. From there I plan the pages, design them around your brand, and build them by hand so they load fast and work well on phones.",
    "Because I'm local, we can meet for a coffee in town or talk on a video call, whichever suits you.",
  ],
  highlights: [
    "Bespoke design, no off-the-shelf templates",
    "Built for Google: fast, mobile-first and set up for local search",
    "Easy to edit yourself, with training included",
    "Hosting, updates and changes handled on a monthly plan",
  ],
  areas: ["Kettering", "Barton Seagrave", "Burton Latimer", "Rothwell", "Desborough", "Broughton", "Geddington"],
  faqs: [
    { q: "How much does a website cost in Kettering?", a: "Bespoke builds start from £1,200 as a one-off, or from £55 a month on a pay-monthly plan including hosting and support." },
    { q: "Can we meet in person?", a: "Yes. I'm based in Kettering and happy to meet locally, or we can talk by video call." },
    { q: "How quickly can my site go live?", a: "Most small business websites go live within 2 to 4 weeks of our first call." },
    { q: "Do I own the website?", a: "Your domain is always in your name. On monthly plans you can buy the site outright after the minimum term for a fee agreed upfront." },
  ],
};

export const Route = createFileRoute("/website-design-kettering")({
  head: () => ({
    ...seo({
      title: "Website Design Kettering | Bespoke Web Design & Build | SB Digital Studios",
      description: "Bespoke website design and build in Kettering. Low upfront cost, fixed monthly payments, local developer. Book a free call.",
      path: c.path,
    }),
    scripts: [localServiceJsonLd({ path: c.path, serviceName: "Bespoke Website Design Kettering", serviceType: "Web design", description: "Bespoke website design and build for Kettering businesses, with pay-monthly options.", areaServed: c.areas })],
  }),
  component: () => <LocationPage c={c} />,
});
