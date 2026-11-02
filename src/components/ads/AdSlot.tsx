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
  const publisherId =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT ||
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  const effectiveSlotId = slotId || process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT;

  const isEnabled = Boolean(
    publisherId &&
    publisherId.trim() !== "" &&
    publisherId !== "ca-pub-0000000000000000" &&
    publisherId.startsWith("ca-pub-") &&
    effectiveSlotId &&
    effectiveSlotId.trim() !== ""
  );

  useEffect(() => {
    if (!isEnabled) return;
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Gracefully ignore push errors if AdSense script is blocked by an ad-blocker
    }
  }, [isEnabled]);

  // Completely collapse when unconfigured to prevent blank layout boxes
  if (!isEnabled) {
    return null;
  }

  const minHeightClass =
    format === "rectangle" ? "min-h-[250px]" : "min-h-[90px]";

  return (
    <aside
      className={`my-8 flex flex-col items-center justify-center p-3 rounded-lg border border-[#E7E7E3] bg-[#FAFAF8] text-center ${className}`}
      aria-label="Sponsored advertisement"
    >
      <div className="text-[10px] uppercase font-mono tracking-wider text-[#737373] font-semibold mb-2">
        {label}
      </div>
      <div className={`w-full overflow-hidden flex justify-center ${minHeightClass}`}>
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={publisherId}
          data-ad-slot={effectiveSlotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </aside>
  );
}