"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-300 select-none disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_10px_40px_-10px_rgba(52,120,246,0.75)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_14px_50px_-8px_rgba(52,120,246,0.95)]",
  secondary:
    "border border-line-strong bg-white/[0.03] text-fg backdrop-blur-md hover:border-aqua/50 hover:bg-white/[0.06]",
  ghost: "text-fg hover:text-aqua",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

function Inner({ children, variant }: { children: React.ReactNode; variant: Variant }) {
  return (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.28)_45%,transparent_60%)] bg-[length:250%_100%] bg-[position:120%_0] transition-[background-position] duration-700 ease-out group-hover:bg-[position:-30%_0]"
        />
      )}
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-electric via-[#3f8cf8] to-[#2fb8e8] opacity-100"
          style={{ zIndex: -1 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );
}

/** Link styled as a button, with an optional magnetic pull towards the cursor. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  magnetic = false,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const classes = cn(base, variants[variant], sizes[size], "isolate", className);

  if (!magnetic) {
    return (
      <Link href={href} className={classes} {...rest}>
        <Inner variant={variant}>{children}</Inner>
      </Link>
    );
  }

  return (
    <Magnetic>
      <Link href={href} className={classes} {...rest}>
        <Inner variant={variant}>{children}</Inner>
      </Link>
    </Magnetic>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: { variant?: Variant; size?: Size } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], "isolate", className)} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}

/** Wraps an element and pulls it gently toward the pointer (fine pointers only). */
export function Magnetic({ children, strength = 0.28 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
