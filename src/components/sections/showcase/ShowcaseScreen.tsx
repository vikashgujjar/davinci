import { FileText, FolderKanban, Layers, LayoutGrid, Map as MapIcon, Settings, Sparkles } from "lucide-react";
import { GLOW, GlowDefs, PointCloud, ScreenBackground } from "@/components/graphics/primitives";
import { WIDE_PEAKS } from "@/lib/pointcloud";

const ID = "showcase";
const W = 1000;
const H = 625;
const MONO = "ui-monospace, SFMono-Regular, monospace";
const SANS = "var(--font-inter), ui-sans-serif, sans-serif";

const STAGES = [
  { label: "Survey information received", state: "done" },
  { label: "Data interpreted & organized", state: "done" },
  { label: "Drafting layout in progress", state: "active" },
  { label: "Deliverable prepared", state: "pending" },
] as const;

const PROJECTS = [
  { name: "Sample Parcel A", pct: 100 },
  { name: "Sample Parcel B", pct: 72 },
  { name: "Sample Parcel C", pct: 38 },
];

// Terrain card geometry
const T = { x: 88, y: 128, w: 560, h: 372 };
const BOUNDARY: [number, number][] = [
  [150, 250],
  [520, 214],
  [600, 420],
  [370, 470],
  [130, 430],
];

/** Dark DaVinci workspace (illustrative, sample data) shown on the showcase laptop. */
export function ShowcaseScreen() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-full"
      role="img"
      aria-label="Conceptual DaVinci workspace with sample data: a point-cloud terrain with a parcel boundary, AI processing status at 68 percent, and project progress."
    >
      <GlowDefs id={ID} />
      <ScreenBackground id={ID} w={W} h={H} />
      <clipPath id={`${ID}-terrain`}>
        <rect x={T.x} y={T.y} width={T.w} height={T.h} rx="14" />
      </clipPath>

      {/* window bar */}
      <rect width={W} height="44" fill="#060d26" />
      <line x1="0" y1="44" x2={W} y2="44" stroke={GLOW.mid} strokeOpacity="0.12" />
      {[22, 38, 54].map((cx) => (
        <circle key={cx} cx={cx} cy="22" r="4.5" fill="#fff" fillOpacity="0.16" />
      ))}
      <rect x={W / 2 - 160} y="11" width="320" height="22" rx="6" fill="#fff" fillOpacity="0.05" />
      <text x={W / 2} y="26" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="#fff" fillOpacity="0.5">
        davinci · workspace / sample-project
      </text>

      {/* sidebar */}
      <rect x="0" y="44" width="64" height={H - 44} fill="#060d26" fillOpacity="0.7" />
      <line x1="64" y1="44" x2="64" y2={H} stroke={GLOW.mid} strokeOpacity="0.12" />
      <rect x="16" y="60" width="32" height="32" rx="9" fill="#087bee" filter={`url(#${ID}-glow)`} />
      <text x="32" y="81" textAnchor="middle" fontFamily="var(--font-sora), sans-serif" fontWeight="700" fontSize="15" fill="#fff">
        D
      </text>
      {[LayoutGrid, MapIcon, Layers, FileText, FolderKanban].map((Icon, i) => (
        <g key={i}>
          {i === 1 && <rect x="12" y={114 + i * 50} width="40" height="40" rx="10" fill="#087bee" fillOpacity="0.2" stroke={GLOW.mid} strokeOpacity="0.4" />}
          <Icon x={21} y={123 + i * 50} width={22} height={22} color={i === 1 ? GLOW.hot : "#ffffff"} strokeWidth={1.6} className={i === 1 ? undefined : "opacity-40"} />
        </g>
      ))}
      <Settings x={21} y={H - 46} width={22} height={22} color="#ffffff" strokeWidth={1.6} className="opacity-40" />

      {/* header */}
      <text x="88" y="76" fontFamily={SANS} fontSize="12" fill="#fff" fillOpacity="0.45">
        Projects / Sample Survey
      </text>
      <text x="88" y="104" fontFamily="var(--font-sora), sans-serif" fontSize="21" fontWeight="600" fill="#fff">
        Survey Project Overview
      </text>
      <rect x="770" y="76" width="206" height="32" rx="16" fill="#087bee" fillOpacity="0.18" stroke={GLOW.mid} strokeOpacity="0.45" />
      <Sparkles x={786} y={84} width={16} height={16} color={GLOW.hot} strokeWidth={1.8} />
      <text x="808" y="97" fontFamily={SANS} fontSize="12.5" fontWeight="500" fill={GLOW.hot}>
        AI processing · 68%
      </text>

      {/* terrain card */}
      <rect x={T.x} y={T.y} width={T.w} height={T.h} rx="14" fill="#06102e" stroke={GLOW.mid} strokeOpacity="0.18" />
      <g clipPath={`url(#${ID}-terrain)`}>
        <PointCloud id={ID} x={T.x - 20} y={T.y + 56} w={T.w + 40} h={T.h - 40} seed={21} peaks={WIDE_PEAKS} cols={64} rows={28} dot={0.8} relief={0.62} />
        <path
          d={`M${BOUNDARY.map((p) => p.join(" ")).join(" L")} Z`}
          fill={GLOW.base}
          fillOpacity="0.07"
          stroke={GLOW.hot}
          strokeWidth="1.8"
          strokeDasharray="9 6"
          strokeLinejoin="round"
          filter={`url(#${ID}-glow)`}
          className="motion-safe:animate-dash"
        />
        {BOUNDARY.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="10" fill={GLOW.base} fillOpacity="0.25" />
            <circle cx={x} cy={y} r="4" fill="#06102e" stroke={GLOW.hot} strokeWidth="2" filter={`url(#${ID}-glow)`} />
          </g>
        ))}
      </g>
      {["Contours", "Points", "Boundary"].map((t, i) => (
        <g key={t}>
          <rect x={T.x + 14 + i * 84} y={T.y + 14} width="76" height="24" rx="6" fill={i === 0 ? "#087bee" : "#ffffff"} fillOpacity={i === 0 ? 0.9 : 0.08} />
          <text x={T.x + 52 + i * 84} y={T.y + 30} textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="500" fill="#fff" fillOpacity={i === 0 ? 1 : 0.7}>
            {t}
          </text>
        </g>
      ))}
      <text x={T.x + T.w - 14} y={T.y + T.h - 14} textAnchor="end" fontFamily={MONO} fontSize="10.5" fill={GLOW.light} fillOpacity="0.8">
        Point cloud · sample
      </text>

      {/* AI status panel */}
      <rect x="664" y={T.y} width="312" height={T.h} rx="14" fill="#06102e" stroke={GLOW.mid} strokeOpacity="0.18" />
      <text x="684" y={T.y + 34} fontFamily={MONO} fontSize="10.5" letterSpacing="2" fontWeight="600" fill={GLOW.mid}>
        AI PROCESSING STATUS
      </text>
      {STAGES.map((s, i) => {
        const cy = T.y + 76 + i * 50;
        return (
          <g key={s.label}>
            {s.state === "done" && (
              <>
                <circle cx="698" cy={cy} r="12" fill="#087bee" filter={`url(#${ID}-glow)`} />
                <path d={`M692.5 ${cy} l4 4 l6.5 -7.5`} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
            {s.state === "active" && (
              <>
                <circle cx="698" cy={cy} r="11" fill="none" stroke={GLOW.mid} strokeOpacity="0.3" strokeWidth="2" />
                <g className="origin-center motion-safe:animate-spin" style={{ transformBox: "fill-box" }}>
                  <circle cx="698" cy={cy} r="11" fill="none" stroke="none" />
                  <path d={`M687 ${cy} A11 11 0 0 1 698 ${cy - 11}`} fill="none" stroke={GLOW.hot} strokeWidth="2.4" strokeLinecap="round" filter={`url(#${ID}-glow)`} />
                </g>
              </>
            )}
            {s.state === "pending" && <circle cx="698" cy={cy} r="11" fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="1.5" />}
            <text x="722" y={cy + 4.5} fontFamily={SANS} fontSize="13.5" fill="#fff" fillOpacity={s.state === "pending" ? 0.45 : 0.92}>
              {s.label}
            </text>
          </g>
        );
      })}
      <text x="684" y={T.y + T.h - 52} fontFamily={SANS} fontSize="12" fill="#fff" fillOpacity="0.5">
        Overall progress
      </text>
      <text x="956" y={T.y + T.h - 52} textAnchor="end" fontFamily={SANS} fontSize="12" fontWeight="600" fill="#fff">
        68%
      </text>
      <rect x="684" y={T.y + T.h - 38} width="272" height="8" rx="4" fill="#fff" fillOpacity="0.08" />
      <rect x="684" y={T.y + T.h - 38} width={272 * 0.68} height="8" rx="4" fill="#087bee" filter={`url(#${ID}-glow)`} />

      {/* bottom cards */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={88 + i * 301} y="516" width="285" height="92" rx="12" fill="#06102e" stroke={GLOW.mid} strokeOpacity="0.18" />
      ))}
      <g fontFamily={MONO} fontSize="10" letterSpacing="1.8" fill="#fff" fillOpacity="0.45">
        <text x="104" y="540">
          SURVEY DATA
        </text>
        <text x="405" y="540">
          DRAFTING OUTPUT
        </text>
        <text x="706" y="540">
          PROJECT PROGRESS
        </text>
      </g>
      {Array.from({ length: 22 }, (_, i) => {
        const h = 8 + ((i * 37) % 32);
        return <rect key={i} x={104 + i * 11.5} y={594 - h} width="7" height={h} rx="2" fill={GLOW.base} fillOpacity={i > 16 ? 0.3 : 0.85} />;
      })}
      <rect x="405" y="552" width="70" height="44" rx="6" fill="#fff" fillOpacity="0.04" stroke={GLOW.mid} strokeOpacity="0.3" />
      <path d="M414 562 L452 558 L460 588 L420 591 Z" fill="none" stroke={GLOW.hot} strokeWidth="1.3" filter={`url(#${ID}-glow)`} />
      <text x="489" y="570" fontFamily={SANS} fontSize="13" fontWeight="500" fill="#fff">
        Sheet preview
      </text>
      <text x="489" y="587" fontFamily={SANS} fontSize="11" fill="#fff" fillOpacity="0.5">
        Organized layout
      </text>
      {PROJECTS.map((p, i) => (
        <g key={p.name} fontFamily={SANS} fontSize="10.5">
          <text x="706" y={560 + i * 17} fill="#fff" fillOpacity="0.75">
            {p.name}
          </text>
          <rect x="806" y={554 + i * 17} width="120" height="5" rx="2.5" fill="#fff" fillOpacity="0.08" />
          <rect x="806" y={554 + i * 17} width={1.2 * p.pct} height="5" rx="2.5" fill="#087bee" />
          <text x="958" y={560 + i * 17} textAnchor="end" fill="#fff" fillOpacity="0.5">
            {p.pct}%
          </text>
        </g>
      ))}
    </svg>
  );
}
