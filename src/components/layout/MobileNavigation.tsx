"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { buttonClass } from "@/components/ui/Button";
import { navLinks, resolveHref, site } from "@/lib/site";

type Props = { open: boolean; onClose: () => void; active: string; onHome: boolean };

export function MobileNavigation({ open, onClose, active, onHome }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] flex flex-col bg-white xl:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
        >
          <TopographicBackground animated={false} />
          <div className="container-x relative flex h-20 items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-electric">Menu</span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full border border-deep/10 text-deep transition hover:border-electric/40 hover:text-electric"
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x relative flex-1 overflow-y-auto pt-4">
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
              className="divide-y divide-deep/[0.07] border-y border-deep/[0.07]"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  <a
                    href={resolveHref(link.href, onHome)}
                    onClick={onClose}
                    className={`flex items-baseline justify-between py-4 font-display text-2xl font-semibold tracking-tight transition-colors ${
                      active === link.href ? "text-electric" : "text-deep"
                    }`}
                  >
                    {link.label}
                    <span className="font-mono text-xs font-normal text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <motion.div
            className="container-x relative pb-8 pt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.55 } }}
          >
            <a href={resolveHref("#contact", onHome)} onClick={onClose} className={buttonClass("primary", "lg", "w-full")}>
              Book a Demo <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <p className="mt-4 text-center text-xs text-muted">{site.contact.email}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
