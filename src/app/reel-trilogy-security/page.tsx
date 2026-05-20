"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { pastel } from "@/lib/pastelTheme";
import CoverFrameLogoSlice from "@/components/reels/CoverFrameLogoSlice";
import LivingGlobe from "@/components/reels/LivingGlobe";

const LOOP = 11000;

// Timeline
const COVER_IN = 0, COVER_DUR = 1500;
const TRANS_START = 1500, TRANS_DUR = 800;
// Scene 1: Card entry
const CARD_IN = 2300, CARD_DUR = 800;
const TYPE_START = 3100;
const DIGITS = "4242424242424242";
const DIGIT_MS = 140; // typing speed per digit
const MASK_DELAY = 400; // delay after 12th digit before masking
// Scene 2: Encryption (hex stream activates)
const HEX_START = 5200;
const NAR_LEFT_1 = 5400; // "→ Encrypting card data"
const NAR_RIGHT_1 = 5900; // "← AES-256 applied"
// Scene 3: Tokenization
const NAR_LEFT_2 = 6600; // "→ Generating token"
const TOKEN_IN = 7000, TOKEN_DUR = 600;
const NAR_RIGHT_2 = 7400; // "← PCI scope eliminated"
// Scene 4: Approval
const APPROVE_AT = 8200, APPROVE_DUR = 500;
const CONFETTI_AT = 8700;
// Outro
const OUTRO_START = 9200, OUTRO_DUR = 1200;
const OUTRO_HOLD_END = 10500;

// Narration text config
const narrations = [
  { t: 5400, side: "left" as const, text: "→ Encrypting card data" },
  { t: 5900, side: "right" as const, text: "← AES-256 applied" },
  { t: 6600, side: "left" as const, text: "→ Generating token" },
  { t: 7400, side: "right" as const, text: "← PCI scope eliminated" },
];
const NAR_TYPE_MS = 50;
const NAR_HOLD = 1200;

// Hex stream generator
function genHexLine(seed: number, len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) {
    const v = ((seed * 1103515245 + 12345 + i * 7919) >>> 0) % 65536;
    s += `0x${v.toString(16).toUpperCase().padStart(4, "0")}  `;
  }
  return s;
}

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

  // Digit typing
  const typeElapsed = Math.max(0, t - TYPE_START);
  const digitsTyped = Math.min(16, Math.floor(typeElapsed / DIGIT_MS));
  // Masking: after 12th digit typed + delay, first 12 become dots
  const maskActive = digitsTyped >= 12 && typeElapsed > 12 * DIGIT_MS + MASK_DELAY;

  let displayNum = "";
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) displayNum += " ";
    if (i < digitsTyped) {
      if (maskActive && i < 12) displayNum += "•";
      else displayNum += DIGITS[i];
    } else {
      displayNum += "_";
    }
  }

  // Hex stream active
  const hexActive = t >= HEX_START && t < OUTRO_START;
  const hexLines = useMemo(() => Array.from({ length: 5 }, (_, i) => genHexLine(i * 42 + 7, 12)), []);

  // Token appearance
  const tokenP = spring(Math.max(0, Math.min(1, (t - TOKEN_IN) / TOKEN_DUR)));
  const tokenVisible = t >= TOKEN_IN;

  // Approval
  const approved = t >= APPROVE_AT;
  const approveP = spring(Math.max(0, Math.min(1, (t - APPROVE_AT) / APPROVE_DUR)));
  const showConfetti = t >= CONFETTI_AT && t < CONFETTI_AT + 1500;

  // Outro
  const outroP = ease(Math.max(0, Math.min(1, (t - OUTRO_START) / OUTRO_DUR)));
  const outroFade = t >= OUTRO_HOLD_END ? Math.max(0, 1 - (t - OUTRO_HOLD_END) / 500) : 1;
  const contentFade = t < OUTRO_START - 400 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 400)) / 400);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9/16", position: "relative", overflow: "hidden", background: pastel.bg }}>

        {/* z=2: Globe background — muted */}
        <div style={{ opacity: 0.12 }}><LivingGlobe t={Math.max(0, t)} /></div>

        {/* z=4: Hex stream */}
        {hexActive && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 4, opacity: contentFade }}>
            {hexLines.map((line, i) => {
              const speed = 10 + i * 5; // 10s, 15s, 20s, 25s, 30s
              const offset = ((t / (speed * 1000)) % 1) * 100;
              return (
                <div key={i} className="absolute whitespace-nowrap font-mono" style={{
                  top: `${38 + i * 3}%`,
                  left: `-${offset}%`,
                  fontSize: "min(14px, 1.5vh)",
                  color: pastel.accent,
                  opacity: 0.5,
                  letterSpacing: "1px",
                }}>
                  {line}{line}
                </div>
              );
            })}
          </div>
        )}

        {/* Cover frame: "CAS" */}
        {t < TRANS_START + TRANS_DUR && (
          <div style={{ opacity: 1 - transP, zIndex: 10 }}>
            <CoverFrameLogoSlice portion={1} progress={coverP} />
          </div>
        )}

        {/* z=6: Cashier card */}
        {t >= CARD_IN && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ zIndex: 6, opacity: contentFade }}>
            {/* Card */}
            <div className="w-full max-w-[340px] rounded-[14px] overflow-hidden" style={{
              background: pastel.surface,
              border: `1px solid ${pastel.line}`,
              boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              transform: `scale(${cardP})`,
              opacity: cardP,
            }}>
              {/* Card header */}
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${pastel.line}` }}>
                <span className="font-display font-[600] text-[14px]" style={{ color: pastel.ink }}>Checkout</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-[6px] h-[6px] rounded-full" style={{ background: "#4ade80" }} />
                  <span className="font-mono text-[10px]" style={{ color: pastel.inkSoft }}>Secure</span>
                </div>
              </div>

              {/* Amount */}
              <div className="px-5 pt-4 pb-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: pastel.inkSoft }}>Amount</span>
                <div className="font-display font-[700] text-[28px] mt-1" style={{ color: pastel.ink }}>€49.99</div>
              </div>

              {/* Card input */}
              <div className="px-5 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: pastel.inkSoft }}>Card number</span>
                <div className="mt-2 px-4 py-3 rounded-lg" style={{ background: `${pastel.bg}`, border: `1px solid ${pastel.line}` }}>
                  <span className="font-mono text-[16px] tracking-[0.08em]" style={{ color: pastel.ink }}>
                    {displayNum}
                  </span>
                  {digitsTyped < 16 && t >= TYPE_START && (
                    <span className="inline-block w-[1.5px] h-[16px] ml-[1px] align-middle" style={{ background: pastel.accent, animation: "pulse 0.8s step-end infinite" }} />
                  )}
                </div>
              </div>

              {/* Token display (replaces card after tokenization) */}
              {tokenVisible && (
                <div className="px-5 pb-4" style={{ opacity: tokenP }}>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg" style={{ background: `${pastel.accent}10`, border: `1px solid ${pastel.accent}30` }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={pastel.accent} strokeWidth="2" strokeLinecap="round"><path d="M12 2L3 7v7c0 6.5 4 10.5 9 13 5-2.5 9-6.5 9-13V7z" /></svg>
                    <span className="font-mono text-[12px]" style={{ color: pastel.accent }}>tok_1A2B3C4D5E6F7G</span>
                  </div>
                </div>
              )}

              {/* Approve button / status */}
              <div className="px-5 pb-5">
                {approved ? (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-lg" style={{ background: pastel.accent, transform: `scale(${approveP})` }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={pastel.bg} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                    <span className="font-display font-[600] text-[15px]" style={{ color: pastel.bg }}>Approved</span>
                  </div>
                ) : (
                  <div className="py-3 rounded-lg text-center" style={{ background: `${pastel.ink}08`, border: `1px solid ${pastel.line}` }}>
                    <span className="font-display font-[500] text-[14px]" style={{ color: pastel.inkSoft }}>Processing...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Confetti */}
            {showConfetti && Array.from({ length: 10 }).map((_, i) => {
              const angle = (i / 10) * 360 + 18;
              const rad = (angle * Math.PI) / 180;
              const dist = 50 + ((t - CONFETTI_AT) / 1500) * 70;
              const fade = Math.max(0, 1 - (t - CONFETTI_AT) / 1200);
              return <div key={i} className="absolute w-[5px] h-[5px] rounded-full" style={{ left: `calc(50% + ${Math.cos(rad) * dist}px)`, top: `calc(48% + ${Math.sin(rad) * dist}px)`, background: pastel.accent, opacity: fade * 0.6, zIndex: 7 }} />;
            })}
          </div>
        )}

        {/* z=8: Narration text on margins */}
        {narrations.map((nar, i) => {
          const elapsed = Math.max(0, t - nar.t);
          const charsShown = Math.min(nar.text.length, Math.floor(elapsed / NAR_TYPE_MS));
          const fadeOut = elapsed > NAR_TYPE_MS * nar.text.length + NAR_HOLD ? Math.max(0, 1 - (elapsed - NAR_TYPE_MS * nar.text.length - NAR_HOLD) / 400) : 1;
          if (elapsed <= 0 || fadeOut <= 0) return null;
          const isLeft = nar.side === "left";
          return (
            <div key={i} className="absolute px-4" style={{
              [isLeft ? "left" : "right"]: "3%",
              top: `${42 + i * 5}%`,
              zIndex: 8,
              opacity: fadeOut * contentFade,
              textAlign: isLeft ? "left" : "right",
            }}>
              <span className="font-mono font-medium whitespace-nowrap" style={{
                fontSize: "min(13px, 1.4vh)",
                color: isLeft ? pastel.accent : `${pastel.ink}b3`,
                letterSpacing: "0.3px",
              }}>
                {nar.text.slice(0, charsShown)}
              </span>
            </div>
          );
        })}

        {/* z=50: Logo outro */}
        {outroP > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: outroP * outroFade, zIndex: 50, background: `${pastel.bg}e6` }}>
            <div className="flex items-baseline">
              {logoLetters.map((char, i) => { const p = Math.max(0, Math.min(1, (outroP*7-i*0.5)/1.2)); const sp = spring(p); const ls = logoStarts[i]; return (<span key={i} className="font-display font-[800] tracking-[-0.035em] inline-block" style={{ fontSize: "48px", color: pastel.ink, transform: `translate(${ls.x*(1-sp)}px,${ls.y*(1-sp)}px) rotate(${ls.r*(1-sp)}deg)`, opacity: p>0?Math.min(1,p*3):0 }}>{char}</span>); })}
              <span className="inline-block w-[8px] h-[8px] rounded-full ml-[3px]" style={{ background: pastel.accent, transform: `scale(${spring(Math.max(0,(outroP-0.7)/0.15))})` }} />
            </div>
            <p className="font-display font-[400] mt-4 text-[20px]" style={{ color: pastel.inkSoft, opacity: Math.max(0,(outroP-0.8)/0.2) }}>Payments that think.</p>
          </div>
        )}
      </div>
    </div>
  );
}
