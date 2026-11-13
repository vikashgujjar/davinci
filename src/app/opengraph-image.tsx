import { ImageResponse } from "next/og";

export const alt = "DaVinci — Survey Drafting. Reimagined by AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const rings = Array.from({ length: 9 }, (_, i) => 80 + i * 70);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #17104F 0%, #0d0936 60%, #0b2a66 100%)",
          color: "white",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {rings.map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              right: -r / 2 + 160,
              top: -r / 2 + 120,
              width: r,
              height: r * 0.7,
              borderRadius: "50%",
              border: "1px solid rgba(59,143,240,0.25)",
            }}
          />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 4, color: "#6fb3f7" }}>
          <div style={{ width: 40, height: 2, background: "#087BEE" }} />
          AI-POWERED LAND SURVEY DRAFTING
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          <span>Survey Drafting.</span>
          <span style={{ color: "#6fb3f7" }}>Reimagined by AI.</span>
        </div>
        <div style={{ display: "flex", gap: 48, fontSize: 28, color: "rgba(255,255,255,0.8)" }}>
          <span>DaVinci</span>
          <span style={{ color: "#6fb3f7" }}>~1 hr → ~7 min</span>
          <span>Up to 75% lower drafting overhead</span>
        </div>
      </div>
    ),
    size
  );
}
