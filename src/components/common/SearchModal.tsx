"use client";

import React, { useState, useEffect, useMemo } from "react";
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#0c101c] rounded-3xl border border-white/[0.12] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-white/[0.08] bg-white/[0.02]">
          <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search tools (CGPA, JSON, Word Counter...) or guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] mr-2"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono text-slate-400 bg-white/[0.06] hover:bg-white/[0.12] rounded-lg border border-white/[0.08]"
          >
            ESC
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-white/[0.06] text-xs font-mono">
          <span className="text-slate-500">Scope:</span>
          {(["all", "tools", "tutorials"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-lg capitalize transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-sm"
                  : "bg-white/[0.04] text-slate-400 hover:text-white"
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
              <p className="text-base font-semibold text-slate-300">No matching tools or tutorials</p>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Try searching for &quot;GPA&quot;, &quot;Attendance&quot;, &quot;JSON&quot;, or &quot;SQL&quot;.
              </p>
            </div>
          )}

          {/* Tools Results */}
          {activeFilter !== "tutorials" && filteredTools.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 px-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Tools ({filteredTools.length})</span>
              </div>
              <div className="space-y-2">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => navigateTo(tool.path)}
                    className="w-full text-left p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-cyan-500/40 transition-all duration-200 group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Code className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200 group-hover:text-white">
                            {tool.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400">
                            {tool.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tutorials Results */}
          {activeFilter !== "tools" && filteredTutorials.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 px-2 text-xs font-mono font-semibold text-violet-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Technical Guides ({filteredTutorials.length})</span>
              </div>
              <div className="space-y-2">
                {filteredTutorials.map((tut) => (
                  <button
                    key={tut.id}
                    onClick={() => navigateTo(`/tutorials/${tut.slug}`)}
                    className="w-full text-left p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-violet-500/40 transition-all duration-200 group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-400">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200 group-hover:text-white">
                            {tut.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-950/60 text-violet-300 border border-violet-800/40">
                            {tut.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {tut.summary}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-black/60 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Navigate with mouse or keyboard</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
