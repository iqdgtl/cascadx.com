"use client";
import { useEffect, useState, useRef } from "react";
import type { ReelTheme } from "@/lib/themes";
import { darkTheme } from "@/lib/themes";
import ReelLogoOutro from "@/components/ReelLogoOutro";

const LOOP = 11000;

const CENTER_IN = 0, CENTER_DUR = 1000;
const POP_START = 1000, POP_STAGGER = 250, POP_DUR = 600;
const LINE_START = 7000, LINE_DUR = 1500, LINE_STAGGER = 80;
const PULSE_AT = 8800, PULSE_DUR = 600;
const TAG_IN = 9000, TAG_DUR = 800;
const OUTRO_START = 9500, OUTRO_DUR = 1500;

// 18 PSP logos with positions (organic scatter, not perfect ring)
const psps = [
  { name: "Stripe", color: "#635BFF", x: -38, y: -32 },
  { name: "Adyen", color: "#0ABF53", x: 5, y: -42 },
  { name: "Checkout", color: "#4285F4", x: 40, y: -28 },
  { name: "Worldpay", color: "#E4002B", x: -45, y: -5 },
  { name: "PayPal", color: "#009CDE", x: 48, y: 0 },
  { name: "Apple", color: "#fafaf7", x: -32, y: 22 },
  { name: "Google", color: "#34A853", x: 35, y: 25 },
  { name: "Klarna", color: "#FFB3C7", x: -8, y: 40 },
  { name: "Skrill", color: "#862165", x: 22, y: 42 },
  { name: "Alipay", color: "#1677FF", x: -42, y: 35 },
  { name: "WeChat", color: "#07C160", x: 45, y: 35 },
  { name: "iDEAL", color: "#CC0066", x: -25, y: -42 },
  { name: "PIX", color: "#32BCAD", x: 12, y: -45 },
  { name: "Revolut", color: "#fafaf7", x: -48, y: 18 },
  { name: "Visa", color: "#1A1F71", x: 28, y: -40 },
  { name: "MC", color: "#EB001B", x: -15, y: 44 },
  { name: "Amex", color: "#006FCF", x: 42, y: -15 },
  { name: "BLIK", color: "#E8590C", x: -38, y: -20 },
];

export default function PaymentNetwork({ theme }: { theme: ReelTheme }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const centerP = ease(Math.max(0, Math.min(1, (t - CENTER_IN) / CENTER_DUR)));
  const pulseActive = t >= PULSE_AT && t < PULSE_AT + PULSE_DUR;
  const pulseScale = pulseActive ? 1 + 0.04 * Math.sin(((t - PULSE_AT) / PULSE_DUR) * Math.PI) : 1;
  const tagP = ease(Math.max(0, Math.min(1, (t - TAG_IN) / TAG_DUR)));
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < OUTRO_START - 500 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 500)) / 500);

  const isDark = theme === darkTheme;
  const badgeBg = isDark ? "#ffffff" : "#1a1a1a";
  const badgeBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden" style={{ cursor: "none", background: theme.bg }}>
      <div className="relative" style={{ width: "min(85vw, 500px)", height: "min(85vw, 500px)", opacity: mainFade }}>
        {/* Center CX badge */}
        <div className="absolute left-1/2 top-1/2 w-[100px] h-[100px] rounded-full grid place-items-center -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ background: theme.surface, border: `2px solid ${theme.accent}`, opacity: centerP, transform: `translate(-50%,-50%) scale(${spring(centerP)})`, boxShadow: `0 0 40px rgba(217,119,87,${0.3 * centerP})` }}>
          <span className="font-display font-[800] text-[24px] tracking-[-0.035em]" style={{ color: theme.ink }}>CX</span>
          <span className="absolute top-[18px] right-[20px] w-[6px] h-[6px] rounded-full" style={{ background: theme.accent }} />
        </div>

        {/* PSP logos */}
        {psps.map((psp, i) => {
          const popStart = POP_START + i * POP_STAGGER;
          const pp = spring(Math.max(0, Math.min(1, (t - popStart) / POP_DUR)));
          const cx = 50 + psp.x;
          const cy = 50 + psp.y;

          return (
            <div key={psp.name} className="absolute w-[56px] h-[56px] rounded-full grid place-items-center"
              style={{
                left: `${cx}%`, top: `${cy}%`,
                transform: `translate(-50%,-50%) scale(${pp * pulseScale}) rotate(${-15 * (1 - pp)}deg)`,
                opacity: pp,
                background: badgeBg,
                border: `1px solid ${badgeBorder}`,
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}>
              <span className="font-mono text-[9px] font-bold" style={{ color: psp.color }}>{psp.name}</span>
            </div>
          );
        })}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {psps.map((psp, i) => {
            const lineStart = LINE_START + i * LINE_STAGGER;
            const lp = ease(Math.max(0, Math.min(1, (t - lineStart) / (LINE_DUR / 2))));
            const cx = 50 + psp.x;
            const cy = 50 + psp.y;
            return (
              <line key={`line-${i}`} x1="50" y1="50" x2={50 + (cx - 50) * lp} y2={50 + (cy - 50) * lp}
                stroke={theme.accent} strokeWidth="0.3" strokeDasharray="1 1.5" opacity={lp * 0.3} />
            );
          })}
        </svg>
      </div>

      {/* Tagline */}
      <div className="text-center mt-8 px-8" style={{ opacity: tagP * mainFade, transform: `translateY(${12 * (1 - tagP)}px)` }}>
        <p className="font-display font-[600] text-[30px] tracking-[-0.03em] leading-[1.15]" style={{ color: theme.ink }}>
          Every provider. One platform.<br /><span style={{ color: theme.accent }}>Zero chaos.</span>
        </p>
      </div>

      {outroP > 0 && <ReelLogoOutro progress={outroP} theme={theme} />}
    </div>
  );
}
