import React from "react";
import Link from "next/link";
import { GraduationCap, Terminal, BookOpen, ArrowRight, Layers, Sparkles } from "lucide-react";

export default function CategoriesGrid() {
  const categories = [
    {
      title: "Student Calculators",
      count: "3 Free Tools",
      description: "Semester GPA, credit-weighted CGPA, exam percentage conversions, and attendance shortage forecasting.",
      icon: <GraduationCap className="w-7 h-7 text-cyan-400" />,
      gradientBorder: "hover:border-cyan-500/50",
      accentBg: "from-cyan-500/15 via-indigo-600/10 to-transparent",
      link: "/tools?category=student",
      glow: "hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]",
      badgeText: "ACADEMICS",
      items: ["CGPA Calculator", "Percentage Calculator", "Attendance Calculator"],
    },
    {
      title: "Developer Utilities",
      count: "3 Browser Tools",
      description: "100% in-browser developer utilities. Validate API payloads, convert naming conventions, and inspect text density.",
      icon: <Terminal className="w-7 h-7 text-violet-400" />,
      gradientBorder: "hover:border-violet-500/50",
      accentBg: "from-violet-500/15 via-fuchsia-600/10 to-transparent",
      link: "/tools?category=developer",
      glow: "hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
      badgeText: "DEV TOOLBOX",
      items: ["JSON Formatter & Validator", "Word & Character Counter", "Text Case Converter"],
    },
    {
      title: "Technical Tutorials",
      count: "6 In-Depth Guides",
      description: "Practical engineering roadmaps on Python automation, SQL query execution plans, Power BI star schemas, and modern React.",
      icon: <BookOpen className="w-7 h-7 text-pink-400" />,
      gradientBorder: "hover:border-pink-500/50",
      accentBg: "from-pink-500/15 via-purple-600/10 to-transparent",
      link: "/tutorials",
      glow: "hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]",
      badgeText: "LEARNING",
      items: ["Python Programming", "SQL & Databases", "Power BI & DAX", "Modern Web Dev"],
    },
  ];

  return (
    <section className="my-20">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-violet-400 mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Category Breakdown</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore by Category
        </h2>
        <p className="text-slate-400 text-sm">
          Everything structured logically to help you study smarter, debug faster, and build better.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`group relative p-7 rounded-3xl bg-gradient-to-b ${cat.accentBg} bg-[#0c101c] border border-white/[0.08] ${cat.gradientBorder} flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1 ${cat.glow} backdrop-blur-sm`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                  {cat.badgeText}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {cat.count}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-slate-100 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/40 text-slate-300 border border-white/[0.06]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={cat.link}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-all group-hover:border-white/[0.2]"
            >
              <span>Explore Category</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
