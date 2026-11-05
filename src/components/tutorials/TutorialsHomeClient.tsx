"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  X,
  Code,
  Database,
  BarChart3,
  TrendingUp,
  Layout,
  Coffee,
  Sparkles,
  CheckCircle2,
  Bookmark,
  FileCode,
  Calculator,
} from "lucide-react";
import {
  tutorialsData,
  getFeaturedTutorials,
  getRecommendedTutorials,
  getLatestTutorials,
} from "@/data/tutorialsData";
import { categoriesData, TutorialCategory } from "@/data/categoriesData";
import { toolsData } from "@/data/toolsData";

function getCategoryIcon(name: string) {
  switch (name.toLowerCase()) {
    case "python":
      return <Code className="w-5 h-5 text-[#176B50]" />;
    case "sql":
      return <Database className="w-5 h-5 text-[#176B50]" />;
    case "power-bi":
      return <BarChart3 className="w-5 h-5 text-[#176B50]" />;
    case "data-analytics":
      return <TrendingUp className="w-5 h-5 text-[#176B50]" />;
    case "web-development":
      return <Layout className="w-5 h-5 text-[#176B50]" />;
    case "java":
      return <Coffee className="w-5 h-5 text-[#176B50]" />;
    default:
      return <BookOpen className="w-5 h-5 text-[#176B50]" />;
  }
}

export default function TutorialsHomeClient() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const featured = useMemo(() => getFeaturedTutorials(), []);
  const latest = useMemo(() => getLatestTutorials(6), []);
  const recommended = useMemo(() => getRecommendedTutorials(), []);

  // Filtered list when searching or filtering
  const filteredTutorials = useMemo(() => {
    return tutorialsData.filter((tut) => {
      const matchesCategory =
        selectedCategory === "All" ||
        tut.categorySlug.toLowerCase() === selectedCategory.toLowerCase() ||
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

  const isFiltering = search.trim().length > 0 || selectedCategory !== "All";

  return (
    <div className="space-y-12">
      {/* SECTION A: Page Header with Search & Filter Bar */}
      <section className="space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#EBF5F1] text-[#176B50] border border-[#C8E3D8] text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Learning Academy</span>
          </div>
          <h1 className="text-page-title font-bold text-[#202124] tracking-tight leading-[1.2]">
            Learn Something New.
          </h1>
          <p className="text-base sm:text-lg text-[#737373] max-w-2xl leading-relaxed font-normal">
            Clear, original, step-by-step programming, database, and analytics tutorials designed for students, developers, and aspiring data professionals.
          </p>
        </div>

        {/* Search Bar & Category Quick Pills */}
        <div className="space-y-3 p-4 sm:p-5 rounded-lg bg-white border border-[#E7E7E3] shadow-subtle">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tutorials by keyword (e.g. Python functions, SQL JOIN, Power Query, HTML, Java)..."
              className="w-full pl-10 pr-10 py-3 rounded-md bg-[#FAFAF8] border border-[#E7E7E3] text-[#202124] placeholder-[#737373] text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#737373] hover:text-[#202124]"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-1.5 rounded text-[13px] sm:text-[14px] font-medium whitespace-nowrap transition-colors ${
                selectedCategory === "All"
                  ? "bg-[#176B50] text-white font-semibold"
                  : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
              }`}
            >
              All Topics ({tutorialsData.length})
            </button>
            {categoriesData.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded text-[13px] sm:text-[14px] font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-[#176B50] text-white font-semibold"
                    : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* If the user is searching or has selected a specific category filter, show Search Results */}
      {isFiltering ? (
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-[#E7E7E3] pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#202124]">
              Search Results
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#737373]">
                Found <strong className="text-[#202124]">{filteredTutorials.length}</strong> matching guides
              </span>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="text-xs text-[#176B50] hover:underline font-mono ml-2"
              >
                Reset filters
              </button>
            </div>
          </div>

          {filteredTutorials.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-lg border border-[#E7E7E3] space-y-3">
              <BookOpen className="w-8 h-8 text-[#737373] mx-auto opacity-50" />
              <p className="text-base font-semibold text-[#202124]">
                No tutorials matched your criteria
              </p>
              <p className="text-xs text-[#737373] max-w-sm mx-auto">
                Try searching with different terms like &quot;SQL&quot;, &quot;Python&quot;, &quot;Power BI&quot;, or &quot;HTML&quot;.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 text-xs font-medium text-[#176B50] bg-[#EBF5F1] rounded border border-[#C8E3D8] hover:bg-[#DDF0E8] transition-colors"
              >
                View all tutorials
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTutorials.map((tut) => (
                <article
                  key={tut.id}
                  className="p-5 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-all flex flex-col justify-between space-y-4 group shadow-subtle hover:shadow-card"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#737373]">
                      <span className="font-semibold text-[#176B50] uppercase text-[11px]">
                        {tut.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{tut.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-card-title font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors leading-snug">
                      <Link href={`/tutorials/${tut.categorySlug}/${tut.slug}`}>
                        {tut.title}
                      </Link>
                    </h3>

                    <p className="text-[14px] sm:text-[15px] text-[#737373] leading-relaxed line-clamp-3">
                      {tut.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E7E7E3]">
                    <Link
                      href={`/tutorials/${tut.categorySlug}/${tut.slug}`}
                      className="w-full inline-flex items-center justify-between text-[14px] font-semibold text-[#176B50] group-hover:text-[#12543E] transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : (
        /* Curated Default Educational Portal Layout */
        <>
          {/* SECTION B: Featured Tutorials */}
          <section className="space-y-5">
            <div className="flex items-baseline justify-between border-b border-[#E7E7E3] pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-[#176B50]">
                  <Sparkles className="w-3.5 h-3.5 text-[#176B50]" />
                  <span>Editor&apos;s Selection</span>
                </div>
                <h2 className="text-section-title font-bold text-[#202124] tracking-tight mt-1 leading-[1.25]">
                  Featured Tutorials
                </h2>
              </div>
              <span className="text-xs font-mono text-[#737373]">
                Handcrafted core curriculums
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((tut) => (
                <article
                  key={tut.id}
                  className="p-6 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-all flex flex-col justify-between space-y-4 group shadow-subtle hover:shadow-card relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#EBF5F1] rounded-bl-full -mr-12 -mt-12 pointer-events-none" />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between text-xs font-mono text-[#737373]">
                      <span className="px-2 py-0.5 rounded bg-[#EBF5F1] text-[#176B50] font-semibold text-[11px] border border-[#C8E3D8]">
                        {tut.category}
                      </span>
                      <span className="flex items-center gap-1 text-[#737373]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{tut.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-card-title font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors leading-snug">
                      <Link href={`/tutorials/${tut.categorySlug}/${tut.slug}`}>
                        {tut.title}
                      </Link>
                    </h3>

                    <p className="text-[14px] sm:text-[15px] text-[#737373] leading-relaxed line-clamp-3">
                      {tut.summary}
                    </p>

                    {tut.learningObjectives && tut.learningObjectives.length > 0 && (
                      <div className="pt-2 text-xs text-[#202124] space-y-1">
                        <div className="flex items-center gap-1.5 text-[#176B50] font-medium text-[11px] font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Key learning:</span>
                        </div>
                        <p className="text-[13px] text-[#737373] line-clamp-1 italic">
                          {tut.learningObjectives[0]}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E7E7E3] relative z-10">
                    <Link
                      href={`/tutorials/${tut.categorySlug}/${tut.slug}`}
                      className="w-full inline-flex items-center justify-between text-[14px] font-semibold text-[#176B50] group-hover:text-[#12543E] transition-colors"
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION C: Browse Categories */}
          <section className="space-y-5">
            <div className="flex items-baseline justify-between border-b border-[#E7E7E3] pb-3">
              <div>
                <h2 className="text-section-title font-bold text-[#202124] tracking-tight leading-[1.25]">
                  Browse by Learning Track
                </h2>
                <p className="text-[15px] sm:text-base text-[#737373] mt-1 leading-relaxed">
                  Explore full curriculums structured across six technical domains.
                </p>
              </div>
              <span className="text-xs font-mono text-[#737373]">
                6 Tracks
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoriesData.map((cat) => {
                const count = tutorialsData.filter(
                  (t) => t.categorySlug.toLowerCase() === cat.slug.toLowerCase()
                ).length;

                return (
                  <Link
                    key={cat.id}
                    href={cat.path}
                    className="p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-all flex flex-col justify-between space-y-3 group shadow-subtle hover:shadow-card"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] flex items-center justify-center group-hover:scale-105 transition-transform">
                          {getCategoryIcon(cat.slug)}
                        </div>
                        <span className="text-xs font-mono text-[#737373] px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E3]">
                          {count} {count === 1 ? "Guide" : "Guides"}
                        </span>
                      </div>

                      <h3 className="text-card-title font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors">
                        {cat.name}
                      </h3>

                      <p className="text-[14px] text-[#737373] leading-relaxed line-clamp-2">
                        {cat.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F0F0EC] flex items-center justify-between text-[14px] font-semibold text-[#176B50]">
                      <span>Explore {cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* SECTION D: Latest Tutorials */}
          <section className="space-y-5">
            <div className="flex items-baseline justify-between border-b border-[#E7E7E3] pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
                  Latest Technical Tutorials
                </h2>
                <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
                  Recently published and updated educational references.
                </p>
              </div>
            </div>

            <div className="divide-y divide-[#E7E7E3] border-y border-[#E7E7E3] bg-white rounded-lg">
              {latest.map((tut) => (
                <article
                  key={tut.id}
                  className="p-5 sm:p-6 group hover:bg-[#FAFAF8] transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-baseline">
                    <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between text-xs text-[#737373]">
                      <span className="font-semibold text-[#176B50] uppercase tracking-wider text-[11px] font-mono">
                        {tut.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#737373] mt-1">
                        {tut.readTime} read
                      </span>
                    </div>

                    <div className="md:col-span-7 space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#202124] group-hover:text-[#176B50] transition-colors leading-snug">
                        <Link href={`/tutorials/${tut.categorySlug}/${tut.slug}`}>
                          {tut.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-[#737373] leading-relaxed line-clamp-2">
                        {tut.summary}
                      </p>
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                      <Link
                        href={`/tutorials/${tut.categorySlug}/${tut.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#176B50] group-hover:text-[#12543E] transition-colors whitespace-nowrap"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION E: Recommended Tutorials */}
          <section className="space-y-5">
            <div className="flex items-baseline justify-between border-b border-[#E7E7E3] pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-[#176B50]">
                  <Bookmark className="w-3.5 h-3.5 text-[#176B50]" />
                  <span>Curated Foundations</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight mt-0.5">
                  Recommended Learning Guides
                </h2>
              </div>
              <span className="text-xs font-mono text-[#737373]">
                Carefully selected by educators
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recommended.map((tut) => (
                <div
                  key={tut.id}
                  className="p-5 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-colors flex flex-col justify-between space-y-3 group shadow-subtle"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#737373]">
                      <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-[#176B50] font-semibold text-[11px]">
                        {tut.category}
                      </span>
                      <span>{tut.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#202124] group-hover:text-[#176B50] transition-colors">
                      <Link href={`/tutorials/${tut.categorySlug}/${tut.slug}`}>
                        {tut.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#737373] leading-relaxed line-clamp-2">
                      {tut.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F0F0EC] flex items-center justify-between text-xs font-semibold text-[#176B50]">
                    <span>View Tutorial</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION F: Related Tools */}
          <section className="p-6 sm:p-8 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] space-y-5">
            <div className="space-y-1">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B50]">
                Connected Ecosystem
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
                Practice With Free Coding Hub Tools
              </h2>
              <p className="text-xs sm:text-sm text-[#737373] max-w-2xl leading-relaxed">
                Connect educational concepts directly to our client-side calculators and development tools. Zero tracking, instant outputs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] space-y-2.5 shadow-subtle">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#176B50]">
                  <FileCode className="w-4 h-4" />
                  <span>Data & APIs</span>
                </div>
                <h4 className="text-sm font-semibold text-[#202124]">
                  JSON Formatter & Validator
                </h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Clean, minify, or validate raw JSON payloads generated from your Python, SQL, or REST API experiments.
                </p>
                <Link
                  href="/tools/json-formatter"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#176B50] hover:text-[#12543E] pt-1"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] space-y-2.5 shadow-subtle">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#176B50]">
                  <Calculator className="w-4 h-4" />
                  <span>College & University</span>
                </div>
                <h4 className="text-sm font-semibold text-[#202124]">
                  CGPA & Percentage Calculators
                </h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Accurately project cumulative semester GPAs and convert marks to standard percentages without registration.
                </p>
                <Link
                  href="/tools/cgpa-calculator"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#176B50] hover:text-[#12543E] pt-1"
                >
                  <span>Calculate CGPA</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] space-y-2.5 shadow-subtle">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#176B50]">
                  <Code className="w-4 h-4" />
                  <span>Text & Content</span>
                </div>
                <h4 className="text-sm font-semibold text-[#202124]">
                  Text Case Converter & Counter
                </h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Quickly transform variable names to camelCase, snake_case, or kebab-case, and inspect word counts and reading time.
                </p>
                <Link
                  href="/tools/text-case-converter"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#176B50] hover:text-[#12543E] pt-1"
                >
                  <span>Convert Case</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}