import { ArrowRight, MessageSquare } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ShaderBackground } from "@/components/visuals/shader-background";
import { NeuralGlobe } from "@/components/visuals/neural-globe";
import { FloatingShapes } from "@/components/visuals/floating-shapes";

const LOADER_MS = 700;

function Words({ text, start, step = 90, accent = false }: { text: string; start: number; step?: number; accent?: boolean }) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="word-reveal mr-[0.22em] last:mr-0" style={{ "--d": start + i * step } as React.CSSProperties}>
      <span className={accent ? "text-accent" : "text-gradient"}>{word}</span>
    </span>
  ));
}

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <ShaderBackground />
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-50" />

      {/* 3D neural sphere — right on desktop, ambient backdrop on mobile */}
      <div aria-hidden className="fade-up absolute inset-0" style={{ "--d": LOADER_MS + 200 } as React.CSSProperties}>
        <NeuralGlobe className="absolute left-1/2 top-[30%] h-[120vw] max-h-[720px] w-[120vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-45 sm:top-[34%] lg:left-auto lg:right-[-8%] lg:top-1/2 lg:h-[min(62vw,900px)] lg:max-h-none lg:w-[min(62vw,900px)] lg:max-w-none lg:translate-x-0 lg:opacity-100" />
      </div>
      <FloatingShapes />

      <Container className="relative z-10 pb-36 pt-36 sm:pt-40 lg:pb-32">
        <div className="max-w-[46rem]">
          <p
            className="fade-up inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-ink-900/50 py-1.5 pl-1.5 pr-4 text-xs text-muted backdrop-blur-md sm:text-[0.8rem]"
            style={{ "--d": LOADER_MS } as React.CSSProperties}
          >
            <span className="rounded-full bg-gradient-to-r from-electric to-aqua px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white">
              Dubai
            </span>
            IT Consulting · Network Services · AI Innovation
          </p>

          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.6rem,6.4vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
          >
            <span className="block">
              <Words text="Engineering Intelligence." start={LOADER_MS + 80} />
            </span>
            <span className="block">
              <Words text="Empowering Tomorrow." start={LOADER_MS + 280} accent />
            </span>
          </h1>

          <p
            className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            style={{ "--d": LOADER_MS + 650 } as React.CSSProperties}
          >
            Onimitation Tech delivers innovative IT solutions, intelligent technologies, and AI-driven innovation to help
            businesses navigate the future.
          </p>

          <div
            className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ "--d": LOADER_MS + 800 } as React.CSSProperties}
          >
            <ButtonLink href="/services" size="lg" magnetic>
              Explore Our Solutions
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary" magnetic>
              <MessageSquare className="h-4 w-4 text-aqua" aria-hidden />
              Let&apos;s Talk
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div
        className="fade-up absolute inset-x-0 bottom-0 z-10 border-t border-line/60 bg-gradient-to-t from-ink-950/80 to-transparent"
        style={{ "--d": LOADER_MS + 1000 } as React.CSSProperties}
      >
        <Container className="flex items-center justify-between gap-6 py-5">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
            <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-electric" />IT Consulting</li>
            <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-aqua" />Network Services</li>
            <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-iris" />AI Research &amp; Consultancy</li>
          </ul>
          <a href="#introduction" className="group hidden items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg md:flex">
            Scroll
            <span className="relative block h-9 w-px overflow-hidden bg-line-strong">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_ease-in-out_infinite] bg-aqua" />
            </span>
          </a>
        </Container>
      </div>
    </section>
  );
}
