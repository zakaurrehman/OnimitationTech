"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a pointer-following border light and inner glow.
 * Pointer coordinates are written to CSS variables (no React re-renders).
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      onPointerMove={onPointerMove}
      className={cn("spotlight panel rounded-2xl", className)}
    >
      <div className="relative z-[1] h-full">{children}</div>
    </Tag>
  );
}
