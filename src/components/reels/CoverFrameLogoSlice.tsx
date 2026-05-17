"use client";
import { pastel } from "@/lib/pastelTheme";

/**
 * CoverFrameLogoSlice — renders the full "CascadX." wordmark at 3-frame width
 * and clips to show only the requested portion.
 *
 * portion: 1 = "CAS" (first third), 2 = "CAD" (middle third), 3 = "X." (last third)
 *
 * The wordmark is positioned so that each portion fills exactly one 9:16 frame width.
 */
export default function CoverFrameLogoSlice({ portion, progress }: { portion: 1 | 2 | 3; progress: number }) {
  // The wordmark spans 3x frame width. Each frame shows 1/3.
  // We shift the wordmark left by (portion - 1) * 100% of frame width.
  const shiftPercent = (portion - 1) * 100;

  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);
  const sp = spring(progress);

  return (
    <div
      className="absolute inset-0 flex items-center overflow-hidden"
      style={{ opacity: sp }}
    >
      {/* Full wordmark container — 300% width of frame, shifted to show correct portion */}
      <div
        className="relative flex items-baseline whitespace-nowrap"
        style={{
          width: "300%",
          transform: `translateX(-${shiftPercent}%) scale(${0.95 + 0.05 * sp})`,
          transformOrigin: `${shiftPercent + 50}% 50%`,
          paddingLeft: "5%",
        }}
      >
        {/* "CascadX" rendered as one continuous text block */}
        <span
          className="font-display font-[800] tracking-[-0.04em] leading-none"
          style={{
            fontSize: "min(28vw, 320px)", // sized to fill ~3 frames at this size within 9:16
            color: pastel.ink,
          }}
        >
          CascadX
        </span>
        {/* Terracotta dot */}
        <span
          className="inline-block rounded-full ml-[0.5%]"
          style={{
            width: "min(2.5vw, 28px)",
            height: "min(2.5vw, 28px)",
            background: pastel.accent,
            verticalAlign: "baseline",
            marginBottom: "min(1vw, 12px)",
          }}
        />
      </div>
    </div>
  );
}
