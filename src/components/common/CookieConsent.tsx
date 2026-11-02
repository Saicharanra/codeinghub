"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";
import { getConsentStatus, setConsentStatus } from "@/lib/analytics";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only display if user has not yet selected a preference
    const current = getConsentStatus();
    if (current === "undetermined") {
      setIsVisible(true);
    }

    // Listen for manual prompt re-open requests (e.g. from footer or privacy policy)
    const handleReopen = () => {
      setIsVisible(true);
    };

    window.addEventListener("codinghub_reopen_cookie_consent", handleReopen);
    return () => {
      window.removeEventListener("codinghub_reopen_cookie_consent", handleReopen);
    };
  }, []);

  const handleAccept = () => {
    setConsentStatus("granted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsentStatus("denied");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-40 p-4 sm:p-5 bg-white border-t border-[#E7E7E3] shadow-lg animate-in slide-in-from-bottom duration-200"
    >
      <div className="max-w-[1180px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="w-8 h-8 rounded bg-[#EBF5F1] text-[#176B50] flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#202124]">
              Privacy & Cookie Preferences
            </h3>
            <p className="text-xs text-[#737373] leading-relaxed">
              We use lightweight, privacy-friendly analytics to learn which tools and tutorials are most helpful. We never record your entered calculator values, academic grades, or formatted code. Review our{" "}
              <Link
                href="/privacy-policy"
                className="text-[#176B50] underline hover:text-[#12543E]"
              >
                Privacy Policy
              </Link>{" "}
              for complete details.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-shrink-0">
          <button
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-3.5 py-1.5 rounded text-xs font-mono font-medium text-[#737373] hover:text-[#202124] bg-[#FAFAF8] hover:bg-[#F0F0EC] border border-[#E7E7E3] transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-4 py-1.5 rounded text-xs font-mono font-medium text-white bg-[#176B50] hover:bg-[#12543E] transition-colors"
          >
            Accept Analytics
          </button>
          <button
            onClick={handleDecline}
            className="p-1 text-[#737373] hover:text-[#202124] rounded sm:hidden"
            aria-label="Dismiss banner with default essential settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}