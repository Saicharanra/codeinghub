"use client";

import React from "react";
import { Check, Copy } from "lucide-react";
import { showToast } from "@/components/common/Toast";

interface ResultPanelProps {
  label: string;
  value: string | number;
  description?: string;
  statusBadge?: {
    text: string;
    type?: "success" | "warning" | "info" | "neutral";
  };
  copyValue?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ResultPanel({
  label,
  value,
  description,
  statusBadge,
  copyValue,
  className = "",
  children,
}: ResultPanelProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!copyValue && typeof value !== "string" && typeof value !== "number") return;
    const textToCopy = copyValue || String(value);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast("Result copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeStyles = {
    success: "bg-[#EBF5F1] text-[#176B50] border-[#C8E3D8]",
    warning: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
    info: "bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]",
    neutral: "bg-[#F3F3F0] text-[#737373] border-[#E7E7E3]",
  };

  return (
    <div
      className={`p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] space-y-3 shadow-subtle ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-mono font-medium uppercase tracking-wider text-[#737373]">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {statusBadge && (
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${
                badgeStyles[statusBadge.type || "neutral"]
              }`}
            >
              {statusBadge.text}
            </span>
          )}
          {copyValue && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-[#737373] hover:text-[#176B50] hover:bg-[#EBF5F1] transition-colors border border-transparent hover:border-[#C8E3D8]"
              title="Copy result"
              aria-label="Copy result"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#176B50]" />
                  <span className="text-xs text-[#176B50] font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="text-3xl sm:text-4xl font-mono font-bold text-[#202124] tracking-tight">
        {value}
      </div>

      {description && (
        <p className="text-[14px] sm:text-[15px] text-[#737373] leading-relaxed pt-1">
          {description}
        </p>
      )}

      {children && <div className="pt-2">{children}</div>}
    </div>
  );
}