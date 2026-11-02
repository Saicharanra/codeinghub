"use client";

import React, { useEffect, useState, Suspense } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  isGAConfigured,
  getConsentStatus,
  trackPageView,
} from "@/lib/analytics";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check initial consent status
    if (getConsentStatus() === "granted") {
      setHasConsent(true);
    }

    // Listen for consent status changes from the CookieConsent banner
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ status: string }>;
      if (customEvent.detail?.status === "granted") {
        setHasConsent(true);
      } else {
        setHasConsent(false);
      }
    };

    window.addEventListener("codinghub_consent_changed", handleConsentChange);
    return () => {
      window.removeEventListener("codinghub_consent_changed", handleConsentChange);
    };
  }, []);

  // Do not load scripts if GA is not configured or user hasn't consented
  if (!isGAConfigured || !hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              'analytics_storage': 'granted'
            });
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
              send_page_view: false,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}