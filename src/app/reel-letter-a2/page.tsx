"use client";
import { Suspense } from "react";
import { useLetterReelTheme } from "@/lib/useReelTheme";
import LetterReel from "@/components/reels/LetterReel";
function Inner() { return <LetterReel letter="A" phrase="Adapting to every BIN, every issuer, every country." bgVariant="world" theme={useLetterReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
