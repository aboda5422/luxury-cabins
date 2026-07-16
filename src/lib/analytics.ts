declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/** Sends events to GA4 (linked to Firebase project luxurycabins-5f52d). */
export function trackEvent(name: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;

  const cleaned = Object.fromEntries(
    Object.entries(params || {}).filter(([, value]) => value !== undefined),
  );

  window.gtag?.("event", name, cleaned);
}

export function trackWhatsAppClick(source: string) {
  trackEvent("whatsapp_click", {
    source,
    event_category: "engagement",
  });
}

export function trackContactSubmit(method: "whatsapp" | "email") {
  trackEvent("generate_lead", {
    method,
    event_category: "conversion",
  });
}

export function trackPhoneClick() {
  trackEvent("phone_click", {
    event_category: "engagement",
  });
}
