"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import heroImage from "../../../../public/images/davinci-data-flow.gif";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Hero: the supplied DaVinci data-flow image. */
export function HeroVisual({ play }: { play: boolean }) {
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(8_123_238/0.22),transparent)] blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={play ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
      >
        <div className="overflow-hidden rounded-[22px] border-0 border-deep/[0.08] bg-night shadow-float">
          {/* Animated GIF: served as-is (the optimizer would drop the animation). */}
          <Image
            src={heroImage}
            alt="A laptop showing drone data, survey data, GIS data and CAD files flowing as light into a 3D point-cloud terrain model, next to a surveying total station."
            priority
            unoptimized
            sizes="(min-width: 1024px) 560px, 100vw"
            className="block h-auto w-full"
          />
        </div>
      </motion.div>

      {/* Floating annotation chips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 1.6, duration: 0.8, ease: EASE }}
        className="absolute -bottom-8 -left-4 hidden items-center gap-3 rounded-2xl border border-deep/[0.06] bg-white px-4 py-3 shadow-float sm:flex lg:-left-10"
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
        transition={{ delay: 1.8, duration: 0.8, ease: EASE }}
        className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-electric/20 bg-white px-3.5 py-2 shadow-soft sm:flex lg:-right-6"
      >
        <span className="size-1.5 rounded-full bg-electric motion-safe:animate-pulse-soft" />
        <span className="font-mono text-[10.5px] font-medium tracking-wide text-deep">Concept visualization</span>
      </motion.div>
    </div>
  );
}
