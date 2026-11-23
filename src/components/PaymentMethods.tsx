"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Payment = { name: string; bg: string; logo: ReactNode; darkText?: boolean };

const PAYMENTS: Payment[] = [
  {
    name: "Visa",
    bg: "linear-gradient(135deg,#1a1f71,#2d35a0)",
    logo: (
      <svg viewBox="0 0 120 48" width="90" height="36" aria-hidden="true">
        <text x="60" y="38" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="42" fontStyle="italic" fill="white" letterSpacing="-1">VISA</text>
      </svg>
    ),
  },
  {
    name: "Mastercard",
    bg: "linear-gradient(135deg,#111,#2a2a2a)",
    logo: (
      <svg viewBox="0 0 80 50" width="80" height="50" aria-hidden="true">
        <circle cx="29" cy="25" r="20" fill="#EB001B"/>
        <circle cx="51" cy="25" r="20" fill="#F79E1B"/>
        <path d="M40,8.5 Q52,25 40,41.5 Q28,25 40,8.5z" fill="#FF5F00"/>
      </svg>
    ),
  },
  {
    name: "Amex",
    bg: "linear-gradient(135deg,#007bc1,#00a8e8)",
    logo: (
      <svg viewBox="0 0 110 40" width="80" height="30" aria-hidden="true">
        <text x="55" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="26" fill="white" letterSpacing="3">AMEX</text>
      </svg>
    ),
  },
  {
    name: "Apple Pay",
    bg: "linear-gradient(135deg,#1c1c1e,#3a3a3c)",
    logo: (
      <svg viewBox="0 0 170 60" width="100" height="36" aria-hidden="true">
        {/* Real Apple logo */}
        <g transform="translate(14,12) scale(1.6)">
          <path d="M19.665 13.507c-.029-3.17 2.587-4.699 2.706-4.774-1.473-2.154-3.767-2.448-4.584-2.483-1.95-.197-3.805 1.146-4.796 1.146-.991 0-2.517-1.116-4.14-1.085-2.129.031-4.094 1.237-5.188 3.144-2.213 3.835-.565 9.516 1.595 12.63 1.055 1.521 2.308 3.232 3.953 3.169 1.585-.063 2.185-1.027 4.102-1.027s2.455 1.027 4.133 .996c1.708-.031 2.79-1.552 3.842-3.084.218-.317 .412-.634 .589-.956-1.302-.5-2.212-1.686-2.212-3.676zm-3.252-8.944c.878-1.065 1.471-2.549 1.309-4.019-1.264.052-2.797.843-3.706 1.908-.814.944-1.527 2.46-1.335 3.909 1.411.108 2.853-.717 3.732-1.798z" fill="#fff"/>
        </g>
        {/* Pay text */}
        <text x="56" y="43" fontFamily="SF Pro Display,-apple-system,BlinkMacSystemFont,Helvetica Neue,Arial,sans-serif" fontWeight="500" fontSize="32" fill="#fff" letterSpacing="-1">Pay</text>
      </svg>
    ),
  },
  {
    name: "Google Pay",
    bg: "linear-gradient(135deg,#f8f9fa,#e9ecef)",
    darkText: true,
    logo: (
      <svg viewBox="0 0 170 60" width="100" height="36" aria-hidden="true">
        {/* Google G - multi-color */}
        <g transform="translate(10,10) scale(1.8)">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </g>
        {/* Pay text */}
        <text x="66" y="42" fontFamily="Product Sans,Google Sans,Arial,sans-serif" fontWeight="500" fontSize="28" fill="#5f6368" letterSpacing="-1">Pay</text>
      </svg>
    ),
  },
  {
    name: "PayPal",
    bg: "linear-gradient(135deg,#003087,#009cde)",
    logo: (
      <svg viewBox="0 0 180 60" width="105" height="35" aria-hidden="true">
        {/* Back P (lighter blue) */}
        <path d="M18 4 h22 c10 0 16 6 15 15 c-1 10 -9 15 -19 15 h-8 l-3 18 h-10 z M28 12 l-2 14 h6 c5 0 8 -3 9 -8 c0 -4 -2 -6 -7 -6 z" fill="#009cde"/>
        {/* Front P (white) */}
        <path d="M34 20 h22 c10 0 16 6 15 15 c-1 10 -9 15 -19 15 h-8 l-3 18 h-10 z M44 28 l-2 14 h6 c5 0 8 -3 9 -8 c0 -4 -2 -6 -7 -6 z" fill="#1a0f0a"/>
        {/* Text "PayPal" */}
        <text x="80" y="36" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="24" fill="#1a0f0a" letterSpacing="-0.5">Pay</text>
        <text x="125" y="36" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="24" fill="#009cde" letterSpacing="-0.5">Pal</text>
      </svg>
    ),
  },
  {
    name: "Alipay",
    bg: "linear-gradient(135deg,#1677ff,#0057e7)",
    logo: (
      <svg viewBox="0 0 170 60" width="110" height="38" aria-hidden="true">
        {/* 支 Chinese character — Alipay's signature symbol */}
        <g transform="translate(6, 10)">
          <rect x="4" y="6" width="36" height="36" rx="8" fill="white"/>
          <text x="22" y="34" textAnchor="middle" fontFamily="SimHei, Arial Unicode MS, sans-serif" fontWeight="800" fontSize="24" fill="#1677ff">支</text>
        </g>
        {/* Alipay text */}
        <text x="58" y="40" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="24" fill="white" letterSpacing="-0.5">Alipay</text>
      </svg>
    ),
  },
  {
    name: "WeChat Pay",
    bg: "linear-gradient(135deg,#07c160,#06a150)",
    logo: (
      <svg viewBox="0 0 80 80" width="60" height="60" aria-hidden="true">
        {/* Real WeChat SimpleIcons logo */}
        <path d="M28 20c-11.3 0-20.5 7.5-20.5 16.8 0 5.3 3 10 7.6 13.1l-1.9 5.8 6.7-3.4c2.4.6 4.9 1 7.4.9h.3c-.1-.7-.2-1.5-.2-2.3 0-9.3 9.2-16.8 20.5-16.8l1.9.1C49.1 26 39.4 20 28 20zm-7.1 9c1.4 0 2.6 1.1 2.6 2.6s-1.2 2.6-2.6 2.6-2.6-1.1-2.6-2.6 1.2-2.6 2.6-2.6zm15.8 0c1.4 0 2.6 1.1 2.6 2.6s-1.2 2.6-2.6 2.6-2.6-1.1-2.6-2.6 1.2-2.6 2.6-2.6zm12.8 12c-9.4 0-17.1 6.3-17.1 14 0 7.8 7.6 14 17.1 14 2.1 0 4.1-.3 5.9-.8l5.5 2.9-1.5-4.8c3.9-2.6 6.3-6.5 6.3-10.9.1-7.8-7.5-14.2-17.2-14.4zM42.5 46c-1.2 0-2.2-.9-2.2-2.1s1-2.1 2.2-2.1 2.2.9 2.2 2.1-1 2.1-2.2 2.1zm10.9 0c-1.2 0-2.2-.9-2.2-2.1s1-2.1 2.2-2.1 2.2.9 2.2 2.1-1 2.1-2.2 2.1z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "PromptPay",
    bg: "linear-gradient(135deg,#1e3a8a,#1e40af)",
    logo: (
      <svg viewBox="0 0 170 60" width="118" height="40" aria-hidden="true">
        {/* Thai Baht ฿ in blue circle — the real PromptPay symbol */}
        <g transform="translate(6, 10)">
          <circle cx="20" cy="20" r="18" fill="white"/>
          <text x="20" y="28" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="22" fill="#1e3a8a">฿</text>
        </g>
        <text x="48" y="28" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="15" fill="white" letterSpacing="-0.3">Prompt</text>
        <text x="48" y="46" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="15" fill="#60a5fa" letterSpacing="-0.3">Pay</text>
      </svg>
    ),
  },
  {
    name: "PIX",
    bg: "linear-gradient(135deg,#32bcad,#0ea59c)",
    logo: (
      <svg viewBox="0 0 80 80" width="58" height="58" aria-hidden="true">
        <path d="M40,8 L62,30 L52,40 L62,50 L40,72 L18,50 L28,40 L18,30z" fill="white" opacity="0.9"/>
        <path d="M40,20 L54,34 L40,48 L26,34z" fill="#32bcad"/>
      </svg>
    ),
  },
  {
    name: "TrueMoney",
    bg: "linear-gradient(135deg,#f99d1c,#e5881b)",
    logo: (
      <svg viewBox="0 0 170 60" width="110" height="38" aria-hidden="true">
        <g transform="translate(6, 10)">
          <circle cx="20" cy="20" r="18" fill="white"/>
          <text x="20" y="27" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="18" fill="#f99d1c">T</text>
        </g>
        <text x="48" y="28" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="16" fill="white" letterSpacing="-0.3">True</text>
        <text x="48" y="46" fontFamily="Arial,sans-serif" fontWeight="500" fontSize="14" fill="white" opacity="0.9" letterSpacing="-0.3">Money</text>
      </svg>
    ),
  },
  {
    name: "iDEAL",
    bg: "linear-gradient(135deg,#1a0f0a,#f8f8f8)",
    darkText: true,
    logo: (
      <svg viewBox="0 0 220 80" width="130" height="50" aria-hidden="true">
        {/* Real iDEAL logo: pink rounded rect "i" + "DEAL" black */}
        {/* The "i" is a vertical pink rounded rectangle with a dot */}
        <rect x="8" y="12" width="40" height="60" rx="8" fill="#cc0066"/>
        {/* White "i" inside the pink box */}
        <circle cx="28" cy="26" r="4" fill="white"/>
        <rect x="24" y="34" width="8" height="30" rx="2" fill="white"/>
        {/* DEAL text in black */}
        <text x="60" y="58" fontFamily="Arial Black, Helvetica, sans-serif" fontWeight="900" fontSize="44" fill="#17120f" letterSpacing="-2.5">DEAL</text>
      </svg>
    ),
  },
  {
    name: "Sofort",
    bg: "linear-gradient(135deg,#ffb3cc,#ffa8cd)",
    darkText: true,
    logo: (
      <svg viewBox="0 0 220 60" width="140" height="40" aria-hidden="true">
        {/* Red peace sign ✌️ — Klarna Sofort's signature icon */}
        <g transform="translate(8, 8)">
          <circle cx="22" cy="22" r="22" fill="#eb4066"/>
          {/* Peace sign — two fingers */}
          <g fill="white" transform="translate(22, 22)">
            <rect x="-9" y="-13" width="6" height="18" rx="2" transform="rotate(-18)"/>
            <rect x="3" y="-13" width="6" height="18" rx="2" transform="rotate(18)"/>
            {/* Fist bottom */}
            <path d="M -9 4 Q -9 13 0 13 Q 9 13 9 4 L 9 2 L -9 2 Z"/>
          </g>
        </g>
        {/* Sofort. wordmark */}
        <text x="60" y="40" fontFamily="Arial Black, Helvetica, sans-serif" fontWeight="900" fontSize="30" fill="#17120f" letterSpacing="-1.2">Sofort.</text>
      </svg>
    ),
  },
  {
    name: "UPI",
    bg: "linear-gradient(135deg,#097939,#0a9345)",
    logo: (
      <svg viewBox="0 0 170 60" width="100" height="42" aria-hidden="true">
        {/* Indian flag colors accent */}
        <rect x="8" y="12" width="36" height="12" fill="#ff9933" rx="2"/>
        <rect x="8" y="24" width="36" height="12" fill="#1a0f0a" rx="0"/>
        <rect x="8" y="36" width="36" height="12" fill="#138808" rx="2"/>
        {/* Ashoka chakra dot */}
        <circle cx="26" cy="30" r="3" fill="#000080"/>
        <text x="58" y="42" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="32" fill="white" letterSpacing="-0.5">UPI</text>
      </svg>
    ),
  },
  {
    name: "PayID",
    bg: "linear-gradient(135deg,#00b2a3,#008a7f)",
    logo: (
      <svg viewBox="0 0 170 60" width="110" height="38" aria-hidden="true">
        {/* PayID — Australian payment system */}
        <g transform="translate(4, 10)">
          <rect x="0" y="0" width="38" height="38" rx="19" fill="white"/>
          <text x="19" y="27" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="20" fill="#00b2a3">P</text>
        </g>
        <text x="48" y="28" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="white" letterSpacing="-0.3">Pay</text>
        <text x="48" y="46" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="white" opacity="0.9" letterSpacing="-0.3">ID</text>
      </svg>
    ),
  },
  {
    name: "BLIK",
    bg: "linear-gradient(135deg,#1a1a1a,#2d2d2d)",
    logo: (
      <svg viewBox="0 0 180 60" width="130" height="44" aria-hidden="true">
        {/* Real BLIK — lowercase "blik" in white */}
        <text x="90" y="44" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontWeight="800" fontSize="42" fill="white" letterSpacing="-2">blik</text>
      </svg>
    ),
  },
  {
    name: "Bitcoin",
    bg: "linear-gradient(135deg,#f7931a,#e8820f)",
    logo: (
      <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
        {/* Real Bitcoin logo — SimpleIcons */}
        <circle cx="32" cy="32" r="30" fill="white"/>
        <path d="M43.5 28.5c.5-3.3-2-5.1-5.5-6.3l1.1-4.5-2.7-.7-1.1 4.4c-.7-.2-1.5-.4-2.2-.5l1.1-4.4-2.7-.7-1.1 4.5-1.7-.4-3.8-1-.7 2.9s2 .5 2 .5c1.1.3 1.3 1 1.3 1.6l-1.3 5.2c.1 0 .2 0 .3.1 0 0-.2-.1-.3-.1l-1.8 7.3c-.1.3-.5.9-1.3.7 0 .1-2-.5-2-.5l-1.4 3.1 3.6.9 2 .5-1.1 4.6 2.7.7 1.1-4.5c.7.2 1.5.4 2.2.6l-1.1 4.5 2.7.7 1.1-4.6c4.7.9 8.2.5 9.7-3.7 1.2-3.4-.1-5.4-2.5-6.7 1.7-.4 3-1.6 3.4-4zm-6.2 8.8c-.9 3.4-6.7 1.6-8.5 1.1l1.5-5.9c1.9.5 7.9 1.4 7 4.8zm.9-8.8c-.8 3.1-5.6 1.5-7.2 1.1l1.3-5.4c1.6.4 6.7 1.1 5.9 4.3z" fill="#f7931a"/>
      </svg>
    ),
  },
  {
    name: "Ethereum",
    bg: "linear-gradient(135deg,#627eea,#3c56b5)",
    logo: (
      <svg viewBox="0 0 320 500" width="42" height="60" aria-hidden="true">
        <polygon points="160,0 160,185 320,255" fill="white" opacity="0.65"/>
        <polygon points="160,0 0,255 160,185" fill="white"/>
        <polygon points="160,340 160,500 320,275" fill="white" opacity="0.65"/>
        <polygon points="160,500 160,340 0,275" fill="white"/>
        <polygon points="160,310 320,255 160,185" fill="white" opacity="0.45"/>
        <polygon points="0,255 160,310 160,185" fill="white" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Klarna",
    bg: "linear-gradient(135deg,#ffb3cc,#ffa8cd)",
    darkText: true,
    logo: (
      <svg viewBox="0 0 200 60" width="130" height="38" aria-hidden="true">
        <text x="100" y="42" textAnchor="middle" fontFamily="Arial Black, Helvetica, sans-serif" fontWeight="900" fontSize="34" fill="#17120f" letterSpacing="-1.5">Klarna.</text>
      </svg>
    ),
  },
  {
    name: "Bancontact",
    bg: "linear-gradient(135deg,#1a0f0a,#f5f5f5)",
    darkText: true,
    logo: (
      <svg viewBox="0 0 180 90" width="115" height="55" aria-hidden="true">
        {/* Bancontact ribbon logo: yellow + blue strips */}
        <g transform="translate(20, 12)">
          <path d="M0 10 L60 0 L140 15 L80 25 Z" fill="#ffd200"/>
          <path d="M0 25 L80 20 L140 35 L60 45 Z" fill="#005498"/>
        </g>
        <text x="90" y="80" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="16" fill="#005498" letterSpacing="-0.2">Bancontact</text>
      </svg>
    ),
  },
  {
    name: "giropay",
    bg: "linear-gradient(135deg,#1a0f0a,#f5f5f5)",
    darkText: true,
    logo: (
      <svg viewBox="0 0 180 60" width="120" height="44" aria-hidden="true">
        <text x="90" y="42" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="32" letterSpacing="-1">
          <tspan fill="#c8152b">giro</tspan>
          <tspan fill="#0a3673">pay</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: "Przelewy24",
    bg: "linear-gradient(135deg,#1a0f0a,#f5f5f5)",
    darkText: true,
    logo: (
      <svg viewBox="0 0 200 60" width="130" height="40" aria-hidden="true">
        <text x="50" y="42" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" fill="#d13239" letterSpacing="-0.5">Przelewy</text>
        <text x="152" y="42" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" fill="#2e4bba" letterSpacing="-0.5">24</text>
      </svg>
    ),
  },
  {
    name: "Affirm",
    bg: "linear-gradient(135deg,#0fa0ea,#0a7fc5)",
    logo: (
      <svg viewBox="0 0 180 60" width="120" height="42" aria-hidden="true">
        <text x="90" y="42" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="32" fill="white" letterSpacing="-0.8">affirm</text>
      </svg>
    ),
  },
  {
    name: "Afterpay",
    bg: "linear-gradient(135deg,#b2fce4,#88e8c5)",
    darkText: true,
    logo: (
      <svg viewBox="0 0 220 60" width="140" height="40" aria-hidden="true">
        <text x="110" y="42" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="28" fill="#17120f" letterSpacing="-0.8">afterpay</text>
        {/* Checkmark */}
        <path d="M195 25 L202 32 L215 18" stroke="#17120f" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function PaymentMethods() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="pm-section">
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: 56,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity 500ms ease, transform 500ms ease",
        }}>
          <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(26px, 3.5vw, 40px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#fafaf7",
          margin: 0,
        }}>
            Every payment method.{" "}
            <span style={{ color: "#ff6a3d", fontStyle: "italic", fontWeight: 400 }}>One orchestration.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="pm-grid">
          {PAYMENTS.map((p, i) => (
            <div
              key={p.name}
              className="pm-tile"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: p.bg,
                borderRadius: 24,
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? (hovered === i ? "translateY(-8px) scale(1.08) rotateZ(-1deg)" : "translateY(0) scale(1) rotateZ(0deg)")
                  : "translateY(32px) scale(0.85) rotateZ(-3deg)",
                boxShadow: hovered === i
                  ? "0 24px 48px rgba(0,0,0,0.55), 0 0 40px rgba(255, 106, 61,0.4)"
                  : "0 6px 28px rgba(0,0,0,0.4)",
                transition: visible
                  ? `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 90}ms, transform 650ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 90}ms, box-shadow 320ms ease`
                  : "none",
              }}
            >
              {/* Shine */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg,rgba(26,15,10,0.18) 0%,transparent 55%)",
                pointerEvents: "none",
              }} />
              {/* Logo */}
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.logo}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pm-section {
          background: #0d0f0e;
          padding: 100px 0;
          overflow: hidden;
        }
        .pm-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .pm-grid { grid-template-columns: repeat(6,1fr); gap: 12px; }
        }
        @media (max-width: 768px) {
          .pm-grid { grid-template-columns: repeat(3,1fr); gap: 10px; }
        }
        @media (max-width: 640px) {
          .pm-section {
          background: #0d0f0e;
          padding: 100px 0;
          overflow: hidden;
        }
          .pm-grid { grid-template-columns: repeat(3,1fr); gap: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pm-tile { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
