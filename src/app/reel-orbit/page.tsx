"use client";

import { useEffect, useState, useRef } from "react";
import RobotMascot from "@/components/RobotMascot";

/* Reuse exact logo components from NeuralVisual */
const GooglePayLogo = () => (<svg viewBox="0 0 56 24" className="w-[32px]"><path d="M21.4 10.5c0-.6-.1-1.2-.2-1.9h-9.7v3.5h5.6c-.2 1.2-.9 2.3-2 3v2.4h3.2c1.9-1.7 3-4.3 3.1-7z" fill="#4285F4"/><path d="M11.5 18.7c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H2.6v2.6c1.7 3.3 5.1 5.4 8.9 5.4z" fill="#34A853"/><path d="M5.9 10.7c-.4-1.2-.4-2.5 0-3.7V4.4H2.6C1.1 7.3 1.1 10.7 2.6 13.6L5.9 11v-.3z" fill="#FBBC04"/><path d="M11.5 3c1.5 0 2.8.5 3.9 1.5l2.9-2.9C16.4.6 14.1-.3 11.5-.3c-3.8 0-7.2 2.2-8.9 5.4L5.9 7.7c.8-2.3 3-4.1 5.6-4.7z" fill="#EA4335"/><text x="30" y="16" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="9" fill="#b8bcb6">Pay</text></svg>);
const ApplePayLogo = () => (<svg viewBox="0 0 56 20" className="w-[34px]"><path d="M10.3 1.5c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.4-.6.6-1.1 1.7-.9 2.6.9.1 1.9-.5 2.6-1.3zm.9 1.3c-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8C3.7 2.9 2.3 3.9 1.5 5.4c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4 1-1.4 1.3-2.7 1.4-2.8 0 0-2.6-1-2.6-4 0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-.5 0-1 .1-1.3.1z" fill="#fafaf7" transform="translate(1,1) scale(0.95)"/><text x="24" y="14" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="9" fill="#fafaf7">Pay</text></svg>);
const KlarnaLogo = () => (<svg viewBox="0 0 70 22" className="w-[34px]"><text x="0" y="18" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="18" fill="#FFB3C7" letterSpacing="-0.8">Klarna.</text></svg>);
const PayPalLogo = () => (<svg viewBox="0 0 62 20" className="w-[32px]"><text x="0" y="16" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="15" fill="#003087" letterSpacing="-0.4">Pay</text><text x="28" y="16" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="15" fill="#009CDE" letterSpacing="-0.4">Pal</text></svg>);
const SkrillLogo = () => (<svg viewBox="0 0 52 20" className="w-[28px]"><text x="0" y="16" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="16" fill="#862165" letterSpacing="-0.4">Skrill</text></svg>);
const AlipayLogo = () => (<svg viewBox="0 0 48 22" className="w-[30px]"><text x="0" y="17" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="14" fill="#1677FF" letterSpacing="-0.3">Alipay</text></svg>);
const WeChatPayLogo = () => (<svg viewBox="0 0 32 32" className="w-[24px]"><path d="M16 4C8.8 4 3 8.8 3 14.8c0 3.4 1.8 6.4 4.6 8.4l-1.2 3.6 4.2-2.1c1.7.5 3.5.7 5.4.7 7.2 0 13-4.8 13-10.8S23.2 4 16 4z" fill="#07C160"/><circle cx="12" cy="13" r="1.5" fill="#fff"/><circle cx="20" cy="13" r="1.5" fill="#fff"/></svg>);
const PixLogo = () => (<svg viewBox="0 0 32 32" className="w-[24px]"><g transform="translate(16,16) rotate(45)"><rect x="-10" y="-10" width="20" height="20" rx="3" fill="#32BCAD"/><path d="M-4 0 L0-4 L4 0 M-4 0 L0 4 L4 0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>);
const IdealLogo = () => (<svg viewBox="0 0 36 36" className="w-[24px]"><rect x="2" y="2" width="32" height="32" rx="6" fill="#CC0066"/><text x="18" y="23" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="12" fill="#fff" letterSpacing="-0.5">iDEAL</text></svg>);
const RevolutLogo = () => (<svg viewBox="0 0 32 32" className="w-[22px]"><circle cx="16" cy="16" r="14" fill="#0d0f0e" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/><text x="16" y="22" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="18" fill="#fafaf7">R</text></svg>);

const allIcons = [
  { logo: <GooglePayLogo />, r: 130, angle: 0, tier: 1 },
  { logo: <ApplePayLogo />, r: 100, angle: 36, tier: 0 },
  { logo: <KlarnaLogo />, r: 155, angle: 72, tier: 2 },
  { logo: <PayPalLogo />, r: 130, angle: 108, tier: 1 },
  { logo: <SkrillLogo />, r: 100, angle: 144, tier: 0 },
  { logo: <AlipayLogo />, r: 155, angle: 180, tier: 2 },
  { logo: <WeChatPayLogo />, r: 130, angle: 216, tier: 1 },
  { logo: <PixLogo />, r: 100, angle: 252, tier: 0 },
  { logo: <IdealLogo />, r: 155, angle: 288, tier: 2 },
  { logo: <RevolutLogo />, r: 130, angle: 324, tier: 1 },
];

const tierRot = [70, -50, 60]; // more dynamic rotation

export default function ReelOrbit() {
  const [t, setT] = useState(-1);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const LOOP = 10000;

  useEffect(() => {
    const ready = setTimeout(() => {
      startRef.current = performance.now();
      const tick = () => {
        setT((performance.now() - startRef.current) % LOOP);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 1000);
    return () => { clearTimeout(ready); cancelAnimationFrame(rafRef.current); };
  }, []);

  const spring = (p: number) => p < 0 ? 0 : 1 - Math.pow(1 - Math.min(p, 1), 3) * Math.cos(Math.min(p, 1) * Math.PI * 0.5);
  const entrance = Math.max(0, Math.min(1, t / 1500));
  const iconsPhase = Math.max(0, Math.min(1, (t - 1500) / 1500));
  const rotProgress = Math.max(0, Math.min(1, (t - 1500) / 8500));
  const resetFade = t >= 9200 ? Math.max(0, 1 - (t - 9200) / 800) : 1;
  const breathe = 1 + 0.04 * Math.sin((t / 1000) * Math.PI);

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex flex-col items-center justify-center overflow-hidden" style={{ cursor: "none" }}>
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-30 z-10">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="font-mono text-[10px] text-white/40">REC</span>
      </div>

      {/* Terracotta glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(500px 500px at 50% 55%, rgba(217,119,87,${0.18 * entrance * resetFade}), transparent 70%)` }} />

      {/* SLOGAN — visible from frame 1, always on top */}
      <div className="text-center mb-10 px-8 relative z-10" style={{ opacity: resetFade }}>
        <h1 className="font-display font-[800] text-[56px] tracking-[-0.04em] leading-[1.05] text-[#fafaf7]">
          Payments that <span className="text-[#d97757]">think</span><br />before they fall.
        </h1>
        <p className="font-mono text-[18px] text-white/40 mt-4">cascadx.com</p>
      </div>

      {/* Orbit container */}
      <div className="relative" style={{ width: "min(70vw, 500px)", height: "min(70vw, 500px)", opacity: resetFade }}>
        {/* Orbit rings */}
        {[{ pct: 95, d: 40 }, { pct: 72, d: 28 }, { pct: 52, d: 18 }].map((ring, i) => (
          <div key={i} className="absolute rounded-full border border-dashed border-white/[0.06]"
            style={{ width: `${ring.pct}%`, height: `${ring.pct}%`, top: `${(100 - ring.pct) / 2}%`, left: `${(100 - ring.pct) / 2}%`, opacity: iconsPhase * 0.35, transform: `rotate(${rotProgress * tierRot[i]}deg)` }} />
        ))}

        {/* Center robot */}
        <div className="absolute left-1/2 top-1/2 w-20 h-20 rounded-full bg-[#262c2b] border border-white/[0.14] grid place-items-center"
          style={{ transform: `translate(-50%, -50%) scale(${spring(entrance) * breathe})`, opacity: entrance, boxShadow: `0 0 50px rgba(217,119,87,${0.35 * entrance})` }}>
          <div className="absolute inset-[-5px] rounded-full border border-[#d97757] opacity-30 animate-[pulse_2.6s_ease-in-out_infinite]" />
          <RobotMascot size={56} variant="thinking" />
        </div>

        {/* Icons */}
        {allIcons.map((icon, i) => {
          const p = Math.max(0, Math.min(1, (iconsPhase * allIcons.length - i) / 1.5));
          const rot = rotProgress * tierRot[icon.tier];
          const totalAngle = icon.angle + rot;
          const rad = ((totalAngle - 90) * Math.PI) / 180;
          const cx = 50 + (icon.r / 3.3) * Math.cos(rad);
          const cy = 50 + (icon.r / 3.3) * Math.sin(rad);
          return (
            <div key={i} className="absolute w-12 h-12 rounded-full bg-[#262c2b] border border-white/[0.12] grid place-items-center"
              style={{ left: `${cx}%`, top: `${cy}%`, transform: `translate(-50%, -50%) scale(${spring(p)})`, opacity: p, boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
              {icon.logo}
            </div>
          );
        })}

        {/* Connection line pulses — every 0.3s */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {t > 1500 && allIcons.map((icon, i) => {
            const idx = Math.floor((t - 1500) / 300) % allIcons.length;
            if (i !== idx) return null;
            const rot = rotProgress * tierRot[icon.tier];
            const totalAngle = icon.angle + rot;
            const rad = ((totalAngle - 90) * Math.PI) / 180;
            const ex = 50 + (icon.r / 3.3) * Math.cos(rad);
            const ey = 50 + (icon.r / 3.3) * Math.sin(rad);
            return <line key={i} x1="50" y1="50" x2={ex} y2={ey} stroke="#d97757" strokeWidth="0.4" opacity="0.5" />;
          })}
        </svg>
      </div>
    </div>
  );
}
