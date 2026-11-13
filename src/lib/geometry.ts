import { r2, seeded } from "./motion";

type Pt = [number, number];

/** Closed Catmull-Rom spline through points → cubic Bézier SVG path. */
export function closedSpline(pts: Pt[]): string {
  const n = pts.length;
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return d + "Z";
}

/** Open Catmull-Rom spline. */
export function openSpline(pts: Pt[]): string {
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return d;
}

/**
 * Concentric organic "topographic" rings around a peak.
 * Each ring shares the same harmonic noise so lines nest like real contours.
 */
export function contourRings(opts: {
  cx: number;
  cy: number;
  rings: number;
  r0: number;
  step: number;
  seed: number;
  squash?: number;
  samples?: number;
}): string[] {
  const { cx, cy, rings, r0, step, seed, squash = 0.72, samples = 28 } = opts;
  const rand = seeded(seed);
  const harmonics = Array.from({ length: 4 }, (_, i) => ({
    k: i + 2,
    a: (rand() * 0.16) / (i + 1),
    p: rand() * Math.PI * 2,
  }));
  const out: string[] = [];
  for (let ri = 0; ri < rings; ri++) {
    const r = r0 + ri * step;
    const growth = 1 + ri * 0.035;
    const pts: Pt[] = [];
    for (let s = 0; s < samples; s++) {
      const t = (s / samples) * Math.PI * 2;
      let wobble = 1;
      for (const h of harmonics) wobble += h.a * growth * Math.sin(h.k * t + h.p + ri * 0.05);
      pts.push([cx + Math.cos(t) * r * wobble, cy + Math.sin(t) * r * wobble * squash]);
    }
    out.push(closedSpline(pts));
  }
  return out;
}

/** Wavy horizontal lines — used for flowing contour bands. */
export function contourBands(opts: {
  width: number;
  height: number;
  lines: number;
  seed: number;
  amplitude?: number;
}): string[] {
  const { width, height, lines, seed, amplitude = 26 } = opts;
  const rand = seeded(seed);
  const waves = Array.from({ length: 3 }, (_, i) => ({
    f: (i + 1) * (0.6 + rand() * 0.9),
    p: rand() * Math.PI * 2,
    a: amplitude / (i + 1),
  }));
  const gap = height / (lines + 1);
  const out: string[] = [];
  for (let l = 0; l < lines; l++) {
    const y0 = gap * (l + 1);
    const pts: Pt[] = [];
    for (let x = -40; x <= width + 40; x += width / 14) {
      const u = (x / width) * Math.PI * 2;
      let y = y0;
      for (const w of waves) y += w.a * Math.sin(u * w.f + w.p + l * 0.18);
      pts.push([x, y]);
    }
    out.push(openSpline(pts));
  }
  return out;
}

/** Smooth pseudo-height field for terrain meshes. */
export function terrainHeight(x: number, y: number, seed = 1) {
  const s = seed * 0.37;
  return (
    Math.sin(x * 0.9 + s) * Math.cos(y * 0.7 - s) * 0.55 +
    Math.sin(x * 0.35 - y * 0.5 + s * 2) * 0.8 +
    Math.cos(x * 1.7 + y * 1.3) * 0.15
  );
}

/** Network graph: deterministic nodes + nearest-neighbour edges. */
export function network(opts: { width: number; height: number; count: number; seed: number; links?: number }) {
  const { width, height, count, seed, links = 2 } = opts;
  const rand = seeded(seed);
  const nodes = Array.from({ length: count }, () => ({
    x: r2(rand() * width),
    y: r2(rand() * height),
    r: r2(1.2 + rand() * 2.2),
  }));
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, links)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      });
  });
  return { nodes, edges };
}
