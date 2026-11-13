import { Check, Minus } from "lucide-react";
import { AINetworkBackground } from "@/components/backgrounds/AINetworkBackground";
import { RevealItem, Reveal, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const rows = [
  { topic: "Drafting effort", traditional: "More manual drafting work", davinci: "AI-powered drafting assistance" },
  { topic: "Production time", traditional: "Longer production time", davinci: "Approximately 7-minute target workflow" },
  { topic: "Overhead", traditional: "Higher drafting overhead", davinci: "Potential cost savings of up to 75%" },
  { topic: "Manual tasks", traditional: "Greater reliance on repetitive manual tasks", davinci: "Reduced manual intervention" },
];

export function ComparisonSection() {
  return (
    <section id="comparison" aria-labelledby="comparison-title" className="section-y relative isolate overflow-hidden bg-white">
      <div className="container-x">
        <SectionHeading
          id="comparison-title"
          index="06"
          eyebrow="The Comparison"
          title={"A Smarter Alternative\nto Traditional Drafting."}
          highlight={["Smarter"]}
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2 lg:gap-0">
          {/* Traditional */}
          <Reveal className="relative rounded-[28px] border border-deep/[0.08] bg-mist p-8 sm:p-10 lg:rounded-r-none lg:border-r-0 lg:pr-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Traditional workflow</p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-deep/60">Manual drafting</h3>
            <Stagger as="ul" className="mt-10 divide-y divide-deep/[0.07]">
              {rows.map((r) => (
                <RevealItem as="li" key={r.topic} className="flex gap-4 py-5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-deep/15 text-deep/40">
                    <Minus className="size-3.5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-deep/35">{r.topic}</p>
                    <p className="mt-1 text-[15px] text-muted">{r.traditional}</p>
                  </div>
                </RevealItem>
              ))}
            </Stagger>
          </Reveal>

          {/* DaVinci — prominent */}
          <Reveal delay={0.12} className="relative isolate overflow-hidden rounded-[28px] bg-deep p-8 text-white shadow-[0_40px_80px_-30px_rgb(23_16_79/0.6)] ring-1 ring-electric/30 sm:p-10 lg:-my-6 lg:pl-14 lg:pt-16">
            <AINetworkBackground tone="dark" count={26} seed={18} className="-z-10 opacity-60" />
            <div aria-hidden className="absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-electric/40 blur-[90px]" />
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-electric-300">DaVinci-assisted workflow</p>
              <span className="rounded-full bg-electric px-3 py-1 text-[11px] font-semibold">Recommended</span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">Intelligent drafting</h3>
            <Stagger as="ul" className="mt-10 divide-y divide-white/10">
              {rows.map((r) => (
                <RevealItem as="li" key={r.topic} className="flex gap-4 py-5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-electric shadow-[0_0_14px_rgb(8_123_238/0.8)]">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{r.topic}</p>
                    <p className="mt-1 text-[15px] font-medium">{r.davinci}</p>
                  </div>
                </RevealItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
        <p className="mt-10 text-xs text-muted">Time and cost figures are company-provided targets; actual results depend on each project and workflow.</p>
      </div>
    </section>
  );
}
