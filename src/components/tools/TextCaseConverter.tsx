"use client";

import React, { useState } from "react";
import { Copy, Check, Trash2, Sparkles } from "lucide-react";
import {
  toUpperCase,
  toLowerCase,
  toSentenceCase,
  toTitleCase,
  toCapitalizeEachWord,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
} from "@/lib/calculators/textCase";
import { trackCalculationCompleted } from "@/lib/analytics";
import { showToast } from "@/components/common/Toast";

export default function TextCaseConverter() {
  const sampleText =
    "Coding Hub provides modern developer tools and student calculators.";

  const [inputText, setInputText] = useState<string>(sampleText);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cases = [
    {
      key: "sentence",
      name: "Sentence case",
      fn: toSentenceCase,
      description: "Capitalizes the first letter of each sentence.",
    },
    {
      key: "title",
      name: "Title Case",
      fn: toTitleCase,
      description: "Capitalizes major words while keeping articles & prepositions lowercase.",
    },
    {
      key: "capitalizeEach",
      name: "Capitalize Each Word",
      fn: toCapitalizeEachWord,
      description: "Capitalizes the initial letter of every single word.",
    },
    {
      key: "upper",
      name: "UPPERCASE",
      fn: toUpperCase,
      description: "Transforms all characters into capital letters.",
    },
    {
      key: "lower",
      name: "lowercase",
      fn: toLowerCase,
      description: "Transforms all characters into lowercase letters.",
    },
    {
      key: "camel",
      name: "camelCase",
      fn: toCamelCase,
      description: "JavaScript and TypeScript variable and function naming standard.",
    },
    {
      key: "snake",
      name: "snake_case",
      fn: toSnakeCase,
      description: "Standard Python variables, functions, and SQL column identifiers.",
    },
    {
      key: "kebab",
      name: "kebab-case",
      fn: toKebabCase,
      description: "URL slugs, CSS class selectors, and package naming standard.",
    },
  ];

  const handleCopy = (text: string, key: string, name?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`${name || "Converted text"} copied to clipboard`, "success");
    trackCalculationCompleted("text-case-converter", `copy_${key}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleClear = () => {
    setInputText("");
    showToast("Input text cleared", "info");
  };

  const handleLoadSample = () => {
    setInputText(sampleText);
    showToast("Sample text loaded", "success");
  };

  const applyDirectTransform = (fn: (s: string) => string) => {
    setInputText(fn(inputText));
  };

  return (
    <div className="space-y-6">
      {/* Input Text Card */}
      <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] space-y-3.5 shadow-subtle">
        <div className="flex items-center justify-between">
          <label className="text-[14px] sm:text-[15px] font-semibold uppercase tracking-wider text-[#202124]">
            Source Text Input
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#737373] mr-1">
              {inputText.length} characters
            </span>
            <button
              onClick={handleLoadSample}
              className="text-[13px] sm:text-[14px] font-medium text-[#176B50] hover:text-[#12543E] bg-[#EBF5F1] hover:bg-[#DDF0E8] border border-[#C8E3D8] px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
              title="Load sample text"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sample</span>
            </button>
            <button
              onClick={handleClear}
              disabled={!inputText}
              className="text-[13px] sm:text-[14px] font-medium text-[#737373] hover:text-[#991B1B] flex items-center gap-1 transition-colors disabled:opacity-30 px-2.5 py-1.5 rounded border border-[#E7E7E3] hover:border-[#F5C2C7]"
              title="Clear input"
              aria-label="Clear input text"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste any text to see instant case conversions..."
          rows={4}
          className="w-full p-4 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] text-[#202124] placeholder-[#737373] text-[15px] font-mono focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] leading-relaxed"
        />

        {/* Quick Transform Buttons that update input directly */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[13px] font-mono text-[#737373] mr-1">Quick Apply to Input:</span>
          {cases.slice(0, 5).map((c) => (
            <button
              key={c.key}
              onClick={() => applyDirectTransform(c.fn)}
              disabled={!inputText}
              className="px-3 py-1.5 rounded bg-[#FAFAF8] hover:bg-white text-[#202124] text-[13px] sm:text-[14px] font-medium border border-[#E7E7E3] hover:border-[#D3D3CD] transition-colors disabled:opacity-30"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Case Results Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#737373] px-1">
          <span className="uppercase tracking-wider font-medium text-[#202124]">
            Instant Case Variations ({cases.length})
          </span>
          <span>Click &apos;Copy&apos; to grab any case format</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {cases.map((conv) => {
            const converted = inputText ? conv.fn(inputText) : "";
            const isCopied = copiedKey === conv.key;

            return (
              <div
                key={conv.key}
                className="p-4 rounded-lg bg-white border border-[#E7E7E3] hover:border-[#D3D3CD] transition-colors flex flex-col justify-between gap-3 shadow-subtle"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[15px] font-semibold text-[#202124]">
                      {conv.name}
                    </span>
                    <span className="text-[12px] font-mono text-[#737373]">
                      {conv.description}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-md bg-[#FAFAF8] border border-[#E7E7E3] font-mono text-[14px] sm:text-[14.5px] text-[#202124] break-all select-all min-h-[44px] flex items-center leading-relaxed">
                    {converted || (
                      <span className="text-[#737373] font-sans text-xs">
                        Enter text above to preview...
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleCopy(converted, conv.key, conv.name)}
                    disabled={!converted}
                    className="px-3 py-1.5 rounded text-[13px] sm:text-[14px] font-medium text-[#202124] hover:text-[#176B50] bg-[#FAFAF8] hover:bg-white border border-[#E7E7E3] flex items-center gap-1.5 transition-colors disabled:opacity-30"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#176B50]" />
                        <span className="text-[#176B50] font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#737373]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
