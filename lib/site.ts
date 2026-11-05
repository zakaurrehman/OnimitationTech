/**
 * Single source of truth for verified company information.
 *
 * IMPORTANT: Only add facts that have been confirmed by Onimitation Tech.
 * Contact details and social URLs are intentionally empty until supplied —
 * the UI renders graceful fallbacks and hides social icons when no URL exists.
 */
export const site = {
  name: "Onimitation Tech",
  legalName: "Onimitation Tech DWC-LLC",
  domain: "OnimitationTech.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://onimitationtech.com").replace(/\/$/, ""),
  tagline: "Engineering Intelligence. Empowering Tomorrow.",
  description:
    "Onimitation Tech is a Dubai-based technology company delivering IT consulting, IT network services, and innovation & artificial intelligence research and consultancy.",
  location: {
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    display: "Dubai, United Arab Emirates",
    /** Registered address per the company licence (Dubai Aviation City Corporation). */
    street: "Business Centre, Building A3, Floor 3",
    area: "Business Park, Dubai South",
    full: "Business Centre, Building A3, Floor 3, Business Park, Dubai South, Dubai, United Arab Emirates",
  },
  /** Verified from the company licence. */
  license: {
    number: "15189",
    authority: "Dubai Aviation City Corporation",
    legalForm: "DWC-LLC",
  },
  contact: {
    /** Official company email — to be supplied. Leave empty to show the fallback. */
    email: "" as string,
    /** Official company phone — to be supplied. Leave empty to show the fallback. */
    phone: "" as string,
  },
  /** Add entries only when real profile URLs are supplied, e.g. { label: "LinkedIn", href: "https://…" } */
  social: [] as { label: string; href: string }[],
} as const;

/** The three business activities registered on the company licence (wording as on the licence). */
export const licensedActivities = [
  "Information Technology Consultants",
  "Information Technology Network Services",
  "Innovation & Artificial Intelligence Research & Consultancies",
] as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "AI & Innovation", href: "/ai-innovation" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;
