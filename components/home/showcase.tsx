import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { NeuralArt } from "@/components/visuals/art";

const themes = [
  "Artificial intelligence",
  "Neural networks",
  "Intelligent automation",
  "Data infrastructure",
  "Network architecture",
  "Digital transformation",
  "Emerging technology",
  "Innovation strategy",
];

const pillars = [
  {
    n: "i.",
    title: "Research",
    body: "Following the frontier of AI research to understand what is genuinely possible — and what is not yet.",
  },
  {
    n: "ii.",
    title: "Consultancy",
    body: "Translating that understanding into practical guidance on where intelligent technologies fit your organisation.",
  },
  {
    n: "iii.",
    title: "Exploration",
    body: "Investigating emerging technologies early, so that innovation is deliberate rather than reactive.",
  },
];

export function Showcase() {
  return (
    <section aria-labelledby="showcase-title" className="relative overflow-hidden py-20 sm:py-28">
      <Container>
        <Reveal>
          <Eyebrow>03 — Innovation</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="showcase-title"
            className="mt-6 max-w-5xl text-[clamp(2.5rem,6.5vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          >
            <span className="text-gradient">Where Intelligence</span>{" "}
            <span className="text-accent">Meets Innovation</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.1}>
            <figure className="panel noise relative overflow-hidden rounded-3xl">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-iris/20 blur-[100px]" />
              <div className="relative flex items-center justify-between border-b border-line px-6 py-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                <span>Fig. 01 — Neural architecture</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-aqua" /> Live signal
                </span>
              </div>
              <div className="relative px-4 py-8 sm:px-10 sm:py-12">
                <NeuralArt id="showcase-neural" />
              </div>
              <figcaption className="relative border-t border-line px-6 py-4 text-sm text-muted">
                Illustrative: information flows through layered representations to become insight.
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.12 + i * 0.08}>
                <article className="group border-t border-line pt-6">
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-lg italic text-aqua">{p.n}</span>
                    <div>
                      <h3 className="text-2xl font-semibold text-fg sm:text-3xl">{p.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <Link href="/ai-innovation" className="group inline-flex items-center gap-2 font-medium text-fg transition-colors hover:text-aqua">
                Discover AI &amp; Innovation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Themes marquee */}
      <div className="mask-fade-x mt-24 overflow-hidden border-y border-line py-6" aria-label="Focus themes">
        <ul className="flex w-max animate-marquee gap-12 whitespace-nowrap hover:[animation-play-state:paused]">
          {[...themes, ...themes].map((t, i) => (
            <li key={i} aria-hidden={i >= themes.length} className="flex items-center gap-12 font-display text-2xl text-fg/70 sm:text-3xl">
              {t}
              <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-electric to-aqua" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
