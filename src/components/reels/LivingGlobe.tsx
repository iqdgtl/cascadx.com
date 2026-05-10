"use client";
import { pastel } from "@/lib/pastelTheme";

const icons = [
  { name: "Stripe", color: "#635BFF", orbitRx: 42, orbitRy: 18, speed: 22, phase: 0 },
  { name: "Adyen", color: "#0ABF53", orbitRx: 38, orbitRy: 20, speed: 26, phase: 40 },
  { name: "PayPal", color: "#009CDE", orbitRx: 44, orbitRy: 15, speed: 20, phase: 90 },
  { name: "Klarna", color: "#FFB3C7", orbitRx: 36, orbitRy: 22, speed: 28, phase: 130 },
  { name: "Apple Pay", color: "#333", orbitRx: 40, orbitRy: 17, speed: 24, phase: 170 },
  { name: "Google Pay", color: "#34A853", orbitRx: 46, orbitRy: 14, speed: 21, phase: 210 },
  { name: "Visa", color: "#1A1F71", orbitRx: 34, orbitRy: 24, speed: 30, phase: 250 },
  { name: "Mastercard", color: "#EB001B", orbitRx: 48, orbitRy: 12, speed: 19, phase: 290 },
  { name: "Alipay", color: "#1677FF", orbitRx: 37, orbitRy: 21, speed: 27, phase: 60 },
  { name: "WeChat", color: "#07C160", orbitRx: 43, orbitRy: 16, speed: 23, phase: 150 },
  { name: "PIX", color: "#32BCAD", orbitRx: 35, orbitRy: 23, speed: 25, phase: 320 },
  { name: "Skrill", color: "#862165", orbitRx: 41, orbitRy: 19, speed: 22, phase: 100 },
  { name: "iDEAL", color: "#CC0066", orbitRx: 39, orbitRy: 17, speed: 29, phase: 200 },
  { name: "Checkout", color: "#4285F4", orbitRx: 45, orbitRy: 13, speed: 21, phase: 270 },
  { name: "Revolut", color: "#333", orbitRx: 33, orbitRy: 25, speed: 26, phase: 340 },
  { name: "Worldpay", color: "#E4002B", orbitRx: 47, orbitRy: 11, speed: 24, phase: 30 },
  { name: "Amex", color: "#006FCF", orbitRx: 36, orbitRy: 20, speed: 28, phase: 180 },
];

const ICON_FADE_DUR = 4000;

export default function LivingGlobe({ t }: { t: number }) {
  const lonOffset = (t / 60000) * 360 * 0.8;

  return (
    /* z-index 1 — entire globe layer sits BEHIND foreground text */
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Globe SVG — clean: outlines + dotted grid only */}
      <svg
        viewBox="0 0 100 100"
        className="absolute left-1/2 -translate-x-1/2"
        style={{ width: "90%", top: "20%", height: "auto", maxHeight: "55%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Globe outline circle */}
        <circle cx="50" cy="50" r="38" fill="none" stroke={pastel.accent} strokeWidth="0.4" opacity="0.4" />

        {/* Latitude lines — dotted */}
        {[-18, -8, 0, 8, 18].map(lat => (
          <ellipse key={`lat${lat}`} cx="50" cy={50 + lat} rx={38 * Math.cos((Math.abs(lat) / 40) * Math.PI * 0.5)} ry="0.3"
            fill="none" stroke={pastel.accent} strokeWidth="0.12" strokeDasharray="2 6" opacity="0.15" />
        ))}

        {/* Longitude lines — dotted, rotating */}
        {[0, 36, 72, 108, 144].map(lon => {
          const adj = lon + lonOffset;
          const vis = Math.cos((adj * Math.PI) / 180);
          const skew = Math.sin((adj * Math.PI) / 180) * 38;
          return (
            <ellipse key={`lon${lon}`} cx={50 + skew * 0.12} cy="50"
              rx={Math.max(0.5, Math.abs(vis) * 7)} ry="38"
              fill="none" stroke={pastel.accent} strokeWidth="0.12" strokeDasharray="2 6"
              opacity={0.05 + Math.abs(vis) * 0.1} />
          );
        })}

        {/* Continent outlines — minimal strokes, NO fills */}
        <g opacity="0.45" transform={`translate(${-lonOffset * 0.04}, 0)`}>
          {/* Europe/Africa */}
          <path d="M53,36 C55,39 56,43 55,47 C54,51 55,55 53,59 C52,62 51,64 50,66" fill="none" stroke={pastel.accent} strokeWidth="0.6" strokeLinecap="round" />
          {/* Americas */}
          <path d="M36,33 C34,38 35,43 33,48 C31,53 32,58 31,62 C30,65 29,67 28,68" fill="none" stroke={pastel.accent} strokeWidth="0.6" strokeLinecap="round" />
          {/* Asia */}
          <path d="M61,34 C64,37 66,40 67,43 C68,45 66,47 67,50 C68,52 70,53 69,55" fill="none" stroke={pastel.accent} strokeWidth="0.6" strokeLinecap="round" />
          {/* Australia hint */}
          <path d="M66,58 C68,59 69,61 68,63" fill="none" stroke={pastel.accent} strokeWidth="0.4" strokeLinecap="round" />
        </g>
      </svg>

      {/* Orbiting payment icons with labels — z-index 2 */}
      {icons.map((icon, i) => {
        const fadeStart = (i / icons.length) * ICON_FADE_DUR;
        const iconOpacity = t < fadeStart ? 0 : Math.min(1, (t - fadeStart) / 800);
        if (iconOpacity <= 0) return null;

        const angle = ((t / (icon.speed * 1000)) * 360 + icon.phase) % 360;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + icon.orbitRx * Math.cos(rad);
        const y = 50 + icon.orbitRy * Math.sin(rad);
        const isBehind = Math.sin(rad) < -0.2;
        const depthOpacity = isBehind ? 0.45 : 0.9;

        return (
          <div key={icon.name}
            className="absolute flex flex-col items-center"
            style={{
              left: `${x}%`,
              top: `${20 + (y - 50) * 0.55 + 30}%`,
              transform: "translate(-50%, -50%)",
              opacity: iconOpacity * depthOpacity,
              zIndex: isBehind ? 1 : 2,
            }}
          >
            {/* Badge */}
            <div className="rounded-full flex items-center justify-center"
              style={{
                width: "min(48px, 5vh)", height: "min(48px, 5vh)",
                background: "#fff",
                border: "1px solid rgba(217,119,87,0.25)",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              <span className="font-mono font-bold" style={{ fontSize: "min(8px, 0.85vh)", color: icon.color }}>
                {icon.name.length > 6 ? icon.name.slice(0, 3) : icon.name}
              </span>
            </div>
            {/* Label — always upright */}
            <span className="font-mono font-medium mt-1 whitespace-nowrap"
              style={{
                fontSize: "min(11px, 1.2vh)",
                color: `rgba(42,31,28,${depthOpacity * 0.7})`,
                letterSpacing: "0.5px",
              }}
            >
              {icon.name}
            </span>
          </div>
        );
      })}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.3, zIndex: 1 }}>
        {icons.slice(0, 8).map((icon, i) => {
          const next = icons[(i + 3) % icons.length];
          const a1 = ((t / (icon.speed * 1000)) * 360 + icon.phase) % 360;
          const a2 = ((t / (next.speed * 1000)) * 360 + next.phase) % 360;
          const r1 = (a1 * Math.PI) / 180, r2 = (a2 * Math.PI) / 180;
          const x1 = 50 + icon.orbitRx * Math.cos(r1), y1 = 50 + icon.orbitRy * Math.sin(r1);
          const x2 = 50 + next.orbitRx * Math.cos(r2), y2 = 50 + next.orbitRy * Math.sin(r2);
          const dist = Math.hypot(x2 - x1, y2 - y1);
          const show = dist < 30 && ((t / 800 + i) % 2.5) < 0.8;
          if (!show) return null;
          const phase = ((t / 800 + i) % 0.8) / 0.8;
          return (
            <line key={`c-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={pastel.accent} strokeWidth="0.2"
              opacity={phase < 0.25 ? phase * 4 : phase > 0.75 ? (1 - phase) * 4 : 1} />
          );
        })}
      </svg>
    </div>
  );
}
