"use client";
import { useMemo } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import worldTopoRaw from "world-atlas/land-110m.json";
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
const GLOBE_SIZE = 280; // SVG units
const CX = 200, CY = 200; // SVG center

// Pre-compute land feature from TopoJSON
const worldTopo = worldTopoRaw as unknown as Topology;
const land = feature(worldTopo, worldTopo.objects.land);
const graticule = geoGraticule().step([30, 30])();

export default function LivingGlobe({ t }: { t: number }) {
  // Rotation: 360° over 60s
  const rotation = (t / 60000) * 360;

  // D3 orthographic projection — real globe!
  const projection = useMemo(() => {
    return geoOrthographic()
      .scale(GLOBE_SIZE / 2)
      .translate([CX, CY])
      .clipAngle(90); // hide back side
  }, []);

  // Update rotation
  projection.rotate([rotation, -15, 0]); // -15° tilt for nicer angle

  const pathGen = geoPath(projection);
  const landPath = pathGen(land) || "";
  const graticulePath = pathGen(graticule) || "";
  const outlinePath = pathGen({ type: "Sphere" }) || "";

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Globe SVG — real orthographic Earth */}
      <svg
        viewBox={`${CX - GLOBE_SIZE / 2 - 20} ${CY - GLOBE_SIZE / 2 - 20} ${GLOBE_SIZE + 40} ${GLOBE_SIZE + 40}`}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ width: "65%", top: "18%", height: "auto", maxHeight: "50%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Atmospheric glow */}
        <defs>
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor={pastel.accent} stopOpacity="0" />
            <stop offset="100%" stopColor={pastel.accent} stopOpacity="0.08" />
          </radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r={GLOBE_SIZE / 2 + 15} fill="url(#globeGlow)" />

        {/* Globe outline ring */}
        <path d={outlinePath} fill="none" stroke={pastel.accent} strokeWidth="2" opacity="0.3" />

        {/* Latitude/longitude graticule grid */}
        <path d={graticulePath} fill="none" stroke={pastel.accent} strokeWidth="0.8" strokeDasharray="2 4" opacity="0.12" />

        {/* Real continent outlines */}
        <path d={landPath} fill="none" stroke={pastel.accent} strokeWidth="1.2" opacity="0.5" strokeLinejoin="round" />
      </svg>

      {/* Orbiting payment icons with labels */}
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
              top: `${18 + (y - 50) * 0.5 + 30}%`,
              transform: "translate(-50%, -50%)",
              opacity: iconOpacity * depthOpacity,
              zIndex: isBehind ? 1 : 2,
            }}
          >
            <div className="rounded-full flex items-center justify-center"
              style={{
                width: "min(48px, 5vh)", height: "min(48px, 5vh)",
                background: "#fff",
                border: "1px solid rgba(217,119,87,0.25)",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              }}>
              <span className="font-mono font-bold" style={{ fontSize: "min(8px, 0.85vh)", color: icon.color }}>
                {icon.name.length > 6 ? icon.name.slice(0, 3) : icon.name}
              </span>
            </div>
            <span className="font-mono font-medium mt-1 whitespace-nowrap"
              style={{ fontSize: "min(11px, 1.2vh)", color: `rgba(42,31,28,${depthOpacity * 0.7})`, letterSpacing: "0.5px" }}>
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
