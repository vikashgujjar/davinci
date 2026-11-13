import { network } from "@/lib/geometry";

type Props = {
  className?: string;
  tone?: "light" | "dark";
  count?: number;
  seed?: number;
};

/** Geometric AI network — nodes, links, a few animated "data" edges. */
export function AINetworkBackground({ className = "", tone = "light", count = 46, seed = 5 }: Props) {
  const W = 1280;
  const H = 760;
  const { nodes, edges } = network({ width: W, height: H, count, seed, links: 2 });
  const line = tone === "dark" ? "#6fb3f7" : "#17104f";
  const lineOpacity = tone === "dark" ? 0.18 : 0.08;
  const nodeFill = tone === "dark" ? "#6fb3f7" : "#087bee";

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none">
        <g stroke={line} strokeOpacity={lineOpacity}>
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
          ))}
        </g>
        {/* data pulses travelling along a subset of edges */}
        <g stroke="#087bee" strokeOpacity={tone === "dark" ? 0.7 : 0.45} strokeWidth="1.4" strokeDasharray="4 36">
          {edges
            .filter((_, i) => i % 6 === 0)
            .map(([a, b], i) => (
              <line
                key={i}
                x1={nodes[a].x}
                y1={nodes[a].y}
                x2={nodes[b].x}
                y2={nodes[b].y}
                className="motion-safe:animate-dash"
                style={{ animationDelay: `${(i % 5) * -0.6}s` }}
              />
            ))}
        </g>
        <g fill={nodeFill}>
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} fillOpacity={i % 7 === 0 ? 0.65 : 0.28} />
          ))}
        </g>
        <g stroke={nodeFill} strokeOpacity="0.35">
          {nodes
            .filter((_, i) => i % 7 === 0)
            .map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r={n.r + 6} />
            ))}
        </g>
      </svg>
    </div>
  );
}
