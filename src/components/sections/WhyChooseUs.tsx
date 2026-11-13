import { BrainCircuit, CircleGauge, Cog, Layers3, Rocket, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { RevealItem, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Feature = { icon: LucideIcon; title: string; body: string; className: string; variant: "hero" | "plain" | "tint" };

const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Intelligence",
    body: "Artificial intelligence applied directly to the survey drafting workflow — the core of everything DaVinci does.",
    className: "md:col-span-2 lg:col-span-3 lg:row-span-2",
    variant: "hero",
  },
  {
    icon: Cog,
    title: "Workflow Automation",
    body: "Repetitive drafting steps are automated, so your team can focus on review and engineering judgement.",
    className: "lg:col-span-3",
    variant: "plain",
  },
  {
    icon: Rocket,
    title: "Faster Turnaround",
    body: "Deliver drafting outputs sooner, with a target of around seven minutes per workflow.",
    className: "lg:col-span-3",
    variant: "tint",
  },
  {
    icon: TrendingDown,
    title: "Reduced Operational Overhead",
    body: "Lower the cost of drafting production — by up to 75%.",
    className: "lg:col-span-2",
    variant: "plain",
  },
  {
    icon: Layers3,
    title: "Consistent Drafting Outputs",
    body: "A structured process that helps keep deliverables organized and uniform.",
    className: "lg:col-span-2",
    variant: "plain",
  },
  {
    icon: CircleGauge,
    title: "Technology-Driven Productivity",
    body: "Modern tooling that helps survey teams do more with the time they have.",
    className: "md:col-span-2 lg:col-span-2",
    variant: "tint",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why" aria-labelledby="why-title" className="section-y relative isolate overflow-hidden bg-mist">
      <svg aria-hidden className="absolute -right-40 top-10 -z-10 h-[620px] w-[620px] text-deep/[0.06]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <polygon points="100,10 178,55 178,145 100,190 22,145 22,55" />
        <polygon points="100,34 157,67 157,133 100,166 43,133 43,67" />
        <polygon points="100,58 136,79 136,121 100,142 64,121 64,79" />
        <path d="M100 10V190M22 55L178 145M178 55L22 145" strokeDasharray="2 4" />
      </svg>

      <div className="container-x">
        <SectionHeading
          id="why-title"
          index="07"
          eyebrow="Why DaVinci"
          title={"Designed for the Future\nof Survey Drafting."}
          highlight={["Future"]}
        />

        <Stagger className="mt-16 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-6">
          {features.map((f, i) => (
            <RevealItem key={f.title} className={f.className}>
              <FeatureTile feature={f} index={i} />
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FeatureTile({ feature, index }: { feature: Feature; index: number }) {
  const { icon: Icon, title, body, variant } = feature;

  if (variant === "hero") {
    return (
      <article className="group relative isolate flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br from-electric to-deep p-8 text-white transition-shadow duration-500 hover:shadow-glow sm:p-10">
        <TopographicBackground tone="dark" className="-z-10 opacity-80 mix-blend-screen" />
        <span className="flex size-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="size-7" strokeWidth={1.5} aria-hidden />
        </span>
        <div>
          <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h3>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/80">{body}</p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-float ${
        variant === "tint" ? "bg-sky" : "border border-deep/[0.07] bg-white hover:border-electric/30"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-electric shadow-soft transition-all duration-500 group-hover:bg-electric group-hover:text-white">
          <Icon className="size-[22px] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.6} aria-hidden />
        </span>
        <span className="font-mono text-[11px] text-deep/25">0{index + 1}</span>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold tracking-tight text-deep">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </article>
  );
}
