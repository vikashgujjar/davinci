import { AINetworkBackground } from "@/components/backgrounds/AINetworkBackground";
import { Laptop } from "@/components/graphics/Devices";
import { PointCloudBackdrop } from "@/components/graphics/PointCloudBackdrop";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShowcaseScreen } from "./ShowcaseScreen";

export function ProductShowcase() {
  return (
    <section id="showcase" aria-labelledby="showcase-title" className="relative isolate overflow-hidden bg-night pb-28 pt-24 text-white md:pb-36 md:pt-32">
      <AINetworkBackground tone="dark" className="-z-10 opacity-50" seed={12} />
      <PointCloudBackdrop id="showcase-bg" seed={7} className="-z-10 h-[45%] opacity-60" />
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-electric/25 blur-[160px]" />

      <div className="container-x">
        <SectionHeading
          id="showcase-title"
          tone="dark"
          align="center"
          index="05"
          eyebrow="Product · Technology"
          title={"Advanced Intelligence.\nSimplified Drafting."}
          highlight={["Simplified", "Drafting"]}
          description="A look at the concept behind the DaVinci experience — survey data, AI processing and drafting output brought together in a single, focused workspace."
        />

        <div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          {/* Floating panels (desktop) */}
          <Parallax offset={30} className="z-20 hidden lg:block">
            <div className="absolute -left-24 top-[46%] w-60 rounded-2xl border border-deep/[0.06] bg-white p-4 text-deep shadow-float">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric">Workflow time</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-3xl font-semibold tracking-tight">~7</span>
                <span className="pb-1 text-sm text-muted">min target</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sky">
                <div className="h-full w-[12%] rounded-full bg-electric" />
              </div>
              <p className="mt-2 text-[11px] text-muted">vs. ~60 min traditional workflow</p>
            </div>
          </Parallax>
          <Parallax offset={-40} className="z-20 hidden lg:block">
            <div className="absolute -bottom-10 -right-20 w-64 rounded-2xl border border-deep/[0.06] bg-white p-4 text-deep shadow-float">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric">Output preview</p>
                <span className="rounded-full bg-sky px-2 py-0.5 text-[10px] font-medium text-electric">Draft</span>
              </div>
              <svg viewBox="0 0 220 120" className="mt-3 w-full rounded-lg border border-deep/[0.06] bg-mist" aria-hidden>
                <path d="M30 26 L160 16 L176 92 L52 104 Z" fill="#087bee" fillOpacity="0.06" stroke="#17104f" strokeWidth="1.4" />
                <path d="M60 60 q20 -18 40 0 t40 0" fill="none" stroke="#087bee" strokeOpacity="0.5" />
                <path d="M70 76 q20 -14 40 0 t30 0" fill="none" stroke="#087bee" strokeOpacity="0.35" />
                <line x1="186" y1="10" x2="186" y2="110" stroke="#17104f" strokeOpacity="0.1" />
                <rect x="192" y="16" width="20" height="4" rx="2" fill="#17104f" fillOpacity="0.5" />
                <rect x="192" y="26" width="14" height="3" rx="1.5" fill="#17104f" fillOpacity="0.2" />
              </svg>
            </div>
          </Parallax>

          <Reveal className="relative">
            <Laptop>
              <ShowcaseScreen />
            </Laptop>
          </Reveal>

          <p className="mt-10 text-center text-xs text-white/45">
            Conceptual interface shown for illustration only, using sample data. Final product features and design may differ.
          </p>
        </div>
      </div>
    </section>
  );
}
