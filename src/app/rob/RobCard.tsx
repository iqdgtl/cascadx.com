"use client";

import React, { useEffect, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { QRCodeSVG } from "qrcode.react";

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const worldData = require("world-atlas/land-110m.json") as any;

// ─── vCard ────────────────────────────────────────────────────────────────────
const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:Robi Guetta",
  "N:Guetta;Robi;;;",
  "ORG:CascadX",
  "TITLE:Founder & CEO",
  "EMAIL;TYPE=INTERNET:hello@cascadx.com",
  "TEL;TYPE=CELL:+447459166788",
  "TEL;TYPE=WORK:+447459166788",
  "URL:https://cascadx.com",
  "URL;TYPE=LinkedIn:https://linkedin.com/in/robiguetta",
  "NOTE:AI payment cascading | Turning declined transactions into approved revenue",
  "END:VCARD",
].join("\r\n");

function downloadVCard() {
  const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "robi-guetta.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Globe background ─────────────────────────────────────────────────────────
function GlobeBackground() {
  const landRef      = useRef<SVGPathElement>(null);
  const graticuleRef = useRef<SVGPathElement>(null);
  const rotRef       = useRef(0);

  useEffect(() => {
    const SIZE = 480;
    const proj = geoOrthographic().scale(200).translate([SIZE / 2, SIZE / 2]).clipAngle(90);
    const pathGen = geoPath(proj);
    const land = feature(worldData as unknown as Topology, worldData.objects.land as GeometryCollection);
    const graticule = geoGraticule()();
    let raf: number;
    const tick = () => {
      rotRef.current += 360 / (120 * 60);
      proj.rotate([rotRef.current, -20]);
      const ld = pathGen(land);
      const gd = pathGen(graticule);
      if (landRef.current && ld)      landRef.current.setAttribute("d", ld);
      if (graticuleRef.current && gd) graticuleRef.current.setAttribute("d", gd);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{
      position: "fixed", top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      width: 480, height: 480,
      opacity: 0.14, pointerEvents: "none", zIndex: 0,
    }}>
      <svg viewBox="0 0 480 480" width="480" height="480" aria-hidden>
        <defs>
          <clipPath id="rob-globe-clip">
            <circle cx="240" cy="240" r="200"/>
          </clipPath>
        </defs>
        <circle cx="240" cy="240" r="200" fill="none" stroke="rgba(217,119,87,0.3)" strokeWidth="1"/>
        <path ref={graticuleRef} fill="none" stroke="rgba(245,239,230,0.28)" strokeWidth="0.6" clipPath="url(#rob-globe-clip)"/>
        <path ref={landRef}      fill="rgba(245,239,230,0.32)" stroke="rgba(245,239,230,0.4)" strokeWidth="0.5" clipPath="url(#rob-globe-clip)"/>
      </svg>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.999-1.31A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.073-1.114l-.292-.173-3.022.792.806-2.946-.19-.302A7.962 7.962 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}
function IconDownload() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
    </svg>
  );
}

// ─── Action button ────────────────────────────────────────────────────────────
type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  delay: number;
  visible: boolean;
};

function ActionButton({ icon, label, href, delay, visible }: ActionButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(14px)",
      transitionProperty: "opacity, transform",
      transitionDuration: "450ms, 450ms",
      transitionDelay: `${delay}ms, ${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
    }}>
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center",
          padding: "0 16px", height: 52, borderRadius: 14,
          border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}`,
          background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
          cursor: "pointer", textDecoration: "none",
          color: "#fafaf7", gap: 12,
          transform: hovered ? "scale(1.01)" : "scale(1)",
          transition: "transform 200ms ease, background 200ms ease, border-color 200ms ease",
          boxSizing: "border-box",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</span>
        <span style={{
          flex: 1,
          fontFamily: "var(--font-inter,sans-serif)", fontWeight: 500, fontSize: 15,
        }}>
          {label}
        </span>
        <IconArrow />
      </a>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RobCard() {
  const [visible, setVisible] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function handleSave() {
    setBtnPressed(true);
    setTimeout(() => setBtnPressed(false), 150);
    downloadVCard();
  }

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transition: `opacity 500ms ease ${delay}ms`,
  });

  const slideUp = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(12px)",
    transitionProperty: "opacity, transform",
    transitionDuration: "500ms, 500ms",
    transitionDelay: `${delay}ms, ${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f0e", position: "relative", overflowX: "hidden" }}>

      <GlobeBackground />

      {/* Animated terracotta glows */}
      <div aria-hidden style={{
        position: "fixed", top: "-15%", right: "-5%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(217,119,87,0.14) 0%, transparent 70%)",
        animation: "rob-glow1 22s ease-in-out infinite alternate",
        pointerEvents: "none", zIndex: 0,
      }}/>
      <div aria-hidden style={{
        position: "fixed", bottom: "-20%", left: "-10%",
        width: 620, height: 620, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(217,119,87,0.09) 0%, transparent 70%)",
        animation: "rob-glow2 28s ease-in-out infinite alternate",
        pointerEvents: "none", zIndex: 0,
      }}/>

      {/* Noise texture */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.04,
      }}/>

      {/* Main content */}
      <main style={{
        position: "relative", zIndex: 2,
        maxWidth: 420, margin: "0 auto",
        padding: "48px 24px 60px",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Logo */}
        <div style={{ marginBottom: 40, display: "flex", alignItems: "center", ...fadeIn(0) }}>
          <span style={{
            fontFamily: "var(--font-display,sans-serif)", fontWeight: 800,
            fontSize: 22, letterSpacing: "-0.03em", color: "#fafaf7",
          }}>
            CascadX
          </span>
          <span style={{
            display: "inline-block", width: 6, height: 6, borderRadius: "50%",
            background: "#d97757", marginLeft: 3, marginBottom: -2,
          }}/>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--font-inter,sans-serif)", fontWeight: 800,
          fontSize: "clamp(26px,7vw,32px)", letterSpacing: "-0.02em",
          color: "#fafaf7", margin: "0 0 8px", textAlign: "center",
          ...slideUp(700),
        }}>
          ROBI GUETTA
        </h1>

        {/* Role */}
        <p style={{
          fontFamily: "var(--font-inter,sans-serif)", fontWeight: 500,
          fontSize: 16, color: "rgba(255,255,255,0.7)",
          margin: "0 0 8px", textAlign: "center",
          ...slideUp(820),
        }}>
          Founder &amp; CEO
        </p>

        {/* Company */}
        <p style={{
          fontFamily: "var(--font-mono,monospace)", fontWeight: 500,
          fontSize: 13, letterSpacing: "3px", textTransform: "uppercase",
          color: "#d97757", margin: "0 0 20px", textAlign: "center",
          ...slideUp(940),
        }}>
          CascadX
        </p>

        {/* Tagline */}
        <p style={{
          fontFamily: "var(--font-inter,sans-serif)", fontWeight: 500,
          fontSize: 14, color: "rgba(255,255,255,0.55)",
          maxWidth: 320, textAlign: "center", lineHeight: 1.55,
          margin: "0 0 32px",
          ...slideUp(1060),
        }}>
          AI payment cascading | Turning declined transactions into approved revenue
        </p>

        {/* Divider */}
        <div style={{
          width: "60%", height: 1, background: "rgba(217,119,87,0.25)",
          marginBottom: 32, ...fadeIn(1100),
        }}/>

        {/* Save to contacts — primary CTA */}
        <div style={{ width: "100%", position: "relative", marginBottom: 14, ...slideUp(1200) }}>
          {/* Pulse rings */}
          <div aria-hidden style={{
            position: "absolute", inset: -7, borderRadius: 23,
            border: "1.5px solid rgba(217,119,87,0.4)",
            animation: "rob-btn-pulse 4s ease-out 2.5s infinite",
            pointerEvents: "none",
          }}/>
          <div aria-hidden style={{
            position: "absolute", inset: -7, borderRadius: 23,
            border: "1.5px solid rgba(217,119,87,0.4)",
            animation: "rob-btn-pulse 4s ease-out 4.5s infinite",
            pointerEvents: "none",
          }}/>

          <button
            type="button"
            onClick={handleSave}
            style={{
              width: "100%", height: 60, borderRadius: 16, border: "none",
              background: "linear-gradient(180deg, #e68a67 0%, #d97757 55%, #c86847 100%)",
              boxShadow: "0 0 30px rgba(217,119,87,0.4), 0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 22px", cursor: "pointer",
              transform: btnPressed ? "scale(0.97)" : "scale(1)",
              transition: "transform 150ms ease",
            }}
          >
            <span style={{
              fontFamily: "var(--font-inter,sans-serif)", fontWeight: 600,
              fontSize: 17, color: "#fff", letterSpacing: "-0.01em",
            }}>
              Save to contacts
            </span>
            <IconDownload />
          </button>
        </div>

        {/* Secondary action buttons */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          <ActionButton
            icon={<IconCalendar />}
            label="Book a meeting"
            href="mailto:hello@cascadx.com?subject=Meeting%20Request%20with%20Robi&body=Hi%20Robi%2C%0A%0AI'd%20like%20to%20schedule%20a%20meeting%20to%20discuss...%0A%0AMy%20availability%3A%0A-%20%0A-%20%0A%0ABest%2C%0A"
            delay={1300}
            visible={visible}
          />
          <ActionButton
            icon={<IconWhatsApp />}
            label="WhatsApp"
            href="https://wa.me/447459166788"
            delay={1380}
            visible={visible}
          />
          <ActionButton
            icon={<IconLinkedIn />}
            label="LinkedIn"
            href="https://linkedin.com/in/robiguetta"
            delay={1460}
            visible={visible}
          />
          <ActionButton
            icon={<IconGlobe />}
            label="Visit cascadx.com"
            href="https://cascadx.com"
            delay={1540}
            visible={visible}
          />
        </div>

        {/* Divider */}
        <div style={{
          width: "60%", height: 1, background: "rgba(217,119,87,0.25)",
          marginBottom: 24, ...fadeIn(1620),
        }}/>

        {/* Direct contact */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 4, marginBottom: 32, ...fadeIn(1680),
        }}>
          <span style={{
            fontFamily: "var(--font-mono,monospace)", fontSize: 10,
            letterSpacing: "2px", textTransform: "uppercase",
            color: "rgba(217,119,87,0.6)", marginBottom: 8,
          }}>
            Direct contact
          </span>
          <a
            href="mailto:hello@cascadx.com"
            className="rob-contact-link"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              textDecoration: "none",
              fontFamily: "var(--font-inter,sans-serif)", fontWeight: 500,
              fontSize: 14, color: "rgba(255,255,255,0.8)",
              padding: "8px 16px", borderRadius: 10, minHeight: 44,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
            </svg>
            hello@cascadx.com
          </a>
          <a
            href="tel:+447459166788"
            className="rob-contact-link"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              textDecoration: "none",
              fontFamily: "var(--font-inter,sans-serif)", fontWeight: 500,
              fontSize: 14, color: "rgba(255,255,255,0.8)",
              padding: "8px 16px", borderRadius: 10, minHeight: 44,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            +44 7459 166788
          </a>
        </div>

        {/* Divider */}
        <div style={{
          width: "60%", height: 1, background: "rgba(217,119,87,0.25)",
          marginBottom: 32, ...fadeIn(1760),
        }}/>

        {/* QR Code */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
          ...slideUp(1840),
        }}>
          <div style={{ position: "relative", filter: "drop-shadow(0 0 20px rgba(217,119,87,0.22))" }}>
            <QRCodeSVG
              value="https://cascadx.com/rob"
              size={180}
              bgColor="transparent"
              fgColor="#d97757"
              level="H"
              marginSize={1}
            />
            {/* Center logo overlay */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 36, height: 36, borderRadius: "50%",
              background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}>
              <span style={{
                fontFamily: "var(--font-display,sans-serif)", fontWeight: 900,
                fontSize: 11, color: "#0d0f0e", letterSpacing: "-0.5px",
              }}>
                CX
              </span>
            </div>
          </div>
          <span style={{
            fontFamily: "var(--font-mono,monospace)", fontSize: 11,
            letterSpacing: "1px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}>
            Scan to share this card
          </span>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 32, ...fadeIn(2100) }}>
          <a href="https://cascadx.com" style={{
            fontFamily: "var(--font-mono,monospace)", fontSize: 10,
            letterSpacing: "2px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", textDecoration: "none",
          }}>
            Powered by cascadx.com
          </a>
        </div>

      </main>

      <style>{`
        @keyframes rob-glow1 {
          0%   { transform: translate(0,0) scale(1); opacity: 0.8; }
          100% { transform: translate(-90px,130px) scale(1.25); opacity: 1; }
        }
        @keyframes rob-glow2 {
          0%   { transform: translate(0,0) scale(1); opacity: 0.6; }
          100% { transform: translate(75px,-95px) scale(1.18); opacity: 1; }
        }
        @keyframes rob-btn-pulse {
          0%   { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0;   transform: scale(1.22); }
        }
        .rob-contact-link:hover {
          background: rgba(255,255,255,0.05) !important;
        }
      `}</style>
    </div>
  );
}
