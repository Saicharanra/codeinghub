"use client";

import React, { useEffect } from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

/**
 * Reusable AdSlot component for compliant Google AdSense integration.
 * Complies with Google AdSense Policies:
 * - Collapses (renders null) if publisher ID or slot ID is missing (no empty blank boxes).
 * - Distinguishable with a subtle "ADVERTISEMENT" header.
 * - Proper spacing preventing accidental clicks and avoiding overlap with inputs or navigation.
 */
export default function AdSlot({
  slotId,
  format = "auto",
  responsive = true,
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const effectiveSlotId = slotId || process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT;

  // Strict check: if publisher ID or slot ID is absent, completely collapse container
  if (!publisherId || !effectiveSlotId || publisherId === "ca-pub-0000000000000000") {
    return null;
  }

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // Gracefully ignore AdSense push errors (e.g. blocked by adblockers)
    }
  }, []);

  return (
    <div
      className={`my-8 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800/80 bg-slate-900/40 text-center ${className}`}
      aria-label="Sponsored advertisement"
    >
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-2">
        {label}
      </div>
      <div className="w-full overflow-hidden flex justify-center min-h-[90px]">
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={publisherId}
          data-ad-slot={effectiveSlotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
