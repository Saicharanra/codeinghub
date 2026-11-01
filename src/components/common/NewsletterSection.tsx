"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 400);
  };

  return (
    <section className="my-16 p-8 sm:p-10 rounded-lg border border-[#E7E7E3] bg-[#FFFFFF]">
      <div className="max-w-xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#176B50]">
          Updates
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-[#202124] tracking-tight">
          Get notified when new tools are added
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed">
          Occasional updates on newly published student calculators, developer formatters, and technical guides. No promotional spam.
        </p>

        {status === "success" ? (
          <div className="p-3.5 rounded bg-[#EBF5F1] border border-[#C8E3D8] text-[#176B50] flex items-center gap-2.5 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Thank you for subscribing. We will keep you updated.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Enter your email address"
              className="flex-1 px-3.5 py-2 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] placeholder-[#737373] text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#176B50] hover:bg-[#12543E] transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <div className="flex items-center gap-1.5 text-xs text-rose-600">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="text-[11px] text-[#737373]">
          Zero spam. Unsubscribe at any time.
        </div>
      </div>
    </section>
  );
}
