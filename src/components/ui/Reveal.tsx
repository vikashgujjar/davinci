"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "@/lib/motion";

type As = "div" | "section" | "ul" | "ol" | "li" | "p" | "span" | "h2" | "h3" | "article" | "dl";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: As;
  /** Fraction of element visible before triggering */
  amount?: number;
};

/** Scroll-triggered reveal. Fires once. */
export function Reveal({ children, className, variants = fadeUp, delay = 0, as = "div", amount = 0.25 }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = Omit<RevealProps, "variants" | "delay"> & { gap?: number; delay?: number };

/** Parent that staggers its <RevealItem> children. */
export function Stagger({ children, className, gap = 0.09, delay = 0, as = "div", amount = 0.2 }: StaggerProps) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }} variants={stagger(gap, delay)}>
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: As;
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}

/** Word-by-word headline reveal. Keeps text accessible as a single string. */
export function SplitHeading({
  text,
  className,
  as = "h2",
  highlight = [],
  highlightClass = "text-gradient",
  id,
}: {
  id?: string;
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  highlight?: string[];
  highlightClass?: string;
}) {
  const Tag = motion[as];
  const lines = text.split("\n");
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={stagger(0.05)}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${highlight.includes(word.replace(/[.,]/g, "")) ? highlightClass : ""}`}
                variants={{
                  hidden: { y: "105%" },
                  show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {word}
                {wi < line.split(" ").length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
