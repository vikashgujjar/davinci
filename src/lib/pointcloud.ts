import { terrainHeight } from "./geometry";
import { seeded } from "./motion";

/** A mountain peak in normalised terrain space (x, y in 0–1). */
export type Peak = { x: number; y: number; h: number; r: number };

export const RIDGE_PEAKS: Peak[] = [
  { x: 0.28, y: 0.36, h: 0.55, r: 0.1 },
  { x: 0.46, y: 0.27, h: 1, r: 0.09 },
  { x: 0.6, y: 0.32, h: 0.82, r: 0.08 },
  { x: 0.76, y: 0.28, h: 0.68, r: 0.09 },
  { x: 0.38, y: 0.55, h: 0.38, r: 0.12 },
  { x: 0.68, y: 0.58, h: 0.32, r: 0.12 },
];

export const WIDE_PEAKS: Peak[] = [
  { x: 0.14, y: 0.42, h: 0.55, r: 0.12 },
  { x: 0.32, y: 0.34, h: 0.78, r: 0.11 },
  { x: 0.5, y: 0.3, h: 0.92, r: 0.12 },
  { x: 0.68, y: 0.35, h: 0.82, r: 0.11 },
  { x: 0.86, y: 0.4, h: 0.6, r: 0.12 },
  { x: 0.42, y: 0.66, h: 0.36, r: 0.14 },
  { x: 0.76, y: 0.7, h: 0.32, r: 0.14 },
];

/**
 * A perspective "point cloud" terrain, as produced by drone / LiDAR capture.
 * Returns dots bucketed by elevation (so higher points can glow brighter)
 * plus faint mesh lines along each row. Deterministic, so it is identical
 * on the server and the client.
 */
export function pointCloud({
  w,
  h,
  cols = 48,
  rows = 22,
  seed = 1,
  peaks = RIDGE_PEAKS,
  relief = 0.55,
  levels = 4,
}: {
  w: number;
  h: number;
  cols?: number;
  rows?: number;
  seed?: number;
  peaks?: Peak[];
  relief?: number;
  levels?: number;
}) {
  const rand = seeded(seed);
  const pts: { x: number; y: number; e: number }[] = [];
  const mesh: string[] = [];
  const fmt = (n: number) => (w >= 400 ? Math.round(n) : Math.round(n * 10) / 10);
  let max = 0;

  for (let r = 0; r < rows; r++) {
    const v = r / (rows - 1); // 0 = far, 1 = near
    const scale = 0.8 + v * 0.2;
    let line = "";
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1);
      const ju = u + (rand() - 0.5) * (0.9 / cols);
      const jv = v + (rand() - 0.5) * (0.9 / rows);
      let e = 0;
      // separate summits (max, not sum) so the range reads as several mountains
      for (const p of peaks) e = Math.max(e, p.h * Math.exp(-((ju - p.x) ** 2 + ((jv - p.y) * 1.3) ** 2) / (2 * p.r * p.r)));
      // ridges and gullies: roughen the slopes in proportion to their height
      e += e * 0.22 * terrainHeight(ju * 26, jv * 18, seed + 3);
      e += 0.05 * (terrainHeight(ju * 9, jv * 7, seed) + 1.5);
      e = Math.max(e, 0);
      const x = w / 2 + (ju - 0.5) * w * scale;
      const y = h * 0.22 + jv * h * 0.74 - e * h * relief * scale;
      pts.push({ x, y, e });
      if (e > max) max = e;
      line += `${c ? "L" : "M"}${fmt(x)} ${fmt(y)}`;
    }
    if (r % 2 === 0) mesh.push(line);
  }

  const layers = Array.from({ length: levels }, () => "");
  for (const p of pts) {
    const i = Math.min(levels - 1, Math.floor(Math.sqrt(p.e / max) * levels));
    layers[i] += `M${fmt(p.x)} ${fmt(p.y)}h0`;
  }
  return { layers, mesh: mesh.join("") };
}
