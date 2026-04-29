import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CascadX — AI-Powered Payment Cascading";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#0d0f0e",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "32px", fontWeight: 800, color: "#fafaf7", letterSpacing: "-0.035em" }}>
            CascadX
          </span>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#d97757",
              marginLeft: "2px",
            }}
          />
        </div>

        {/* Center: title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              width: "80px",
              height: "3px",
              backgroundColor: "#d97757",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#fafaf7",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              maxWidth: "800px",
            }}
          >
            AI-Powered Payment Cascading & Smart Routing
          </span>
          <span style={{ fontSize: "22px", color: "#b8bcb6", maxWidth: "600px", lineHeight: 1.5 }}>
            Recover declined transactions. Route through 1,000+ PSPs in under 40ms.
          </span>
        </div>

        {/* Bottom: tagline */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#d97757",
            }}
          />
          <span style={{ fontSize: "16px", color: "#7a8178", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
            cascadx.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
