/** Shared contact-form schema — used for both client-side and server-side validation. */

export const subjects = [
  { value: "it-consulting", label: "IT Consulting" },
  { value: "network-services", label: "IT Network Services" },
  { value: "ai-innovation", label: "AI & Innovation Consultancy" },
  { value: "general", label: "General enquiry" },
  { value: "partnership", label: "Partnership opportunity" },
] as const;

export type ContactField = "name" | "email" | "company" | "subject" | "message" | "consent";
export type ContactValues = Record<Exclude<ContactField, "consent">, string> & { consent: boolean };
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactErrors;
};

export const LIMITS = { name: 100, email: 254, company: 120, message: 5000, messageMin: 20 } as const;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

export function validateField(field: ContactField, values: ContactValues): string | undefined {
  switch (field) {
    case "name": {
      const v = values.name.trim();
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      if (v.length > LIMITS.name) return `Name must be under ${LIMITS.name} characters.`;
      return;
    }
    case "email": {
      const v = values.email.trim();
      if (!v) return "Please enter your business email.";
      if (v.length > LIMITS.email || !EMAIL_RE.test(v)) return "Please enter a valid email address, e.g. name@company.com.";
      return;
    }
    case "company":
      if (values.company.trim().length > LIMITS.company) return `Company must be under ${LIMITS.company} characters.`;
      return;
    case "subject":
      if (!subjects.some((s) => s.value === values.subject)) return "Please choose a subject.";
      return;
    case "message": {
      const v = values.message.trim();
      if (!v) return "Please tell us a little about your enquiry.";
      if (v.length < LIMITS.messageMin) return `Please add a bit more detail (at least ${LIMITS.messageMin} characters).`;
      if (v.length > LIMITS.message) return `Message must be under ${LIMITS.message} characters.`;
      return;
    }
    case "consent":
      if (!values.consent) return "Please confirm you agree to the Privacy Policy.";
      return;
  }
}

export const FIELD_ORDER: ContactField[] = ["name", "email", "company", "subject", "message", "consent"];

export function validateAll(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const f of FIELD_ORDER) {
    const e = validateField(f, values);
    if (e) errors[f] = e;
  }
  return errors;
}
