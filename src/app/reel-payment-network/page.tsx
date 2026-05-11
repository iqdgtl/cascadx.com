"use client";
import { Suspense } from "react";
import { useStandardReelTheme } from "@/lib/useReelTheme";
import PaymentNetwork from "@/components/reels/PaymentNetwork";
function Inner() { return <PaymentNetwork theme={useStandardReelTheme()} />; }
export default function Page() { return <Suspense><Inner /></Suspense>; }
