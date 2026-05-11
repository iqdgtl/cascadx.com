"use client";
import { Suspense } from "react";
import { useStandardReelTheme } from "@/lib/useReelTheme";
import CascadingLayers from "@/components/reels/CascadingLayers";
function Inner() { return <CascadingLayers theme={useStandardReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
