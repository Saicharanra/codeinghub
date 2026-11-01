"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
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
    <div className="space-y-6">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-lg bg-white border border-[#E7E7E3]">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tutorials (e.g. Python, SQL window functions, DAX, React)..."
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

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors ${
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

      {/* Counter */}
      <div className="flex items-center justify-between text-xs font-mono text-[#737373] px-1">
        <span>
          Showing <strong className="text-[#202124]">{filteredTutorials.length}</strong> guides
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

      {/* Editorial Article List */}
      {filteredTutorials.length > 0 ? (
        <div className="border border-[#E7E7E3] rounded-lg bg-white divide-y divide-[#E7E7E3]">
          {filteredTutorials.map((tut) => (
            <article
              key={tut.id}
              className="p-5 sm:p-6 hover:bg-[#FAFAF8] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#176B50] font-semibold">
                    {tut.category}
                  </span>
                  <span className="text-[#E7E7E3]">•</span>
                  <span className="text-[11px] font-mono text-[#737373]">
                    {tut.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#737373]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tut.readTime}</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-[#202124] hover:text-[#176B50] transition-colors mb-2">
                <Link href={`/tutorials/${tut.slug}`}>
                  {tut.title}
                </Link>
              </h2>

              <p className="text-sm text-[#737373] leading-relaxed max-w-3xl mb-3">
                {tut.summary}
              </p>

              <div>
                <Link
                  href={`/tutorials/${tut.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B50] hover:underline"
                >
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-lg bg-white border border-[#E7E7E3] space-y-3">
          <BookOpen className="w-8 h-8 text-[#737373] mx-auto" />
          <h3 className="text-base font-semibold text-[#202124]">No tutorials found</h3>
          <p className="text-xs text-[#737373] max-w-sm mx-auto">
            We couldn&apos;t find any tutorial matching &quot;{search}&quot;. Try exploring other categories.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="px-3.5 py-1.5 rounded text-xs font-mono font-medium bg-[#176B50] text-white"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
