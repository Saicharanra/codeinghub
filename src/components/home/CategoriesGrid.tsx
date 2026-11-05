import React from "react";
import Link from "next/link";
import {
  Code,
  Database,
  BarChart3,
  TrendingUp,
  Layout,
  Coffee,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { categoriesData } from "@/data/categoriesData";
import { tutorialsData } from "@/data/tutorialsData";

function getCategoryIcon(slug: string) {
  switch (slug) {
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

export default function CategoriesGrid() {
  return (
    <section className="py-12 sm:py-16 border-b border-[#E7E7E3]" id="learning-tracks">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
        <div>
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B50] mb-1">
            Curated Curriculums
          </div>
          <h2 className="text-section-title font-bold text-[#202124] tracking-tight leading-[1.25]">
            Learning Resources
          </h2>
          <p className="text-[15px] sm:text-base text-[#737373] mt-1.5 leading-relaxed">
            Production-oriented technical tracks written by educators and software engineers.
          </p>
        </div>
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#176B50] hover:text-[#12543E] transition-colors"
        >
          <span>All tutorial tracks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoriesData.map((cat) => {
          const guideCount = tutorialsData.filter(
            (t) => t.categorySlug.toLowerCase() === cat.slug.toLowerCase()
          ).length;

          return (
            <Link
              key={cat.id}
              href={cat.path}
              className="group p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-all flex flex-col justify-between space-y-4 shadow-subtle hover:shadow-card active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#176B50]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getCategoryIcon(cat.slug)}
                  </div>
                  <span className="text-[11px] font-mono text-[#737373] px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E3]">
                    {guideCount} {guideCount === 1 ? "Guide" : "Guides"}
                  </span>
                </div>

                <div>
                  <h3 className="text-card-title font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#737373] leading-relaxed mt-2 line-clamp-2">
                    {cat.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0F0EC] flex items-center justify-between text-[14px] sm:text-[15px] font-semibold text-[#176B50] group-hover:text-[#12543E]">
                <span>Explore {cat.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}