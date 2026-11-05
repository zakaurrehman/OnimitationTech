"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

const layers = [
  { label: "Consult", sub: "IT strategy & architecture", color: "#3478F6" },
  { label: "Connect", sub: "Network infrastructure", color: "#19D4E5" },
  { label: "Innovate", sub: "AI research & consultancy", color: "#9275FF" },
];

const facts = [
  { term: "Headquarters", value: site.location.display },
  { term: "Company", value: site.legalName },
  { term: "Focus", value: "IT consulting · Network services · AI & innovation" },
];

function IntroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const y1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const ys = [y2, y1, y0];

  return (
    <div ref={ref} className="relative aspect-[3/4] w-full sm:aspect-square lg:aspect-[4/5]">
      <div className="panel noise absolute inset-0 overflow-hidden rounded-3xl">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_50%_50%,#000,transparent_75%)]" />
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/25 blur-[90px]" />
        <motion.svg
          aria-hidden
          viewBox="0 0 400 400"
          className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2"
          style={{ rotate }}
          fill="none"
        >
          <circle cx="200" cy="200" r="190" stroke="#94A3B8" strokeOpacity="0.1" />
          <circle cx="200" cy="200" r="150" stroke="#3478F6" strokeOpacity="0.25" strokeDasharray="2 8" />
          <circle cx="200" cy="200" r="110" stroke="#19D4E5" strokeOpacity="0.2" />
          <circle cx="390" cy="200" r="4" fill="#19D4E5" />
          <circle cx="200" cy="50" r="3" fill="#9275FF" />
          <circle cx="90" cy="200" r="3" fill="#3478F6" />
        </motion.svg>
      </div>

      {/* Stacked glass layers — the three practices as one system */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 [perspective:1200px] sm:gap-4 sm:px-8">
        {layers.map((l, i) => (
          <motion.div
            key={l.label}
            style={{ y: ys[i], rotateX: 14 }}
            className="glass relative w-full max-w-[19rem] rounded-2xl p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] sm:p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">Layer 0{i + 1}</span>
              <span className="h-2 w-2 rounded-full" style={{ background: l.color, boxShadow: `0 0 16px ${l.color}` }} />
            </div>
            <p className="mt-2 font-display text-xl font-semibold text-fg sm:mt-3 sm:text-2xl">{l.label}</p>
            <p className="mt-1 text-sm text-muted">{l.sub}</p>
            <div className="mt-4 hidden h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block" />
            <div className="mt-3 hidden gap-1.5 sm:flex">
              {Array.from({ length: 12 }).map((_, k) => (
                <span
                  key={k}
                  className="h-1 flex-1 rounded-full"
                  style={{ background: l.color, opacity: 0.15 + ((k * 7 + i * 3) % 10) / 14 }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Intro() {
  return (
    <section id="introduction" aria-labelledby="intro-title" className="relative py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="01 — Introduction"
            title={<span id="intro-title">Technology That Moves Business Forward</span>}
            description={
              <>
                <p>
                  Onimitation Tech is a Dubai-based technology company focused on three disciplines that define modern
                  business: information technology consulting, IT network services, and innovation &amp; artificial
                  intelligence research and consultancy.
                </p>
                <p className="mt-4">
                  We bring them together to help organisations make better technology decisions, build dependable
                  foundations, and explore what intelligent technologies can make possible.
                </p>
              </>
            }
          />
          <Reveal delay={0.15}>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div key={f.term} className="grid grid-cols-[8.5rem_1fr] gap-4 py-4 text-sm sm:grid-cols-[10rem_1fr]">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">{f.term}</dt>
                  <dd className="text-fg/90">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/about" className="group mt-8 inline-flex items-center gap-2 font-medium text-fg transition-colors hover:text-aqua">
              More about Onimitation Tech
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6" delay={0.1}>
          <IntroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
