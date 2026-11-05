"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, ShieldCheck, Zap, BookOpen } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/tools");
    }
  };

  const quickPills = [
    { label: "CGPA Calculator", href: "/tools/cgpa-calculator" },
    { label: "JSON Formatter", href: "/tools/json-formatter" },
    { label: "Attendance", href: "/tools/attendance-calculator" },
    { label: "Python", href: "/tutorials/python" },
    { label: "SQL", href: "/tutorials/sql" },
  ];

  return (
    <section className="pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#E7E7E3]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headlines & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Subtle Editorial Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5F1] border border-[#C8E3D8] text-xs font-mono text-[#176B50]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#176B50]" />
            <span>Free &amp; Open Learning Platform • Zero Sign-Up Required</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-hero font-extrabold text-[#202124] tracking-tight leading-[1.15]">
            Everything You Need to Learn, Build and Grow.
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg text-[#737373] leading-relaxed max-w-2xl font-normal">
            Coding Hub provides free, client-side developer utilities, student academic calculators, and clear, structured programming tutorials. Built for students, engineers, and data learners to get real work done with complete privacy.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#176B50] hover:bg-[#12543E] text-white text-[15px] sm:text-base font-semibold transition-all shadow-sm hover:shadow active:scale-[0.99]"
            >
              <span>Explore Free Tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tutorials"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white hover:bg-[#FAFAF8] text-[#202124] hover:text-[#176B50] border border-[#E7E7E3] hover:border-[#D3D3CD] text-[15px] sm:text-base font-semibold transition-all shadow-subtle"
            >
              <span>Start Learning</span>
              <BookOpen className="w-4 h-4 text-[#737373]" />
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-[#737373] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find a tool or tutorial (e.g. CGPA, JSON, SQL Joins, Python)..."
                className="w-full pl-10 pr-24 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FFFFFF] text-[#202124] placeholder-[#737373] text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors shadow-subtle"
              />
              <button
                type="submit"
                className="absolute right-1 px-3 py-1.5 rounded bg-[#FAFAF8] hover:bg-[#F0F0EC] border border-[#E7E7E3] text-[#202124] text-[13px] font-mono font-medium transition-colors"
              >
                Search
              </button>
            </div>
            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 text-xs text-[#737373]">
              <span className="font-mono text-[11px]">Popular:</span>
              {quickPills.map((pill) => (
                <Link
                  key={pill.label}
                  href={pill.href}
                  className="px-2 py-0.5 rounded bg-white hover:bg-[#FAFAF8] border border-[#E7E7E3] text-[#737373] hover:text-[#176B50] font-mono text-[11px] transition-colors"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </form>
        </div>

        {/* Right Column: Attractive Minimal Visual Composition */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-[#E7E7E3] bg-white p-5 sm:p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E7E3] pb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B50]">
                Platform Foundations
              </span>
              <span className="text-[11px] font-mono text-[#737373] px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E3]">
                100% Free
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3]">
                <div className="w-8 h-8 rounded bg-[#EBF5F1] text-[#176B50] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-[#202124]">Client-Side Privacy</h4>
                  <p className="text-[13px] sm:text-[14px] text-[#737373] leading-relaxed mt-0.5">
                    All GPA, attendance, JSON, and text conversions execute in your browser. No grades or code are sent to external servers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3]">
                <div className="w-8 h-8 rounded bg-[#EBF5F1] text-[#176B50] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-[#202124]">Instant Calculation Engine</h4>
                  <p className="text-[13px] sm:text-[14px] text-[#737373] leading-relaxed mt-0.5">
                    Zero latency, zero popups, zero sign-up friction. Calculate cumulative averages or format payloads instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3]">
                <div className="w-8 h-8 rounded bg-[#EBF5F1] text-[#176B50] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-[#202124]">Structured Tech Curriculums</h4>
                  <p className="text-[13px] sm:text-[14px] text-[#737373] leading-relaxed mt-0.5">
                    Original, production-tested guides in Python, SQL, Power BI, Java, and Data Analytics written by engineers.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/about"
                className="text-xs font-mono text-[#737373] hover:text-[#176B50] underline inline-flex items-center gap-1"
              >
                <span>Read our mission &amp; engineering principles</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}