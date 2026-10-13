import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/ui";
import { business } from "@/lib/site/data";
import { seo } from "@/lib/site/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo({ title: "Privacy Policy | SB Digital Studios", description: "How SB Digital Studios collects, uses and protects your personal data under UK GDPR.", path: "/privacy" }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" lead="Last updated 13 October 2026" />
      <Section className="pt-0">
        <div className="prose-legal max-w-3xl">
          <h2>Who we are</h2>
          <p>{business.legal}, of {business.address.town}, {business.address.postcode} ("we", "us"). We are the data controller for personal data collected through this website. Contact: <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
          <h2>What we collect</h2>
          <ul>
            <li>Details you send through our enquiry form: name, email, phone number (optional), the service you're interested in and your message.</li>
            <li>Emails and messages you send us directly.</li>
            <li>Client information needed to deliver and invoice our services.</li>
            <li>Basic technical data our hosting provider records for security, such as IP addresses in server logs.</li>
          </ul>
          <h2>Why we use it and our lawful basis</h2>
          <ul>
            <li>To reply to your enquiry and give you a quote: steps taken at your request before entering a contract, and your consent.</li>
            <li>To deliver our services and send invoices: performance of a contract.</li>
            <li>To keep records for tax and accounting: legal obligation.</li>
            <li>To keep this website secure: legitimate interests.</li>
          </ul>
          <p>We never sell your data and do not send marketing emails without your separate consent.</p>
          <h2>Who we share it with</h2>
          <p>We use trusted processors to run our business: website and database hosting, email, and accounting software. They only process data on our instructions. Some providers may store data outside the UK; where they do, appropriate safeguards such as UK adequacy regulations or the UK International Data Transfer Agreement apply.</p>
          <h2>How long we keep it</h2>
          <ul>
            <li>Enquiries that don't lead to work: up to 12 months.</li>
            <li>Client records and invoices: 6 years after the end of the tax year, as required by HMRC.</li>
          </ul>
          <h2>Your rights</h2>
          <p>You have the right to access, correct, delete, restrict or object to our use of your personal data, to data portability, and to withdraw consent at any time. Email us to make a request. We will reply within one month.</p>
          <h2>Complaints</h2>
          <p>If you're unhappy with how we've handled your data, please contact us first. You can also complain to the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">ico.org.uk/make-a-complaint</a> or on 0303 123 1113.</p>
          <h2>Cookies</h2>
          <p>See our <a href="/cookies">cookie policy</a>.</p>
        </div>
      </Section>
    </>
  );
}
