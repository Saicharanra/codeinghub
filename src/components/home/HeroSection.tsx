"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Calculator,
  CheckCircle2,
  FileCode2,
} from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePreview, setActivePreview] = useState<"attendance" | "json" | "cgpa">("attendance");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/tools");
    }
  };

  const quickShortcuts = [
    { label: "CGPA Calculator", path: "/tools/cgpa-calculator", icon: "🎓" },
    { label: "75% Attendance Check", path: "/tools/attendance-calculator", icon: "📅" },
    { label: "JSON Formatter", path: "/tools/json-formatter", icon: "{ }" },
    { label: "Text Case Converter", path: "/tools/text-case-converter", icon: "Aa" },
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden text-center">
      {/* Aurora mesh background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-violet-600/25 to-fuchsia-600/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-pink-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Sleek status pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-slate-300 shadow-spotlight backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>100% Client-Side Execution • Zero Tracking • Instant Calculation</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12]">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(139,92,246,0.35)]">
            Learn, Build & Calculate.
          </span>
        </h1>

        {/* Supporting Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
          Fast, privacy-focused calculators for college students and everyday developer utilities for coders. No account barriers, zero intrusive ads over your work, and 100% free.
        </p>

        {/* Search Bar Input with Electric Glow */}
        <div className="max-w-2xl mx-auto space-y-3">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center shadow-[0_0_30px_-5px_rgba(139,92,246,0.25)] rounded-2xl bg-[#0c101c]/90 border border-white/[0.12] focus-within:border-cyan-400/80 focus-within:shadow-[0_0_35px_rgba(34,211,238,0.3)] transition-all duration-300 p-1.5 backdrop-blur-xl"
          >
            <Search className="w-5 h-5 text-cyan-400 ml-3.5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (CGPA, JSON, Attendance, Percentage...) or guides..."
              className="w-full px-4 py-3 bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-200 active:scale-95 flex-shrink-0 shadow-md"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Clickable Pill Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-xs text-slate-500 font-mono">Popular:</span>
            {quickShortcuts.map((sc) => (
              <Link
                key={sc.label}
                href={sc.path}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-violet-500/50 text-xs text-slate-300 hover:text-white transition-all duration-200"
              >
                <span>{sc.icon}</span>
                <span>{sc.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-glow-multi transition-all duration-200 active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>Explore Tools Directory</span>
          </Link>

          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] transition-all duration-200 active:scale-95"
          >
            <Terminal className="w-4 h-4 text-violet-400" />
            <span>Browse Tech Tutorials</span>
          </Link>
        </div>

        {/* Interactive Live Preview Mockup Card */}
        <div className="pt-8 max-w-2xl mx-auto text-left">
          <div className="rounded-2xl border border-white/[0.1] bg-[#0b0f1d]/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Header Tabs */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="text-xs font-mono text-slate-500 ml-2">live-sandbox.ts</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActivePreview("attendance")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    activePreview === "attendance"
                      ? "bg-violet-600/30 text-violet-300 border border-violet-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Attendance
                </button>
                <button
                  onClick={() => setActivePreview("json")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    activePreview === "json"
                      ? "bg-cyan-600/30 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  JSON Validator
                </button>
                <button
                  onClick={() => setActivePreview("cgpa")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    activePreview === "cgpa"
                      ? "bg-fuchsia-600/30 text-fuchsia-300 border border-fuchsia-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  CGPA Engine
                </button>
              </div>
            </div>

            {/* Preview Body */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-2">
              {activePreview === "attendance" && (
                <div className="space-y-2">
                  <div className="text-slate-400 flex items-center justify-between">
                    <span>Input: <strong className="text-white">34 attended</strong> / <strong className="text-white">48 held</strong></span>
                    <span className="text-amber-400 font-bold">70.83% Current</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-600/30 text-amber-200 flex items-center justify-between">
                    <span>Target: 75.0% Criteria</span>
                    <span className="font-bold text-amber-300">➜ Attend next 8 consecutive classes</span>
                  </div>
                </div>
              )}

              {activePreview === "json" && (
                <div className="space-y-2">
                  <div className="text-slate-400 flex items-center justify-between">
                    <span>RFC 8259 Validator: <strong className="text-emerald-400">PASSED</strong></span>
                    <span className="text-slate-500 text-[11px]">0.02ms latency</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/[0.08] text-cyan-300 overflow-x-auto text-[11px]">
                    <code>{`{ "status": 200, "valid": true, "privacy": "client-side" }`}</code>
                  </div>
                </div>
              )}

              {activePreview === "cgpa" && (
                <div className="space-y-2">
                  <div className="text-slate-400 flex items-center justify-between">
                    <span>Semesters: <strong>4 Terms (83 Credits)</strong></span>
                    <span className="text-emerald-400 font-bold">3.85 / 4.00</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-600/30 text-emerald-200 flex items-center justify-between">
                    <span>Classification</span>
                    <span className="font-bold text-emerald-300">Summa Cum Laude / High Distinction</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Data Storage</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-violet-400" />
            <span>Verified Formulas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
