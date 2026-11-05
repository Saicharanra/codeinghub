import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Percent,
  CalendarCheck,
  FileCode2,
  Type,
  CaseSensitive,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { toolsData } from "@/data/toolsData";

function getToolIcon(iconName: string) {
  switch (iconName) {
    case "GraduationCap":
      return <GraduationCap className="w-5 h-5 text-[#176B50]" />;
    case "Percent":
      return <Percent className="w-5 h-5 text-[#176B50]" />;
    case "CalendarCheck":
      return <CalendarCheck className="w-5 h-5 text-[#176B50]" />;
    case "FileCode2":
      return <FileCode2 className="w-5 h-5 text-[#176B50]" />;
    case "Type":
      return <Type className="w-5 h-5 text-[#176B50]" />;
    case "CaseSensitive":
      return <CaseSensitive className="w-5 h-5 text-[#176B50]" />;
    default:
      return <FileCode2 className="w-5 h-5 text-[#176B50]" />;
  }
}

export default function FeaturedTools() {
  return (
    <section className="py-12 sm:py-16 border-b border-[#E7E7E3]" id="popular-tools">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
        <div>
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B50] mb-1">
            Productivity Suite
          </div>
          <h2 className="text-section-title font-bold text-[#202124] tracking-tight leading-[1.25]">
            Popular Free Tools
          </h2>
          <p className="text-[15px] sm:text-base text-[#737373] mt-1.5 leading-relaxed">
            Browser-based utilities for students and engineers. Fast, responsive, and 100% private.
          </p>
        </div>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#176B50] hover:text-[#12543E] transition-colors"
        >
          <span>View all tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Unified 6-Tool Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {toolsData.map((tool) => (
          <Link
            key={tool.id}
            href={tool.path}
            className="group p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-all flex flex-col justify-between space-y-4 shadow-subtle hover:shadow-card active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#176B50]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getToolIcon(tool.icon)}
                </div>
                <span className="text-[11px] font-mono text-[#737373] px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E3]">
                  {tool.category}
                </span>
              </div>

              <div>
                <h3 className="text-card-title font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#737373] leading-relaxed mt-2 line-clamp-2">
                  {tool.shortDescription}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0F0EC] flex items-center justify-between text-[14px] sm:text-[15px] font-semibold text-[#176B50] group-hover:text-[#12543E]">
              <span>Open Tool</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}