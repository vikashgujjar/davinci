import { BlueprintBackground } from "@/components/backgrounds/BlueprintBackground";
import { RevealItem, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimeComparison } from "./TimeComparison";

const problems = [
  {
    n: "01",
    title: "Time-Consuming Workflows",
    body: "Manual drafting processes consume valuable hours that could be spent on higher-value survey work.",
  },
  {
    n: "02",
    title: "High Operational Costs",
    body: "Traditional drafting workflows can create unnecessary overhead across every project.",
  },
  {
    n: "03",
    title: "Manual Errors",
    body: "Repeated manual intervention can introduce inconsistencies and errors into deliverables.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="section-y relative isolate overflow-hidden bg-night text-white">
      <BlueprintBackground className="-z-10" />
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[520px] rounded-full bg-electric/20 blur-[140px]" />

      <div className="container-x">
        <SectionHeading
          id="problem-title"
          tone="dark"
          index="01"
          eyebrow="The Problem"
          title={"Traditional Survey Drafting Takes Time.\nToo Much Time."}
          highlight={["Too", "Much", "Time"]}
          description="Surveying professionals spend valuable time converting survey information into structured drafting deliverables. Repetitive manual workflows can increase production time, operational costs and the potential for inconsistencies."
        />

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Stagger as="ol" className="relative">
            {problems.map((p) => (
              <RevealItem as="li" key={p.n} className="group relative grid grid-cols-[auto_1fr] gap-6 border-t border-white/10 py-8 last:border-b">
                <span className="font-display text-4xl font-light tabular-nums text-white/25 transition-colors duration-500 group-hover:text-electric-300 md:text-5xl">{p.n}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{p.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/60">{p.body}</p>
                </div>
                <span aria-hidden className="absolute left-0 top-[-1px] h-px w-0 bg-electric transition-[width] duration-700 ease-[var(--ease-expo)] group-hover:w-full" />
              </RevealItem>
            ))}
          </Stagger>

          <TimeComparison />
        </div>
      </div>
    </section>
  );
}
