"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  Code,
  Database,
  BarChart3,
  TrendingUp,
  Layout,
  FileCode,
  X,
} from "lucide-react";
import { tutorialsData } from "@/data/tutorialsData";

export default function TutorialsDirectoryClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "All"
  );

  const iconMap: Record<string, { icon: React.ReactNode; tag: string }> = {
    Code: { icon: <Code className="w-5 h-5 text-cyan-400" />, tag: "#Python" },
    Database: { icon: <Database className="w-5 h-5 text-indigo-400" />, tag: "#SQL" },
    BarChart3: { icon: <BarChart3 className="w-5 h-5 text-amber-400" />, tag: "#PowerBI" },
    TrendingUp: { icon: <TrendingUp className="w-5 h-5 text-emerald-400" />, tag: "#Analytics" },
    Layout: { icon: <Layout className="w-5 h-5 text-violet-400" />, tag: "#Nextjs" },
    FileCode: { icon: <FileCode className="w-5 h-5 text-pink-400" />, tag: "#JavaScript" },
  };

  const categories = [
    "All",
    "Python Programming",
    "SQL",
    "Power BI",
    "Data Analytics",
    "Web Development",
    "JavaScript",
  ];

  const filteredTutorials = useMemo(() => {
    return tutorialsData.filter((tut) => {
      const matchesCategory =
        selectedCategory === "All" ||
        tut.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        tut.title.toLowerCase().includes(q) ||
        tut.subtitle.toLowerCase().includes(q) ||
        tut.summary.toLowerCase().includes(q) ||
        tut.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-[#0c101c]/90 border border-white/[0.08] shadow-sm backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tutorials (e.g. Python, SQL window functions, DAX, React)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
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

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 border border-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredTutorials.length}</strong> guides
        </span>
        {(search || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="text-violet-400 hover:text-violet-300 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Tutorials Grid */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tut) => {
            const meta = iconMap[tut.icon] || {
              icon: <BookOpen className="w-5 h-5 text-violet-400" />,
              tag: "#Tech",
            };

            return (
              <Link
                key={tut.id}
                href={`/tutorials/${tut.slug}`}
                className="group p-6 rounded-3xl bg-[#0c101c]/90 hover:bg-[#12182c] border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between shadow-card hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      {meta.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">{meta.tag}</span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{tut.readTime}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40">
                      {tut.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {tut.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors mb-2 line-clamp-2">
                    {tut.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {tut.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-violet-300 transition-colors">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#0c101c] border border-white/[0.08] space-y-4">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No tutorials found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto font-mono text-xs">
            We couldn&apos;t find any tutorial matching &quot;{search}&quot;. Try exploring other categories.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-violet-600 to-pink-600 text-white"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
