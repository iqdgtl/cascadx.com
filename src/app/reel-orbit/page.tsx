"use client";

import { useEffect, useState, useRef } from "react";
import RobotMascot from "@/components/RobotMascot";

export default function ReelOrbit() {
  const [t, setT] = useState(-1); // -1 = ready buffer
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const LOOP = 10000; // 10s loop

  useEffect(() => {
    // 1s ready buffer then start
    const ready = setTimeout(() => {
      startRef.current = performance.now();
      const tick = () => {
        const elapsed = (performance.now() - startRef.current) % LOOP;
        setT(elapsed);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 1000);
    return () => { clearTimeout(ready); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Phase helpers
  const phase1 = Math.max(0, Math.min(1, t / 1500)); // 0-1.5s entrance
  const phase2 = Math.max(0, Math.min(1, (t - 1500) / 1500)); // 1.5-3s icons fly out
  const phase3 = t >= 3000 && t < 7000; // 3-7s rotation
  const rotProgress = phase3 ? (t - 3000) / 4000 : t >= 7000 ? 1 : 0;
  const phase4 = Math.max(0, Math.min(1, (t - 7000) / 1500)); // 7-8.5s text reveal
  const resetFade = t >= 9500 ? Math.max(0, 1 - (t - 9500) / 500) : 1; // fade out last 0.5s

  // Spring ease
  const spring = (p: number) => 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  // Icon data
  const icons = [
    { name: "GPay", color: "#4285F4", r: 130, angle: 0, tier: 1 },
    { name: "Apple", color: "#fafaf7", r: 100, angle: 45, tier: 0 },
    { name: "Klarna", color: "#FFB3C7", r: 155, angle: 72, tier: 2 },
    { name: "PayPal", color: "#009CDE", r: 130, angle: 108, tier: 1 },
    { name: "Skrill", color: "#862165", r: 100, angle: 165, tier: 0 },
    { name: "Alipay", color: "#1677FF", r: 155, angle: 200, tier: 2 },
    { name: "WeChat", color: "#07C160", r: 130, angle: 252, tier: 1 },
    { name: "PIX", color: "#32BCAD", r: 100, angle: 285, tier: 0 },
    { name: "iDEAL", color: "#CC0066", r: 155, angle: 324, tier: 2 },
    { name: "Revolut", color: "#fafaf7", r: 130, angle: 340, tier: 1 },
  ];

  const tierMult = [1.4, 1.0, 0.7];
  const tierRot = [35, -25, 30];

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex flex-col items-center justify-center overflow-hidden" style={{ cursor: "none" }}>
      {/* REC indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-40 z-10">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="font-mono text-[10px] text-white/50">REC</span>
      </div>

      {/* Terracotta glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(400px 400px at 50% 45%, rgba(217,119,87,${0.18 * phase1 * resetFade}), transparent 70%)`,
        }}
      />

      {/* Orbit container */}
      <div className="relative" style={{ width: "70vw", height: "70vw", maxWidth: "600px", maxHeight: "600px", opacity: resetFade }}>
        {/* Orbit rings */}
        {[
          { size: "95%", dur: 40 },
          { size: "72%", dur: 28 },
          { size: "52%", dur: 18 },
        ].map((ring, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-dashed border-white/[0.08]"
            style={{
              width: ring.size,
              height: ring.size,
              top: `${(100 - parseFloat(ring.size)) / 2}%`,
              left: `${(100 - parseFloat(ring.size)) / 2}%`,
              opacity: phase2 * 0.4,
              transform: `rotate(${rotProgress * tierRot[i]}deg)`,
              transition: "opacity 0.5s",
            }}
          />
        ))}

        {/* Center robot */}
        <div
          className="absolute left-1/2 top-1/2 w-24 h-24 rounded-full bg-[#262c2b] border border-white/[0.14] grid place-items-center"
          style={{
            transform: `translate(-50%, -50%) scale(${0.6 + 0.4 * spring(phase1)})`,
            opacity: phase1,
            boxShadow: `0 0 60px rgba(217,119,87,${0.3 * phase1})`,
          }}
        >
          {/* Pulsing ring */}
          <div
            className="absolute inset-[-6px] rounded-full border border-[#d97757] animate-[pulse_2.6s_ease-in-out_infinite]"
            style={{ opacity: phase1 * 0.4 }}
          />
          <RobotMascot size={68} variant={t >= 4000 && t < 5000 ? "waving" : "thinking"} />
        </div>

        {/* Icons */}
        {icons.map((icon, i) => {
          const iconProgress = Math.max(0, Math.min(1, (phase2 * icons.length - i) / 1));
          const tierRotDeg = rotProgress * tierRot[icon.tier];
          const totalAngle = icon.angle + tierRotDeg;
          const rad = ((totalAngle - 90) * Math.PI) / 180;
          const cx = 50 + (icon.r / 3.2) * Math.cos(rad);
          const cy = 50 + (icon.r / 3.2) * Math.sin(rad);

          return (
            <div
              key={icon.name}
              className="absolute w-14 h-14 rounded-full bg-[#262c2b] border border-white/[0.12] grid place-items-center"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                transform: `translate(-50%, -50%) scale(${spring(iconProgress)})`,
                opacity: iconProgress,
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
              }}
            >
              <span className="font-mono text-[9px] font-bold" style={{ color: icon.color }}>
                {icon.name}
              </span>
            </div>
          );
        })}

        {/* Connection line pulses */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {phase3 && icons.map((icon, i) => {
            const pulseIdx = Math.floor(((t - 3000) / 500)) % icons.length;
            if (i !== pulseIdx) return null;
            const tierRotDeg = rotProgress * tierRot[icon.tier];
            const totalAngle = icon.angle + tierRotDeg;
            const rad = ((totalAngle - 90) * Math.PI) / 180;
            const ex = 50 + (icon.r / 3.2) * Math.cos(rad);
            const ey = 50 + (icon.r / 3.2) * Math.sin(rad);
            return (
              <line key={i} x1="50" y1="50" x2={ex} y2={ey} stroke="#d97757" strokeWidth="0.5" opacity="0.6">
                <animate attributeName="opacity" values="0;0.6;0" dur="0.5s" fill="freeze" />
              </line>
            );
          })}
        </svg>
      </div>

      {/* Slogan */}
      <div className="mt-12 text-center" style={{ opacity: phase4 * resetFade }}>
        <h1
          className="font-display font-[800] text-[48px] tracking-[-0.04em] leading-[1.05] text-[#fafaf7]"
          style={{ transform: `translateY(${16 * (1 - phase4)}px)` }}
        >
          Payments that <span className="text-[#d97757]">think</span> before they fall.
        </h1>
        <p
          className="font-mono text-[18px] text-white/50 mt-4"
          style={{ opacity: Math.max(0, (phase4 - 0.3) / 0.7), transform: `translateY(${12 * (1 - phase4)}px)` }}
        >
          cascadx.com
        </p>
      </div>
    </div>
  );
}
