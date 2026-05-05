"use client";
import { useEffect, useState, useRef } from "react";
import type { ReelTheme } from "@/lib/themes";
import ReelLogoOutro from "@/components/ReelLogoOutro";

const LOOP = 13000;

// Timeline
const HEADER_IN = 0, HEADER_DUR = 1000;
const USER_MSG_IN = 1000, USER_MSG_DUR = 800;
const TYPING_START = 2500, TYPING_DUR = 1500;
const AI_MSG_IN = 4000, AI_MSG_DUR = 1000;
const REGION_START = 5500, REGION_STAGGER = 600, REGION_DUR = 600;
const OVERALL_IN = 8500, OVERALL_DUR = 600;
const TAG_IN = 10000, TAG_DUR = 800;
const OUTRO_START = 11500, OUTRO_DUR = 1500;

const regions = [
  { flag: "🇩🇪", name: "Germany", pct: 94.2 },
  { flag: "🇬🇧", name: "United Kingdom", pct: 91.8 },
  { flag: "🇫🇷", name: "France", pct: 89.4 },
  { flag: "🇳🇱", name: "Netherlands", pct: 96.1 },
];

function useCountUp(end: number, duration: number, startTime: number, t: number) {
  const elapsed = Math.max(0, t - startTime);
  const p = Math.min(1, elapsed / duration);
  const ease = 1 - Math.pow(1 - p, 3);
  return (ease * end).toFixed(1);
}

export default function AIChat({ theme }: { theme: ReelTheme }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  const headerP = ease(Math.max(0, Math.min(1, (t - HEADER_IN) / HEADER_DUR)));
  const userP = ease(Math.max(0, Math.min(1, (t - USER_MSG_IN) / USER_MSG_DUR)));
  const typingVisible = t >= TYPING_START && t < AI_MSG_IN;
  const aiP = ease(Math.max(0, Math.min(1, (t - AI_MSG_IN) / AI_MSG_DUR)));
  const overallP = ease(Math.max(0, Math.min(1, (t - OVERALL_IN) / OVERALL_DUR)));
  const tagP = ease(Math.max(0, Math.min(1, (t - TAG_IN) / TAG_DUR)));
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);
  const mainFade = t < OUTRO_START - 500 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 500)) / 500);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden px-6" style={{ cursor: "none", background: theme.bg }}>
      <div className="w-full max-w-[420px]" style={{ opacity: mainFade }}>
        {/* Chat window */}
        <div className="rounded-[20px] overflow-hidden" style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: `0 30px 60px -20px rgba(0,0,0,0.4)` }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${theme.border}`, opacity: headerP }}>
            <div className="w-8 h-8 rounded-full grid place-items-center" style={{ background: theme.accent }}>
              <span className="font-mono text-[10px] font-bold" style={{ color: theme.bg }}>CX</span>
            </div>
            <div>
              <div className="font-display font-[600] text-[14px]" style={{ color: theme.ink }}>CascadX Copilot</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.06em]" style={{ color: theme.inkMuted }}>Online</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 8px ${theme.accent}` }} />
          </div>

          {/* Messages */}
          <div className="px-5 py-5 space-y-3 min-h-[320px]">
            {/* User bubble */}
            <div className="flex justify-end" style={{ opacity: userP, transform: `translateY(${8 * (1 - userP)}px)` }}>
              <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md text-[14px] leading-relaxed" style={{ background: theme.accent, color: theme.bg }}>
                Show me approval rates by region this week
              </div>
            </div>

            {/* Typing indicator */}
            {typingVisible && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5" style={{ background: theme.surfaceSubtle, border: `1px solid ${theme.border}` }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2 h-2 rounded-full" style={{ background: theme.inkMuted, animation: `pulse 1s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            {/* AI response */}
            {aiP > 0 && (
              <div className="flex justify-start" style={{ opacity: aiP, transform: `translateY(${8 * (1 - aiP)}px)` }}>
                <div className="max-w-[90%] px-4 py-3 rounded-2xl rounded-bl-md text-[14px] leading-relaxed" style={{ background: theme.surfaceSubtle, border: `1px solid ${theme.border}`, color: theme.ink }}>
                  <p className="mb-3" style={{ color: theme.inkSoft }}>Here&apos;s your regional breakdown for the past 7 days:</p>
                  <div className="space-y-2">
                    {regions.map((r, i) => {
                      const regionStart = REGION_START + i * REGION_STAGGER;
                      const rP = ease(Math.max(0, Math.min(1, (t - regionStart) / REGION_DUR)));
                      const val = useCountUp(r.pct, REGION_DUR, regionStart, t);
                      return (
                        <div key={r.name} className="flex items-center justify-between font-mono text-[13px]" style={{ opacity: rP, transform: `translateX(${-8 * (1 - rP)}px)` }}>
                          <span style={{ color: theme.ink }}>{r.flag} {r.name}</span>
                          <span className="font-bold" style={{ color: theme.accent }}>{val}%</span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Overall stat */}
                  {overallP > 0 && (
                    <div className="mt-3 pt-3 font-mono text-[13px]" style={{ borderTop: `1px solid ${theme.border}`, opacity: overallP }}>
                      <span style={{ color: theme.inkSoft }}>Overall lift vs last week: </span>
                      <span className="font-bold" style={{ color: theme.accent }}>+3.7%</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mt-8" style={{ opacity: tagP, transform: `translateY(${12 * (1 - tagP)}px)` }}>
          <p className="font-display font-[600] text-[32px] tracking-[-0.03em] leading-[1.1]" style={{ color: theme.ink }}>
            Your payments operator that <span style={{ color: theme.accent }}>never sleeps</span>.
          </p>
        </div>
      </div>

      {outroP > 0 && <ReelLogoOutro progress={outroP} theme={theme} />}
    </div>
  );
}
