"use client";
import { useEffect, useState, useRef } from "react";
import { pastel } from "@/lib/pastelTheme";
import CoverFrameLogoSlice from "@/components/reels/CoverFrameLogoSlice";

const LOOP = 11000;
const COVER_IN = 0, COVER_DUR = 1500;
const TRANS_START = 1500, TRANS_DUR = 1000;
const CARD_IN = 2500, CARD_DUR = 1000;
const SHIELDS_START = 3500, SHIELD_STAGGER = 400;
const LABELS_START = 5500, LABEL_STAGGER = 800;
const SCAN_START = 7500, SCAN_DUR = 1000;
const OUTRO_START = 9000, OUTRO_DUR = 1200;
const OUTRO_HOLD_END = 10500;

const shields = ["🛡️", "🔒", "✓", "🛡️", "🔒", "✓", "🛡️", "🔒"];
const labels = ["256-bit encryption", "PCI DSS Level 1", "Tokenization"];

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
  const cardP = spring(Math.max(0, Math.min(1, (t - CARD_IN) / CARD_DUR)));
  const scanP = ease(Math.max(0, Math.min(1, (t - SCAN_START) / SCAN_DUR)));
  const outroP = ease(Math.max(0, Math.min(1, (t - OUTRO_START) / OUTRO_DUR)));
  const outroFade = t >= OUTRO_HOLD_END ? Math.max(0, 1 - (t - OUTRO_HOLD_END) / 500) : 1;
  const contentFade = t < OUTRO_START - 400 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 400)) / 400);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9/16", position: "relative", overflow: "hidden", background: pastel.bg }}>

        {/* Cover frame: "CAS" portion (first third of wordmark) */}
        {t < TRANS_START + TRANS_DUR && (
          <div style={{ opacity: 1 - transP }}>
            <CoverFrameLogoSlice portion={1} progress={coverP} />
          </div>
        )}

        {/* Main content */}
        {t >= TRANS_START && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8" style={{ opacity: contentFade }}>
            {/* Small brand mark top */}
            <div className="absolute top-[6%] left-1/2 -translate-x-1/2" style={{ opacity: transP * 0.6 }}>
              <span className="font-display font-[800] text-[20px] tracking-[-0.035em]" style={{ color: pastel.ink }}>CascadX</span>
              <span className="inline-block w-[4px] h-[4px] rounded-full ml-[2px]" style={{ background: pastel.accent }} />
            </div>

            {/* Credit card mockup */}
            <div className="relative w-[320px] h-[200px] rounded-[16px] overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a2520 100%)", transform: `scale(${cardP}) rotateY(${5 - 5 * cardP}deg)`, opacity: cardP, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: pastel.accent }} />
              <div className="p-6 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-8 rounded bg-gradient-to-br from-[#d4a853] to-[#c49a3a]" />
                  <span className="font-mono text-[10px] text-white/40">VISA</span>
                </div>
                <div className="font-mono text-[18px] text-white/80 tracking-[0.12em]">•••• •••• •••• 4242</div>
                <div className="flex justify-between text-[11px] text-white/50 font-mono"><span>CARDHOLDER</span><span>12/28</span></div>
              </div>
              {/* Scan beam */}
              {scanP > 0 && (
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent ${(1 - scanP) * 100}%, rgba(217,119,87,0.15) ${(1 - scanP) * 100 + 5}%, transparent ${(1 - scanP) * 100 + 10}%)` }} />
              )}
            </div>

            {/* Security shields around card */}
            <div className="absolute" style={{ width: "380px", height: "260px", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              {shields.map((s, i) => {
                const sp = spring(Math.max(0, Math.min(1, (t - SHIELDS_START - i * SHIELD_STAGGER) / 500)));
                const angle = (i / shields.length) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 45 * Math.cos(rad);
                const y = 50 + 42 * Math.sin(rad);
                return (
                  <div key={i} className="absolute text-[24px]" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", opacity: sp, filter: `scale(${sp})` }}>
                    {s}
                  </div>
                );
              })}
            </div>

            {/* Labels */}
            <div className="mt-10 flex flex-col items-center gap-3">
              {labels.map((label, i) => {
                const lp = ease(Math.max(0, Math.min(1, (t - LABELS_START - i * LABEL_STAGGER) / 500)));
                return (
                  <div key={label} className="px-4 py-2 rounded-full border font-mono text-[13px]" style={{ borderColor: pastel.line, color: pastel.ink, opacity: lp, transform: `translateY(${10 * (1 - lp)}px)`, background: pastel.surface }}>
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Logo outro */}
        {outroP > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: outroP * outroFade, zIndex: 50, background: `${pastel.bg}e6` }}>
            <div className="flex items-baseline">
              {logoLetters.map((char, i) => { const p = Math.max(0, Math.min(1, (outroP * 7 - i * 0.5) / 1.2)); const sp2 = spring(p); const ls = logoStarts[i]; return (<span key={i} className="font-display font-[800] tracking-[-0.035em] inline-block" style={{ fontSize: "48px", color: pastel.ink, transform: `translate(${ls.x*(1-sp2)}px,${ls.y*(1-sp2)}px) rotate(${ls.r*(1-sp2)}deg)`, opacity: p > 0 ? Math.min(1, p*3) : 0 }}>{char}</span>); })}
              <span className="inline-block w-[8px] h-[8px] rounded-full ml-[3px]" style={{ background: pastel.accent, transform: `scale(${spring(Math.max(0, (outroP-0.7)/0.15))})` }} />
            </div>
            <p className="font-display font-[400] mt-4 text-[20px] tracking-[-0.01em]" style={{ color: pastel.inkSoft, opacity: Math.max(0, (outroP-0.8)/0.2) }}>Payments that think.</p>
          </div>
        )}
      </div>
    </div>
  );
}
