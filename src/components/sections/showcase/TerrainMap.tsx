import { contourRings } from "@/lib/geometry";
import { r2, seeded } from "@/lib/motion";

const PEAK_A = contourRings({ cx: 210, cy: 150, rings: 12, r0: 10, step: 15, seed: 31, squash: 0.7 });
const PEAK_B = contourRings({ cx: 470, cy: 230, rings: 10, r0: 8, step: 16, seed: 57, squash: 0.62 });

const rand = seeded(404);
const SHOTS = Array.from({ length: 34 }, () => ({ x: r2(40 + rand() * 520), y: r2(30 + rand() * 260) }));

/** Contour map used inside the dashboard mockup (illustrative sample data). */
export function TerrainMap() {
  return (
    <svg viewBox="0 0 600 320" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <pattern id="tm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#17104f" strokeOpacity="0.06" />
        </pattern>
      </defs>
      <rect width="600" height="320" fill="#f7f8fc" />
      <rect width="600" height="320" fill="url(#tm-grid)" />
      {/* elevation bands: fill rings with increasing opacity toward the peak */}
      {[PEAK_A, PEAK_B].map((rings, k) => (
        <g key={k}>
          {[...rings].reverse().map((d, i) => (
            <path key={i} d={d} fill="#087bee" fillOpacity={0.035} />
          ))}
          {rings.map((d, i) => (
            <path key={`s${i}`} d={d} fill="none" stroke={i % 4 === 3 ? "#17104f" : "#087bee"} strokeOpacity={i % 4 === 3 ? 0.35 : 0.3} strokeWidth={i % 4 === 3 ? 1.2 : 0.8} />
          ))}
        </g>
      ))}
      {/* boundary */}
      <path d="M90 60 L520 40 L560 270 L300 300 L60 250 Z" fill="none" stroke="#17104f" strokeWidth="1.6" strokeDasharray="8 5" />
      {/* survey shots */}
      <g fill="#17104f">
        {SHOTS.map((p, i) => (
          <path key={i} d={`M${p.x - 2.5} ${p.y}h5M${p.x} ${p.y - 2.5}v5`} stroke="#17104f" strokeOpacity="0.55" />
        ))}
      </g>
      {/* highlighted control points */}
      {[
        [90, 60],
        [520, 40],
        [560, 270],
        [300, 300],
        [60, 250],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="#087bee" fillOpacity="0.15" />
          <circle cx={x} cy={y} r="3.5" fill="#fff" stroke="#087bee" strokeWidth="1.8" />
        </g>
      ))}
      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="#17104f" fillOpacity="0.6">
        <text x="196" y="153">
          ▲ 128.4
        </text>
        <text x="456" y="233">
          ▲ 117.9
        </text>
      </g>
    </svg>
  );
}
