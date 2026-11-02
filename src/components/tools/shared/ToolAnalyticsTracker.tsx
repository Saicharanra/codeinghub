"use client";

import { useEffect } from "react";
import { trackToolOpened } from "@/lib/analytics";

export default function ToolAnalyticsTracker({
  toolId,
  title,
}: {
  toolId: string;
  title: string;
}) {
  useEffect(() => {
    trackToolOpened(toolId, title);
  }, [toolId, title]);

  return null;
}