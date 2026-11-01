"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Share2,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdSlot from "@/components/ads/AdSlot";
import { TutorialItem } from "@/data/tutorialsData";
import { toolsData } from "@/data/toolsData";
import { tutorialsData } from "@/data/tutorialsData";

interface TutorialDetailViewProps {
  tutorial: TutorialItem;
}

export default function TutorialDetailView({ tutorial }: TutorialDetailViewProps) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const relatedToolsList = toolsData.filter((t) =>
    tutorial.relatedTools.includes(t.id)
  );

  const relatedTutorialsList = tutorialsData.filter((t) =>
    tutorial.relatedTutorials.includes(t.id)
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tutorial.title,
    description: tutorial.summary,
    author: {
      "@type": "Organization",
      name: "Coding Hub Engineering Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Coding Hub",
      logo: {
        "@type": "ImageObject",
        url: "https://codinghub.dev/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://codinghub.dev/tutorials/${tutorial.slug}`,
    },
  };

  return (
    <article className="py-6 sm:py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Tutorials", href: "/tutorials" },
          { label: tutorial.category, href: `/tutorials?category=${encodeURIComponent(tutorial.category)}` },
          { label: tutorial.title },
        ]}
      />

      {/* Tutorial Header */}
      <header className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-700/50 text-xs font-semibold uppercase tracking-wider">
            {tutorial.category}
          </span>
          <span className="text-xs font-medium text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700/60">
            {tutorial.difficulty}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{tutorial.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {tutorial.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {tutorial.subtitle}
        </p>
      </header>

      {/* Top Compliant AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Sponsored Ad" />

      {/* Learning Objectives Box */}
      <section className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-slate-800 shadow-xl space-y-4 max-w-4xl">
        <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>What You Will Learn</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {tutorial.learningObjectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <div className="max-w-4xl text-base sm:text-lg leading-relaxed text-slate-300 space-y-4">
        <p>{tutorial.introduction}</p>
      </div>

      {/* Step-by-Step Sections */}
      <div className="max-w-4xl space-y-12">
        {tutorial.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 border-t border-slate-850 pt-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {section.heading}
              </h2>
              {section.subheading && (
                <p className="text-sm font-medium text-purple-400 mt-1">
                  {section.subheading}
                </p>
              )}
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Code Block with One-Click Copy */}
            {section.codeBlock && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg my-6">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
                  <span className="font-mono font-medium text-slate-400 uppercase">
                    {section.codeBlock.language}
                  </span>
                  <button
                    onClick={() => handleCopyCode(section.codeBlock!.code, idx)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  >
                    {copiedCodeIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-indigo-200 leading-relaxed">
                  <code>{section.codeBlock.code}</code>
                </pre>
                {section.codeBlock.explanation && (
                  <div className="px-4 py-2.5 bg-slate-900/40 border-t border-slate-850 text-xs text-slate-400">
                    <strong className="text-slate-300">Key takeaway:</strong> {section.codeBlock.explanation}
                  </div>
                )}
              </div>
            )}

            {/* Tips / Callout */}
            {section.tips && (
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-700/40 text-xs sm:text-sm text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-indigo-300">
                  <Lightbulb className="w-4 h-4 text-indigo-400" />
                  <span>Pro Tip / Architecture Guideline</span>
                </div>
                <ul className="space-y-1 list-disc list-inside text-slate-400 text-xs sm:text-sm">
                  {section.tips.map((tip, tIdx) => (
                    <li key={tIdx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* In-Article Compliant AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

      {/* Frequently Asked Questions Section */}
      <section className="max-w-4xl space-y-6 border-t border-slate-800 pt-10">
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <span>Frequently Asked Questions</span>
        </div>

        <div className="space-y-4">
          {tutorial.faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="p-5 rounded-2xl bg-surface-card border border-slate-800 space-y-2"
            >
              <h3 className="text-sm sm:text-base font-semibold text-white">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Linking: Related Tools & Related Tutorials */}
      <section className="max-w-4xl space-y-8 border-t border-slate-800 pt-10">
        {relatedToolsList.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-white mb-4">
              Related Interactive Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedToolsList.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-semibold text-indigo-400 block mb-0.5">
                      {tool.name}
                    </span>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {tool.shortDescription}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedTutorialsList.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-white mb-4">
              Continue Learning: Related Tutorials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTutorialsList.map((tut) => (
                <Link
                  key={tut.id}
                  href={`/tutorials/${tut.slug}`}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-semibold text-purple-400 block mb-0.5">
                      {tut.title}
                    </span>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {tut.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Bottom AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Ad" />
    </article>
  );
}
