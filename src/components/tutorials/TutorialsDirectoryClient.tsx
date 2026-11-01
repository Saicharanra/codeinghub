"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
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
import { tutorialsData, TutorialItem } from "@/data/tutorialsData";

export default function TutorialsDirectoryClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "All"
  );

  const iconMap: Record<string, React.ReactNode> = {
    Code: <Code className="w-5 h-5 text-indigo-400" />,
    Database: <Database className="w-5 h-5 text-blue-400" />,
    BarChart3: <BarChart3 className="w-5 h-5 text-amber-400" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    Layout: <Layout className="w-5 h-5 text-purple-400" />,
    FileCode: <FileCode className="w-5 h-5 text-pink-400" />,
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
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-card border border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tutorials (e.g. Python, SQL window functions, DAX, React)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredTutorials.length}</strong> guides
        </span>
        {(search || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Tutorials Grid */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tut) => (
            <Link
              key={tut.id}
              href={`/tutorials/${tut.slug}`}
              className="group p-6 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between shadow-card hover:shadow-glow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {iconMap[tut.icon] || <BookOpen className="w-5 h-5 text-indigo-400" />}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tut.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                    {tut.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {tut.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2 line-clamp-2">
                  {tut.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {tut.summary}
                </p>

                {/* Learning Objectives Preview */}
                <div className="space-y-1 mb-6">
                  {tut.learningObjectives.slice(0, 2).map((obj, i) => (
                    <div key={i} className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      <span className="line-clamp-1">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-purple-300 transition-colors">
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-surface-card border border-slate-800 space-y-4">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No tutorials found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            We couldn&apos;t find any tutorial matching &quot;{search}&quot;. Try exploring all categories or checking our calculators.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
