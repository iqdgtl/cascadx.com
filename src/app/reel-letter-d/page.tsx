"use client";
import { Suspense } from "react";
import { useLetterReelTheme } from "@/lib/useReelTheme";
import LetterReel from "@/components/reels/LetterReel";
function Inner() { return <LetterReel letter="D" phrase="Decisions in 38 milliseconds. Always." bgVariant="timer" theme={useLetterReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
