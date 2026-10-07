import type { Metadata } from "next";
import RobCard from "./RobCard";

export const metadata: Metadata = {
  title: "Robi Guetta — Founder & CEO at CascadX",
  description:
    "AI payment cascading | Turning declined transactions into approved revenue",
  openGraph: {
    title: "Robi Guetta — Founder & CEO at CascadX",
    description:
      "AI payment cascading | Turning declined transactions into approved revenue",
    url: "https://cascadx.com/rob",
    type: "profile",
    siteName: "CascadX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robi Guetta — Founder & CEO at CascadX",
    description:
      "AI payment cascading | Turning declined transactions into approved revenue",
  },
  alternates: { canonical: "/rob" },
};

export default function RobPage() {
  return <RobCard />;
}
