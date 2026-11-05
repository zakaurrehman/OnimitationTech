import { cn } from "@/lib/utils";

/** Brand mark: an open orbit ("O") around a core, with a signal node escaping the ring. */
export function LogoMark({ className, id = "lm" }: { className?: string; id?: string }) {
  const g = `${id}-grad`;
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("h-9 w-9", className)}>
      <defs>
        <linearGradient id={g} x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3478F6" />
          <stop offset="0.55" stopColor="#19D4E5" />
          <stop offset="1" stopColor="#9275FF" />
        </linearGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="15"
        stroke={`url(#${g})`}
        strokeWidth="3"
        strokeDasharray="80 14.25"
        strokeLinecap="round"
        transform="rotate(-18 20 20)"
      />
      <path d="M20 20 28.4 11.6" stroke={`url(#${g})`} strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      <circle cx="20" cy="20" r="4.6" fill={`url(#${g})`} />
      <circle cx="30.6" cy="9.4" r="2.6" fill="#19D4E5" />
    </svg>
  );
}

export function Logo({ className, id }: { className?: string; id?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark id={id} />
      <span className="font-display text-[1.15rem] font-semibold leading-none tracking-tight text-fg">
        Onimitation<span className="font-normal text-muted"> Tech</span>
      </span>
    </span>
  );
}
