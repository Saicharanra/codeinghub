"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
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

  const iconMap: Record<string, { icon: React.ReactNode; glow: string; border: string }> = {
    GraduationCap: {
      icon: <GraduationCap className="w-6 h-6 text-cyan-400" />,
      glow: "hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]",
      border: "hover:border-cyan-500/50",
    },
    Percent: {
      icon: <Percent className="w-6 h-6 text-sky-400" />,
      glow: "hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]",
      border: "hover:border-sky-500/50",
    },
    CalendarCheck: {
      icon: <CalendarCheck className="w-6 h-6 text-emerald-400" />,
      glow: "hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]",
      border: "hover:border-emerald-500/50",
    },
    FileCode2: {
      icon: <FileCode2 className="w-6 h-6 text-violet-400" />,
      glow: "hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]",
      border: "hover:border-violet-500/50",
    },
    Type: {
      icon: <Type className="w-6 h-6 text-fuchsia-400" />,
      glow: "hover:shadow-[0_0_25px_rgba(217,70,239,0.3)]",
      border: "hover:border-fuchsia-500/50",
    },
    CaseSensitive: {
      icon: <CaseSensitive className="w-6 h-6 text-pink-400" />,
      glow: "hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]",
      border: "hover:border-pink-500/50",
    },
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
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-[#0c101c]/90 border border-white/[0.08] shadow-sm backdrop-blur-md">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools by name, keyword (e.g. gpa, format, marks)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-500 hidden sm:block ml-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 border border-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Current Active Filters */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredTools.length}</strong> of{" "}
          {toolsData.length} interactive tools
        </span>
        {(search || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid of Tools */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const style = iconMap[tool.icon] || {
              icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
              glow: "hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]",
              border: "hover:border-cyan-500/50",
            };

            return (
              <Link
                key={tool.id}
                href={tool.path}
                className={`group p-6 rounded-3xl bg-[#0c101c]/90 hover:bg-[#12182c] border border-white/[0.08] ${style.border} transition-all duration-300 flex flex-col justify-between shadow-card hover:-translate-y-1 ${style.glow} backdrop-blur-sm`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      {style.icon}
                    </div>
                    {tool.badge && (
                      <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                    {tool.category}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-slate-100 transition-colors mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {tool.shortDescription}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {tool.features.slice(0, 2).map((feat, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-300 transition-colors">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#0c101c] border border-white/[0.08] space-y-4">
          <Search className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No tools found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto font-mono text-xs">
            We couldn&apos;t find any tool matching &quot;{search}&quot;. Try resetting your filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
}
