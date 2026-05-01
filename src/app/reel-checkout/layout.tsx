import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reel — Checkout",
  robots: "noindex, nofollow",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
