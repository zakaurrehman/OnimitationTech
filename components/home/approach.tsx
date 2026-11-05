"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    n: "01",
    title: "Understand",
    body: "We start by listening — to your objectives, constraints, existing technology, and the problem behind the problem.",
    tags: ["Discovery", "Stakeholder input", "Current-state review"],
  },
  {
    n: "02",
    title: "Strategize",
    body: "We translate insight into a clear direction: priorities, a practical roadmap, and defined measures of success.",
    tags: ["Roadmap", "Prioritisation", "Success criteria"],
  },
  {
    n: "03",
    title: "Design",
    body: "We shape architectures, networks, and solution concepts that fit your context and are built to scale.",
    tags: ["Architecture", "Solution design", "Validation"],
  },
  {
    n: "04",
    title: "Implement",
    body: "We support delivery with structured planning, coordination, and close collaboration with your teams.",
    tags: ["Planning", "Coordination", "Enablement"],
  },
  {
    n: "05",
    title: "Evolve",
    body: "Technology never stands still. We review, refine, and identify the next opportunity to improve.",
    tags: ["Review", "Optimisation", "Next horizon"],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Approach({ id = "approach" }: { id?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="05 — Our Approach"
              title={<span id={`${id}-title`}>A clear path from question to outcome.</span>}
              description="A structured, five-stage approach keeps every engagement focused, transparent, and grounded in your objectives."
            />
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          {/* progress rail */}
          <div aria-hidden className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-line-strong sm:left-[1.9rem]" />
          <motion.div
            aria-hidden
            className="absolute bottom-6 left-[1.4rem] top-6 w-px origin-top bg-gradient-to-b from-electric via-aqua to-iris sm:left-[1.9rem]"
            style={{ scaleY: progress }}
          />

          {steps.map((s) => (
            <motion.li
              key={s.n}
              className="relative grid grid-cols-[2.8rem_1fr] gap-5 pb-14 last:pb-0 sm:grid-cols-[3.8rem_1fr] sm:gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <div className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-ink-900 font-mono text-xs text-aqua shadow-[0_0_0_6px_var(--color-ink-950)] sm:h-15 sm:w-15 sm:text-sm">
                {s.n}
              </div>
              <div className="pt-1.5 sm:pt-3">
                <h3 className="text-2xl font-semibold text-fg sm:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line bg-white/[0.02] px-3 py-1 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
