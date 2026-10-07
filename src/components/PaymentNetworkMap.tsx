"use client";

import { useEffect, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const worldData = require("world-atlas/land-110m.json") as any;

const SVG_W = 1200;
const SVG_H = 780;
const CX = 600;
const CY = 390;
const GLOBE_R = 200;

// Float animation params indexed by animIdx (varied durations/delays for organic feel)
const FLOAT_PARAMS = [
  { dur: "5.2s", delay: "0s"   },
  { dur: "6.8s", delay: "0.3s" },
  { dur: "4.7s", delay: "1.1s" },
  { dur: "7.3s", delay: "0.7s" },
  { dur: "5.8s", delay: "1.8s" },
  { dur: "6.4s", delay: "0.5s" },
  { dur: "4.9s", delay: "2.1s" },
  { dur: "7.1s", delay: "1.4s" },
  { dur: "5.5s", delay: "0.9s" },
  { dur: "6.7s", delay: "2.5s" },
  { dur: "4.6s", delay: "0.2s" },
  { dur: "7.4s", delay: "1.6s" },
  { dur: "5.3s", delay: "2.8s" },
  { dur: "6.2s", delay: "0.6s" },
  { dur: "4.8s", delay: "1.9s" },
  { dur: "7.0s", delay: "1.2s" },
  { dur: "5.9s", delay: "0s"   },
  { dur: "6.5s", delay: "2.3s" },
];

// animIdx = clockwise entrance order (0 = first to appear)
// Inner ring: r=255 at 45° increments; Outer ring: r=325 at 36° increments
const PROVIDERS = [
  // Inner ring (r=255), clockwise from 12 o'clock
  { name: "Alipay",        dx: 0,    dy: -255, mobile: true,  animIdx: 0  },
  { name: "Visa",          dx: 180,  dy: -180, mobile: true,  animIdx: 3  },
  { name: "Apple Pay",     dx: 255,  dy: 0,    mobile: true,  animIdx: 5  },
  { name: "Mastercard",    dx: 180,  dy: 180,  mobile: true,  animIdx: 7  },
  { name: "Google Pay",    dx: 0,    dy: 255,  mobile: true,  animIdx: 9  },
  { name: "PayPal",        dx: -180, dy: 180,  mobile: true,  animIdx: 12 },
  { name: "Stripe",        dx: -255, dy: 0,    mobile: true,  animIdx: 14 },
  { name: "WeChat Pay",    dx: -180, dy: -180, mobile: true,  animIdx: 16 },
  // Outer ring (r=325), every 36° clockwise from 12 o'clock
  { name: "GrabPay",       dx: 0,    dy: -325, mobile: false, animIdx: 1  },
  { name: "GCash",         dx: 191,  dy: -263, mobile: false, animIdx: 2  },
  { name: "UPI",           dx: 309,  dy: -100, mobile: false, animIdx: 4  },
  { name: "Paytm",         dx: 309,  dy: 100,  mobile: false, animIdx: 6  },
  { name: "PayPay",        dx: 191,  dy: 263,  mobile: false, animIdx: 8  },
  { name: "OVO",           dx: 0,    dy: 325,  mobile: false, animIdx: 10 },
  { name: "Kakao Pay",     dx: -191, dy: 263,  mobile: false, animIdx: 11 },
  { name: "SEPA",          dx: -309, dy: 100,  mobile: false, animIdx: 13 },
  { name: "BLIK",          dx: -309, dy: -100, mobile: false, animIdx: 15 },
  { name: "Bank Transfer", dx: -191, dy: -263, mobile: false, animIdx: 17 },
];

// ─── Brand logo SVGs ──────────────────────────────────────────────────────────
function ProviderLogo({ name }: { name: string }) {
  switch (name) {

    case "Visa":
      return (
        <svg viewBox="0 0 54 18" width="42" height="14" style={{ display: "block" }} aria-hidden>
          <text x="27" y="15" textAnchor="middle" fill="#1A1F71"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="18" letterSpacing="-0.3">
            VISA
          </text>
        </svg>
      );

    case "Mastercard":
      return (
        <svg viewBox="0 0 40 26" width="40" height="26" style={{ display: "block" }} aria-hidden>
          <circle cx="14" cy="13" r="13" fill="#EB001B"/>
          <circle cx="26" cy="13" r="13" fill="#F79E1B" opacity="0.95"/>
        </svg>
      );

    case "Apple Pay":
      return (
        <svg viewBox="0 0 52 22" width="46" height="19" style={{ display: "block" }} aria-hidden>
          <g transform="scale(1.18) translate(0.5, 0.5)">
            <path fill="#000" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z"/>
          </g>
          <text x="38" y="15" textAnchor="middle" fill="#000"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="600" fontSize="10">
            Pay
          </text>
        </svg>
      );

    case "Google Pay":
      return (
        <svg viewBox="0 0 52 22" width="46" height="19" style={{ display: "block" }} aria-hidden>
          <text x="11" y="18" textAnchor="middle" fill="#4285F4"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="700" fontSize="20">
            G
          </text>
          <text x="34" y="17" textAnchor="middle" fill="#5F6368"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="500" fontSize="12">
            Pay
          </text>
        </svg>
      );

    case "PayPal":
      return (
        <svg viewBox="0 0 52 22" width="46" height="19" style={{ display: "block" }} aria-hidden>
          <text x="9" y="17" fill="#003087"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="15">
            Pay
          </text>
          <text x="29" y="17" fill="#009CDE"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="15">
            Pal
          </text>
        </svg>
      );

    case "Stripe":
      return (
        <svg viewBox="0 0 50 18" width="42" height="14" style={{ display: "block" }} aria-hidden>
          <text x="25" y="14" textAnchor="middle" fill="#635BFF"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.2">
            stripe
          </text>
        </svg>
      );

    case "Alipay":
      return (
        <svg viewBox="0 0 34 34" width="32" height="32" style={{ display: "block" }} aria-hidden>
          <circle cx="17" cy="17" r="16" fill="#00A3E0"/>
          <text x="17" y="24" textAnchor="middle" fill="#fff"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="20">
            a
          </text>
        </svg>
      );

    case "WeChat Pay":
      return (
        <svg viewBox="0 0 34 34" width="32" height="32" style={{ display: "block" }} aria-hidden>
          <circle cx="17" cy="17" r="16" fill="#07C160"/>
          <ellipse cx="13.5" cy="14" rx="7" ry="5.5" fill="#fff" opacity="0.9"/>
          <ellipse cx="20" cy="19" rx="5.5" ry="4.5" fill="#fff" opacity="0.75"/>
        </svg>
      );

    case "GrabPay":
      return (
        <svg viewBox="0 0 50 20" width="42" height="16" style={{ display: "block" }} aria-hidden>
          <text x="25" y="15" textAnchor="middle" fill="#00B14F"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="15" letterSpacing="-0.2">
            Grab
          </text>
        </svg>
      );

    case "GCash":
      return (
        <svg viewBox="0 0 50 20" width="42" height="16" style={{ display: "block" }} aria-hidden>
          <text x="25" y="15" textAnchor="middle" fill="#007DC5"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="800" fontSize="14" letterSpacing="-0.2">
            GCash
          </text>
        </svg>
      );

    case "UPI":
      return (
        <svg viewBox="0 0 48 24" width="42" height="20" style={{ display: "block" }} aria-hidden>
          <text x="24" y="15" textAnchor="middle" fill="#FF6B00"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="16" letterSpacing="1">
            UPI
          </text>
          <rect x="6" y="18" width="36" height="2.5" rx="1.25" fill="#138808"/>
        </svg>
      );

    case "Paytm":
      return (
        <svg viewBox="0 0 50 20" width="42" height="15" style={{ display: "block" }} aria-hidden>
          <text x="25" y="15" textAnchor="middle" fill="#00BAF2"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="800" fontSize="14" letterSpacing="-0.2">
            Paytm
          </text>
        </svg>
      );

    case "PayPay":
      return (
        <svg viewBox="0 0 52 18" width="44" height="14" style={{ display: "block" }} aria-hidden>
          <text x="26" y="14" textAnchor="middle" fill="#FF0033"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="13" letterSpacing="-0.3">
            PayPay
          </text>
        </svg>
      );

    case "OVO":
      return (
        <svg viewBox="0 0 50 22" width="40" height="17" style={{ display: "block" }} aria-hidden>
          <text x="25" y="17" textAnchor="middle" fill="#4C3494"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="19" letterSpacing="0.5">
            OVO
          </text>
        </svg>
      );

    case "Kakao Pay":
      return (
        <svg viewBox="0 0 52 24" width="44" height="20" style={{ display: "block" }} aria-hidden>
          <circle cx="13" cy="12" r="11" fill="#FEE500"/>
          <text x="13" y="17" textAnchor="middle" fill="#3C1E1E"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="13">
            K
          </text>
          <text x="35" y="17" textAnchor="middle" fill="#3C1E1E"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="700" fontSize="10">
            Pay
          </text>
        </svg>
      );

    case "SEPA":
      return (
        <svg viewBox="0 0 52 22" width="46" height="19" style={{ display: "block" }} aria-hidden>
          <circle cx="12" cy="11" r="10" fill="#003399"/>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 - 90) * Math.PI / 180;
            return <circle key={i} cx={12 + Math.cos(a) * 6.5} cy={11 + Math.sin(a) * 6.5} r="1.1" fill="#FFCC00"/>;
          })}
          <text x="35" y="16" textAnchor="middle" fill="#003399"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="800" fontSize="11">
            SEPA
          </text>
        </svg>
      );

    case "BLIK":
      return (
        <svg viewBox="0 0 46 20" width="40" height="16" style={{ display: "block" }} aria-hidden>
          <text x="23" y="15" textAnchor="middle" fill="#E4003A"
            fontFamily="Arial,Helvetica,sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.3">
            blik
          </text>
        </svg>
      );

    case "Bank Transfer":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" style={{ display: "block" }} aria-hidden>
          <path d="M16 4 L29 14 H3 Z" fill="#d97757"/>
          <rect x="3" y="14" width="26" height="2" rx="0.5" fill="#d97757"/>
          <rect x="5" y="16" width="3" height="10" rx="0.5" fill="#d97757"/>
          <rect x="10.5" y="16" width="3" height="10" rx="0.5" fill="#d97757"/>
          <rect x="16" y="16" width="3" height="10" rx="0.5" fill="#d97757"/>
          <rect x="21.5" y="16" width="3" height="10" rx="0.5" fill="#d97757"/>
          <rect x="3" y="25.5" width="26" height="2.5" rx="1" fill="#d97757"/>
        </svg>
      );

    default:
      return (
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 11, color: "#2a1f1c" }}>
          {name.slice(0, 3).toUpperCase()}
        </span>
      );
  }
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { target: 1000, suffix: "+", label: "PSP & wallet integrations", decimal: false },
  { target: 180,  suffix: "+", label: "Countries supported",        decimal: false },
  { target: 98.5, suffix: "%", label: "Uptime SLA",                 decimal: true  },
];

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

// ─── Component ────────────────────────────────────────────────────────────────
export default function PaymentNetworkMap() {
  const sectionRef   = useRef<HTMLElement>(null);
  const landRef      = useRef<SVGPathElement>(null);
  const graticuleRef = useRef<SVGPathElement>(null);
  const rotRef       = useRef(0);
  const [visible, setVisible]       = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null]);

  // Globe rotation
  useEffect(() => {
    const proj = geoOrthographic().scale(GLOBE_R).translate([CX, CY]).clipAngle(90);
    const pathGen = geoPath(proj);
    const land = feature(worldData as unknown as Topology, worldData.objects.land as GeometryCollection);
    const graticule = geoGraticule()();
    let raf: number;
    const tick = () => {
      rotRef.current += 360 / (90 * 60);
      proj.rotate([rotRef.current, -20]);
      const ld = pathGen(land);
      const gd = pathGen(graticule);
      if (landRef.current && ld)      landRef.current.setAttribute("d", ld);
      if (graticuleRef.current && gd) graticuleRef.current.setAttribute("d", gd);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Scroll trigger
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Stats count-up
  useEffect(() => {
    if (!visible) return;
    STATS.forEach(({ target, suffix, decimal }, i) => {
      const el = statRefs.current[i];
      if (!el) return;
      const start = performance.now();
      const dur = 1600;
      const update = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const val = target * easeOutCubic(t);
        el.textContent = (decimal ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
        if (t < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    });
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      id="payment-network"
      style={{ background: "#f5efe6", position: "relative", padding: "120px 28px 0", overflow: "hidden" }}
    >
      {/* Heading */}
      <div style={{
        maxWidth: 760, margin: "0 auto", textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 700ms ease, transform 700ms ease",
      }}>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1.07,
          letterSpacing: "-0.035em", color: "#0d0f0e", margin: "0 0 20px",
        }}>
          Every provider.{" "}
          <em style={{ fontStyle: "normal", color: "#d97757" }}>One orchestration layer.</em>
        </h2>
        <p style={{ fontSize: 18, color: "#5a4a42", lineHeight: 1.6, margin: 0 }}>
          CascadX connects your checkout to a global network of PSPs, wallets, and local payment
          methods — then routes each transaction to the highest-approval path automatically.
        </p>
      </div>

      {/* Globe + badges */}
      <div
        className="pnm-globe-wrap"
        style={{
          position: "relative", width: "100%", maxWidth: SVG_W,
          margin: "56px auto 0",
          aspectRatio: `${SVG_W} / ${SVG_H}`,
        }}
      >
        {/* SVG: globe, connection lines, data pulses, hub rings */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
          aria-hidden="true"
        >
          <defs>
            <clipPath id="pnm-globe-clip">
              <circle cx={CX} cy={CY} r={GLOBE_R}/>
            </clipPath>
            <radialGradient id="pnm-globe-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#3d2b1a" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#1a1008" stopOpacity="1"/>
            </radialGradient>
          </defs>

          {/* Globe */}
          <circle cx={CX} cy={CY} r={GLOBE_R} fill="url(#pnm-globe-grad)"/>
          <path ref={graticuleRef} fill="none" stroke="rgba(245,239,230,0.07)" strokeWidth="0.8" clipPath="url(#pnm-globe-clip)"/>
          <path ref={landRef}      fill="rgba(245,239,230,0.18)" stroke="rgba(245,239,230,0.22)" strokeWidth="0.5" clipPath="url(#pnm-globe-clip)"/>
          <circle cx={CX} cy={CY} r={GLOBE_R} fill="none" stroke="rgba(217,119,87,0.25)" strokeWidth="1.5"/>

          {/* Connection lines — react to hover */}
          {PROVIDERS.map((p, i) => (
            <path
              key={`line-${p.name}`}
              id={`pnm-path-${i}`}
              d={`M ${CX + p.dx} ${CY + p.dy} L ${CX} ${CY}`}
              fill="none"
              stroke="#d97757"
              strokeWidth={hoveredIdx === i ? 2.5 : 1.5}
              strokeDasharray={hoveredIdx === i ? "none" : "5 7"}
              opacity={
                visible
                  ? hoveredIdx === null
                    ? 0.4
                    : hoveredIdx === i ? 0.85 : 0.15
                  : 0
              }
              style={{
                transition: `opacity 300ms ease ${i * 60 + 400}ms, stroke-width 200ms ease`,
              }}
            />
          ))}

          {/* Data pulses */}
          {PROVIDERS.map((p, i) => (
            <circle key={`pulse-${p.name}`} r="3.5" fill="#d97757" opacity="0.9">
              <animateMotion dur="4s" begin={`${(i * 0.3 + 1.5).toFixed(1)}s`} repeatCount="indefinite">
                <mpath href={`#pnm-path-${i}`}/>
              </animateMotion>
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.9;1"
                dur="4s" begin={`${(i * 0.3 + 1.5).toFixed(1)}s`} repeatCount="indefinite"/>
            </circle>
          ))}

          {/* Hub breathing rings */}
          <circle cx={CX} cy={CY} r={48} fill="none" stroke="rgba(217,119,87,0.2)">
            <animate attributeName="r" values="48;72;48" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="stroke-opacity" values="0.2;0;0.2" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
          </circle>
          <circle cx={CX} cy={CY} r={48} fill="none" stroke="rgba(217,119,87,0.5)">
            <animate attributeName="r" values="48;60;48" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
            <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
          </circle>

          {/* Hub disc */}
          <circle cx={CX} cy={CY} r={46} fill="#0d0f0e" stroke="#d97757" strokeWidth="1.5"/>
          <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle"
            fill="#d97757" fontFamily="var(--font-display,sans-serif)" fontWeight="800" fontSize="19" letterSpacing="-1">
            CX
          </text>
        </svg>

        {/* Provider badges */}
        {PROVIDERS.map((p, i) => {
          const leftPct = ((CX + p.dx) / SVG_W) * 100;
          const topPct  = ((CY + p.dy) / SVG_H) * 100;
          const isHovered = hoveredIdx === i;
          const fp = FLOAT_PARAMS[p.animIdx];
          const entranceDelay = `${p.animIdx * 60 + 300}ms`;

          return (
            <div
              key={`badge-${p.name}`}
              className={p.mobile ? "pnm-badge" : "pnm-badge pnm-badge-desktop"}
              style={{
                position: "absolute",
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 7,
                zIndex: 10,
              }}
            >
              {/* Float wrapper — only translateY, no conflict with position transform above */}
              <div
                className={`pnm-fl-${p.animIdx}`}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}
              >
                {/* Entrance wrapper — scale + opacity, triggered by visible */}
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
                  opacity: visible ? 1 : 0,
                  transform: `scale(${visible ? 1 : 0.55})`,
                  transition: `opacity 500ms cubic-bezier(0.34,1.56,0.64,1) ${entranceDelay}, transform 500ms cubic-bezier(0.34,1.56,0.64,1) ${entranceDelay}`,
                }}>
                  {/* Hover target */}
                  <div
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{ cursor: "default" }}
                  >
                    {/* Badge circle */}
                    <div style={{
                      width: 84, height: 84, borderRadius: "50%",
                      background: "#fff",
                      border: isHovered ? "1.5px solid rgba(217,119,87,0.5)" : "1.5px solid rgba(42,31,28,0.1)",
                      boxShadow: isHovered
                        ? "0 0 30px rgba(217,119,87,0.5), 0 8px 24px rgba(0,0,0,0.16)"
                        : "0 4px 20px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transform: `scale(${isHovered ? 1.15 : 1})`,
                      transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
                    }}>
                      <ProviderLogo name={p.name}/>
                    </div>
                  </div>

                  {/* Name label */}
                  <span style={{
                    fontFamily: "var(--font-mono,monospace)",
                    fontSize: 9, letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: isHovered ? "#d97757" : "#5a4a42",
                    whiteSpace: "nowrap",
                    textShadow: "0 1px 3px rgba(245,239,230,0.9)",
                    transition: "color 300ms ease",
                    pointerEvents: "none",
                  }}>
                    {p.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div style={{
        maxWidth: 760, margin: "72px auto 0",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px 32px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 700ms ease 600ms, transform 700ms ease 600ms",
      }}>
        {STATS.map(({ label }, i) => (
          <div key={label} style={{ borderTop: "1px solid rgba(13,15,14,0.15)", paddingTop: 20, textAlign: "center" }}>
            <strong style={{
              display: "block",
              fontFamily: "var(--font-display,sans-serif)", fontWeight: 800,
              fontSize: "clamp(38px, 5vw, 52px)", letterSpacing: "-0.03em",
              color: "#0d0f0e", lineHeight: 1,
            }}>
              <span ref={(el) => { statRefs.current[i] = el; }}>
                {STATS[i].decimal ? `0.0${STATS[i].suffix}` : `0${STATS[i].suffix}`}
              </span>
            </strong>
            <span style={{
              fontFamily: "var(--font-mono,monospace)", fontSize: 11,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#8a7468", marginTop: 6, display: "block",
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA link */}
      <div style={{
        textAlign: "center", marginTop: 40, paddingBottom: 120,
        opacity: visible ? 1 : 0,
        transition: "opacity 700ms ease 800ms",
      }}>
        <a href="#integrations" style={{
          fontFamily: "var(--font-display,sans-serif)", fontWeight: 700,
          fontSize: 15, color: "#d97757", textDecoration: "none",
          letterSpacing: "-0.01em",
          borderBottom: "1px solid rgba(217,119,87,0.35)", paddingBottom: 2,
        }}>
          Explore every integration we support →
        </a>
      </div>

      {/* Bottom gradient: cream → dark */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: "linear-gradient(to bottom, transparent, #0d0f0e)",
        pointerEvents: "none",
      }}/>

      <style>{`
        @keyframes pnm-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        ${FLOAT_PARAMS.map((fp, idx) =>
          `.pnm-fl-${idx} { animation: pnm-float ${fp.dur} ease-in-out ${fp.delay} infinite; }`
        ).join("\n        ")}

        @media (max-width: 900px) {
          .pnm-globe-wrap { aspect-ratio: 1 / 1 !important; max-width: 520px !important; }
          .pnm-badge-desktop { display: none !important; }
        }
        @media (max-width: 540px) {
          .pnm-globe-wrap { max-width: 380px !important; }
        }
      `}</style>
    </section>
  );
}
