"use client";
import { Suspense } from "react";
import { useLetterReelTheme } from "@/lib/useReelTheme";
import LetterReel from "@/components/reels/LetterReel";
function Inner() { return <LetterReel letter="C" phrase="Capturing the revenue most processors miss." bgVariant="capture" theme={useLetterReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
