"use client";
import { useEffect, useState, useRef } from "react";
import type { ReelTheme } from "@/lib/themes";
import ReelLogoOutro from "@/components/ReelLogoOutro";
import LiquidShape from "@/components/LiquidShape";

const pills = ["Risk scoring", "BIN routing", "PSP cascading", "Retry logic", "Approval lift"];
const LOOP = 12000;
const TITLE_IN = 0, TITLE_DUR = 2100;
const ORB_IN = 2100, ORB_DUR = 1400;
const PILLS_START = 3500, PILL_STAGGER = 840, PILL_DUR = 560;
const HOLD_START = 8200, HOLD_DUR = 1800;
const OUTRO_START = 10500, OUTRO_DUR = 1500;

export default function CascadingLayers({ theme }: { theme: ReelTheme }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);
  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);
  const titleP = ease(Math.max(0, Math.min(1, (t - TITLE_IN) / TITLE_DUR)));
  const orbP = ease(Math.max(0, Math.min(1, (t - ORB_IN) / ORB_DUR)));
  const breathe = t >= HOLD_START && t < HOLD_START + HOLD_DUR ? 1 + 0.02 * Math.sin(((t - HOLD_START) / HOLD_DUR) * Math.PI) : 1;
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < OUTRO_START - 500 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 500)) / 500);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start overflow-hidden" style={{ cursor: "none", background: theme.bg }}>
      <div className="mt-[15vh] text-center px-8" style={{ opacity: mainFade, transform: `translateY(${-50 * (1 - titleP)}px)` }}>
        <h1 className="font-display font-[800] text-[48px] tracking-[-0.04em] leading-[1.1]" style={{ color: theme.ink }}>
          Inside the Cascading<br /><span style={{ color: theme.accent }}>Decision Engine</span>
        </h1>
      </div>
      <div className="relative mt-12 flex flex-col items-center" style={{ opacity: mainFade }}>
        <LiquidShape theme={theme} className="w-[280px] h-[320px]" style={{ opacity: orbP, transform: `scale(${0.9 + 0.1 * orbP}) scale(${breathe})` }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pt-4">
          {pills.map((pill, i) => {
            const pp = spring(Math.max(0, Math.min(1, (t - PILLS_START - i * PILL_STAGGER) / PILL_DUR)));
            const isAccent = i === 2;
            const emph = isAccent && pp >= 1 ? 1 + 0.05 * Math.sin(Math.max(0, t - PILLS_START - i * PILL_STAGGER - PILL_DUR) / 300 * Math.PI) * Math.max(0, 1 - (t - PILLS_START - i * PILL_STAGGER - PILL_DUR) / 600) : 1;
            return (
              <div key={pill} className="px-5 py-2.5 rounded-full text-[15px] font-medium border"
                style={{ borderColor: isAccent ? theme.accent : theme.border, color: isAccent ? theme.accent : theme.inkSoft, background: theme.surface, opacity: pp, transform: `translateY(${20 * (1 - pp)}px) scale(${(0.9 + 0.1 * pp) * emph})`, boxShadow: isAccent ? `0 0 20px rgba(217,119,87,0.3)` : "none" }}>
                {pill}
              </div>
            );
          })}
        </div>
      </div>
      {outroP > 0 && <ReelLogoOutro progress={outroP} theme={theme} />}
    </div>
  );
}
