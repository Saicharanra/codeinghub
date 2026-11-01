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
import { toolsData, ToolItem } from "@/data/toolsData";

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
    GraduationCap: <GraduationCap className="w-6 h-6 text-indigo-400" />,
    Percent: <Percent className="w-6 h-6 text-blue-400" />,
    CalendarCheck: <CalendarCheck className="w-6 h-6 text-emerald-400" />,
    FileCode2: <FileCode2 className="w-6 h-6 text-purple-400" />,
    Type: <Type className="w-6 h-6 text-pink-400" />,
    CaseSensitive: <CaseSensitive className="w-6 h-6 text-cyan-400" />,
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
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-card border border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools by name, keyword (e.g. gpa, format, marks)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Current Active Filters */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
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
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid of Tools */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className="group p-6 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between shadow-card hover:shadow-glow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {iconMap[tool.icon] || <Sparkles className="w-6 h-6 text-indigo-400" />}
                  </div>
                  {tool.badge && (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                  {tool.category}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {tool.shortDescription}
                </p>

                {/* Feature Bullets */}
                <ul className="space-y-1.5 mb-6">
                  {tool.features.slice(0, 2).map((feat, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-indigo-400 transition-colors">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-surface-card border border-slate-800 space-y-4">
          <Search className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No tools found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            We couldn&apos;t find any tool matching &quot;{search}&quot;. Try clearing your query or checking our tutorials.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
}
