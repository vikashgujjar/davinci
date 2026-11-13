type Props = {
  className?: string;
  tone?: "light" | "dark";
  /** Show crosshair survey control markers */
  markers?: boolean;
};

const MARKERS = [
  { x: "3%", y: "14%", label: "N 4,210.00", right: false },
  { x: "97%", y: "10%", label: "E 1,880.00", right: true },
  { x: "97%", y: "90%", label: "CP-04", right: true },
  { x: "3%", y: "94%", label: "BM 102.4", right: false },
];

/** CSS-generated survey grid (minor + major lines) with control-point crosshairs. */
export function SurveyGridBackground({ className = "", tone = "light", markers = true }: Props) {
  const minor = tone === "dark" ? "rgb(111 179 247 / 0.07)" : "rgb(23 16 79 / 0.045)";
  const major = tone === "dark" ? "rgb(111 179 247 / 0.13)" : "rgb(23 16 79 / 0.075)";
  const ink = tone === "dark" ? "text-electric-300/50" : "text-deep/30";

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 mask-radial"
        style={{
          backgroundImage: `linear-gradient(${major} 1px, transparent 1px), linear-gradient(90deg, ${major} 1px, transparent 1px), linear-gradient(${minor} 1px, transparent 1px), linear-gradient(90deg, ${minor} 1px, transparent 1px)`,
          backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
          backgroundPosition: "-1px -1px",
        }}
      />
      {markers && (
        <div className={`hidden xl:block ${ink}`}>
          {MARKERS.map((m) => (
            <div key={m.label} className="absolute" style={{ left: m.x, top: m.y }}>
              <svg width="44" height="44" viewBox="0 0 44 44" className="-translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor">
                <circle cx="22" cy="22" r="9" />
                <path d="M22 4v12M22 28v12M4 22h12M28 22h12" />
              </svg>
              <span className={`absolute top-3 whitespace-nowrap font-mono text-[10px] tracking-wider ${m.right ? "right-5" : "left-5"}`}>{m.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
