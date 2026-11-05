import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, CircleDashed, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArchitectureArt, NetworkArt, SynapseArt } from "@/components/visuals/art";
import { OrbitVisual } from "@/components/visuals/orbit-visual";
import { ServiceIcon, serviceTone } from "@/components/service-icon";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, pageMetadata } from "@/lib/metadata";
import { services, type Service, type ServiceKey } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Services — IT Consulting, Network Services & AI Consultancy",
  description:
    "IT consulting, IT network services, and artificial intelligence & innovation consultancy from Onimitation Tech in Dubai, UAE.",
  path: "/services",
});

const visuals: Record<ServiceKey, React.ReactNode> = {
  "it-consulting": <ArchitectureArt id="svc-arch" />,
  "network-services": <NetworkArt id="svc-net" />,
  "ai-innovation": <SynapseArt id="svc-syn" />,
};

function ProposedTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
      <CircleDashed className="h-3 w-3" aria-hidden />
      Proposed offering
    </span>
  );
}

function LicensedTag({ activity }: { activity: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-aqua/30 bg-aqua/[0.06] py-1 pl-2 pr-3 text-xs text-fg/90">
      <BadgeCheck className="h-4 w-4 text-aqua" aria-hidden />
      <span>
        <span className="sr-only">Licensed activity: </span>
        {activity}
      </span>
    </span>
  );
}

function ServiceSection({ service, flip }: { service: Service; flip: boolean }) {
  const tone = serviceTone[service.key];
  return (
    <section id={service.key} aria-labelledby={`${service.key}-title`} className="relative border-t border-line py-20 sm:py-28">
      <Container>
        {/* Header */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <span className={cn("grid h-12 w-12 place-items-center rounded-xl ring-1", tone.bg, tone.ring)}>
                  <ServiceIcon service={service.key} className={cn("h-5 w-5", tone.text)} strokeWidth={1.6} />
                </span>
                <span className="font-mono text-sm text-muted">{service.index} / 03</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id={`${service.key}-title`} className="mt-8 text-4xl font-semibold leading-[1.02] text-fg sm:text-5xl lg:text-6xl">
                {service.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 font-display text-xl text-accent sm:text-2xl">{service.tagline}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6">
                <LicensedTag activity={service.licensedActivity} />
              </div>
            </Reveal>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">
              {service.intro.map((p, i) => (
                <Reveal key={i} delay={0.12 + i * 0.04}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className={cn("lg:col-span-6", flip && "lg:order-1")} delay={0.1}>
            <div className="panel noise relative overflow-hidden rounded-3xl">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
              <div aria-hidden className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full blur-[100px]" style={{ background: `${tone.hex}40` }} />
              <div className="relative flex items-center justify-between border-b border-line px-6 py-4 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted">
                <span>{service.shortTitle}</span>
                <span className={tone.text}>Fig. {service.index}</span>
              </div>
              <div className="relative p-6 sm:p-10">{visuals[service.key]}</div>
            </div>
          </Reveal>
        </div>

        {/* Capabilities */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Capabilities</h3>
          </Reveal>
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.capabilities.map((c, i) => (
              <StaggerItem key={c.title}>
                <SpotlightCard as="article" className="group h-full p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className={cn("font-mono text-xs", tone.text)}>{String(i + 1).padStart(2, "0")}</span>
                    <ProposedTag />
                  </div>
                  <h4 className="mt-6 font-display text-xl font-semibold text-fg">{c.title}</h4>
                  <p className="mt-2.5 leading-relaxed text-muted">{c.description}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Applications + benefits */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="panel h-full rounded-2xl p-7 sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Business applications</h3>
              <ul className="mt-6 space-y-4">
                {service.applications.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-fg/90">
                    <ArrowRight className={cn("mt-1 h-4 w-4 shrink-0", tone.text)} aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="panel h-full rounded-2xl p-7 sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Benefits</h3>
              <ul className="mt-6 grid gap-6 sm:grid-cols-3">
                {service.benefits.map((b) => (
                  <li key={b.title}>
                    <Check className={cn("h-5 w-5", tone.text)} aria-hidden />
                    <p className="mt-3 font-display text-lg font-semibold text-fg">{b.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{b.description}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">Discuss your {service.shortTitle.toLowerCase()} requirements with us.</p>
                <ButtonLink href={`/contact?subject=${service.key}`} variant="secondary">
                  Talk to us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default function ServicesPage() {
  const servicesLd = {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      name: s.title,
      serviceType: s.licensedActivity,
      description: s.summary,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: { "@type": "Country", name: site.location.country },
      url: `${site.url}/services#${s.key}`,
    })),
  };

  return (
    <>
      <JsonLd data={servicesLd} />
      <PageHero
        breadcrumb="Services"
        visual={<OrbitVisual />}
        eyebrow="Services"
        title={
          <>
            <span className="text-gradient">Technology services for</span>{" "}
            <span className="text-accent">the decisions that matter.</span>
          </>
        }
        description="IT consulting, network services, and AI & innovation consultancy — three practices built on the business activities we are licensed to deliver in Dubai."
      >
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-3">
            {services.map((s) => (
              <li key={s.key}>
                <a
                  href={`#${s.key}`}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-ink-900/50 px-4 py-2.5 text-sm text-fg/90 backdrop-blur-md transition-colors hover:border-aqua/50 hover:text-fg"
                >
                  <ServiceIcon service={s.key} className={cn("h-4 w-4", serviceTone[s.key].text)} />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* Licensed vs proposed explainer */}
      <section aria-label="How to read this page" className="py-16">
        <Container>
          <Reveal>
            <div className="panel grid gap-8 rounded-2xl p-7 sm:p-9 md:grid-cols-2">
              <div className="flex gap-4">
                <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-aqua" aria-hidden />
                <div>
                  <p className="font-semibold text-fg">Licensed activity</p>
                  <p className="mt-1.5 leading-relaxed text-muted">
                    Each practice corresponds to a business activity registered on the {site.legalName} licence.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CircleDashed className="mt-0.5 h-6 w-6 shrink-0 text-muted" aria-hidden />
                <div>
                  <p className="font-semibold text-fg">Proposed offering</p>
                  <p className="mt-1.5 leading-relaxed text-muted">
                    Specific capabilities describe the intended scope within each activity and may be refined. Contact us
                    to discuss your exact requirements.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {services.map((s, i) => (
        <ServiceSection key={s.key} service={s} flip={i % 2 === 1} />
      ))}

      <CtaSection
        title="Not sure where to start?"
        description="Describe your challenge and we'll help you identify the right starting point — whether that's strategy, infrastructure, or AI."
      />
    </>
  );
}
