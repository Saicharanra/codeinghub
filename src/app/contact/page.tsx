"use client";

import React, { useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import AdSlot from "@/components/ads/AdSlot";
import { Mail, MessageSquare, CheckCircle2, AlertCircle, Clock, Send, Sparkles } from "lucide-react";

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
    // Simulate swift client processing
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "Tool Suggestion",
        message: "",
      });
    }, 700);
  };

  return (
    <div className="py-6 sm:py-10 space-y-12">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      <PageHeader
        badge="Direct Support"
        badgeColor="indigo"
        title="Contact Coding Hub"
        description="Have a question, tool request, or bug report? Reach out directly to our engineering and editorial team."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Response Guidelines */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-slate-800 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white">Get in Touch</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              We welcome feedback, tool feature suggestions, corrections on our tutorials, and partnership inquiries.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Official Support Email</span>
                  <a
                    href="mailto:contact@codinghub.dev"
                    className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
                  >
                    contact@codinghub.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Expected Response Time</span>
                  <span className="text-sm font-semibold text-slate-200">
                    Within 24 to 48 business hours
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300 block">Note regarding calculations:</span>
              <p>
                If you believe an academic calculator produced an unexpected result for your specific university, please include your institution&apos;s formula or grading guidelines in your message.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <span>Send Us a Message</span>
            </h2>

            {status === "success" ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-600/50 text-emerald-200 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2.5 font-bold text-emerald-300 text-base">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <span>Message Sent Successfully!</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-300/90 leading-relaxed">
                  Thank you for reaching out. We have received your submission and our team will get back to you at your provided email address shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Topic / Category
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Tool Suggestion">Suggest a New Tool / Feature</option>
                    <option value="Bug Report">Report a Calculator or Tool Bug</option>
                    <option value="Tutorial Feedback">Tutorial Content Feedback</option>
                    <option value="General Inquiry">General Question or Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your suggestion, formula discrepancy, or inquiry in detail..."
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
                    required
                  />
                </div>

                {status === "error" && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/50 text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-glow transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
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
