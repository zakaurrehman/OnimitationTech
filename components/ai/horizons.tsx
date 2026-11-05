"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Horizon = "Now" | "Next" | "Beyond";

const topics: { name: string; horizon: Horizon; angle: number; body: string }[] = [
  { name: "Generative AI", horizon: "Now", angle: -60, body: "Models that generate text, images, and code — and their practical, governed use inside business workflows." },
  { name: "Intelligent automation", horizon: "Now", angle: 60, body: "Combining AI with workflow automation to reduce repetitive manual effort and support better decisions." },
  { name: "Computer vision", horizon: "Now", angle: 180, body: "Systems that interpret images and video for inspection, monitoring, and analysis." },
  { name: "AI agents", horizon: "Next", angle: -20, body: "AI systems that plan and carry out multi-step tasks using tools — with appropriate human oversight." },
  { name: "Edge AI", horizon: "Next", angle: 100, body: "Running AI models on local devices and networks for speed, privacy, and resilience." },
  { name: "Digital twins", horizon: "Next", angle: 220, body: "Virtual models of physical assets and systems, used for simulation, planning, and optimisation." },
  { name: "AI-native networks", horizon: "Beyond", angle: 20, body: "Next-generation networks with intelligence built into the fabric of connectivity and operations." },
  { name: "Quantum computing", horizon: "Beyond", angle: 140, body: "An emerging computing paradigm with potential long-term implications for optimisation and security." },
  { name: "Neuromorphic computing", horizon: "Beyond", angle: 255, body: "Brain-inspired hardware architectures exploring new levels of computing efficiency." },
];

const rings: Record<Horizon, { r: number; color: string }> = {
  Now: { r: 0.3, color: "#19D4E5" },
  Next: { r: 0.6, color: "#3478F6" },
  Beyond: { r: 0.88, color: "#9275FF" },
};

export function TechHorizons() {
  const [active, setActive] = useState(0);
  const topic = topics[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Radar */}
      <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:col-span-7">
        <svg viewBox="-1 -1 2 2" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="radar-bg">
              <stop offset="0" stopColor="#3478F6" stopOpacity="0.18" />
              <stop offset="1" stopColor="#3478F6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="radar-sweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#19D4E5" stopOpacity="0" />
              <stop offset="1" stopColor="#19D4E5" stopOpacity="0.28" />
            </linearGradient>
          </defs>
          <circle r="0.98" fill="url(#radar-bg)" />
          {(Object.keys(rings) as Horizon[]).map((h) => (
            <circle key={h} r={rings[h].r + 0.1} fill="none" stroke="#94A3B8" strokeOpacity="0.14" strokeWidth="0.004" />
          ))}
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1={-Math.cos((a * Math.PI) / 180) * 0.98}
              y1={-Math.sin((a * Math.PI) / 180) * 0.98}
              x2={Math.cos((a * Math.PI) / 180) * 0.98}
              y2={Math.sin((a * Math.PI) / 180) * 0.98}
              stroke="#94A3B8"
              strokeOpacity="0.07"
              strokeWidth="0.004"
            />
          ))}
          <g className="origin-center animate-spin-slow [animation-duration:10s]">
            <path d="M0 0 L0.98 0 A0.98 0.98 0 0 0 0.85 -0.49 Z" fill="url(#radar-sweep)" />
          </g>
          {(Object.keys(rings) as Horizon[]).map((h) => (
            <text key={h} x="0.012" y={-(rings[h].r + 0.1) + 0.045} fill="#94A3B8" fontSize="0.035" letterSpacing="0.008" className="font-mono">
              {h.toUpperCase()}
            </text>
          ))}
          <circle r="0.025" fill="#E6FCFF" />
        </svg>

        {topics.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180;
          const r = rings[t.horizon].r;
          const left = 50 + Math.cos(rad) * r * 50;
          const top = 50 + Math.sin(rad) * r * 50;
          const isActive = i === active;
          return (
            <button
              key={t.name}
              type="button"
              onClick={() => setActive(i)}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={isActive}
              aria-label={`${t.name} — ${t.horizon}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span className="relative block h-3.5 w-3.5">
                <span
                  className={cn("absolute inset-0 rounded-full transition-transform duration-300", isActive ? "scale-[2.6] opacity-30" : "scale-100 opacity-0 group-hover:scale-[2] group-hover:opacity-20")}
                  style={{ background: rings[t.horizon].color }}
                />
                <span
                  className="absolute inset-0 rounded-full border-2 border-ink-950"
                  style={{ background: rings[t.horizon].color, boxShadow: isActive ? `0 0 18px ${rings[t.horizon].color}` : "none" }}
                />
              </span>
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors sm:block",
                  isActive ? "text-fg" : "text-muted/80",
                )}
              >
                {t.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div className="lg:col-span-5">
        <div className="panel relative min-h-[15rem] overflow-hidden rounded-3xl p-7 sm:p-9" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={topic.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em]"
                style={{ borderColor: `${rings[topic.horizon].color}66`, color: rings[topic.horizon].color }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: rings[topic.horizon].color }} />
                Horizon: {topic.horizon}
              </span>
              <h3 className="mt-6 text-3xl font-semibold text-fg">{topic.name}</h3>
              <p className="mt-4 text-lg leading-relaxed text-muted">{topic.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="All technology topics">
          {topics.map((t, i) => (
            <li key={t.name}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors",
                  i === active ? "border-aqua/50 bg-aqua/10 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {t.name}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          An illustrative view of the technology horizons we follow. It is not a ranking, forecast, or endorsement of any
          vendor or product.
        </p>
      </div>
    </div>
  );
}
