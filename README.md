# SB Digital Studios website

Marketing site for SB Digital Studios (Spencer Blackler, Kettering, Northamptonshire):
bespoke websites, WordPress, WooCommerce, front-end development, hosting/care and
pay-monthly plans (billed monthly or every 2 months).

## How the site works

- **Framework:** React 19 + TanStack Start (file-based routing) built with Vite 7,
  styled with Tailwind CSS v4.
- **Pre-rendered pages:** at build time every page is rendered to plain HTML
  (`prerender` in `vite.config.ts`, following internal links). Search engines get
  full HTML; React then takes over in the browser. No Node server is needed in production.
- **Hosting:** the built site is a single folder of static files plus a PHP mailer,
  so it runs on ordinary Apache/PHP hosting uploaded by FTP.
- **Contact form:** `src/components/site/EnquiryForm.tsx` POSTs to
  `/api/contact.php` (PHPMailer, honeypot field, optional reCAPTCHA v3). A backup copy
  of each enquiry is also inserted into the database (`enquiries` table, insert-only,
  consent required). The form reports success only when the email send succeeds; the
  database insert is best-effort logging.
- **SEO:** each route sets its own title, description, canonical URL and Open Graph
  tags (`src/lib/site/seo.ts`). Location and service pages include LocalBusiness,
  Service and Breadcrumb JSON-LD. `/sitemap.xml` is generated from the routes and
  `public/robots.txt` points to it.
- **Privacy:** fonts are self-hosted (@fontsource), no tracking before consent
  (cookie banner), and Privacy / Cookies / Terms pages are included.

## Project layout

| Path                    | What it is                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/`           | One file per page (`index.tsx` = home, `services.$slug.tsx` = each service, area pages, legal pages, `sitemap[.]xml.tsx`) |
| `src/routes/__root.tsx` | Site shell: header, footer, cookie banner, global head tags                                                               |
| `src/lib/site/data.ts`  | **All content**: business details, services, plans and prices, FAQs, comparison table                                     |
| `src/lib/site/seo.ts`   | SEO helpers and structured data                                                                                           |
| `src/components/site/`  | Header, footer, enquiry form, shared blocks, `LocationPage.tsx` template for area pages                                   |
| `src/styles.css`        | Design tokens (colours, fonts) and utilities                                                                              |
| `public/`               | Copied as-is into the build: images, robots.txt, `.htaccess`, `api/` (PHP mailer)                                         |

## Run locally

```
bun install          # or: npm install
cp .env.example .env
bun run dev          # http://localhost:3000 (PHP form will not send locally)
```

## Build for FTP upload

```
bun run build:ftp    # or: npm run build:ftp
```

This builds and pre-renders every page into `ftp-upload/`. Upload **everything inside
it** (including the hidden `.htaccess`) to the web root. The `.htaccess` gives clean
URLs (`/about`), forces HTTPS and blocks access to the mailer config.

## Mailer setup (server only)

Copy `public/api/mailer-config.example.php` to `api/mailer-config.php` on the server
with your SMTP details (or set SMTP_* / MAIL_* environment variables).
**Never commit `mailer-config.php`.**

## Common edits

- Prices, services, contact details, FAQs: `src/lib/site/data.ts`
- New area page: copy a location route (e.g. `website-design-kettering.tsx`) and change its content object
- New page: add a file in `src/routes/` and link to it; it is pre-rendered automatically
- Colours/fonts: `src/styles.css`
