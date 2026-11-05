import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  ArrowRight,
  BookOpen,
  Code,
  Database,
  BarChart3,
  TrendingUp,
  Layout,
  Coffee,
  CheckCircle2,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdSlot from "@/components/ads/AdSlot";
import { categoriesData, getCategoryBySlug } from "@/data/categoriesData";
import { getTutorialsByCategory } from "@/data/tutorialsData";
import { toolsData } from "@/data/toolsData";
import { constructMetadata, siteConfig } from "@/lib/seo";

interface PageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return categoriesData.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    return constructMetadata({
      title: "Category Not Found - Coding Hub",
      description: "The requested tutorial category could not be found.",
    });
  }

  return constructMetadata({
    title: `${category.name} Tutorials & Guides - Coding Hub`,
    description: category.description,
    canonicalUrl: `/tutorials/${category.slug}`,
  });
}

function getCategoryIcon(name: string) {
  switch (name.toLowerCase()) {
    case "python":
      return <Code className="w-6 h-6 text-[#176B50]" />;
    case "sql":
      return <Database className="w-6 h-6 text-[#176B50]" />;
    case "power-bi":
      return <BarChart3 className="w-6 h-6 text-[#176B50]" />;
    case "data-analytics":
      return <TrendingUp className="w-6 h-6 text-[#176B50]" />;
    case "web-development":
      return <Layout className="w-6 h-6 text-[#176B50]" />;
    case "java":
      return <Coffee className="w-6 h-6 text-[#176B50]" />;
    default:
      return <BookOpen className="w-6 h-6 text-[#176B50]" />;
  }
}

export default function CategoryTutorialsPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  const tutorials = getTutorialsByCategory(category.slug);
  const otherCategories = categoriesData.filter((c) => c.slug !== category.slug);

  // Relevant tool mappings based on category
  let relevantToolIds: string[] = [];
  if (category.slug === "sql" || category.slug === "data-analytics") {
    relevantToolIds = ["json-formatter", "word-counter"];
  } else if (category.slug === "web-development") {
    relevantToolIds = ["text-case-converter", "word-counter", "json-formatter"];
  } else if (category.slug === "python") {
    relevantToolIds = ["text-case-converter", "json-formatter"];
  } else {
    relevantToolIds = ["cgpa-calculator", "percentage-calculator", "attendance-calculator"];
  }

  const recommendedTools = toolsData.filter((t) => relevantToolIds.includes(t.id));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Tutorials`,
    description: category.description,
    url: `${siteConfig.url}/tutorials/${category.slug}`,
    hasPart: tutorials.map((tut) => ({
      "@type": "Article",
      headline: tut.title,
      url: `${siteConfig.url}/tutorials/${tut.categorySlug}/${tut.slug}`,
    })),
  };

  return (
    <div className="py-6 sm:py-10 space-y-8 max-w-[1180px] mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Tutorials", href: "/tutorials" },
          { label: category.name },
        ]}
      />

      {/* Category Hero / Header */}
      <header className="p-6 sm:p-8 rounded-lg bg-white border border-[#E7E7E3] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] flex items-center justify-center">
            {getCategoryIcon(category.slug)}
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-[#176B50] uppercase tracking-wider">
              Category Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
              {category.name}
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#737373] leading-relaxed max-w-3xl">
          {category.description}
        </p>

        <div className="flex items-center gap-4 pt-2 text-xs font-mono text-[#737373]">
          <span>
            <strong className="text-[#202124]">{tutorials.length}</strong> tutorials published
          </span>
          <span>•</span>
          <span>Updated monthly by the technical editorial team</span>
        </div>
      </header>

      {/* Top AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} label="Sponsored Ad" />

      {/* Tutorials List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#202124] tracking-tight">
            Published Guides in {category.name}
          </h2>
          <span className="text-xs font-mono text-[#737373]">
            {tutorials.length} articles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tutorials.map((tut) => (
            <article
              key={tut.id}
              className="p-5 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-all flex flex-col justify-between space-y-4 group shadow-subtle hover:shadow-card"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#737373]">
                  <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E3]">
                    {tut.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tut.readTime}</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#202124] group-hover:text-[#176B50] transition-colors leading-snug">
                  <Link href={`/tutorials/${tut.categorySlug}/${tut.slug}`}>
                    {tut.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#737373] leading-relaxed line-clamp-3">
                  {tut.summary}
                </p>

                {tut.learningObjectives && tut.learningObjectives.length > 0 && (
                  <div className="pt-2 border-t border-[#F0F0EC] space-y-1">
                    <div className="text-[11px] font-mono text-[#737373] uppercase font-semibold">
                      Key Highlights:
                    </div>
                    {tut.learningObjectives.slice(0, 2).map((obj, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs text-[#202124]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#176B50] flex-shrink-0" />
                        <span className="line-clamp-1">{obj}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E7E7E3]">
                <Link
                  href={`/tutorials/${tut.categorySlug}/${tut.slug}`}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#176B50] group-hover:text-[#12543E] transition-colors"
                >
                  <span>Read Full Tutorial</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Relevant Free Tools Section */}
      {recommendedTools.length > 0 && (
        <section className="p-6 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] space-y-4">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B50]">
              Applied Practice
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#202124]">
              Recommended Free Tools for {category.name} Learners
            </h3>
            <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
              Reinforce what you study with our client-side utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {recommendedTools.map((tool) => (
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
        </section>
      )}

      {/* Other Categories Switcher */}
      <section className="space-y-4 pt-4 border-t border-[#E7E7E3]">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#737373] font-mono">
          Explore Other Learning Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {otherCategories.map((other) => (
            <Link
              key={other.slug}
              href={`/tutorials/${other.slug}`}
              className="p-3 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#176B50] transition-colors text-center group"
            >
              <span className="text-xs font-medium text-[#202124] group-hover:text-[#176B50] block">
                {other.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom AdSlot */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER} label="Sponsored Ad" />
    </div>
  );
}