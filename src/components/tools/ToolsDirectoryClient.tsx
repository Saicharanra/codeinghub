"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  GraduationCap,
  Percent,
  CalendarCheck,
  FileCode2,
  Type,
  CaseSensitive,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import { toolsData } from "@/data/toolsData";

export default function ToolsDirectoryClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory === "student"
      ? "Student Tools"
      : initialCategory === "developer"
      ? "Developer Tools"
      : "All"
  );

  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-4 h-4 text-[#176B50]" />,
    Percent: <Percent className="w-4 h-4 text-[#176B50]" />,
    CalendarCheck: <CalendarCheck className="w-4 h-4 text-[#176B50]" />,
    FileCode2: <FileCode2 className="w-4 h-4 text-[#176B50]" />,
    Type: <Type className="w-4 h-4 text-[#176B50]" />,
    CaseSensitive: <CaseSensitive className="w-4 h-4 text-[#176B50]" />,
  };

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;

      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const categories = ["All", "Student Tools", "Developer Tools"];

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-lg bg-white border border-[#E7E7E3]">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools (e.g. gpa, format, marks)..."
            className="w-full pl-9 pr-9 py-2 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-[#202124] placeholder-[#737373] text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#737373] hover:text-[#202124]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-[13px] sm:text-[14px] font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#176B50] text-white font-semibold"
                  : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Clear */}
      <div className="flex items-center justify-between text-xs font-mono text-[#737373] px-1">
        <span>
          Showing <strong className="text-[#202124]">{filteredTools.length}</strong> of{" "}
          {toolsData.length} tools
        </span>
        {(search || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="text-[#176B50] hover:underline font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid of Tools */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => {
            const icon = iconMap[tool.icon] || <Sparkles className="w-4 h-4 text-[#176B50]" />;

            return (
              <Link
                key={tool.id}
                href={tool.path}
                className="group p-5 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded bg-[#EBF5F1] flex items-center justify-center">
                      {icon}
                    </div>
                    {tool.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFAF8] text-[#737373] border border-[#E7E7E3]">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mb-1">
                    {tool.category}
                  </div>
                  <h3 className="text-card-title font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors mb-1.5">
                    {tool.name}
                  </h3>
                  <p className="text-[14px] text-[#737373] leading-relaxed mb-4">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E7E3] flex items-center justify-between text-[14px] font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors">
                  <span>Open tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-lg bg-white border border-[#E7E7E3] space-y-3">
          <Search className="w-8 h-8 text-[#737373] mx-auto" />
          <h3 className="text-base font-semibold text-[#202124]">No tools found</h3>
          <p className="text-xs text-[#737373] max-w-sm mx-auto">
            We couldn&apos;t find any tool matching &quot;{search}&quot;. Try resetting your filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="px-3.5 py-1.5 rounded text-xs font-mono font-medium bg-[#176B50] text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
