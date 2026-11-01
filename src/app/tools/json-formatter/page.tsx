import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import JsonFormatter from "@/components/tools/JsonFormatter";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "JSON Formatter & Validator - Free Online Beautifier & Minifier",
  description:
    "Format, validate, beautify, and minify JSON online with line-accurate error highlighting. 100% private and processed locally in your browser with zero server uploads.",
  canonicalUrl: "/tools/json-formatter",
});

export default function JsonFormatterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Coding Hub JSON Formatter & Validator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Privacy-first JSON beautifier, syntax checker, and minifier running entirely in the client browser.",
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
          { label: "JSON Formatter" },
        ]}
      />

      <PageHeader
        badge="Developer Utility"
        badgeColor="indigo"
        title="JSON Formatter, Validator & Beautifier"
        description="Clean up unformatted API responses, validate JSON syntax against RFC 8259 specifications, and switch between 2-space, 4-space, or compact minification with zero telemetry."
      />

      {/* Main Interactive Tool */}
      <JsonFormatter />

      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* Security Reassurance Callout */}
      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-600/30 flex items-center gap-3 text-xs sm:text-sm text-emerald-300">
        <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> Your JSON strings, API keys, and sensitive database objects are parsed exclusively in your device&apos;s local browser memory. No data is ever transmitted to our servers.
        </span>
      </div>

      {/* Technical Guide & Best Practices */}
      <section className="mt-16 space-y-8 border-t border-slate-800 pt-12 text-slate-300">
        <div className="max-w-4xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            What is JSON and Why Does Formatting Matter?
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400">
            JSON (JavaScript Object Notation, standardized under RFC 8259 and ECMA-404) is the universal lightweight data-interchange format across the web. Almost every modern REST API, GraphQL endpoint, and cloud database relies on JSON to transfer structured payloads between frontend clients and backend servers.
          </p>

          <h3 className="text-xl font-bold text-white pt-2">
            Top 4 Most Common JSON Syntax Errors
          </h3>
          <div className="space-y-3 text-sm text-slate-400">
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800">
              <strong className="text-white block mb-1">1. Trailing Commas</strong>
              While JavaScript arrays and objects tolerate trailing commas, standard JSON strictly forbids commas following the final key-value pair or array item (e.g. <code>&#123;&quot;a&quot;: 1,&#125;</code> is invalid).
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800">
              <strong className="text-white block mb-1">2. Single Quotes Instead of Double Quotes</strong>
              Keys and string values in JSON must always be enclosed in double quotation marks (<code>&quot;key&quot;</code>). Single quotes (<code>&apos;key&apos;</code>) trigger instant parser rejection.
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800">
              <strong className="text-white block mb-1">3. Unquoted Object Keys</strong>
              Unlike JavaScript object literals, every property key in a JSON object must be a double-quoted string.
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800">
              <strong className="text-white block mb-1">4. Unescaped Control Characters</strong>
              Newlines, tabs, and backslashes inside string literals must be escaped (<code>\n</code>, <code>\t</code>, <code>\\</code>).
            </div>
          </div>

          {/* FAQs */}
          <h3 className="text-xl font-bold text-white pt-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-semibold text-white">
                When should I use minification over pretty-printing?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Use 2-space or 4-space pretty printing during development, code reviews, and debugging to maximize human readability. Use minified JSON in production network payloads to strip out all non-essential whitespace, reducing file sizes and bandwidth overhead.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-slate-800 space-y-1.5">
              <h4 className="text-sm font-semibold text-white">
                Is my data sent to any third-party analytics?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Absolutely not. Coding Hub executes JSON validation directly using the native Web JavaScript <code>JSON.parse()</code> and <code>JSON.stringify()</code> engine on your machine.
              </p>
            </div>
          </div>

          {/* Related Tools */}
          <div className="pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Developer Utilities
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
                href="/tools/word-counter"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <span>Word & Character Counter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tutorials/javascript"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <span>JavaScript Deep Dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
