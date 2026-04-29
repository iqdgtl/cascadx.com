import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RobotMascot from "@/components/RobotMascot";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <section className="relative z-[2] flex flex-col items-center justify-center text-center px-7 py-32 min-h-[70vh]">
        {/* Subtle terracotta glow behind robot */}
        <div className="absolute inset-0 bg-[radial-gradient(400px_400px_at_50%_40%,rgba(217,119,87,0.12),transparent_60%)] pointer-events-none" />

        <div className="relative z-[2] flex flex-col items-center">
          <RobotMascot size={220} variant="confused" />

          <h1 className="font-display font-[800] text-[clamp(36px,5vw,56px)] tracking-[-0.04em] mt-10 mb-4">
            Hmm. This page took the wrong route.
          </h1>

          <p className="text-ink-soft text-lg max-w-[420px] mb-10">
            Looks like the transaction didn&apos;t make it through. Let&apos;s cascade you back home.
          </p>

          <Button href="/" variant="primary" icon="arrow">
            Back to home
          </Button>
        </div>
      </section>
      <Footer />
    </>
  );
}
