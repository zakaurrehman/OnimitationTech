import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Onimitation Tech DWC-LLC collects, uses, and protects personal information submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" breadcrumb="Privacy Policy" updated="6 November 2026">
      <p>
        This Privacy Policy explains how {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
        collects, uses, and protects personal information when you visit {site.domain} or contact us through it. We are
        registered at {site.location.full}.
      </p>

      <h2>1. Information we collect</h2>
      <p>We collect only the information needed to operate this website and respond to enquiries:</p>
      <ul>
        <li>
          <strong className="text-fg">Information you provide</strong> — when you use our contact form: your name,
          business email address, company name (optional), selected subject, and message.
        </li>
        <li>
          <strong className="text-fg">Technical information</strong> — such as your IP address, browser type, and the
          pages requested, which our hosting infrastructure processes to deliver the website, protect it against abuse,
          and keep it secure.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and communicate with you about it.</li>
        <li>To protect the website and contact form against spam, fraud, and misuse.</li>
        <li>To maintain and improve the website.</li>
        <li>To comply with applicable legal obligations.</li>
      </ul>
      <p>We do not sell your personal information, and we do not use it for automated decision-making.</p>

      <h2>3. Legal basis</h2>
      <p>
        We process contact-form information on the basis of your consent, which you give when you submit the form, and
        our legitimate interest in responding to business enquiries and keeping our website secure. We aim to handle
        personal data in line with applicable UAE data-protection law, including Federal Decree-Law No. 45 of 2021 on
        the Protection of Personal Data.
      </p>

      <h2>4. Cookies and analytics</h2>
      <p>
        This website does not currently use advertising or analytics cookies. If that changes, we will update this
        policy and, where required, ask for your consent first.
      </p>

      <h2>5. Sharing your information</h2>
      <p>
        We share personal information only with service providers that help us operate the website and deliver
        messages (for example, website hosting and email delivery providers), and only to the extent necessary for them
        to provide those services. We may also disclose information where required by law.
      </p>

      <h2>6. International transfers</h2>
      <p>
        Some of our service providers may process data outside the United Arab Emirates. Where this happens, we take
        reasonable steps to ensure your information remains appropriately protected.
      </p>

      <h2>7. Retention</h2>
      <p>
        We keep enquiry information only for as long as needed to respond to you and for reasonable record-keeping
        purposes, after which it is deleted or anonymised.
      </p>

      <h2>8. Security</h2>
      <p>
        We use appropriate technical and organisational measures to protect personal information, including encrypted
        connections (HTTPS). No method of transmission over the internet is completely secure, however.
      </p>

      <h2>9. Your rights</h2>
      <p>
        Subject to applicable law, you may request access to, correction of, or deletion of your personal information,
        object to or restrict its processing, and withdraw your consent at any time. To make a request, please{" "}
        <Link href="/contact">contact us</Link>.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above shows when it was last revised.</p>

      <h2>11. Contact</h2>
      <p>
        For any questions about this policy or how we handle your information, please reach us through our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
