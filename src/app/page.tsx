import Script from "next/script";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustedByMarquee from "@/components/TrustedByMarquee";
import PaymentMethods from "@/components/PaymentMethods";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

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
      <PaymentMethods />
      <section id="how-it-works"><HowItWorks /></section>
      <FinalCTA />
      <Footer />
    </>
  );
}
