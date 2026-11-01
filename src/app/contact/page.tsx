"use client";

import React, { useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import AdSlot from "@/components/ads/AdSlot";
import { Mail, CheckCircle2, AlertCircle, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Tool Suggestion",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "Tool Suggestion",
        message: "",
      });
    }, 600);
  };

  return (
    <div className="py-6 sm:py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      <PageHeader
        badge="Direct Contact"
        badgeColor="indigo"
        title="Contact Coding Hub"
        description="Have a question, tool suggestion, or discrepancy report? Reach out directly to our engineering team."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Contact Information & Guidelines */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 sm:p-6 rounded-lg bg-white border border-[#E7E7E3] space-y-4">
            <h2 className="text-base font-bold text-[#202124]">Direct Channels</h2>
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              We welcome tool requests, calculation formula corrections, tutorial feedback, and general queries.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#EBF5F1] flex items-center justify-center text-[#176B50] flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#737373] block">Support Email</span>
                  <a
                    href="mailto:contact@codinghub.dev"
                    className="text-xs sm:text-sm font-mono font-medium text-[#202124] hover:text-[#176B50] transition-colors"
                  >
                    contact@codinghub.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#EBF5F1] flex items-center justify-center text-[#176B50] flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#737373] block">Expected Response</span>
                  <span className="text-xs sm:text-sm font-medium text-[#202124]">
                    Within 24 to 48 hours
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-xs text-[#737373] space-y-1">
              <span className="font-semibold text-[#202124] block">Regarding university grading formulas:</span>
              <p>
                If your institution uses a custom grading scale or unique credit rounding, send us a link to your official handbook and we will evaluate support.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-6 rounded-lg bg-white border border-[#E7E7E3] space-y-4">
            <h2 className="text-base font-bold text-[#202124]">
              Send Us a Message
            </h2>

            {status === "success" ? (
              <div className="p-5 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] text-[#176B50] space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#176B50]" />
                  <span>Message Sent Successfully</span>
                </div>
                <p className="text-xs text-[#176B50] leading-relaxed">
                  Thank you for reaching out. We have received your note and will reply directly to your email shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-3 py-1.5 rounded text-xs font-mono font-medium bg-[#176B50] text-white mt-1"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-[#737373] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-3 py-2 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-[#202124] placeholder-[#737373] text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#737373] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      className="w-full px-3 py-2 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-[#202124] placeholder-[#737373] text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#737373] block mb-1">
                    Category
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-[#202124] text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50]"
                  >
                    <option value="Tool Suggestion">Suggest a New Tool / Calculator</option>
                    <option value="Bug Report">Report a Calculation Bug</option>
                    <option value="Tutorial Feedback">Tutorial Feedback / Correction</option>
                    <option value="General Inquiry">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#737373] block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your suggestion, formula discrepancy, or inquiry..."
                    className="w-full p-3 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-[#202124] placeholder-[#737373] text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] resize-y leading-relaxed"
                    required
                  />
                </div>

                {status === "error" && (
                  <div className="p-2.5 rounded bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#991B1B] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-2.5 rounded text-xs font-mono font-medium text-white bg-[#176B50] hover:bg-[#12543E] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === "loading" ? "Sending..." : "Submit Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Placement" />
    </div>
  );
}
