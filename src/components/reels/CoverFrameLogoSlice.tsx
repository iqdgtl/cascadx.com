"use client";
import { pastel } from "@/lib/pastelTheme";

/**
 * CoverFrameLogoSlice — renders the full "CascadX." wordmark
 * and clips to show only the requested third.
 *
 * portion: 1 = "CAS", 2 = "CAD", 3 = "X."
 */
export default function CoverFrameLogoSlice({ portion, progress }: { portion: 1 | 2 | 3; progress: number }) {
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);
  const sp = spring(progress);

  // Shift: portion 1 shows left third, portion 2 shows middle, portion 3 shows right
  // The wordmark is 300% of frame width. To show portion N, shift left by (N-1) * 100%.
  const shift = (portion - 1) * 100;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity: sp }}
    >
      {/* Scale wrapper — scales around frame center */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ transform: `scale(${0.95 + 0.05 * sp})` }}
      >
        {/* Wordmark — 300% wide, shifted to show the correct portion */}
        <div
          className="flex items-baseline whitespace-nowrap"
          style={{
            width: "300%",
            marginLeft: `-${shift}%`,
            paddingLeft: "3%",
          }}
        >
          <span
            className="font-display font-[800] tracking-[-0.04em] leading-none"
            style={{
              fontSize: "min(28vw, 320px)",
              color: pastel.ink,
            }}
          >
            CascadX
          </span>
          <span
            className="inline-block rounded-full"
            style={{
              width: "min(2.2vw, 24px)",
              height: "min(2.2vw, 24px)",
              background: pastel.accent,
              marginLeft: "min(0.8vw, 8px)",
              marginBottom: "min(0.5vw, 6px)",
              verticalAlign: "baseline",
            }}
          />
        </div>
      </div>
    </div>
  );
}
