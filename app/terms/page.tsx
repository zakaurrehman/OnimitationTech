import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions governing the use of the Onimitation Tech website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" breadcrumb="Terms & Conditions" updated="6 November 2026">
      <p>
        These Terms &amp; Conditions govern your use of {site.domain} (the &ldquo;website&rdquo;), operated by{" "}
        {site.legalName}, a company registered at {site.location.full}. By using the website, you agree to these terms. If
        you do not agree, please do not use the website.
      </p>

      <h2>1. Use of the website</h2>
      <p>
        You may use the website for lawful purposes only. You must not attempt to interfere with its operation, gain
        unauthorised access to any system, or use it to transmit unsolicited or harmful material.
      </p>

      <h2>2. Information on this website</h2>
      <p>
        Content on the website is provided for general information about {site.name} and its services. It does not
        constitute professional advice, and you should not rely on it as such. Any engagement is subject to a separate
        written agreement.
      </p>
      <p>
        Service descriptions identified as proposed offerings describe the intended scope of our services and may change.
        We make reasonable efforts to keep information accurate and current but do not warrant that it is complete or
        error-free.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        Unless otherwise stated, the website and its content — including text, graphics, illustrations, logos, and code —
        are owned by or licensed to {site.legalName} and are protected by applicable intellectual property laws. You may
        view and print content for personal, non-commercial reference only.
      </p>

      <h2>4. Third-party links</h2>
      <p>
        The website may link to third-party websites. We are not responsible for their content, policies, or practices.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.legalName} is not liable for any loss or damage arising from your use
        of, or inability to use, the website or reliance on its content. Nothing in these terms limits liability that
        cannot be limited by law.
      </p>

      <h2>6. Privacy</h2>
      <p>
        Your use of the website is also governed by our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may revise these terms at any time by updating this page. Continued use of the website after changes are
        posted constitutes acceptance of the revised terms.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These terms are governed by the laws of the Emirate of Dubai and the applicable federal laws of the United Arab
        Emirates.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms can be sent through our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
