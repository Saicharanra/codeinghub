import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import AttendanceCalculator from "@/components/tools/AttendanceCalculator";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Attendance Calculator - 75% Rule & Classes Needed Calculator",
  description:
    "Free college attendance calculator. Calculate current percentage, know how many consecutive classes you must attend to reach 75%, and check your safe bunk capacity.",
  canonicalUrl: "/tools/attendance-calculator",
});

export default function AttendanceCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Coding Hub Attendance Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Calculates university lecture attendance percentages and forecasts required classes to avoid exam debarment.",
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
          { label: "Attendance Calculator" },
        ]}
      />

      <PageHeader
        badge="College Student Essential"
        badgeColor="indigo"
        title="College Attendance & Bunk Calculator"
        description="Stay safely above your university's mandated attendance threshold. Calculate your exact percentage, required upcoming lectures, and safe skip capacity."
      />

      <AttendanceCalculator />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* Educational Article & Mathematical Derivation */}
      <section className="mt-16 space-y-8 border-t border-slate-800 pt-12 text-slate-300">
        <div className="max-w-4xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How Does the 75% Attendance Rule Work?
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400">
            Most colleges, polytechnics, and engineering universities (such as UGC, AICTE, Anna University, VTU, Mumbai University, and UK/US collegiate boards) enforce a minimum attendance threshold—typically 75% or 80%—for students to be eligible to sit for final semester examinations. Failing to achieve this benchmark often results in student debarment, attendance fines, or course repetition.
          </p>

          <h3 className="text-xl font-bold text-white pt-2">
            Mathematical Derivation of Classes Needed
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Suppose you have attended <code>A</code> classes out of <code>T</code> total classes held so far. If you need to hit a target fraction <code>P</code> (e.g., 0.75 for 75%), how many consecutive future classes (<code>X</code>) must you attend without skipping?
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-1">
            <div>(A + X) / (T + X) ≥ P</div>
            <div>A + X ≥ P × T + P × X</div>
            <div>X × (1 - P) ≥ (P × T) - A</div>
            <div className="text-emerald-400 font-bold">X = ⌈ ((P × T) - A) / (1 - P) ⌉</div>
          </div>

          <h3 className="text-xl font-bold text-white pt-2">
            Safe Bunk / Skip Calculation
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            If your current attendance is already above the required threshold, you may want to know how many classes (<code>Y</code>) you can safely miss while remaining at or above the target:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300">
            Safe Misses (Y) = ⌊ (A / P) - T ⌋
          </div>

          {/* FAQs */}
          <h3 className="text-xl font-bold text-white pt-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-semibold text-white">
                Does a medical certificate excuse low attendance?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Many universities offer a 10% to 15% relaxation (lowering the threshold from 75% down to 60% or 65%) upon submission of valid medical documents endorsed by an authorized physician and the Dean of Student Affairs. Check your specific college handbook.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-semibold text-white">
                Are laboratory sessions weighted differently from lectures?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                In some universities, practical lab sessions carry 2 or 3 attendance credits per session. If your university calculates attendance on hours rather than session counts, enter total hours conducted and total hours attended into the calculator.
              </p>
            </div>
          </div>

          {/* Cross Links */}
          <div className="pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Helpful Tools & Guides
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
                href="/tools/percentage-calculator"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <span>Percentage Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
