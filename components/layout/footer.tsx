import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { legalNav, mainNav, site } from "@/lib/site";
import { services } from "@/lib/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -bottom-56 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-electric/10 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-block rounded-lg">
              <Logo id="footer" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              A Dubai-based technology company delivering IT consulting, network services, and innovation &amp; artificial
              intelligence research and consultancy.
            </p>
            {site.social.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-sm text-muted transition-colors hover:border-aqua/50 hover:text-fg"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="md:col-span-3 lg:col-span-2">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Company</h2>
            <ul className="mt-5 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[0.95rem] text-fg/85 transition-colors hover:text-aqua">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4 lg:col-span-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.key}>
                  <Link href={`/services#${s.key}`} className="text-[0.95rem] text-fg/85 transition-colors hover:text-aqua">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-12 lg:col-span-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Contact</h2>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="flex items-start gap-3 text-fg/85">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden />
                <address className="not-italic leading-relaxed">
                  {site.location.street.split(", ").slice(0, 1)}
                  <br />
                  {site.location.street.split(", ").slice(1).join(", ")}
                  <br />
                  {site.location.area}
                  <br />
                  {site.location.city}, UAE
                </address>
              </li>
              <li className="flex items-start gap-3 text-fg/85">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden />
                {site.contact.email ? (
                  <a href={`mailto:${site.contact.email}`} className="hover:text-aqua">
                    {site.contact.email}
                  </a>
                ) : (
                  <Link href="/contact" className="hover:text-aqua">
                    Send us a message
                  </Link>
                )}
              </li>
              {site.contact.phone && (
                <li className="flex items-start gap-3 text-fg/85">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden />
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-aqua">
                    {site.contact.phone}
                  </a>
                </li>
              )}
            </ul>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-aqua"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        <div aria-hidden className="select-none overflow-hidden">
          <p className="translate-y-[18%] text-center font-display text-[17vw] font-semibold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(148,163,184,0.14)] lg:text-[13.5rem]">
            Onimitation
          </p>
        </div>

        <div className="relative flex flex-col gap-4 border-t border-line py-7 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved. Licence No. {site.license.number}, {site.license.authority}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
