import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ContactFormWithParams } from "@/components/contact/contact-form-with-params";
import { ContactForm } from "@/components/contact/contact-form";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Onimitation Tech in Dubai about IT consulting, IT network services, or artificial intelligence and innovation consultancy.",
  path: "/contact",
});

const nextSteps = [
  { n: "01", title: "We review your message", body: "Your enquiry is read by our team and matched to the right practice." },
  { n: "02", title: "We reply to arrange a conversation", body: "We respond by email to learn more and schedule an initial discussion." },
  { n: "03", title: "We explore next steps together", body: "We outline how we could help and what an engagement might look like." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        breadcrumb="Contact"
        eyebrow="Contact"
        title={
          <>
            <span className="text-gradient">Let&apos;s start a</span> <span className="text-accent">conversation.</span>
          </>
        }
        description="Tell us about your technology challenge, project, or idea. We'd be glad to explore it with you."
      />

      <section aria-label="Contact details and form" className="pb-24 pt-16 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <aside className="space-y-6 lg:col-span-5">
            <Reveal>
              <ul className="panel divide-y divide-line rounded-2xl">
                <li className="flex gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-electric/10 ring-1 ring-electric/30">
                    <MapPin className="h-5 w-5 text-electric" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">Location</p>
                    <address className="mt-1.5 not-italic leading-relaxed text-fg">
                      {site.location.street}
                      <br />
                      {site.location.area}
                      <br />
                      {site.location.display}
                    </address>
                  </div>
                </li>
                <li className="flex gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-aqua/10 ring-1 ring-aqua/30">
                    <Mail className="h-5 w-5 text-aqua" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">Email</p>
                    {site.contact.email ? (
                      <a href={`mailto:${site.contact.email}`} className="mt-1.5 block text-fg hover:text-aqua">
                        {site.contact.email}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-fg">Please use the enquiry form — we&apos;ll reply by email.</p>
                    )}
                  </div>
                </li>
                <li className="flex gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-iris/10 ring-1 ring-iris/30">
                    <Phone className="h-5 w-5 text-iris" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">Phone</p>
                    {site.contact.phone ? (
                      <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="mt-1.5 block text-fg hover:text-aqua">
                        {site.contact.phone}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-fg">Available on request.</p>
                    )}
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="panel rounded-2xl p-6 sm:p-7">
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-aqua">What happens next</h2>
                <ol className="mt-6 space-y-6">
                  {nextSteps.map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="font-mono text-sm text-muted">{s.n}</span>
                      <div>
                        <p className="font-medium text-fg">{s.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </aside>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="beam-border rounded-3xl">
              <div className="panel relative rounded-3xl p-6 sm:p-10">
                <h2 className="text-2xl font-semibold text-fg sm:text-3xl">Send us a message</h2>
                <p className="mt-2 text-muted">Fields marked with an asterisk are required.</p>
                <div className="mt-8">
                  <Suspense fallback={<ContactForm />}>
                    <ContactFormWithParams />
                  </Suspense>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
