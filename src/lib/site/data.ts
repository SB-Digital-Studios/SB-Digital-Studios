export const business = {
  name: "SB Digital Studios",
  owner: "Spencer Blackler",
  legal: "SB Digital Studios is a trading name of Spencer Blackler, sole trader",
  email: "hello@sbdigitalstudios.co.uk",
  address: { town: "Kettering", county: "Northamptonshire", postcode: "NN15 6BA" },
  hours: "Tue to Fri, 8:30am to 4:30pm",
};

export type Service = {
  slug: "bespoke-websites" | "wordpress" | "woocommerce" | "front-end-development" | "hosting-care";
  title: string;
  short: string;
  intro: string;
  points: string[];
  forWho: string;
};

export const services: Service[] = [
  {
    slug: "bespoke-websites",
    title: "Bespoke Website Design & Build",
    short: "Custom-built sites designed around your business, not a template.",
    intro:
      "A website shaped around how your customers think and buy. Planned, designed and hand-built for speed, search and enquiries.",
    points: ["Discovery call and page plan", "Custom design for every page", "Fast, mobile-first build", "SEO foundations and Google setup", "Training so you can edit it yourself"],
    forWho: "Local businesses, trades, clinics and service companies that have outgrown a DIY site.",
  },
  {
    slug: "wordpress",
    title: "WordPress Websites",
    short: "New WordPress builds, custom themes, fixes and speed work.",
    intro:
      "Clean, lightweight WordPress sites you can update yourself, plus rescue work for slow, broken or hacked existing sites.",
    points: ["Custom themes, no bloated page builders", "Gutenberg blocks you can edit", "Speed and Core Web Vitals fixes", "Plugin audits and security hardening", "Migrations from Wix, Squarespace and old hosts"],
    forWho: "Businesses that want control of their content, and owners stuck with a site that no longer works.",
  },
  {
    slug: "woocommerce",
    title: "WooCommerce Online Shops",
    short: "Online shops that are easy to run and quick to check out.",
    intro:
      "WooCommerce stores set up properly: products, payments, delivery, VAT and emails, so you can take orders from day one.",
    points: ["Stripe, PayPal, Apple Pay and Google Pay", "Delivery zones, click and collect", "Product, stock and variation setup", "Checkout speed and conversion tweaks", "Ongoing shop support"],
    forWho: "Independent shops, makers and local businesses selling online.",
  },
  {
    slug: "front-end-development",
    title: "Front-end Development",
    short: "React and modern front-end builds, including white-label agency work.",
    intro:
      "Pixel-accurate front-end development from your designs, in React or plain HTML, CSS and JavaScript. Available white-label for agencies.",
    points: ["Figma to code, accurately", "React, Vite and TypeScript", "Accessible, semantic markup", "Animation and interaction work", "White-label support for agencies"],
    forWho: "Agencies, designers and start-ups who need a reliable developer.",
  },
  {
    slug: "hosting-care",
    title: "Hosting, Care & Maintenance",
    short: "Updates, backups, security and small changes, handled every month.",
    intro:
      "Fast UK hosting plus a care plan that keeps your site updated, backed up and secure, with a real person to email when you need a change.",
    points: ["Managed UK hosting and SSL", "Weekly updates and daily backups", "Uptime and security monitoring", "Monthly content changes included", "A simple monthly report"],
    forWho: "Anyone who wants their website looked after without thinking about it.",
  },
];

export type Plan = {
  name: string;
  monthly: number;
  blurb: string;
  features: string[];
  featured?: boolean;
};

/** Bi-monthly billing charges two months at once with this discount. */
export const BIMONTHLY_DISCOUNT = 0.05;

export const plans: Plan[] = [
  {
    name: "Care",
    monthly: 39,
    blurb: "For an existing WordPress site that needs looking after.",
    features: ["Hosting and SSL", "Updates, backups, monitoring", "30 minutes of changes a month", "Email support"],
  },
  {
    name: "Starter Site",
    monthly: 55,
    blurb: "A bespoke site up to 5 pages, built and hosted for you.",
    features: ["Bespoke design and build", "Hosting, care and backups", "1 hour of changes a month", "Local SEO setup", "Domain in your name"],
    featured: true,
  },
  {
    name: "Shop",
    monthly: 95,
    blurb: "A WooCommerce shop with payments and delivery set up.",
    features: ["Everything in Starter", "WooCommerce shop setup", "Payments and delivery", "2 hours of changes a month"],
  },
];

export const oneOffFrom = 1200;

export const comparison = [
  { feature: "Website build", sb: "Done for you, bespoke", diy: "Done by you", agency: "High upfront cost" },
  { feature: "Hosting", sb: "Included", diy: "Extra cost", agency: "Often extra" },
  { feature: "Who owns it", sb: "Your domain, in your name", diy: "Locked to the platform", agency: "Varies" },
  { feature: "Changes", sb: "Included every month", diy: "You do them", agency: "Billed hourly" },
  { feature: "Support", sb: "Direct to the developer", diy: "Ticket queues", agency: "Account managers" },
];

export const process = [
  { title: "Free call", text: "A 20-minute chat about your business, goals and budget." },
  { title: "Plan & quote", text: "A clear page plan and a fixed price or monthly plan." },
  { title: "Design & build", text: "You see progress as it happens and give feedback." },
  { title: "Launch & care", text: "Go live, get found on Google, and stay looked after." },
];

export const generalFaqs = [
  {
    q: "Do I own my website on a monthly plan?",
    a: "Your domain is always registered in your name. After the 12-month minimum term you can keep paying monthly, cancel with 30 days' notice, or buy the site outright for a fixed fee agreed upfront.",
  },
  {
    q: "What does paying every 2 months mean?",
    a: "Instead of a monthly payment you pay for two months at a time, and save 5%. Same plan, fewer payments.",
  },
  {
    q: "How long does a website take?",
    a: "Most small business sites go live in 2 to 4 weeks. WooCommerce shops usually take 4 to 6 weeks depending on products.",
  },
  {
    q: "Can you work on my existing WordPress site?",
    a: "Yes. I fix, speed up and maintain existing WordPress and WooCommerce sites, even if someone else built them.",
  },
  {
    q: "Do you only work in Kettering?",
    a: "I'm based in Kettering and happy to meet locally across Northamptonshire, but I work with clients anywhere in the UK by video call.",
  },
];

export const enquiryOptions = [
  "Bespoke website",
  "WordPress website",
  "WooCommerce shop",
  "Front-end development",
  "Hosting & care",
  "Pay-monthly website",
  "Something else",
];
