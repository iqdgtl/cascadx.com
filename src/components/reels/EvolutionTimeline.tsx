"use client";
import { useEffect, useState, useRef } from "react";
import type { ReelTheme } from "@/lib/themes";
import ReelLogoOutro from "@/components/ReelLogoOutro";

const LOOP = 14000;
const years = [
  { year: "2015", label: "Static", shade: 0.25 },
  { year: "2018", label: "Rules", shade: 0.4 },
  { year: "2022", label: "ML", shade: 0.7 },
  { year: "2026", label: "CascadX", shade: 1 },
];
const BADGE_IN = 0, BADGE_DUR = 1400;
const YEAR_START = 1400, YEAR_HOLD = 1400;
const HEAD_IN = 7000, HEAD_DUR = 1120;
const NODE_START = 8400, NODE_STAGGER = 840;
const HOLD_END = 12000;
const OUTRO_START = 12500, OUTRO_DUR = 1500;

export default function EvolutionTimeline({ theme }: { theme: ReelTheme }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);
  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const badgeP = spring(Math.max(0, Math.min(1, (t - BADGE_IN) / BADGE_DUR)));
  const yearIdx = t < YEAR_START ? 0 : Math.min(3, Math.floor((t - YEAR_START) / YEAR_HOLD));
  const showArrow = t >= YEAR_START + 3 * YEAR_HOLD;
  const headP = ease(Math.max(0, Math.min(1, (t - HEAD_IN) / HEAD_DUR)));
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < HOLD_END ? 1 : Math.max(0, 1 - (t - HOLD_END) / 500);

  const nodeColor = (shade: number, isCx: boolean) => isCx ? theme.accent : theme.bg === "#0d0f0e" ? `rgba(255,255,255,${shade})` : `rgba(0,0,0,${shade * 0.8})`;

  return (
    <div className="fixed inset-0 flex flex-col items-center overflow-hidden" style={{ cursor: "none", background: theme.bg }}>
      <div className="flex flex-col items-center mt-[12vh]" style={{ opacity: mainFade }}>
        <div className="relative w-28 h-28 rounded-full grid place-items-center mb-10"
          style={{ background: theme.surface, border: `2px solid rgba(217,119,87,0.4)`, transform: `scale(${badgeP})`, opacity: badgeP > 0.05 ? 1 : 0 }}>
          <div className="text-center">
            {showArrow ? (
              <span className="font-display font-[800] text-[22px] tracking-[-0.02em]" style={{ color: theme.ink }}>2015 <span style={{ color: theme.accent }}>→</span> 2026</span>
            ) : (
              <span className="font-display font-[800] text-[36px] tracking-[-0.02em]" style={{ color: theme.ink }}>{years[yearIdx].year}</span>
            )}
          </div>
          <div className="absolute inset-[-8px] rounded-full border border-[#d97757]/20 animate-[pulse_2.6s_ease-in-out_infinite]" />
        </div>
        <div className="text-center px-8" style={{ opacity: headP, transform: `translateY(${16 * (1 - headP)}px)` }}>
          <h1 className="font-display font-[800] text-[44px] tracking-[-0.04em] leading-[1.1] mb-3" style={{ color: theme.ink }}>The Evolution of<br />Payment Routing</h1>
          <p className="text-[18px]" style={{ color: theme.inkSoft }}>From static rules to learning AI.</p>
        </div>
      </div>
      <div className="absolute bottom-[22vh] left-0 right-0 px-12" style={{ opacity: mainFade }}>
        <div className="relative h-[2px] rounded-full mx-4" style={{ background: theme.border }}>
          {years.map((y, i) => {
            const nodeP = spring(Math.max(0, Math.min(1, (t - NODE_START - i * NODE_STAGGER) / 700)));
            const isCx = i === 3;
            const pct = (i / 3) * 100;
            return (
              <div key={y.year} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${pct}%`, opacity: nodeP, transform: `translateX(-50%) scale(${spring(nodeP)})` }}>
                <div className={`rounded-full grid place-items-center ${isCx ? "w-10 h-10" : "w-6 h-6"}`}
                  style={{ background: isCx ? theme.accent : theme.surface, border: isCx ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, boxShadow: isCx ? "0 0 30px rgba(217,119,87,0.4)" : "none" }}>
                  {isCx && <span className="text-[10px] font-mono font-bold" style={{ color: theme.bg }}>CX</span>}
                </div>
                <span className="font-mono text-[11px] mt-3 tracking-[0.06em]" style={{ color: nodeColor(y.shade, isCx) }}>{y.year}</span>
                <span className="font-mono text-[10px] mt-1 uppercase tracking-[0.08em]" style={{ color: nodeColor(y.shade, isCx) }}>{y.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      {outroP > 0 && <ReelLogoOutro progress={outroP} theme={theme} />}
    </div>
  );
}
