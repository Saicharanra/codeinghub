"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Lightbulb,
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
          <span className="px-3 py-1 rounded-full bg-violet-950/80 text-violet-300 border border-violet-500/40 text-xs font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            {tutorial.category}
          </span>
          <span className="text-xs font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
            {tutorial.difficulty}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{tutorial.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {tutorial.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          {tutorial.subtitle}
        </p>
      </header>

      {/* Top Compliant AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Sponsored Ad" />

      {/* Learning Objectives Box */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c101c] to-[#080b14] border border-white/[0.08] shadow-2xl space-y-4 max-w-4xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Core Learning Outcomes</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {tutorial.learningObjectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <div className="max-w-4xl text-base sm:text-lg leading-relaxed text-slate-300 space-y-4 font-normal">
        <p>{tutorial.introduction}</p>
      </div>

      {/* Step-by-Step Sections */}
      <div className="max-w-4xl space-y-12">
        {tutorial.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 border-t border-white/[0.08] pt-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {section.heading}
              </h2>
              {section.subheading && (
                <p className="text-sm font-mono font-medium text-cyan-400 mt-1">
                  {section.subheading}
                </p>
              )}
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Code Block with One-Click Copy & Mac Window Dots */}
            {section.codeBlock && (
              <div className="rounded-2xl border border-white/[0.1] bg-[#070913] overflow-hidden shadow-2xl my-6">
                <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="font-mono text-slate-400 uppercase text-[11px] ml-2">
                      {section.codeBlock.language}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(section.codeBlock!.code, idx)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-mono transition-colors border border-white/[0.08]"
                  >
                    {copiedCodeIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-200 leading-relaxed">
                  <code>{section.codeBlock.code}</code>
                </pre>
                {section.codeBlock.explanation && (
                  <div className="px-4 py-2.5 bg-black/40 border-t border-white/[0.05] text-xs text-slate-400 font-mono">
                    <strong className="text-cyan-300">Takeaway:</strong> {section.codeBlock.explanation}
                  </div>
                )}
              </div>
            )}

            {/* Tips / Callout */}
            {section.tips && (
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs sm:text-sm text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-mono font-semibold text-cyan-300">
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                  <span>Pro Tip</span>
                </div>
                <ul className="space-y-1 list-disc list-inside text-slate-300 text-xs sm:text-sm">
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

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl space-y-6 border-t border-white/[0.08] pt-10">
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
          <HelpCircle className="w-5 h-5 text-violet-400" />
          <span>Frequently Asked Questions</span>
        </div>

        <div className="space-y-4">
          {tutorial.faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="p-5 rounded-2xl bg-[#0c101c]/80 border border-white/[0.08] space-y-2"
            >
              <h3 className="text-sm sm:text-base font-bold text-white">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Linking */}
      <section className="max-w-4xl space-y-8 border-t border-white/[0.08] pt-10">
        {relatedToolsList.length > 0 && (
          <div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Related Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedToolsList.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 block mb-0.5">
                      {tool.name}
                    </span>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {tool.shortDescription}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedTutorialsList.length > 0 && (
          <div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Continue Learning
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTutorialsList.map((tut) => (
                <Link
                  key={tut.id}
                  href={`/tutorials/${tut.slug}`}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/40 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-violet-400 block mb-0.5">
                      {tut.title}
                    </span>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {tut.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
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
