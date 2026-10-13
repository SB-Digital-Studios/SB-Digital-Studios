import { createFileRoute } from "@tanstack/react-router";
import { LocationPage, type LocationContent } from "@/components/site/LocationPage";
import { localServiceJsonLd, seo } from "@/lib/site/seo";

const c: LocationContent = {
  path: "/website-design-northamptonshire",
  eyebrow: "Website design Northamptonshire",
  title: <>Bespoke website design across <span className="text-ember">Northamptonshire</span></>,
  lead: "Custom websites, WordPress and WooCommerce for businesses in Northampton, Corby, Wellingborough, Kettering and beyond, with simple monthly payments.",
  defaultService: "Bespoke website",
  introTitle: "Websites for Northamptonshire businesses",
  intro: [
    "From high-street shops in Wellingborough to trades in Corby and professional services in Northampton, I build websites that help local customers find you and get in touch.",
    "You work directly with me, the developer, from the first call to launch and beyond. No account managers, no hand-offs.",
    "Choose a one-off build, or a pay-monthly plan that includes hosting, updates and changes.",
  ],
  highlights: [
    "One-to-one with your developer the whole way",
    "Local SEO set up for your town and service area",
    "Bespoke design, WordPress or WooCommerce, whichever fits",
    "Meet in person across the county, or by video call",
  ],
  areas: ["Northampton", "Kettering", "Corby", "Wellingborough", "Rushden", "Daventry", "Towcester", "Oundle", "Brackley"],
  faqs: [
    { q: "Do you work with businesses outside Kettering?", a: "Yes, across all of Northamptonshire and the wider UK. Many projects are run entirely by video call." },
    { q: "Will my site show up on Google locally?", a: "Every site includes local SEO basics: page titles, Google Business Profile linking, location pages where useful and fast loading." },
    { q: "What does pay monthly include?", a: "Design, build, hosting, updates, backups and a set amount of changes each month, for one fixed payment." },
    { q: "Can I pay every 2 months?", a: "Yes. Pay every 2 months and save 5% on any plan." },
  ],
};

export const Route = createFileRoute("/website-design-northamptonshire")({
  head: () => ({
    ...seo({
      title: "Website Design Northamptonshire | Bespoke Websites | SB Digital Studios",
      description: "Bespoke website design, WordPress and WooCommerce across Northamptonshire: Northampton, Corby, Wellingborough and Kettering. Pay monthly options.",
      path: c.path,
    }),
    scripts: [localServiceJsonLd({ path: c.path, serviceName: "Bespoke Website Design Northamptonshire", serviceType: "Web design", description: "Bespoke website design, WordPress and WooCommerce across Northamptonshire.", areaServed: c.areas })],
  }),
  component: () => <LocationPage c={c} />,
});
