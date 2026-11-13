"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { buttonClass } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-x flex min-h-dvh flex-col items-start justify-center py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-electric">Something went wrong</p>
      <h1 className="mt-4 max-w-2xl text-headline font-semibold text-deep">We hit an unexpected error.</h1>
      <p className="mt-6 max-w-xl text-muted">Please try again. If the problem continues, return to the homepage.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className={buttonClass("primary", "lg")}>
          <RotateCcw className="size-4" aria-hidden /> Try again
        </button>
        <Link href="/" className={buttonClass("secondary", "lg")}>
          Go home
        </Link>
      </div>
    </main>
  );
}
