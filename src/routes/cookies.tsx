import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/ui";
import { seo } from "@/lib/site/seo";

export const Route = createFileRoute("/cookies")({
  head: () => seo({ title: "Cookie Policy | SB Digital Studios", description: "Which cookies and similar storage the SB Digital Studios website uses, and how to change your choice.", path: "/cookies" }),
  component: Cookies,
});

function Cookies() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie policy" lead="Last updated 13 October 2026" />
      <Section className="pt-0">
        <div className="prose-legal max-w-3xl">
          <h2>What are cookies?</h2>
          <p>Cookies and similar technologies (like local storage) are small files stored on your device when you visit a website.</p>
          <h2>What we use</h2>
          <h3>Strictly necessary</h3>
          <ul>
            <li><strong>sb-cookie-consent</strong> (local storage): remembers your cookie choice. Kept until you clear it.</li>
          </ul>
          <p>These are essential and don't need consent under the Privacy and Electronic Communications Regulations (PECR).</p>
          <h3>Optional analytics</h3>
          <p>We do not currently use analytics or advertising cookies. If we add them, they will only be set if you click "Accept", and this page will list them.</p>
          <h3>Fonts</h3>
          <p>Our fonts are served from our own website, so no data is sent to third-party font services.</p>
          <h2>Changing your choice</h2>
          <p>Use the "Cookie settings" link in the footer at any time, or clear your browser storage.</p>
          <p>More information: <a href="https://ico.org.uk/for-the-public/online/cookies/" target="_blank" rel="noreferrer">ico.org.uk cookies guidance</a>.</p>
        </div>
      </Section>
    </>
  );
}
