import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/components/tools/shared/ToolLayout";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Percentage Calculator - Marks %, Number %, & Percentage Change",
  description:
    "Free online percentage calculator with three distinct calculation modes: calculate exam marks percentages, compute percentages of numbers, and evaluate percentage increase or decrease.",
  canonicalUrl: "/tools/percentage-calculator",
});

export default function PercentageCalculatorPage() {
  const howToUseSteps = [
    {
      title: "Choose Mode",
      description: "Select between Mode A (Exam Marks Percentage), Mode B (Percentage of a Number), or Mode C (Percentage Change).",
    },
    {
      title: "Enter Numerical Values",
      description: "Fill in the required fields. Decimal values and negative numbers (for change mode) are automatically validated.",
    },
    {
      title: "Inspect Instant Results",
      description: "The calculated percentage, step explanation, and ratio appear instantly without needing page reloads.",
    },
  ];

  const faqs = [
    {
      question: "How is percentage calculated from exam marks?",
      answer: "Percentage is determined by dividing marks obtained by total maximum marks and multiplying by 100: (Obtained / Total) × 100.",
    },
    {
      question: "What does percentage change represent?",
      answer: "Percentage change quantifies the relative difference between an original value and a new value. A positive percentage indicates an increase, while a negative percentage indicates a decrease.",
    },
    {
      question: "Why can't the original value be zero in percentage change?",
      answer: "Percentage change divides the difference by the absolute value of the original number. When the original value is zero, this results in an undefined mathematical division by zero.",
    },
    {
      question: "Can percentage exceed 100%?",
      answer: "Yes. When the obtained value exceeds the baseline total (such as bonus exam questions or traffic growth greater than 2x), the percentage is legitimately over 100%.",
    },
  ];

  const explanationContent = (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#202124] mb-1">
          1. Marks Percentage Formula
        </h4>
        <div className="p-3 rounded bg-[#FAFAF8] border border-[#E7E7E3] font-mono text-xs text-[#176B50]">
          Percentage (%) = (Marks Obtained / Total Maximum Marks) × 100
        </div>
      </div>

      <div>
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#202124] mb-1">
          2. Percentage of a Number Formula
        </h4>
        <div className="p-3 rounded bg-[#FAFAF8] border border-[#E7E7E3] font-mono text-xs text-[#176B50]">
          Result = (Percentage Rate / 100) × Base Number
        </div>
      </div>

      <div>
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#202124] mb-1">
          3. Percentage Change Formula
        </h4>
        <div className="p-3 rounded bg-[#FAFAF8] border border-[#E7E7E3] font-mono text-xs text-[#176B50]">
          Percentage Change (%) = ( (New Value - Original Value) / |Original Value| ) × 100
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      toolId="percentage-calculator"
      category="Student Tools"
      title="Academic & Score Percentage Calculator"
      description="Quickly compute exam score percentages, calculate exact percentages of numbers, or determine percentage increase and decrease."
      breadcrumbLabel="Percentage Calculator"
      schemaApplicationCategory="EducationalApplication"
      howToUseSteps={howToUseSteps}
      explanationTitle="Mathematical Formulas & Derivations"
      explanationContent={explanationContent}
      faqs={faqs}
      relatedCategory="Student Tools"
    >
      <PercentageCalculator />
    </ToolLayout>
  );
}
