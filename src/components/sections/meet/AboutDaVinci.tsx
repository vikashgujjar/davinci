import { Cpu, Repeat, Workflow, Zap } from "lucide-react";
import { AINetworkBackground } from "@/components/backgrounds/AINetworkBackground";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealItem, Stagger } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

const highlights = [
  { icon: Cpu, title: "Intelligent automation", body: "AI takes on the repetitive steps of the drafting workflow." },
  { icon: Zap, title: "Faster drafting workflows", body: "Move from survey information to deliverables in minutes." },
  { icon: Repeat, title: "Reduced repetitive work", body: "Less manual effort spent on the same tasks, project after project." },
  { icon: Workflow, title: "Consistent drafting processes", body: "A structured workflow that produces organized, uniform outputs." },
];

export function AboutDaVinci() {
  return (
    <section id="technology" aria-labelledby="technology-title" className="section-y relative isolate overflow-hidden bg-white">
      <AINetworkBackground className="-z-10 opacity-80 mask-radial" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-mist to-transparent" />

      <div className="container-x">
        <SectionHeading
          id="technology-title"
          align="center"
          index="02"
          eyebrow="Introducing DaVinci"
          title={"Meet DaVinci.\nIntelligence Behind Every Drawing."}
          highlight={["Intelligence"]}
          description="DaVinci brings artificial intelligence into surveying workflows, helping transform survey information into organized drafting deliverables with greater speed and efficiency."
        />

        <div className="mt-16 grid items-stretch gap-5 md:mt-20 lg:grid-cols-[1.05fr_1fr]">
          {/* The engine */}
          <Reveal className="h-full">
            <Photo image={images.aiNetwork} sizes="(min-width: 1024px) 620px, 100vw" className="aspect-[4/3] h-full rounded-3xl shadow-float lg:aspect-auto lg:min-h-[420px]">
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-electric-300 motion-safe:animate-pulse-soft" />
                  DaVinci AI engine
                </span>
                <p className="mt-3 max-w-sm font-display text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                  Artificial intelligence, built into the drafting workflow.
                </p>
              </div>
            </Photo>
          </Reveal>

          {/* What it does */}
          <Stagger as="ul" className="grid gap-px overflow-hidden rounded-3xl border border-deep/[0.07] bg-deep/[0.07] sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, body }, i) => (
              <RevealItem as="li" key={title} className="group relative bg-white p-7 transition-colors duration-500 hover:bg-mist">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl border border-electric/15 bg-sky text-electric transition-all duration-500 group-hover:-rotate-6 group-hover:bg-electric group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="font-mono text-[11px] text-deep/30">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-deep">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-electric to-deep transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100"
                />
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
