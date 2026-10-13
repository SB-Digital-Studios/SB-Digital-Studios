import { createFileRoute } from "@tanstack/react-router";
import { LocationPage, type LocationContent } from "@/components/site/LocationPage";
import { localServiceJsonLd, seo } from "@/lib/site/seo";

const c: LocationContent = {
  path: "/wordpress-woocommerce-kettering",
  eyebrow: "WordPress & WooCommerce Kettering",
  title: <>WordPress and WooCommerce websites, <span className="text-ember">built in Kettering</span></>,
  lead: "Custom WordPress sites and WooCommerce shops you can run yourself, plus fixes, speed-ups and care for the site you already have.",
  defaultService: "WordPress website",
  introTitle: "A local WordPress developer for Kettering businesses",
  intro: [
    "WordPress powers a huge share of the web, but a lot of business sites are slow, bloated with plugins, or stuck on an old theme nobody can update.",
    "I build clean, custom WordPress themes with blocks you can edit, and WooCommerce shops with payments, delivery and VAT set up properly from day one.",
    "Already have a WordPress site? I can fix it, speed it up, secure it and look after it every month.",
  ],
  highlights: [
    "Custom WordPress themes without heavy page builders",
    "WooCommerce shops with Stripe, PayPal, Apple Pay and Google Pay",
    "Speed, security and plugin clean-ups for existing sites",
    "Care plans from £39 a month, including updates and backups",
  ],
  areas: ["Kettering", "Corby", "Wellingborough", "Rushden", "Market Harborough", "Thrapston"],
  faqs: [
    { q: "Can you fix my existing WordPress site?", a: "Yes. I regularly take over sites built by other people, fix problems and keep them updated on a care plan." },
    { q: "Is WooCommerce right for my shop?", a: "If you want full control over your shop with no monthly platform fees, WooCommerce is a great fit. I'll give you an honest view on our call." },
    { q: "Can you move my site from Wix or Squarespace?", a: "Yes, I migrate content, pages and products to WordPress and set up redirects so you don't lose Google rankings." },
    { q: "How much does a WooCommerce shop cost?", a: "Shops start from £95 a month on a pay-monthly plan, or from £2,400 as a one-off build." },
  ],
};

export const Route = createFileRoute("/wordpress-woocommerce-kettering")({
  head: () => ({
    ...seo({
      title: "WordPress & WooCommerce Developer Kettering | SB Digital Studios",
      description: "WordPress websites and WooCommerce shops built in Kettering. Custom themes, fixes, speed-ups and care plans from a local developer.",
      path: c.path,
    }),
    scripts: [localServiceJsonLd({ path: c.path, serviceName: "WordPress & WooCommerce Development Kettering", serviceType: "WordPress development", description: "WordPress websites and WooCommerce shops built and maintained in Kettering.", areaServed: c.areas })],
  }),
  component: () => <LocationPage c={c} />,
});
