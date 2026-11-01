"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Calculator, Code, BookOpen, ArrowRight } from "lucide-react";
import { toolsData } from "@/data/toolsData";
import { tutorialsData } from "@/data/tutorialsData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "tools" | "tutorials">("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isOpen]);

  const filteredTools = useMemo(() => {
    if (!query.trim()) return toolsData.slice(0, 4);
    const q = query.toLowerCase();
    return toolsData.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredTutorials = useMemo(() => {
    if (!query.trim()) return tutorialsData.slice(0, 4);
    const q = query.toLowerCase();
    return tutorialsData.filter(
      (tut) =>
        tut.title.toLowerCase().includes(q) ||
        tut.summary.toLowerCase().includes(q) ||
        tut.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  const navigateTo = (path: string) => {
    onClose();
    router.push(path);
  };

  const hasResults =
    (activeFilter !== "tutorials" && filteredTools.length > 0) ||
    (activeFilter !== "tools" && filteredTutorials.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-surface rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-slate-800 bg-surface-card/60">
          <Search className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search tools (CGPA, JSON, Word Counter...) or tutorials (Python, SQL...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 mr-2"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-slate-400 bg-slate-800/80 hover:bg-slate-700 rounded border border-slate-700/60"
          >
            ESC
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/60 text-xs">
          <span className="text-slate-400">Filter:</span>
          {(["all", "tools", "tutorials"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full capitalize transition-colors ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white font-medium"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!hasResults && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-lg font-medium text-slate-300">No matching tools or tutorials</p>
              <p className="text-sm text-slate-500 mt-1">
                Try searching for keywords like &quot;GPA&quot;, &quot;Percentage&quot;, &quot;JSON&quot;, or &quot;Python&quot;.
              </p>
            </div>
          )}

          {/* Tools Results */}
          {activeFilter !== "tutorials" && filteredTools.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                <span>Interactive Tools ({filteredTools.length})</span>
              </div>
              <div className="space-y-2">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => navigateTo(tool.path)}
                    className="w-full text-left p-3 rounded-xl bg-slate-900/40 hover:bg-slate-800/70 border border-slate-800/60 hover:border-indigo-500/50 transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300">
                        <Code className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-200 group-hover:text-white">
                            {tool.name}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            {tool.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tutorials Results */}
          {activeFilter !== "tools" && filteredTutorials.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>Tutorials & Guides ({filteredTutorials.length})</span>
              </div>
              <div className="space-y-2">
                {filteredTutorials.map((tut) => (
                  <button
                    key={tut.id}
                    onClick={() => navigateTo(`/tutorials/${tut.slug}`)}
                    className="w-full text-left p-3 rounded-xl bg-slate-900/40 hover:bg-slate-800/70 border border-slate-800/60 hover:border-purple-500/50 transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:text-purple-300">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-200 group-hover:text-white">
                            {tut.title}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                            {tut.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {tut.summary}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
