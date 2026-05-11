"use client";
import { Suspense } from "react";
import { useLetterReelTheme } from "@/lib/useReelTheme";
import LetterReel from "@/components/reels/LetterReel";
function Inner() { return <LetterReel letter="X" phrase='X marks the moment "declined" becomes "approved."' bgVariant="cross" theme={useLetterReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
