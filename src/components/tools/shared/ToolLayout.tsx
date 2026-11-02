import React from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolHeader from "./ToolHeader";
import FAQSection, { FAQItem } from "./FAQSection";
import RelatedTools from "./RelatedTools";
import ToolAnalyticsTracker from "./ToolAnalyticsTracker";
import AdSlot from "@/components/ads/AdSlot";

interface HowToUseStep {
  title: string;
  description: string;
}

interface ToolLayoutProps {
  toolId: string;
  category: "Student Tools" | "Developer Tools";
  title: string;
  description: string;
  breadcrumbLabel: string;
  schemaApplicationCategory?: string;
  children: React.ReactNode;
  howToUseSteps?: HowToUseStep[];
  explanationTitle?: string;
  explanationContent?: React.ReactNode;
  faqs?: FAQItem[];
  relatedCategory?: string;
}

export default function ToolLayout({
  toolId,
  category,
  title,
  description,
  breadcrumbLabel,
  schemaApplicationCategory = "WebApplication",
  children,
  howToUseSteps,
  explanationTitle,
  explanationContent,
  faqs,
  relatedCategory,
}: ToolLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    applicationCategory: schemaApplicationCategory,
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: description,
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <ToolAnalyticsTracker toolId={toolId} title={title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: breadcrumbLabel },
        ]}
      />

      <ToolHeader category={category} title={title} description={description} />

      {/* Main Working Interface */}
      <div className="space-y-6">{children}</div>

      {/* Sponsored AdSlot (Auto collapses if unconfigured) */}
      <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} label="Advertisement" />

      {/* How to Use Section */}
      {howToUseSteps && howToUseSteps.length > 0 && (
        <section className="space-y-3 pt-6 border-t border-[#E7E7E3]">
          <h2 className="text-lg font-semibold text-[#202124]">
            How to Use This Tool
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {howToUseSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-white border border-[#E7E7E3] space-y-1.5"
              >
                <div className="w-5 h-5 rounded-full bg-[#EBF5F1] text-[#176B50] font-mono text-xs font-semibold flex items-center justify-center">
                  {idx + 1}
                </div>
                <h3 className="text-xs font-semibold text-[#202124]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formula & Technical Explanation Section */}
      {explanationContent && (
        <section className="space-y-3 pt-6 border-t border-[#E7E7E3]">
          {explanationTitle && (
            <h2 className="text-lg font-semibold text-[#202124]">
              {explanationTitle}
            </h2>
          )}
          <div className="text-sm leading-relaxed text-[#737373] space-y-3">
            {explanationContent}
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}

      {/* Related Tools */}
      <RelatedTools currentToolId={toolId} category={relatedCategory} limit={2} />
    </div>
  );
}
