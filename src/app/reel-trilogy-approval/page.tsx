"use client";
import { useEffect, useState, useRef } from "react";
import { pastel } from "@/lib/pastelTheme";

const LOOP = 10000;
const COVER_IN = 0, COVER_DUR = 1500;
const TRANS_START = 1500, TRANS_DUR = 1000;
const STATUS_IN = 2500, STATUS_DUR = 800;
const APPROVE_AT = 4000, APPROVE_DUR = 600;
const CONFETTI_AT = 4600;
const COUNTER_START = 5200, COUNTER_DUR = 1500;
const REVENUE_START = 6000, REVENUE_DUR = 1200;
const OUTRO_START = 8000, OUTRO_DUR = 1200;
const OUTRO_HOLD_END = 9500;

const logoLetters = "CascadX".split("");
const logoStarts = [
  { x: -80, y: -50, r: -12 }, { x: 60, y: -70, r: 10 }, { x: -40, y: 60, r: -8 },
  { x: 100, y: 40, r: 15 }, { x: -60, y: -25, r: -6 }, { x: 40, y: 80, r: 9 }, { x: -55, y: -65, r: -14 },
];

export default function Page() {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const coverP = spring(Math.max(0, Math.min(1, (t - COVER_IN) / COVER_DUR)));
  const transP = ease(Math.max(0, Math.min(1, (t - TRANS_START) / TRANS_DUR)));
  const statusP = spring(Math.max(0, Math.min(1, (t - STATUS_IN) / STATUS_DUR)));
  const approved = t >= APPROVE_AT;
  const approveP = spring(Math.max(0, Math.min(1, (t - APPROVE_AT) / APPROVE_DUR)));
  const showConfetti = t >= CONFETTI_AT && t < CONFETTI_AT + 2000;

  // Counter: 87 → 94
  const counterElapsed = Math.max(0, t - COUNTER_START);
  const counterVal = Math.min(94, 87 + 7 * ease(Math.min(1, counterElapsed / COUNTER_DUR)));

  // Revenue counter
  const revElapsed = Math.max(0, t - REVENUE_START);
  const revVal = Math.min(12450, Math.round(12450 * ease(Math.min(1, revElapsed / REVENUE_DUR))));

  const outroP = ease(Math.max(0, Math.min(1, (t - OUTRO_START) / OUTRO_DUR)));
  const outroFade = t >= OUTRO_HOLD_END ? Math.max(0, 1 - (t - OUTRO_HOLD_END) / 500) : 1;
  const contentFade = t < OUTRO_START - 400 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 400)) / 400);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9/16", position: "relative", overflow: "hidden", background: pastel.bg }}>

        {/* Cover frame: tagline */}
        {t < TRANS_START + TRANS_DUR && (
          <div className="absolute inset-0 flex items-center justify-center px-10" style={{ opacity: 1 - transP }}>
            <p className="font-display font-[800] text-[36px] tracking-[-0.03em] leading-[1.15] text-center" style={{ color: pastel.ink, transform: `scale(${0.95 + 0.05 * coverP})`, opacity: coverP }}>
              Payments that <span style={{ color: pastel.accent }}>think</span> before they fall.
            </p>
          </div>
        )}

        {/* Main content */}
        {t >= TRANS_START && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8" style={{ opacity: contentFade }}>
            {/* Transaction status card */}
            <div className="relative w-[300px] rounded-[18px] p-8 flex flex-col items-center" style={{ background: pastel.surface, border: `1px solid ${pastel.line}`, boxShadow: "0 16px 48px rgba(0,0,0,0.08)", opacity: statusP, transform: `scale(${statusP})` }}>
              {approved ? (
                <>
                  {/* Checkmark */}
                  <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4" style={{ background: pastel.accent, transform: `scale(${approveP})` }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={pastel.bg} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <span className="font-display font-[700] text-[28px]" style={{ color: pastel.ink }}>Approved</span>
                  <span className="font-mono text-[12px] mt-2" style={{ color: pastel.inkSoft }}>Transaction captured successfully</span>
                </>
              ) : (
                <>
                  {/* Pending */}
                  <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 border-2" style={{ borderColor: pastel.line }}>
                    <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: `${pastel.accent} transparent transparent transparent` }} />
                  </div>
                  <span className="font-display font-[700] text-[28px]" style={{ color: pastel.inkSoft }}>Pending...</span>
                  <span className="font-mono text-[12px] mt-2" style={{ color: pastel.inkSoft }}>Processing transaction</span>
                </>
              )}
            </div>

            {/* Confetti */}
            {showConfetti && Array.from({ length: 10 }).map((_, i) => {
              const angle = (i / 10) * 360 + 18;
              const rad = (angle * Math.PI) / 180;
              const dist = 60 + ((t - CONFETTI_AT) / 2000) * 80;
              const fade = Math.max(0, 1 - (t - CONFETTI_AT) / 1500);
              return <div key={i} className="absolute w-[6px] h-[6px] rounded-full" style={{ left: `calc(50% + ${Math.cos(rad) * dist}px)`, top: `calc(45% + ${Math.sin(rad) * dist}px)`, background: pastel.accent, opacity: fade * 0.7 }} />;
            })}

            {/* Stats below */}
            <div className="mt-10 flex gap-8">
              {/* Approval rate */}
              {t >= COUNTER_START && (
                <div className="text-center" style={{ opacity: ease(Math.min(1, counterElapsed / 400)) }}>
                  <div className="font-display font-[800] text-[42px] tracking-[-0.03em]" style={{ color: pastel.accent }}>
                    {counterVal.toFixed(1)}%
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.08em] mt-1" style={{ color: pastel.inkSoft }}>Approval rate</div>
                </div>
              )}
              {/* Revenue */}
              {t >= REVENUE_START && (
                <div className="text-center" style={{ opacity: ease(Math.min(1, revElapsed / 400)) }}>
                  <div className="font-display font-[800] text-[42px] tracking-[-0.03em]" style={{ color: pastel.ink }}>
                    +${revVal.toLocaleString()}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.08em] mt-1" style={{ color: pastel.inkSoft }}>Captured this hour</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Logo outro */}
        {outroP > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: outroP * outroFade, zIndex: 50, background: `${pastel.bg}e6` }}>
            <div className="flex items-baseline">
              {logoLetters.map((char, i) => { const p = Math.max(0, Math.min(1, (outroP*7-i*0.5)/1.2)); const sp2 = spring(p); const ls = logoStarts[i]; return (<span key={i} className="font-display font-[800] tracking-[-0.035em] inline-block" style={{ fontSize: "48px", color: pastel.ink, transform: `translate(${ls.x*(1-sp2)}px,${ls.y*(1-sp2)}px) rotate(${ls.r*(1-sp2)}deg)`, opacity: p>0?Math.min(1,p*3):0 }}>{char}</span>); })}
              <span className="inline-block w-[8px] h-[8px] rounded-full ml-[3px]" style={{ background: pastel.accent, transform: `scale(${spring(Math.max(0,(outroP-0.7)/0.15))})` }} />
            </div>
            <p className="font-display font-[400] mt-4 text-[20px]" style={{ color: pastel.inkSoft, opacity: Math.max(0,(outroP-0.8)/0.2) }}>Payments that think.</p>
          </div>
        )}
      </div>
    </div>
  );
}
