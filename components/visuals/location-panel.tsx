import { cn } from "@/lib/utils";

/** Coordinates "instrument" panel for Dubai — factual geography rendered as a technical readout. */
export function LocationPanel({ className }: { className?: string }) {
  return (
    <figure className={cn("panel noise relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-3xl", className)}>
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/20 blur-[90px]" />
      <svg aria-hidden viewBox="0 0 400 400" fill="none" className="absolute inset-0 h-full w-full">
        {[40, 80, 120, 160].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} stroke="#94A3B8" strokeOpacity={0.16 - r / 2000} strokeDasharray={r % 80 ? "2 6" : undefined} />
        ))}
        <path d="M200 20V380M20 200H380" stroke="#94A3B8" strokeOpacity="0.12" />
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const r1 = i % 3 === 0 ? 168 : 173;
          return (
            <line
              key={i}
              x1={Math.round((200 + Math.cos(a) * r1) * 100) / 100}
              y1={Math.round((200 + Math.sin(a) * r1) * 100) / 100}
              x2={Math.round((200 + Math.cos(a) * 180) * 100) / 100}
              y2={Math.round((200 + Math.sin(a) * 180) * 100) / 100}
              stroke="#94A3B8"
              strokeOpacity="0.3"
            />
          );
        })}
        <g className="origin-center animate-spin-slow [animation-duration:16s]">
          <path d="M200 200 L360 200 A160 160 0 0 0 338.6 120 Z" fill="#19D4E5" fillOpacity="0.08" />
          <line x1="200" y1="200" x2="360" y2="200" stroke="#19D4E5" strokeOpacity="0.5" />
        </g>
        <circle cx="200" cy="200" r="22" fill="#19D4E5" fillOpacity="0.12" className="animate-pulse-soft" />
        <circle cx="200" cy="200" r="6" fill="#E6FCFF" />
      </svg>

      <div className="absolute left-6 top-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted sm:left-8 sm:top-8">
        Headquarters
      </div>
      <div className="absolute right-6 top-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-aqua sm:right-8 sm:top-8">
        UTC+4
      </div>
      <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 sm:inset-x-8 sm:bottom-8">
        <div>
          <p className="font-display text-2xl font-semibold text-fg sm:text-3xl">Dubai</p>
          <p className="text-sm text-muted">United Arab Emirates</p>
        </div>
        <p className="text-right font-mono text-xs leading-relaxed text-muted sm:text-sm">
          25.2048° N
          <br />
          55.2708° E
        </p>
      </figcaption>
    </figure>
  );
}
