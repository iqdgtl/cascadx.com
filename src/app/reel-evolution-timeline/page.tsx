"use client";
import { useEffect, useState, useRef } from "react";
import ReelLogoOutro from "@/components/ReelLogoOutro";

const LOOP = 10000;
const years = [
  { year: "2015", label: "Static", color: "rgba(255,255,255,0.25)" },
  { year: "2018", label: "Rules", color: "rgba(255,255,255,0.4)" },
  { year: "2022", label: "ML", color: "rgba(255,255,255,0.7)" },
  { year: "2026", label: "CascadX", color: "#d97757" },
];

// Timeline (ms)
const BADGE_IN = 0, BADGE_DUR = 1000;
const YEAR_START = 1000, YEAR_HOLD = 1000; // 1s per year
const YEAR_FINAL = YEAR_START + 3 * YEAR_HOLD; // 4000 = shows "2015 → 2026"
const HEAD_IN = 5000, HEAD_DUR = 800;
const NODE_START = 6000, NODE_STAGGER = 600;
const HOLD_END = 8500;
const OUTRO_START = 9000, OUTRO_DUR = 1000;

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

  const badgeP = spring(Math.max(0, Math.min(1, (t - BADGE_IN) / BADGE_DUR)));
  // Year index: each holds 1 full second
  const yearIdx = t < YEAR_START ? 0 : Math.min(3, Math.floor((t - YEAR_START) / YEAR_HOLD));
  const showArrow = t >= YEAR_FINAL;

  const headP = ease(Math.max(0, Math.min(1, (t - HEAD_IN) / HEAD_DUR)));
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < HOLD_END ? 1 : Math.max(0, 1 - (t - HOLD_END) / 500);

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex flex-col items-center overflow-hidden" style={{ cursor: "none" }}>
      <div className="flex flex-col items-center mt-[12vh]" style={{ opacity: mainFade }}>
        {/* Year badge — 1s per year */}
        <div className="relative w-28 h-28 rounded-full bg-[#1e2423] border-2 border-[#d97757]/40 grid place-items-center mb-10"
          style={{ transform: `scale(${badgeP})`, opacity: badgeP > 0.05 ? 1 : 0 }}>
          <div className="text-center">
            {showArrow ? (
              <span className="font-display font-[800] text-[22px] text-[#fafaf7] tracking-[-0.02em]">
                2015 <span className="text-[#d97757]">→</span> 2026
              </span>
            ) : (
              <span className="font-display font-[800] text-[36px] text-[#fafaf7] tracking-[-0.02em]">
                {years[yearIdx].year}
              </span>
            )}
          </div>
          <div className="absolute inset-[-8px] rounded-full border border-[#d97757]/20 animate-[pulse_2.6s_ease-in-out_infinite]" />
        </div>

        {/* Headline */}
        <div className="text-center px-8" style={{ opacity: headP, transform: `translateY(${16 * (1 - headP)}px)` }}>
          <h1 className="font-display font-[800] text-[44px] tracking-[-0.04em] leading-[1.1] text-[#fafaf7] mb-3">
            The Evolution of<br />Payment Routing
          </h1>
          <p className="text-[18px] text-white/50">From static rules to learning AI.</p>
        </div>
      </div>

      {/* Timeline nodes */}
      <div className="absolute bottom-[22vh] left-0 right-0 px-12" style={{ opacity: mainFade }}>
        <div className="relative h-[2px] bg-white/[0.08] rounded-full mx-4">
          {years.map((y, i) => {
            const nodeStart = NODE_START + i * NODE_STAGGER;
            const nodeP = spring(Math.max(0, Math.min(1, (t - nodeStart) / 500)));
            const isCx = i === 3;
            const pct = (i / (years.length - 1)) * 100;
            return (
              <div key={y.year} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${pct}%`, opacity: nodeP, transform: `translateX(-50%) scale(${spring(nodeP)})` }}>
                <div className={`rounded-full grid place-items-center ${isCx ? "w-10 h-10 border-2 border-[#d97757]" : "w-6 h-6 border border-white/20"}`}
                  style={{ background: isCx ? "#d97757" : "#1e2423", boxShadow: isCx ? "0 0 30px rgba(217,119,87,0.4)" : "none" }}>
                  {isCx && <span className="text-[10px] font-mono font-bold text-[#0d0f0e]">CX</span>}
                </div>
                <span className="font-mono text-[11px] mt-3 tracking-[0.06em]" style={{ color: y.color }}>{y.year}</span>
                <span className="font-mono text-[10px] mt-1 uppercase tracking-[0.08em]" style={{ color: y.color }}>{y.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {outroP > 0 && <ReelLogoOutro progress={outroP} />}
    </div>
  );
}
