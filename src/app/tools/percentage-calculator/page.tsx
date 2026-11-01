import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Percentage Calculator - Fast Exam Marks & Score Percentage Tool",
  description:
    "Free online percentage calculator. Convert obtained marks into percentages, calculate percentage changes, and compute fractional ratios instantly with clear step-by-step formulas.",
  canonicalUrl: "/tools/percentage-calculator",
});

export default function PercentageCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Coding Hub Percentage Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Instant percentage calculator for test scores, academic marks, and score differences.",
  };

  return (
    <div className="py-6 sm:py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: "Percentage Calculator" },
        ]}
      />

      <PageHeader
        badge="Instant Calculation"
        badgeColor="indigo"
        title="Academic & Score Percentage Calculator"
        description="Determine your exam score percentage, analyze percentage differences, or find exact numerical ratios with zero latency."
      />

      <PercentageCalculator />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* SEO Explanations & Reference Guide */}
      <section className="mt-16 space-y-8 border-t border-slate-800 pt-12 text-slate-300">
        <div className="max-w-4xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Understanding Percentage Calculations in Academics and Analytics
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400">
            A percentage represents a dimensionless number or ratio expressed as a fraction of 100. It is denoted using the percent sign &quot;%&quot;. In academic settings, percentages standardize student performance across courses with unequal point maximums.
          </p>

          <h3 className="text-xl font-bold text-white pt-2">
            Exam Marks to Percentage Formula
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            To determine the percentage score on an examination or course:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300">
            Score Percentage (%) = (Marks Obtained / Total Maximum Marks) × 100
          </div>

          <h3 className="text-xl font-bold text-white pt-2">
            Percentage Increase vs. Percentage Decrease
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            When tracking performance improvement across semesters or monitoring website traffic growth, you calculate percentage change:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300">
            Percentage Change (%) = ( (New Value - Original Value) / |Original Value| ) × 100
          </div>

          {/* FAQs */}
          <h3 className="text-xl font-bold text-white pt-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-semibold text-white">
                How do I calculate percentage when maximum marks are different for each subject?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Sum all the marks you obtained across all subjects to get your total obtained score. Then sum the maximum marks across all subjects. Divide total obtained marks by total maximum marks and multiply by 100.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-semibold text-white">
                What does a negative percentage change mean?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                A negative percentage change indicates a percentage reduction or drop relative to the baseline initial number.
              </p>
            </div>
          </div>

          {/* Cross Links */}
          <div className="pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Explore More Tools
            </h4>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/cgpa-calculator"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <span>CGPA Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/attendance-calculator"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <span>Attendance Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
