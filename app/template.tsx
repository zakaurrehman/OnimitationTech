"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

// The first render (server HTML + hydration) is never hidden; only subsequent
// client-side navigations animate in.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasMounted;
  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
