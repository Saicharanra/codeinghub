import React from "react";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Code, Database, BarChart3, TrendingUp, Layout, FileCode, Sparkles } from "lucide-react";
import { tutorialsData } from "@/data/tutorialsData";

export default function PopularTutorials() {
  const iconMap: Record<string, { icon: React.ReactNode; color: string; tag: string }> = {
    Code: { icon: <Code className="w-5 h-5 text-cyan-400" />, color: "text-cyan-400", tag: "#Python3" },
    Database: { icon: <Database className="w-5 h-5 text-indigo-400" />, color: "text-indigo-400", tag: "#PostgreSQL" },
    BarChart3: { icon: <BarChart3 className="w-5 h-5 text-amber-400" />, color: "text-amber-400", tag: "#DAX_VertiPaq" },
    TrendingUp: { icon: <TrendingUp className="w-5 h-5 text-emerald-400" />, color: "text-emerald-400", tag: "#EDA_Stats" },
    Layout: { icon: <Layout className="w-5 h-5 text-violet-400" />, color: "text-violet-400", tag: "#Nextjs_React" },
    FileCode: { icon: <FileCode className="w-5 h-5 text-pink-400" />, color: "text-pink-400", tag: "#ESNext_Async" },
  };

  return (
    <section className="my-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-pink-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Engineering Guides</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Popular Tutorials
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Zero-filler technical articles with verified code examples, architecture breakdowns, and practical FAQs.
          </p>
        </div>

        <Link
          href="/tutorials"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors group"
        >
          <span>All 6 Tech Guides</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorialsData.map((tut) => {
          const meta = iconMap[tut.icon] || {
            icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
            color: "text-cyan-400",
            tag: "#Tech",
          };

          return (
            <Link
              key={tut.id}
              href={`/tutorials/${tut.slug}`}
              className="group p-6 rounded-2xl bg-[#0c101c]/90 hover:bg-[#12182c] border border-white/[0.08] hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between shadow-card hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] backdrop-blur-sm"
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
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-800/40">
                    {tut.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {tut.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-pink-200 transition-colors mb-2 line-clamp-2">
                  {tut.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {tut.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-pink-300 transition-colors">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
