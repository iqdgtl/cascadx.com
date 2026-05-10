"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { pastel } from "@/lib/pastelTheme";
import LivingGlobe from "./LivingGlobe";

const LOOP = 10000;

// Timeline
const LETTER_IN = 0, LETTER_DUR = 1500;
const LETTER_HOLD_END = 2500;
const SHRINK_START = 2500, SHRINK_DUR = 1000; // letter shrinks into phrase position
const TYPE_START = 3500; // rest of phrase types out (first char is already there)
const CHAR_MS = 65;
const HOLD_START = 7500, HOLD_DUR = 1000;
const OUTRO_START = 8500, OUTRO_DUR = 1500;

function genDelays(len: number): number[] {
  const seed = [62, 78, 55, 72, 67, 80, 58, 74, 69, 63, 77, 56, 71, 65, 81, 57, 73, 68, 61, 76, 64, 79, 53, 70, 66, 82, 59, 75, 60, 83];
  return Array.from({ length: len }, (_, i) => seed[i % seed.length]);
}

export default function LetterReel({ letter, phrase, bgVariant: _ }: { letter: string; phrase: string; bgVariant: string }) {
  const [t, setT] = useState(-1);
  const raf = useRef(0); const s = useRef(0);
  useEffect(() => {
    const r = setTimeout(() => {
      s.current = performance.now();
      const tick = () => { setT((performance.now() - s.current) % LOOP); raf.current = requestAnimationFrame(tick); };
      raf.current = requestAnimationFrame(tick);
    }, 1000);
    return () => { clearTimeout(r); cancelAnimationFrame(raf.current); };
  }, []);

  const ease = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
  const smoothEase = (p: number) => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    // cubic-bezier(0.4, 0, 0.2, 1) approximation
    return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  };
  const spring = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 0.5);

  // Phase: big letter visible alone
  const letterP = ease(Math.max(0, Math.min(1, (t - LETTER_IN) / LETTER_DUR)));
  const letterBreath = t >= 1500 && t < LETTER_HOLD_END ? 1 + 0.02 * Math.sin(((t - 1500) / 1000) * Math.PI) : 1;

  // Phase: letter shrinking into phrase position
  const shrinkP = smoothEase(Math.max(0, Math.min(1, (t - SHRINK_START) / SHRINK_DUR)));
  const letterDone = t >= SHRINK_START + SHRINK_DUR; // letter is now the first char of phrase

  // The rest of the phrase (everything after the first character)
  const restPhrase = phrase.slice(1);
  const delays = useMemo(() => genDelays(restPhrase.length), [restPhrase]);
  const cumulative = useMemo(() => { const a = [0]; for (let i = 0; i < delays.length; i++) a.push(a[i] + delays[i]); return a; }, [delays]);
  const typeElapsed = Math.max(0, t - TYPE_START);
  let chars = 0;
  for (let i = 0; i < cumulative.length; i++) { if (typeElapsed >= cumulative[i]) chars = i; }
  chars = Math.min(chars, restPhrase.length);
  const typing = t >= TYPE_START && chars < restPhrase.length;

  // Outro
  const outroP = ease(Math.max(0, (t - OUTRO_START) / OUTRO_DUR));
  const mainFade = t < OUTRO_START - 300 ? 1 : Math.max(0, 1 - (t - (OUTRO_START - 300)) / 300);

  // Letter visual properties during transition
  // Big state: fontSize ~500px, centered at 40% Y, color pastel.letter
  // Small state: fontSize ~38px, positioned as first char of centered phrase text
  const bigFontSize = "min(480px, 50vh)";
  const smallFontSize = "min(38px, 4.2vh)";
  const showBigLetter = t < SHRINK_START + SHRINK_DUR && t >= 0;

  // Logo outro
  const logoLetters = "CascadX".split("");
  const logoStarts = [
    { x: -80, y: -50, r: -12 }, { x: 60, y: -70, r: 10 }, { x: -40, y: 60, r: -8 },
    { x: 100, y: 40, r: 15 }, { x: -60, y: -25, r: -6 }, { x: 40, y: 80, r: 9 }, { x: -55, y: -65, r: -14 },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", overflow: "hidden", cursor: "none" }}>
      <div style={{ width: "min(1080px, 56.25vh)", height: "min(1920px, 100vh)", aspectRatio: "9 / 16", position: "relative", overflow: "hidden", background: pastel.bg }}>

        {/* Living globe background — runs continuously */}
        <LivingGlobe t={Math.max(0, t)} />

        {/* ===== FOREGROUND ===== */}

        {/* Big letter — visible from 0s to ~3.5s, then morphs into phrase */}
        {showBigLetter && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: mainFade * letterP,
              // During shrink: move from center toward phrase position
              transform: shrinkP > 0
                ? `translateY(${shrinkP * 8}vh) scale(${1 - shrinkP * 0.92})`
                : `scale(${(1.4 - 0.4 * letterP) * letterBreath})`,
              transition: "none",
            }}
          >
            <span
              className="font-display font-[800] leading-none select-none"
              style={{
                fontSize: shrinkP > 0 ? smallFontSize : bigFontSize,
                color: shrinkP > 0
                  ? `color-mix(in srgb, ${pastel.letter} ${Math.round((1 - shrinkP) * 100)}%, ${pastel.ink})`
                  : pastel.letter,
                opacity: shrinkP > 0 ? 1 - shrinkP * 0.3 : 0.85,
              }}
            >
              {letter}
            </span>
          </div>
        )}

        {/* Phrase text — appears after letter lands */}
        {letterDone && (
          <div
            className="absolute left-0 right-0 flex justify-center px-[8%] pointer-events-none"
            style={{ top: "42%", opacity: mainFade }}
          >
            <p
              className="font-display font-[600] text-center leading-[1.35] tracking-[-0.01em]"
              style={{ fontSize: "min(38px, 4.2vh)", color: pastel.ink, maxWidth: "85%" }}
            >
              {/* First character (the morphed big letter) */}
              <span>{letter}</span>
              {/* Rest types out */}
              <span>{restPhrase.slice(0, chars)}</span>
              {typing && (
                <span
                  className="inline-block w-[2px] align-middle ml-[1px]"
                  style={{
                    height: "min(32px, 3.5vh)",
                    background: pastel.accent,
                    animation: "pulse 0.8s step-end infinite",
                  }}
                />
              )}
            </p>
          </div>
        )}

        {/* Logo outro */}
        {outroP > 0 && (
          <div className="absolute left-0 right-0 bottom-[8%] flex flex-col items-center" style={{ opacity: outroP }}>
            <div className="flex items-baseline">
              {logoLetters.map((char, i) => {
                const p = Math.max(0, Math.min(1, (outroP * logoLetters.length - i * 0.5) / 1.2));
                const sp = spring(p);
                const ls = logoStarts[i];
                return (
                  <span key={i} className="font-display font-[800] tracking-[-0.035em] inline-block"
                    style={{ fontSize: "min(40px, 4vh)", color: pastel.ink, transform: `translate(${ls.x * (1 - sp)}px, ${ls.y * (1 - sp)}px) rotate(${ls.r * (1 - sp)}deg)`, opacity: p > 0 ? Math.min(1, p * 3) : 0 }}>
                    {char}
                  </span>
                );
              })}
              <span className="inline-block rounded-full ml-[2px]"
                style={{ width: "min(6px, 0.7vh)", height: "min(6px, 0.7vh)", background: pastel.accent, transform: `scale(${spring(Math.max(0, (outroP - 0.7) / 0.15))})` }} />
            </div>
            <p className="font-display font-[400] tracking-[-0.01em] mt-2"
              style={{ fontSize: "min(18px, 2vh)", color: pastel.inkSoft, opacity: Math.max(0, (outroP - 0.8) / 0.2) }}>
              Payments that think.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
