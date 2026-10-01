import { Fragment } from "react";

// ── Industry categories ────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    label: "iGaming & Betting",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2.5" y="2.5" width="17" height="17" rx="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor"/>
        <circle cx="14.5" cy="7.5" r="1.3" fill="currentColor"/>
        <circle cx="7.5" cy="14.5" r="1.3" fill="currentColor"/>
        <circle cx="14.5" cy="14.5" r="1.3" fill="currentColor"/>
        <circle cx="11" cy="11" r="1.3" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "eCommerce & Retail",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 8h14l-1.8 9.5H5.8L4 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8.5 8V6.5a2.5 2.5 0 015 0V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Dating & Social Apps",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 18.5S3 13 3 7.5a4.5 4.5 0 019 0 4.5 4.5 0 019 0c0 5.5-8 11-8 11z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Food & Delivery",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M6 2v5.5c0 1.8 1.8 3 3.5 3V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 2l2.5 3.5M7.5 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 2c2.5 0 4.5 2.5 4.5 5v.5h-4.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Travel & Hospitality",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M2 15l4-4 3 3 7-7 3 3-9.5 9.5L2 15z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M15 3l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 19.5h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Hotels & Bookings",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 19V9l8-6 8 6v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="8" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Mobile Gaming",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="6.5" width="18" height="9" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7.5 11h3M9 9.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="13.5" cy="11" r="1.1" fill="currentColor"/>
        <circle cx="15.8" cy="11" r="1.1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Streaming & Subscriptions",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 8.2l6 2.8-6 2.8V8.2z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Crypto & Trading",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 6.5v9M9 9h2.8a1.8 1.8 0 010 3.6H9m0 0h3.2a1.8 1.8 0 010 3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Marketplaces",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 9.5l8-6.5 8 6.5V19H3V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 9.5h16" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="8.5" y="13" width="5" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "SaaS & Digital Services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M17.5 14a5 5 0 00-4.5-8 5 5 0 00-9 3A4 4 0 105 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 17l-1.5 1.5L9 20M13 17l1.5 1.5L13 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Health & Wellness",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M2 11h3.5l2-5 3 10 2.5-6.5 2 3H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const DOUBLED = [...INDUSTRIES, ...INDUSTRIES];

// ── IndustriesMarquee ──────────────────────────────────────────────────────────
export default function TrustedByMarquee() {
  return (
    <section
      style={{
        background: "var(--bg)",
        paddingTop: "80px",
        paddingBottom: "100px",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "3px",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "40px",
          padding: "0 20px",
        }}
      >
        Built for operators across industries
      </p>

      {/* Marquee */}
      <div className="marquee-container" style={{ position: "relative" }}>
        {/* Left fade */}
        <div
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: "100px",
            background: "linear-gradient(to right, var(--bg), transparent)",
            zIndex: 2, pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "100px",
            background: "linear-gradient(to left, var(--bg), transparent)",
            zIndex: 2, pointerEvents: "none",
          }}
        />

        <div
          className="marquee-track industries-track"
          style={{ animation: "slide 50s linear infinite" }}
        >
          {DOUBLED.map((industry, i) => (
            <Fragment key={i}>
              {/* Industry item */}
              <div className="industry-item">
                <div style={{ width: 22, height: 22, flexShrink: 0 }}>
                  {industry.icon}
                </div>
                <span className="industry-label">{industry.label}</span>
              </div>

              {/* Separator dot */}
              <div
                aria-hidden="true"
                style={{
                  padding: "0 36px",
                  display: "flex",
                  alignItems: "center",
                  color: "#d97757",
                  opacity: 0.45,
                  fontSize: "20px",
                  lineHeight: 1,
                  flexShrink: 0,
                  userSelect: "none",
                }}
              >
                ·
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .industry-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.65);
          flex-shrink: 0;
          transition: color 0.3s ease;
          cursor: default;
        }
        .industry-label {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 15px;
          white-space: nowrap;
          color: rgba(255, 255, 255, 0.72);
          transition: color 0.3s ease;
        }
        @media (hover: hover) {
          .industry-item:hover {
            color: rgba(255, 255, 255, 0.95);
          }
          .industry-item:hover .industry-label {
            color: rgba(255, 255, 255, 0.95);
          }
        }
      `}</style>
    </section>
  );
}
