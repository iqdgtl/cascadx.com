"use client";
import { Suspense } from "react";
import { useStandardReelTheme } from "@/lib/useReelTheme";
import EvolutionTimeline from "@/components/reels/EvolutionTimeline";
function Inner() { return <EvolutionTimeline theme={useStandardReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
