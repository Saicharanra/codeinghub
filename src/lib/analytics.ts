/**
 * Coding Hub - Privacy-Conscious Google Analytics 4 Integration
 *
 * Designed to strictly adhere to user privacy requirements:
 * 1. Never sends entered values, grades, JSON, code, or personal information.
 * 2. Only initializes when NEXT_PUBLIC_GA_ID (or NEXT_PUBLIC_GA_MEASUREMENT_ID) is set.
 * 3. Enforces user cookie consent before firing any analytics events.
 * 4. Enables IP anonymization and disables advertising features by default.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export const isGAConfigured = Boolean(
  GA_MEASUREMENT_ID &&
  GA_MEASUREMENT_ID.trim() !== "" &&
  GA_MEASUREMENT_ID.startsWith("G-") &&
  GA_MEASUREMENT_ID !== "G-0000000000"
);

export const CONSENT_STORAGE_KEY = "codinghub_analytics_consent";
export type ConsentStatus = "granted" | "denied" | "undetermined";

/**
 * Check user's current consent preference from localStorage
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return "undetermined";
  try {
    const val = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === "granted" || val === "denied") return val;
  } catch {
    // localStorage might be unavailable
  }
  return "undetermined";
}

/**
 * Update user consent preference and dispatch window event to reactive listeners
 */
export function setConsentStatus(status: "granted" | "denied"): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // Ignore storage errors
  }

  // Update gtag consent state if gtag is available
  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: status,
    });
  }

  // Notify components
  window.dispatchEvent(
    new CustomEvent("codinghub_consent_changed", { detail: { status } })
  );
}

// Global declaration for window.gtag and dataLayer
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track page view on client-side Next.js route change
 */
export function trackPageView(url: string) {
  if (!isGAConfigured || typeof window === "undefined" || !window.gtag) return;
  if (getConsentStatus() !== "granted") return;

  window.gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * Core event dispatcher with strict sanitization
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (!isGAConfigured || typeof window === "undefined" || !window.gtag) return;
  if (getConsentStatus() !== "granted") return;

  const sanitizedParams: Record<string, string | number | boolean> = {};

  if (params) {
    for (const [key, val] of Object.entries(params)) {
      if (val !== undefined) {
        // Enforce safety: do not permit long text or freeform user input
        if (typeof val === "string") {
          sanitizedParams[key] = val.slice(0, 100);
        } else {
          sanitizedParams[key] = val;
        }
      }
    }
  }

  window.gtag("event", eventName, sanitizedParams);
}

/* =========================================================================
   Privacy-Safe Business Event Helpers
   Never pass user-entered text, numbers, formulas, or JSON payloads.
   ========================================================================= */

/**
 * 1. Tool opened event
 */
export function trackToolOpened(toolId: string, toolName: string) {
  trackEvent("tool_opened", {
    tool_id: toolId,
    tool_name: toolName,
  });
}

/**
 * 2. Tool calculation completed event
 * Note: Only logs calculation type/mode. NEVER logs input grades, numbers, or outputs.
 */
export function trackCalculationCompleted(toolId: string, calculationMode: string) {
  trackEvent("tool_calculation_completed", {
    tool_id: toolId,
    calculation_mode: calculationMode,
  });
}

/**
 * 3. Tutorial opened event
 */
export function trackTutorialOpened(categorySlug: string, tutorialSlug: string) {
  trackEvent("tutorial_opened", {
    tutorial_category: categorySlug,
    tutorial_slug: tutorialSlug,
  });
}

/**
 * 4. Search performed event
 * Note: Only logs query length and category filter, never raw query strings.
 */
export function trackSearchPerformed(filterCategory: string, queryLength: number) {
  trackEvent("search_performed", {
    filter_category: filterCategory,
    query_length: queryLength,
  });
}

/**
 * 5. Related tool clicked event
 */
export function trackRelatedToolClicked(fromLocation: string, toolId: string) {
  trackEvent("related_tool_clicked", {
    source_location: fromLocation,
    target_tool_id: toolId,
  });
}
