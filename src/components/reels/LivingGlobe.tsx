"use client";
import { useMemo } from "react";
import { pastel } from "@/lib/pastelTheme";

const icons = [
  { name: "Stripe", color: "#635BFF", orbitRx: 42, orbitRy: 18, speed: 22, phase: 0 },
  { name: "Adyen", color: "#0ABF53", orbitRx: 38, orbitRy: 20, speed: 26, phase: 40 },
  { name: "PayPal", color: "#009CDE", orbitRx: 44, orbitRy: 15, speed: 20, phase: 90 },
  { name: "Klarna", color: "#FFB3C7", orbitRx: 36, orbitRy: 22, speed: 28, phase: 130 },
  { name: "Apple", color: "#333", orbitRx: 40, orbitRy: 17, speed: 24, phase: 170 },
  { name: "GPay", color: "#34A853", orbitRx: 46, orbitRy: 14, speed: 21, phase: 210 },
  { name: "Visa", color: "#1A1F71", orbitRx: 34, orbitRy: 24, speed: 30, phase: 250 },
  { name: "MC", color: "#EB001B", orbitRx: 48, orbitRy: 12, speed: 19, phase: 290 },
  { name: "Alipay", color: "#1677FF", orbitRx: 37, orbitRy: 21, speed: 27, phase: 60 },
  { name: "WeChat", color: "#07C160", orbitRx: 43, orbitRy: 16, speed: 23, phase: 150 },
  { name: "PIX", color: "#32BCAD", orbitRx: 35, orbitRy: 23, speed: 25, phase: 320 },
  { name: "Skrill", color: "#862165", orbitRx: 41, orbitRy: 19, speed: 22, phase: 100 },
  { name: "iDEAL", color: "#CC0066", orbitRx: 39, orbitRy: 17, speed: 29, phase: 200 },
  { name: "CKO", color: "#4285F4", orbitRx: 45, orbitRy: 13, speed: 21, phase: 270 },
  { name: "Revolut", color: "#333", orbitRx: 33, orbitRy: 25, speed: 26, phase: 340 },
  { name: "WP", color: "#E4002B", orbitRx: 47, orbitRy: 11, speed: 24, phase: 30 },
  { name: "Amex", color: "#006FCF", orbitRx: 36, orbitRy: 20, speed: 28, phase: 180 },
  { name: "BLIK", color: "#E8590C", orbitRx: 42, orbitRy: 15, speed: 23, phase: 310 },
];

const ICON_FADE_DUR = 4000;

export default function LivingGlobe({ t }: { t: number }) {
  const lonOffset = (t / 60000) * 360 * 0.8;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        viewBox="0 0 100 100"
        className="absolute"
        style={{ width: "90%", height: "auto", maxHeight: "60%", top: "20%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Globe outline */}
        <circle cx="50" cy="50" r="38" fill="none" stroke={pastel.accent} strokeWidth="0.4" opacity="0.4" />

        {/* Latitude lines */}
        {[-15, 0, 15].map((lat) => (
          <ellipse key={`lat-${lat}`} cx="50" cy={50 + lat} rx="38"
            ry={Math.max(2, 38 * Math.cos((lat / 38) * Math.PI * 0.5) * 0.15)}
            fill="none" stroke={pastel.accent} strokeWidth="0.15" strokeDasharray="0.8 1.5" opacity="0.15" />
        ))}

        {/* Longitude lines */}
        {[0, 45, 90, 135].map((lon) => {
          const adj = lon + lonOffset;
          const skew = Math.sin((adj * Math.PI) / 180) * 38;
          const vis = Math.cos((adj * Math.PI) / 180);
          return (
            <ellipse key={`lon-${lon}`} cx={50 + skew * 0.15} cy="50"
              rx={Math.abs(vis) * 8 + 1} ry="38"
              fill="none" stroke={pastel.accent} strokeWidth="0.15" strokeDasharray="0.8 1.5"
              opacity={0.08 + Math.abs(vis) * 0.08} />
          );
        })}

        {/* Continent hints */}
        <g opacity="0.35" transform={`translate(${-lonOffset * 0.06}, 0)`}>
          <path d="M52,38 C54,40 55,44 54,48 C53,52 55,56 53,60" fill="none" stroke={pastel.accent} strokeWidth="0.5" />
          <path d="M35,35 C33,40 34,45 32,50 C30,55 31,60 30,64" fill="none" stroke={pastel.accent} strokeWidth="0.5" />
          <path d="M60,36 C63,38 65,40 66,44 C67,46 64,48 65,50" fill="none" stroke={pastel.accent} strokeWidth="0.5" />
        </g>
      </svg>

      {/* Orbiting icons — larger, more visible */}
      {icons.map((icon, i) => {
        const fadeStart = (i / icons.length) * ICON_FADE_DUR;
        const iconOpacity = t < fadeStart ? 0 : Math.min(1, (t - fadeStart) / 800);
        if (iconOpacity <= 0) return null;

        const angle = ((t / (icon.speed * 1000)) * 360 + icon.phase) % 360;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + icon.orbitRx * Math.cos(rad);
        const y = 50 + icon.orbitRy * Math.sin(rad);
        const isBehind = Math.sin(rad) < -0.2;
        const depthOpacity = isBehind ? 0.5 : 0.9;

        return (
          <div key={icon.name} className="absolute rounded-full flex items-center justify-center"
            style={{
              width: "min(56px, 6vh)", height: "min(56px, 6vh)",
              left: `${x}%`, top: `${20 + (y - 50) * 0.6 + 30}%`,
              transform: "translate(-50%, -50%)",
              background: "#fff", border: "1px solid rgba(217,119,87,0.3)",
              boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
              opacity: iconOpacity * depthOpacity,
              zIndex: isBehind ? 0 : 2,
            }}>
            <span className="font-mono font-bold" style={{ fontSize: "min(9px, 1vh)", color: icon.color }}>
              {icon.name}
            </span>
          </div>
        );
      })}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.35 }}>
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
