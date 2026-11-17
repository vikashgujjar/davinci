"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, type SiteImage } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1] as const;
const steps: { title: string; body: string; image: SiteImage }[] = [
  { title: "Input Survey Data", body: "Survey information enters the DaVinci workflow.", image: images.gnssRover },
  { title: "AI Processing", body: "DaVinci processes the information through its intelligent drafting workflow.", image: images.aiProcessing },
  { title: "Automated Drafting", body: "The system helps transform processed information into organized drafting outputs.", image: images.laptopDrawing },
  { title: "Ready Deliverables", body: "Survey professionals receive structured drafting deliverables for their workflow.", image: images.topoMap },
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
              <Step key={s.title} index={i} title={s.title} body={s.body} image={s.image} progress={progress} />
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
  image,
  progress,
}: {
  index: number;
  title: string;
  body: string;
  image: SiteImage;
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
        <div className="overflow-hidden rounded-2xl shadow-soft transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-float">
          <Photo
            image={image}
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 80vw, 100vw"
            className="aspect-[4/3]"
            imgClassName="transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105"
          />
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-electric">Step 0{index + 1}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-deep">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
      </div>
    </motion.li>
  );
}
