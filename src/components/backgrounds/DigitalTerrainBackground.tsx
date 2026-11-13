import { terrainHeight } from "@/lib/geometry";
import { r2 } from "@/lib/motion";

type Props = {
  className?: string;
  tone?: "light" | "dark";
  seed?: number;
};

/**
 * Wireframe digital terrain in a perspective projection.
 * Generated once at render time — no runtime cost on the client.
 */
export function DigitalTerrainBackground({ className = "", tone = "dark", seed = 3 }: Props) {
  const COLS = 34;
  const ROWS = 18;
  const W = 1280;
  const H = 520;
  const horizon = 40;

  const project = (c: number, r: number) => {
    const depth = r / (ROWS - 1); // 0 = far, 1 = near
    const scale = 0.35 + depth * 0.95;
    const x = W / 2 + (c / (COLS - 1) - 0.5) * W * 1.4 * scale;
    const h = terrainHeight(c * 0.32, r * 0.42, seed) * 70 * scale;
    const y = horizon + Math.pow(depth, 1.35) * (H - horizon) - h;
    return [r2(x), r2(y)] as const;
  };

  const rows: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    rows.push(
      Array.from({ length: COLS }, (_, c) => {
        const [x, y] = project(c, r);
        return `${c === 0 ? "M" : "L"}${x} ${y}`;
      }).join("")
    );
  }
  const cols: string[] = [];
  for (let c = 0; c < COLS; c += 1) {
    cols.push(
      Array.from({ length: ROWS }, (_, r) => {
        const [x, y] = project(c, r);
        return `${r === 0 ? "M" : "L"}${x} ${y}`;
      }).join("")
    );
  }

  const stroke = tone === "dark" ? "#3b8ff0" : "#17104f";
  const op = tone === "dark" ? 0.28 : 0.1;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`}>
      <svg className="h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" fill="none">
        <defs>
          <linearGradient id={`terrain-fade-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.45" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id={`terrain-mask-${seed}`}>
            <rect width={W} height={H} fill={`url(#terrain-fade-${seed})`} />
          </mask>
        </defs>
        <g mask={`url(#terrain-mask-${seed})`} stroke={stroke} strokeOpacity={op} strokeWidth="1">
          {rows.map((d, i) => (
            <path key={`r${i}`} d={d} vectorEffect="non-scaling-stroke" />
          ))}
          {cols.map((d, i) => (
            <path key={`c${i}`} d={d} strokeOpacity={op * 0.6} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
    </div>
  );
}
