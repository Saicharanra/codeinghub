"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdSlot from "@/components/ads/AdSlot";
import { TutorialItem } from "@/data/tutorialsData";
import { toolsData } from "@/data/toolsData";
import { tutorialsData } from "@/data/tutorialsData";
import { siteConfig } from "@/lib/seo";

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
      name: "Coding Hub Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Coding Hub",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/tutorials/${tutorial.slug}`,
    },
  };

  return (
    <article className="py-6 sm:py-8 space-y-8 max-w-4xl mx-auto">
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
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#EBF5F1] text-[#176B50] border border-[#C8E3D8] text-xs font-mono font-semibold uppercase tracking-wider">
            {tutorial.category}
          </span>
          <span className="text-xs font-mono text-[#737373] px-2 py-0.5 rounded bg-white border border-[#E7E7E3]">
            {tutorial.difficulty}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-[#737373]">
            <Clock className="w-3.5 h-3.5" />
            <span>{tutorial.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#202124] tracking-tight leading-tight">
          {tutorial.title}
        </h1>

        <p className="text-base sm:text-lg text-[#737373] leading-relaxed">
          {tutorial.subtitle}
        </p>
      </header>

      {/* Top Compliant AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Sponsored Ad" />

      {/* Learning Objectives Box */}
      <section className="p-5 sm:p-6 rounded-lg bg-white border border-[#E7E7E3] space-y-3">
        <div className="text-xs font-mono font-semibold text-[#176B50] uppercase tracking-wider">
          Learning Objectives
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {tutorial.learningObjectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#202124]">
              <CheckCircle2 className="w-4 h-4 text-[#176B50] flex-shrink-0 mt-0.5" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <div className="text-base sm:text-lg leading-relaxed text-[#202124] space-y-4">
        <p>{tutorial.introduction}</p>
      </div>

      {/* Step-by-Step Sections */}
      <div className="space-y-10">
        {tutorial.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 border-t border-[#E7E7E3] pt-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
                {section.heading}
              </h2>
              {section.subheading && (
                <p className="text-xs font-mono text-[#737373] mt-1">
                  {section.subheading}
                </p>
              )}
            </div>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#202124]">
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Code Block with One-Click Copy */}
            {section.codeBlock && (
              <div className="rounded-lg border border-[#E7E7E3] bg-[#FAFAF8] overflow-hidden my-5">
                <div className="flex items-center justify-between px-3.5 py-2 bg-white border-b border-[#E7E7E3] text-xs">
                  <span className="font-mono text-[#737373] uppercase text-[11px] font-medium">
                    {section.codeBlock.language}
                  </span>
                  <button
                    onClick={() => handleCopyCode(section.codeBlock!.code, idx)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FAFAF8] hover:bg-white text-[#202124] text-xs font-mono transition-colors border border-[#E7E7E3]"
                  >
                    {copiedCodeIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#176B50]" />
                        <span className="text-[#176B50] font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#737373]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-[#202124] leading-relaxed">
                  <code>{section.codeBlock.code}</code>
                </pre>
                {section.codeBlock.explanation && (
                  <div className="px-4 py-2.5 bg-white border-t border-[#E7E7E3] text-xs text-[#737373] font-mono">
                    <strong className="text-[#202124]">Key note:</strong> {section.codeBlock.explanation}
                  </div>
                )}
              </div>
            )}

            {/* Tips / Callout */}
            {section.tips && (
              <div className="p-4 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] text-xs sm:text-sm space-y-2">
                <div className="flex items-center gap-1.5 font-mono font-semibold text-[#176B50]">
                  <Lightbulb className="w-4 h-4 text-[#176B50]" />
                  <span>Pro Tip</span>
                </div>
                <ul className="space-y-1 list-disc list-inside text-[#176B50]">
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
      <section className="space-y-4 border-t border-[#E7E7E3] pt-8">
        <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#202124]">
          <HelpCircle className="w-5 h-5 text-[#176B50]" />
          <span>Frequently Asked Questions</span>
        </div>

        <div className="space-y-3">
          {tutorial.faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="p-4 rounded-lg bg-white border border-[#E7E7E3] space-y-1.5"
            >
              <h3 className="text-sm sm:text-base font-semibold text-[#202124]">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Linking */}
      <section className="space-y-6 border-t border-[#E7E7E3] pt-8">
        {relatedToolsList.length > 0 && (
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#737373] mb-3">
              Related Calculators & Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedToolsList.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="p-3.5 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-semibold text-[#202124] group-hover:text-[#176B50] block mb-0.5">
                      {tool.name}
                    </span>
                    <p className="text-xs text-[#737373] line-clamp-1">
                      {tool.shortDescription}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#176B50] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedTutorialsList.length > 0 && (
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#737373] mb-3">
              Continue Learning
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTutorialsList.map((tut) => (
                <Link
                  key={tut.id}
                  href={`/tutorials/${tut.slug}`}
                  className="p-3.5 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-semibold text-[#202124] group-hover:text-[#176B50] block mb-0.5">
                      {tut.title}
                    </span>
                    <p className="text-xs text-[#737373] line-clamp-1">
                      {tut.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#176B50] group-hover:translate-x-1 transition-transform flex-shrink-0" />
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
