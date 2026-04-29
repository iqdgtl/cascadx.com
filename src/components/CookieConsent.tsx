"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already accepted
    if (typeof window !== "undefined" && localStorage.getItem("cx-cookies") === "accepted") return;
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const accept = () => {
    localStorage.setItem("cx-cookies", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-7 py-4 bg-surface-el/95 backdrop-blur-md border-t border-line transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(100%)" }}
    >
      <div className="max-w-[var(--max)] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-soft m-0">
          We use cookies to improve your experience.{" "}
          <Link href="/cookies" className="text-accent hover:text-accent-deep transition-colors underline underline-offset-2">
            Manage preferences
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => setVisible(false)}
            className="px-4 py-2 text-sm text-ink-muted border border-line rounded-full hover:border-ink-muted transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-semibold bg-accent text-[#0d0f0e] rounded-full hover:bg-accent-deep transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
