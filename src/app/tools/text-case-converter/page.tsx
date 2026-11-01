import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import TextCaseConverter from "@/components/tools/TextCaseConverter";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Text Case Converter - Convert Uppercase, Lowercase, Title & CamelCase",
  description:
    "Free online text case converter. Transform text into UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case instantly.",
  canonicalUrl: "/tools/text-case-converter",
});

export default function TextCaseConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Coding Hub Text Case Converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Instantly converts text between programming conventions and editorial casing.",
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
          { label: "Text Case Converter" },
        ]}
      />

      <PageHeader
        badge="Developer & Editorial Utility"
        badgeColor="indigo"
        title="Multi-Style Text Case Converter"
        description="Convert copy into camelCase, snake_case, kebab-case, Title Case, UPPERCASE, and Sentence case with real-time preview and single-click copy."
      />

      {/* Main Tool */}
      <TextCaseConverter />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* Technical Reference Guide */}
      <section className="mt-16 space-y-8 border-t border-slate-800 pt-12 text-slate-300">
        <div className="max-w-4xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Programming Case Conventions by Language
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400">
            Software languages adhere to strict naming conventions established in their official style guides (e.g., PEP 8 for Python, Google JavaScript Style Guide, Oracle Java Conventions).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <span className="font-semibold text-indigo-400">camelCase</span>
              <p className="text-slate-400">
                First word lowercase, each subsequent word capitalized. Standard for variables and functions in JavaScript, TypeScript, Swift, and Go.
              </p>
              <code className="text-indigo-300 text-xs block pt-1">const studentGradeAverage = 94;</code>
            </div>

            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <span className="font-semibold text-purple-400">snake_case</span>
              <p className="text-slate-400">
                All words lowercase separated by underscores. Standard for variables, modules, and functions in Python, Rust, Ruby, and SQL column identifiers.
              </p>
              <code className="text-purple-300 text-xs block pt-1">total_student_count = 150</code>
            </div>

            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <span className="font-semibold text-pink-400">kebab-case</span>
              <p className="text-slate-400">
                Words separated by hyphens. Standard for URL slugs, REST endpoint paths, CSS class selectors, and package repository names.
              </p>
              <code className="text-pink-300 text-xs block pt-1">.hero-gradient-badge &#123; ... &#125;</code>
            </div>

            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <span className="font-semibold text-emerald-400">CONSTANT_CASE (SCREAMING_SNAKE)</span>
              <p className="text-slate-400">
                All letters capitalized with underscores. Standard for global constants, configuration definitions, and environment variables.
              </p>
              <code className="text-emerald-300 text-xs block pt-1">NEXT_PUBLIC_API_URL</code>
            </div>
          </div>

          {/* Related Tools */}
          <div className="pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Explore More Tools
            </h4>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/word-counter"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <span>Word Counter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/json-formatter"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <span>JSON Formatter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
