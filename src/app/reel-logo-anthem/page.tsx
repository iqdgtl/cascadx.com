"use client";
import { Suspense } from "react";
import { useStandardReelTheme } from "@/lib/useReelTheme";
import LogoAnthem from "@/components/reels/LogoAnthem";
function Inner() { return <LogoAnthem theme={useStandardReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
