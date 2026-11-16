"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SurveyGridBackground } from "@/components/backgrounds/SurveyGridBackground";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { useIntro } from "@/components/providers/IntroProvider";
import { buttonClass } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Parallax } from "@/components/ui/Parallax";
import { HeroVisual } from "./HeroVisual";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const word = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.95, ease: EASE } },
};

const LINES: { text: string; accent?: boolean }[][] = [
  [{ text: "Survey" }, { text: "Drafting." }],
  [{ text: "Reimagined" }, { text: "by" }, { text: "AI.", accent: true }],
];

export function HeroSection() {
  const { done } = useIntro();
  const state = done ? "show" : "hidden";

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-white pb-24 pt-28 md:pb-32 md:pt-32">
      {/* Background system */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_80%_20%,#eaf2ff_0%,transparent_60%),radial-gradient(50%_50%_at_0%_100%,#f7f8fc_0%,transparent_70%)]" />
      <SurveyGridBackground className="-z-10" />
      <Parallax offset={60} className="-z-10">
        <TopographicBackground density="high" />
      </Parallax>

      {/* Brand quote */}
      <motion.figure
        initial={{ opacity: 0, y: -12 }}
        animate={done ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="container-x mb-10 flex flex-col items-center text-center md:mb-12"
      >
        <blockquote className="font-display text-[15px] font-medium leading-snug tracking-tight text-deep/80 md:text-lg">
          <span className="sm:block">
            <span aria-hidden className="mr-0.5 text-electric">&ldquo;</span>
            The future of innovation begins when <span className="text-gradient font-semibold">imagination</span>{" "}
          </span>
          <span className="sm:block">
            refuses to accept limitations.
            <span aria-hidden className="ml-0.5 text-electric">&rdquo;</span>
          </span>
        </blockquote>
        <figcaption className="mt-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-electric">
          <span aria-hidden className="h-px w-8 bg-electric/60" />
          Leonardo da Vinci
          <span aria-hidden className="h-px w-8 bg-electric/60" />
        </figcaption>
      </motion.figure>

      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
        <motion.div initial="hidden" animate={state} variants={container}>
          <motion.p variants={item} className="inline-flex items-center gap-2.5 rounded-full border border-electric/20 bg-white/70 py-1.5 pl-1.5 pr-4 text-[12.5px] font-medium text-deep backdrop-blur">
            <span className="rounded-full bg-electric px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-white">AI</span>
            The future of survey drafting is intelligent
          </motion.p>

          <h1 id="hero-title" className="mt-7 text-[clamp(2.6rem,4.5vw,4.1rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-deep" aria-label="Survey Drafting. Reimagined by AI.">
            {LINES.map((line, li) => (
              <span key={li} className="block" aria-hidden>
                {line.map((w, wi) => (
                  <span key={wi} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span variants={word} className={`inline-block ${w.accent ? "text-gradient" : ""}`}>
                      {w.text}
                      {wi < line.length - 1 ? " " : ""}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p variants={item} className="mt-7 max-w-xl font-display text-lg font-medium leading-snug text-deep/90 md:text-xl">
            Transform survey data into professional drafting deliverables — in minutes, not hours.
          </motion.p>
          <motion.p variants={item} className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted">
            DaVinci combines artificial intelligence with surveying workflows to automate repetitive drafting tasks, reduce operational costs and help surveying professionals deliver projects faster.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={buttonClass("primary", "lg")}>
              Book a Demo
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a href="#technology" className={buttonClass("secondary", "lg")}>
              Explore the Technology
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </a>
          </motion.div>

          {/* Highlight statistics */}
          <motion.dl variants={item} className="mt-14 grid max-w-xl grid-cols-3 border-t border-deep/10 pt-7">
            <Stat label="Potential drafting cost savings">
              <Counter to={75} suffix="%" />
            </Stat>
            <Stat label="Average target drafting time" divider>
              <Counter to={7} /> <span className="text-[0.55em] font-medium text-muted">min</span>
            </Stat>
            <Stat label="Faster survey drafting" divider>
              <span className="whitespace-nowrap">
                1h <span className="text-electric">→</span> 7m
              </span>
            </Stat>
          </motion.dl>
        </motion.div>

        <div className="relative lg:pl-4">
          <HeroVisual play={done} />
        </div>
      </div>

      {/* bottom fade into next section */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}

function Stat({ label, children, divider }: { label: string; children: React.ReactNode; divider?: boolean }) {
  return (
    <div className={`flex flex-col-reverse gap-1.5 ${divider ? "border-l border-deep/10 pl-4 sm:pl-6" : "pr-4"}`}>
      <dt className="text-[11.5px] leading-snug text-muted sm:text-xs">{label}</dt>
      <dd className="font-display text-2xl font-semibold tracking-tight text-deep sm:text-[2rem]">{children}</dd>
    </div>
  );
}
