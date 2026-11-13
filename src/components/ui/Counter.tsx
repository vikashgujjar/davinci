"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;
};

/**
 * Counts up when scrolled into view. The final value is server-rendered so
 * the number is correct without JS and for assistive tech.
 */
export function Counter({ to, from = 0, duration = 1.6, prefix = "", suffix = "", className, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    el.textContent = `${prefix}${from}${suffix}`;
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration, prefix, suffix, delay]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {`${prefix}${to}${suffix}`}
    </span>
  );
}
