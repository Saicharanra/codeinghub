import React from "react";
import Link from "next/link";
import { GraduationCap, Terminal, BookOpen, ArrowRight } from "lucide-react";

export default function CategoriesGrid() {
  const categories = [
    {
      title: "Student Tools",
      description: "GPA, CGPA, attendance, and exam percentage utilities tailored for college and university grading scales.",
      icon: <GraduationCap className="w-5 h-5 text-[#176B50]" />,
      link: "/tools?category=student",
      count: "3 Tools",
    },
    {
      title: "Developer Tools",
      description: "Browser utilities for quick formatting, syntax validation, word density checks, and text case conversions.",
      icon: <Terminal className="w-5 h-5 text-[#176B50]" />,
      link: "/tools?category=developer",
      count: "3 Tools",
    },
    {
      title: "Technical Guides",
      description: "Step-by-step engineering articles on Python, SQL queries, Power BI DAX, and modern web application development.",
      icon: <BookOpen className="w-5 h-5 text-[#176B50]" />,
      link: "/tutorials",
      count: "6 Guides",
    },
  ];

  return (
    <section className="py-14 sm:py-16 border-b border-[#E7E7E3]">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#202124] tracking-tight">
          Browse by Category
        </h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-1">
          Everything organized logically for quick reference and daily use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-lg border border-[#E7E7E3] bg-[#FFFFFF] flex flex-col justify-between space-y-4 shadow-subtle"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded bg-[#EBF5F1] flex items-center justify-center">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-mono text-[#737373] font-medium">
                  {cat.count}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#202124]">
                {cat.title}
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                {cat.description}
              </p>
            </div>

            <Link
              href={cat.link}
              className="text-xs font-medium text-[#176B50] hover:text-[#12543E] transition-colors inline-flex items-center gap-1 pt-2"
            >
              <span>Explore category</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
