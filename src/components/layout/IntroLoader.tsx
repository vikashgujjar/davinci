"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { useIntro } from "@/components/providers/IntroProvider";

const INTRO_MS = 1500;

/**
 * Short brand intro: the logo wipes in, an electric line draws beneath it,
 * then the logo flies to its header position (shared layoutId) as the veil lifts.
 */
export function IntroLoader() {
  const { done, finish } = useIntro();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(finish, reduce ? 0 : INTRO_MS);
    return () => window.clearTimeout(t);
  }, [finish]);

  return (
    <>
      <noscript>
        <style>{`#intro-veil{display:none!important}`}</style>
      </noscript>
      {/* Reduced-motion users skip the intro entirely (applies before hydration). */}
      <style>{`@media (prefers-reduced-motion: reduce){#intro-veil{display:none!important}}`}</style>
      <AnimatePresence>
        {!done && (
          <motion.div
            id="intro-veil"
            key="veil"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
            exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }}
            aria-hidden
          >
            <div
              className="absolute inset-0 mask-radial opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(23 16 79 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(23 16 79 / 0.05) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative flex flex-col items-center">
              <motion.div layoutId="brand-logo" transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
                  animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                  transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
                >
                  <Logo height={64} priority className="w-[min(78vw,265px)]!" />
                </motion.div>
              </motion.div>
              <div className="mt-6 h-px w-[min(70vw,240px)] overflow-hidden bg-deep/10">
                <motion.div
                  className="h-full origin-left bg-electric shadow-[0_0_12px_2px_rgb(8_123_238/0.6)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
