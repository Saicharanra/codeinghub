import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import CgpaCalculator from "@/components/tools/CgpaCalculator";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { GraduationCap, BookOpen, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "CGPA Calculator - Free Semester & Credit-Weighted GPA Tool",
  description:
    "Calculate cumulative grade point average (CGPA) across multiple semesters. Supports both simple average and credit-weighted models with 4.0 and 10.0 grading scales.",
  canonicalUrl: "/tools/cgpa-calculator",
});

export default function CgpaCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Coding Hub CGPA Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online CGPA Calculator for college and university students to calculate semester GPAs, credit weights, and percentage equivalents.",
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
          { label: "CGPA Calculator" },
        ]}
      />

      <PageHeader
        badge="Academic Calculator"
        badgeColor="indigo"
        title="College & University CGPA Calculator"
        description="Compute your Cumulative Grade Point Average accurately. Easily add multiple semesters, configure credit hour weights, and project your final degree honors classification."
      />

      {/* Main Interactive Tool */}
      <CgpaCalculator />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* Educational Article Section for SEO & User Guidance */}
      <section className="mt-16 space-y-8 border-t border-slate-800 pt-12 text-slate-300">
        <div className="max-w-4xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How to Calculate Your CGPA (Cumulative Grade Point Average)
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400">
            CGPA (Cumulative Grade Point Average) represents the overarching measure of a student’s academic performance across multiple academic terms or semesters. While individual semesters produce a Semester Grade Point Average (SGPA or GPA), the CGPA combines these scores into a single aggregate metric.
          </p>

          <h3 className="text-xl font-bold text-white pt-2">
            The Difference Between Simple Average and Credit-Weighted CGPA
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            A common mistake among university students is calculating CGPA by simply summing their semester GPAs and dividing by the total number of semesters. This arithmetic mean is only accurate if every single semester carries the exact same number of credit hours.
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300">
            Credit-Weighted CGPA = ( (GPA₁ × Credits₁) + (GPA₂ × Credits₂) + ... + (GPAₙ × Creditsₙ) ) / Total Credits
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            For example, if your 4th semester involves an intensive capstone project worth 24 credits, your GPA that term exerts a proportionally higher impact on your graduation CGPA than a 15-credit introductory semester.
          </p>

          {/* Grading Scale Guide */}
          <h3 className="text-xl font-bold text-white pt-2">
            Standard Grading Scale Interpretations
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="p-3 border-b border-slate-800">CGPA Range (10.0 Scale)</th>
                  <th className="p-3 border-b border-slate-800">CGPA Range (4.0 Scale)</th>
                  <th className="p-3 border-b border-slate-800">Academic Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-surface-card/40 text-slate-400">
                <tr>
                  <td className="p-3 font-semibold text-emerald-400">8.50 - 10.00</td>
                  <td className="p-3 font-semibold text-emerald-400">3.75 - 4.00</td>
                  <td className="p-3">First Class with Distinction / Summa Cum Laude</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-400">7.00 - 8.49</td>
                  <td className="p-3 font-semibold text-blue-400">3.50 - 3.74</td>
                  <td className="p-3">First Class / Magna Cum Laude</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-indigo-400">6.00 - 6.99</td>
                  <td className="p-3 font-semibold text-indigo-400">3.00 - 3.49</td>
                  <td className="p-3">Higher Second Class / Cum Laude</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-amber-400">5.00 - 5.99</td>
                  <td className="p-3 font-semibold text-amber-400">2.00 - 2.99</td>
                  <td className="p-3">Second Class / Satisfactory Pass</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Frequently Asked Questions */}
          <h3 className="text-xl font-bold text-white pt-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-semibold text-white">
                How do I convert my 10.0 CGPA to a percentage?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Most technical universities (such as CBSE and AICTE-affiliated engineering institutions) utilize the official formula: <code>Percentage = CGPA × 9.5</code>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-semibold text-white">
                Can I improve my CGPA after a poor freshman year?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Yes. Because cumulative GPA is an ongoing aggregate, scoring high GPAs in later semesters with high credit loads will steadily increase your overall cumulative standing.
              </p>
            </div>
          </div>

          {/* Cross Links to Other Tools */}
          <div className="pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Related Academic Utilities
            </h4>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/percentage-calculator"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              >
                <span>Percentage Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/attendance-calculator"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              >
                <span>Attendance Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tutorials/data-analytics"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              >
                <span>Data Analytics Foundations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
