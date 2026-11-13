"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useId, useState } from "react";
import { SurveyGridBackground } from "@/components/backgrounds/SurveyGridBackground";
import { buttonClass } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/faq";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative isolate overflow-hidden bg-mist">
      <SurveyGridBackground className="-z-10 opacity-70" markers={false} />
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="faq-title" index="09" eyebrow="FAQ" title={"Frequently Asked\nQuestions."} highlight={["Questions"]} />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
            Can&apos;t find what you&apos;re looking for? Our team is happy to answer questions about your specific workflow.
          </p>
          <a href="#contact" className={buttonClass("secondary", "md", "mt-8")}>
            Contact our team <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>

        <ul className="divide-y divide-deep/[0.08] border-y border-deep/[0.08]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <li key={f.q} className="relative">
                <span aria-hidden className={`absolute -left-4 top-0 h-full w-[2px] origin-top bg-electric transition-transform duration-500 ${isOpen ? "scale-y-100" : "scale-y-0"}`} />
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span className={`font-mono text-xs tabular-nums transition-colors ${isOpen ? "text-electric" : "text-deep/30"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`flex-1 font-display text-[17px] font-semibold tracking-tight transition-colors md:text-lg ${isOpen ? "text-deep" : "text-deep/85 group-hover:text-electric"}`}>
                      {f.q}
                    </span>
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-45 border-electric bg-electric text-white" : "border-deep/15 text-deep group-hover:border-electric/50 group-hover:text-electric"
                      }`}
                    >
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-10 pr-12 text-[15px] leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
