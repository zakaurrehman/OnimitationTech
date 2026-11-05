import type { Metadata } from "next";
import { Compass, Eye, Scale, Target, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { GlobalArt } from "@/components/visuals/art";
import { LocationPanel } from "@/components/visuals/location-panel";
import { CtaSection } from "@/components/cta-section";
import { pageMetadata } from "@/lib/metadata";
import { licensedActivities, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Onimitation Tech DWC-LLC is a Dubai-based technology company focused on IT consulting, IT network services, and innovation & AI research and consultancy.",
  path: "/about",
});

const principles = [
  {
    icon: Compass,
    title: "Clarity over complexity",
    body: "Good technology advice simplifies. We aim for recommendations that are clear, actionable, and easy to act on.",
  },
  {
    icon: Scale,
    title: "Evidence over hype",
    body: "Especially in AI, we separate what is proven from what is promising — and say plainly which is which.",
  },
  {
    icon: Users,
    title: "Partnership over transactions",
    body: "We work alongside your team, sharing knowledge so that capability stays with your organisation.",
  },
];

const innovationCycle = ["Explore", "Evaluate", "Apply", "Refine"];

function InnovationCycle() {
  const R = 130;
  return (
    <svg viewBox="0 0 360 360" fill="none" className="h-auto w-full" role="img" aria-label="Innovation cycle: explore, evaluate, apply, refine">
      <defs>
        <linearGradient id="cyc" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3478F6" />
          <stop offset="0.5" stopColor="#19D4E5" />
          <stop offset="1" stopColor="#9275FF" />
        </linearGradient>
      </defs>
      <circle cx="180" cy="180" r={R} stroke="#94A3B8" strokeOpacity="0.12" />
      <circle cx="180" cy="180" r={R} stroke="url(#cyc)" strokeWidth="2" strokeDasharray="120 697" strokeLinecap="round" className="origin-center animate-spin-slow [animation-duration:12s]" />
      <circle cx="180" cy="180" r="78" stroke="#94A3B8" strokeOpacity="0.1" strokeDasharray="2 6" />
      <circle cx="180" cy="180" r="44" fill="#0D1422" stroke="url(#cyc)" strokeOpacity="0.6" />
      <text x="180" y="184" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="2.5" fill="#F8FAFC">
        INNOVATE
      </text>
      {innovationCycle.map((label, i) => {
        const a = (i / innovationCycle.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.round((180 + Math.cos(a) * R) * 100) / 100;
        const y = Math.round((180 + Math.sin(a) * R) * 100) / 100;
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="30" fill="#0D1422" stroke="#3478F6" strokeOpacity="0.5" />
            <text x={x} y={y + 4} textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="1.5" fill="#94A3B8">
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        visual={<GlobalArt id="about-globe" className="mx-auto max-w-lg" />}
        eyebrow="About Onimitation Tech"
        title={
          <>
            <span className="text-gradient">Built in Dubai.</span>{" "}
            <span className="text-accent">Focused on what&apos;s next.</span>
          </>
        }
        description="We are a technology company bringing together IT consulting, network services, and artificial intelligence innovation — to help organisations move forward with confidence."
      />

      {/* Overview */}
      <section aria-labelledby="overview-title" className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Company overview" title={<span id="overview-title">One company. Three connected disciplines.</span>} />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7 lg:pt-14">
            <Reveal>
              <p>
                <span className="text-fg">{site.legalName}</span> is a technology company based in Dubai, United Arab
                Emirates. We were established to help organisations navigate an increasingly complex technology landscape —
                one in which infrastructure, connectivity, and artificial intelligence are deeply intertwined.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                Rather than treating strategy, networks, and AI as separate conversations, we look at them together. The
                result is advice that reflects how technology actually works inside a business: as one connected system.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="panel mt-10 rounded-2xl p-7">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-aqua">Licensed business activities</p>
                <ul className="mt-5 space-y-3">
                  {licensedActivities.map((a, i) => (
                    <li key={a} className="flex items-baseline gap-4 text-base text-fg/90">
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      {a}
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Licence</dt>
                    <dd className="mt-1 text-fg/90">
                      No. {site.license.number} · {site.license.authority}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Registered office</dt>
                    <dd className="mt-1 text-fg/90">
                      {site.location.street}, {site.location.area}, {site.location.city}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Vision & mission */}
      <section aria-label="Vision and mission" className="pb-20 sm:pb-28">
        <Container>
          <Stagger className="grid gap-5 lg:grid-cols-2">
            {[
              {
                icon: Eye,
                label: "Our vision",
                text: "To be a trusted technology partner that helps organisations in the UAE and beyond turn intelligent technology into lasting progress.",
              },
              {
                icon: Target,
                label: "Our mission",
                text: "To deliver thoughtful IT consulting, dependable network services, and responsible AI and innovation consultancy — helping our clients make confident technology decisions.",
              },
            ].map(({ icon: Icon, label, text }) => (
              <StaggerItem key={label} className="beam-border beam-on-hover rounded-3xl">
                <SpotlightCard as="article" className="group h-full rounded-3xl p-8 sm:p-12">
                  <Icon className="h-8 w-8 text-aqua transition-transform duration-500 group-hover:scale-110" strokeWidth={1.4} aria-hidden />
                  <h2 className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-muted">{label}</h2>
                  <p className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-fg sm:text-[2rem]">{text}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-title" className="relative overflow-hidden border-y border-line bg-ink-900/40 py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-iris/10 blur-[120px]" />
        <Container className="relative">
          <Reveal>
            <Eyebrow>Our philosophy</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <blockquote id="philosophy-title" className="mt-8 max-w-5xl font-display text-[clamp(2rem,4.6vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              <span className="text-gradient">Technology should make organisations more capable — </span>
              <span className="text-accent">not more complicated.</span>
            </blockquote>
          </Reveal>
          <Stagger className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <Icon className="h-6 w-6 text-aqua" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-xl font-semibold text-fg">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Commitment to innovation */}
      <section aria-labelledby="commitment-title" className="py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="panel noise relative mx-auto max-w-md overflow-hidden rounded-3xl p-8 sm:p-10">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,120,246,0.18),transparent_65%)]" />
              <InnovationCycle />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Our commitment to innovation"
              title={<span id="commitment-title">Innovation as a discipline, not a slogan.</span>}
              description={
                <>
                  <p>
                    Innovation and artificial intelligence research are part of what we are licensed to do, and part of
                    who we intend to be. We treat innovation as a repeatable discipline: explore new possibilities,
                    evaluate them honestly, apply what works, and refine continuously.
                  </p>
                  <p className="mt-4">
                    That discipline informs every engagement — whether the question is about infrastructure, networks, or
                    the next generation of intelligent systems.
                  </p>
                </>
              }
            />
          </div>
        </Container>
      </section>

      {/* Dubai positioning */}
      <section aria-labelledby="dubai-title" className="relative overflow-hidden pb-12 pt-12 sm:pt-20">
        <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Dubai-based. Internationally minded."
              title={<span id="dubai-title">Rooted in one of the world&apos;s most connected cities.</span>}
              description={
                <>
                  <p>
                    Dubai sits at the crossroads of global business — a city that has made technology and innovation part
                    of its long-term vision. Being based here shapes our outlook: ambitious, international, and focused
                    on the future.
                  </p>
                  <p className="mt-4">
                    From our base in Dubai, we welcome conversations with organisations across the UAE and
                    internationally.
                  </p>
                </>
              }
            />
          </div>
          <Reveal className="lg:col-span-6" delay={0.1}>
            <LocationPanel />
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Let's talk about your next move."
        description="Tell us about your organisation and what you're working towards. We'd be glad to explore how we can help."
      />
    </>
  );
}
