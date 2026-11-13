"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useIntro } from "@/components/providers/IntroProvider";
import { buttonClass } from "@/components/ui/Button";
import { navLinks } from "@/lib/site";
import { MobileNavigation } from "./MobileNavigation";

const LOGO_H = 38;
const LOGO_W = Math.round((1861 / 449) * LOGO_H);

function useActiveSection() {
  const [active, setActive] = useState("#home");
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Header() {
  const { done } = useIntro();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled ? "border-b border-deep/[0.06] bg-white shadow-[0_8px_30px_-20px_rgb(23_16_79/0.25)]" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="#home" className="relative shrink-0 rounded-md" aria-label="DaVinci — back to top">
            {done ? (
              <motion.div layoutId="brand-logo" transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <Logo height={LOGO_H} priority className="max-sm:w-[132px]!" />
              </motion.div>
            ) : (
              <div style={{ width: LOGO_W, height: LOGO_H }} className="max-sm:w-[132px]!" />
            )}
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`group relative block px-3 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                        isActive ? "text-deep" : "text-muted hover:text-deep"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-electric transition-transform duration-500 ease-[var(--ease-expo)] ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className={buttonClass("primary", "md", "hidden sm:inline-flex")}>
              Book a Demo
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-deep/10 bg-white/70 text-deep backdrop-blur transition hover:border-electric/40 hover:text-electric lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={open} onClose={() => setOpen(false)} active={active} />
    </>
  );
}
