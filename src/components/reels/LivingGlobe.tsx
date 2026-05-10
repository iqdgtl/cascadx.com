"use client";
import { useMemo } from "react";
import { pastel } from "@/lib/pastelTheme";

/*
  LivingGlobe — slowly rotating outline globe with orbiting payment icons.
  Shared background for all 7 letter reels.
  Pure SVG + CSS transforms, 60fps via requestAnimationFrame (t passed as prop).
*/

// 15 payment icons with orbital parameters
const icons = [
  { name: "Stripe", color: "#635BFF", orbitRx: 42, orbitRy: 18, speed: 32, phase: 0 },
  { name: "Adyen", color: "#0ABF53", orbitRx: 38, orbitRy: 20, speed: 38, phase: 40 },
  { name: "PayPal", color: "#009CDE", orbitRx: 44, orbitRy: 15, speed: 28, phase: 90 },
  { name: "Klarna", color: "#FFB3C7", orbitRx: 36, orbitRy: 22, speed: 42, phase: 130 },
  { name: "Apple", color: "#666", orbitRx: 40, orbitRy: 17, speed: 35, phase: 170 },
  { name: "GPay", color: "#34A853", orbitRx: 46, orbitRy: 14, speed: 30, phase: 210 },
  { name: "Visa", color: "#1A1F71", orbitRx: 34, orbitRy: 24, speed: 45, phase: 250 },
  { name: "MC", color: "#EB001B", orbitRx: 48, orbitRy: 12, speed: 26, phase: 290 },
  { name: "Alipay", color: "#1677FF", orbitRx: 37, orbitRy: 21, speed: 40, phase: 60 },
  { name: "WeChat", color: "#07C160", orbitRx: 43, orbitRy: 16, speed: 33, phase: 150 },
  { name: "PIX", color: "#32BCAD", orbitRx: 35, orbitRy: 23, speed: 37, phase: 320 },
  { name: "Skrill", color: "#862165", orbitRx: 41, orbitRy: 19, speed: 29, phase: 100 },
];

// Fade-in schedule: icons appear over first 4 seconds
const ICON_FADE_DUR = 4000;

export default function LivingGlobe({ t }: { t: number }) {
  // Globe rotation angle (60s full rotation)
  const globeAngle = (t / 60000) * 360;
  // Longitude offset for "rotation" effect
  const lonOffset = globeAngle * 0.8;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.95 }}>
      <svg
        viewBox="0 0 100 100"
        className="absolute"
        style={{ width: "90%", height: "auto", maxHeight: "60%", top: "20%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Globe outline circle */}
        <circle cx="50" cy="50" r="38" fill="none" stroke={pastel.accent} strokeWidth="0.2" opacity="0.18" />

        {/* Latitude lines */}
        {[-15, 0, 15].map((lat) => (
          <ellipse
            key={`lat-${lat}`}
            cx="50"
            cy={50 + lat}
            rx="38"
            ry={Math.max(2, 38 * Math.cos((lat / 38) * Math.PI * 0.5) * 0.15)}
            fill="none"
            stroke={pastel.accent}
            strokeWidth="0.1"
            strokeDasharray="0.8 1.5"
            opacity="0.1"
          />
        ))}

        {/* Longitude lines (rotating) */}
        {[0, 45, 90, 135].map((lon) => {
          const adjustedLon = lon + lonOffset;
          const skew = Math.sin((adjustedLon * Math.PI) / 180) * 38;
          const visible = Math.cos((adjustedLon * Math.PI) / 180);
          return (
            <ellipse
              key={`lon-${lon}`}
              cx={50 + skew * 0.15}
              cy="50"
              rx={Math.abs(visible) * 8 + 1}
              ry="38"
              fill="none"
              stroke={pastel.accent}
              strokeWidth="0.1"
              strokeDasharray="0.8 1.5"
              opacity={0.06 + Math.abs(visible) * 0.06}
            />
          );
        })}

        {/* Simplified continent hints (very abstract) */}
        <g opacity="0.12" transform={`translate(${-lonOffset * 0.08}, 0)`}>
          {/* Europe/Africa hint */}
          <path d="M52,38 C54,40 55,44 54,48 C53,52 55,56 53,60" fill="none" stroke={pastel.accent} strokeWidth="0.3" />
          {/* Americas hint */}
          <path d="M35,35 C33,40 34,45 32,50 C30,55 31,60 30,64" fill="none" stroke={pastel.accent} strokeWidth="0.3" />
          {/* Asia hint */}
          <path d="M60,36 C63,38 65,40 66,44 C67,46 64,48 65,50" fill="none" stroke={pastel.accent} strokeWidth="0.3" />
        </g>
      </svg>

      {/* Orbiting payment icons */}
      {icons.map((icon, i) => {
        // Fade in over first 4s, staggered
        const fadeStart = (i / icons.length) * ICON_FADE_DUR;
        const iconOpacity = t < fadeStart ? 0 : Math.min(1, (t - fadeStart) / 800);
        if (iconOpacity <= 0) return null;

        // Orbital position
        const angle = ((t / (icon.speed * 1000)) * 360 + icon.phase) % 360;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + icon.orbitRx * Math.cos(rad);
        const y = 50 + icon.orbitRy * Math.sin(rad);

        // Depth: behind globe = lower opacity
        const isBehind = Math.sin(rad) < -0.2;
        const depthOpacity = isBehind ? 0.3 : 0.6;

        return (
          <div
            key={icon.name}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: "min(42px, 4.5vh)",
              height: "min(42px, 4.5vh)",
              left: `${x}%`,
              top: `${20 + (y - 50) * 0.6 + 30}%`, // map to frame position
              transform: "translate(-50%, -50%)",
              background: "#fff",
              border: `1px solid rgba(217,119,87,0.25)`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              opacity: iconOpacity * depthOpacity,
              zIndex: isBehind ? 0 : 2,
              filter: "saturate(0.8)",
            }}
          >
            <span
              className="font-mono font-bold"
              style={{ fontSize: "min(8px, 0.9vh)", color: icon.color }}
            >
              {icon.name}
            </span>
          </div>
        );
      })}

      {/* Occasional connection lines between nearby icons */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.15 }}>
        {icons.slice(0, 6).map((icon, i) => {
          const next = icons[(i + 3) % icons.length];
          const angle1 = ((t / (icon.speed * 1000)) * 360 + icon.phase) % 360;
          const angle2 = ((t / (next.speed * 1000)) * 360 + next.phase) % 360;
          const rad1 = (angle1 * Math.PI) / 180;
          const rad2 = (angle2 * Math.PI) / 180;
          const x1 = 50 + icon.orbitRx * Math.cos(rad1);
          const y1 = 50 + icon.orbitRy * Math.sin(rad1);
          const x2 = 50 + next.orbitRx * Math.cos(rad2);
          const y2 = 50 + next.orbitRy * Math.sin(rad2);
          const dist = Math.hypot(x2 - x1, y2 - y1);
          // Only show connection when icons are close
          const show = dist < 25 && ((t / 1000 + i) % 3) < 1;
          if (!show) return null;
          const phase = ((t / 1000 + i) % 1);
          return (
            <line
              key={`conn-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={pastel.accent}
              strokeWidth="0.15"
              opacity={phase < 0.25 ? phase * 4 : phase > 0.75 ? (1 - phase) * 4 : 1}
            />
          );
        })}
      </svg>
    </div>
  );
}
