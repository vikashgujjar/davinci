"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { claims } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const R = 92;
const C = 2 * Math.PI * R;
const ratio = claims.davinciMinutes / claims.traditionalMinutes;

/** Dial + bar comparison of the ~60 minute vs ~7 minute drafting workflow. */
export function TimeComparison() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-sm sm:p-10"
    >
      <figcaption className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
        <span>Drafting time · per survey</span>
        <span className="text-electric-300">Approx.</span>
      </figcaption>

      <div className="mt-8 grid items-center gap-10 sm:grid-cols-[220px_1fr]">
        {/* Dial */}
        <div className="relative mx-auto size-[220px]">
          <svg viewBox="0 0 220 220" className="size-full -rotate-90" aria-hidden>
            {/* minute ticks */}
            {Array.from({ length: 60 }, (_, i) => {
              const a = (i / 60) * Math.PI * 2;
              const r1 = i % 5 === 0 ? 100 : 103;
              return (
                <line
                  key={i}
                  x1={110 + Math.cos(a) * r1}
                  y1={110 + Math.sin(a) * r1}
                  x2={110 + Math.cos(a) * 107}
                  y2={110 + Math.sin(a) * 107}
                  stroke="white"
                  strokeOpacity={i % 5 === 0 ? 0.35 : 0.12}
                />
              );
            })}
            <circle cx="110" cy="110" r={R} fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="10" />
            <motion.circle
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke="white"
              strokeOpacity="0.22"
              strokeWidth="10"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: EASE }}
            />
            <motion.circle
              cx="110"
              cy="110"
              r={R - 16}
              fill="none"
              stroke="#087bee"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * (R - 16)}
              initial={{ strokeDashoffset: 2 * Math.PI * (R - 16) }}
              whileInView={{ strokeDashoffset: 2 * Math.PI * (R - 16) * (1 - ratio) }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
              style={{ filter: "drop-shadow(0 0 8px rgb(8 123 238 / 0.8))" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-display text-5xl font-semibold tracking-tight">
              <Counter to={7} from={60} duration={2} />
              <span className="ml-1 text-lg font-medium text-white/50">min</span>
            </span>
            <span className="mt-1 text-[11px] text-white/50">target with DaVinci</span>
          </div>
        </div>

        {/* Bars */}
        <div className="space-y-8">
          <Bar label="Traditional drafting" value="~60 min" width={1} tone="muted" />
          <Bar label="DaVinci-assisted drafting" value="~7 min" width={ratio} tone="brand" />
          <p className="border-t border-white/10 pt-5 text-[13px] leading-relaxed text-white/55">
            Company-provided target: an approximately one-hour drafting workflow reduced to around seven minutes.
          </p>
        </div>
      </div>
    </motion.figure>
  );
}

function Bar({ label, value, width, tone }: { label: string; value: string; width: number; tone: "muted" | "brand" }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className={tone === "brand" ? "font-medium text-white" : "text-white/60"}>{label}</span>
        <span className={`font-display font-semibold tabular-nums ${tone === "brand" ? "text-electric-300" : "text-white/60"}`}>{value}</span>
      </div>
      <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
        {/* 5-minute graduations */}
        <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(100%/12_-_1px),rgb(255_255_255/0.12)_calc(100%/12_-_1px),rgb(255_255_255/0.12)_calc(100%/12))]" />
        <motion.div
          className={`relative h-full origin-left rounded-full ${tone === "brand" ? "bg-electric shadow-[0_0_16px_rgb(8_123_238/0.9)]" : "bg-white/25"}`}
          style={{ width: `${Math.max(width * 100, 4)}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: tone === "brand" ? 0.6 : 2, delay: tone === "brand" ? 0.8 : 0.2, ease: EASE }}
        />
      </div>
    </div>
  );
}
