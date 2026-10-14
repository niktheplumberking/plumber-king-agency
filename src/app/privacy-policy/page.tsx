import { site } from "@/content/site";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Privacy Policy", description: `How ${site.name} (a ${site.legalEntity} company) collects, uses and protects your information.`, path: "/privacy-policy/" });

/* Based on the old site's policy (Jan 2026), with the owning entity named. NOT legal advice; review with a lawyer before launch,
 * and update section 5 if analytics, ad pixels or a CRM are added. */
export default function PrivacyPage() {
  const e = site.legalEntity;
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/" updated="October 14, 2026">
      <p>This policy explains how {site.name}, a business of <strong>{e}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;), handles personal information collected through this website.</p>
      <h2>1. Information we collect</h2>
      <p>We collect the information you give us when you fill out a form, request a strategy call or website audit, or email us. This may include your name, business name, email address, phone number and website address. Our web host may also keep standard server logs (such as IP address, browser type and pages visited) for security and reliability.</p>
      <h2>2. How we use it</h2>
      <ul>
        <li>To respond to your inquiry and provide the services you ask for.</li>
        <li>To prepare your website audit or strategy call.</li>
        <li>To send you marketing messages, only where you have agreed to receive them. You can opt out at any time.</li>
        <li>To improve our website and services, and to comply with legal obligations.</li>
      </ul>
      <h2>3. Sharing</h2>
      <p>We do not sell your personal information. We share it only with service providers who help us run our business (such as hosting, email and customer-management tools), under confidentiality obligations, or when required by law.</p>
      <h2>4. Security and retention</h2>
      <p>We use reasonable safeguards to protect your information, but no method of sending data over the internet is completely secure. We keep information only as long as we need it for the purposes above or as the law requires.</p>
      <h2>5. Cookies and analytics</h2>
      <p>This website may use cookies and similar technologies to keep it working and to understand how visitors use it. You can block or delete cookies in your browser settings, though some features may not work as intended.</p>
      <h2>6. Your rights</h2>
      <p>Depending on where you live (for example California or Canada), you may have the right to access, correct or delete the personal information we hold about you, and to opt out of marketing. To make a request, email us at the address below.</p>
      <h2>7. Children</h2>
      <p>This website is meant for businesses and is not directed at children under 16.</p>
      <h2>8. Changes</h2>
      <p>We may update this policy. The date at the top shows the latest version.</p>
      <h2>9. Contact</h2>
      <p>Questions or requests: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
