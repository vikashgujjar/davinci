"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Cpu, Database } from "lucide-react";
import { contourRings } from "@/lib/geometry";
import { r2, seeded } from "@/lib/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Survey point field (deterministic)
const rand = seeded(11);
const POINTS = Array.from({ length: 26 }, (_, i) => ({
  x: r2(34 + rand() * 140),
  y: r2(64 + rand() * 170),
  code: i % 5 === 0 ? ["BM", "TP", "CP", "FL", "EP"][i / 5] : null,
}));

const TABLE = [
  ["PT 1001", "4521.33", "1290.84"],
  ["PT 1002", "4518.07", "1302.16"],
  ["PT 1003", "4509.62", "1297.40"],
  ["PT 1004", "4503.18", "1311.95"],
];

// Flows: survey points → AI core
const FLOWS = [
  "M120 92 C 190 92, 215 150, 268 165",
  "M150 150 C 200 150, 220 168, 266 170",
  "M96 214 C 180 220, 220 190, 268 178",
  "M164 120 C 210 120, 230 160, 270 168",
  "M70 180 C 160 190, 230 180, 268 174",
];
// AI core → drafting sheet
const OUT = "M340 170 C 370 170, 380 150, 420 150";

const SHEET_CONTOURS = contourRings({ cx: 500, cy: 160, rings: 5, r0: 10, step: 11, seed: 4, squash: 0.8, samples: 18 });

export function HeroVisual({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  const animateParticles = play && !reduce;

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(8_123_238/0.18),transparent)] blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={play ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        className="relative overflow-hidden rounded-[22px] border border-deep/[0.08] bg-white/90 shadow-float backdrop-blur"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-deep/[0.06] px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-deep/15" />
            <span className="size-2.5 rounded-full bg-deep/15" />
            <span className="size-2.5 rounded-full bg-electric/60" />
          </div>
          <p className="font-mono text-[10.5px] tracking-wide text-muted">davinci · drafting workspace</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky px-2.5 py-1 font-mono text-[10px] font-medium text-electric">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 rounded-full bg-electric motion-safe:animate-ping" />
              <span className="relative size-1.5 rounded-full bg-electric" />
            </span>
            Processing
          </span>
        </div>

        <svg
          viewBox="0 0 600 380"
          className="block h-auto w-full"
          role="img"
          aria-label="Conceptual illustration: survey data points flow into the DaVinci AI processing core and emerge as an organized drafting sheet."
        >
          <defs>
            <pattern id="hv-grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M16 0H0V16" fill="none" stroke="#17104f" strokeOpacity="0.05" />
            </pattern>
            <radialGradient id="hv-core" cx="0.35" cy="0.3" r="0.8">
              <stop offset="0" stopColor="#3b97f3" />
              <stop offset="0.55" stopColor="#087bee" />
              <stop offset="1" stopColor="#17104f" />
            </radialGradient>
            <linearGradient id="hv-flow" x1="0" x2="1">
              <stop offset="0" stopColor="#087bee" stopOpacity="0" />
              <stop offset="1" stopColor="#087bee" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          <rect width="600" height="380" fill="url(#hv-grid)" />

          {/* ── Stage 1: survey data ─────────────────────────────── */}
          <g fontFamily="ui-monospace, SFMono-Regular, monospace">
            <text x="24" y="34" fontSize="9" letterSpacing="1.6" fill="#087bee" fontWeight="600">
              01 · SURVEY DATA
            </text>
            <rect x="24" y="48" width="160" height="196" rx="10" fill="#f7f8fc" stroke="#17104f" strokeOpacity="0.07" />
            {POINTS.map((p, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={play ? { opacity: 1 } : undefined}
                transition={{ delay: 0.7 + i * 0.025 }}
              >
                <path d={`M${p.x - 3} ${p.y}h6M${p.x} ${p.y - 3}v6`} stroke="#17104f" strokeOpacity="0.55" strokeWidth="1" />
                {p.code && (
                  <text x={p.x + 5} y={p.y - 4} fontSize="6.5" fill="#64748b">
                    {p.code}
                  </text>
                )}
              </motion.g>
            ))}
            <g fontSize="7.5">
              {TABLE.map((row, i) => (
                <motion.g
                  key={row[0]}
                  initial={{ opacity: 0, x: -6 }}
                  animate={play ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 1 + i * 0.08, duration: 0.5 }}
                >
                  <rect x="24" y={258 + i * 22} width="160" height="18" rx="4" fill={i === 1 ? "#eaf2ff" : "transparent"} />
                  <text x="32" y={270 + i * 22} fill="#17104f" fillOpacity="0.8">
                    {row[0]}
                  </text>
                  <text x="86" y={270 + i * 22} fill="#64748b">
                    {row[1]}
                  </text>
                  <text x="134" y={270 + i * 22} fill="#64748b">
                    {row[2]}
                  </text>
                </motion.g>
              ))}
            </g>
          </g>

          {/* ── Flows in ─────────────────────────────────────────── */}
          <g fill="none">
            {FLOWS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="url(#hv-flow)"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={play ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.2, delay: 1 + i * 0.1, ease: EASE }}
              />
            ))}
          </g>
          {animateParticles &&
            FLOWS.map((d, i) => (
              <circle key={i} r="2.4" fill="#087bee">
                <animateMotion dur={`${2.2 + i * 0.35}s`} repeatCount="indefinite" path={d} begin={`${1.6 + i * 0.3}s`} />
                <animate attributeName="opacity" values="0;1;1;0" dur={`${2.2 + i * 0.35}s`} repeatCount="indefinite" begin={`${1.6 + i * 0.3}s`} />
              </circle>
            ))}

          {/* ── Stage 2: AI core ─────────────────────────────────── */}
          <g transform="translate(304 172)">
            <text x="0" y="-118" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.6" fill="#087bee" fontWeight="600">
              02 · AI PROCESSING
            </text>
            <motion.g initial={{ scale: 0.6, opacity: 0 }} animate={play ? { scale: 1, opacity: 1 } : undefined} transition={{ duration: 1, delay: 0.9, ease: EASE }}>
              <circle r="78" fill="#eaf2ff" fillOpacity="0.6" />
              <g className="origin-center motion-safe:animate-spin-slow" style={{ transformBox: "fill-box" }}>
                <circle r="66" fill="none" stroke="#087bee" strokeOpacity="0.35" strokeDasharray="2 5" />
                <circle cx="66" cy="0" r="3" fill="#087bee" />
              </g>
              <circle r="50" fill="none" stroke="#17104f" strokeOpacity="0.12" />
              <g className="origin-center motion-safe:[animation:spin_3.2s_linear_infinite]" style={{ transformBox: "fill-box" }}>
                <circle r="50" fill="none" stroke="none" />
                <path d="M-50 0A50 50 0 0 1 35.36 -35.36" fill="none" stroke="#087bee" strokeWidth="2" strokeLinecap="round" />
              </g>
              {/* hexagon */}
              <polygon points="0,-36 31.2,-18 31.2,18 0,36 -31.2,18 -31.2,-18" fill="none" stroke="#17104f" strokeOpacity="0.25" />
              <circle r="25" fill="url(#hv-core)" />
              <circle r="25" fill="none" stroke="#fff" strokeOpacity="0.4" />
              <text y="4.5" textAnchor="middle" fill="#fff" fontFamily="var(--font-sora), sans-serif" fontWeight="700" fontSize="13">
                AI
              </text>
            </motion.g>
            {/* waveform */}
            <motion.path
              d="M-60 112 q7.5 -14 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0"
              fill="none"
              stroke="#087bee"
              strokeOpacity="0.6"
              strokeWidth="1.4"
              strokeDasharray="4 4"
              className="motion-safe:animate-dash"
              initial={{ opacity: 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={{ delay: 1.4 }}
            />
            <text x="0" y="140" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fill="#64748b">
              interpreting · organizing · drafting
            </text>
          </g>

          {/* ── Flow out ─────────────────────────────────────────── */}
          <motion.path
            d={OUT}
            fill="none"
            stroke="#087bee"
            strokeWidth="1.6"
            strokeDasharray="5 5"
            className="motion-safe:animate-dash"
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 0.8 } : undefined}
            transition={{ delay: 1.6 }}
          />

          {/* ── Stage 3: drafting output ─────────────────────────── */}
          <g>
            <text x="420" y="34" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.6" fill="#087bee" fontWeight="600">
              03 · DRAFTING OUTPUT
            </text>
            <motion.g initial={{ opacity: 0, y: 12 }} animate={play ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 1.5, duration: 0.8, ease: EASE }}>
              <rect x="420" y="48" width="158" height="300" rx="6" fill="#fff" stroke="#17104f" strokeOpacity="0.14" />
              <rect x="428" y="56" width="142" height="230" fill="none" stroke="#17104f" strokeOpacity="0.1" />
              {/* contours */}
              <g fill="none" stroke="#087bee" strokeOpacity="0.28" strokeWidth="0.8">
                {SHEET_CONTOURS.map((d, i) => (
                  <motion.path key={i} d={d} initial={{ pathLength: 0 }} animate={play ? { pathLength: 1 } : undefined} transition={{ delay: 2 + i * 0.12, duration: 1.4, ease: EASE }} />
                ))}
              </g>
              {/* parcel boundary */}
              <motion.path
                d="M446 94 L548 82 L560 214 L470 236 L440 176 Z"
                fill="#087bee"
                fillOpacity="0.04"
                stroke="#17104f"
                strokeWidth="1.6"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={play ? { pathLength: 1 } : undefined}
                transition={{ delay: 1.8, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
              />
              {[
                [446, 94],
                [548, 82],
                [560, 214],
                [470, 236],
                [440, 176],
              ].map(([x, y], i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2.6"
                  fill="#fff"
                  stroke="#087bee"
                  strokeWidth="1.4"
                  initial={{ scale: 0 }}
                  animate={play ? { scale: 1 } : undefined}
                  transition={{ delay: 2 + i * 0.3 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
              ))}
              <g fontFamily="ui-monospace, monospace" fontSize="5.8" fill="#17104f" fillOpacity="0.7">
                <text x="478" y="80" transform="rotate(-7 478 80)">
                  N 83°12&apos; E · 102.71
                </text>
                <text x="556" y="140" transform="rotate(84 556 140)">
                  S 05°10&apos; E · 132.4
                </text>
                <text x="482" y="252" transform="rotate(-14 482 252)">
                  S 76°20&apos; W · 92.6
                </text>
              </g>
              {/* north arrow */}
              <g transform="translate(554 106)" opacity="0.7">
                <path d="M0 -10 L4 4 L0 1 L-4 4 Z" fill="#17104f" />
                <text y="-13" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="#17104f">
                  N
                </text>
              </g>
              {/* title block */}
              <g>
                <line x1="428" y1="296" x2="570" y2="296" stroke="#17104f" strokeOpacity="0.14" />
                <line x1="510" y1="296" x2="510" y2="340" stroke="#17104f" strokeOpacity="0.14" />
                <rect x="436" y="306" width="60" height="5" rx="2" fill="#17104f" fillOpacity="0.7" />
                <rect x="436" y="317" width="44" height="4" rx="2" fill="#17104f" fillOpacity="0.2" />
                <rect x="436" y="327" width="52" height="4" rx="2" fill="#17104f" fillOpacity="0.2" />
                <rect x="518" y="306" width="44" height="26" rx="3" fill="#eaf2ff" />
                <text x="540" y="322" textAnchor="middle" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="#087bee" fontWeight="600">
                  DRAFT
                </text>
              </g>
              {/* scan line */}
              {animateParticles && (
                <motion.rect
                  x="421"
                  width="156"
                  height="1.5"
                  fill="#087bee"
                  initial={{ attrY: 50, opacity: 0 }}
                  animate={{ attrY: [50, 344], opacity: [0, 0.7, 0.7, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 3, repeatDelay: 1.2 }}
                />
              )}
            </motion.g>
          </g>
        </svg>

        {/* Pipeline status bar */}
        <div className="grid grid-cols-3 border-t border-deep/[0.06] text-[11px]">
          {[
            { icon: Database, label: "Data received" },
            { icon: Cpu, label: "AI processing" },
            { icon: Check, label: "Output organized" },
          ].map((s, i) => (
            <div key={s.label} className={`relative flex items-center gap-2 px-3 py-3 sm:px-4 ${i < 2 ? "border-r border-deep/[0.06]" : ""}`}>
              <s.icon className={`size-3.5 shrink-0 ${i === 2 ? "text-electric" : "text-deep/60"}`} aria-hidden />
              <span className="truncate font-medium text-deep/80">{s.label}</span>
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-electric"
                initial={{ scaleX: 0 }}
                animate={play ? { scaleX: 1 } : undefined}
                transition={{ delay: 1 + i * 0.6, duration: 0.9, ease: EASE }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating annotation chips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 2.2, duration: 0.8, ease: EASE }}
        className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border border-deep/[0.06] bg-white px-4 py-3 shadow-float sm:flex lg:-left-10"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-deep text-white">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" strokeLinecap="round" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold text-deep">~1 hr → ~7 min</p>
          <p className="text-[11px] text-muted">Target drafting workflow</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 2.4, duration: 0.8, ease: EASE }}
        className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-electric/20 bg-white px-3.5 py-2 shadow-soft sm:flex lg:-right-6"
      >
        <span className="size-1.5 rounded-full bg-electric motion-safe:animate-pulse-soft" />
        <span className="font-mono text-[10.5px] font-medium tracking-wide text-deep">Concept visualization</span>
      </motion.div>
    </div>
  );
}
