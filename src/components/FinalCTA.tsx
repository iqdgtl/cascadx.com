"use client";
import { useEffect, useRef, useState } from "react";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    window.location.href =
      `mailto:hello@cascadx.com?subject=CascadX%20inquiry&body=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20CascadX.%0A%0AEmail%3A%20${encodeURIComponent(trimmed)}`;
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(28px)",
    transition: visible
      ? `opacity 550ms ease ${delay}ms, transform 550ms ease ${delay}ms`
      : "none",
  });

  return (
    <section ref={ref} className="fcta-section">
      <div aria-hidden="true" className="fcta-glow" />

      <div className="fcta-inner">
        <h2 className="fcta-headline" style={anim(0)}>
          Stop losing revenue to{" "}
          <span style={{ color: "#d97757", fontStyle: "italic", fontWeight: 400 }}>failed payments.</span>
        </h2>

        <p className="fcta-sub" style={anim(100)}>
          Join 100+ merchants recovering declined transactions every day.
        </p>

        <div className="fcta-form" style={anim(200)}>
          <input
            type="email"
            className="fcta-input"
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="fcta-btn" onClick={handleSubmit} aria-label="Get in touch">
            <span>Get in touch</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>

      <style>{`
        .fcta-section {
          background: #0d0f0e;
          padding: 100px 24px 110px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .fcta-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 55% 65% at 50% 50%, rgba(217,119,87,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .fcta-inner {
          position: relative;
          z-index: 1;
          max-width: 620px;
          margin: 0 auto;
        }
        .fcta-headline {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(26px, 3.5vw, 40px);
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #fafaf7;
          margin: 0 0 20px;
        }
        .fcta-sub {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.55;
          color: rgba(255,255,255,0.6);
          margin: 0 0 40px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }
        .fcta-form {
          display: flex;
          gap: 10px;
          max-width: 540px;
          margin: 0 auto;
        }
        .fcta-input {
          flex: 1;
          min-width: 0;
          height: 56px;
          padding: 0 24px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          color: #fafaf7;
          font-family: var(--font-display);
          font-size: 15px;
          outline: none;
          transition: border-color 220ms ease, background 220ms ease, box-shadow 220ms ease;
          -webkit-appearance: none;
        }
        .fcta-input::placeholder { color: rgba(255,255,255,0.35); }
        .fcta-input:focus {
          border-color: rgba(217,119,87,0.6);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 4px rgba(217,119,87,0.1);
        }
        .fcta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 56px;
          padding: 0 28px;
          background: #d97757;
          color: #fff;
          border: none;
          border-radius: 100px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          white-space: nowrap;
          letter-spacing: -0.01em;
          transition: background 180ms ease, transform 180ms ease, box-shadow 180ms ease;
          flex-shrink: 0;
          box-shadow: 0 8px 20px rgba(217,119,87,0.25);
        }
        .fcta-btn:hover {
          background: #c86847;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(217,119,87,0.35);
        }
        .fcta-btn:active { transform: scale(0.97); }

        .fcta-micro {
          margin: 20px 0 0;
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          letter-spacing: -0.005em;
        }

        /* ── MOBILE: BIGGER input, standard button ── */
        @media (max-width: 640px) {
          .fcta-section { padding: 70px 20px 90px; }
          .fcta-headline { font-size: 32px; line-height: 1.15; margin-bottom: 16px; }
          .fcta-sub { font-size: 15px; margin-bottom: 32px; padding: 0 4px; }
          .fcta-form {
            flex-direction: column;
            gap: 12px;
            max-width: 100%;
            padding: 0;
          }
          /* INPUT — much bigger, white bg, pops on dark */
          .fcta-input {
            width: 100%;
            height: 76px;
            padding: 0 28px;
            font-size: 18px;
            font-weight: 500;
            background: #ffffff;
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 20px;
            color: #1a0f0a;
            box-shadow: 0 12px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8);
          }
          .fcta-input::placeholder {
            color: rgba(26,15,10,0.4);
            font-weight: 400;
            font-size: 17px;
          }
          .fcta-input:focus {
            border-color: #d97757;
            box-shadow: 0 0 0 4px rgba(217,119,87,0.2), 0 12px 32px rgba(0,0,0,0.3);
          }
          /* BUTTON — standard size, smaller than input visually */
          .fcta-btn {
            width: 100%;
            height: 60px;
            font-size: 16px;
            font-weight: 600;
            padding: 0;
            gap: 8px;
            border-radius: 20px;
            box-shadow: 0 8px 20px rgba(217,119,87,0.3);
          }
          .fcta-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 12px 28px rgba(217,119,87,0.4);
          }
          .fcta-micro { font-size: 13px; margin-top: 22px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fcta-btn { transition: none; }
        }
      `}</style>
    </section>
  );
}
