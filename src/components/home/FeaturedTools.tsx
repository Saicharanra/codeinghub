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
  Sparkles,
} from "lucide-react";
import { toolsData } from "@/data/toolsData";

export default function FeaturedTools() {
  const iconMap: Record<string, { icon: React.ReactNode; glow: string; border: string }> = {
    GraduationCap: {
      icon: <GraduationCap className="w-6 h-6 text-cyan-400" />,
      glow: "group-hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]",
      border: "group-hover:border-cyan-500/50",
    },
    Percent: {
      icon: <Percent className="w-6 h-6 text-sky-400" />,
      glow: "group-hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]",
      border: "group-hover:border-sky-500/50",
    },
    CalendarCheck: {
      icon: <CalendarCheck className="w-6 h-6 text-emerald-400" />,
      glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]",
      border: "group-hover:border-emerald-500/50",
    },
    FileCode2: {
      icon: <FileCode2 className="w-6 h-6 text-violet-400" />,
      glow: "group-hover:shadow-[0_0_25px_rgba(139,92,246,0.35)]",
      border: "group-hover:border-violet-500/50",
    },
    Type: {
      icon: <Type className="w-6 h-6 text-fuchsia-400" />,
      glow: "group-hover:shadow-[0_0_25px_rgba(217,70,239,0.35)]",
      border: "group-hover:border-fuchsia-500/50",
    },
    CaseSensitive: {
      icon: <CaseSensitive className="w-6 h-6 text-pink-400" />,
      glow: "group-hover:shadow-[0_0_25px_rgba(236,72,153,0.35)]",
      border: "group-hover:border-pink-500/50",
    },
  };

  return (
    <section className="my-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Tool Suite</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Tools
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Tested, zero-bloat calculators designed to solve everyday calculations and text operations immediately.
          </p>
        </div>

        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <span>All 6 Free Tools</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsData.map((tool) => {
          const style = iconMap[tool.icon] || {
            icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
            glow: "group-hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]",
            border: "group-hover:border-cyan-500/50",
          };

          return (
            <Link
              key={tool.id}
              href={tool.path}
              className={`group relative p-6 rounded-2xl bg-[#0c101c]/90 hover:bg-[#12182c] border border-white/[0.08] ${style.border} transition-all duration-300 flex flex-col justify-between shadow-card hover:-translate-y-1 ${style.glow} backdrop-blur-sm`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {tool.shortDescription}
                </p>

                {/* Features preview */}
                <div className="space-y-1 mb-4">
                  {tool.features.slice(0, 2).map((f, i) => (
                    <div key={i} className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                      <span className="line-clamp-1">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-300 transition-colors">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
