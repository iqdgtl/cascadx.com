import React from "react"

const logos: { name: string; color: string; icon: React.ReactNode }[] = [
  {
    name: "Alipay",
    color: "#1677FF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="25" height="25" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 20L14 8L19 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 15.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "WeChat Pay",
    color: "#07C160",
    icon: (
      <svg width="32" height="28" viewBox="0 0 32 28" fill="none" aria-hidden="true">
        <path d="M11.5 3C6.253 3 2 6.91 2 11.75C2 14.3 3.24 16.58 5.23 18.13L4 22L8.7 19.72C9.6 19.93 10.54 20.05 11.5 20.05C16.747 20.05 21 16.14 21 11.3C21 6.46 16.747 2.55 11.5 2.55Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M19.5 12C15.358 12 12 14.91 12 18.5C12 20.42 13.01 22.13 14.64 23.28L14 26L17.1 24.34C17.87 24.53 18.67 24.63 19.5 24.63C23.642 24.63 27 21.72 27 18.13C27 14.54 23.642 11.63 19.5 11.63Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "PayPay",
    color: "#FF0033",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="25" height="25" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 22V6H17C20.314 6 23 8.686 23 12C23 15.314 20.314 18 17 18H8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "GrabPay",
    color: "#00B14F",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M22 10C20.245 6.477 16.896 4 13 4C7.477 4 3 8.477 3 14C3 19.523 7.477 24 13 24C18.523 24 23 19.523 23 14V13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "GCash",
    color: "#007DFF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M21 9C19 6 16 4 13 4C7.477 4 3 8.477 3 14C3 19.523 7.477 24 13 24C18 24 22 20.5 22.5 16H15V13H25V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "DANA",
    color: "#118EEA",
    icon: (
      <svg width="26" height="28" viewBox="0 0 26 28" fill="none" aria-hidden="true">
        <path d="M3 4H12C18.627 4 24 9.373 24 16C24 19.314 21.314 22 18 22H3V4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "OVO",
    color: "#4C3494",
    icon: (
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true">
        <ellipse cx="16" cy="12" rx="15" ry="10" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="16" cy="12" rx="9" ry="6" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="16" cy="12" rx="3.5" ry="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TrueMoney",
    color: "#FF6600",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 7H24M14 7V23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="14" cy="17" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "MoMo",
    color: "#A50064",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 19V9L11 15L14 9L17 15L21 9V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "PromptPay",
    color: "#1A3C8F",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M3 9V3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 3H25V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25 19V25H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 25H3V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "PayNow",
    color: "#E70000",
    icon: (
      <svg width="22" height="28" viewBox="0 0 22 28" fill="none" aria-hidden="true">
        <path d="M15 3L6 15H11.5L7 25L20 13H14L19 3H15Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Paytm",
    color: "#00BAF2",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 14L12 18L20 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Kakao Pay",
    color: "#FFCD00",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3C8.477 3 4 6.91 4 11.75C4 14.87 5.84 17.62 8.64 19.3L7.5 24L12.5 21.1C12.99 21.17 13.49 21.2 14 21.2C19.523 21.2 24 17.29 24 12.45C24 7.61 19.523 3 14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 12L14.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 12L14.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Apple Pay",
    color: "#ffffff",
    icon: (
      <svg width="28" height="32" viewBox="0 0 28 32" fill="none" aria-hidden="true">
        <path d="M18.5 4C18.5 4 19.5 1 22 1C22 3.5 20 5 18.5 4Z" fill="currentColor"/>
        <path d="M10 9C11.5 7 13.5 6 15.5 6.5C15.5 9 13.5 10.5 11.5 10.5C9.5 10.5 8 9 10 9Z" fill="currentColor"/>
        <path d="M7 14C8 11.5 10.5 10.5 12 10.5C13.5 10.5 14.5 11 16 11C17.5 11 19 10.5 20.5 10.5C22 10.5 24 11.5 25 14C22 15.5 22 19.5 25 21.5C23.5 24.5 22 27 20 27C18.5 27 17.5 26 16 26C14.5 26 13 27 11.5 27C9.5 27 8 24 6.5 21C5 18 5 14.5 7 14Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Google Pay",
    color: "#4285F4",
    icon: (
      <svg width="36" height="24" viewBox="0 0 36 24" fill="none" aria-hidden="true">
        <path d="M18 11.5V13.5H22.5C22.2 14.8 21.1 16.5 18 16.5C15.2 16.5 13 14.3 13 11.5C13 8.7 15.2 6.5 18 6.5C19.6 6.5 20.7 7.2 21.4 7.9L22.8 6.5C21.7 5.4 20.1 4.5 18 4.5C14.1 4.5 11 7.6 11 11.5C11 15.4 14.1 18.5 18 18.5C22.1 18.5 24.8 15.7 24.8 11.7C24.8 11.3 24.8 11 24.7 10.7L18 10.7V11.5Z" fill="currentColor"/>
        <path d="M5 9.5V12.5H8V14H5V17H3.5V8H9V9.5H5Z" fill="currentColor"/>
        <path d="M29 8L31.5 15H29.8L29.2 13.2H26.8L26.2 15H24.5L27 8H29ZM28 9.8L27.2 12H28.8L28 9.8Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "PayPal",
    color: "#003087",
    icon: (
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none" aria-hidden="true">
        <path d="M18 5C20.5 5 22 6.5 22 9C22 12.5 19.5 14.5 16 14.5H14L13 19H9.5L12 5H18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M15.5 8.5C17.5 8.5 19 10 19 12C19 15 17 17 14 17H12L11 22H7.5L10 8.5H15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Stripe",
    color: "#635BFF",
    icon: (
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none" aria-hidden="true">
        <path d="M11 10C11 8.5 12.2 8 13.5 8C15.5 8 17.5 8.8 19 10L20.5 6.5C18.5 5 16 4 13.5 4C9 4 6.5 6.5 6.5 10C6.5 16.5 15.5 15 15.5 18C15.5 19.5 14.2 20 12.5 20C10 20 7.5 19 6 17.5L4.5 21C6.5 22.5 9.5 24 12.5 24C17.5 24 20 21.5 20 18C20 11.5 11 13 11 10Z" fill="currentColor"/>
      </svg>
    ),
  },
]

const doubled = [...logos, ...logos]

export default function TrustedByMarquee() {
  return (
    <section
      style={{
        background: "var(--bg)",
        paddingTop: "80px",
        paddingBottom: "80px",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "3px",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "40px",
        }}
      >
        Integration partners across global payments
      </p>

      {/* Scrolling strip */}
      <div className="marquee-container" style={{ position: "relative" }}>
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to right, var(--bg), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to left, var(--bg), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div className="marquee-track">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="logo-item"
              style={{ "--brand": logo.color } as React.CSSProperties}
            >
              {logo.icon}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  whiteSpace: "nowrap",
                }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footnote */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "rgba(255,255,255,0.35)",
          marginTop: "24px",
          letterSpacing: "0.5px",
        }}
      >
        Integration partners for orchestration and routing
      </p>
    </section>
  )
}
