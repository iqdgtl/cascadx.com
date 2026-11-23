import { ImageResponse } from "next/og";

export async function GET() {
  const W = 1080;
  const H = 1080;

  const stars: [number, number, number][] = [
    [210, 72, 2], [395, 44, 1.5], [580, 88, 2.5], [745, 55, 2],
    [900, 82, 1.5], [990, 42, 1], [150, 168, 1.5], [460, 175, 1],
    [670, 148, 2], [840, 165, 1.5], [320, 258, 1], [1010, 195, 2],
    [120, 310, 1.5], [500, 290, 1], [960, 260, 2],
  ];

  // Globe center & radius
  const GX = 855, GY = 870, GR = 135;

  return new ImageResponse(
    (
      <div
        style={{
          width: W, height: H,
          background: "#faf8f2",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* ── Background glows ── */}
        <div style={{
          position: "absolute", bottom: -180, right: -120,
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 106, 61,0.24) 0%, rgba(200,104,71,0.1) 38%, transparent 65%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", top: -220, left: -160,
          width: 580, height: 580, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,95,45,0.14) 0%, transparent 60%)",
          display: "flex",
        }} />
        {/* Mid terracotta flush */}
        <div style={{
          position: "absolute", top: 380, right: -80,
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 106, 61,0.08) 0%, transparent 60%)",
          display: "flex",
        }} />

        {/* ── Stars ── */}
        {stars.map(([x, y, r], i) => (
          <div key={i} style={{
            position: "absolute", left: x, top: y,
            width: r, height: r, borderRadius: "50%",
            background: `rgba(255,255,255,${0.35 + (i % 4) * 0.12})`,
            display: "flex",
          }} />
        ))}

        {/* ── Wireframe globe (bottom-right) ── */}
        {([
          [GX - GR,       GY - GR,       GR * 2, GR * 2, 0.22],
          [GX - GR * .65, GY - GR * .65, GR * 1.3, GR * 1.3, 0.17],
          [GX - GR * .33, GY - GR * .33, GR * .66, GR * .66, 0.12],
        ] as [number, number, number, number, number][]).map(([l, t, w, h, o], i) => (
          <div key={i} style={{
            position: "absolute", left: l, top: t, width: w, height: h,
            borderRadius: "50%", border: `1px solid rgba(255, 106, 61,${o})`,
            display: "flex",
          }} />
        ))}
        {/* Equator */}
        <div style={{ position: "absolute", left: GX - GR, top: GY, width: GR * 2, height: 1, background: "rgba(255, 106, 61,0.15)", display: "flex" }} />
        {/* Meridian */}
        <div style={{ position: "absolute", left: GX, top: GY - GR, width: 1, height: GR * 2, background: "rgba(255, 106, 61,0.15)", display: "flex" }} />
        {/* Latitude lines */}
        <div style={{ position: "absolute", left: GX - GR, top: GY - GR * .5, width: GR * 2, height: 1, background: "rgba(255, 106, 61,0.09)", display: "flex" }} />
        <div style={{ position: "absolute", left: GX - GR, top: GY + GR * .5, width: GR * 2, height: 1, background: "rgba(255, 106, 61,0.09)", display: "flex" }} />

        {/* ── Roman arches – back row ── */}
        <div style={{
          position: "absolute", bottom: 130, left: 0, width: W, height: 100,
          display: "flex", alignItems: "flex-end",
          paddingLeft: 80, paddingRight: 80, gap: 9,
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 82,
              borderRadius: "48px 48px 0 0",
              border: "1px solid rgba(255, 106, 61,0.08)",
              display: "flex",
            }} />
          ))}
        </div>

        {/* ── Roman arches – front row ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, width: W, height: 160,
          display: "flex", alignItems: "flex-end",
          paddingLeft: 24, paddingRight: 24, gap: 6,
        }}>
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 142,
              borderRadius: "72px 72px 0 0",
              border: "1px solid rgba(255, 106, 61,0.17)",
              background: "rgba(255, 106, 61,0.022)",
              display: "flex",
            }} />
          ))}
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 210,
          background: "linear-gradient(to bottom, transparent 0%, rgba(13,15,14,0.6) 100%)",
          display: "flex",
        }} />

        {/* ── Content ── */}
        <div style={{
          position: "absolute",
          top: 68, left: 70, right: 70, bottom: 220,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
        }}>

          {/* Logo + badge row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ color: "#1a0f0a", fontSize: 28, fontWeight: 800, letterSpacing: "-0.8px", display: "flex" }}>
                CascadX
              </div>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff6a3d", marginLeft: 3, marginBottom: -4, display: "flex" }} />
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255, 106, 61,0.09)",
              border: "1px solid rgba(255, 106, 61,0.22)",
              borderRadius: 8, padding: "7px 14px",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff6a3d", display: "flex" }} />
              <div style={{ color: "rgba(255, 106, 61,0.9)", fontSize: 12, fontWeight: 600, letterSpacing: "2px", display: "flex" }}>
                SIGMA WORLD · ROME 2026
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 2, background: "#ff6a3d", display: "flex" }} />
              <div style={{ color: "rgba(255, 106, 61,0.75)", fontSize: 13, fontWeight: 600, letterSpacing: "3px", display: "flex" }}>
                IGAMING · PAYMENTS · FINTECH
              </div>
            </div>

            {/* Headline */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 30 }}>
              <div style={{ color: "rgba(250,250,247,0.68)", fontSize: 38, fontWeight: 400, lineHeight: 1.25, display: "flex" }}>
                Meet us at
              </div>
              <div style={{ color: "#ff6a3d", fontSize: 72, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2px", display: "flex" }}>
                SiGMA Rome 2026
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: 360, height: 1.5, background: "rgba(255, 106, 61,0.38)", marginBottom: 26, display: "flex" }} />

            {/* Date + Venue */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 30 }}>
              <div style={{ color: "rgba(250,250,247,0.88)", fontSize: 22, fontWeight: 500, display: "flex" }}>
                November 2–5, 2026  ·  Fiera Roma
              </div>
              <div style={{ color: "rgba(250,250,247,0.5)", fontSize: 17, fontWeight: 400, display: "flex" }}>
                Via Portuense 1645, Rome, Italy
              </div>
            </div>

            {/* Tagline */}
            <div style={{ color: "#ff6a3d", fontSize: 28, fontWeight: 600, fontStyle: "italic", display: "flex" }}>
              "Let&apos;s talk payments."
            </div>
          </div>

          {/* Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ width: 280, height: 1, background: "rgba(255, 106, 61,0.22)", display: "flex" }} />
            <div style={{ color: "rgba(250,250,247,0.4)", fontSize: 15, fontWeight: 400, display: "flex" }}>
              cascadx.com  ·  hello@cascadx.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
