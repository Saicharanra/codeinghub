import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { tutorialsData, getLatestTutorials } from "@/data/tutorialsData";

export default function PopularTutorials() {
  const latestGuides = getLatestTutorials(6);

  return (
    <section className="py-12 sm:py-16 border-b border-[#E7E7E3]" id="latest-tutorials">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
        <div>
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B50] mb-1">
            Engineering &amp; Analytics Academy
          </div>
          <h2 className="text-section-title font-bold text-[#202124] tracking-tight leading-[1.25]">
            Latest Tutorials
          </h2>
          <p className="text-[15px] sm:text-base text-[#737373] mt-1.5 leading-relaxed">
            Step-by-step programming, database, and analytics guides with working code snippets.
          </p>
        </div>
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#176B50] hover:text-[#12543E] transition-colors"
        >
          <span>Browse all guides</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Editorial Article Publication Layout */}
      <div className="divide-y divide-[#E7E7E3] border-y border-[#E7E7E3] bg-white rounded-xl shadow-subtle overflow-hidden">
        {latestGuides.map((tut) => (
          <article key={tut.id} className="p-5 sm:p-6 group hover:bg-[#FAFAF8] transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-baseline">
              {/* Category & Reading Time */}
              <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between text-xs text-[#737373]">
                <span className="font-semibold text-[#176B50] uppercase tracking-wider text-[11px] font-mono">
                  {tut.category}
                </span>
                <span className="mt-1 text-[11px] font-mono text-[#737373] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#737373]" />
                  <span>{tut.readTime} read</span>
                </span>
              </div>

              {/* Title & Summary */}
              <div className="md:col-span-7 space-y-1.5">
                <h3 className="text-card-title font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors leading-snug">
                  <Link href={`/tutorials/${tut.categorySlug}/${tut.slug}`}>
                    {tut.title}
                  </Link>
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#737373] leading-relaxed line-clamp-2">
                  {tut.summary}
                </p>
              </div>

              {/* Read Action */}
              <div className="md:col-span-2 md:text-right pt-1 md:pt-0">
                <Link
                  href={`/tutorials/${tut.categorySlug}/${tut.slug}`}
                  className="text-[14px] sm:text-[15px] font-semibold text-[#176B50] group-hover:text-[#12543E] inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>Read guide</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}