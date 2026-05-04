"use client";
import { useEffect, useState, useRef } from "react";

const LOOP = 6000;
const letters = "CascadX".split("");
// Scattered start positions for each letter
const scatterPos = [
  { x: -180, y: -220, r: -18 }, { x: 200, y: -160, r: 15 },
  { x: -140, y: 180, r: -12 }, { x: 250, y: 100, r: 20 },
  { x: -200, y: -60, r: -15 }, { x: 160, y: 200, r: 10 },
  { x: -100, y: -200, r: -20 },
];

export default function Reel() {
  const [t, setT] = useState(-1);
  const raf = useRef(0);
  const s = useRef(0);
  useEffect(() => {
    const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000);
    return () => { clearTimeout(r); cancelAnimationFrame(raf.current); };
  }, []);
  const sp = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.6);

  // Phase 1: 0-2s warm glow + motion lines
  const glowP = Math.max(0, Math.min(1, t / 2000));
  // Phase 2: 2-4s letters visible scattered at 15% opacity
  const scatterP = Math.max(0, Math.min(1, (t - 2000) / 500));
  // Phase 3: 4-5s letters fly to center
  const flyP = Math.max(0, Math.min(1, (t - 4000) / 800));
  // Phase 4: 5-5.5s dot pops in
  const dotP = Math.max(0, Math.min(1, (t - 5000) / 300));
  // Phase 5: 5.5-6s tagline
  const tagP = Math.max(0, Math.min(1, (t - 5300) / 400));
  // Reset fade
  const resetFade = t >= 5800 ? Math.max(0, 1 - (t - 5800) / 200) : 1;

  return (
    <div className="fixed inset-0 bg-[#0d0f0e] flex items-center justify-center overflow-hidden" style={{ cursor: "none" }}>
      {/* Warm center glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(300px 300px at 50% 50%, rgba(217,119,87,${0.12 * glowP * resetFade}), transparent 70%)` }} />

      {/* Motion lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1080 1920" style={{ opacity: glowP * 0.3 * resetFade }}>
        {[30, 80, 150, 210, 280].map((y, i) => {
          const offset = ((t / 1000 + i * 0.4) % 3) / 3;
          return <line key={i} x1={-200 + offset * 1480} y1={600 + y * 3} x2={200 + offset * 1480} y2={580 + y * 3} stroke="#d97757" strokeWidth="1" opacity={0.15 + i * 0.05} />;
        })}
      </svg>

      {/* Letters */}
      <div className="relative flex items-baseline" style={{ opacity: resetFade }}>
        {letters.map((char, i) => {
          const sc = scatterPos[i];
          // Before 2s: invisible. 2-4s: scattered at 15%. 4-5s: fly to center
          let x = 0, y = 0, r = 0, opacity = 0;
          if (t >= 2000 && t < 4000) {
            const sP = sp(scatterP);
            x = sc.x; y = sc.y; r = sc.r;
            opacity = 0.15 * sP;
          } else if (t >= 4000) {
            const fP = sp(flyP);
            x = sc.x * (1 - fP);
            y = sc.y * (1 - fP);
            r = sc.r * (1 - fP);
            opacity = 0.15 + 0.85 * fP;
          }

          return (
            <span key={i} className="font-display font-[800] text-[64px] text-[#fafaf7] tracking-[-0.035em] inline-block"
              style={{ transform: `translate(${x}px, ${y}px) rotate(${r}deg)`, opacity }}>
              {char}
            </span>
          );
        })}
        {/* Dot */}
        <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#d97757] ml-[3px]"
          style={{ transform: `scale(${sp(dotP)})`, opacity: dotP > 0 ? resetFade : 0 }} />
      </div>

      {/* Tagline */}
      <div className="absolute bottom-[30vh] text-center px-8"
        style={{ opacity: sp(tagP) * resetFade, transform: `translateY(${12 * (1 - sp(tagP))}px)` }}>
        <p className="font-display font-[800] text-[28px] tracking-[-0.03em] text-white/60">
          Payments that <span className="text-[#d97757]">think</span> before they fall.
        </p>
      </div>
    </div>
  );
}
