"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Lock page scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled || open
              ? "border-line bg-ink-950/70 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        >
          <nav
            aria-label="Main"
            className={cn(
              "mx-auto flex w-full max-w-7xl items-center justify-between px-5 transition-[height] duration-500 sm:px-6 lg:px-8",
              scrolled ? "h-16" : "h-20",
            )}
          >
            <Link href="/" aria-label={`${site.name} — home`} className="relative z-10 rounded-lg" onClick={() => setOpen(false)}>
              <Logo id="nav" />
            </Link>

            <ul className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.02] p-1 backdrop-blur-md lg:flex">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                        active ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-white/[0.07] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <ButtonLink href="/contact" size="md" magnetic className="hidden sm:inline-flex">
                Get in Touch
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </ButtonLink>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white/[0.03] text-fg lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-40 overflow-y-auto bg-ink-950/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-electric/20 blur-3xl" />
            <div className="relative flex min-h-full flex-col px-5 pb-10 pt-28 sm:px-6">
              <ul className="flex flex-col">
                {mainNav.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.06 }}
                      className="border-b border-line"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="flex items-center justify-between py-5 font-display text-3xl font-medium tracking-tight"
                      >
                        <span className={active ? "text-accent" : "text-fg"}>{item.label}</span>
                        <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                className="mt-auto pt-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              >
                <ButtonLink href="/contact" size="lg" className="w-full" onClick={() => setOpen(false)}>
                  Get in Touch <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                <p className="mt-6 text-center text-sm text-muted">{site.location.display}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
