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

export default function AdSlot({
  slotId,
  format = "auto",
  responsive = true,
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const effectiveSlotId = slotId || process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT;
  const isEnabled = Boolean(
    publisherId &&
    effectiveSlotId &&
    publisherId !== "ca-pub-0000000000000000"
  );

  useEffect(() => {
    if (!isEnabled) return;
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // Gracefully ignore
    }
  }, [isEnabled]);

  // Strict check: collapse completely when publisher or slot ID is absent
  if (!isEnabled) {
    return null;
  }

  return (
    <div
      className={`my-8 flex flex-col items-center justify-center p-3 rounded border border-[#E7E7E3] bg-[#FAFAF8] text-center ${className}`}
      aria-label="Sponsored advertisement"
    >
      <div className="text-[10px] uppercase tracking-wider text-[#737373] font-medium mb-2">
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
