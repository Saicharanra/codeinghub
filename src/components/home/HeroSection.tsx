"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

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

  return (
    <section className="pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-[#E7E7E3]">
      <div className="max-w-3xl space-y-6">
        {/* Editorial Headline */}
        <h1 className="text-3xl sm:text-5xl font-semibold text-[#202124] tracking-tight leading-[1.2]">
          Useful tools for the work you do every day.
        </h1>

        {/* Supporting Description */}
        <p className="text-base sm:text-lg text-[#737373] leading-relaxed max-w-2xl font-normal">
          Simple, free and practical tools for students, developers and data professionals. Get your work done without unnecessary complexity.
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools by name (e.g. CGPA, JSON, Attendance)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FFFFFF] text-[#202124] placeholder-[#737373] text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors shadow-subtle"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-md bg-[#176B50] hover:bg-[#12543E] text-white text-sm font-medium transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Direct Text Links */}
        <div className="flex items-center gap-6 pt-2 text-sm">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-[#176B50] hover:text-[#12543E] font-medium transition-colors"
          >
            <span>Explore all tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-1.5 text-[#737373] hover:text-[#202124] transition-colors"
          >
            <span>Browse tutorials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
