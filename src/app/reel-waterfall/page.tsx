"use client";
import { useEffect, useState, useRef } from "react";
import ReelLogoOutro from "@/components/ReelLogoOutro";
import { darkTheme } from "@/lib/themes";

const LOOP = 14000;

// Timeline
const CARD_IN = 0, CARD_ROT_DUR = 2500;
const CARD_MORPH = 2500, MORPH_DUR = 500;
// Fall: orb hits 4 layers
const FALL_START = 3000;
const LAYERS = [
  { name: "Stripe", y: 35, reason: "Declined — issuer risk", hitAt: 3500, dur: 400, catches: false },
  { name: "Adyen", y: 50, reason: "Declined — insufficient routing", hitAt: 5200, dur: 400, catches: false },
  { name: "Checkout.com", y: 65, reason: "Declined — BIN mismatch", hitAt: 6800, dur: 400, catches: false },
  { name: "Worldpay", y: 80, reason: "Approved ✓", hitAt: 8300, dur: 600, catches: true },
];
const RESULT_IN = 9500, RESULT_DUR = 600;
const OUTRO_START = 12500, OUTRO_DUR = 1500;

export default function Page() {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);
  const easeIn = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : p * p * p;

  // Card phase
  const cardVisible = t >= CARD_IN && t < CARD_MORPH + MORPH_DUR;
  const cardP = ease(Math.max(0, Math.min(1, t / 800)));
  const rotProgress = Math.min(1, t / CARD_ROT_DUR);
  const rotY = Math.sin(rotProgress * Math.PI * 2) * 25;
  const rotX = Math.cos(rotProgress * Math.PI * 1.5) * 8;
  const morphP = ease(Math.max(0, Math.min(1, (t - CARD_MORPH) / MORPH_DUR)));

  // Falling orb position
  const orbVisible = t >= CARD_MORPH;
  let orbY = 12; // start position (% of frame)
  let orbCaught = false;
  let currentFallTarget = 12;

  if (t >= FALL_START) {
    for (const layer of LAYERS) {
      const elapsed = t - layer.hitAt;
      if (elapsed < -800) {
        // Falling toward this layer
        const fallP = easeIn(Math.max(0, Math.min(1, (t - (layer.hitAt - 800)) / 800)));
        orbY = currentFallTarget + (layer.y - 4 - currentFallTarget) * fallP;
        break;
      } else if (elapsed < 0) {
        orbY = layer.y - 4;
        break;
      } else if (elapsed < layer.dur) {
        if (layer.catches) {
          orbY = layer.y - 4;
          orbCaught = true;
        } else {
          // Bounce off
          const bounceP = elapsed / layer.dur;
          orbY = layer.y - 4 + Math.sin(bounceP * Math.PI) * -3;
          currentFallTarget = layer.y;
        }
        break;
      } else {
        currentFallTarget = layer.y;
        orbY = layer.y;
        if (layer.catches) { orbCaught = true; break; }
      }
    }
    // If past all interactions, orb is caught at layer 4
    if (t >= LAYERS[3].hitAt + LAYERS[3].dur) { orbY = LAYERS[3].y - 4; orbCaught = true; }
  }

  // Subtitle text
  const subtitleP = ease(Math.max(0, Math.min(1, (t - 1000) / 500)));
  const subtitleFade = t < CARD_MORPH - 300 ? 1 : Math.max(0, 1 - (t - (CARD_MORPH - 300)) / 300);

  // Result text
  const resultP = ease(Math.max(0, Math.min(1, (t - RESULT_IN) / RESULT_DUR)));
  const resultFade = t < OUTRO_START - 400 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 400)) / 400);

  // Outro
  const outroP = ease(Math.max(0, Math.min(1, (t - OUTRO_START) / OUTRO_DUR)));
  const outroFade = t >= LOOP - 500 ? Math.max(0, 1 - (t - (LOOP - 500)) / 500) : 1;

  // Confetti at catch
  const catchTime = LAYERS[3].hitAt;
  const showConfetti = orbCaught && t < catchTime + 2000;

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000", overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9/16", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #111310 0%, #0d0f0e 40%, #080a09 100%)" }}>

        {/* Subtle speed lines during fall */}
        {t >= FALL_START && t < RESULT_IN && (
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
            {[15, 35, 55, 75, 90].map((x, i) => (
              <div key={i} className="absolute w-[1px]" style={{ left: `${x}%`, top: 0, bottom: 0, background: `linear-gradient(180deg, transparent, #d97757 50%, transparent)` }} />
            ))}
          </div>
        )}

        {/* 3D Credit Card */}
        {cardVisible && (
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "10%", perspective: "1000px", opacity: cardP * (1 - morphP), zIndex: 10 }}>
            <div style={{
              width: "min(320px, 75vw)", aspectRatio: "1.586/1",
              transformStyle: "preserve-3d" as const,
              transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${1 - morphP * 0.5})`,
              transition: "none",
            }}>
              {/* Front face */}
              <div style={{
                position: "absolute", inset: 0, backfaceVisibility: "hidden" as const,
                borderRadius: "min(20px, 2.5vh)",
                background: "linear-gradient(135deg, #2a1f1c 0%, #3d2520 60%, #2a1f1c 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5), 0 0 40px rgba(217,119,87,0.15)",
                padding: "min(24px, 3vh)",
                display: "flex", flexDirection: "column" as const, justifyContent: "space-between",
                overflow: "hidden",
              }}>
                {/* Metallic sheen */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${135 + rotY * 2}deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 70%)`, pointerEvents: "none", borderRadius: "inherit" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                  {/* Chip */}
                  <svg width="48" height="36" viewBox="0 0 56 44"><rect x="2" y="2" width="52" height="40" rx="6" fill="none" stroke="#c49a3a" strokeWidth="1.5" /><rect x="6" y="6" width="44" height="32" rx="3" fill="#d4a853" opacity="0.3" /><line x1="28" y1="6" x2="28" y2="38" stroke="#c49a3a" strokeWidth="0.8" opacity="0.5" /><line x1="6" y1="22" x2="50" y2="22" stroke="#c49a3a" strokeWidth="0.8" opacity="0.5" /></svg>
                  {/* Contactless */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"><path d="M8.5 16.5a5 5 0 0 1 0-9" /><path d="M12 19a9 9 0 0 0 0-14" /></svg>
                </div>
                <div className="font-mono font-medium text-center" style={{ fontSize: "min(22px, 2.4vh)", color: "#fafaf7", letterSpacing: "0.06em", position: "relative", zIndex: 1 }}>
                  •••• •••• •••• 4242
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                  <div><div className="font-mono" style={{ fontSize: "min(8px, 0.9vh)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>CARDHOLDER</div><div className="font-mono" style={{ fontSize: "min(12px, 1.3vh)", color: "rgba(255,255,255,0.8)" }}>JOHN DOE</div></div>
                  <div className="font-mono" style={{ fontSize: "min(10px, 1.1vh)", color: "#d97757", opacity: 0.7, alignSelf: "flex-end" }}>CascadX.</div>
                </div>
              </div>
              {/* Back face */}
              <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" as const, transform: "rotateY(180deg)", borderRadius: "min(20px, 2.5vh)", background: "linear-gradient(135deg, #1a1512 0%, #2a1f1c 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ height: "15%", marginTop: "12%", background: "rgba(0,0,0,0.4)" }} />
              </div>
            </div>
          </div>
        )}

        {/* "A payment begins." subtitle */}
        {subtitleFade > 0 && (
          <div className="absolute left-0 right-0 text-center" style={{ top: "38%", opacity: subtitleP * subtitleFade, zIndex: 5 }}>
            <span className="font-display font-medium text-[24px]" style={{ color: "#b8bcb6" }}>A payment begins.</span>
          </div>
        )}

        {/* Falling orb */}
        {orbVisible && t < OUTRO_START && (
          <>
            {/* Trail */}
            {t >= FALL_START && !orbCaught && (
              <div className="absolute left-1/2 -translate-x-1/2 w-[3px]" style={{
                top: "12%", height: `${orbY - 12}%`,
                background: "linear-gradient(180deg, transparent 60%, rgba(217,119,87,0.4))",
                zIndex: 3,
              }} />
            )}
            {/* Orb */}
            <div className="absolute left-1/2 -translate-x-1/2" style={{
              top: `${orbY}%`, zIndex: 8,
              width: "min(40px, 4.5vh)", height: "min(40px, 4.5vh)",
              borderRadius: "50%",
              background: orbCaught ? "#d97757" : "radial-gradient(circle, #d97757 40%, #b35a3e 100%)",
              boxShadow: orbCaught ? "0 0 30px rgba(217,119,87,0.6), 0 0 60px rgba(217,119,87,0.3)" : "0 0 20px rgba(217,119,87,0.4)",
              transform: `translate(-50%, -50%) scale(${1 - morphP * 0.3 + (orbCaught ? 0.15 * Math.sin(t / 300) : 0)})`,
              opacity: morphP,
            }}>
              <span className="absolute inset-0 flex items-center justify-center font-mono font-bold" style={{ fontSize: "min(9px, 1vh)", color: "#0d0f0e" }}>€129</span>
            </div>
          </>
        )}

        {/* PSP Layers */}
        {t >= FALL_START && t < OUTRO_START && LAYERS.map((layer, i) => {
          const elapsed = t - layer.hitAt;
          const isHit = elapsed >= 0;
          const hitFlash = isHit && elapsed < 300;
          const declined = isHit && !layer.catches;
          const caught = isHit && layer.catches;
          const dimmed = declined && elapsed > 600;

          return (
            <div key={layer.name} className="absolute left-[8%] right-[8%]" style={{ top: `${layer.y}%`, zIndex: 4, opacity: ease(Math.min(1, (t - FALL_START) / 600)) }}>
              {/* Layer bar */}
              <div className="rounded-xl px-5 py-3 flex items-center justify-between" style={{
                background: caught && isHit ? "rgba(217,119,87,0.12)" : "#1e2423",
                border: `1px solid ${hitFlash ? (caught ? "#d97757" : "#c4564a") : caught && isHit ? "rgba(217,119,87,0.3)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: caught && isHit ? "0 0 24px rgba(217,119,87,0.2)" : hitFlash && !caught ? "0 0 16px rgba(196,86,74,0.2)" : "none",
                opacity: dimmed ? 0.4 : 1,
                transition: "all 300ms",
              }}>
                <span className="font-display font-[600] text-[15px]" style={{ color: dimmed ? "#7a8178" : "#fafaf7" }}>{layer.name}</span>
                {isHit && (
                  <span className="font-mono text-[11px] font-medium" style={{ color: caught ? "#d97757" : "#c4564a" }}>
                    {layer.reason}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Catch confetti */}
        {showConfetti && Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * 360;
          const rad = (angle * Math.PI) / 180;
          const elapsed = t - catchTime;
          const dist = 20 + (elapsed / 2000) * 60;
          const fade = Math.max(0, 1 - elapsed / 1500);
          return <div key={i} className="absolute w-[5px] h-[5px] rounded-full" style={{ left: `calc(50% + ${Math.cos(rad) * dist}px)`, top: `calc(${LAYERS[3].y}% + ${Math.sin(rad) * dist - 30}px)`, background: "#d97757", opacity: fade * 0.5, zIndex: 9 }} />;
        })}

        {/* Result text */}
        {resultP > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8" style={{ zIndex: 12, opacity: resultP * resultFade }}>
            <div className="text-center">
              <div className="font-display font-[800] text-[36px] tracking-[-0.03em] text-[#fafaf7] leading-tight">
                Caught on the 4th route.
              </div>
              <div className="font-display font-medium text-[24px] text-[#d97757] mt-3">
                In 38 milliseconds.
              </div>
            </div>
          </div>
        )}

        {/* Logo outro */}
        {outroP > 0 && (
          <div className="absolute inset-0" style={{ zIndex: 50, opacity: outroP * outroFade }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(13,15,14,0.92)" }} />
            <ReelLogoOutro progress={outroP} theme={darkTheme} />
          </div>
        )}
      </div>
    </div>
  );
}
