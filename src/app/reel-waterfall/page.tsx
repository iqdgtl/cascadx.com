"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReelLogoOutro from "@/components/ReelLogoOutro";
import { darkTheme, lightTheme } from "@/lib/themes";
import type { ReelTheme } from "@/lib/themes";

const LOOP = 22000;

// Timeline
const CARD_IN = 0, CARD_DUR = 3000;
const SHRINK_AT = 3000, SHRINK_DUR = 500;

// Layer interactions — each gets ~2.5s
const L1_APPROACH = 3500, L1_HIT = 5000, L1_HOLD = 800;
const L2_APPROACH = 5800, L2_HIT = 7300, L2_HOLD = 800;
const L3_APPROACH = 8100, L3_HIT = 9600, L3_HOLD = 800;
const L4_APPROACH = 10400, L4_HIT = 11900, L4_CELEBRATE = 2000;

const RESULT_IN = 14000, RESULT_DUR = 600;
const OUTRO_START = 17000, OUTRO_DUR = 1200;
const OUTRO_HOLD_END = 21500;

const layers = [
  { name: "Stripe", color: "#635BFF", reason: "Issuer risk flag", y: 28, hitAt: L1_HIT },
  { name: "Adyen", color: "#0ABF53", reason: "Insufficient routing", y: 43, hitAt: L2_HIT },
  { name: "Checkout.com", color: "#4285F4", reason: "BIN mismatch", y: 58, hitAt: L3_HIT },
  { name: "Worldpay", color: "#E4002B", reason: "Approved", y: 73, hitAt: L4_HIT },
];

function WaterfallInner({ theme }: { theme: ReelTheme }) {
  const isDark = theme === darkTheme;
  const bg = isDark ? "linear-gradient(180deg, #111310 0%, #0d0f0e 40%, #080a09 100%)" : "linear-gradient(180deg, #faf6ef 0%, #f5efe6 40%, #ede6db 100%)";
  const panelBg = isDark ? "#1e2423" : "#ffffff";
  const panelBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const textColor = isDark ? "#fafaf7" : "#2a1f1c";
  const softColor = isDark ? "#b8bcb6" : "#5a4a42";
  const mutedColor = isDark ? "#7a8178" : "#8a7a72";
  const cardGrad = isDark ? "linear-gradient(135deg, #2a1f1c, #3d2520)" : "linear-gradient(135deg, #e8a98e, #d97757)";
  const cardText = isDark ? "#fafaf7" : "#2a1f1c";
  const declineColor = isDark ? "#c4564a" : "#d4756a";
  const overlayBg = isDark ? "rgba(13,15,14,0.8)" : "rgba(245,239,230,0.85)";
  const outroBg = isDark ? "rgba(13,15,14,0.92)" : "rgba(245,239,230,0.92)";
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);
  const easeIn = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : p * p;

  // 3D Card phase
  const cardVisible = t < SHRINK_AT + SHRINK_DUR;
  const cardP = spring(Math.max(0, Math.min(1, t / 800)));
  const rotProgress = Math.min(1, t / CARD_DUR);
  const rotY = Math.sin(rotProgress * Math.PI * 2) * 25;
  const rotX = Math.cos(rotProgress * Math.PI * 1.5) * 8;
  const shrinkP = ease(Math.max(0, Math.min(1, (t - SHRINK_AT) / SHRINK_DUR)));
  const subtitleP = ease(Math.max(0, Math.min(1, (t - 800) / 500)));
  const subtitleFade = t < SHRINK_AT - 300 ? 1 : Math.max(0, 1 - (t - (SHRINK_AT - 300)) / 300);

  // Falling mini-card position
  const approaches = [
    { start: L1_APPROACH, hit: L1_HIT, fromY: 10, toY: layers[0].y - 7 },
    { start: L2_APPROACH, hit: L2_HIT, fromY: layers[0].y - 2, toY: layers[1].y - 7 },
    { start: L3_APPROACH, hit: L3_HIT, fromY: layers[1].y - 2, toY: layers[2].y - 7 },
    { start: L4_APPROACH, hit: L4_HIT, fromY: layers[2].y - 2, toY: layers[3].y - 7 },
  ];

  let cardY = 10;
  let tryingLabel = "";
  let caught = false;

  for (let i = 0; i < approaches.length; i++) {
    const a = approaches[i];
    if (t >= a.start && t < a.hit) {
      const fallP = easeIn(Math.max(0, Math.min(1, (t - a.start) / (a.hit - a.start))));
      cardY = a.fromY + (a.toY - a.fromY) * fallP;
      tryingLabel = `Trying ${layers[i].name}...`;
      break;
    } else if (t >= a.hit) {
      if (i === 3) {
        cardY = a.toY;
        caught = true;
      } else {
        cardY = a.toY;
        // Bounce
        const bounceElapsed = t - a.hit;
        if (bounceElapsed < 300) {
          cardY = a.toY + Math.sin((bounceElapsed / 300) * Math.PI) * -2;
        }
      }
    }
  }
  if (t < L1_APPROACH) cardY = 10;

  const miniCardVisible = t >= SHRINK_AT && t < OUTRO_START;
  const catchGlow = caught && t >= L4_HIT;
  const showConfetti = caught && t >= L4_HIT + 300 && t < L4_HIT + L4_CELEBRATE;

  // Result
  const resultP = ease(Math.max(0, Math.min(1, (t - RESULT_IN) / RESULT_DUR)));
  const resultFade = t < OUTRO_START - 400 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 400)) / 400);

  // Outro
  const outroP = ease(Math.max(0, Math.min(1, (t - OUTRO_START) / OUTRO_DUR)));
  const outroFade = t >= OUTRO_HOLD_END ? Math.max(0, 1 - (t - OUTRO_HOLD_END) / 500) : 1;
  const contentFade = t < OUTRO_START - 400 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 400)) / 400);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000", overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9/16", position: "relative", overflow: "hidden", background: bg }}>

        {/* Speed lines during fall */}
        {t >= L1_APPROACH && t < RESULT_IN && (
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.035 }}>
            {[12, 30, 50, 70, 88].map((x, i) => (
              <div key={i} className="absolute w-[1px]" style={{ left: `${x}%`, top: 0, bottom: 0, background: "linear-gradient(180deg, transparent, #d97757 50%, transparent)" }} />
            ))}
          </div>
        )}

        {/* 3D Credit Card */}
        {cardVisible && (
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "8%", perspective: "1000px", opacity: cardP * (1 - shrinkP * 0.5), zIndex: 15 }}>
            <div style={{
              width: "min(300px, 70vw)", aspectRatio: "1.586/1",
              transformStyle: "preserve-3d" as const,
              transform: `rotateY(${rotY * (1 - shrinkP)}deg) rotateX(${rotX * (1 - shrinkP)}deg) scale(${1 - shrinkP * 0.4})`,
            }}>
              <div style={{
                position: "absolute", inset: 0, backfaceVisibility: "hidden" as const,
                borderRadius: "18px",
                background: "linear-gradient(135deg, #2a1f1c 0%, #3d2520 60%, #2a1f1c 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 25px 50px -15px rgba(0,0,0,0.5), 0 0 35px rgba(217,119,87,0.12)",
                padding: "20px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${135 + rotY * 2}deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 55%, transparent 70%)`, pointerEvents: "none", borderRadius: "inherit" }} />
                <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                  <svg width="44" height="34" viewBox="0 0 56 44"><rect x="2" y="2" width="52" height="40" rx="6" fill="none" stroke="#c49a3a" strokeWidth="1.5" /><rect x="6" y="6" width="44" height="32" rx="3" fill="#d4a853" opacity="0.3" /><line x1="28" y1="6" x2="28" y2="38" stroke="#c49a3a" strokeWidth="0.7" opacity="0.4" /><line x1="6" y1="22" x2="50" y2="22" stroke="#c49a3a" strokeWidth="0.7" opacity="0.4" /></svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"><path d="M8.5 16.5a5 5 0 0 1 0-9" /><path d="M12 19a9 9 0 0 0 0-14" /></svg>
                </div>
                <div className="font-mono font-medium text-center" style={{ fontSize: "min(20px, 2.2vh)", color: textColor, letterSpacing: "0.06em", position: "relative", zIndex: 1 }}>•••• •••• •••• 4242</div>
                <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                  <div><div className="font-mono" style={{ fontSize: "8px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>CARDHOLDER</div><div className="font-mono" style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>JOHN DOE</div></div>
                  <div className="font-mono" style={{ fontSize: "9px", color: "#d97757", opacity: 0.6, alignSelf: "flex-end" }}>CascadX.</div>
                </div>
              </div>
              <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" as const, transform: "rotateY(180deg)", borderRadius: "18px", background: "linear-gradient(135deg, #1a1512, #2a1f1c)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ height: "14%", marginTop: "12%", background: "rgba(0,0,0,0.35)" }} />
              </div>
            </div>
          </div>
        )}

        {/* Subtitle */}
        {subtitleFade > 0 && (
          <div className="absolute left-0 right-0 text-center" style={{ top: "32%", opacity: subtitleP * subtitleFade, zIndex: 5 }}>
            <span className="font-display font-medium text-[22px]" style={{ color: softColor }}>A payment begins its journey.</span>
          </div>
        )}

        {/* Falling mini-card */}
        {miniCardVisible && (
          <>
            {/* Trail */}
            {t >= L1_APPROACH && !caught && (
              <div className="absolute left-1/2 -translate-x-1/2 w-[3px]" style={{ top: "10%", height: `${Math.max(0, cardY - 10)}%`, background: "linear-gradient(180deg, transparent 50%, rgba(217,119,87,0.35))", zIndex: 6, opacity: contentFade }} />
            )}
            {/* The mini card */}
            <div className="absolute left-1/2" style={{
              top: `${cardY}%`, zIndex: 12,
              transform: "translate(-50%, -50%)",
              opacity: contentFade,
            }}>
              <div className="rounded-xl flex items-center justify-center" style={{
                width: "min(160px, 28vw)", height: "min(100px, 11vh)",
                background: cardGrad,
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: catchGlow
                  ? "0 0 40px rgba(217,119,87,0.5), 0 15px 40px -10px rgba(0,0,0,0.4)"
                  : "0 15px 40px -10px rgba(0,0,0,0.4), 0 0 20px rgba(217,119,87,0.15)",
              }}>
                <span className="font-display font-[700] text-[22px]" style={{ color: cardText }}>€129.00</span>
              </div>
              {/* "Trying..." label */}
              {tryingLabel && (
                <div className="text-center mt-2">
                  <span className="font-mono text-[12px] text-[#d97757]">{tryingLabel}</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* PSP Layers — always visible once fall starts, activate on hit */}
        {t >= L1_APPROACH - 500 && LOOP > 0 && layers.map((layer, i) => {
          const isLast = i === 3;
          const hit = t >= layer.hitAt;
          const hitFlash = hit && t < layer.hitAt + 400;
          const declined = hit && !isLast;
          const approved = hit && isLast;
          const dimmed = declined && t > layer.hitAt + 800 && t > layers[Math.min(i + 1, 3)].hitAt;

          return (
            <div key={layer.name} className="absolute left-[6%] right-[6%]" style={{
              top: `${layer.y}%`, zIndex: 4,
              opacity: (dimmed ? 0.35 : 1) * contentFade,
              transition: "opacity 500ms",
            }}>
              <div className="rounded-2xl px-5 py-4 flex items-center justify-between" style={{
                background: approved ? "rgba(217,119,87,0.1)" : "#1e2423",
                border: `1.5px solid ${hitFlash ? (approved ? "#d97757" : "rgba(196,86,74,0.6)") : approved ? "rgba(217,119,87,0.3)" : "rgba(255,255,255,0.07)"}`,
                boxShadow: approved ? "0 0 30px rgba(217,119,87,0.2)" : hitFlash && !approved ? "0 0 20px rgba(196,86,74,0.15)" : "none",
                minHeight: "min(64px, 7vh)",
              }}>
                <div className="flex items-center gap-3">
                  {/* PSP logo circle */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="font-mono text-[10px] font-bold" style={{ color: layer.color }}>{layer.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <span className="font-display font-[600] text-[16px]" style={{ color: dimmed ? "#7a8178" : "#fafaf7" }}>{layer.name}</span>
                </div>
                {hit && (
                  <span className="font-mono text-[12px] font-medium" style={{ color: approved ? "#d97757" : "#c4564a" }}>
                    {approved ? "✓ Approved" : `✗ ${layer.reason}`}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Catch confetti */}
        {showConfetti && Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * 360;
          const rad = (angle * Math.PI) / 180;
          const elapsed = t - (L4_HIT + 300);
          const dist = 25 + (elapsed / 1700) * 70;
          const fade = Math.max(0, 1 - elapsed / 1500);
          return <div key={i} className="absolute w-[5px] h-[5px] rounded-full" style={{ left: `calc(50% + ${Math.cos(rad) * dist}px)`, top: `calc(${layers[3].y}% + ${Math.sin(rad) * dist - 20}px)`, background: "#d97757", opacity: fade * 0.5, zIndex: 13 }} />;
        })}

        {/* Result text */}
        {resultP > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8" style={{ zIndex: 14, opacity: resultP * resultFade }}>
            <div className="text-center" style={{ background: overlayBg, borderRadius: "24px", padding: "32px 40px" }}>
              <div className="font-display font-[800] text-[40px] tracking-[-0.03em] leading-tight" style={{ color: textColor }}>
                3 declines. 1 success.
              </div>
              <div className="font-display font-medium text-[24px] text-[#d97757] mt-4">
                Caught on the 4th route — in 38ms.
              </div>
            </div>
          </div>
        )}

        {/* Logo outro */}
        {outroP > 0 && (
          <div className="absolute inset-0" style={{ zIndex: 50, opacity: outroP * outroFade }}>
            <div style={{ position: "absolute", inset: 0, background: outroBg }} />
            <ReelLogoOutro progress={outroP} theme={theme} />
          </div>
        )}
      </div>
    </div>
  );
}

function Inner() {
  const params = useSearchParams();
  const theme = params.get("light") !== null ? lightTheme : darkTheme;
  return <WaterfallInner theme={theme} />;
}

export default function Page() {
  return <Suspense><Inner /></Suspense>;
}
