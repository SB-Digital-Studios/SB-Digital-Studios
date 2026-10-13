export const SITE_URL = "https://sbdigitalstudios.co.uk";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

import { business, services } from "./data";

export function seo({ title, description, path, type = "website" }: { title: string; description: string; path: string; type?: string }) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: `${SITE_URL}${path}` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
  };
}

const BUSINESS_ID = `${SITE_URL}/#business`;

function businessNode(areaServed: string[]) {
  const places = areaServed.map((name) => ({ "@type": "City", name }));
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": BUSINESS_ID,
    name: business.name,
    description: "Bespoke website design, WordPress, WooCommerce and front-end development.",
    founder: { "@type": "Person", name: business.owner },
    email: business.email,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    image: `${SITE_URL}/apple-touch-icon.png`,
    priceRange: "££",
    currenciesAccepted: "GBP",
    address: {
      "@type": "PostalAddress",
      addressLocality: business.address.town,
      addressRegion: business.address.county,
      postalCode: business.address.postcode,
      addressCountry: "GB",
    },
    areaServed: places,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "16:30",
      },
    ],
    knowsAbout: ["Web design", "WordPress", "WooCommerce", "Front-end development", "React"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.short, url: `${SITE_URL}/services/${s.slug}` },
      })),
    },
  };
}

export function localBusinessJsonLd(areaServed: string[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({ "@context": "https://schema.org", ...businessNode(areaServed) }),
  };
}

/** LocalBusiness + the page's Service, linked via provider, for local landing pages. */
export function localServiceJsonLd({ path, serviceName, serviceType, description, areaServed }: { path: string; serviceName: string; serviceType: string; description: string; areaServed: string[] }) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        businessNode(areaServed),
        {
          "@type": "Service",
          "@id": `${SITE_URL}${path}#service`,
          name: serviceName,
          serviceType,
          description,
          url: `${SITE_URL}${path}`,
          provider: { "@id": BUSINESS_ID },
          areaServed: areaServed.map((name) => ({ "@type": "City", name })),
          offers: [
            { "@type": "Offer", name: "Pay-monthly website", priceCurrency: "GBP", priceSpecification: { "@type": "UnitPriceSpecification", price: 55, priceCurrency: "GBP", unitCode: "MON", description: "From £55 per month" } },
            { "@type": "Offer", name: "One-off bespoke build", priceCurrency: "GBP", price: 1200, description: "From £1,200" },
          ],
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: serviceName, item: `${SITE_URL}${path}` },
          ],
        },
      ],
    }),
  };
}
