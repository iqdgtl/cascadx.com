"use client";

/**
 * RobotMascot — CascadX brand mascot.
 * Pure inline SVG. Variants: idle, thinking, waving, confused.
 *
 * Usage: <RobotMascot size={90} variant="idle" />
 */

type Variant = "idle" | "thinking" | "waving" | "confused";

type RobotMascotProps = {
  size?: number;
  variant?: Variant;
  className?: string;
};

export default function RobotMascot({
  size = 90,
  variant = "idle",
  className = "",
}: RobotMascotProps) {
  const isWaving = variant === "waving";
  const isThinking = variant === "thinking";
  const isConfused = variant === "confused";

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-label="CascadX mascot"
      style={{ overflow: "visible" }}
    >
      <defs>
        <style>{`
          @keyframes robotFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.08); }
          }
          @keyframes blinkR {
            0%, 93%, 100% { transform: scaleY(1); }
            96.5% { transform: scaleY(0.08); }
          }
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            15% { transform: rotate(20deg); }
            30% { transform: rotate(-5deg); }
            45% { transform: rotate(20deg); }
            60% { transform: rotate(0deg); }
          }
          @keyframes dots {
            0%, 20% { opacity: 0; }
            30% { opacity: 1; }
          }
        `}</style>
      </defs>

      <g style={{ animation: "robotFloat 4s ease-in-out infinite" }}>
        {/* === ANTENNA === */}
        <line x1="60" y1="18" x2="60" y2="6" stroke="#b8bcb6" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="5" r="5" fill="#d97757" opacity="0.8">
          <animate attributeName="r" values="4.5;6.5;4.5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* === HEAD === */}
        <rect x="22" y="18" width="76" height="62" rx="22" fill="#262c2b" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="23" y="18.5" width="74" height="2" rx="1" fill="rgba(255,255,255,0.06)" />

        {/* Face screen */}
        <rect x="30" y="27" width="60" height="44" rx="16" fill="#0d0f0e" />

        {/* Circuit lines inside face */}
        <path d="M36 62 Q42 55, 50 58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeLinecap="round" />
        <path d="M70 62 Q76 55, 84 58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeLinecap="round" />

        {/* === EYES === */}
        {isThinking ? (
          /* Thinking: dots */
          <>
            <circle cx="42" cy="44" r="3" fill="#fafaf7" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="56" cy="44" r="3" fill="#fafaf7" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="70" cy="44" r="3" fill="#fafaf7" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </>
        ) : (
          <>
            {/* Left eye */}
            <g style={{ transformOrigin: "46px 42px", animation: isConfused ? "none" : "blink 3.5s ease-in-out infinite" }}>
              <circle cx="46" cy="42" r="7.5" fill="#fafaf7" />
              <circle cx="46" cy="42" r="4" fill="#0d0f0e" />
              <circle cx="44" cy="40" r="2" fill="#fff" />
              <circle cx="48" cy="43.5" r="0.9" fill="rgba(255,255,255,0.5)" />
            </g>

            {/* Right eye */}
            <g style={{ transformOrigin: "72px 42px", animation: isConfused ? "none" : "blinkR 4s ease-in-out infinite" }}>
              <circle cx="72" cy={isConfused ? "40" : "42"} r="7.5" fill="#fafaf7" />
              <circle cx="72" cy={isConfused ? "40" : "42"} r="4" fill="#0d0f0e" />
              <circle cx="70" cy={isConfused ? "38" : "40"} r="2" fill="#fff" />
              <circle cx="74" cy={isConfused ? "41.5" : "43.5"} r="0.9" fill="rgba(255,255,255,0.5)" />
            </g>

            {/* Confused: raised eyebrow on right eye */}
            {isConfused && (
              <path d="M64 30 Q70 26, 80 30" fill="none" stroke="#fafaf7" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </>
        )}

        {/* Cheek blush */}
        <circle cx="34" cy="53" r="4.5" fill="#d97757" opacity="0.2" />
        <circle cx="84" cy="53" r="4.5" fill="#d97757" opacity="0.2" />

        {/* === MOUTH === */}
        {isConfused ? (
          /* Flat/sideways mouth */
          <path d="M50 58 Q56 56, 66 59" fill="none" stroke="#fafaf7" strokeWidth="2" strokeLinecap="round" />
        ) : isThinking ? (
          /* Small O mouth */
          <circle cx="59" cy="58" r="3.5" fill="none" stroke="#fafaf7" strokeWidth="1.8" />
        ) : (
          /* Gentle smile */
          <path d="M48 57 Q58 65, 70 57" fill="none" stroke="#fafaf7" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* === EARS === */}
        <rect x="14" y="36" width="10" height="18" rx="5" fill="#262c2b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <rect x="16.5" y="41" width="5" height="5" rx="2.5" fill="#d97757" opacity="0.4" />
        <rect x="96" y="36" width="10" height="18" rx="5" fill="#262c2b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <rect x="98.5" y="41" width="5" height="5" rx="2.5" fill="#d97757" opacity="0.4" />

        {/* === BODY === */}
        <rect x="34" y="80" width="52" height="26" rx="13" fill="#262c2b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <rect x="35" y="80.5" width="50" height="1.5" rx="0.75" fill="rgba(255,255,255,0.05)" />

        {/* Chip on body */}
        <rect x="48" y="87" width="24" height="12" rx="3.5" fill="#1e2423" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <line x1="54" y1="87" x2="54" y2="99" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <line x1="66" y1="87" x2="66" y2="99" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <line x1="48" y1="93" x2="72" y2="93" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <circle cx="60" cy="93" r="2.2" fill="#d97757" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>

        {/* === LEFT ARM === */}
        <rect x="20" y="84" width="16" height="8" rx="4" fill="#262c2b" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

        {/* === RIGHT ARM (waves if variant=waving) === */}
        <g style={isWaving ? { transformOrigin: "86px 86px", animation: "wave 2.4s ease-in-out infinite" } : undefined}>
          <rect x="84" y="84" width="16" height="8" rx="4" fill="#262c2b" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          {isWaving && (
            /* Hand — small circle at end of arm */
            <circle cx="102" cy="82" r="5" fill="#262c2b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          )}
        </g>

        {/* Thinking: ellipsis above head */}
        {isThinking && (
          <g>
            <circle cx="80" cy="8" r="3" fill="rgba(255,255,255,0.3)">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="88" cy="2" r="4" fill="rgba(255,255,255,0.2)">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="98" cy="-2" r="5" fill="rgba(255,255,255,0.15)">
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
      </g>
    </svg>
  );
}
