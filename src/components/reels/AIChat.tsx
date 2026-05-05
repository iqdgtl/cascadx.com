"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import type { ReelTheme } from "@/lib/themes";
import ReelLogoOutro from "@/components/ReelLogoOutro";

const LOOP = 14000;

// Timeline
const SETUP_IN = 0, SETUP_DUR = 1500;
const TYPE_START = 1500; // User typing in input field
const SEND_AT = 3000; // User presses send
const BUBBLE_FLY = 3300; // Bubble settles
const THINKING_START = 3600; // AI dots appear
const RESPONSE_START = 5500; // First line of response
const HOLD_START = 11000;
const FADE_START = 12000;
const OUTRO_START = 12500, OUTRO_DUR = 1500;

const userMsg = "What were our approval rates today?";

const responseLines = [
  { text: "Today's approval rates by region:", delay: 0, hasStat: false, stat: 0 },
  { text: "🇪🇸 Spain — ", delay: 900, hasStat: true, stat: 94.2 },
  { text: "🇨🇦 Canada — ", delay: 1700, hasStat: true, stat: 91.8 },
  { text: "🇦🇺 Australia — ", delay: 2500, hasStat: true, stat: 96.5 },
  { text: "Overall lift vs last week: ", delay: 3500, hasStat: true, stat: 3.7, prefix: "+" },
];

// Generate random per-character delays for realistic typing
function genTypingDelays(len: number, base: number, variance: number): number[] {
  const seed = [73, 91, 62, 85, 77, 68, 94, 71, 83, 66, 88, 75, 92, 60, 79, 87, 64, 95, 72, 81, 69, 90, 76, 84, 63, 93, 70, 86, 67, 78, 89, 61, 82, 74, 96, 65, 80, 97, 58, 91];
  return Array.from({ length: len }, (_, i) => base + (seed[i % seed.length] - 75) * (variance / 25));
}

export default function AIChat({ theme }: { theme: ReelTheme }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => { const r = setTimeout(() => { s.current = performance.now(); const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); }, 1000); return () => { clearTimeout(r); cancelAnimationFrame(raf.current); }; }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  // Typing delays for user message
  const userDelays = useMemo(() => genTypingDelays(userMsg.length, 75, 20), []);
  const userCumulative = useMemo(() => {
    const arr = [0];
    for (let i = 0; i < userDelays.length; i++) arr.push(arr[i] + userDelays[i]);
    return arr;
  }, [userDelays]);

  // How many user chars are typed
  const userElapsed = Math.max(0, t - TYPE_START);
  let userChars = 0;
  for (let i = 0; i < userCumulative.length; i++) {
    if (userElapsed >= userCumulative[i]) userChars = i;
  }
  userChars = Math.min(userChars, userMsg.length);
  const userTyping = t >= TYPE_START && t < SEND_AT;
  const userSent = t >= SEND_AT;

  // Send button pulse
  const sendPulse = t >= SEND_AT && t < SEND_AT + 200;

  // Bubble fly in
  const bubbleP = spring(Math.max(0, Math.min(1, (t - SEND_AT) / 300)));

  // Thinking dots
  const thinkingVisible = t >= THINKING_START && t < RESPONSE_START;

  // Response lines — typewriter per line
  const getLineChars = (lineIdx: number) => {
    const line = responseLines[lineIdx];
    const lineStart = RESPONSE_START + line.delay;
    const elapsed = Math.max(0, t - lineStart);
    const chars = Math.min(line.text.length, Math.floor(elapsed / 40));
    return { chars, started: t >= lineStart, lineStart };
  };

  // Stat count-up
  const getStatVal = (lineIdx: number) => {
    const line = responseLines[lineIdx];
    const lineStart = RESPONSE_START + line.delay;
    const textDone = lineStart + line.text.length * 40;
    const elapsed = Math.max(0, t - textDone);
    const p = Math.min(1, elapsed / 500);
    const eased = 1 - Math.pow(1 - p, 3);
    return (eased * line.stat).toFixed(1);
  };

  const setupP = ease(Math.max(0, Math.min(1, (t - SETUP_IN) / SETUP_DUR)));
  const mainFade = t < FADE_START ? 1 : Math.max(0, 1 - (t - FADE_START) / 500);
  const outroP = Math.max(0, (t - OUTRO_START) / OUTRO_DUR);

  // Cursor blink (every 500ms)
  const cursorOn = Math.floor(t / 500) % 2 === 0;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden px-5" style={{ cursor: "none", background: theme.bg }}>
      <div className="w-full max-w-[400px]" style={{ opacity: mainFade }}>
        {/* Chat container */}
        <div className="rounded-[18px] overflow-hidden flex flex-col" style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: "0 20px 50px -15px rgba(0,0,0,0.4)", opacity: setupP, height: "460px" }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ borderBottom: `1px solid ${theme.border}` }}>
            <div className="w-8 h-8 rounded-full grid place-items-center" style={{ background: theme.accent }}>
              <span className="font-mono text-[9px] font-bold" style={{ color: theme.bg }}>CX</span>
            </div>
            <div>
              <div className="font-display font-[600] text-[13px]" style={{ color: theme.ink }}>CascadX Assistant</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: theme.inkMuted }}>Online</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full animate-[pulse_2s_ease-in-out_infinite]" style={{ background: theme.accent }} />
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-hidden px-4 py-4 space-y-3">
            {/* User bubble — only after send */}
            {userSent && (
              <div className="flex justify-end" style={{ opacity: bubbleP, transform: `translateY(${12 * (1 - bubbleP)}px)` }}>
                <div className="max-w-[82%] px-4 py-2.5 rounded-2xl rounded-br-md text-[13px] leading-relaxed" style={{ background: theme.accent, color: theme.bg }}>
                  {userMsg}
                </div>
              </div>
            )}

            {/* Thinking dots */}
            {thinkingVisible && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5" style={{ background: theme.surfaceSubtle, border: `1px solid ${theme.border}` }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-[6px] h-[6px] rounded-full" style={{ background: theme.accent, opacity: 0.3 + 0.7 * Math.abs(Math.sin((t / 400 + i * 0.7) * Math.PI)), transition: "opacity 0.15s" }} />
                  ))}
                </div>
              </div>
            )}

            {/* AI response — typewriter per line */}
            {t >= RESPONSE_START && (
              <div className="flex justify-start">
                <div className="max-w-[90%] px-4 py-3 rounded-2xl rounded-bl-md text-[13px] leading-[1.7]" style={{ background: theme.surfaceSubtle, border: `1px solid ${theme.border}`, color: theme.ink }}>
                  {responseLines.map((line, idx) => {
                    const { chars, started, lineStart } = getLineChars(idx);
                    if (!started) return null;
                    return (
                      <div key={idx} className={idx > 0 ? "mt-1" : ""} style={{ fontFamily: idx === 0 ? "inherit" : "'JetBrains Mono', monospace", fontSize: idx === 0 ? "13px" : "12px" }}>
                        <span style={{ color: idx === 0 ? theme.inkSoft : theme.ink }}>
                          {line.text.slice(0, chars)}
                        </span>
                        {line.hasStat && chars >= line.text.length && (
                          <span className="font-bold" style={{ color: theme.accent }}>
                            {line.prefix || ""}{getStatVal(idx)}%
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Input field — always visible at bottom */}
          <div className="px-3 py-3 shrink-0" style={{ borderTop: `1px solid ${theme.border}` }}>
            <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: theme.bg === "#0d0f0e" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", border: `1px solid ${theme.border}` }}>
              <div className="flex-1 text-[13px] min-h-[20px] flex items-center" style={{ color: theme.ink }}>
                {userTyping && (
                  <>
                    <span>{userMsg.slice(0, userChars)}</span>
                    {cursorOn && <span className="inline-block w-[1.5px] h-[16px] ml-[1px]" style={{ background: theme.accent }} />}
                  </>
                )}
                {!userTyping && !userSent && (
                  <>
                    {cursorOn && <span className="inline-block w-[1.5px] h-[16px]" style={{ background: theme.inkMuted }} />}
                  </>
                )}
                {userSent && t < HOLD_START && (
                  <span style={{ color: theme.inkMuted }}>Type a message...</span>
                )}
                {t >= HOLD_START && cursorOn && <span className="inline-block w-[1.5px] h-[16px]" style={{ background: theme.inkMuted }} />}
              </div>
              <div className="w-7 h-7 rounded-full grid place-items-center shrink-0 transition-all duration-200"
                style={{ background: sendPulse ? theme.accent : theme.surfaceSubtle, boxShadow: sendPulse ? `0 0 12px ${theme.accent}` : "none" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={sendPulse ? theme.bg : theme.inkMuted} strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {outroP > 0 && <ReelLogoOutro progress={outroP} theme={theme} />}
    </div>
  );
}
