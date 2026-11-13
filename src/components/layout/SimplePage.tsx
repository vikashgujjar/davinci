import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SurveyGridBackground } from "@/components/backgrounds/SurveyGridBackground";
import { TopographicBackground } from "@/components/backgrounds/TopographicBackground";
import { Logo } from "@/components/brand/Logo";

/** Minimal shell for secondary pages (legal, 404, errors). */
export function SimplePage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-white">
      <SurveyGridBackground className="-z-10" markers={false} />
      <TopographicBackground className="-z-10" animated={false} />
      <header className="container-x flex h-20 items-center justify-between">
        <Link href="/" aria-label="DaVinci home">
          <Logo height={36} />
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-electric">
          <ArrowLeft className="size-4" aria-hidden /> Back to home
        </Link>
      </header>
      <main id="main" className="container-x py-20 md:py-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-electric">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-headline font-semibold text-deep">{title}</h1>
        <div className="mt-8 max-w-2xl space-y-5 text-[16px] leading-relaxed text-muted">{children}</div>
      </main>
    </div>
  );
}
