type Props = { className?: string };

/**
 * Blueprint-style background for dark indigo sections: fine grid,
 * coordinate rulers along the edges, dimension lines and precision rings.
 */
export function BlueprintBackground({ className = "" }: Props) {
  const ticks = Array.from({ length: 33 }, (_, i) => i);
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgb(111 179 247 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(111 179 247 / 0.08) 1px, transparent 1px), linear-gradient(rgb(111 179 247 / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(111 179 247 / 0.035) 1px, transparent 1px)",
          backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1280 900" preserveAspectRatio="xMidYMid slice" fill="none">
        {/* top ruler */}
        <g stroke="#6fb3f7" strokeOpacity="0.28">
          {ticks.map((i) => (
            <line key={`t${i}`} x1={i * 40} y1="0" x2={i * 40} y2={i % 4 === 0 ? 16 : 8} />
          ))}
          {ticks.map((i) => (
            <line key={`l${i}`} x1="0" y1={i * 40} x2={i % 4 === 0 ? 16 : 8} y2={i * 40} />
          ))}
        </g>
        <g fill="#6fb3f7" fillOpacity="0.35" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1">
          {[0, 4, 8, 12, 16, 20, 24, 28].map((i) => (
            <text key={i} x={i * 40 + 4} y="28">{`${i * 10}.00`}</text>
          ))}
        </g>
        {/* precision target rings */}
        <g stroke="#3b8ff0" strokeOpacity="0.22" transform="translate(1110 160)">
          <circle r="120" />
          <circle r="84" strokeDasharray="2 6" />
          <circle r="48" />
          <circle r="6" fill="#3b8ff0" fillOpacity="0.4" />
          <path d="M-150 0H-60M60 0H150M0 -150V-60M0 60V150" />
        </g>
        {/* dimension line */}
        <g stroke="#6fb3f7" strokeOpacity="0.25" transform="translate(120 820)">
          <path d="M0 0H520M0 -10V10M520 -10V10" />
          <path d="M0 0l10 -4v8zM520 0l-10 -4v8z" fill="#6fb3f7" fillOpacity="0.25" />
          <text x="230" y="-8" fill="#6fb3f7" fillOpacity="0.4" stroke="none" fontFamily="ui-monospace, monospace" fontSize="10">
            S 89°42&apos;10&quot; E · 152.40
          </text>
        </g>
        {/* faint polygon parcel */}
        <path
          d="M860 560 L1060 520 L1150 700 L960 800 L820 720 Z"
          stroke="#3b8ff0"
          strokeOpacity="0.2"
          strokeDasharray="6 6"
          className="motion-safe:animate-dash"
        />
      </svg>
    </div>
  );
}
