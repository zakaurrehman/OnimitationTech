"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./contact-form";

/** Pre-selects the subject when arriving from a service CTA, e.g. /contact?subject=ai-innovation */
export function ContactFormWithParams() {
  const params = useSearchParams();
  const subject = params.get("subject") ?? "";
  return <ContactForm key={subject} defaultSubject={subject} />;
}
