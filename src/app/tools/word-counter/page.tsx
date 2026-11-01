import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/components/tools/shared/ToolLayout";
import WordCounter from "@/components/tools/WordCounter";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Word Counter - Live Word, Character, Sentence & Paragraph Counter",
  description:
    "Free real-time word counter and text character analyzer. Track words, characters (with and without whitespace), sentences, paragraphs, reading time, and speaking duration.",
  canonicalUrl: "/tools/word-counter",
});

export default function WordCounterPage() {
  const howToUseSteps = [
    {
      title: "Type or Paste Text",
      description: "Start typing directly into the large editor or paste your manuscript, blog draft, or social post.",
    },
    {
      title: "Monitor Real-Time Stats",
      description: "Words, characters, sentences, paragraphs, and reading durations automatically recompute on every keystroke.",
    },
    {
      title: "Copy or Clear",
      description: "Use the top right actions to copy your edited copy to clipboard or clear the input box.",
    },
  ];

  const faqs = [
    {
      question: "How is reading time calculated?",
      answer: "Reading time is calculated assuming an average adult silent reading speed of 200 words per minute (WPM), supported by cognitive reading studies.",
    },
    {
      question: "How is speaking time calculated?",
      answer: "Speaking and presentation delivery speeds average roughly 130 words per minute (WPM). This metric helps you rehearse speeches, video scripts, and presentation decks.",
    },
    {
      question: "Does the word counter count numbers as words?",
      answer: "Yes, standalone digits and numbers separated by whitespace (such as '42' or '2026') count as distinct words.",
    },
    {
      question: "Are hyphens counted as separate words?",
      answer: "Hyphenated terms (such as 'full-stack' or 'client-side') are treated as single continuous word tokens unless separated by whitespace.",
    },
  ];

  const explanationContent = (
    <div className="space-y-3">
      <p>
        Adhering to platform character limits ensures readability and prevents truncation in software interfaces:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-[#E7E7E3] rounded-lg overflow-hidden">
          <thead className="bg-[#FAFAF8] text-[#202124] font-semibold border-b border-[#E7E7E3]">
            <tr>
              <th className="p-2.5">Context / Channel</th>
              <th className="p-2.5">Optimal Range</th>
              <th className="p-2.5">Guideline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E7E3] bg-white text-[#737373]">
            <tr>
              <td className="p-2.5 font-medium text-[#202124]">Google SEO Title</td>
              <td className="p-2.5 text-[#176B50] font-mono">50 - 60 chars</td>
              <td className="p-2.5">Fits within 600px desktop SERP limits</td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-[#202124]">Meta Description</td>
              <td className="p-2.5 text-[#176B50] font-mono">140 - 160 chars</td>
              <td className="p-2.5">Prevents mobile snippet cutoffs</td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-[#202124]">Git Commit Subject</td>
              <td className="p-2.5 text-[#176B50] font-mono">50 chars max</td>
              <td className="p-2.5">Follows standard Git log readability guidelines</td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-[#202124]">Academic Abstract</td>
              <td className="p-2.5 text-[#176B50] font-mono">150 - 250 words</td>
              <td className="p-2.5">Standard university journal requirement</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <ToolLayout
      toolId="word-counter"
      category="Developer Tools"
      title="Word & Character Counter"
      description="Inspect real-time text metrics as you write. Track word volume, character density with and without whitespace, sentence count, and speech time."
      breadcrumbLabel="Word Counter"
      schemaApplicationCategory="UtilityApplication"
      howToUseSteps={howToUseSteps}
      explanationTitle="Character Guidelines & Text Statistics"
      explanationContent={explanationContent}
      faqs={faqs}
      relatedCategory="Developer Tools"
    >
      <WordCounter />
    </ToolLayout>
  );
}
