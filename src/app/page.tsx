import Script from "next/script";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import HowItWorks from "@/components/HowItWorks";
import AIChat from "@/components/AIChat";
import SignalsDashboard from "@/components/SignalsDashboard";
import CascadeEngine from "@/components/CascadeEngine";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import TrustedByMarquee from "@/components/TrustedByMarquee";
import PaymentNetworkMap from "@/components/PaymentNetworkMap";

export default function Home() {
  return (
    <>
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CascadX",
            url: "https://cascadx.com",
            description: "AI-powered payment cascading orchestration",
            sameAs: [
              "https://twitter.com/cascadx",
              "https://linkedin.com/company/cascadx",
              "https://instagram.com/cascadx",
            ],
          }),
        }}
      />
      <Nav />
      <Hero />
      <TrustedByMarquee />
      <Solutions />
      <PaymentNetworkMap />
      <section id="how-it-works"><HowItWorks /></section>
      <section id="features"><AIChat /><SignalsDashboard /><CascadeEngine /></section>
      <section id="cta"><CTA /></section>
      <Footer />
    </>
  );
}
