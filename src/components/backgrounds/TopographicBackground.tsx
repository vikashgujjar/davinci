import { contourRings } from "@/lib/geometry";

type Props = {
  className?: string;
  /** light = indigo lines on light surfaces, dark = blue lines on indigo surfaces */
  tone?: "light" | "dark";
  animated?: boolean;
  density?: "low" | "high";
};

/** Organic topographic contour lines. Pure SVG, rendered on the server. */
export function TopographicBackground({ className = "", tone = "light", animated = true, density = "low" }: Props) {
  const rings = density === "high" ? 16 : 11;
  const a = contourRings({ cx: 260, cy: 220, rings, r0: 24, step: 26, seed: 7 });
  const b = contourRings({ cx: 1040, cy: 560, rings: rings + 2, r0: 18, step: 28, seed: 21, squash: 0.62 });
  const c = contourRings({ cx: 780, cy: -40, rings: 8, r0: 40, step: 30, seed: 42 });

  const stroke = tone === "dark" ? "#3b8ff0" : "#17104f";
  const opacity = tone === "dark" ? 0.22 : 0.07;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className={`absolute -inset-[6%] h-[112%] w-[112%] ${animated ? "motion-safe:animate-drift" : ""}`}
        viewBox="0 0 1280 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke={stroke} strokeOpacity={opacity} strokeWidth="1">
          {[...a, ...b, ...c].map((d, i) => (
            <path key={i} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        {/* index contours — every 5th line slightly heavier, as on real topo maps */}
        <g stroke={stroke} strokeOpacity={opacity * 1.8} strokeWidth="1.4">
          {a.filter((_, i) => i % 5 === 4).map((d, i) => (
            <path key={`ia${i}`} d={d} vectorEffect="non-scaling-stroke" />
          ))}
          {b.filter((_, i) => i % 5 === 4).map((d, i) => (
            <path key={`ib${i}`} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
    </div>
  );
}
