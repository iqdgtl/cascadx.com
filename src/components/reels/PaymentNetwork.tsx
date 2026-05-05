"use client";
import { useEffect, useState, useRef } from "react";
import type { ReelTheme } from "@/lib/themes";
import { darkTheme } from "@/lib/themes";
import ReelLogoOutro from "@/components/ReelLogoOutro";

const LOOP = 15500;

const CENTER_IN = 0, CENTER_DUR = 1000;
const POP_START = 1000, POP_STAGGER = 250, POP_DUR = 600;
const LINE_START = 7000, LINE_STAGGER = 80;
const PULSE_AT = 8500, PULSE_DUR = 600;
const BACKDROP_START = 9500, BACKDROP_DUR = 500;
const TAG_IN = 10000, TAG_DUR = 800;
const TAG_HOLD_END = 13500;
const TAG_FADE_START = 13500, TAG_FADE_DUR = 500;
const OUTRO_START = 14000, OUTRO_DUR = 1500;

const psps = [
  { name: "Stripe", color: "#635BFF", x: -36, y: -35 },
  { name: "Adyen", color: "#0ABF53", x: 4, y: -44 },
  { name: "CKO", color: "#4285F4", x: 38, y: -30 },
  { name: "WP", color: "#E4002B", x: -44, y: -8 },
  { name: "PayPal", color: "#009CDE", x: 46, y: -2 },
  { name: "Apple", color: "#333", x: -30, y: 24 },
  { name: "GPay", color: "#34A853", x: 34, y: 22 },
  { name: "Klarna", color: "#FFB3C7", x: -6, y: 42 },
  { name: "Skrill", color: "#862165", x: 22, y: 40 },
  { name: "Alipay", color: "#1677FF", x: -42, y: 32 },
  { name: "WeChat", color: "#07C160", x: 44, y: 32 },
  { name: "iDEAL", color: "#CC0066", x: -22, y: -44 },
  { name: "PIX", color: "#32BCAD", x: 14, y: -46 },
  { name: "Revolut", color: "#666", x: -46, y: 14 },
  { name: "Visa", color: "#1A1F71", x: 26, y: -42 },
  { name: "MC", color: "#EB001B", x: -14, y: 46 },
  { name: "Amex", color: "#006FCF", x: 40, y: -18 },
  { name: "BLIK", color: "#E8590C", x: -36, y: -22 },
];

export default function PaymentNetwork({ theme }: { theme: ReelTheme }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0);
  const s = useRef(0);
  useEffect(() => {
    const r = setTimeout(() => {
      s.current = performance.now();
      const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); };
      raf.current = requestAnimationFrame(tick);
    }, 1000);
    return () => { clearTimeout(r); cancelAnimationFrame(raf.current); };
  }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const centerP = ease(Math.max(0, Math.min(1, (t - CENTER_IN) / CENTER_DUR)));
  const pulseActive = t >= PULSE_AT && t < PULSE_AT + PULSE_DUR;
  const pulseScale = pulseActive ? 1 + 0.04 * Math.sin(((t - PULSE_AT) / PULSE_DUR) * Math.PI) : 1;

  // Network fades when tagline appears
  const backdropP = ease(Math.max(0, Math.min(1, (t - BACKDROP_START) / BACKDROP_DUR)));
  const tagFadeP = ease(Math.max(0, Math.min(1, (t - TAG_FADE_START) / TAG_FADE_DUR)));
  const networkOpacity = 1 - backdropP * 0.7 + tagFadeP * 0.3; // 1.0 → 0.3 → 0.6

  // Tagline
  const tagP = ease(Math.max(0, Math.min(1, (t - TAG_IN) / TAG_DUR)));
  const tagVisible = t >= TAG_IN && t < TAG_FADE_START + TAG_FADE_DUR;
  const tagOpacity = tagVisible ? Math.max(0, 1 - tagFadeP) : 0;

  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);

  const isDark = theme === darkTheme;
  const badgeBg = isDark ? "rgba(255,255,255,0.95)" : "rgba(26,26,26,0.9)";
  const badgeTextColor = isDark ? undefined : "#fafaf7";

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ cursor: "none", background: theme.bg }}>

      {/* Network — centered in viewport via absolute positioning */}
      <div
        className="absolute"
        style={{
          width: "min(82vw, 480px)",
          height: "min(82vw, 480px)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: networkOpacity,
        }}
      >
        {/* CX badge — exact center of this container (which is exact center of viewport) */}
        <div
          className="absolute w-[90px] h-[90px] rounded-full grid place-items-center z-10"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${spring(centerP)})`,
            background: theme.surface,
            border: `2px solid ${theme.accent}`,
            opacity: centerP,
            boxShadow: `0 0 50px rgba(217,119,87,${0.35 * centerP})`,
          }}
        >
          <span className="font-display font-[800] text-[22px] tracking-[-0.035em]" style={{ color: theme.ink }}>CX</span>
          <span className="absolute top-[14px] right-[16px] w-[5px] h-[5px] rounded-full" style={{ background: theme.accent }} />
        </div>

        {/* PSP logos */}
        {psps.map((psp, i) => {
          const popStart = POP_START + i * POP_STAGGER;
          const pp = spring(Math.max(0, Math.min(1, (t - popStart) / POP_DUR)));
          return (
            <div
              key={psp.name}
              className="absolute w-[50px] h-[50px] rounded-full grid place-items-center"
              style={{
                left: `${50 + psp.x}%`,
                top: `${50 + psp.y}%`,
                transform: `translate(-50%, -50%) scale(${pp * pulseScale}) rotate(${-15 * (1 - pp)}deg)`,
                opacity: pp,
                background: badgeBg,
                border: `1px solid ${theme.border}`,
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
              }}
            >
              <span className="font-mono text-[8px] font-bold" style={{ color: badgeTextColor || psp.color }}>{psp.name}</span>
            </div>
          );
        })}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {psps.map((psp, i) => {
            const lineStart = LINE_START + i * LINE_STAGGER;
            const lp = ease(Math.max(0, Math.min(1, (t - lineStart) / 600)));
            const cx = 50 + psp.x;
            const cy = 50 + psp.y;
            return (
              <line
                key={`l-${i}`}
                x1="50" y1="50"
                x2={50 + (cx - 50) * lp}
                y2={50 + (cy - 50) * lp}
                stroke={theme.accent}
                strokeWidth="0.3"
                strokeDasharray="1 1.5"
                opacity={lp * 0.3}
              />
            );
          })}
        </svg>
      </div>

      {/* Dark overlay behind tagline */}
      {tagVisible && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px 300px at 50% 70%, ${theme.bg}bb, transparent 70%)`,
            opacity: tagOpacity * 0.5,
          }}
        />
      )}

      {/* Tagline — lower-middle area (~70% Y), single line */}
      <div
        className="absolute left-0 right-0 flex justify-center px-8 pointer-events-none"
        style={{
          top: "68%",
          opacity: tagOpacity,
          transform: `scale(${0.96 + 0.04 * tagP}) translateY(${6 * (1 - tagP)}px)`,
        }}
      >
        <p className="font-display font-[600] text-[32px] tracking-[-0.02em] leading-[1.2] text-center" style={{ color: theme.ink }}>
          All your payment providers,<br />
          <span style={{ color: theme.accent }}>in one place.</span>
        </p>
      </div>

      {/* Logo outro — shared component, identical to all other reels */}
      {outroP > 0 && <ReelLogoOutro progress={outroP} theme={theme} />}
    </div>
  );
}
