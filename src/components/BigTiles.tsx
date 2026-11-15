"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [v, setV] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setV(Math.round((1 - Math.pow(1 - t, 3)) * end));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [end, duration, trigger]);
  return v;
}

// Mini brand logos: [x%, y%, rot°, fill, fontSize, text, fontWeight, fontStyle, animIdx]
const LOGOS: [number, number, number, string, number, string, number, string, number][] = [
  [7,   10, -10, "#1a1f71", 22, "VISA",         900, "italic",  0],
  [52,  8,   -5, "#635bff", 18, "stripe",        700, "normal",  1],
  [75,  12,   8, "#009cde", 18, "PayPal",        800, "normal",  2],
  [91,  22,  -8, "#006FCF", 15, "AMEX",          700, "normal",  3],
  [5,   38,  15, "#333",    13, "Apple Pay",     600, "normal",  0],
  [66,  32, -12, "#00B14F", 14, "GrabPay",       700, "normal",  1],
  [22,  55,  -8, "#1677FF", 16, "Alipay",        700, "normal",  2],
  [82,  52,   5, "#07C160", 13, "WeChat Pay",    700, "normal",  3],
  [42,  65,  12, "#F9B3C7", 18, "Klarna",        800, "normal",  0],
  [10,  73,  -5, "#32BCAD", 20, "PIX",           800, "normal",  1],
  [62,  73, -15, "#003399", 15, "SEPA",          700, "normal",  2],
  [85,  73,   8, "#097939", 16, "UPI",           800, "normal",  3],
  [30,  82,  10, "#0abf53", 15, "adyen",         700, "normal",  0],
  [72,  85,  -8, "#E30613", 15, "BLIK",          800, "normal",  1],
  [5,   88,  12, "#002970", 13, "Paytm",         700, "normal",  2],
  [48,  90,   5, "#C00",    15, "iDEAL",         700, "normal",  3],
  [88,  88, -10, "#00B2FF", 12, "Braintree",     600, "normal",  0],
  [55,  47,   8, "#FF5F00", 13, "Worldpay",      600, "normal",  1],
  [22,  25,   5, "#FF5720", 14, "Discover",      700, "normal",  2],
  [38,  38,  -8, "#44C2E6", 12, "Checkout.com",  600, "normal",  3],
];

// Dollar signs for tile 3 background
const DOLLARS: [number, number, number, number][] = [
  [8,  18, -15, 52], [25, 10,   5, 40], [65, 15,  10, 58],
  [80, 28,  -8, 44], [15, 55,  12, 48], [75, 60, -10, 50],
  [42, 80,  15, 38], [90, 72,  -5, 44], [5,  75,   8, 36],
  [55, 92, -12, 42],
];

export default function BigTiles() {
  const ref = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [visible, setVisible]     = useState(false);
  const [extraTens, setExtraTens] = useState(0); // each unit = $10,000

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // After $2.4M count-up finishes, ticker adds $10k every 3s
  useEffect(() => {
    if (!triggered) return;
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => setExtraTens(e => e + 1), 3000);
    }, 3200);
    return () => { clearTimeout(timeoutId); clearInterval(intervalId); };
  }, [triggered]);

  const providers  = useCountUp(1000, 1800, triggered);
  const approval   = useCountUp(18,   1400, triggered);
  const recoveryK  = useCountUp(2400, 2500, triggered); // represents $1,000 units

  const totalK = recoveryK + extraTens * 10;
  const recoveryStr = totalK >= 1000
    ? `$${(totalK / 1000).toFixed(1)}M+`
    : `$${totalK.toLocaleString()}K+`;

  return (
    <section ref={ref} style={{ background: "#0d0f0e", padding: "80px 20px" }}>
      <div className="bt-grid">

        {/* ── Tile 1: 1,000+ Providers ── */}
        <div
          className="bt-tile"
          style={{
            background: [
              "radial-gradient(ellipse 80% 70% at 20% 10%, rgba(96,165,250,0.22) 0%, transparent 60%)",
              "radial-gradient(ellipse 60% 60% at 90% 90%, rgba(99,102,241,0.18) 0%, transparent 60%)",
              "linear-gradient(145deg, #0d1835 0%, #111633 60%, #0a0e24 100%)",
            ].join(","),
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(32px)",
            transition: "opacity 600ms ease, transform 600ms ease",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 80px rgba(96,165,250,0.08), inset 0 1px 0 rgba(26,15,10,0.05)",
          }}
        >
          {/* Branded mini-logos in background */}
          <svg
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            {/* Mastercard — recognizable overlapping circles */}
            <circle cx="29%" cy="22%" r="13" fill="#EB001B" opacity="0.13"
              style={{ animation: "bt-float-2 16s ease-in-out 1s infinite" }} />
            <circle cx="32.5%" cy="22%" r="13" fill="#F79E1B" opacity="0.13"
              style={{ animation: "bt-float-2 16s ease-in-out 1s infinite" }} />

            {/* Google Pay G */}
            <circle cx="60%" cy="45%" r="16" fill="white" opacity="0.06"
              style={{ animation: "bt-float-3 18s ease-in-out 3s infinite" }} />
            <text x="60%" y="49%" textAnchor="middle" dominantBaseline="middle"
              fontFamily="Arial" fontWeight="800" fontSize="14" fill="#4285F4" opacity="0.13"
              style={{ animation: "bt-float-3 18s ease-in-out 3s infinite" }}>G</text>

            {/* Provider name logos with brand colors */}
            {LOGOS.map(([x, y, rot, fill, fontSize, text, fontWeight, fontStyle, animIdx], i) => (
              <text
                key={i}
                x={`${x}%`}
                y={`${y}%`}
                transform={`rotate(${rot} ${x * 10} ${y * 3.2})`}
                fontFamily="Arial,sans-serif"
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontStyle={fontStyle as "normal" | "italic"}
                fill={fill}
                opacity="0.13"
                style={{
                  animation: `bt-float-${(animIdx as number) + 1} ${14 + (i % 5) * 2}s ease-in-out ${(i * 0.4) % 8}s infinite`,
                }}
              >
                {text}
              </text>
            ))}
          </svg>

          {/* Vignette — keeps center readable */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 65% 65% at 50% 65%, transparent 0%, rgba(10,15,30,0.25) 70%, rgba(5,8,25,0.4) 100%)",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="bt-number">{providers.toLocaleString()}+</div>
            <div className="bt-label">Payment Providers</div>
          </div>
        </div>

        {/* ── Tile 2: +18% Approval ── */}
        <div
          className="bt-tile"
          style={{
            background: [
              "radial-gradient(ellipse 80% 70% at 85% 15%, rgba(217,119,87,0.25) 0%, transparent 60%)",
              "radial-gradient(ellipse 60% 60% at 15% 90%, rgba(234,179,8,0.14) 0%, transparent 60%)",
              "linear-gradient(145deg, #2a1810 0%, #3d1f14 60%, #1a0f0a 100%)",
            ].join(","),
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(32px)",
            transition: "opacity 600ms ease 150ms, transform 600ms ease 150ms",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 80px rgba(217,119,87,0.1), inset 0 1px 0 rgba(26,15,10,0.05)",
          }}
        >
          {/* Sparkline chart */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 280"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.14, pointerEvents: "none" }}
          >
            <path d="M0,260 C60,240 90,210 140,180 C190,150 220,110 270,80 C310,55 350,30 400,10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M0,280 C60,255 90,228 140,196 C190,165 220,128 270,96 C310,70 350,46 400,28" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
            {([0, 70, 140, 210, 270, 340, 400] as number[]).map((x, i) => {
              const y = 260 - i * 37;
              return <circle key={x} cx={x} cy={Math.max(y, 10)} r="6" fill="white" opacity="0.8"/>;
            })}
          </svg>
          <svg aria-hidden="true" style={{ position: "absolute", right: 32, bottom: 90, opacity: 0.1, pointerEvents: "none" }} width="130" height="130" viewBox="0 0 100 100">
            <path d="M50,88 L50,18 M28,38 L50,18 L72,38" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="bt-number">+{approval}%</div>
            <div className="bt-label">Approval Rate Uplift</div>
          </div>
        </div>

        {/* ── Tile 3: $2.4M+ Recovered ── */}
        <div
          className="bt-tile"
          style={{
            background: [
              "radial-gradient(ellipse 80% 70% at 20% 20%, rgba(16,185,129,0.22) 0%, transparent 60%)",
              "radial-gradient(ellipse 55% 55% at 85% 85%, rgba(5,150,105,0.14) 0%, transparent 60%)",
              "linear-gradient(145deg, #0a2819 0%, #0f3a26 60%, #071a12 100%)",
            ].join(","),
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(32px)",
            transition: "opacity 600ms ease 300ms, transform 600ms ease 300ms",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 80px rgba(16,185,129,0.1), inset 0 1px 0 rgba(26,15,10,0.05)",
          }}
        >
          {/* Floating dollar signs */}
          <svg
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            {DOLLARS.map(([x, y, rot, fontSize], i) => (
              <text
                key={i}
                x={`${x}%`}
                y={`${y}%`}
                textAnchor="middle"
                fontFamily="Arial,sans-serif"
                fontSize={fontSize}
                fontWeight="900"
                fill="white"
                opacity="0.07"
                transform={`rotate(${rot} ${x * 10} ${y * 3.2})`}
                style={{
                  animation: `bt-float-${(i % 4) + 1} ${12 + (i % 4) * 3}s ease-in-out ${i * 0.6}s infinite`,
                }}
              >
                $
              </text>
            ))}
          </svg>

          {/* Vignette */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 65% 65% at 50% 65%, transparent 0%, rgba(5,15,10,0.25) 70%, rgba(3,12,8,0.4) 100%)",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="bt-number">{recoveryStr}</div>
            <div className="bt-label">Recovered for Our Clients</div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(12px, 1.1vw, 14px)",
              color: "rgba(26,15,10,0.45)",
              marginTop: 4,
            }}>and counting.</div>
          </div>
        </div>

      </div>

      <style>{`
        .bt-grid {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }
        .bt-tile {
          border-radius: 24px;
          padding: 48px;
          position: relative;
          overflow: hidden;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(26,15,10,0.1);
        }
        .bt-number {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(48px, 5.5vw, 90px);
          letter-spacing: -0.04em;
          line-height: 1;
          color: white;
          text-shadow: 0 2px 24px rgba(0,0,0,0.3);
        }
        .bt-label {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(12px, 1.1vw, 16px);
          color: rgba(26,15,10,0.72);
          margin-top: 8px;
        }

        @keyframes bt-float-1 {
          0%,100% { transform: translateY(0px);  }
          50%     { transform: translateY(-6px); }
        }
        @keyframes bt-float-2 {
          0%,100% { transform: translateY(0px);  }
          50%     { transform: translateY(-4px); }
        }
        @keyframes bt-float-3 {
          0%,100% { transform: translateY(0px);  }
          50%     { transform: translateY(-8px); }
        }
        @keyframes bt-float-4 {
          0%,100% { transform: translateY(0px);  }
          50%     { transform: translateY(-5px); }
        }

        /* Tablet: 2 + 1 full-width */
        @media (max-width: 1024px) {
          .bt-grid { grid-template-columns: 1fr 1fr !important; }
          .bt-tile:last-child { grid-column: 1 / -1; }
        }

        /* Mobile: 1 column */
        @media (max-width: 768px) {
          .bt-grid  { grid-template-columns: 1fr !important; gap: 14px !important; }
          .bt-tile  { padding: 32px !important; min-height: 280px !important; }
          .bt-tile:last-child { grid-column: auto; }
          .bt-number { font-size: 72px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bt-tile { transition: none !important; }
          .bt-tile text, .bt-tile circle { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
