"use client";
import { useSearchParams } from "next/navigation";
import { darkTheme, lightTheme } from "./themes";
import { pastel, pastelDark } from "./pastelTheme";
import type { ReelTheme } from "./themes";
import type { LetterTheme } from "./pastelTheme";

export function useStandardReelTheme(): ReelTheme {
  const params = useSearchParams();
  return params.get("light") !== null ? lightTheme : darkTheme;
}

export function useLetterReelTheme(): LetterTheme {
  const params = useSearchParams();
  return params.get("dark") !== null ? pastelDark : pastel;
}
