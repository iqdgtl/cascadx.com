"use client";
import { useEffect, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import worldTopoRaw from "world-atlas/land-110m.json";
import PhoneScreen from "./PhoneScreen";

// ── World data (module-level, loaded once) ────────────────────────────────────
const worldTopo = worldTopoRaw as unknown as Topology;
const land = feature(worldTopo, worldTopo.objects.land);
const graticule = geoGraticule().step([30, 30])();

// ── Scene coordinate space ────────────────────────────────────────────────────
const W = 600, H = 580;
const CX = W / 2, CY = H / 2;
const GLOBE_R = 228;
const ACCENT = "#d97757";

// Module-level projection + pathGen (mutated each frame, single-instance safe)
const projection = geoOrthographic()
  .scale(GLOBE_R)
  .translate([CX, CY])
  .clipAngle(90);
const pathGen = geoPath(projection);


// ── Ambient particles ─────────────────────────────────────────────────────────
const PARTICLES = [
  { x: "14%", y: "22%", s: 3, dur: "9s",  delay: "0s",  dx: "22px", dy: "-38px" },
  { x: "82%", y: "18%", s: 2, dur: "12s", delay: "2.5s",dx: "-15px",dy: "-42px" },
  { x: "22%", y: "74%", s: 4, dur: "10s", delay: "4s",  dx: "18px", dy: "-30px" },
  { x: "72%", y: "78%", s: 2, dur: "13s", delay: "1s",  dx: "-20px",dy: "-35px" },
  { x: "48%", y: "8%",  s: 3, dur: "11s", delay: "3s",  dx: "12px", dy: "40px"  },
  { x: "88%", y: "52%", s: 2, dur: "8s",  delay: "6s",  dx: "-18px",dy: "-28px" },
];

function Particles() {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute", left: p.x, top: p.y,
            width: `${p.s}px`, height: `${p.s}px`,
            borderRadius: "50%", background: ACCENT,
            opacity: 0, pointerEvents: "none", zIndex: 1,
            animation: `hero-particle-drift ${p.dur} ease-in-out ${p.delay} infinite`,
            ["--pdx" as string]: p.dx,
            ["--pdy" as string]: p.dy,
          }}
        />
      ))}
    </>
  );
}

// ── HeroScene ─────────────────────────────────────────────────────────────────
export default function HeroScene() {
  const [t, setT] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  // Entrance animation — play once per session, respect reduced-motion
  const [entered, setEntered] = useState(() => {
    const hasPlayed = sessionStorage.getItem("hx-entrance") === "1";
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return hasPlayed || prefersReduced;
  });

  useEffect(() => {
    if (entered) return;
    const id = setTimeout(() => {
      setEntered(true);
      sessionStorage.setItem("hx-entrance", "1");
    }, 1800);
    return () => clearTimeout(id);
  }, [entered]);

  // rAF loop — drives globe rotation
  useEffect(() => {
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      setT(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Recompute globe paths for this frame
  projection.rotate([(t / 90000) * 360, -15, 0]);
  const landPath  = pathGen(land) ?? "";
  const gridPath  = pathGen(graticule) ?? "";
  const ringPath  = pathGen({ type: "Sphere" } as Parameters<typeof pathGen>[0]) ?? "";

  return (
    <div
      className="hero-scene"
      style={{ position: "relative", width: "100%", height: "100%", minHeight: "500px" }}
    >
      {/* ── Particles (z=1) ───────────────────────────────── */}
      <Particles />

      {/* ── Globe SVG (z=2) ───────────────────────────────── */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2 }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hGlobeAtmo" cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.13" />
          </radialGradient>
          <radialGradient id="hBgGlow" cx="55%" cy="50%" r="55%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.08" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient bg glow */}
        <ellipse cx={CX} cy={CY} rx="310" ry="260" fill="url(#hBgGlow)" />

        {/* Atmospheric halo */}
        <circle cx={CX} cy={CY} r={GLOBE_R + 20} fill="url(#hGlobeAtmo)" />

        {/* Globe outline ring */}
        <path d={ringPath} fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.28" />

        {/* Lat/lon graticule */}
        <path d={gridPath} fill="none" stroke={ACCENT} strokeWidth="0.75" strokeDasharray="3 6" opacity="0.13" />

        {/* Continent outlines */}
        <path d={landPath} fill="none" stroke={ACCENT} strokeWidth="1.1" opacity="0.34" strokeLinejoin="round" />

      </svg>


      {/* ── iPhone position wrapper (z=10) ────────────────── */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 10 }}>
        {/* Entrance glow — DOM-order stacking puts it behind phone */}
        {!entered && (
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            transform: "scale(1.4)", borderRadius: "77px",
            background: "radial-gradient(ellipse at center, rgba(217,119,87,0.45) 0%, transparent 70%)",
            animation: "phone-entrance-glow 1.8s ease-in-out both",
            pointerEvents: "none",
          }} />
        )}
        {/* Phone body — titanium finish, breathing animation via CSS */}
        <div
          className={entered ? "hero-phone-frame" : "hero-phone-entering"}
          style={{
            width: "280px",
            height: "580px",
            borderRadius: "55px",
            background: "linear-gradient(165deg, #58585d 0%, #45454a 18%, #3a3a3c 45%, #2a2a2d 68%, #3a3a3c 88%, #45454a 100%)",
            boxShadow: [
              "0 80px 120px -20px rgba(0,0,0,0.6)",
              "0 40px 60px -20px rgba(0,0,0,0.4)",
              "0 0 0 1px rgba(255,255,255,0.12)",
              "inset 0 1px 0 rgba(255,255,255,0.18)",
              "inset 0 -1px 0 rgba(0,0,0,0.3)",
              "0 0 100px rgba(217,119,87,0.07)",
            ].join(", "),
            padding: "10px",
            boxSizing: "border-box",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Top frame light reflection */}
          <div style={{
            position: "absolute", top: 0, left: "22%", right: "22%",
            height: "2px", borderRadius: "0 0 3px 3px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
            zIndex: 20,
          }} />

          {/* Side edge highlight — left */}
          <div style={{
            position: "absolute", left: 0, top: "15%", bottom: "15%",
            width: "1px",
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.12) 70%, transparent)",
            zIndex: 20,
          }} />

          {/* Dynamic Island */}
          <div
            className="hero-phone-island"
            style={{
              position: "absolute", top: "21px", left: "50%",
              transform: "translateX(-50%)",
              width: "115px", height: "36px",
              background: "#000",
              borderRadius: "18px",
              zIndex: 20,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.5)",
            }}
          />

          {/* Action button (left — 95px from top) */}
          <div style={{
            position: "absolute", left: "-1.5px", top: "95px",
            width: "3px", height: "28px",
            background: "linear-gradient(180deg, #4a4a4e 0%, #38383c 50%, #2c2c2f 100%)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "inset 0.5px 0 0 rgba(255,255,255,0.18), inset 0 0.5px 0 rgba(255,255,255,0.12), inset 0 -0.5px 0 rgba(0,0,0,0.4)",
          }} />
          {/* Volume up (left — 135px from top) */}
          <div style={{
            position: "absolute", left: "-1.5px", top: "135px",
            width: "3px", height: "44px",
            background: "linear-gradient(180deg, #4a4a4e 0%, #38383c 50%, #2c2c2f 100%)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "inset 0.5px 0 0 rgba(255,255,255,0.18), inset 0 0.5px 0 rgba(255,255,255,0.12), inset 0 -0.5px 0 rgba(0,0,0,0.4)",
          }} />
          {/* Volume down (left — 184px from top) */}
          <div style={{
            position: "absolute", left: "-1.5px", top: "184px",
            width: "3px", height: "44px",
            background: "linear-gradient(180deg, #4a4a4e 0%, #38383c 50%, #2c2c2f 100%)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "inset 0.5px 0 0 rgba(255,255,255,0.18), inset 0 0.5px 0 rgba(255,255,255,0.12), inset 0 -0.5px 0 rgba(0,0,0,0.4)",
          }} />
          {/* Power button (right — 130px from top) */}
          <div style={{
            position: "absolute", right: "-1.5px", top: "130px",
            width: "3px", height: "68px",
            background: "linear-gradient(180deg, #4a4a4e 0%, #38383c 50%, #2c2c2f 100%)",
            borderRadius: "0 2px 2px 0",
            boxShadow: "inset -0.5px 0 0 rgba(255,255,255,0.18), inset 0 0.5px 0 rgba(255,255,255,0.12), inset 0 -0.5px 0 rgba(0,0,0,0.4)",
          }} />

          {/* Screen bezel inner shadow */}
          <div style={{
            position: "absolute",
            top: "10px", left: "10px", right: "10px", bottom: "10px",
            borderRadius: "46px",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.45), inset 0 4px 12px rgba(0,0,0,0.3)",
            pointerEvents: "none",
            zIndex: 12,
          }} />

          {/* Screen */}
          <div style={{
            width: "100%", height: "100%",
            borderRadius: "46px",
            overflow: "hidden",
            background: "#fafafa",
            position: "relative",
          }}>
            <PhoneScreen />
          </div>
        </div>
      </div>

    </div>
  );
}
