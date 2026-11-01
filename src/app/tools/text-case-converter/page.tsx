import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/components/tools/shared/ToolLayout";
import TextCaseConverter from "@/components/tools/TextCaseConverter";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Text Case Converter - Convert UPPERCASE, lowercase, Title Case, Sentence case",
  description:
    "Free multi-style text case converter. Instantly transform strings into UPPERCASE, lowercase, Title Case, Sentence case, Capitalize Each Word, camelCase, snake_case, and kebab-case.",
  canonicalUrl: "/tools/text-case-converter",
});

export default function TextCaseConverterPage() {
  const howToUseSteps = [
    {
      title: "Paste Source Text",
      description: "Type or paste your text string, code variable, or heading into the primary editor.",
    },
    {
      title: "Review Instant Previews",
      description: "All 8 case variations render simultaneously in real-time as you type.",
    },
    {
      title: "Copy Desired Format",
      description: "Click 'Copy' on your desired variation to copy the formatted text to your clipboard.",
    },
  ];

  const faqs = [
    {
      question: "What is the difference between Title Case and Capitalize Each Word?",
      answer: "Title Case follows grammatical styling rules: major words are capitalized while minor conjunctions, prepositions, and articles (like 'and', 'the', 'of', 'in') remain lowercase unless they appear as the first word. Capitalize Each Word (Start Case) capitalizes the initial letter of every single word unconditionally.",
    },
    {
      question: "What is camelCase used for?",
      answer: "camelCase is the predominant naming convention for variables, properties, and function identifiers in JavaScript, TypeScript, Swift, Java, and Go.",
    },
    {
      question: "What is snake_case used for?",
      answer: "snake_case separates words with underscores. It is the official convention for functions, variables, and modules in Python (PEP 8), Rust, Ruby, and SQL column identifiers.",
    },
    {
      question: "What is kebab-case used for?",
      answer: "kebab-case separates words with hyphens. It is the web standard for URL slugs, REST API endpoint paths, HTML attributes, and CSS class names.",
    },
  ];

  const explanationContent = (
    <div className="space-y-3">
      <p>
        Choosing the correct capitalization style prevents runtime errors in programming and improves reading comprehension in editorial content:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded bg-white border border-[#E7E7E3] space-y-1">
          <strong className="text-[#176B50] font-mono block">camelCase</strong>
          <p className="text-[#737373]">Initial word lowercase, subsequent words capitalized.</p>
          <code className="text-[#202124] bg-[#FAFAF8] px-1.5 py-0.5 rounded border border-[#E7E7E3] block">
            calculateStudentAttendance()
          </code>
        </div>
        <div className="p-3 rounded bg-white border border-[#E7E7E3] space-y-1">
          <strong className="text-[#176B50] font-mono block">snake_case</strong>
          <p className="text-[#737373]">All words lowercase joined by underscores.</p>
          <code className="text-[#202124] bg-[#FAFAF8] px-1.5 py-0.5 rounded border border-[#E7E7E3] block">
            total_classes_conducted = 48
          </code>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      toolId="text-case-converter"
      category="Developer Tools"
      title="Multi-Style Text Case Converter"
      description="Convert text into UPPERCASE, lowercase, Title Case, Sentence case, Capitalize Each Word, camelCase, snake_case, and kebab-case with single-click copying."
      breadcrumbLabel="Text Case Converter"
      schemaApplicationCategory="DeveloperApplication"
      howToUseSteps={howToUseSteps}
      explanationTitle="Case Conventions in Development and Writing"
      explanationContent={explanationContent}
      faqs={faqs}
      relatedCategory="Developer Tools"
    >
      <TextCaseConverter />
    </ToolLayout>
  );
}
