"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import RobotMascot from "./RobotMascot";

/* =========================================================
   Hero Orbit — 10 APM icons across 3 orbital tiers,
   robot mascot center, data-packet pulses, entrance anim,
   scroll-driven rotation, 4 live context chips.
   ========================================================= */

/* --- APM logos --- */
const GooglePayLogo = () => (<svg viewBox="0 0 56 24" className="w-[36px]"><path d="M21.4 10.5c0-.6-.1-1.2-.2-1.9h-9.7v3.5h5.6c-.2 1.2-.9 2.3-2 3v2.4h3.2c1.9-1.7 3-4.3 3.1-7z" fill="#4285F4"/><path d="M11.5 18.7c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H2.6v2.6c1.7 3.3 5.1 5.4 8.9 5.4z" fill="#34A853"/><path d="M5.9 10.7c-.4-1.2-.4-2.5 0-3.7V4.4H2.6C1.1 7.3 1.1 10.7 2.6 13.6L5.9 11v-.3z" fill="#FBBC04"/><path d="M11.5 3c1.5 0 2.8.5 3.9 1.5l2.9-2.9C16.4.6 14.1-.3 11.5-.3c-3.8 0-7.2 2.2-8.9 5.4L5.9 7.7c.8-2.3 3-4.1 5.6-4.7z" fill="#EA4335"/><text x="30" y="16" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="9" fill="#b8bcb6">Pay</text></svg>);
const ApplePayLogo = () => (<svg viewBox="0 0 50 22" className="w-[34px]"><path d="M9.4 3.2c.8-1 1.3-2.3 1.2-3.7-1.2 0-2.6.8-3.4 1.8-.7.9-1.4 2.3-1.2 3.6 1.3.1 2.6-.7 3.4-1.7z" fill="#fafaf7"/><path d="M10.6 7.4c-1.9-.1-3.5 1.1-4.4 1.1s-2.3-1-3.8-1C.5 7.6-1.3 9.3-1.3 12.7c0 4.3 3.1 9.3 5.6 9.3 1 0 2-.7 3.4-.7 1.3 0 1.9.7 3.4.7 2.4 0 4.5-4 5.1-5.3-3.2-1.5-3.3-5.7-.1-7.3-.9-1.4-2.6-2.1-4.1-2z" fill="#fafaf7" transform="translate(10,-2) scale(0.8)"/><text x="28" y="16" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="9" fill="#fafaf7">Pay</text></svg>);
const KlarnaLogo = () => (<svg viewBox="0 0 70 22" className="w-[38px]"><text x="0" y="18" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="18" fill="#FFB3C7" letterSpacing="-0.8">Klarna.</text></svg>);
const PayPalLogo = () => (<svg viewBox="0 0 62 20" className="w-[36px]"><text x="0" y="16" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="15" fill="#003087" letterSpacing="-0.4">Pay</text><text x="28" y="16" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="15" fill="#009CDE" letterSpacing="-0.4">Pal</text></svg>);
const SkrillLogo = () => (<svg viewBox="0 0 52 20" className="w-[32px]"><text x="0" y="16" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="16" fill="#862165" letterSpacing="-0.4">Skrill</text></svg>);
const AlipayLogo = () => (<svg viewBox="0 0 48 22" className="w-[34px]"><text x="0" y="17" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="14" fill="#1677FF" letterSpacing="-0.3">Alipay</text></svg>);
const WeChatPayLogo = () => (<svg viewBox="0 0 32 32" className="w-[28px]"><path d="M16 4C8.8 4 3 8.8 3 14.8c0 3.4 1.8 6.4 4.6 8.4l-1.2 3.6 4.2-2.1c1.7.5 3.5.7 5.4.7 7.2 0 13-4.8 13-10.8S23.2 4 16 4z" fill="#07C160"/><circle cx="12" cy="13" r="1.5" fill="#fff"/><circle cx="20" cy="13" r="1.5" fill="#fff"/></svg>);
const PixLogo = () => (<svg viewBox="0 0 32 32" className="w-[28px]"><g transform="translate(16,16) rotate(45)"><rect x="-10" y="-10" width="20" height="20" rx="3" fill="#32BCAD"/><path d="M-4 0 L0-4 L4 0 M-4 0 L0 4 L4 0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>);
const IdealLogo = () => (<svg viewBox="0 0 36 36" className="w-[28px]"><rect x="2" y="2" width="32" height="32" rx="6" fill="#CC0066"/><text x="18" y="23" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="12" fill="#fff" letterSpacing="-0.5">iDEAL</text></svg>);
const RevolutLogo = () => (<svg viewBox="0 0 32 32" className="w-[26px]"><circle cx="16" cy="16" r="14" fill="#0d0f0e" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/><text x="16" y="22" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="18" fill="#fafaf7">R</text></svg>);

/* --- 3-tier orbit layout --- */
const CX = 250, CY = 250;
type NodeDef = { logo: React.ReactNode; r: number; angle: number; tier: 0|1|2; badgeR: number };
const toXY = (r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: Math.round(CX + r * Math.cos(rad)), y: Math.round(CY + r * Math.sin(rad)) };
};

const nodeDefs: NodeDef[] = [
  { logo: <ApplePayLogo />,   r: 128, angle: 45,  tier: 0, badgeR: 33 },
  { logo: <WeChatPayLogo />,  r: 128, angle: 165, tier: 0, badgeR: 33 },
  { logo: <RevolutLogo />,    r: 128, angle: 285, tier: 0, badgeR: 33 },
  { logo: <GooglePayLogo />,  r: 176, angle: 15,  tier: 1, badgeR: 29 },
  { logo: <KlarnaLogo />,     r: 176, angle: 110, tier: 1, badgeR: 29 },
  { logo: <PixLogo />,        r: 176, angle: 200, tier: 1, badgeR: 29 },
  { logo: <SkrillLogo />,     r: 176, angle: 320, tier: 1, badgeR: 29 },
  { logo: <PayPalLogo />,     r: 224, angle: 75,  tier: 2, badgeR: 26 },
  { logo: <IdealLogo />,      r: 224, angle: 170, tier: 2, badgeR: 26 },
  { logo: <AlipayLogo />,     r: 224, angle: 260, tier: 2, badgeR: 26 },
];
const nodes = nodeDefs.map((n) => ({ ...n, ...toXY(n.r, n.angle) }));

const packets = [
  { idx: 0, dur: 2.8, delay: 0,   violet: false },
  { idx: 3, dur: 2.2, delay: 0.4, violet: false },
  { idx: 5, dur: 3.2, delay: 0.8, violet: true },
  { idx: 7, dur: 2.5, delay: 1.6, violet: false },
  { idx: 9, dur: 3.0, delay: 2.4, violet: false },
  { idx: 1, dur: 2.6, delay: 3.2, violet: true },
];

/* --- Scroll-driven rotation hook --- */
function useScrollRotation() {
  // scrollAngle accumulates rotation from scroll. Smoothly decelerates.
  const angleRef = useRef(0);       // current rendered angle (with deceleration)
  const velocityRef = useRef(0);    // current scroll-driven velocity (deg/frame)
  const lastScrollY = useRef(0);
  const rafRef = useRef(0);
  const [, forceRender] = useState(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      // Convert scroll px to rotation degrees: 1px scroll ≈ 0.02deg (gentle)
      velocityRef.current += delta * 0.02;
      // Clamp max velocity to ±0.6 deg/frame
      velocityRef.current = Math.max(-0.6, Math.min(0.6, velocityRef.current));
    };

    const tick = () => {
      // Apply velocity to angle
      angleRef.current += velocityRef.current;
      // Decelerate: friction 0.82 — dies off quickly
      velocityRef.current *= 0.82;
      // Only re-render if there's meaningful motion
      if (Math.abs(velocityRef.current) > 0.01) {
        forceRender(n => n + 1);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return angleRef;
}

/* =========================================================
   Main component
   ========================================================= */
export default function NeuralVisual() {
  const [entered, setEntered] = useState(false);
  const scrollAngle = useScrollRotation();

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Tier-specific scroll multipliers: inner rotates fastest, outer slowest
  const tierMultipliers = [1.4, 1.0, 0.7];

  // Compute per-node position including scroll rotation
  const getRotatedXY = useCallback((n: typeof nodes[0]) => {
    const scrollDeg = scrollAngle.current * tierMultipliers[n.tier];
    const totalAngle = n.angle + scrollDeg;
    const rad = ((totalAngle - 90) * Math.PI) / 180;
    return {
      x: CX + n.r * Math.cos(rad),
      y: CY + n.r * Math.sin(rad),
    };
  }, [scrollAngle]);

  return (
    <div className="neural-stage">
      {/* Orbit rings — CSS rotation + scroll-driven extra rotation */}
      {[
        { inset: "49%", dur: 18, dir: "", w: "1px", delay: "600ms", tierMult: 1.4 },
        { inset: "30%", dur: 28, dir: "reverse", w: "1.5px", delay: "700ms", tierMult: 1.0 },
        { inset: "10%", dur: 40, dir: "", w: "2px", delay: "800ms", tierMult: 0.7 },
      ].map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full border-dashed border-line-strong transition-all duration-700"
          style={{
            inset: ring.inset,
            borderWidth: ring.w,
            opacity: entered ? 1 : 0,
            transform: entered
              ? `scale(1) rotate(${scrollAngle.current * ring.tierMult}deg)`
              : "scale(0)",
            animation: entered ? `rotate ${ring.dur}s linear infinite ${ring.dir}` : "none",
            transitionDelay: ring.delay,
          }}
        />
      ))}

      <svg viewBox="0 0 500 500" aria-hidden="true" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d97757" stopOpacity="0.35"/>
            <stop offset="35%" stopColor="#d97757" stopOpacity="0.06"/>
            <stop offset="100%" stopColor="#d97757" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97757" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#d97757" stopOpacity="0.02"/>
          </linearGradient>
          <linearGradient id="packetGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d97757" stopOpacity="0.2"/>
            <stop offset="60%" stopColor="#d97757" stopOpacity="1"/>
            <stop offset="100%" stopColor="#b35a3e" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="packetGradV" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="1"/>
            <stop offset="100%" stopColor="#6d3fcf" stopOpacity="1"/>
          </linearGradient>
          <filter id="badgeShadow" x="-30%" y="-20%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
          </filter>
          <filter id="packetBlur" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Core glow */}
        <circle cx={CX} cy={CY} r="175" fill="url(#coreGrad)"/>

        {/* Connection lines + icons per tier — each tier group rotated by scroll */}
        {[0, 1, 2].map((tier) => {
          const tierNodes = nodes.filter(n => n.tier === tier);
          const scrollDeg = scrollAngle.current * tierMultipliers[tier];
          return (
            <g key={`tier-${tier}`} transform={`rotate(${scrollDeg} ${CX} ${CY})`}>
              {/* Connection lines */}
              {tierNodes.map((n, i) => {
                const len = Math.sqrt((n.x - CX) ** 2 + (n.y - CY) ** 2);
                return (
                  <line key={`line-${tier}-${i}`} x1={CX} y1={CY} x2={n.x} y2={n.y}
                    stroke="url(#linkGrad)" strokeWidth="1.5"
                    strokeDasharray={len}
                    strokeDashoffset={entered ? 0 : len}
                    style={{ transition: `stroke-dashoffset 800ms ease ${1800 + (tier * 3 + i) * 100}ms` }}
                  />
                );
              })}

              {/* Icon badges */}
              {tierNodes.map((n, i) => {
                const globalIdx = nodes.indexOf(n);
                const dx = n.x - CX, dy = n.y - CY;
                return (
                  <g key={`badge-${tier}-${i}`} filter="url(#badgeShadow)"
                    style={{
                      transform: entered ? "translate(0,0)" : `translate(${-dx}px,${-dy}px)`,
                      opacity: entered ? 1 : 0,
                      transition: `transform 900ms cubic-bezier(0.25,0.8,0.25,1) ${900 + globalIdx * 100}ms, opacity 600ms ease ${900 + globalIdx * 100}ms`,
                    }}
                  >
                    <animateTransform attributeName="transform" type="translate"
                      values={`0,0;0,${globalIdx % 2 === 0 ? -3 : 3};0,0`}
                      dur={`${5 + globalIdx * 0.4}s`} begin={`${3 + globalIdx * 0.1}s`}
                      repeatCount="indefinite" additive="sum"
                    />
                    <circle cx={n.x} cy={n.y} r={n.badgeR} fill="#262c2b" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                    <path d={`M${n.x-n.badgeR+5},${n.y-n.badgeR+2} A${n.badgeR},${n.badgeR} 0 0,1 ${n.x+n.badgeR-5},${n.y-n.badgeR+2}`}
                      fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                    {/* Counter-rotate the logo so it stays upright */}
                    <foreignObject x={n.x-n.badgeR+4} y={n.y-n.badgeR+4} width={(n.badgeR-4)*2} height={(n.badgeR-4)*2}
                      style={{ transform: `rotate(${-scrollDeg}deg)`, transformOrigin: `${n.x}px ${n.y}px` }}
                    >
                      <div className="flex items-center justify-center w-full h-full">{n.logo}</div>
                    </foreignObject>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Data packets — not scroll-rotated (they follow fixed paths) */}
        {entered && packets.map((p, i) => {
          const n = nodes[p.idx];
          return (
            <rect key={`pkt-${i}`} width="14" height="4" rx="2"
              fill={`url(#${p.violet?"packetGradV":"packetGrad"})`}
              filter="url(#packetBlur)" opacity="0"
            >
              <animateMotion dur={`${p.dur}s`} begin={`${2.4+p.delay}s`} repeatCount="indefinite" rotate="auto"
                path={`M${CX},${CY} L${n.x},${n.y}`}/>
              <animate attributeName="opacity" values="0;0.9;0.9;0" dur={`${p.dur}s`} begin={`${2.4+p.delay}s`} repeatCount="indefinite"/>
            </rect>
          );
        })}

        {/* Center robot — NOT scroll-rotated */}
        <g style={{ opacity: entered?1:0, transform: entered?"scale(1)":"scale(0.7)", transformOrigin:`${CX}px ${CY}px`, transition:"opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.34,1.56,0.64,1) 0ms" }}>
          <circle cx={CX} cy={CY} r="53" fill="none" stroke="#d97757" strokeWidth="1.5" opacity="0.3">
            <animate attributeName="r" values="53;65;53" dur="2.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx={CX} cy={CY} r="51" fill="#262c2b" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5"/>
          <foreignObject x={CX-44} y={CY-44} width="88" height="88">
            <div className="flex items-center justify-center w-full h-full">
              <RobotMascot size={80}/>
            </div>
          </foreignObject>
        </g>
      </svg>

    </div>
  );
}
