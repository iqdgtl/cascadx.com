"use client";
import { Suspense } from "react";
import { useStandardReelTheme } from "@/lib/useReelTheme";
import AIChat from "@/components/reels/AIChat";
function Inner() { return <AIChat theme={useStandardReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
