import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tutorialsData } from "@/data/tutorialsData";

export default function PopularTutorials() {
  return (
    <section className="py-14 sm:py-16 border-b border-[#E7E7E3]">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#202124] tracking-tight">
            Tutorials & Technical Guides
          </h2>
          <p className="text-xs sm:text-sm text-[#737373] mt-1">
            Practical programming, database, and analytics documentation written for working clarity.
          </p>
        </div>
        <Link
          href="/tutorials"
          className="text-xs sm:text-sm font-medium text-[#176B50] hover:text-[#12543E] transition-colors inline-flex items-center gap-1"
        >
          <span>All tutorials</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Editorial Article-List Publication Layout */}
      <div className="divide-y divide-[#E7E7E3] border-y border-[#E7E7E3]">
        {tutorialsData.slice(0, 6).map((tut) => (
          <article key={tut.id} className="py-6 sm:py-7 group">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-baseline">
              {/* Category & Reading Time */}
              <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between text-xs text-[#737373]">
                <span className="font-semibold text-[#176B50] uppercase tracking-wider text-[11px]">
                  {tut.category}
                </span>
                <span className="mt-1 text-[11px] font-mono text-[#737373]">
                  {tut.readTime}
                </span>
              </div>

              {/* Title & Summary */}
              <div className="md:col-span-7 space-y-1.5">
                <h3 className="text-base sm:text-lg font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors leading-snug">
                  <Link href={`/tutorials/${tut.categorySlug}/${tut.slug}`}>
                    {tut.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-[#737373] leading-relaxed line-clamp-2">
                  {tut.summary}
                </p>
              </div>

              {/* Link */}
              <div className="md:col-span-2 md:text-right pt-2 md:pt-0">
                <Link
                  href={`/tutorials/${tut.categorySlug}/${tut.slug}`}
                  className="text-xs font-medium text-[#176B50] hover:text-[#12543E] inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>Read guide</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
