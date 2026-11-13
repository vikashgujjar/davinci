import { DigitalTerrainBackground } from "@/components/backgrounds/DigitalTerrainBackground";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SplitHeading } from "@/components/ui/Reveal";

export function AboutCompany() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-hidden bg-white pt-24 md:pt-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="08">About DaVinci</Eyebrow>
            </Reveal>
            <SplitHeading
              id="about-title"
              text={"Bringing Intelligence\nto Surveying."}
              highlight={["Intelligence"]}
              className="mt-6 text-display font-semibold text-deep"
            />
          </div>
          <div className="space-y-6 text-[17px] leading-relaxed text-muted lg:col-span-5 lg:pt-16">
            <Reveal>
              <p>
                <span className="font-medium text-deep">DaVinci is focused on transforming the way survey drafting workflows are approached.</span> By combining artificial intelligence with surveying processes, DaVinci aims to make drafting faster, more efficient and more consistent.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Our vision is to help surveying professionals spend less time on repetitive drafting work — and more time focusing on valuable engineering outcomes.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote className="border-l-2 border-electric pl-5 font-display text-xl font-medium leading-snug tracking-tight text-deep">
                The future of survey drafting is intelligent.
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Abstract digital terrain visual */}
      <div className="relative mt-16 h-[300px] md:mt-24 md:h-[440px]">
        <DigitalTerrainBackground tone="light" seed={11} className="h-full" />
        <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 1280 440" preserveAspectRatio="xMidYMid slice" fill="none">
          {[
            { x: 360, y: 250, label: "SURVEY" },
            { x: 660, y: 170, label: "AI" },
            { x: 940, y: 270, label: "DRAFT" },
          ].map((p, i) => (
            <g key={p.label}>
              <line x1={p.x} y1={p.y} x2={p.x} y2={p.y - 90} stroke="#087bee" strokeOpacity="0.6" strokeDasharray="3 4" />
              <circle cx={p.x} cy={p.y} r="16" fill="#087bee" fillOpacity="0.12" />
              <circle cx={p.x} cy={p.y} r="5" fill={i === 1 ? "#17104f" : "#087bee"} />
              <rect x={p.x - 34} y={p.y - 118} width="68" height="24" rx="12" fill="#fff" stroke="#17104f" strokeOpacity="0.1" />
              <text x={p.x} y={p.y - 102} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#17104f">
                {p.label}
              </text>
            </g>
          ))}
          <path d="M360 250 C 480 230, 560 180, 660 170 S 860 240, 940 270" stroke="#087bee" strokeWidth="2" strokeDasharray="6 6" className="motion-safe:animate-dash" />
        </svg>
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
