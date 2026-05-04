"use client";
import { useEffect, useState, useRef } from "react";
import ReelLogoOutro from "@/components/ReelLogoOutro";
import LiquidShape from "@/components/LiquidShape";

const LOOP = 9000;
const bodyLines = ["Route every transaction through the optimal PSP.", "Recover revenue from soft declines automatically.", "Deploy in under a day — no migration needed."];
const bullets = ["Recovers declined transactions", "Connects 1,000+ PSPs", "Learns from every transaction"];

// Timeline (ms)
const SHAPE_IN = 0, SHAPE_DUR = 1500;
const CARD_IN = 1500, CARD_DUR = 1500;
const BODY_START = 3000, BODY_STAGGER = 500;
const CHECK_IN = 5000, CHECK_DUR = 600;
const WHY_TITLE = 5800, WHY_DUR = 400;
const BULLET_START = 6200, BULLET_STAGGER = 500;
const HOLD_END = 7500;
const OUTRO_START = 8000, OUTRO_DUR = 1000;

export default function Reel() {
  const [t, setT] = useState(-1);
  const raf = useRef(0);
  const s = useRef(0);
  useEffect(() => {
    const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000);
    return () => { clearTimeout(r); cancelAnimationFrame(raf.current); };
  }, []);

  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);
  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);

  const shapeP = ease(Math.max(0, Math.min(1, (t - SHAPE_IN) / SHAPE_DUR)));
  const cardP = ease(Math.max(0, Math.min(1, (t - CARD_IN) / CARD_DUR)));
  const checkP = spring(Math.max(0, Math.min(1, (t - CHECK_IN) / CHECK_DUR)));
  const whyP = ease(Math.max(0, Math.min(1, (t - WHY_TITLE) / WHY_DUR)));
  const breathe = t >= HOLD_END && t < OUTRO_START ? 1 + 0.02 * Math.sin(((t - HOLD_END) / 500) * Math.PI) : 1;
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < HOLD_END ? 1 : Math.max(0, 1 - (t - HOLD_END) / 500);

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex items-center justify-center overflow-hidden" style={{ cursor: "none" }}>
      {/* Liquid shape — slow elegant slide */}
      <LiquidShape className="absolute left-[-80px] top-[15%] w-[300px] h-[500px]"
        style={{ opacity: shapeP * 0.7 * mainFade, transform: `translateX(${-80 * (1 - shapeP)}px)` }} />

      <div className="relative z-10 w-full max-w-[420px] px-8" style={{ opacity: mainFade }}>
        {/* Card — slow slide from right */}
        <div className="bg-[#1e2423] border border-white/[0.08] rounded-[16px] p-7 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_30px_60px_-20px_rgba(0,0,0,0.5)]"
          style={{ opacity: cardP, transform: `translateX(${100 * (1 - cardP)}px) scale(${breathe})` }}>
          <h2 className="font-display font-[800] text-[32px] tracking-[-0.04em] leading-[1.1] text-[#fafaf7] mb-4">
            Smart Routing<br /><span className="text-[#d97757]">Simplified</span>
          </h2>
          {bodyLines.map((line, i) => {
            const lp = ease(Math.max(0, Math.min(1, (t - BODY_START - i * BODY_STAGGER) / 400)));
            return <p key={i} className="text-[15px] text-white/60 leading-relaxed mb-2" style={{ opacity: lp, transform: `translateY(${8 * (1 - lp)}px)` }}>{line}</p>;
          })}
          {/* Checkmark + stat */}
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.06]" style={{ opacity: checkP }}>
            <div className="w-10 h-10 rounded-full bg-[#d97757] grid place-items-center" style={{ transform: `scale(${spring(checkP)})` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d0f0e" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <span className="font-display font-[700] text-[18px] text-[#fafaf7]">+18% approvals</span>
          </div>
        </div>

        {/* Why CascadX */}
        <div className="mt-8" style={{ opacity: whyP, transform: `translateY(${20 * (1 - whyP)}px)` }}>
          <h3 className="font-display font-[700] text-[22px] text-[#fafaf7] tracking-[-0.02em] mb-4">Why CascadX?</h3>
          {bullets.map((b, i) => {
            const bp = ease(Math.max(0, Math.min(1, (t - BULLET_START - i * BULLET_STAGGER) / 400)));
            return (
              <div key={b} className="flex items-center gap-3 mb-3" style={{ opacity: bp, transform: `translateX(${12 * (1 - bp)}px)` }}>
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
