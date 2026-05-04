"use client";
import { useEffect, useState, useRef } from "react";
import ReelLogoOutro from "@/components/ReelLogoOutro";
import LiquidShape from "@/components/LiquidShape";

const pills = ["Risk scoring", "BIN routing", "PSP cascading", "Retry logic", "Approval lift"];
const LOOP = 8000;

export default function Reel() {
  const [t, setT] = useState(-1);
  const raf = useRef(0);
  const s = useRef(0);
  useEffect(() => {
    const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000);
    return () => { clearTimeout(r); cancelAnimationFrame(raf.current); };
  }, []);
  const sp = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const titleP = Math.max(0, Math.min(1, t / 800));
  const orbP = Math.max(0, Math.min(1, (t - 1000) / 800));
  const outroP = Math.max(0, (t - 6000) / 2000);
  const mainFade = t < 5500 ? 1 : Math.max(0, 1 - (t - 5500) / 500);

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex flex-col items-center justify-start overflow-hidden" style={{ cursor: "none" }}>
      {/* Title */}
      <div className="mt-[15vh] text-center px-8" style={{ opacity: mainFade, transform: `translateY(${-40 * (1 - sp(titleP))}px)` }}>
        <h1 className="font-display font-[800] text-[48px] tracking-[-0.04em] leading-[1.1] text-[#fafaf7]">
          Inside the Cascading<br /><span className="text-[#d97757]">Decision Engine</span>
        </h1>
      </div>

      {/* Orb + pills */}
      <div className="relative mt-12 flex flex-col items-center" style={{ opacity: mainFade }}>
        <LiquidShape className="w-[280px] h-[320px]" style={{ opacity: sp(orbP), transform: `scale(${0.8 + 0.2 * sp(orbP)})` }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pt-4">
          {pills.map((pill, i) => {
            const pp = Math.max(0, Math.min(1, (t - 2000 - i * 600) / 500));
            const isAccent = i === 2;
            return (
              <div key={pill} className={`px-5 py-2.5 rounded-full text-[15px] font-medium border ${isAccent ? "border-[#d97757] text-[#d97757] shadow-[0_0_20px_rgba(217,119,87,0.3)]" : "border-white/[0.12] text-white/70"}`}
                style={{ opacity: sp(pp), transform: `translateY(${20 * (1 - sp(pp))}px) scale(${0.9 + 0.1 * sp(pp)}${isAccent && pp > 0.8 ? ` * ${1 + 0.03 * Math.sin(t / 200)}` : ""})`, background: "#1e2423" }}>
                {pill}
              </div>
            );
          })}
        </div>
      </div>

      {outroP > 0 && <ReelLogoOutro progress={outroP} />}
    </div>
  );
}
