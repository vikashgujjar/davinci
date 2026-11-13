"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    title: "Input Survey Data",
    body: "Survey information enters the DaVinci workflow.",
    art: (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="8" y={10 + i * 15} width="104" height="11" rx="3" fill={i === 1 ? "#eaf2ff" : "#f7f8fc"} />
            <rect x="14" y={14 + i * 15} width="22" height="3" rx="1.5" fill="#17104f" fillOpacity="0.55" />
            <rect x="44" y={14 + i * 15} width="28" height="3" rx="1.5" fill="#64748b" fillOpacity="0.4" />
            <rect x="80" y={14 + i * 15} width="24" height="3" rx="1.5" fill="#64748b" fillOpacity="0.4" />
          </g>
        ))}
      </g>
    ),
  },
  {
    title: "AI Processing",
    body: "DaVinci processes the information through its intelligent drafting workflow.",
    art: (
      <g transform="translate(60 37)">
        <circle r="28" fill="none" stroke="#087bee" strokeOpacity="0.3" strokeDasharray="2 4" />
        <rect x="-15" y="-15" width="30" height="30" rx="6" fill="#17104f" />
        {[-8, 0, 8].map((o) => (
          <g key={o} stroke="#17104f" strokeOpacity="0.4">
            <line x1={o} y1="-15" x2={o} y2="-22" />
            <line x1={o} y1="15" x2={o} y2="22" />
            <line x1="-15" y1={o} x2="-22" y2={o} />
            <line x1="15" y1={o} x2="22" y2={o} />
          </g>
        ))}
        <circle r="5" fill="#087bee" />
      </g>
    ),
  },
  {
    title: "Automated Drafting",
    body: "The system helps transform processed information into organized drafting outputs.",
    art: (
      <g>
        <path d="M20 18 L92 10 L104 56 L36 66 Z" fill="#087bee" fillOpacity="0.06" stroke="#17104f" strokeWidth="1.4" strokeLinejoin="round" strokeDasharray="200" className="motion-safe:animate-[draw_3s_ease-in-out_infinite_alternate]" />
        {[
          [20, 18],
          [92, 10],
          [104, 56],
          [36, 66],
        ].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="2.5" fill="#fff" stroke="#087bee" strokeWidth="1.4" />
        ))}
        <path d="M30 40 q 15 -12 30 0 t 30 0" fill="none" stroke="#087bee" strokeOpacity="0.4" />
      </g>
    ),
  },
  {
    title: "Ready Deliverables",
    body: "Survey professionals receive structured drafting deliverables for their workflow.",
    art: (
      <g>
        <rect x="26" y="6" width="62" height="64" rx="4" fill="#fff" stroke="#17104f" strokeOpacity="0.15" transform="rotate(-6 57 38)" />
        <rect x="32" y="8" width="62" height="64" rx="4" fill="#fff" stroke="#17104f" strokeOpacity="0.2" />
        <path d="M40 22 L70 18 L78 42 L46 48 Z" fill="none" stroke="#17104f" strokeWidth="1.2" />
        <rect x="40" y="56" width="30" height="4" rx="2" fill="#17104f" fillOpacity="0.25" />
        <circle cx="92" cy="60" r="11" fill="#087bee" />
        <path d="M87 60 l3.5 3.5 l6 -7" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const progress = useTransform(smooth, (v) => (reduce ? 1 : v));

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-y relative isolate overflow-hidden bg-white">
      <TopographicBackground className="-z-10 opacity-80" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-transparent to-white" />

      <div className="container-x">
        <SectionHeading
          id="how-title"
          index="04"
          eyebrow="How It Works"
          title={"From Survey Information\nto Drafting Deliverables."}
          highlight={["Drafting", "Deliverables"]}
          description="A clear, four-stage workflow. Survey information goes in; organized drafting deliverables come out."
        />

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* Track — horizontal on desktop */}
          <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-deep/10 lg:block">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-electric to-deep shadow-[0_0_10px_rgb(8_123_238/0.6)]" />
          </div>
          {/* Track — vertical on mobile/tablet */}
          <div aria-hidden className="absolute bottom-0 left-[27px] top-0 w-px bg-deep/10 lg:hidden">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-gradient-to-b from-electric to-deep" />
          </div>

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <Step key={s.title} index={i} title={s.title} body={s.body} art={s.art} progress={progress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  title,
  body,
  art,
  progress,
}: {
  index: number;
  title: string;
  body: string;
  art: React.ReactNode;
  progress: MotionValue<number>;
}) {
  const threshold = index / 4 + 0.04;
  const lit = useTransform(progress, [threshold - 0.04, threshold], [0, 1]);
  const ring = useTransform(lit, [0, 1], ["rgb(23 16 79 / 0.12)", "rgb(8 123 238 / 1)"]);
  const glow = useTransform(lit, [0, 1], ["0 0 0 0 rgb(8 123 238 / 0)", "0 0 0 8px rgb(8 123 238 / 0.12)"]);

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.08 }}
      className="group relative grid grid-cols-[56px_1fr] gap-6 lg:block"
    >
      <motion.span
        style={{ borderColor: ring, boxShadow: glow }}
        className="relative z-10 flex size-14 items-center justify-center rounded-full border-2 bg-white font-mono text-sm font-semibold text-deep"
      >
        <span>0{index + 1}</span>
        <motion.span style={{ opacity: lit }} className="absolute inset-1 flex items-center justify-center rounded-full bg-electric text-white">
          0{index + 1}
        </motion.span>
      </motion.span>

      <div className="lg:mt-8">
        <div className="relative overflow-hidden rounded-2xl border border-deep/[0.07] bg-white/80 p-3 backdrop-blur transition-all duration-500 group-hover:-translate-y-1 group-hover:border-electric/30 group-hover:shadow-float">
          <svg viewBox="0 0 120 76" className="h-24 w-full" aria-hidden>
            {art}
          </svg>
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-electric">Step 0{index + 1}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-deep">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
      </div>
    </motion.li>
  );
}
