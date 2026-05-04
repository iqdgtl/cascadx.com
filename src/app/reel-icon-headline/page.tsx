"use client";
import { useEffect, useState, useRef } from "react";
import ReelLogoOutro from "@/components/ReelLogoOutro";

const LOOP = 7000;
const line1 = "Operators Expect";
const line2 = "Sub-40ms Decisions";

export default function Reel() {
  const [t, setT] = useState(-1);
  const raf = useRef(0);
  const s = useRef(0);
  useEffect(() => {
    const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000);
    return () => { clearTimeout(r); cancelAnimationFrame(raf.current); };
  }, []);
  const sp = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const iconP = Math.max(0, Math.min(1, t / 600));
  const iconBounce = sp(iconP);
  const chars1 = Math.min(line1.length, Math.floor(Math.max(0, t - 1500) / 20));
  const chars2 = Math.min(line2.length, Math.floor(Math.max(0, t - 1800) / 20));
  const waveP = Math.max(0, Math.min(1, (t - 3000) / 1500));
  const outroP = Math.max(0, (t - 5000) / 2000);
  const mainFade = t < 4500 ? 1 : Math.max(0, 1 - (t - 4500) / 500);

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex flex-col items-center justify-center overflow-hidden" style={{ cursor: "none" }}>
      <div style={{ opacity: mainFade }}>
        {/* Icon badge */}
        <div className="flex justify-center mb-10">
          <div className="relative w-20 h-20 rounded-full bg-[#1e2423] border border-white/[0.12] grid place-items-center"
            style={{ transform: `translateY(${-60 * (1 - iconBounce)}px) scale(${iconBounce})`, opacity: iconP }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fafaf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            {/* Halo */}
            <div className="absolute inset-[-12px] rounded-full border border-[#d97757] opacity-20 animate-[pulse_2s_ease-in-out_infinite]" />
            <div className="absolute inset-[-24px] rounded-full" style={{ background: "radial-gradient(circle, rgba(217,119,87,0.15) 0%, transparent 70%)" }} />
          </div>
        </div>

        {/* Typewriter text */}
        <div className="text-center px-8">
          <div className="font-display font-[800] text-[44px] tracking-[-0.04em] leading-[1.1] text-[#fafaf7] min-h-[52px]">
            {line1.slice(0, chars1)}{chars1 < line1.length && <span className="inline-block w-[2px] h-[40px] bg-[#d97757] ml-1 align-middle animate-pulse" />}
          </div>
          <div className="font-display font-[800] text-[44px] tracking-[-0.04em] leading-[1.1] min-h-[52px] mt-2">
            {line2.slice(0, chars2).split("").map((c, i) => (
              <span key={i} className={i < 8 ? "text-[#d97757]" : "text-[#fafaf7]"}>{c}</span>
            ))}
            {chars2 < line2.length && chars2 > 0 && <span className="inline-block w-[2px] h-[40px] bg-[#d97757] ml-1 align-middle animate-pulse" />}
          </div>
        </div>
      </div>

      {/* Liquid wave from bottom */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1080 400" preserveAspectRatio="none" style={{ height: `${waveP * 35}vh`, opacity: waveP * 0.8 }}>
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97757" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0d0f0e" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M0,100 C200,0 400,150 540,80 C680,10 880,120 1080,60 L1080,400 L0,400 Z" fill="url(#waveGrad)" />
        <path d="M0,140 C180,50 380,170 540,110 C700,50 900,140 1080,90 L1080,400 L0,400 Z" fill="rgba(255,255,255,0.03)" />
      </svg>

      {outroP > 0 && <ReelLogoOutro progress={outroP} />}
    </div>
  );
}
