"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Moves its children vertically at a different rate than the scroll. */
export function Parallax({ children, offset = 80, className = "" }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-offset, offset]);
  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
