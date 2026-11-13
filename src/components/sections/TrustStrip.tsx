import { BrainCircuit, Gauge, Layers, TrendingDown } from "lucide-react";
import { RevealItem, Stagger } from "@/components/ui/Reveal";

const items = [
  { icon: BrainCircuit, label: "AI-Powered Automation" },
  { icon: Gauge, label: "Faster Workflows" },
  { icon: TrendingDown, label: "Reduced Drafting Overhead" },
  { icon: Layers, label: "Consistent Outputs" },
];

export function TrustStrip() {
  return (
    <section aria-label="Value highlights" className="relative bg-white">
      <div className="container-x">
        <div className="relative grid items-center gap-8 border-y border-deep/[0.08] py-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-14">
          {/* survey station ticks on the top border */}
          <svg aria-hidden className="absolute -top-[5px] left-0 h-[10px] w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
            {[0, 25, 50, 75, 100].map((x) => (
              <line key={x} x1={x} x2={x} y1="0" y2="10" stroke="#087bee" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>

          <p className="font-display text-lg font-semibold leading-snug tracking-tight text-deep md:text-xl">
            Built to make survey drafting <span className="text-electric">faster, smarter</span> and more efficient.
          </p>

          <Stagger as="ul" className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
            {items.map(({ icon: Icon, label }) => (
              <RevealItem as="li" key={label} className="group flex items-center gap-3">
                <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky text-electric transition-all duration-500 group-hover:bg-electric group-hover:text-white group-hover:shadow-glow">
                  <Icon className="size-[18px] transition-transform duration-500 group-hover:scale-110" aria-hidden strokeWidth={1.75} />
                </span>
                <span className="text-[13.5px] font-medium leading-tight text-deep">{label}</span>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
