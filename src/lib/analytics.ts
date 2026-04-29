/**
 * Analytics utility — stub functions to be wired to real tracking later.
 * Connect to GA4, Meta Pixel, LinkedIn Insight Tag, etc.
 */

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  // TODO: wire to GA4 gtag('event', name, properties)
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[analytics] event:", name, properties);
  }
}

export function trackPageView(path: string) {
  // TODO: wire to GA4 gtag('config', GA_ID, { page_path: path })
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[analytics] pageview:", path);
  }
}
