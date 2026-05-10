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
  accent: "#d97757",
  ink: "#2a1f1c",
  inkSoft: "#7a6961",
  line: "rgba(217,119,87,0.15)",
  outerBg: "#1a1a1a",
};

export const pastelDark: LetterTheme = {
  bg: "#0d0f0e",
  surface: "#1e2423",
  letter: "#d97757",
  accent: "#d97757",
  ink: "#fafaf7",
  inkSoft: "#7a8178",
  line: "rgba(217,119,87,0.15)",
  outerBg: "#000000",
};
