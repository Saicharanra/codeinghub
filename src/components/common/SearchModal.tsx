"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-[#202124]/30 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-[#FFFFFF] rounded-lg border border-[#E7E7E3] shadow-lg overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative flex items-center px-4 border-b border-[#E7E7E3] bg-[#FAFAF8]">
          <Search className="w-4 h-4 text-[#737373] mr-2.5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search tools or tutorials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-3.5 bg-transparent text-[#202124] placeholder-[#737373] focus:outline-none text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#737373] hover:text-[#202124] rounded mr-2"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-1.5 py-0.5 text-[10px] font-mono text-[#737373] bg-[#FFFFFF] border border-[#E7E7E3] rounded"
          >
            ESC
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#E7E7E3] bg-[#FAFAF8] text-xs">
          <span className="text-[#737373]">Filter:</span>
          {(["all", "tools", "tutorials"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-0.5 rounded text-xs capitalize transition-colors ${
                activeFilter === filter
                  ? "bg-[#176B50] text-white font-medium"
                  : "bg-transparent text-[#737373] hover:text-[#202124]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {!hasResults && (
            <div className="py-8 text-center text-[#737373]">
              <p className="text-sm font-medium text-[#202124]">No matching results</p>
              <p className="text-xs text-[#737373] mt-1">
                Try searching for &quot;GPA&quot;, &quot;Attendance&quot;, &quot;JSON&quot;, or &quot;SQL&quot;.
              </p>
            </div>
          )}

          {activeFilter !== "tutorials" && filteredTools.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider mb-2">
                Tools
              </div>
              <div className="space-y-1.5">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => navigateTo(tool.path)}
                    className="w-full text-left p-2.5 rounded-md hover:bg-[#FAFAF8] border border-transparent hover:border-[#E7E7E3] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#202124] group-hover:text-[#176B50]">
                        {tool.name}
                      </div>
                      <div className="text-xs text-[#737373] line-clamp-1">
                        {tool.shortDescription}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#176B50] flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeFilter !== "tools" && filteredTutorials.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider mb-2">
                Tutorials
              </div>
              <div className="space-y-1.5">
                {filteredTutorials.map((tut) => (
                  <button
                    key={tut.id}
                    onClick={() => navigateTo(`/tutorials/${tut.categorySlug}/${tut.slug}`)}
                    className="w-full text-left p-2.5 rounded-md hover:bg-[#FAFAF8] border border-transparent hover:border-[#E7E7E3] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#202124] group-hover:text-[#176B50]">
                        {tut.title}
                      </div>
                      <div className="text-xs text-[#737373] line-clamp-1">
                        {tut.summary}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#176B50] flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
