"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { pastel } from "@/lib/pastelTheme";
import CoverFrameLogoSlice from "@/components/reels/CoverFrameLogoSlice";
import LivingGlobe from "@/components/reels/LivingGlobe";

const LOOP = 11000;

// Timeline
const COVER_DUR = 1500;
const CARD_IN = 1500, CARD_DUR = 1000;
// Number typewriter: 16 digits, ~145ms each with variance
const NUM_START = 2500;
// Status texts
const STATUS_1 = 2500;  // "Processing card details..."
const STATUS_2 = 4000;  // "Tokenizing card data..."
const STATUS_3 = 5500;  // "AES-256 encryption applied"
const STATUS_4 = 7000;  // "PCI DSS compliance verified"
const STATUS_5 = 8500;  // "Payment authorized ✓"
// Security pulse
const PULSE_AT = 5500, PULSE_DUR = 600;
const SHIELD_AT = 5800, SHIELD_DUR = 1200;
// Token transform
const TOKEN_START = 7000, TOKEN_DUR = 1000;
// Success
const CHECK_AT = 8500, CHECK_DUR = 500;
const CONFETTI_AT = 8800;
// Outro
const OUTRO_START = 9500, OUTRO_DUR = 1000;
const OUTRO_HOLD_END = 10500;

const statuses = [
  { t: STATUS_1, text: "Processing card details...", accent: false },
  { t: STATUS_2, text: "Tokenizing card data...", accent: false },
  { t: STATUS_3, text: "AES-256 encryption applied", accent: false },
  { t: STATUS_4, text: "PCI DSS compliance verified", accent: false },
  { t: STATUS_5, text: "Payment authorized ✓", accent: true },
];

const logoLetters = "CascadX".split("");
const logoStarts = [
  { x: -80, y: -50, r: -12 }, { x: 60, y: -70, r: 10 }, { x: -40, y: 60, r: -8 },
  { x: 100, y: 40, r: 15 }, { x: -60, y: -25, r: -6 }, { x: 40, y: 80, r: 9 }, { x: -55, y: -65, r: -14 },
];

// Typewriter delays per digit (130-160ms natural variance)
const digitDelays = [142, 155, 133, 148, 138, 160, 135, 152, 140, 157, 130, 145, 150, 136, 158, 143];
const digitCumulative = digitDelays.reduce((acc: number[], d) => { acc.push((acc[acc.length - 1] || 0) + d); return acc; }, [0]);

export default function Page() {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  // Cover
  const coverP = spring(Math.max(0, Math.min(1, t / COVER_DUR)));
  const coverFade = t >= CARD_IN - 500 ? Math.max(0, 1 - (t - (CARD_IN - 500)) / 500) : 1;

  // Card entry
  const cardP = spring(Math.max(0, Math.min(1, (t - CARD_IN) / CARD_DUR)));
  const cardTilt = Math.max(0, 15 * (1 - cardP));

  // Simple typewriter — digit by digit
  const finalDigits = "4242424242424242";
  const typeElapsedNum = Math.max(0, t - NUM_START);
  let digitsTyped = 0;
  for (let i = 0; i < digitCumulative.length; i++) {
    if (typeElapsedNum >= digitCumulative[i]) digitsTyped = i;
  }
  digitsTyped = Math.min(digitsTyped, 16);

  // Token transform
  const tokenP = ease(Math.max(0, Math.min(1, (t - TOKEN_START) / TOKEN_DUR)));
  const showToken = t >= TOKEN_START;

  // Security pulse
  const pulseActive = t >= PULSE_AT && t < PULSE_AT + PULSE_DUR;
  const pulseP = pulseActive ? Math.sin(((t - PULSE_AT) / PULSE_DUR) * Math.PI) : 0;
  const shieldP = t >= SHIELD_AT ? Math.max(0, 1 - (t - SHIELD_AT) / SHIELD_DUR) : 0;

  // Checkmark
  const checkP = spring(Math.max(0, Math.min(1, (t - CHECK_AT) / CHECK_DUR)));
  const showConfetti = t >= CONFETTI_AT && t < CONFETTI_AT + 1200;

  // Status text
  let activeStatus = -1;
  for (let i = statuses.length - 1; i >= 0; i--) {
    if (t >= statuses[i].t) { activeStatus = i; break; }
  }

  // Outro
  const outroP = ease(Math.max(0, Math.min(1, (t - OUTRO_START) / OUTRO_DUR)));
  const outroFade = t >= OUTRO_HOLD_END ? Math.max(0, 1 - (t - OUTRO_HOLD_END) / 500) : 1;
  const contentFade = t < OUTRO_START - 400 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 400)) / 400);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9/16", position: "relative", overflow: "hidden", background: pastel.bg }}>

        {/* Subtle globe — 8% opacity */}
        <div style={{ opacity: 0.08 }}><LivingGlobe t={Math.max(0, t)} /></div>

        {/* Cover frame: "CAS" */}
        {coverFade > 0 && (
          <div style={{ opacity: coverFade, zIndex: 10 }}>
            <CoverFrameLogoSlice portion={1} progress={coverP} />
          </div>
        )}

        {/* Credit card */}
        {cardP > 0 && (
          <div className="absolute inset-0 flex flex-col items-center" style={{ paddingTop: "22%", zIndex: 5, opacity: contentFade }}>
            {/* Card with 3D tilt entry */}
            <div style={{
              width: "min(540px, 85%)",
              aspectRatio: "1.586 / 1",
              borderRadius: "min(24px, 3vh)",
              background: "linear-gradient(135deg, #2a1f1c 0%, #3d2520 60%, #2a1f1c 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: `0 30px 80px -20px rgba(0,0,0,0.25), 0 0 ${pulseP * 40}px rgba(217,119,87,${pulseP * 0.3})`,
              transform: `scale(${0.85 + 0.15 * cardP}) perspective(800px) rotateY(${cardTilt}deg)`,
              opacity: cardP,
              position: "relative",
              overflow: "hidden",
              padding: "min(32px, 4vh)",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "space-between",
            }}>
              {/* Metallic sheen */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 55%, transparent 70%)",
                pointerEvents: "none",
              }} />

              {/* Shield overlay during validation */}
              {shieldP > 0 && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: shieldP * 0.5, pointerEvents: "none" }}>
                  <svg width="120" height="140" viewBox="0 0 24 28" fill="none" stroke={pastel.accent} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                    <path d="M12 2 L3 7 v7 c0 6.5 4 10.5 9 13 5-2.5 9-6.5 9-13V7z" />
                  </svg>
                </div>
              )}

              {/* Top row: chip + contactless */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
                {/* EMV Chip */}
                <svg width="56" height="44" viewBox="0 0 56 44">
                  <rect x="2" y="2" width="52" height="40" rx="6" fill="none" stroke="#c49a3a" strokeWidth="1.5" />
                  <rect x="6" y="6" width="44" height="32" rx="3" fill="#d4a853" opacity="0.3" />
                  <line x1="28" y1="6" x2="28" y2="38" stroke="#c49a3a" strokeWidth="0.8" opacity="0.5" />
                  <line x1="6" y1="22" x2="50" y2="22" stroke="#c49a3a" strokeWidth="0.8" opacity="0.5" />
                  <line x1="18" y1="6" x2="18" y2="38" stroke="#c49a3a" strokeWidth="0.5" opacity="0.3" />
                  <line x1="38" y1="6" x2="38" y2="38" stroke="#c49a3a" strokeWidth="0.5" opacity="0.3" />
                </svg>
                {/* Contactless */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M8.5 16.5a5 5 0 0 1 0-9" /><path d="M12 19a9 9 0 0 0 0-14" /><path d="M5 14a2 2 0 0 0 0-4" />
                </svg>
              </div>

              {/* Card number — center */}
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                {showToken && tokenP > 0 ? (
                  /* Token display */
                  <div style={{ opacity: tokenP }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={pastel.accent} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      <span className="font-mono font-medium" style={{ fontSize: "min(20px, 2.2vh)", color: pastel.accent, letterSpacing: "0.03em" }}>
                        tok_1A2B3C4D5E6F7G
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Card number — simple typewriter, digit by digit */
                  <div className="font-mono font-medium" style={{ fontSize: "min(28px, 3vh)", color: "#fafaf7", letterSpacing: "0.05em" }}>
                    {Array.from({ length: 16 }).map((_, i) => {
                      const isSpace = i > 0 && i % 4 === 0;
                      return (
                        <span key={i}>
                          {isSpace && <span style={{ opacity: 0.4 }}>{" "}</span>}
                          <span>{i < digitsTyped ? finalDigits[i] : "•"}</span>
                        </span>
                      );
                    })}
                    {digitsTyped < 16 && t >= NUM_START && (
                      <span className="inline-block w-[2px] h-[24px] ml-[1px] align-middle" style={{ background: pastel.accent, animation: "pulse 0.8s step-end infinite" }} />
                    )}
                  </div>
                )}
              </div>

              {/* Bottom row: name + expiry */}
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
                <div>
                  <div className="font-mono" style={{ fontSize: "min(9px, 1vh)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "4px" }}>CARDHOLDER</div>
                  <div className="font-mono" style={{ fontSize: "min(14px, 1.5vh)", color: "rgba(255,255,255,0.85)", letterSpacing: "0.05em" }}>JOHN DOE</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="font-mono" style={{ fontSize: "min(9px, 1vh)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "4px" }}>EXPIRES</div>
                  <div className="font-mono" style={{ fontSize: "min(14px, 1.5vh)", color: "rgba(255,255,255,0.85)", letterSpacing: "0.05em" }}>03/29</div>
                </div>
              </div>

              {/* CascadX branding */}
              <div style={{ position: "absolute", bottom: "min(12px, 1.5vh)", right: "min(16px, 2vh)" }}>
                <span className="font-mono font-medium" style={{ fontSize: "min(10px, 1.1vh)", color: pastel.accent, opacity: 0.7 }}>CascadX.</span>
              </div>
            </div>

            {/* Status text BELOW the card — one at a time */}
            <div style={{ marginTop: "min(32px, 3.5vh)", textAlign: "center", minHeight: "min(40px, 4vh)" }}>
              {activeStatus >= 0 && (
                <div className="flex items-center justify-center gap-2" style={{ opacity: contentFade }}>
                  {!statuses[activeStatus].accent && (
                    <span className="w-[6px] h-[6px] rounded-full" style={{ background: pastel.accent, animation: "pulse 1s ease-in-out infinite" }} />
                  )}
                  <span className="font-mono font-medium" style={{
                    fontSize: "min(15px, 1.6vh)",
                    color: statuses[activeStatus].accent ? pastel.accent : `${pastel.ink}bf`,
                    letterSpacing: "0.02em",
                  }}>
                    {statuses[activeStatus].text}
                  </span>
                </div>
              )}
            </div>

            {/* Success checkmark below status */}
            {checkP > 0 && (
              <div className="flex justify-center" style={{ marginTop: "min(16px, 1.5vh)" }}>
                <div className="rounded-full flex items-center justify-center" style={{
                  width: "min(56px, 6vh)", height: "min(56px, 6vh)",
                  background: pastel.accent, transform: `scale(${checkP})`,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={pastel.bg} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
              </div>
            )}

            {/* Confetti */}
            {showConfetti && Array.from({ length: 10 }).map((_, i) => {
              const angle = (i / 10) * 360 + 18;
              const rad = (angle * Math.PI) / 180;
              const dist = 40 + ((t - CONFETTI_AT) / 1200) * 60;
              const fade = Math.max(0, 1 - (t - CONFETTI_AT) / 1000);
              return <div key={i} className="absolute w-[5px] h-[5px] rounded-full" style={{ left: `calc(50% + ${Math.cos(rad) * dist}px)`, top: `calc(58% + ${Math.sin(rad) * dist}px)`, background: pastel.accent, opacity: fade * 0.5 }} />;
            })}
          </div>
        )}

        {/* Logo outro */}
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
