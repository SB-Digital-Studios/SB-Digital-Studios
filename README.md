# SB Digital Studios website

Bespoke websites, WordPress and WooCommerce. Kettering, Northamptonshire.

## Run locally
```
bun install
cp .env.example .env
bun run dev
```

## Contact form
Enquiries POST to `public/api/contact.php` (PHPMailer). Copy
`public/api/mailer-config.example.php` to `mailer-config.php` on the server
(never commit it) or set the SMTP_* / MAIL_* environment variables.
A backup copy of each enquiry is also stored in the database.

## Edit content
Services, plans, prices and contact details: `src/lib/site/data.ts`.
