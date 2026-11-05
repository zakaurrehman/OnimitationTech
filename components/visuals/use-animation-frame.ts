"use client";

import { useEffect, useRef } from "react";

/**
 * Runs `tick` every animation frame while `target` is on screen and the tab is
 * visible. When the user prefers reduced motion, renders one static frame only.
 */
export function useVisibleAnimationFrame(
  target: React.RefObject<Element | null>,
  tick: (time: number, delta: number) => void,
) {
  const tickRef = useRef(tick);
  useEffect(() => {
    tickRef.current = tick;
  });

  useEffect(() => {
    const el = target.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = false;
    let last = performance.now();
    let elapsed = 0;

    const loop = (now: number) => {
      const delta = Math.min(now - last, 64);
      last = now;
      elapsed += delta;
      tickRef.current(elapsed, delta);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      if (reduce) {
        tickRef.current(12000, 16);
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "100px" },
    );
    io.observe(el);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [target]);
}
