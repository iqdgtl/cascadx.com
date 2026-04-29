import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cascadx.com";
  const now = new Date().toISOString();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/solutions/ecommerce`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions/igaming`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions/dating`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/technology/ai-routing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/technology/integration`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/technology/hosted-payment`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
