import { ImageResponse } from "next/og";

export const alt = "Robi Guetta — Founder & CEO at CascadX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0f0e",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top-right glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217,119,87,0.28) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Bottom-left glow */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -100,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217,119,87,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 44 }}>
          <span
            style={{
              color: "#fafaf7",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "-1px",
              fontFamily: "sans-serif",
            }}
          >
            CascadX
          </span>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#d97757",
              marginLeft: 4,
              marginBottom: -4,
              display: "flex",
            }}
          />
        </div>

        {/* Avatar */}
        <div
          style={{
            width: 104,
            height: 104,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e68a67, #d97757, #c86847)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 0 60px rgba(217,119,87,0.45)",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 38,
              fontWeight: 800,
              fontFamily: "sans-serif",
            }}
          >
            RG
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            color: "#fafaf7",
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: "-2px",
            display: "flex",
            fontFamily: "sans-serif",
          }}
        >
          ROBI GUETTA
        </div>

        {/* Role */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 14,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 22,
              fontFamily: "sans-serif",
            }}
          >
            Founder &amp; CEO
          </span>
          <span style={{ color: "#d97757", fontSize: 22, fontFamily: "sans-serif" }}>
            ·
          </span>
          <span
            style={{
              color: "#d97757",
              fontSize: 16,
              letterSpacing: "3px",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            CascadX
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 360,
            height: 1,
            background: "rgba(217,119,87,0.3)",
            marginTop: 28,
            marginBottom: 28,
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            color: "rgba(255,255,255,0.48)",
            fontSize: 19,
            textAlign: "center",
            maxWidth: 680,
            lineHeight: 1.5,
            display: "flex",
            fontFamily: "sans-serif",
          }}
        >
          AI payment cascading | Turning declined transactions into approved revenue
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent 0%, #d97757 40%, #d97757 60%, transparent 100%)",
            display: "flex",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
