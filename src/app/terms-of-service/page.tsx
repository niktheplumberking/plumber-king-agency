import { site } from "@/content/site";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Terms of Service", description: `Terms of Service for the ${site.name} website and services. ${site.name} is owned and operated by ${site.legalEntity}.`, path: "/terms-of-service/" });

/*
 * Based on the Terms on Nick's old site (Jan 2026), with the holding company added as Nick asked (2026-10-14).
 * NOT legal advice. TO-CONFIRM before launch, ideally with a lawyer: Bennett Co. LLC's state of organization and
 * registered address (for governing law and notices). Nothing here invents those.
 */
export default function TermsPage() {
  const e = site.legalEntity;
  return (
    <LegalPage title="Terms of Service" path="/terms-of-service/" updated="October 14, 2026">
      <h2>1. Who we are</h2>
      <p>{site.name} (&ldquo;Plumber King&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a business owned and operated by <strong>{e}</strong>, its holding company. References to {site.name} in these Terms include {e}. You can reach us at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>2. Acceptance of these Terms</h2>
      <p>By accessing or using the {site.name} website ({site.url.replace("https://", "")}) or our services, you agree to these Terms of Service. If you do not agree, please do not use the website or our services.</p>
      <h2>3. Our services</h2>
      <p>{site.name} provides website design and development, search engine optimization, lead capture and related digital marketing services for plumbing companies. The specific scope, deliverables, timeline and price of any project are set out in a separate written proposal or service agreement. If that agreement conflicts with these Terms, the agreement controls.</p>
      <h2>4. Your responsibilities as a client</h2>
      <ul>
        <li>Provide accurate and complete information about your business.</li>
        <li>Respond to requests for content, approvals and feedback in a reasonable time.</li>
        <li>Make payments according to the agreed terms.</li>
        <li>Make sure you have the rights to all materials you give us (logos, photos, text), and that any reviews or claims you ask us to publish are genuine and accurate.</li>
      </ul>
      <h2>5. Payment</h2>
      <p>Payment terms are set out in your proposal or service agreement. Late payment may lead to suspension of services or additional fees as described in that agreement.</p>
      <h2>6. Results</h2>
      <p>We work hard to grow your calls and leads, but search rankings, AI-search mentions and lead volumes depend on factors outside our control, including search engine and AI provider decisions, your market and your competitors. Unless your written agreement says otherwise, we cannot promise any specific ranking, traffic or revenue result.</p>
      <h2>7. Intellectual property</h2>
      <p>Once your project is paid in full, you own the final deliverables created specifically for your project. Third-party items (such as fonts, plugins, stock media and hosting) remain subject to their own licenses. We may show the work in our portfolio unless you ask us in writing not to.</p>
      <h2>8. Website use</h2>
      <p>The content of this website is provided for general information. Please do not copy, scrape or reuse it without our permission, attempt to break or overload the site, or use it for anything unlawful.</p>
      <h2>9. Limitation of liability</h2>
      <p>To the fullest extent permitted by law, neither {site.name} nor {e} is liable for any indirect, incidental, special or consequential damages arising from use of the website or our services. Our total liability for any claim relating to a service is limited to the amount you paid for that specific service.</p>
      <h2>10. Termination</h2>
      <p>Either party may end services with written notice as set out in the service agreement. On termination, you are responsible for payment for all work completed up to that point.</p>
      <h2>11. Changes to these Terms</h2>
      <p>We may update these Terms from time to time. Changes take effect when posted on this page, with the date above updated. Continued use of the website or our services after a change means you accept the updated Terms.</p>
      <h2>12. Contact</h2>
      <p>Questions about these Terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <p><strong>{site.name} is a {e} company.</strong></p>
    </LegalPage>
  );
}
