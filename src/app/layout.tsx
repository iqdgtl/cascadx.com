import type { Metadata } from "next";
import { Inter, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cascadx.com"),
  alternates: { canonical: "/" },
  title: {
    default: "CascadX ��� AI-Powered Payment Cascading & Smart Routing",
    template: "%s — CascadX",
  },
  description: "Recover declined transactions with AI-powered payment cascading. Route every transaction through 1,000+ PSPs in under 40ms. Lift approval rates by 18%.",
  openGraph: {
    type: "website",
    siteName: "CascadX",
    title: "CascadX — AI-Powered Payment Cascading & Smart Routing",
    description: "Recover declined transactions with AI-powered payment cascading. Route every transaction through 1,000+ PSPs in under 40ms.",
    url: "https://cascadx.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "CascadX — AI-Powered Payment Cascading",
    description: "Recover declined transactions with AI-powered payment cascading. Lift approval rates by 18%.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        {/* TODO: add GA4 measurement ID when account is set up */}
        {/* TODO: add Meta Pixel when account is set up */}
        {/* TODO: add LinkedIn Insight Tag when account is set up */}
        {children}
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
