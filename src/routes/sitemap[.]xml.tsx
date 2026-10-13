import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/site/data";
import { SITE_URL } from "@/lib/site/seo";

const PATHS = [
  "/", "/services", ...services.map((s) => `/services/${s.slug}`),
  "/pay-monthly-websites", "/pricing", "/website-design-kettering",
  "/wordpress-woocommerce-kettering", "/website-design-northamptonshire",
  "/work", "/about", "/contact", "/privacy", "/cookies", "/terms",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = PATHS.map((p) => `<url><loc>${SITE_URL}${p}</loc></url>`).join("");
        return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
