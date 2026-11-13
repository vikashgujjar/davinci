import { Cpu, Repeat, Workflow, Zap } from "lucide-react";
import { AINetworkBackground } from "@/components/backgrounds/AINetworkBackground";
import { RevealItem, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EngineVisual } from "./EngineVisual";

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

        <div className="relative mx-auto mt-16 max-w-6xl md:mt-20">
          <EngineVisual />
        </div>

        <Stagger as="ul" className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-deep/[0.07] bg-deep/[0.07] sm:grid-cols-2 lg:grid-cols-4">
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
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-electric to-deep transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100" />
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
