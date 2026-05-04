"use client";
import { useEffect, useState, useRef } from "react";
import type { ReelTheme } from "@/lib/themes";
import ReelLogoOutro from "@/components/ReelLogoOutro";
import LiquidShape from "@/components/LiquidShape";

const LOOP = 13000;
const bodyLines = ["Route every transaction through the optimal PSP.", "Recover revenue from soft declines automatically.", "Deploy in under a day — no migration needed."];
const bullets = ["Recovers declined transactions", "Connects 1,000+ PSPs", "Learns from every transaction"];
const SHAPE_IN = 0, SHAPE_DUR = 2100;
const CARD_IN = 2100, CARD_DUR = 2100;
const BODY_START = 4200, BODY_STAGGER = 700;
const CHECK_IN = 7000, CHECK_DUR = 840;
const WHY_TITLE = 8100, WHY_DUR = 560;
const BULLET_START = 8700, BULLET_STAGGER = 700;
const HOLD_END = 10800;
const OUTRO_START = 11500, OUTRO_DUR = 1500;

export default function FeatureCard({ theme }: { theme: ReelTheme }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);
  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const shapeP = ease(Math.max(0, Math.min(1, (t - SHAPE_IN) / SHAPE_DUR)));
  const cardP = ease(Math.max(0, Math.min(1, (t - CARD_IN) / CARD_DUR)));
  const checkP = spring(Math.max(0, Math.min(1, (t - CHECK_IN) / CHECK_DUR)));
  const whyP = ease(Math.max(0, Math.min(1, (t - WHY_TITLE) / WHY_DUR)));
  const breathe = t >= HOLD_END && t < OUTRO_START ? 1 + 0.02 * Math.sin(((t - HOLD_END) / 700) * Math.PI) : 1;
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < HOLD_END ? 1 : Math.max(0, 1 - (t - HOLD_END) / 500);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ cursor: "none", background: theme.bg }}>
      <LiquidShape theme={theme} className="absolute left-[-80px] top-[15%] w-[300px] h-[500px]" style={{ opacity: shapeP * 0.7 * mainFade, transform: `translateX(${-80 * (1 - shapeP)}px)` }} />
      <div className="relative z-10 w-full max-w-[420px] px-8" style={{ opacity: mainFade }}>
        <div className="rounded-[16px] p-7" style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: `0 1px 0 ${theme.border} inset, 0 30px 60px -20px rgba(0,0,0,0.3)`, opacity: cardP, transform: `translateX(${100 * (1 - cardP)}px) scale(${breathe})` }}>
          <h2 className="font-display font-[800] text-[32px] tracking-[-0.04em] leading-[1.1] mb-4" style={{ color: theme.ink }}>Smart Routing<br /><span style={{ color: theme.accent }}>Simplified</span></h2>
          {bodyLines.map((line, i) => {
            const lp = ease(Math.max(0, Math.min(1, (t - BODY_START - i * BODY_STAGGER) / 560)));
            return <p key={i} className="text-[15px] leading-relaxed mb-2" style={{ color: theme.inkSoft, opacity: lp, transform: `translateY(${8 * (1 - lp)}px)` }}>{line}</p>;
          })}
          <div className="flex items-center gap-3 mt-5 pt-4" style={{ borderTop: `1px solid ${theme.border}`, opacity: checkP }}>
            <div className="w-10 h-10 rounded-full grid place-items-center" style={{ background: theme.accent, transform: `scale(${spring(checkP)})` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.bg} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <span className="font-display font-[700] text-[18px]" style={{ color: theme.ink }}>+18% approvals</span>
          </div>
        </div>
        <div className="mt-8" style={{ opacity: whyP, transform: `translateY(${20 * (1 - whyP)}px)` }}>
          <h3 className="font-display font-[700] text-[22px] tracking-[-0.02em] mb-4" style={{ color: theme.ink }}>Why CascadX?</h3>
          {bullets.map((b, i) => {
            const bp = ease(Math.max(0, Math.min(1, (t - BULLET_START - i * BULLET_STAGGER) / 560)));
            return (<div key={b} className="flex items-center gap-3 mb-3" style={{ opacity: bp, transform: `translateX(${12 * (1 - bp)}px)` }}><span className="w-2 h-2 rounded-full shrink-0" style={{ background: theme.accent }} /><span className="text-[15px]" style={{ color: theme.inkSoft }}>{b}</span></div>);
          })}
        </div>
      </div>
      {outroP > 0 && <ReelLogoOutro progress={outroP} theme={theme} />}
    </div>
  );
}
