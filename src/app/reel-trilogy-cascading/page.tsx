"use client";
import { useEffect, useState, useRef } from "react";
import { pastel } from "@/lib/pastelTheme";
import CoverFrameLogoSlice from "@/components/reels/CoverFrameLogoSlice";
import LivingGlobe from "@/components/reels/LivingGlobe";

const LOOP = 12000;
const COVER_IN = 0, COVER_DUR = 1500;
const TRANS_START = 1500, TRANS_DUR = 1000;
const GLOBE_IN = 2500;
const TX_IN = 4000, TX_DUR = 800;
const EVAL_START = 5200, EVAL_STAGGER = 600;
const PICK_AT = 7400, PICK_DUR = 800;
const LINE_START = 8200, LINE_DUR = 800;
const OUTRO_START = 10000, OUTRO_DUR = 1200;
const OUTRO_HOLD_END = 11500;

const psps = [
  { name: "Stripe", color: "#635BFF" },
  { name: "Adyen", color: "#0ABF53" },
  { name: "Worldpay", color: "#E4002B" },
  { name: "Klarna", color: "#FFB3C7" },
];

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
  const globeVisible = t >= GLOBE_IN;
  const txP = spring(Math.max(0, Math.min(1, (t - TX_IN) / TX_DUR)));
  const picked = t >= PICK_AT;
  const pickP = spring(Math.max(0, Math.min(1, (t - PICK_AT) / PICK_DUR)));
  const lineP = ease(Math.max(0, Math.min(1, (t - LINE_START) / LINE_DUR)));
  const outroP = ease(Math.max(0, Math.min(1, (t - OUTRO_START) / OUTRO_DUR)));
  const outroFade = t >= OUTRO_HOLD_END ? Math.max(0, 1 - (t - OUTRO_HOLD_END) / 500) : 1;
  const contentFade = t < OUTRO_START - 400 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 400)) / 400);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9/16", position: "relative", overflow: "hidden", background: pastel.bg }}>

        {/* Cover frame: "CAD" portion (middle third of wordmark) */}
        {t < TRANS_START + TRANS_DUR && (
          <div style={{ opacity: 1 - transP }}>
            <CoverFrameLogoSlice portion={2} progress={coverP} />
          </div>
        )}

        {/* Globe background */}
        {globeVisible && <div style={{ opacity: contentFade * 0.7 }}><LivingGlobe t={t} /></div>}

        {/* Main content overlay */}
        {t >= TRANS_START && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8" style={{ opacity: contentFade, zIndex: 10 }}>
            {/* Transaction incoming */}
            {txP > 0 && (
              <div className="absolute top-[18%] flex items-center gap-3 px-5 py-3 rounded-xl border" style={{ background: pastel.surface, borderColor: pastel.line, opacity: txP, transform: `translateY(${-20*(1-txP)}px)` }}>
                <span className="text-[24px]">🇪🇸</span>
                <div>
                  <div className="font-display font-[600] text-[15px]" style={{ color: pastel.ink }}>Transaction — Spain</div>
                  <div className="font-mono text-[11px]" style={{ color: pastel.inkSoft }}>€49.99 · Visa ending 4242</div>
                </div>
              </div>
            )}

            {/* PSP evaluation */}
            <div className="absolute bottom-[28%] flex gap-3 flex-wrap justify-center">
              {psps.map((psp, i) => {
                const ep = spring(Math.max(0, Math.min(1, (t - EVAL_START - i * EVAL_STAGGER) / 500)));
                const isChosen = i === 1; // Adyen
                const chosenGlow = isChosen && picked;
                return (
                  <div key={psp.name} className="flex flex-col items-center gap-1" style={{ opacity: ep, transform: `scale(${ep})` }}>
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center" style={{ background: pastel.surface, border: `2px solid ${chosenGlow ? pastel.accent : pastel.line}`, boxShadow: chosenGlow ? `0 0 20px rgba(217,119,87,0.4)` : "none", transform: chosenGlow ? `scale(${1 + 0.08 * pickP})` : "scale(1)" }}>
                      <span className="font-mono text-[9px] font-bold" style={{ color: psp.color }}>{psp.name}</span>
                    </div>
                    <span className="font-mono text-[10px]" style={{ color: chosenGlow ? pastel.accent : pastel.inkSoft }}>{isChosen && picked ? "✓ Selected" : "Evaluating"}</span>
                  </div>
                );
              })}
            </div>

            {/* Connection line from TX to chosen PSP */}
            {lineP > 0 && (
              <div className="absolute top-[30%] left-1/2 w-[2px] -translate-x-1/2" style={{ height: `${lineP * 35}%`, background: `linear-gradient(180deg, ${pastel.accent}80, ${pastel.accent}00)` }} />
            )}

            {/* "Optimal PSP selected" label */}
            {picked && pickP > 0.8 && (
              <div className="absolute bottom-[20%] font-mono text-[12px] px-4 py-2 rounded-full" style={{ background: `${pastel.accent}15`, color: pastel.accent, border: `1px solid ${pastel.accent}30`, opacity: Math.min(1, (pickP - 0.8) * 5) }}>
                Optimal PSP selected
              </div>
            )}
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
