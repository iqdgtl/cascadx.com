"use client";
import { useEffect, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import worldTopoRaw from "world-atlas/land-110m.json";
import PhoneScreen from "./PhoneScreen";

// ── World data ─────────────────────────────────────────────────────────────────
const worldTopo = worldTopoRaw as unknown as Topology;
const land = feature(worldTopo, worldTopo.objects.land);
const graticule = geoGraticule().step([30, 30])();

// ── Globe coordinate space ────────────────────────────────────────────────────
const GW = 600, GH = 580;
const CX = GW / 2, CY = GH / 2;
const GLOBE_R = 228;
const ACCENT = "#d97757";

const projection = geoOrthographic()
  .scale(GLOBE_R)
  .translate([CX, CY])
  .clipAngle(90);
const pathGen = geoPath(projection);

// ── Particles ─────────────────────────────────────────────────────────────────
const PARTICLES = [
  { x: "14%", y: "22%", s: 3, dur: "9s",  delay: "0s",   dx: "22px",  dy: "-38px" },
  { x: "82%", y: "18%", s: 2, dur: "12s", delay: "2.5s", dx: "-15px", dy: "-42px" },
  { x: "22%", y: "74%", s: 4, dur: "10s", delay: "4s",   dx: "18px",  dy: "-30px" },
  { x: "72%", y: "78%", s: 2, dur: "13s", delay: "1s",   dx: "-20px", dy: "-35px" },
  { x: "48%", y: "8%",  s: 3, dur: "11s", delay: "3s",   dx: "12px",  dy: "40px"  },
  { x: "88%", y: "52%", s: 2, dur: "8s",  delay: "6s",   dx: "-18px", dy: "-28px" },
];

function Particles() {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: p.x, top: p.y,
          width: `${p.s}px`, height: `${p.s}px`,
          borderRadius: "50%", background: ACCENT,
          opacity: 0, pointerEvents: "none", zIndex: 1,
          animation: `hero-particle-drift ${p.dur} ease-in-out ${p.delay} infinite`,
          ["--pdx" as string]: p.dx,
          ["--pdy" as string]: p.dy,
        }} />
      ))}
    </>
  );
}

// ── iPhone 15 Pro — Pure CSS, premium quality ────────────────────────────────
// Fixed container dimensions: 280 × 580 (never changes, no size jump)
const FW = 248;
const FH = 515;

function PremiumIPhone() {
  return (
    <div style={{
      // ROCK SOLID container — no transitions on width/height/opacity
      position: "relative",
      width: `${FW}px`,
      height: `${FH}px`,
    }}>
      {/* ── Titanium frame (outer shell) ───────────────── */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: 50,
        // Multi-stop premium titanium gradient
        background: `
          linear-gradient(135deg,
            #2d2d2f 0%,
            #4a4a4c 15%,
            #6b6b6d 32%,
            #3a3a3c 50%,
            #2a2a2c 68%,
            #4a4a4c 85%,
            #38383a 100%
          )
        `,
        boxShadow: `
          0 60px 80px -10px rgba(0,0,0,0.6),
          0 30px 40px -10px rgba(0,0,0,0.4),
          0 0 0 1px rgba(0,0,0,0.5),
          0 0 80px rgba(217,119,87,0.08)
        `,
      }} />

      {/* ── Frame top highlight (specular) ─────────────── */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 20,
        right: 20,
        height: 2,
        borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 20%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.35) 80%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 20,
      }} />

      {/* ── Frame edge highlight (left + right edges) ──── */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: 50,
        border: "1px solid transparent",
        background: "linear-gradient(90deg, rgba(26,15,10,0.15) 0%, transparent 15%, transparent 85%, rgba(26,15,10,0.15) 100%)",
        pointerEvents: "none",
        zIndex: 20,
      }} />

      {/* ── Screen bezel (inner black ring) ────────────── */}
      <div style={{
        position: "absolute",
        inset: 4,
        borderRadius: 46,
        background: "#000",
      }} />

      {/* ── Screen content area ────────────────────────── */}
      <div style={{
        position: "absolute",
        inset: 7,
        borderRadius: 43,
        overflow: "hidden",
        background: "#fafafa",
      }}>
        <PhoneScreen />

        {/* Screen glass reflection (over PhoneScreen) */}
        <div aria-hidden="true" style={{
          position: "absolute",
          inset: 0,
          borderRadius: 43,
          background: "linear-gradient(120deg, rgba(26,15,10,0.08) 0%, rgba(26,15,10,0.02) 30%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 55,
          animation: "screen-glass-reflect 8s cubic-bezier(0.42,0,0.58,1) infinite",
        }} />
      </div>

      {/* ── Dynamic Island ─────────────────────────────── */}
      <div style={{
        position: "absolute",
        top: 15,
        left: "50%",
        transform: "translateX(-50%)",
        width: 95,
        height: 28,
        borderRadius: 14,
        background: "#000",
        zIndex: 30,
        boxShadow: "inset 0 0 0 0.5px #222",
      }}>
        {/* Camera lens on right */}
        <div style={{
          position: "absolute",
          top: "50%",
          right: 7,
          transform: "translateY(-50%)",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#0a0a0a",
          boxShadow: "inset 0 0 0 1px #333",
        }}>
          <div style={{
            position: "absolute",
            inset: 2,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #1a1a1a 0%, #050505 70%)",
          }} />
          {/* Lens glint */}
          <div style={{
            position: "absolute",
            top: 1.5,
            left: 1.5,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
          }} />
        </div>
      </div>

      {/* ── Side buttons (left: Action, Volume Up, Volume Down) ── */}
      {/* Action button */}
      <div style={{
        position: "absolute",
        left: -2.5,
        top: 95,
        width: 3,
        height: 28,
        borderRadius: "1.5px 0 0 1.5px",
        background: "linear-gradient(90deg, #5a5a5c 0%, #8a8a8c 60%, #a8a8aa 100%)",
        boxShadow: "0 0.5px 0 rgba(26,15,10,0.3) inset, 0 -0.5px 0 rgba(0,0,0,0.5) inset",
        zIndex: 5,
      }} />

      {/* Volume up */}
      <div style={{
        position: "absolute",
        left: -2.5,
        top: 135,
        width: 3,
        height: 48,
        borderRadius: "1.5px 0 0 1.5px",
        background: "linear-gradient(90deg, #5a5a5c 0%, #8a8a8c 60%, #a8a8aa 100%)",
        boxShadow: "0 0.5px 0 rgba(26,15,10,0.3) inset, 0 -0.5px 0 rgba(0,0,0,0.5) inset",
        zIndex: 5,
      }} />

      {/* Volume down */}
      <div style={{
        position: "absolute",
        left: -2.5,
        top: 190,
        width: 3,
        height: 48,
        borderRadius: "1.5px 0 0 1.5px",
        background: "linear-gradient(90deg, #5a5a5c 0%, #8a8a8c 60%, #a8a8aa 100%)",
        boxShadow: "0 0.5px 0 rgba(26,15,10,0.3) inset, 0 -0.5px 0 rgba(0,0,0,0.5) inset",
        zIndex: 5,
      }} />

      {/* ── Right: Power/Sleep button ────────────────── */}
      <div style={{
        position: "absolute",
        right: -2.5,
        top: 135,
        width: 3,
        height: 72,
        borderRadius: "0 1.5px 1.5px 0",
        background: "linear-gradient(270deg, #5a5a5c 0%, #8a8a8c 60%, #a8a8aa 100%)",
        boxShadow: "0 0.5px 0 rgba(26,15,10,0.3) inset, 0 -0.5px 0 rgba(0,0,0,0.5) inset",
        zIndex: 5,
      }} />
    </div>
  );
}

// ── HeroScene ─────────────────────────────────────────────────────────────────
export default function HeroScene() {
  const [t, setT] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      setT(ts - startRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  projection.rotate([(t / 90000) * 360, -15, 0]);
  const landPath = pathGen(land) ?? "";
  const gridPath = pathGen(graticule) ?? "";
  const ringPath = pathGen({ type: "Sphere" } as Parameters<typeof pathGen>[0]) ?? "";

  return (
    <div
      className="hero-scene"
      style={{ position: "relative", width: "100%", height: "100%", minHeight: "530px" }}
    >
      <Particles />

      {/* Globe */}
      <svg
        viewBox={`0 0 ${GW} ${GH}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2 }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hGlobeAtmo" cx="50%" cy="50%" r="50%">
            <stop offset="72%"  stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.13" />
          </radialGradient>
          <radialGradient id="hBgGlow" cx="55%" cy="50%" r="55%">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.08" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={CX} cy={CY} rx="310" ry="260" fill="url(#hBgGlow)" />
        <circle  cx={CX} cy={CY} r={GLOBE_R + 20}  fill="url(#hGlobeAtmo)" />
        <path d={ringPath} fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.28" />
        <path d={gridPath} fill="none" stroke={ACCENT} strokeWidth="0.75" strokeDasharray="3 6" opacity="0.13" />
        <path d={landPath} fill="none" stroke={ACCENT} strokeWidth="1.1" opacity="0.34" strokeLinejoin="round" />
      </svg>

      {/* iPhone 15 Pro — centered, fixed size */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, calc(-50% + var(--phone-y, -30px)))",
        zIndex: 10,
      }} className="hero-phone-wrap">
        {/* Ground shadow */}
        <div aria-hidden="true" style={{
          position: "absolute",
          bottom: -20, left: "calc(50% - 80px)",
          width: 160, height: 38,
          background: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
          filter: "blur(20px)",
          animation: "iphone-shadow-float 10s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: -1,
        }} />

        <div className="hero-phone-frame">
          <PremiumIPhone />
        </div>
      </div>
    </div>
  );
}
