"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo, LOGO_RATIO } from "@/components/brand/Logo";
import { useIntro } from "@/components/providers/IntroProvider";
import { buttonClass } from "@/components/ui/Button";
import { navLinks, resolveHref } from "@/lib/site";
import { MobileNavigation } from "./MobileNavigation";

const LOGO_H = 50;
const LOGO_W = Math.round(LOGO_RATIO * LOGO_H);

/** On the homepage: the section in view. On other pages: the current path. */
function useActiveSection(onHome: boolean, pathname: string) {
  const [active, setActive] = useState("#home");
  useEffect(() => {
    if (!onHome) return;
    const ids = navLinks.filter((l) => l.href.startsWith("#")).map((l) => l.href.slice(1));
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
  }, [onHome]);
  return onHome ? active : pathname;
}

export function Header() {
  const { done } = useIntro();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome, pathname);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled ? "border-b border-deep/[0.06] bg-white shadow-[0_8px_30px_-20px_rgb(23_16_79/0.25)]" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href={onHome ? "#home" : "/"} className="relative shrink-0 rounded-md" aria-label={onHome ? "DaVinci — back to top" : "DaVinci — home"}>
            {done ? (
              <motion.div layoutId="brand-logo" transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <Logo height={LOGO_H} priority className="max-sm:w-[170px]! w-[220px]!" />
              </motion.div>
            ) : (
              <div style={{ width: LOGO_W, height: LOGO_H }} className="max-sm:w-[170px]! w-[220px]!" />
            )}
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={resolveHref(link.href, onHome)}
                      aria-current={isActive ? (link.href.startsWith("#") ? "true" : "page") : undefined}
                      className={`group relative block whitespace-nowrap px-3 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
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
            <a href={resolveHref("#contact", onHome)} className={buttonClass("primary", "md", "hidden sm:inline-flex")}>
              Book a Demo
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-deep/10 bg-white/70 text-deep backdrop-blur transition hover:border-electric/40 hover:text-electric xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={open} onClose={() => setOpen(false)} active={active} onHome={onHome} />
    </>
  );
}
