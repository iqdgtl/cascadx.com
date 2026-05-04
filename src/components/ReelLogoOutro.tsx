"use client";

/**
 * Shared logo outro for all reel pages.
 * Letters fly in from random positions, settle with spring,
 * then terracotta dot pops in.
 *
 * @param progress 0→1 over the outro duration (typically 2s)
 */
export default function ReelLogoOutro({ progress }: { progress: number }) {
  const letters = "CascadX".split("");
  // Pre-computed random start positions (stable across renders)
  const starts = [
    { x: -120, y: -80, r: -18 },
    { x: 80, y: -120, r: 15 },
    { x: -60, y: 100, r: -12 },
    { x: 140, y: 60, r: 20 },
    { x: -100, y: -40, r: -8 },
    { x: 60, y: 120, r: 14 },
    { x: -80, y: -100, r: -20 },
  ];

  const spring = (t: number) => t < 0 ? 0 : t > 1 ? 1 : 1 - Math.pow(1 - t, 3) * Math.cos(t * Math.PI * 0.6);

  // Letters animate 0→0.7 of progress, dot at 0.7→0.85
  const lettersDone = progress >= 0.7;
  const dotP = Math.max(0, (progress - 0.7) / 0.15);

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: progress > 0 ? 1 : 0 }}>
      {/* Warm glow behind */}
      <div className="absolute w-[300px] h-[300px] rounded-full" style={{ background: `radial-gradient(circle, rgba(217,119,87,${0.15 * Math.min(progress * 2, 1)}) 0%, transparent 70%)` }} />

      <div className="relative flex items-baseline" style={{ top: "10%" }}>
        {letters.map((char, i) => {
          const s = starts[i];
          const p = Math.max(0, Math.min(1, (progress * letters.length - i * 0.6) / 1.5));
          const sp = spring(p);
          const x = s.x * (1 - sp);
          const y = s.y * (1 - sp);
          const r = s.r * (1 - sp);
          return (
            <span
              key={i}
              className="font-display font-[800] text-[52px] text-[#fafaf7] tracking-[-0.035em] inline-block"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${r}deg)`,
                opacity: p > 0 ? Math.min(1, p * 3) : 0,
              }}
            >
              {char}
            </span>
          );
        })}
        {/* Terracotta dot */}
        <span
          className="inline-block w-[8px] h-[8px] rounded-full bg-[#d97757] ml-[3px]"
          style={{
            transform: `scale(${spring(dotP)})`,
            opacity: dotP > 0 ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
