"use client";
import { Suspense } from "react";
import { useStandardReelTheme } from "@/lib/useReelTheme";
import FeatureCard from "@/components/reels/FeatureCard";
function Inner() { return <FeatureCard theme={useStandardReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
