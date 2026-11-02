"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Calendar,
  User,
  ListTree,
  Share2,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdSlot from "@/components/ads/AdSlot";
import { TutorialItem, tutorialsData } from "@/data/tutorialsData";
import { toolsData } from "@/data/toolsData";
import { categoriesData } from "@/data/categoriesData";
import { trackTutorialOpened, trackRelatedToolClicked } from "@/lib/analytics";

interface TutorialArticleViewProps {
  tutorial: TutorialItem;
}

export default function TutorialArticleView({ tutorial }: TutorialArticleViewProps) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    trackTutorialOpened(tutorial.categorySlug, tutorial.slug);
  }, [tutorial.categorySlug, tutorial.slug]);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const category = categoriesData.find(
    (c) => c.slug.toLowerCase() === tutorial.categorySlug.toLowerCase()
  );

  const relatedToolsList = toolsData.filter((t) =>
    tutorial.relatedTools.includes(t.id)
  );

  const relatedTutorialsList = tutorialsData.filter((t) =>
    tutorial.relatedTutorials.includes(t.slug) || tutorial.relatedTutorials.includes(t.id)
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tutorial.title,
    description: tutorial.summary,
    datePublished: tutorial.publishedAt,
    dateModified: tutorial.updatedAt,
    author: {
      "@type": "Organization",
      name: tutorial.author.name,
      jobTitle: tutorial.author.role,
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
      "@id": `https://codinghub.dev/tutorials/${tutorial.categorySlug}/${tutorial.slug}`,
    },
  };

  const faqJsonLd = tutorial.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tutorial.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <article className="py-6 sm:py-10 max-w-[1080px] mx-auto space-y-8">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Tutorials", href: "/tutorials" },
          {
            label: category ? category.name : tutorial.category,
            href: `/tutorials/${tutorial.categorySlug}`,
          },
          { label: tutorial.title },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4 border-b border-[#E7E7E3] pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/tutorials/${tutorial.categorySlug}`}
              className="px-2.5 py-1 rounded bg-[#EBF5F1] text-[#176B50] hover:bg-[#DDF0E8] border border-[#C8E3D8] text-xs font-mono font-medium transition-colors"
            >
              {tutorial.category}
            </Link>
            <span className="text-xs font-mono text-[#737373] px-2.5 py-1 rounded bg-white border border-[#E7E7E3]">
              {tutorial.difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#737373] px-2 py-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{tutorial.readTime} read</span>
            </span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-[#737373] hover:text-[#202124] bg-white hover:bg-[#FAFAF8] border border-[#E7E7E3] rounded transition-colors"
            title="Copy link to article"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#176B50]" />
                <span className="text-[#176B50]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-[#202124] tracking-tight leading-tight">
          {tutorial.title}
        </h1>

        <p className="text-base sm:text-lg text-[#737373] leading-relaxed max-w-3xl">
          {tutorial.subtitle}
        </p>

        {/* Metadata Footer: Author and Date */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#737373] border-t border-[#F0F0EC]">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#176B50]" />
            <span className="text-[#202124] font-medium">{tutorial.author.name}</span>
            <span className="text-[#737373]">({tutorial.author.role})</span>
          </div>
          <span className="text-[#D0D0CB]">•</span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated {tutorial.updatedAt}</span>
          </div>
        </div>
      </header>

      {/* Top Compliant AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Sponsored Ad" />

      {/* Grid Layout: Main Article (8 cols) + Sticky Sidebar (4 cols) on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Introduction Card */}
          <div className="p-5 sm:p-6 rounded-lg bg-white border border-[#E7E7E3] space-y-3">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B50]">
              Overview & Context
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#202124]">
              {tutorial.introduction}
            </p>
          </div>

          {/* Learning Objectives Box */}
          {tutorial.learningObjectives && tutorial.learningObjectives.length > 0 && (
            <div className="p-5 sm:p-6 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#202124] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#176B50]" />
                <span>What You Will Learn</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {tutorial.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#202124]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#176B50] flex-shrink-0 mt-2" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Table of Contents (shown on smaller screens) */}
          {tutorial.tableOfContents && tutorial.tableOfContents.length > 0 && (
            <div className="block lg:hidden p-4 rounded-lg bg-white border border-[#E7E7E3] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#202124]">
                <ListTree className="w-4 h-4 text-[#176B50]" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-1.5 pt-1 text-xs">
                {tutorial.tableOfContents.map((toc) => (
                  <li key={toc.id}>
                    <a
                      href={`#${toc.id}`}
                      className="text-[#737373] hover:text-[#176B50] hover:underline flex items-center gap-1.5"
                    >
                      <ArrowRight className="w-3 h-3 text-[#176B50] flex-shrink-0" />
                      <span>{toc.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Step-by-Step Sections */}
          <div className="space-y-10">
            {tutorial.sections.map((section, idx) => (
              <section
                key={section.id || idx}
                id={section.id}
                className="scroll-mt-24 space-y-4 pt-6 first:pt-0"
              >
                <div className="border-b border-[#E7E7E3] pb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
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
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Code Block with One-Click Copy */}
                {section.codeBlock && (
                  <div className="rounded-lg border border-[#E7E7E3] bg-[#FAFAF8] overflow-hidden my-4 shadow-subtle">
                    <div className="flex items-center justify-between px-3.5 py-2 bg-white border-b border-[#E7E7E3] text-xs">
                      <span className="font-mono text-[#737373] uppercase text-[11px] font-semibold">
                        {section.codeBlock.language}
                      </span>
                      <button
                        onClick={() => handleCopyCode(section.codeBlock!.code, idx)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FAFAF8] hover:bg-white text-[#202124] text-xs font-mono transition-colors border border-[#E7E7E3]"
                        aria-label="Copy code snippet"
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
                        <strong className="text-[#202124]">Key note:</strong>{" "}
                        {section.codeBlock.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Pro Tips Callout */}
                {section.tips && section.tips.length > 0 && (
                  <div className="p-4 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] text-xs sm:text-sm space-y-2">
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-[#176B50]">
                      <Lightbulb className="w-4 h-4 text-[#176B50] flex-shrink-0" />
                      <span>Best Practice Tip</span>
                    </div>
                    <ul className="space-y-1 list-disc list-inside text-[#176B50] pl-1">
                      {section.tips.map((tip, tIdx) => (
                        <li key={tIdx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common Mistakes Callout */}
                {section.commonMistakes && section.commonMistakes.length > 0 && (
                  <div className="p-4 rounded-lg bg-[#FDF8EE] border border-[#F3DEB0] text-xs sm:text-sm space-y-2">
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-[#8C5E00]">
                      <AlertTriangle className="w-4 h-4 text-[#8C5E00] flex-shrink-0" />
                      <span>Common Mistake to Avoid</span>
                    </div>
                    <ul className="space-y-1 list-disc list-inside text-[#8C5E00] pl-1">
                      {section.commonMistakes.map((mistake, mIdx) => (
                        <li key={mIdx}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Mid-Article Compliant AdSlot */}
          <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Sponsored Placement" />

          {/* Summary Takeaways */}
          {tutorial.summaryTakeaways && tutorial.summaryTakeaways.length > 0 && (
            <div className="p-6 rounded-lg bg-white border border-[#E7E7E3] space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#202124] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#176B50]" />
                <span>Summary & Key Takeaways</span>
              </h3>
              <ul className="space-y-2 pt-1 text-xs sm:text-sm text-[#202124]">
                {tutorial.summaryTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#EBF5F1] text-[#176B50] flex items-center justify-center text-xs font-mono font-semibold flex-shrink-0 mt-0.5">
                      {tIdx + 1}
                    </span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Frequently Asked Questions */}
          {tutorial.faqs && tutorial.faqs.length > 0 && (
            <section className="space-y-4 border-t border-[#E7E7E3] pt-8">
              <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#202124]">
                <HelpCircle className="w-5 h-5 text-[#176B50]" />
                <span>Frequently Asked Questions</span>
              </div>

              <div className="space-y-3">
                {tutorial.faqs.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 sm:p-5 rounded-lg bg-white border border-[#E7E7E3] space-y-1.5"
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
          )}

          {/* Cross-Linking: Related Tools & Related Tutorials */}
          <section className="space-y-6 border-t border-[#E7E7E3] pt-8">
            {relatedToolsList.length > 0 && (
              <div>
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#737373] mb-3">
                  Recommended Practical Tools
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedToolsList.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.path}
                      onClick={() => trackRelatedToolClicked("tutorial_article", tool.id)}
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
                  Next Recommended Reads
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedTutorialsList.map((tut) => (
                    <Link
                      key={tut.id}
                      href={`/tutorials/${tut.categorySlug}/${tut.slug}`}
                      className="p-3.5 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-mono text-[#176B50] uppercase font-semibold">
                            {tut.category}
                          </span>
                          <span className="text-[10px] text-[#737373] font-mono">
                            • {tut.readTime}
                          </span>
                        </div>
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
        </div>

        {/* Desktop Sticky Sidebar (4 cols) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
          {/* Table of Contents */}
          {tutorial.tableOfContents && tutorial.tableOfContents.length > 0 && (
            <div className="p-5 rounded-lg bg-white border border-[#E7E7E3] space-y-3 shadow-subtle">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#202124]">
                <ListTree className="w-4 h-4 text-[#176B50]" />
                <span>On This Page</span>
              </div>
              <nav>
                <ul className="space-y-2 text-xs border-l border-[#E7E7E3] pl-3">
                  {tutorial.tableOfContents.map((toc) => (
                    <li key={toc.id}>
                      <a
                        href={`#${toc.id}`}
                        className="text-[#737373] hover:text-[#176B50] block transition-colors leading-relaxed hover:translate-x-0.5 transform"
                      >
                        {toc.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Category Hub Quick Card */}
          {category && (
            <div className="p-5 rounded-lg bg-white border border-[#E7E7E3] space-y-3">
              <div className="text-xs font-mono uppercase font-semibold text-[#176B50]">
                Category Hub
              </div>
              <h4 className="text-sm font-semibold text-[#202124]">
                {category.name}
              </h4>
              <p className="text-xs text-[#737373] leading-relaxed">
                {category.shortDescription}
              </p>
              <Link
                href={`/tutorials/${category.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#176B50] hover:text-[#12543E] transition-colors"
              >
                <span>View all {category.name} guides</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}

          {/* Quick Learning Tools Card */}
          <div className="p-5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#202124]">
              <BookOpen className="w-4 h-4 text-[#176B50]" />
              <span>Coding Hub Tools</span>
            </div>
            <p className="text-xs text-[#737373] leading-relaxed">
              Explore our free, instant, client-side developer and student calculators without registrations or telemetry.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <Link
                href="/tools/json-formatter"
                className="block p-2 rounded bg-white border border-[#E7E7E3] hover:border-[#176B50] text-[#202124] transition-colors"
              >
                JSON Formatter & Validator
              </Link>
              <Link
                href="/tools/cgpa-calculator"
                className="block p-2 rounded bg-white border border-[#E7E7E3] hover:border-[#176B50] text-[#202124] transition-colors"
              >
                College CGPA Calculator
              </Link>
              <Link
                href="/tools/word-counter"
                className="block p-2 rounded bg-white border border-[#E7E7E3] hover:border-[#176B50] text-[#202124] transition-colors"
              >
                Word & Character Counter
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Ad" />
    </article>
  );
}