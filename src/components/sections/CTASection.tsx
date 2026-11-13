import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AINetworkBackground } from "@/components/backgrounds/AINetworkBackground";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { buttonClass } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal, SplitHeading } from "@/components/ui/Reveal";

export function CTASection() {
  return (
    <section aria-labelledby="cta-title" className="relative bg-white px-3 py-3 sm:px-5 sm:py-5">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-deep text-white sm:rounded-[44px]">
        <Parallax offset={50} className="-z-10">
          <TopographicBackground tone="dark" density="high" />
        </Parallax>
        <AINetworkBackground tone="dark" count={34} seed={77} className="-z-10 opacity-50 mask-radial" />
        <div aria-hidden className="absolute -bottom-40 left-1/2 -z-10 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-electric/50 blur-[140px]" />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-electric-300/70 to-transparent" />

        {/* precision rings */}
        <svg aria-hidden viewBox="0 0 400 400" className="absolute -right-24 -top-24 -z-10 size-[420px] text-electric-300 motion-safe:animate-spin-slower" fill="none" stroke="currentColor">
          <circle cx="200" cy="200" r="190" strokeOpacity="0.12" />
          <circle cx="200" cy="200" r="150" strokeOpacity="0.18" strokeDasharray="2 8" />
          <circle cx="200" cy="200" r="110" strokeOpacity="0.12" />
          <path d="M200 0v60M200 340v60M0 200h60M340 200h60" strokeOpacity="0.25" />
        </svg>

        <div className="container-x relative py-24 text-center md:py-36">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-electric-300 backdrop-blur">
              <span className="size-1.5 rounded-full bg-electric motion-safe:animate-pulse-soft" />
              The future of survey drafting is intelligent
            </span>
          </Reveal>
          <SplitHeading
            id="cta-title"
            text={"Ready to Transform Your\nSurvey Drafting Workflow?"}
            highlight={["Transform"]}
            highlightClass="text-gradient-light"
            className="mx-auto mt-8 max-w-5xl text-headline font-semibold md:text-[clamp(2.5rem,5vw,4.4rem)]"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Discover how AI-powered automation can help your team draft faster, reduce overhead and work more efficiently.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#contact" className={buttonClass("light", "lg")}>
              Book a Personal Demo
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a href="#contact" className={buttonClass("ghost-dark", "lg")}>
              Contact Our Team
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
