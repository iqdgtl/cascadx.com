"use client";
import { useEffect, useState, useRef } from "react";
import ReelLogoOutro from "@/components/ReelLogoOutro";
import LiquidShape from "@/components/LiquidShape";

const LOOP = 9000;
const bullets = ["Recovers declined transactions", "Connects 1,000+ PSPs", "Learns from every transaction"];

export default function Reel() {
  const [t, setT] = useState(-1);
  const raf = useRef(0);
  const s = useRef(0);
  useEffect(() => {
    const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000);
    return () => { clearTimeout(r); cancelAnimationFrame(raf.current); };
  }, []);
  const sp = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const shapeP = Math.max(0, Math.min(1, t / 800));
  const cardP = Math.max(0, Math.min(1, (t - 1000) / 600));
  const whyP = Math.max(0, Math.min(1, (t - 3000) / 600));
  const breathe = 1 + 0.02 * Math.sin(Math.max(0, t - 5000) / 500);
  const outroP = Math.max(0, (t - 7000) / 2000);
  const mainFade = t < 6500 ? 1 : Math.max(0, 1 - (t - 6500) / 500);

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex items-center justify-center overflow-hidden" style={{ cursor: "none" }}>
      {/* Liquid shape — left side */}
      <LiquidShape
        className="absolute left-[-80px] top-[15%] w-[300px] h-[500px]"
        style={{ opacity: sp(shapeP) * 0.7 * mainFade, transform: `translateX(${-60 * (1 - sp(shapeP))}px)` }}
      />

      <div className="relative z-10 w-full max-w-[420px] px-8" style={{ opacity: mainFade }}>
        {/* Card */}
        <div className="bg-[#1e2423] border border-white/[0.08] rounded-[16px] p-7 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_30px_60px_-20px_rgba(0,0,0,0.5)]"
          style={{ opacity: sp(cardP), transform: `translateX(${80 * (1 - sp(cardP))}px) scale(${t > 5000 ? breathe : 1})` }}>
          <h2 className="font-display font-[800] text-[32px] tracking-[-0.04em] leading-[1.1] text-[#fafaf7] mb-4">
            Smart Routing<br /><span className="text-[#d97757]">Simplified</span>
          </h2>
          {["Route every transaction through the optimal PSP.", "Recover revenue from soft declines automatically.", "Deploy in under a day — no migration needed."].map((line, i) => {
            const lp = Math.max(0, Math.min(1, (t - 1600 - i * 300) / 400));
            return <p key={i} className="text-[15px] text-white/60 leading-relaxed mb-2" style={{ opacity: sp(lp), transform: `translateY(${8 * (1 - sp(lp))}px)` }}>{line}</p>;
          })}
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.06]">
            <div className="w-10 h-10 rounded-full bg-[#d97757] grid place-items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d0f0e" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <span className="font-display font-[700] text-[18px] text-[#fafaf7]">+18% approvals</span>
          </div>
        </div>

        {/* Why CascadX */}
        <div className="mt-8" style={{ opacity: sp(whyP), transform: `translateY(${20 * (1 - sp(whyP))}px)` }}>
          <h3 className="font-display font-[700] text-[22px] text-[#fafaf7] tracking-[-0.02em] mb-4">Why CascadX?</h3>
          {bullets.map((b, i) => {
            const bp = Math.max(0, Math.min(1, (t - 3600 - i * 200) / 400));
            return (
              <div key={b} className="flex items-center gap-3 mb-3" style={{ opacity: sp(bp), transform: `translateX(${12 * (1 - sp(bp))}px)` }}>
                <span className="w-2 h-2 rounded-full bg-[#d97757] shrink-0" />
                <span className="text-[15px] text-white/70">{b}</span>
              </div>
            );
          })}
        </div>
      </div>

      {outroP > 0 && <ReelLogoOutro progress={outroP} />}
    </div>
  );
}
