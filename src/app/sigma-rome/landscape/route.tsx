import { ImageResponse } from "next/og";

export async function GET() {
  const W = 1200;
  const H = 627;

  const stars: [number, number, number][] = [
    [80, 55, 2], [180, 35, 1.5], [320, 70, 2], [430, 42, 1.5],
    [550, 62, 1], [100, 140, 1.5], [260, 160, 1], [380, 145, 2],
    [60, 240, 1], [200, 270, 1.5], [350, 250, 1],
  ];

  // Globe in left panel (center of left 420px panel)
  const GX = 210, GY = 310, GR = 160;

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
          position: "absolute", bottom: -150, left: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,119,87,0.22) 0%, transparent 60%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", top: -120, right: 300,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,95,45,0.13) 0%, transparent 60%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", top: 50, right: -100,
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,119,87,0.1) 0%, transparent 60%)",
          display: "flex",
        }} />

        {/* ── Stars (left panel only) ── */}
        {stars.map(([x, y, r], i) => (
          <div key={i} style={{
            position: "absolute", left: x, top: y,
            width: r, height: r, borderRadius: "50%",
            background: `rgba(255,255,255,${0.35 + (i % 4) * 0.1})`,
            display: "flex",
          }} />
        ))}

        {/* ── Wireframe globe – left panel ── */}
        {([
          [GX - GR,         GY - GR,         GR * 2,    GR * 2,    0.2],
          [GX - GR * .67,   GY - GR * .67,   GR * 1.34, GR * 1.34, 0.15],
          [GX - GR * .34,   GY - GR * .34,   GR * .68,  GR * .68,  0.10],
        ] as [number, number, number, number, number][]).map(([l, t, w, h, o], i) => (
          <div key={i} style={{
            position: "absolute", left: l, top: t, width: w, height: h,
            borderRadius: "50%", border: `1px solid rgba(217,119,87,${o})`,
            display: "flex",
          }} />
        ))}
        <div style={{ position: "absolute", left: GX - GR, top: GY, width: GR * 2, height: 1, background: "rgba(217,119,87,0.16)", display: "flex" }} />
        <div style={{ position: "absolute", left: GX, top: GY - GR, width: 1, height: GR * 2, background: "rgba(217,119,87,0.16)", display: "flex" }} />
        <div style={{ position: "absolute", left: GX - GR, top: GY - GR * .5, width: GR * 2, height: 1, background: "rgba(217,119,87,0.09)", display: "flex" }} />
        <div style={{ position: "absolute", left: GX - GR, top: GY + GR * .5, width: GR * 2, height: 1, background: "rgba(217,119,87,0.09)", display: "flex" }} />

        {/* ── Roman arches in left panel bottom ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, width: 420, height: 120,
          display: "flex", alignItems: "flex-end",
          paddingLeft: 12, paddingRight: 12, gap: 4,
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 105,
              borderRadius: "52px 52px 0 0",
              border: "1px solid rgba(217,119,87,0.16)",
              background: "rgba(217,119,87,0.02)",
              display: "flex",
            }} />
          ))}
        </div>

        {/* Vertical separator */}
        <div style={{
          position: "absolute", left: 420, top: 40, bottom: 40, width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(217,119,87,0.35) 30%, rgba(217,119,87,0.35) 70%, transparent)",
          display: "flex",
        }} />

        {/* ── Right panel: all text ── */}
        <div style={{
          position: "absolute",
          top: 0, left: 440, right: 0, bottom: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 60px",
        }}>

          {/* Logo + badge */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ color: "#1a0f0a", fontSize: 22, fontWeight: 800, letterSpacing: "-0.6px", display: "flex" }}>
                CascadX
              </div>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d97757", marginLeft: 3, marginBottom: -3, display: "flex" }} />
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "rgba(217,119,87,0.09)",
              border: "1px solid rgba(217,119,87,0.22)",
              borderRadius: 7, padding: "5px 12px",
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#d97757", display: "flex" }} />
              <div style={{ color: "rgba(217,119,87,0.9)", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", display: "flex" }}>
                SIGMA WORLD · ROME 2026
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 22, height: 2, background: "#d97757", display: "flex" }} />
              <div style={{ color: "rgba(217,119,87,0.76)", fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", display: "flex" }}>
                IGAMING · PAYMENTS · FINTECH
              </div>
            </div>

            {/* Headline */}
            <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 20 }}>
              <div style={{ color: "rgba(250,250,247,0.65)", fontSize: 28, fontWeight: 400, lineHeight: 1.3, display: "flex" }}>
                Meet us at
              </div>
              <div style={{ color: "#d97757", fontSize: 52, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-1.5px", display: "flex" }}>
                SiGMA Rome 2026
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: 300, height: 1.5, background: "rgba(217,119,87,0.38)", marginBottom: 18, display: "flex" }} />

            {/* Date + Venue */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
              <div style={{ color: "rgba(250,250,247,0.88)", fontSize: 18, fontWeight: 500, display: "flex" }}>
                November 2–5, 2026  ·  Fiera Roma
              </div>
              <div style={{ color: "rgba(250,250,247,0.5)", fontSize: 14, fontWeight: 400, display: "flex" }}>
                Via Portuense 1645, Rome, Italy
              </div>
            </div>

            {/* Tagline */}
            <div style={{ color: "#d97757", fontSize: 22, fontWeight: 600, fontStyle: "italic", display: "flex" }}>
              &ldquo;Let&apos;s talk payments.&rdquo;
            </div>
          </div>

          {/* Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ width: 240, height: 1, background: "rgba(217,119,87,0.2)", display: "flex" }} />
            <div style={{ color: "rgba(250,250,247,0.38)", fontSize: 13, fontWeight: 400, display: "flex" }}>
              cascadx.com  ·  hello@cascadx.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
