"use client";
import { useEffect, useState, useRef } from "react";
import ReelLogoOutro from "@/components/ReelLogoOutro";
import LiquidShape from "@/components/LiquidShape";

const pills = ["Risk scoring", "BIN routing", "PSP cascading", "Retry logic", "Approval lift"];
const LOOP = 8000;

// Timeline constants (ms)
const TITLE_IN = 0, TITLE_DUR = 1500;
const ORB_IN = 1500, ORB_DUR = 1000;
const PILLS_START = 2500, PILL_STAGGER = 600, PILL_DUR = 400;
const HOLD_START = 5500, HOLD_DUR = 1000;
const OUTRO_START = 6500, OUTRO_DUR = 1500;

export default function Reel() {
  const [t, setT] = useState(-1);
  const raf = useRef(0);
  const s = useRef(0);
  useEffect(() => {
    const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000);
    return () => { clearTimeout(r); cancelAnimationFrame(raf.current); };
  }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const titleP = ease(Math.max(0, Math.min(1, (t - TITLE_IN) / TITLE_DUR)));
  const orbP = ease(Math.max(0, Math.min(1, (t - ORB_IN) / ORB_DUR)));
  const breathe = t >= HOLD_START && t < HOLD_START + HOLD_DUR ? 1 + 0.02 * Math.sin(((t - HOLD_START) / HOLD_DUR) * Math.PI) : 1;
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < OUTRO_START - 500 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 500)) / 500);

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex flex-col items-center justify-start overflow-hidden" style={{ cursor: "none" }}>
      {/* Title — slides down from above */}
      <div className="mt-[15vh] text-center px-8" style={{ opacity: mainFade, transform: `translateY(${-50 * (1 - titleP)}px)` }}>
        <h1 className="font-display font-[800] text-[48px] tracking-[-0.04em] leading-[1.1] text-[#fafaf7]">
          Inside the Cascading<br /><span className="text-[#d97757]">Decision Engine</span>
        </h1>
      </div>

      {/* Orb + pills */}
      <div className="relative mt-12 flex flex-col items-center" style={{ opacity: mainFade }}>
        <LiquidShape className="w-[280px] h-[320px]" style={{ opacity: orbP, transform: `scale(${0.9 + 0.1 * orbP}) scale(${breathe})` }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pt-4">
          {pills.map((pill, i) => {
            const pillStart = PILLS_START + i * PILL_STAGGER;
            const pp = spring(Math.max(0, Math.min(1, (t - pillStart) / PILL_DUR)));
            const isAccent = i === 2;
            // Extra emphasis pulse for PSP cascading
            const emphP = isAccent && pp >= 1 ? 1 + 0.05 * Math.sin(Math.max(0, t - pillStart - PILL_DUR) / 300 * Math.PI) * Math.max(0, 1 - (t - pillStart - PILL_DUR) / 600) : 1;
            return (
              <div key={pill}
                className={`px-5 py-2.5 rounded-full text-[15px] font-medium border ${isAccent ? "border-[#d97757] text-[#d97757] shadow-[0_0_20px_rgba(217,119,87,0.3)]" : "border-white/[0.12] text-white/70"}`}
                style={{ opacity: pp, transform: `translateY(${20 * (1 - pp)}px) scale(${(0.9 + 0.1 * pp) * emphP})`, background: "#1e2423" }}>
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
