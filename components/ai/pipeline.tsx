"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrainCircuit, Database, Lightbulb, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  {
    key: "data",
    label: "Data",
    icon: Database,
    title: "Data foundations",
    body: "Every intelligent system begins with data. We look at what data exists, how it is structured and governed, and whether it can support the outcomes you want.",
    questions: ["What data do you hold, and where?", "Is it reliable, accessible, and well governed?", "What gaps would limit an AI initiative?"],
  },
  {
    key: "learning",
    label: "Learning",
    icon: BrainCircuit,
    title: "Models & learning",
    body: "We evaluate which AI approaches fit the problem — from established machine-learning techniques to modern foundation models — weighing capability against cost and risk.",
    questions: ["Which approach suits the problem?", "Build, adapt, or adopt an existing model?", "How will quality be measured?"],
  },
  {
    key: "insight",
    label: "Insight",
    icon: Lightbulb,
    title: "Insight & understanding",
    body: "Model outputs only matter when people can understand and trust them. We focus on interpretability, validation, and how insight reaches decision-makers.",
    questions: ["Can the output be explained?", "How is it validated over time?", "Who acts on it, and how?"],
  },
  {
    key: "action",
    label: "Action",
    icon: Workflow,
    title: "Intelligent action",
    body: "The final step connects intelligence to operations — exploring where AI-assisted workflows and automation could create value while keeping humans in control.",
    questions: ["Which workflows benefit most?", "Where must humans stay in the loop?", "How is impact tracked?"],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function IntelligencePipeline() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!auto || reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % stages.length), 5200);
    return () => window.clearInterval(id);
  }, [auto, reduce]);

  function select(i: number, focus = false) {
    setAuto(false);
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = stages.length - 1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select(i === last ? 0 : i + 1, true); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select(i === 0 ? last : i - 1, true); }
    if (e.key === "Home") { e.preventDefault(); select(0, true); }
    if (e.key === "End") { e.preventDefault(); select(last, true); }
  }

  const stage = stages[active];

  return (
    <div onPointerEnter={() => setAuto(false)}>
      <div className="relative">
        {/* connector */}
        <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[2.25rem] hidden h-px bg-line-strong md:block">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-electric via-aqua to-iris"
            animate={{ scaleX: active / (stages.length - 1) }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
        <div role="tablist" aria-label="From data to decisions" className="relative grid grid-cols-2 gap-3 md:grid-cols-4">
          {stages.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            return (
              <button
                key={s.key}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`tab-${s.key}`}
                aria-selected={isActive}
                aria-controls={`panel-${s.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex flex-col items-center gap-3 rounded-2xl p-3 text-center"
              >
                <span
                  className={cn(
                    "relative grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl border transition-colors duration-500",
                    isActive ? "border-aqua/60 bg-ink-800" : "border-line-strong bg-ink-900 group-hover:border-aqua/30",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pipeline-glow"
                      className="absolute inset-0 rounded-2xl bg-aqua/15 shadow-[0_0_40px_-4px_rgba(25,212,229,0.55)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={cn("relative h-7 w-7 transition-colors", isActive ? "text-aqua" : "text-muted group-hover:text-fg")} strokeWidth={1.5} aria-hidden />
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">0{i + 1}</span>
                <span className={cn("font-display text-lg font-semibold transition-colors", isActive ? "text-fg" : "text-muted")}>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="panel relative mt-10 min-h-[17rem] overflow-hidden rounded-3xl p-7 sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-electric/15 blur-[90px]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.key}
            role="tabpanel"
            id={`panel-${stage.key}`}
            aria-labelledby={`tab-${stage.key}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative grid gap-8 md:grid-cols-5"
          >
            <div className="md:col-span-3">
              <h3 className="text-2xl font-semibold text-fg sm:text-3xl">{stage.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-muted">{stage.body}</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-aqua">Questions we explore</p>
              <ul className="mt-4 space-y-3">
                {stage.questions.map((q) => (
                  <li key={q} className="flex gap-3 border-b border-line pb-3 text-fg/90 last:border-0">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
