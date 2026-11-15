export default function SigmaRomePage() {
  const graphics = [
    {
      title: "Instagram Post",
      subtitle: "1080 × 1080",
      href: "/sigma-rome/square",
      aspect: "aspect-square",
    },
    {
      title: "Story / Reel",
      subtitle: "1080 × 1920",
      href: "/sigma-rome/story",
      aspect: "aspect-[9/16]",
    },
    {
      title: "LinkedIn Banner",
      subtitle: "1200 × 627",
      href: "/sigma-rome/landscape",
      aspect: "aspect-[1200/627]",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf8f2",
        fontFamily: "sans-serif",
        padding: "60px 40px",
        color: "#1a0f0a",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#1a0f0a" }}>
            CascadX
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d97757", display: "inline-block", marginLeft: 3, marginBottom: -3 }} />
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1px", margin: "0 0 6px", color: "#1a0f0a" }}>
          SiGMA Rome 2026 — Graphics
        </h1>
        <p style={{ fontSize: 15, color: "rgba(250,250,247,0.45)", margin: "0 0 52px" }}>
          November 2–5 · Fiera Roma · Click any graphic to open full-size, then save
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {graphics.map((g) => (
            <div key={g.href}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#1a0f0a" }}>{g.title}</h2>
                <span style={{ fontSize: 13, color: "rgba(217,119,87,0.7)", fontWeight: 500 }}>{g.subtitle}</span>
              </div>
              <a
                href={g.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(217,119,87,0.18)", transition: "border-color 0.2s" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.href}
                  alt={g.title}
                  style={{ width: "100%", display: "block" }}
                />
              </a>
              <div style={{ marginTop: 12 }}>
                <a
                  href={g.href}
                  download
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 20px",
                    background: "rgba(217,119,87,0.1)",
                    border: "1px solid rgba(217,119,87,0.24)",
                    borderRadius: 8,
                    color: "rgba(217,119,87,0.9)",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    letterSpacing: "0.5px",
                  }}
                >
                  ↓ Download {g.subtitle}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
