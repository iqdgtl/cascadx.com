"use client";
import { useEffect, useState, useRef } from "react";
import type { ReelTheme } from "@/lib/themes";
import ReelLogoOutro from "@/components/ReelLogoOutro";

const LOOP = 10000;
const line1 = "Operators Expect";
const line2 = "Sub-40ms Decisions";
const ICON_IN = 0, ICON_DUR = 1120;
const HALO_START = 1500;
const TYPE_LINE1 = 2800, LETTER_MS = 84;
const PAUSE = 420;
const TYPE_LINE2_START = TYPE_LINE1 + line1.length * LETTER_MS + PAUSE;
const WAVE_START = 6300, WAVE_DUR = 1400;
const HOLD_END = 8000;
const OUTRO_START = 8500, OUTRO_DUR = 1500;

export default function IconHeadline({ theme }: { theme: ReelTheme }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);
  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const iconP = spring(Math.max(0, Math.min(1, (t - ICON_IN) / ICON_DUR)));
  const haloPulse = t >= HALO_START ? 0.15 + 0.1 * Math.sin((t - HALO_START) / 500 * Math.PI) : 0;
  const chars1 = Math.min(line1.length, Math.floor(Math.max(0, t - TYPE_LINE1) / LETTER_MS));
  const chars2 = Math.min(line2.length, Math.floor(Math.max(0, t - TYPE_LINE2_START) / LETTER_MS));
  const waveP = ease(Math.max(0, Math.min(1, (t - WAVE_START) / WAVE_DUR)));
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < HOLD_END ? 1 : Math.max(0, 1 - (t - HOLD_END) / 500);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden" style={{ cursor: "none", background: theme.bg }}>
      <div style={{ opacity: mainFade }}>
        <div className="flex justify-center mb-10">
          <div className="relative w-20 h-20 rounded-full grid place-items-center" style={{ background: theme.surface, border: `1px solid ${theme.borderStrong}`, transform: `translateY(${-80 * (1 - iconP)}px) scale(${iconP})`, opacity: iconP > 0.05 ? 1 : 0 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            <div className="absolute inset-[-12px] rounded-full" style={{ border: `1px solid ${theme.accent}`, opacity: haloPulse }} />
            <div className="absolute inset-[-24px] rounded-full" style={{ background: `radial-gradient(circle, rgba(217,119,87,${haloPulse}) 0%, transparent 70%)` }} />
          </div>
        </div>
        <div className="text-center px-8">
          <div className="font-display font-[800] text-[44px] tracking-[-0.04em] leading-[1.1] min-h-[52px]" style={{ color: theme.ink }}>{line1.slice(0, chars1)}{t >= TYPE_LINE1 && chars1 < line1.length && <span className="inline-block w-[2px] h-[40px] ml-1 align-middle animate-pulse" style={{ background: theme.accent }} />}</div>
          <div className="font-display font-[800] text-[44px] tracking-[-0.04em] leading-[1.1] min-h-[52px] mt-2">
            {line2.slice(0, chars2).split("").map((c, i) => (<span key={i} style={{ color: i < 8 ? theme.accent : theme.ink }}>{c}</span>))}
            {t >= TYPE_LINE2_START && chars2 < line2.length && chars2 > 0 && <span className="inline-block w-[2px] h-[40px] ml-1 align-middle animate-pulse" style={{ background: theme.accent }} />}
          </div>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1080 400" preserveAspectRatio="none" style={{ height: `${waveP * 35}vh`, opacity: waveP * 0.8 * mainFade }}>
        <defs><linearGradient id="wG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={theme.accent} stopOpacity="0.4" /><stop offset="100%" stopColor={theme.bg} stopOpacity="1" /></linearGradient></defs>
        <path d="M0,100 C200,0 400,150 540,80 C680,10 880,120 1080,60 L1080,400 L0,400 Z" fill="url(#wG)" />
        <path d="M0,140 C180,50 380,170 540,110 C700,50 900,140 1080,90 L1080,400 L0,400 Z" fill="rgba(255,255,255,0.03)" />
      </svg>
      {outroP > 0 && <ReelLogoOutro progress={outroP} theme={theme} />}
    </div>
  );
}
