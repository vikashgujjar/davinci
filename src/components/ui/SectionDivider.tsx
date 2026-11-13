"use client";

import { motion } from "framer-motion";

/** Animated survey-line divider: a line that draws itself with station ticks. */
export function SectionDivider({ tone = "light" }: { tone?: "light" | "dark" }) {
  const color = tone === "dark" ? "#6fb3f7" : "#087bee";
  return (
    <div aria-hidden className="container-x">
      <svg viewBox="0 0 1200 24" className="h-6 w-full" fill="none" preserveAspectRatio="none">
        <motion.path
          d="M0 12H1200"
          stroke={color}
          strokeOpacity="0.35"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          vectorEffect="non-scaling-stroke"
        />
        {[0, 300, 600, 900, 1200].map((x, i) => (
          <motion.path
            key={x}
            d={`M${x} 4V20`}
            stroke={color}
            strokeOpacity="0.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 * i + 0.2 }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
