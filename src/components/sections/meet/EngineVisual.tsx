"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contourRings } from "@/lib/geometry";
import { r2, seeded } from "@/lib/motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const CORE = { x: 550, y: 210 };

const STREAM_Y = [40, 95, 150, 210, 270, 325, 380];
const streams = STREAM_Y.map((y) => `M0 ${y} C 220 ${y}, 330 ${r2(y * 0.35 + CORE.y * 0.65)}, ${CORE.x - 92} ${CORE.y}`);

const rand = seeded(99);
const bits = STREAM_Y.flatMap((y, si) =>
  Array.from({ length: 4 }, (_, k) => ({ x: r2(30 + k * 70 + rand() * 30), y: r2(y + (rand() - 0.5) * 4), s: si }))
);

const SHEETS = [
  { y: 36, seed: 2, poly: "M28 22 L120 16 L128 70 L40 78 Z" },
  { y: 162, seed: 8, poly: "M24 30 L96 14 L132 52 L88 80 L30 70 Z" },
  { y: 288, seed: 15, poly: "M34 18 L130 26 L118 78 L26 66 Z" },
];

const outs = SHEETS.map((s) => `M${CORE.x + 92} ${CORE.y} C 720 ${CORE.y}, 740 ${s.y + 48}, 850 ${s.y + 48}`);

export function EngineVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <svg
        viewBox="0 0 1100 420"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Survey information streams into the DaVinci AI engine and emerges as organized drafting sheets."
      >
        <defs>
          <radialGradient id="ev-core" cx="0.35" cy="0.3" r="0.85">
            <stop offset="0" stopColor="#3b97f3" />
            <stop offset="0.5" stopColor="#087bee" />
            <stop offset="1" stopColor="#17104f" />
          </radialGradient>
          <linearGradient id="ev-in" x1="0" x2="1">
            <stop offset="0" stopColor="#17104f" stopOpacity="0" />
            <stop offset="1" stopColor="#17104f" stopOpacity="0.35" />
          </linearGradient>
          <filter id="ev-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* input streams */}
        <g fill="none">
          {streams.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="url(#ev-in)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: i * 0.06, ease: EASE }}
            />
          ))}
          {streams.map((d, i) => (
            <path key={`f${i}`} d={d} stroke="#087bee" strokeWidth="1.6" strokeDasharray="3 37" strokeOpacity="0.8" className="motion-safe:animate-dash" style={{ animationDelay: `${i * -0.4}s` }} />
          ))}
        </g>
        <g fontFamily="ui-monospace, monospace" fontSize="8" fill="#64748b">
          {bits.map((b, i) =>
            i % 3 === 0 ? (
              <text key={i} x={b.x} y={b.y - 6} opacity="0.7">
                {(1000 + i * 7).toString()}
              </text>
            ) : (
              <rect key={i} x={b.x} y={b.y - 2} width="4" height="4" fill="#17104f" fillOpacity="0.35" />
            )
          )}
        </g>
        <text x="0" y="12" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#087bee" fontWeight="600">
          SURVEY INFORMATION
        </text>

        {/* outputs */}
        <g fill="none" stroke="#087bee" strokeWidth="1.4">
          {outs.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 + i * 0.15, ease: EASE }}
            />
          ))}
        </g>

        {SHEETS.map((s, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.3 + i * 0.15, ease: EASE }}
          >
            <g transform={`translate(850 ${s.y})`}>
              <rect width="210" height="96" rx="8" fill="#fff" stroke="#17104f" strokeOpacity="0.1" style={{ filter: "drop-shadow(0 12px 24px rgb(23 16 79 / 0.1))" }} />
              <g fill="none" stroke="#087bee" strokeOpacity="0.25" strokeWidth="0.8">
                {contourRings({ cx: 78, cy: 48, rings: 4, r0: 8, step: 9, seed: s.seed, samples: 16 }).map((d, k) => (
                  <path key={k} d={d} />
                ))}
              </g>
              <path d={s.poly} fill="#087bee" fillOpacity="0.05" stroke="#17104f" strokeWidth="1.3" strokeLinejoin="round" />
              <line x1="150" y1="10" x2="150" y2="86" stroke="#17104f" strokeOpacity="0.1" />
              <rect x="160" y="18" width="38" height="5" rx="2" fill="#17104f" fillOpacity="0.65" />
              <rect x="160" y="30" width="28" height="4" rx="2" fill="#17104f" fillOpacity="0.18" />
              <rect x="160" y="40" width="34" height="4" rx="2" fill="#17104f" fillOpacity="0.18" />
              <rect x="160" y="64" width="38" height="18" rx="3" fill="#eaf2ff" />
              <text x="179" y="76" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="600" fill="#087bee">
                {`SHT 0${i + 1}`}
              </text>
            </g>
          </motion.g>
        ))}
        <text x="1060" y="12" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#087bee" fontWeight="600">
          DRAFTING DELIVERABLES
        </text>

        {/* core */}
        <g transform={`translate(${CORE.x} ${CORE.y})`}>
          <circle r="110" fill="#087bee" opacity="0.25" filter="url(#ev-glow)" />
          <motion.g initial={{ scale: 0.7, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }}>
            <circle r="150" fill="none" stroke="#17104f" strokeOpacity="0.06" />
            <g className="origin-center motion-safe:animate-spin-slower" style={{ transformBox: "fill-box" }}>
              <circle r="128" fill="none" stroke="#087bee" strokeOpacity="0.3" strokeDasharray="1 7" />
              {[0, 90, 180, 270].map((a) => (
                <circle key={a} cx={128 * Math.cos((a * Math.PI) / 180)} cy={128 * Math.sin((a * Math.PI) / 180)} r="3.5" fill="#087bee" />
              ))}
            </g>
            <g className="origin-center motion-safe:animate-spin-slow [animation-direction:reverse]" style={{ transformBox: "fill-box" }}>
              <circle r="106" fill="none" stroke="#17104f" strokeOpacity="0.12" />
              <path d="M-106 0A106 106 0 0 1 0 -106" fill="none" stroke="#087bee" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <polygon points="0,-88 76.2,-44 76.2,44 0,88 -76.2,44 -76.2,-44" fill="#fff" stroke="#17104f" strokeOpacity="0.1" />
            <circle r="64" fill="url(#ev-core)" />
            <circle r="64" fill="none" stroke="#fff" strokeOpacity="0.35" />
            {!reduce && (
              <circle r="64" fill="none" stroke="#fff" strokeOpacity="0.6">
                <animate attributeName="r" values="64;82" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.5;0" dur="2.6s" repeatCount="indefinite" />
              </circle>
            )}
            <text y="4" textAnchor="middle" fill="#fff" fontFamily="var(--font-sora), sans-serif" fontWeight="700" fontSize="21" letterSpacing="-0.5">
              DaVinci
            </text>
            <text y="22" textAnchor="middle" fill="#fff" fillOpacity="0.7" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="2">
              AI ENGINE
            </text>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
