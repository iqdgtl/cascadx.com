import { ImageResponse } from "next/og";

export async function GET() {
  const W = 1080;
  const H = 1920;

  const stars: [number, number, number][] = [
    [210, 90], [420, 55], [620, 105], [800, 68],
    [960, 88], [100, 200], [360, 185], [580, 210],
    [780, 175], [1000, 220], [150, 320], [500, 295],
    [900, 310], [280, 420], [720, 400], [1020, 380],
    [50, 450], [640, 470], [870, 440],
  ].map(([x, y], i) => [x, y, i % 3 === 0 ? 2.5 : i % 3 === 1 ? 2 : 1.5] as [number, number, number]);

  const GX = 540, GY = 540, GR = 190;

  return new ImageResponse(
    (
      <div
        style={{
          width: W, height: H,
          background: "#0d0f0e",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* ── Background glows ── */}
        <div style={{
          position: "absolute", top: -250, right: -180,
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,119,87,0.2) 0%, transparent 60%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", top: 600, left: -200,
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,95,45,0.13) 0%, transparent 60%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: 300, right: -150,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,119,87,0.14) 0%, transparent 65%)",
          display: "flex",
        }} />

        {/* ── Stars ── */}
        {stars.map(([x, y, r], i) => (
          <div key={i} style={{
            position: "absolute", left: x, top: y,
            width: r, height: r, borderRadius: "50%",
            background: `rgba(255,255,255,${0.32 + (i % 5) * 0.1})`,
            display: "flex",
          }} />
        ))}

        {/* ── Large central wireframe globe ── */}
        {([
          [GX - GR,         GY - GR,         GR * 2,    GR * 2,    0.14],
          [GX - GR * .67,   GY - GR * .67,   GR * 1.34, GR * 1.34, 0.10],
          [GX - GR * .34,   GY - GR * .34,   GR * .68,  GR * .68,  0.07],
        ] as [number, number, number, number, number][]).map(([l, t, w, h, o], i) => (
          <div key={i} style={{
            position: "absolute", left: l, top: t, width: w, height: h,
            borderRadius: "50%", border: `1px solid rgba(217,119,87,${o})`,
            display: "flex",
          }} />
        ))}
        <div style={{ position: "absolute", left: GX - GR, top: GY, width: GR * 2, height: 1, background: "rgba(217,119,87,0.1)", display: "flex" }} />
        <div style={{ position: "absolute", left: GX, top: GY - GR, width: 1, height: GR * 2, background: "rgba(217,119,87,0.1)", display: "flex" }} />
        <div style={{ position: "absolute", left: GX - GR, top: GY - GR * .55, width: GR * 2, height: 1, background: "rgba(217,119,87,0.06)", display: "flex" }} />
        <div style={{ position: "absolute", left: GX - GR, top: GY + GR * .55, width: GR * 2, height: 1, background: "rgba(217,119,87,0.06)", display: "flex" }} />

        {/* ── Roman arches – back ── */}
        <div style={{
          position: "absolute", bottom: 180, left: 0, width: W, height: 130,
          display: "flex", alignItems: "flex-end",
          paddingLeft: 70, paddingRight: 70, gap: 8,
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 110,
              borderRadius: "60px 60px 0 0",
              border: "1px solid rgba(217,119,87,0.08)",
              display: "flex",
            }} />
          ))}
        </div>

        {/* ── Roman arches – front ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, width: W, height: 220,
          display: "flex", alignItems: "flex-end",
          paddingLeft: 20, paddingRight: 20, gap: 5,
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 195,
              borderRadius: "95px 95px 0 0",
              border: "1px solid rgba(217,119,87,0.18)",
              background: "rgba(217,119,87,0.02)",
              display: "flex",
            }} />
          ))}
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 280,
          background: "linear-gradient(to bottom, transparent 0%, rgba(13,15,14,0.65) 100%)",
          display: "flex",
        }} />

        {/* ── Content ── */}
        <div style={{
          position: "absolute",
          top: 80, left: 80, right: 80, bottom: 260,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
        }}>

          {/* Logo — centered top */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ color: "#fafaf7", fontSize: 34, fontWeight: 800, letterSpacing: "-1px", display: "flex" }}>
              CascadX
            </div>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#d97757", marginLeft: 4, marginBottom: -5, display: "flex" }} />
          </div>

          {/* Main content — upper center */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 32, height: 2, background: "#d97757", display: "flex" }} />
              <div style={{ color: "rgba(217,119,87,0.78)", fontSize: 14, fontWeight: 600, letterSpacing: "3px", display: "flex" }}>
                IGAMING · PAYMENTS · FINTECH
              </div>
            </div>

            {/* Headline */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 36 }}>
              <div style={{ color: "rgba(250,250,247,0.68)", fontSize: 44, fontWeight: 400, lineHeight: 1.25, display: "flex" }}>
                Meet us at
              </div>
              <div style={{ color: "#d97757", fontSize: 82, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-2.5px", display: "flex" }}>
                SiGMA Rome
              </div>
              <div style={{ color: "#fafaf7", fontSize: 82, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-2.5px", display: "flex" }}>
                2026
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: 400, height: 1.5, background: "rgba(217,119,87,0.4)", marginBottom: 28, display: "flex" }} />

            {/* Date + Venue */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
              <div style={{ color: "rgba(250,250,247,0.9)", fontSize: 26, fontWeight: 500, display: "flex" }}>
                November 2–5, 2026
              </div>
              <div style={{ color: "rgba(250,250,247,0.65)", fontSize: 22, fontWeight: 400, display: "flex" }}>
                Fiera Roma · Rome, Italy
              </div>
            </div>

            {/* Tagline */}
            <div style={{ color: "#d97757", fontSize: 32, fontWeight: 600, fontStyle: "italic", marginBottom: 40, display: "flex" }}>
              &ldquo;Let&apos;s talk payments.&rdquo;
            </div>

            {/* Event badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(217,119,87,0.1)",
              border: "1px solid rgba(217,119,87,0.24)",
              borderRadius: 10, padding: "10px 20px",
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#d97757", display: "flex" }} />
              <div style={{ color: "rgba(217,119,87,0.9)", fontSize: 14, fontWeight: 600, letterSpacing: "2px", display: "flex" }}>
                EUROPE&apos;S LARGEST IGAMING CONFERENCE
              </div>
            </div>
          </div>

          {/* URL callout */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 12,
          }}>
            <div style={{ width: 400, height: 1, background: "rgba(217,119,87,0.22)", display: "flex" }} />
            <div style={{ color: "rgba(250,250,247,0.55)", fontSize: 18, fontWeight: 400, display: "flex" }}>
              Book a meeting →  cascadx.com/rob
            </div>
            <div style={{ color: "rgba(250,250,247,0.32)", fontSize: 15, fontWeight: 400, display: "flex" }}>
              cascadx.com  ·  hello@cascadx.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
