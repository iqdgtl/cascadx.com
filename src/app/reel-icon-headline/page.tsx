"use client";
import { Suspense } from "react";
import { useStandardReelTheme } from "@/lib/useReelTheme";
import IconHeadline from "@/components/reels/IconHeadline";
function Inner() { return <IconHeadline theme={useStandardReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
