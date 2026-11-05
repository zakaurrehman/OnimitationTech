import { cn } from "@/lib/utils";

/** Wireframe polyhedra that drift slowly — subtle depth cues around hero visuals. */
function Octahedron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
        <path d="M50 4 88 50 50 96 12 50Z" strokeOpacity="0.8" />
        <path d="M50 4 62 50 50 96M50 4 38 50 50 96" strokeOpacity="0.5" />
        <path d="M12 50 38 50 62 50 88 50" strokeOpacity="0.35" />
        <path d="M12 50 62 50M38 50 88 50" strokeOpacity="0.2" strokeDasharray="2 3" />
      </g>
    </svg>
  );
}

function Cube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
        <path d="M50 8 88 28 88 72 50 92 12 72 12 28Z" strokeOpacity="0.8" />
        <path d="M12 28 50 48 88 28M50 48V92" strokeOpacity="0.5" />
        <path d="M12 72 50 52 88 72M50 8V52" strokeOpacity="0.18" strokeDasharray="2 3" />
      </g>
    </svg>
  );
}

function Tetra({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
        <path d="M50 6 92 84 8 84Z" strokeOpacity="0.8" />
        <path d="M50 6 56 62 92 84M56 62 8 84" strokeOpacity="0.45" />
      </g>
    </svg>
  );
}

export function FloatingShapes({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <Octahedron className="absolute left-[6%] top-[22%] hidden h-14 w-14 animate-float text-aqua/50 md:block" />
      <Cube className="absolute bottom-[18%] left-[42%] hidden h-12 w-12 animate-float-slow text-iris/50 [animation-delay:-4s] lg:block" />
      <Tetra className="absolute right-[8%] top-[16%] h-10 w-10 animate-float text-electric/60 [animation-delay:-2s]" />
      <Octahedron className="absolute bottom-[26%] right-[4%] hidden h-9 w-9 animate-float-slow text-aqua/40 [animation-delay:-7s] sm:block" />
    </div>
  );
}
