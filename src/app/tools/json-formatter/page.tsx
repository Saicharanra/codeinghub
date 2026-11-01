import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/components/tools/shared/ToolLayout";
import JsonFormatter from "@/components/tools/JsonFormatter";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "JSON Formatter & Validator - Clean, Indent & Minify JSON Online",
  description:
    "Free online JSON Formatter, Validator, and Minifier. Clean messy API responses with 2 or 4 spaces, locate syntax errors with line/column pointers, and minify JSON with zero server uploads.",
  canonicalUrl: "/tools/json-formatter",
});

export default function JsonFormatterPage() {
  const howToUseSteps = [
    {
      title: "Paste Raw JSON",
      description: "Paste your raw JSON string, unformatted API payload, or config object into the input editor.",
    },
    {
      title: "Choose Formatting",
      description: "Switch between 2 Spaces (compact readability), 4 Spaces (standard), or Minify (single-line payload reduction).",
    },
    {
      title: "Copy or Download",
      description: "Verify syntax validity in real-time, then use the one-click copy button or download as a .json file.",
    },
  ];

  const faqs = [
    {
      question: "Is it safe to format sensitive JSON data here?",
      answer: "Yes, completely safe. Coding Hub processes and formats JSON strictly within your local browser memory using native JavaScript JSON.parse and JSON.stringify. Nothing is transmitted over the internet or saved to external servers.",
    },
    {
      question: "Why does standard JSON forbid single quotes?",
      answer: "The official RFC 8259 and ECMA-404 JSON specifications mandate that all strings and object keys must be enclosed in double quotes (\"). Single quotes ('') will trigger instant syntax parser rejection.",
    },
    {
      question: "What causes 'Unexpected token' syntax errors in JSON?",
      answer: "Common triggers include trailing commas after the final element in arrays or objects, unquoted keys, comments (which standard JSON does not support), and unescaped control characters such as raw tabs or unescaped newlines within strings.",
    },
    {
      question: "What is the difference between formatted and minified JSON?",
      answer: "Formatted JSON includes whitespace indentation and line breaks for human readability. Minified JSON strips all non-essential whitespace characters to reduce file transfer size across network connections.",
    },
  ];

  const explanationContent = (
    <div className="space-y-3">
      <p>
        JSON (JavaScript Object Notation) is a lightweight, language-independent data-interchange format. This tool implements the RFC 8259 standard:
      </p>
      <div className="p-3.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] font-mono text-xs text-[#202124] space-y-1">
        <div>1. Object keys must be enclosed in double quotation marks: <code>&quot;key&quot;: &quot;value&quot;</code></div>
        <div>2. Trailing commas are strictly prohibited: <code>[1, 2, 3]</code>, not <code>[1, 2, 3,]</code></div>
        <div>3. Values can only be strings, numbers, objects, arrays, booleans, or null.</div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      toolId="json-formatter"
      category="Developer Tools"
      title="JSON Formatter, Validator & Beautifier"
      description="Format, validate, and minify JSON payloads in your browser. Inspect syntax errors with line/column coordinates and download clean files with 100% privacy."
      breadcrumbLabel="JSON Formatter"
      schemaApplicationCategory="DeveloperApplication"
      howToUseSteps={howToUseSteps}
      explanationTitle="JSON Specifications & RFC 8259 Compliance"
      explanationContent={explanationContent}
      faqs={faqs}
      relatedCategory="Developer Tools"
    >
      <JsonFormatter />
    </ToolLayout>
  );
}
