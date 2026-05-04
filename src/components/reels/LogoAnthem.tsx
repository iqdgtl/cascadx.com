"use client";
import { useEffect, useState, useRef } from "react";
import type { ReelTheme } from "@/lib/themes";

const LOOP = 9000;
const letters = "CascadX".split("");
const scatterPos = [
  { x: -180, y: -220, r: -18 }, { x: 200, y: -160, r: 15 }, { x: -140, y: 180, r: -12 },
  { x: 250, y: 100, r: 20 }, { x: -200, y: -60, r: -15 }, { x: 160, y: 200, r: 10 }, { x: -100, y: -200, r: -20 },
];
const GLOW_START = 0, GLOW_DUR = 2250;
const LINES_START = 2250, LINES_DUR = 1500;
const SCATTER_IN = 3750, SCATTER_DUR = 1500;
const FLY_START = 5250, FLY_DUR = 1500;
const DOT_IN = 6750, DOT_DUR = 450;
const TAG_IN = 7200, TAG_DUR = 750;
const RESET_START = 8550;

export default function LogoAnthem({ theme }: { theme: ReelTheme }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.6);
  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const glowP = ease(Math.max(0, Math.min(1, (t - GLOW_START) / GLOW_DUR)));
  const linesP = ease(Math.max(0, Math.min(1, (t - LINES_START) / LINES_DUR)));
  const scatterP = ease(Math.max(0, Math.min(1, (t - SCATTER_IN) / SCATTER_DUR)));
  const dotP = spring(Math.max(0, Math.min(1, (t - DOT_IN) / DOT_DUR)));
  const tagP = ease(Math.max(0, Math.min(1, (t - TAG_IN) / TAG_DUR)));
  const resetFade = t >= RESET_START ? Math.max(0, 1 - (t - RESET_START) / 450) : 1;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ cursor: "none", background: theme.bg }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(300px 300px at 50% 50%, rgba(217,119,87,${0.12 * glowP * resetFade}), transparent 70%)` }} />
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1080 1920" style={{ opacity: linesP * 0.3 * resetFade }}>
        {[30, 80, 150, 210, 280].map((y, i) => {
          const offset = ((t / 3000 + i * 0.3) % 3) / 3;
          return <line key={i} x1={-200 + offset * 1480} y1={600 + y * 3} x2={200 + offset * 1480} y2={580 + y * 3} stroke={theme.accent} strokeWidth="1" opacity={0.1 + i * 0.04} />;
        })}
      </svg>
      <div className="relative flex items-baseline" style={{ opacity: resetFade }}>
        {letters.map((char, i) => {
          const sc = scatterPos[i];
          let x = 0, y = 0, r = 0, opacity = 0;
          if (t >= SCATTER_IN && t < FLY_START) { x = sc.x; y = sc.y; r = sc.r; opacity = 0.15 * scatterP; }
          else if (t >= FLY_START) { const stagger = i * 120; const fp = spring(Math.max(0, Math.min(1, (t - FLY_START - stagger) / (FLY_DUR - 300)))); x = sc.x * (1 - fp); y = sc.y * (1 - fp); r = sc.r * (1 - fp); opacity = 0.15 + 0.85 * fp; }
          return (<span key={i} className="font-display font-[800] text-[64px] tracking-[-0.035em] inline-block" style={{ color: theme.ink, transform: `translate(${x}px, ${y}px) rotate(${r}deg)`, opacity }}>{char}</span>);
        })}
        <span className="inline-block w-[10px] h-[10px] rounded-full ml-[3px]" style={{ background: theme.accent, transform: `scale(${spring(dotP)})`, opacity: dotP > 0 ? resetFade : 0 }} />
      </div>
      <div className="absolute bottom-[30vh] text-center px-8" style={{ opacity: tagP * resetFade, transform: `translateY(${12 * (1 - tagP)}px)` }}>
        <p className="font-display font-[800] text-[28px] tracking-[-0.03em]" style={{ color: theme.inkSoft }}>Payments that <span style={{ color: theme.accent }}>think</span> before they fall.</p>
      </div>
    </div>
  );
}
