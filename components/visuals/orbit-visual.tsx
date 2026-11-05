import { LogoMark } from "@/components/layout/logo";
import { ServiceIcon, serviceTone } from "@/components/service-icon";
import type { ServiceKey } from "@/lib/services";
import { cn } from "@/lib/utils";

const nodes: { key: ServiceKey; label: string; pos: string; delay: string }[] = [
  { key: "it-consulting", label: "Consult", pos: "left-[4%] top-[18%]", delay: "0s" },
  { key: "network-services", label: "Connect", pos: "right-[0%] top-[42%]", delay: "-3s" },
  { key: "ai-innovation", label: "Innovate", pos: "bottom-[6%] left-[16%]", delay: "-6s" },
];

/** Three practices orbiting the brand core — used on the Services hero. */
export function OrbitVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative mx-auto aspect-square w-full max-w-[30rem]", className)}>
      <div className="absolute inset-[14%] rounded-full bg-electric/20 blur-[80px]" />
      <svg viewBox="0 0 400 400" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="orbit-g" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#3478F6" />
            <stop offset="0.5" stopColor="#19D4E5" />
            <stop offset="1" stopColor="#9275FF" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="190" stroke="#94A3B8" strokeOpacity="0.08" />
        <circle cx="200" cy="200" r="150" stroke="#94A3B8" strokeOpacity="0.12" strokeDasharray="2 7" />
        <circle cx="200" cy="200" r="105" stroke="#94A3B8" strokeOpacity="0.1" />
        <g className="origin-center animate-spin-slow">
          <circle cx="200" cy="200" r="150" stroke="url(#orbit-g)" strokeWidth="1.5" strokeDasharray="90 852" strokeLinecap="round" />
          <circle cx="350" cy="200" r="3.5" fill="#19D4E5" />
        </g>
        <g className="origin-center animate-spin-slow [animation-direction:reverse] [animation-duration:28s]">
          <circle cx="200" cy="200" r="190" stroke="url(#orbit-g)" strokeOpacity="0.6" strokeDasharray="50 1144" strokeLinecap="round" />
          <circle cx="200" cy="10" r="2.5" fill="#9275FF" />
        </g>
        <path d="M200 200 70 105M200 200 360 210M200 200 120 340" stroke="url(#orbit-g)" strokeOpacity="0.25" strokeDasharray="3 5" />
      </svg>

      <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-ink-900/80 shadow-[0_0_60px_-10px_rgba(52,120,246,0.6)] backdrop-blur-md">
        <LogoMark id="orbit-core" className="h-14 w-14" />
      </div>

      {nodes.map((n) => {
        const tone = serviceTone[n.key];
        return (
          <div key={n.key} className={cn("absolute animate-drift", n.pos)} style={{ animationDelay: n.delay }}>
            <div className="glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
              <span className={cn("grid h-9 w-9 place-items-center rounded-xl ring-1", tone.bg, tone.ring)}>
                <ServiceIcon service={n.key} className={cn("h-4 w-4", tone.text)} />
              </span>
              <span className="font-display text-sm font-semibold text-fg">{n.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
