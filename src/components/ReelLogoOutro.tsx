"use client";
import type { ReelTheme } from "@/lib/themes";
import { darkTheme } from "@/lib/themes";

export default function ReelLogoOutro({ progress, theme = darkTheme }: { progress: number; theme?: ReelTheme }) {
  const letters = "CascadX".split("");
  const starts = [
    { x: -120, y: -80, r: -18 }, { x: 80, y: -120, r: 15 }, { x: -60, y: 100, r: -12 },
    { x: 140, y: 60, r: 20 }, { x: -100, y: -40, r: -8 }, { x: 60, y: 120, r: 14 }, { x: -80, y: -100, r: -20 },
  ];
  const spring = (t: number) => t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3) * Math.cos(t * Math.PI * 0.6);
  const dotP = Math.max(0, (progress - 0.7) / 0.15);

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: progress > 0 ? 1 : 0 }}>
      <div className="absolute w-[300px] h-[300px] rounded-full" style={{ background: `radial-gradient(circle, rgba(217,119,87,${0.15 * Math.min(progress * 2, 1)}) 0%, transparent 70%)` }} />
      <div className="relative flex items-baseline" style={{ top: "10%" }}>
        {letters.map((char, i) => {
          const s = starts[i];
          const p = Math.max(0, Math.min(1, (progress * letters.length - i * 0.6) / 1.5));
          const sp = spring(p);
          return (
            <span key={i} className="font-display font-[800] text-[52px] tracking-[-0.035em] inline-block"
              style={{ color: theme.ink, transform: `translate(${s.x * (1 - sp)}px, ${s.y * (1 - sp)}px) rotate(${s.r * (1 - sp)}deg)`, opacity: p > 0 ? Math.min(1, p * 3) : 0 }}>
              {char}
            </span>
          );
        })}
        <span className="inline-block w-[8px] h-[8px] rounded-full ml-[3px]"
          style={{ background: theme.accent, transform: `scale(${spring(dotP)})`, opacity: dotP > 0 ? 1 : 0 }} />
      </div>
    </div>
  );
}
