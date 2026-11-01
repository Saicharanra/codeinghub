import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import WordCounter from "@/components/tools/WordCounter";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Word & Character Counter - Free Online Text Metrics Tool",
  description:
    "Count words, characters, sentences, paragraphs, and estimate reading time live. Perfect for essays, README files, blog posts, and SEO meta tags.",
  canonicalUrl: "/tools/word-counter",
});

export default function WordCounterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Coding Hub Word & Character Counter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Real-time word and character counter with reading duration and paragraph metrics.",
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
          { label: "Word Counter" },
        ]}
      />

      <PageHeader
        badge="Real-Time Analytics"
        badgeColor="indigo"
        title="Word & Character Counter"
        description="Monitor real-time text length metrics as you write. Inspect character counts with and without whitespace, sentence density, and estimated speaking duration."
      />

      {/* Main Tool */}
      <WordCounter />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* Educational Article on Text Limits and SEO Guidelines */}
      <section className="mt-16 space-y-8 border-t border-slate-800 pt-12 text-slate-300">
        <div className="max-w-4xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Recommended Character Limits for Writers & Developers
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400">
            Whether you are crafting documentation, writing technical blog posts, or configuring search engine tags, adhering to length guidelines prevents truncation across devices.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="p-3 border-b border-slate-800">Platform / Context</th>
                  <th className="p-3 border-b border-slate-800">Target Character Range</th>
                  <th className="p-3 border-b border-slate-800">Key Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-surface-card/40 text-slate-400">
                <tr>
                  <td className="p-3 font-semibold text-white">Google SEO Title Tag</td>
                  <td className="p-3 text-indigo-400 font-semibold">50 - 60 characters</td>
                  <td className="p-3">Prevents pixel overflow truncation on SERPs</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Google Meta Description</td>
                  <td className="p-3 text-indigo-400 font-semibold">140 - 160 characters</td>
                  <td className="p-3">Optimal snippet preview length on mobile & desktop</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Git Commit Title</td>
                  <td className="p-3 text-indigo-400 font-semibold">50 characters max</td>
                  <td className="p-3">Standard Git convention for git log readability</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Academic Abstract</td>
                  <td className="p-3 text-indigo-400 font-semibold">150 - 250 words</td>
                  <td className="p-3">Standard university thesis and journal guideline</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-white pt-2">
            How Are Reading and Speaking Times Calculated?
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Our reading duration calculation adheres to empirical cognitive science benchmarks: the average silent adult reader processes approximately <strong>200 to 250 words per minute (WPM)</strong>. For verbal presentations and video narration scripts, the standard conversational speaking pace is roughly <strong>130 to 150 words per minute</strong>.
          </p>

          {/* Related Tools */}
          <div className="pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Explore More Tools
            </h4>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/text-case-converter"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <span>Text Case Converter</span>
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
