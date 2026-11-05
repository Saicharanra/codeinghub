"use client";

import React, { useState, useEffect } from "react";
import { Check, Info, X } from "lucide-react";

interface ToastData {
  id: number;
  message: string;
  type: "success" | "info";
}

export function showToast(message: string, type: "success" | "info" = "success") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("codinghub_toast", { detail: { message, type } })
    );
  }
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const custom = e as CustomEvent<{ message: string; type?: "success" | "info" }>;
      if (!custom.detail?.message) return;

      const newToast: ToastData = {
        id: Date.now() + Math.random(),
        message: custom.detail.message,
        type: custom.detail.type || "success",
      };

      setToasts((prev) => [...prev.slice(-2), newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 2500);
    };

    window.addEventListener("codinghub_toast", handleToastEvent);
    return () => {
      window.removeEventListener("codinghub_toast", handleToastEvent);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-lg bg-[#202124] text-white shadow-lg border border-[#3A3B3E] animate-in fade-in slide-in-from-bottom-2 duration-150 text-xs sm:text-sm font-medium"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === "success" ? (
              <span className="w-5 h-5 rounded-full bg-[#176B50] flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </span>
            ) : (
              <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Info className="w-3 h-3 text-white" />
              </span>
            )}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="p-1 text-[#A3A3A3] hover:text-white rounded"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}