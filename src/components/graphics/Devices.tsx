import type { ReactNode } from "react";

/** Front-facing laptop. `children` fill the screen (16:10). */
export function Laptop({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-t-[1.1rem] rounded-b-[0.4rem] border border-white/10 bg-[#0a0c12] p-[2%] pb-[2.6%] shadow-[0_50px_90px_-35px_rgb(8_17_60/0.7)] sm:rounded-t-[1.5rem]">
        <span aria-hidden className="absolute left-1/2 top-[0.8%] size-1 -translate-x-1/2 rounded-full bg-white/25 sm:size-1.5" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.35rem] bg-[#050a1f]">
          {children}
          {/* glass reflection */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.07)_0%,transparent_32%,transparent_70%,rgb(255_255_255/0.03)_100%)]" />
        </div>
      </div>
      {/* base */}
      <div aria-hidden className="relative -mx-[7%] h-3 rounded-b-[1.1rem] rounded-t-[0.2rem] bg-gradient-to-b from-[#eef0f4] via-[#c9ced8] to-[#8e95a2] shadow-[0_26px_40px_-16px_rgb(13_9_54/0.55)] sm:h-4">
        <div className="absolute left-1/2 top-0 h-1/2 w-[15%] -translate-x-1/2 rounded-b-lg bg-[#a7adb8]" />
      </div>
    </div>
  );
}

/** Slim dark display panel for wide scenes. */
export function Display({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[22px] border border-white/10 bg-[#0a0c12] p-1.5 shadow-[0_50px_90px_-35px_rgb(8_17_60/0.6)] sm:rounded-[28px] sm:p-2.5 ${className}`}>
      <div className="relative overflow-hidden rounded-[16px] bg-[#050a1f] sm:rounded-[20px]">
        {children}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.06)_0%,transparent_30%)]" />
      </div>
    </div>
  );
}
