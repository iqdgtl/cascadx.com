"use client";
import { Suspense } from "react";
import { useLetterReelTheme } from "@/lib/useReelTheme";
import LetterReel from "@/components/reels/LetterReel";
function Inner() { return <LetterReel letter="C" phrase="Cascading your payments through every possible route." bgVariant="cascade" theme={useLetterReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
