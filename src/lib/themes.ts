export type ReelTheme = {
  bg: string;
  surface: string;
  surfaceSubtle: string;
  ink: string;
  inkSoft: string;
  inkMuted: string;
  accent: string;
  accentDeep: string;
  border: string;
  borderStrong: string;
  // Liquid shape gradients
  lqFrom: string;
  lqTo: string;
  lqHighlight: string;
};

export const darkTheme: ReelTheme = {
  bg: "#0d0f0e",
  surface: "#1e2423",
  surfaceSubtle: "#161a19",
  ink: "#fafaf7",
  inkSoft: "rgba(255,255,255,0.7)",
  inkMuted: "rgba(255,255,255,0.4)",
  accent: "#d97757",
  accentDeep: "#b35a3e",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.12)",
  lqFrom: "#d97757",
  lqTo: "#0d0f0e",
  lqHighlight: "rgba(255,255,255,0.15)",
};

export const lightTheme: ReelTheme = {
  bg: "#e8dfd3",
  surface: "#f0e8dc",
  surfaceSubtle: "#ddd4c6",
  ink: "#1a1a1a",
  inkSoft: "#4a4a4a",
  inkMuted: "#7a7a7a",
  accent: "#d97757",
  accentDeep: "#b35a3e",
  border: "rgba(0,0,0,0.08)",
  borderStrong: "rgba(0,0,0,0.10)",
  lqFrom: "#d97757",
  lqTo: "#ddd4c6",
  lqHighlight: "rgba(255,255,255,0.6)",
};
