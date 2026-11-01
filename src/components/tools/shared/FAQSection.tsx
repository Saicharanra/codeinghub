import React from "react";
import { HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
  className?: string;
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  faqs,
  className = "",
}: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className={`space-y-4 pt-8 border-t border-[#E7E7E3] ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-[#202124]">
        <HelpCircle className="w-5 h-5 text-[#176B50]" />
        <h2>{title}</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
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
  );
}
