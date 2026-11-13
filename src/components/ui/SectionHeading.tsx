import type { ReactNode } from "react";
import { Reveal, SplitHeading } from "./Reveal";

type Props = {
  eyebrow: string;
  index?: string;
  title: string;
  highlight?: string[];
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function Eyebrow({ children, index, tone = "light" }: { children: ReactNode; index?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] ${
        tone === "dark" ? "text-electric-300" : "text-electric"
      }`}
    >
      {index && <span className={tone === "dark" ? "text-white/40" : "text-deep/35"}>{index}</span>}
      <span aria-hidden className={`h-px w-8 ${tone === "dark" ? "bg-electric-300/60" : "bg-electric/60"}`} />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, index, title, highlight, description, tone = "light", align = "left", className = "", id }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Reveal>
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <SplitHeading
        id={id}
        text={title}
        highlight={highlight}
        highlightClass={tone === "dark" ? "text-gradient-light" : "text-gradient"}
        className={`mt-5 text-headline font-semibold ${tone === "dark" ? "text-white" : "text-deep"}`}
      />
      {description && (
        <Reveal delay={0.15}>
          <p
            className={`mt-6 text-base leading-relaxed md:text-lg ${center ? "mx-auto" : ""} max-w-2xl ${
              tone === "dark" ? "text-white/70" : "text-muted"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
