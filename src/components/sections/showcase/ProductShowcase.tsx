import { Check, FileText, FolderKanban, LayoutGrid, Layers, Loader2, Map as MapIcon, Settings, Sparkles } from "lucide-react";
import { AINetworkBackground } from "@/components/backgrounds/AINetworkBackground";
import { DigitalTerrainBackground } from "@/components/backgrounds/DigitalTerrainBackground";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerrainMap } from "./TerrainMap";

const stages = [
  { label: "Survey information received", state: "done" },
  { label: "Data interpreted & organized", state: "done" },
  { label: "Drafting layout in progress", state: "active" },
  { label: "Deliverable prepared", state: "pending" },
] as const;

const projects = [
  { name: "Sample Parcel A", pct: 100 },
  { name: "Sample Parcel B", pct: 72 },
  { name: "Sample Parcel C", pct: 38 },
];

export function ProductShowcase() {
  return (
    <section id="showcase" aria-labelledby="showcase-title" className="relative isolate overflow-hidden bg-night pb-28 pt-24 text-white md:pb-36 md:pt-32">
      <AINetworkBackground tone="dark" className="-z-10 opacity-60" seed={12} />
      <DigitalTerrainBackground className="-z-10 h-[55%]" seed={7} />
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

        <div className="relative mx-auto mt-16 max-w-6xl md:mt-20">
          {/* Floating panels (desktop) */}
          <Parallax offset={30} className="z-20 hidden lg:block">
            <div className="absolute -left-20 top-[48%] w-60 rounded-2xl border border-deep/[0.06] bg-white p-4 text-deep shadow-float">
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
            <div className="absolute -bottom-14 -right-16 w-64 rounded-2xl border border-deep/[0.06] bg-white p-4 text-deep shadow-float">
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
            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white text-deep shadow-[0_60px_120px_-40px_rgb(8_123_238/0.55),0_0_0_1px_rgb(255_255_255/0.06)]">
              {/* App chrome */}
              <div className="flex items-center gap-4 border-b border-deep/[0.06] bg-mist px-4 py-3">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-deep/15" />
                  <span className="size-2.5 rounded-full bg-deep/15" />
                  <span className="size-2.5 rounded-full bg-deep/15" />
                </div>
                <div className="mx-auto hidden w-full max-w-sm items-center justify-center rounded-md bg-white px-3 py-1 font-mono text-[10.5px] text-muted sm:flex">
                  davinci · workspace / sample-project
                </div>
              </div>

              <div className="grid md:grid-cols-[64px_1fr]">
                {/* Sidebar */}
                <aside aria-hidden className="hidden flex-col items-center gap-2 border-r border-deep/[0.06] bg-white py-4 md:flex">
                  <span className="mb-3 flex size-9 items-center justify-center rounded-xl bg-deep font-display text-sm font-bold text-white">D</span>
                  {[LayoutGrid, MapIcon, Layers, FileText, FolderKanban].map((Icon, i) => (
                    <span key={i} className={`flex size-10 items-center justify-center rounded-xl ${i === 1 ? "bg-sky text-electric" : "text-deep/40"}`}>
                      <Icon className="size-[18px]" strokeWidth={1.75} />
                    </span>
                  ))}
                  <span className="mt-auto flex size-10 items-center justify-center text-deep/40">
                    <Settings className="size-[18px]" strokeWidth={1.75} />
                  </span>
                </aside>

                <div className="min-w-0 p-4 sm:p-6">
                  {/* Header row */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] text-muted">Projects / Sample Survey</p>
                      <p className="font-display text-lg font-semibold tracking-tight">Survey Project Overview</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-sky px-3 py-1.5 text-[11px] font-medium text-electric">
                      <Sparkles className="size-3.5" aria-hidden />
                      AI processing · 68%
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                    {/* Map */}
                    <div className="relative overflow-hidden rounded-xl border border-deep/[0.07]">
                      <div className="aspect-[15/8]">
                        <TerrainMap />
                      </div>
                      <div className="absolute left-3 top-3 flex gap-1.5">
                        {["Contours", "Points", "Boundary"].map((t, i) => (
                          <span key={t} className={`rounded-md px-2 py-1 text-[10px] font-medium backdrop-blur ${i === 0 ? "bg-deep text-white" : "bg-white/85 text-deep/70"}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="absolute bottom-3 right-3 rounded-md bg-white/90 px-2 py-1 font-mono text-[10px] text-muted backdrop-blur">
                        Digital terrain · sample
                      </div>
                      {/* scanning line */}
                      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full">
                        <div className="h-16 w-full bg-gradient-to-b from-transparent via-electric/10 to-transparent motion-safe:animate-scan" />
                      </div>
                    </div>

                    {/* AI status */}
                    <div className="flex flex-col rounded-xl border border-deep/[0.07] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric">AI processing status</p>
                      <ul className="mt-4 space-y-3.5">
                        {stages.map((s) => (
                          <li key={s.label} className="flex items-center gap-3 text-[13px]">
                            <span
                              className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                                s.state === "done" ? "bg-electric text-white" : s.state === "active" ? "border-2 border-electric text-electric" : "border border-deep/15 text-deep/30"
                              }`}
                            >
                              {s.state === "done" ? <Check className="size-3.5" aria-hidden /> : s.state === "active" ? <Loader2 className="size-3 motion-safe:animate-spin" aria-hidden /> : null}
                            </span>
                            <span className={s.state === "pending" ? "text-muted" : "text-deep"}>{s.label}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-5">
                        <div className="flex justify-between text-[11px] text-muted">
                          <span>Overall progress</span>
                          <span className="font-medium text-deep">68%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sky">
                          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-electric to-deep" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-deep/[0.07] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Survey data</p>
                      <svg viewBox="0 0 160 44" className="mt-3 h-11 w-full" aria-hidden>
                        {Array.from({ length: 20 }, (_, i) => {
                          const h = 8 + ((i * 37) % 30);
                          return <rect key={i} x={i * 8} y={44 - h} width="5" height={h} rx="1.5" fill="#087bee" fillOpacity={i > 14 ? 0.25 : 0.7} />;
                        })}
                      </svg>
                      <p className="mt-2 text-[11px] text-muted">Point distribution · sample</p>
                    </div>
                    <div className="rounded-xl border border-deep/[0.07] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Drafting output</p>
                      <div className="mt-3 flex items-center gap-3">
                        <svg viewBox="0 0 60 44" className="h-11 w-16 rounded-md border border-deep/[0.08] bg-mist" aria-hidden>
                          <path d="M10 10 L42 7 L48 34 L14 37 Z" fill="none" stroke="#17104f" strokeWidth="1.2" />
                          <line x1="52" y1="4" x2="52" y2="40" stroke="#17104f" strokeOpacity="0.15" />
                        </svg>
                        <div>
                          <p className="text-[13px] font-medium">Sheet preview</p>
                          <p className="text-[11px] text-muted">Organized layout</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl border border-deep/[0.07] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Project progress</p>
                      <ul className="mt-3 space-y-2">
                        {projects.map((p) => (
                          <li key={p.name}>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-deep/80">{p.name}</span>
                              <span className="text-muted">{p.pct}%</span>
                            </div>
                            <div className="mt-1 h-1 overflow-hidden rounded-full bg-sky">
                              <div className="h-full rounded-full bg-electric" style={{ width: `${p.pct}%` }} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <p className="mt-8 text-center text-xs text-white/45">
            Conceptual interface shown for illustration only, using sample data. Final product features and design may differ.
          </p>
        </div>
      </div>
    </section>
  );
}
