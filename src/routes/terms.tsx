import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/ui";
import { business } from "@/lib/site/data";
import { seo } from "@/lib/site/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo({ title: "Terms of Service | SB Digital Studios", description: "Terms for website builds, pay-monthly and bi-monthly plans, hosting and care from SB Digital Studios.", path: "/terms" }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of service" lead="Last updated 13 October 2026. A summary for clarity; your signed proposal sets out the specific terms of your project." />
      <Section className="pt-0">
        <div className="prose-legal max-w-3xl">
          <h2>1. About us</h2>
          <p>{business.legal}, {business.address.town}, {business.address.postcode}. Email <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
          <h2>2. Quotes and proposals</h2>
          <p>Every project starts with a written proposal describing the scope, price and timeline. Work begins once you accept it and pay any deposit due.</p>
          <h2>3. One-off builds</h2>
          <ul>
            <li>50% deposit to start, 50% on completion before launch, unless agreed otherwise.</li>
            <li>Two rounds of design changes are included. Extra changes are charged at our hourly rate.</li>
            <li>Ownership of the finished website passes to you once paid in full.</li>
          </ul>
          <h2>4. Pay-monthly and bi-monthly plans</h2>
          <ul>
            <li>Payments are taken monthly, or every 2 months at a 5% discount, by Direct Debit or card.</li>
            <li>Plans have a 12-month minimum term. After that they continue until you give 30 days' written notice.</li>
            <li>Your domain name is registered in your name and remains yours.</li>
            <li>The website design and code are licensed to you while your plan is active. After the minimum term you may buy the site outright for the buy-out fee stated in your proposal, and we will transfer the files and content to you.</li>
            <li>If you cancel without buying out, we will give you a copy of your written content and images.</li>
            <li>Included monthly change time does not roll over.</li>
          </ul>
          <h2>5. Late or missed payments</h2>
          <p>If a payment is more than 14 days overdue we will contact you. If it remains unpaid after 30 days we may suspend hosting until the account is settled. We may charge statutory interest on late business payments.</p>
          <h2>6. Your responsibilities</h2>
          <p>You confirm you have the rights to any content, logos and images you provide, and that your site's content complies with the law.</p>
          <h2>7. Hosting and availability</h2>
          <p>We aim for high availability but cannot guarantee uninterrupted service. We keep regular backups and will restore your site promptly if something goes wrong.</p>
          <h2>8. Liability</h2>
          <p>Our total liability is limited to the fees you paid in the 12 months before a claim. We are not liable for indirect losses such as lost profits. Nothing limits liability that cannot be limited by law.</p>
          <h2>9. Consumers</h2>
          <p>If you are buying as a consumer rather than a business, you have a 14-day right to cancel under the Consumer Contracts Regulations. If you ask us to start work within that period, you may have to pay for work already done.</p>
          <h2>10. Law</h2>
          <p>These terms are governed by the law of England and Wales.</p>
        </div>
      </Section>
    </>
  );
}
