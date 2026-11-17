import type { ComponentType } from "react";
import { pointCloud, type Peak } from "@/lib/pointcloud";

/**
 * Building blocks for the "glowing data" illustration style:
 * dark screens, luminous line icons, light trails and point-cloud terrain.
 * All are plain SVG (no hooks), so they work in server and client components.
 * Each scene passes a unique `id` so its filters/gradients don't collide.
 */

type IconProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
};
export type IconType = ComponentType<IconProps>;

export const GLOW = { core: "#ffffff", hot: "#dff0ff", light: "#8cc4fa", mid: "#6fb3f7", base: "#3b8ff0" } as const;

export function GlowDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-glow`} filterUnits="userSpaceOnUse" x="-500" y="-500" width="3000" height="2000">
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`${id}-bloom`} filterUnits="userSpaceOnUse" x="-500" y="-500" width="3000" height="2000">
        <feGaussianBlur stdDeviation="8" />
      </filter>
      <radialGradient id={`${id}-focus`}>
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.22" stopColor="#bfe0ff" />
        <stop offset="0.55" stopColor="#3b8ff0" stopOpacity="0.45" />
        <stop offset="1" stopColor="#087bee" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-screen`} cx="0.6" cy="0.45" r="0.85">
        <stop offset="0" stopColor="#10255a" />
        <stop offset="0.55" stopColor="#0a1536" />
        <stop offset="1" stopColor="#050a1f" />
      </radialGradient>
      <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke="#6fb3f7" strokeOpacity="0.06" />
      </pattern>
    </defs>
  );
}

/** Dark screen background (gradient + faint grid). */
export function ScreenBackground({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <>
      <rect width={w} height={h} fill={`url(#${id}-screen)`} />
      <rect width={w} height={h} fill={`url(#${id}-grid)`} />
    </>
  );
}

const DOTS = [
  { c: "#2f7fe0", o: 0.4, w: 1.5 },
  { c: GLOW.mid, o: 0.6, w: 1.8 },
  { c: GLOW.light, o: 0.85, w: 2.2 },
  { c: GLOW.hot, o: 1, w: 2.6 },
];

/** Glowing point-cloud terrain, drawn into the box (x, y, w, h). */
export function PointCloud({
  id,
  x = 0,
  y = 0,
  w,
  h,
  seed = 1,
  peaks,
  cols,
  rows,
  dot = 1,
  mesh = true,
  relief,
}: {
  id: string;
  x?: number;
  y?: number;
  w: number;
  h: number;
  seed?: number;
  peaks?: Peak[];
  cols?: number;
  rows?: number;
  /** Multiplier for dot size (use < 1 for small scenes). */
  dot?: number;
  mesh?: boolean;
  relief?: number;
}) {
  const cloud = pointCloud({ w, h, seed, peaks, cols, rows, relief });
  return (
    <g transform={x || y ? `translate(${x} ${y})` : undefined} fill="none" strokeLinecap="round">
      {mesh && <path d={cloud.mesh} stroke={GLOW.base} strokeOpacity="0.16" strokeWidth={0.6 * dot} />}
      {cloud.layers.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={DOTS[i].c}
          strokeOpacity={DOTS[i].o}
          strokeWidth={DOTS[i].w * dot}
          filter={i >= 2 ? `url(#${id}-glow)` : undefined}
          className={i === 3 ? "motion-safe:animate-twinkle" : undefined}
        />
      ))}
    </g>
  );
}

/** Luminous trails with light pulses travelling along them. */
export function FlowPaths({ id, paths, weight = 1, delay = 0 }: { id: string; paths: string[]; weight?: number; delay?: number }) {
  return (
    <g fill="none" strokeLinecap="round">
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} stroke={GLOW.base} strokeOpacity="0.6" strokeWidth={5 * weight} filter={`url(#${id}-bloom)`} />
          <path d={d} stroke={GLOW.mid} strokeOpacity="0.95" strokeWidth={1.6 * weight} filter={`url(#${id}-glow)`} />
          <path
            d={d}
            pathLength={100}
            stroke={GLOW.core}
            strokeWidth={2.4 * weight}
            strokeDasharray="7 93"
            className="opacity-0 motion-safe:animate-flow motion-safe:opacity-100"
            style={{ animationDelay: `${delay - i * 0.55}s` }}
          />
        </g>
      ))}
    </g>
  );
}

/** Bright convergence point where the trails meet. */
export function FocusPoint({ id, x, y, r = 40 }: { id: string; x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={`url(#${id}-focus)`} className="motion-safe:animate-twinkle" />
      <circle cx={x} cy={y} r={Math.max(r * 0.1, 1.5)} fill="#fff" />
    </g>
  );
}

/** A glowing line icon with a label — one data source. */
export function SourceNode({
  id,
  x,
  y,
  icon: Icon,
  label,
  size = 44,
  fontSize = 18,
}: {
  id: string;
  x: number;
  y: number;
  icon: IconType;
  label?: string;
  size?: number;
  fontSize?: number;
}) {
  return (
    <g>
      <g filter={`url(#${id}-glow)`}>
        <Icon x={x} y={y - size / 2} width={size} height={size} color={GLOW.hot} strokeWidth={1.4} />
      </g>
      {label && (
        <text x={x + size + size * 0.35} y={y + fontSize * 0.35} fill="#ffffff" fontSize={fontSize} fontWeight={500} fontFamily="var(--font-inter), ui-sans-serif, sans-serif">
          {label}
        </text>
      )}
    </g>
  );
}

/** Builds trails from each source label to a focus point. */
export function trailsTo(starts: { x: number; y: number }[], fx: number, fy: number, bend = 0.45) {
  return starts.map(({ x, y }) => {
    const dx = fx - x;
    return `M${x} ${y} C ${x + dx * bend} ${y}, ${fx - dx * bend} ${fy}, ${fx} ${fy}`;
  });
}

/** Approximate rendered width of a label (Inter, medium). */
export const labelWidth = (text: string, fontSize: number) => text.length * fontSize * 0.55;

/** Total station on a tripod — lucide-style 24px line icon. */
export function SurveyIcon({ x, y, width = 24, height = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      x={x}
      y={y}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="8" y="2" width="8" height="7" rx="1.5" />
      <circle cx="12" cy="5.5" r="1.7" />
      <path d="M10 9h4v2.2h-4z" />
      <path d="M12 11.2 6.5 21.5M12 11.2v10.3M12 11.2l5.5 10.3" />
    </svg>
  );
}
