"use client";
import { useEffect, useState, useRef } from "react";

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

export default function LiveCounter() {
  // Seed today's base so it looks realistic
  const todayBase = useRef(2_478_391 + Math.floor(Date.now() / 86400000) % 500_000);
  const [total, setTotal]       = useState(todayBase.current);
  const [lastMin, setLastMin]   = useState(1_240);
  const [bump, setBump]         = useState(false);
  const [visible, setVisible]   = useState(true);
  const minAccum = useRef(0);
  const minTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const addIncrement = () => {
      const inc = Math.floor(Math.random() * 1800 + 200);
      setTotal(t => t + inc);
      minAccum.current += inc;
      setBump(true);
      setTimeout(() => setBump(false), 600);

      // schedule next
      const next = Math.random() * 5000 + 2000;
      minTimer.current = setTimeout(addIncrement, next);
    };

    minTimer.current = setTimeout(addIncrement, 2500);

    // reset last-minute counter every 60s
    const minReset = setInterval(() => {
      setLastMin(minAccum.current || Math.floor(Math.random() * 2000 + 400));
      minAccum.current = 0;
    }, 60_000);

    return () => {
      if (minTimer.current) clearTimeout(minTimer.current);
      clearInterval(minReset);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: "rgba(13,15,14,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(26,15,10,0.1)",
        borderRadius: 16,
        padding: "14px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 240,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(217,119,87,0.08)",
      }}
    >
      {/* Close */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        style={{
          position: "absolute", top: 8, right: 8,
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(26,15,10,0.3)", fontSize: 16, lineHeight: 1,
          padding: 2,
        }}
      >
        ×
      </button>

      {/* LIVE pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{
          display: "inline-block", width: 7, height: 7,
          borderRadius: "50%", background: "#22c55e",
          boxShadow: "0 0 8px #22c55e",
          animation: "live-pulse 2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: "2px", textTransform: "uppercase",
          color: "rgba(26,15,10,0.45)",
        }}>
          LIVE · Today&apos;s recovered revenue
        </span>
      </div>

      {/* Total */}
      <div
        style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: 24, letterSpacing: "-0.03em",
          color: bump ? "#d97757" : "#1a0f0a",
          transition: "color 400ms ease",
          lineHeight: 1,
        }}
      >
        {fmt(total)}
      </div>

      {/* Last minute */}
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "rgba(26,15,10,0.4)",
        letterSpacing: "0.02em",
      }}>
        +{fmt(lastMin)} last minute
      </div>

      <style>{`
        @keyframes live-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.6; transform:scale(1.3); }
        }
        @media (max-width: 480px) {
          /* Keep it visible but smaller on mobile */
          div[style*="position: fixed"] {
            bottom: 12px !important;
            right: 12px !important;
            min-width: 200px !important;
          }
        }
      `}</style>
    </div>
  );
}
