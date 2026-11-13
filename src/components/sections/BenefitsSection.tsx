import { Crosshair, PiggyBank, Timer } from "lucide-react";
import { DigitalTerrainBackground } from "@/components/backgrounds/DigitalTerrainBackground";
import { SurveyGridBackground } from "@/components/backgrounds/SurveyGridBackground";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BenefitsSection() {
  return (
    <section id="benefits" aria-labelledby="benefits-title" className="section-y relative isolate overflow-hidden bg-mist">
      <SurveyGridBackground className="-z-10" />

      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
          id="benefits-title"
            index="03"
            eyebrow="Business Impact"
            title={"Less Manual Work.\nMore Measurable Impact."}
            highlight={["Measurable", "Impact"]}
          />
          <Reveal className="max-w-sm text-[15px] leading-relaxed text-muted lg:pb-2">
            Three outcomes that matter to every surveying practice: lower cost, faster turnaround and more consistent deliverables.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          {/* 75% — dominant */}
          <Reveal className="group relative isolate overflow-hidden rounded-[28px] bg-deep p-8 text-white sm:p-12 lg:col-span-7 lg:row-span-2">
            <DigitalTerrainBackground className="-z-10 h-2/3 opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-electric/40 blur-[100px]" />
            <div className="flex items-center gap-3 text-electric-300">
              <PiggyBank className="size-5" strokeWidth={1.75} aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]">Benefit 01 · Cost savings</span>
            </div>
            <p className="mt-10 font-display text-[clamp(6rem,17vw,13rem)] font-semibold leading-[0.85] tracking-[-0.06em]">
              <Counter to={75} suffix="" className="text-gradient-light" />
              <span className="text-electric">%</span>
            </p>
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Cost Savings</h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
              Reduce drafting overhead by up to 75% through a more efficient and automated drafting workflow.
            </p>
            <div className="mt-10 max-w-md" aria-hidden>
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-white/45">
                <span>Drafting overhead</span>
                <span>up to −75%</span>
              </div>
              <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/4 rounded-full bg-electric shadow-[0_0_14px_rgb(8_123_238/0.9)]" />
                <div className="h-full flex-1 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.14)_0_4px,transparent_4px_9px)]" />
              </div>
            </div>
          </Reveal>

          {/* 1 hr → 7 min */}
          <Reveal delay={0.1} className="group relative overflow-hidden rounded-[28px] border border-deep/[0.07] bg-white p-8 transition-shadow duration-500 hover:shadow-float sm:p-10 lg:col-span-5">
            <div className="flex items-center gap-3 text-electric">
              <Timer className="size-5" strokeWidth={1.75} aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]">Benefit 02 · Speed</span>
            </div>
            <p className="mt-8 flex items-baseline gap-3 font-display font-semibold tracking-[-0.04em] text-deep">
              <span className="text-4xl text-deep/30 line-through decoration-electric/60 decoration-2 sm:text-5xl">1 hr</span>
              <span className="text-3xl text-electric">→</span>
              <span className="text-7xl sm:text-8xl">
                <Counter to={7} from={60} duration={1.8} />
              </span>
              <span className="text-2xl text-muted">min</span>
            </p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-deep">1 Hour to 7 Minutes</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Turn an approximately one-hour survey drafting process into a workflow that takes around seven minutes.
            </p>
          </Reveal>

          {/* Accuracy */}
          <Reveal delay={0.2} className="group relative overflow-hidden rounded-[28px] border border-deep/[0.07] bg-white p-8 transition-shadow duration-500 hover:shadow-float sm:p-10 lg:col-span-5">
            <svg aria-hidden viewBox="0 0 200 200" className="absolute -right-10 -top-10 size-56 text-electric transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:rotate-45 group-hover:scale-105" fill="none" stroke="currentColor">
              <circle cx="100" cy="100" r="90" strokeOpacity="0.12" />
              <circle cx="100" cy="100" r="66" strokeOpacity="0.18" strokeDasharray="2 5" />
              <circle cx="100" cy="100" r="42" strokeOpacity="0.25" />
              <circle cx="100" cy="100" r="18" strokeOpacity="0.4" />
              <circle cx="100" cy="100" r="3" fill="currentColor" />
              <path d="M100 0v70M100 130v70M0 100h70M130 100h70" strokeOpacity="0.25" />
            </svg>
            <div className="relative flex items-center gap-3 text-electric">
              <Crosshair className="size-5" strokeWidth={1.75} aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]">Benefit 03 · Accuracy</span>
            </div>
            <h3 className="relative mt-8 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-deep sm:text-5xl">
              Improved
              <br />
              <span className="text-gradient">Accuracy</span>
            </h3>
            <p className="relative mt-5 text-[15px] leading-relaxed text-muted">
              Reduce manual intervention and minimize human-related drafting inconsistencies.
            </p>
          </Reveal>
        </div>

        <p className="mt-6 text-xs text-muted">Figures are company-provided product performance targets. Individual results may vary by project.</p>
      </div>
    </section>
  );
}
