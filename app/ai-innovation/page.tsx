import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Bot, ChevronRight, Eye, FlaskConical, Lightbulb, Lock, Radar, Scale, Telescope, UserCheck, Workflow } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ShaderBackground } from "@/components/visuals/shader-background";
import { NeuralGlobe } from "@/components/visuals/neural-globe";
import { IntelligencePipeline } from "@/components/ai/pipeline";
import { TechHorizons } from "@/components/ai/horizons";
import { CtaSection } from "@/components/cta-section";
import { pageMetadata } from "@/lib/metadata";
import { licensedActivities } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "AI & Innovation — Artificial Intelligence Consultancy in Dubai",
  description:
    "Artificial intelligence research and consultancy, intelligent automation concepts, and emerging technology exploration from Onimitation Tech, Dubai.",
  path: "/ai-innovation",
});

const focus = [
  { icon: Bot, title: "AI consulting", body: "Identifying where AI can create real value, assessing feasibility, and advising on a responsible path to adoption.", span: "lg:col-span-2" },
  { icon: FlaskConical, title: "Artificial intelligence research", body: "Following and investigating AI research to understand current capabilities, limitations, and what is emerging.", span: "" },
  { icon: Workflow, title: "Intelligent automation concepts", body: "Exploring how AI-assisted workflows could reduce manual effort and support better, faster decisions.", span: "" },
  { icon: Lightbulb, title: "Digital innovation", body: "Shaping structured approaches to generating, testing, and scaling new technology-enabled ideas.", span: "lg:col-span-2" },
  { icon: Radar, title: "Emerging technology exploration", body: "Tracking technologies on the horizon and assessing their potential relevance to your organisation.", span: "lg:col-span-2" },
  { icon: Telescope, title: "Future technology perspectives", body: "Considered viewpoints on where technology is heading — and what that could mean for strategy today.", span: "" },
];

const perspectives = [
  {
    title: "AI becomes infrastructure.",
    body: "Intelligence is moving from standalone projects into the fabric of systems and networks — making architecture decisions more important, not less.",
  },
  {
    title: "Human judgement stays central.",
    body: "The most valuable AI systems augment people. Clear oversight, accountability, and explainability are design requirements, not afterthoughts.",
  },
  {
    title: "Responsible adoption is an advantage.",
    body: "Organisations that build trust through governance, transparency, and data stewardship will be best placed to scale AI with confidence.",
  },
];

const responsible = [
  { icon: Eye, title: "Transparency", body: "Being clear about what AI systems do, how they reach outputs, and where their limits lie." },
  { icon: UserCheck, title: "Human oversight", body: "Keeping people accountable for decisions, with meaningful control over automated processes." },
  { icon: Lock, title: "Data stewardship", body: "Treating data with care — respecting privacy, security, and applicable regulation." },
  { icon: Scale, title: "Fairness", body: "Considering bias and unintended consequences throughout design and evaluation." },
];

export default function AiInnovationPage() {
  return (
    <>
      {/* Immersive hero */}
      <section aria-labelledby="ai-title" className="noise relative isolate flex min-h-[92svh] items-center overflow-hidden pb-24 pt-36">
        <ShaderBackground />
        <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-40" />
        <div aria-hidden className="fade-up absolute inset-0" style={{ "--d": 200 } as React.CSSProperties}>
          <NeuralGlobe nodes={360} scale={0.4} className="absolute left-1/2 top-1/2 h-[min(140vw,1000px)] w-[min(140vw,1000px)] -translate-x-1/2 -translate-y-1/2 opacity-60" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_50%_50%,rgba(7,11,20,0.75),transparent_70%)]" />

        <Container className="relative text-center">
          <nav aria-label="Breadcrumb" className="fade-up flex justify-center" style={{ "--d": 100 } as React.CSSProperties}>
            <ol className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-fg">Home</Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3 w-3" /></li>
              <li aria-current="page" className="text-aqua">AI &amp; Innovation</li>
            </ol>
          </nav>
          <h1
            id="ai-title"
            className="fade-up mx-auto mt-8 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
            style={{ "--d": 250 } as React.CSSProperties}
          >
            <span className="text-gradient">Intelligence,</span>
            <br />
            <span className="text-accent">explored with purpose.</span>
          </h1>
          <p className="fade-up mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" style={{ "--d": 400 } as React.CSSProperties}>
            Artificial intelligence research and consultancy that helps organisations understand what intelligent
            technologies can do — and how to adopt them responsibly.
          </p>
          <div className="fade-up mt-10 flex flex-col justify-center gap-3 sm:flex-row" style={{ "--d": 520 } as React.CSSProperties}>
            <ButtonLink href="#focus" size="lg" magnetic>
              Explore focus areas <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact?subject=ai-innovation" size="lg" variant="secondary" magnetic>
              Discuss an AI idea
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Focus areas */}
      <section id="focus" aria-labelledby="focus-title" className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Focus areas" title={<span id="focus-title">Where research meets real-world application.</span>} />
            <Reveal>
              <p className="inline-flex max-w-sm items-start gap-2.5 text-sm text-muted">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden />
                <span>
                  Licensed activity: {licensedActivities[2]}. Focus areas below describe proposed offerings within that activity.
                </span>
              </p>
            </Reveal>
          </div>
          <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {focus.map(({ icon: Icon, title, body, span }, i) => (
              <StaggerItem key={title} className={span}>
                <SpotlightCard as="article" className="group h-full p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-iris/10 ring-1 ring-iris/25 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-105">
                      <Icon className="h-5 w-5 text-iris" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-fg">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{body}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Pipeline */}
      <section aria-labelledby="pipeline-title" className="relative border-y border-line bg-ink-900/30 py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-4xl rounded-full bg-electric/10 blur-[120px]" />
        <Container className="relative">
          <SectionHeading
            align="center"
            eyebrow="From data to decisions"
            title={<span id="pipeline-title">How intelligence creates value.</span>}
            description="Successful AI initiatives connect four stages. Select a stage to see what we look at in each."
          />
          <div className="mt-16">
            <IntelligencePipeline />
          </div>
        </Container>
      </section>

      {/* Horizons */}
      <section aria-labelledby="horizons-title" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Emerging technology"
            title={<span id="horizons-title">Technology horizons we explore.</span>}
            description="From what organisations can apply today to what may reshape industries tomorrow. Hover or select a signal to learn more."
          />
          <div className="mt-16">
            <TechHorizons />
          </div>
        </Container>
      </section>

      {/* Future perspectives */}
      <section aria-labelledby="perspectives-title" className="relative overflow-hidden border-t border-line py-20 sm:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Future perspectives</Eyebrow>
          </Reveal>
          <h2 id="perspectives-title" className="sr-only">Future technology perspectives</h2>
          <div className="mt-10 divide-y divide-line">
            {perspectives.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="group grid gap-4 py-10 md:grid-cols-12 md:gap-10">
                  <span className="font-mono text-sm text-aqua md:col-span-1 md:pt-3">0{i + 1}</span>
                  <h3 className="text-3xl font-semibold leading-tight text-fg transition-colors duration-500 group-hover:text-aqua sm:text-4xl md:col-span-6 lg:text-5xl">
                    {p.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-muted md:col-span-5 md:pt-2">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Responsible AI */}
      <section aria-labelledby="responsible-title" className="pb-8 pt-12">
        <Container>
          <Reveal>
            <div className="panel noise relative overflow-hidden rounded-3xl p-8 sm:p-12">
              <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-aqua/10 blur-[100px]" />
              <div className="relative grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <Eyebrow>Responsible AI</Eyebrow>
                  <h2 id="responsible-title" className="mt-5 text-3xl font-semibold leading-tight text-fg sm:text-4xl">
                    Principles we bring to every AI conversation.
                  </h2>
                </div>
                <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
                  {responsible.map(({ icon: Icon, title, body }) => (
                    <li key={title} className={cn("border-l border-line pl-6")}>
                      <Icon className="h-5 w-5 text-aqua" strokeWidth={1.6} aria-hidden />
                      <h3 className="mt-4 text-lg font-semibold text-fg">{title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Have an AI idea worth exploring?"
        description="Whether it's an early concept or a specific challenge, let's discuss what intelligent technology could make possible."
        cta="Start a Conversation"
        href="/contact?subject=ai-innovation"
      />
    </>
  );
}
