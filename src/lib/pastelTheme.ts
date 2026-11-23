export type LetterTheme = {
  bg: string;
  surface: string;
  letter: string;
  accent: string;
  ink: string;
  inkSoft: string;
  line: string;
  outerBg: string;
};

export const pastel: LetterTheme = {
  bg: "#f5efe6",
  surface: "#ffffff",
  letter: "#e8a98e",
  accent: "#ff6a3d",
  ink: "#2a1f1c",
  inkSoft: "#7a6961",
  line: "rgba(255, 106, 61,0.15)",
  outerBg: "#1a1a1a",
};

export const pastelDark: LetterTheme = {
  bg: "#0d0f0e",
  surface: "#1e2423",
  letter: "#ff6a3d",
  accent: "#ff6a3d",
  ink: "#fafaf7",
  inkSoft: "#7a8178",
  line: "rgba(255, 106, 61,0.15)",
  outerBg: "#000000",
};
