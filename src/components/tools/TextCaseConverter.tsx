"use client";

import React, { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState<string>(
    "Coding Hub provides modern developer tools and student calculators."
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toUpperCase = (str: string) => str.toUpperCase();
  const toLowerCase = (str: string) => str.toLowerCase();

  const toSentenceCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    const minorWords = new Set(["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "with", "in", "of"]);
    return str
      .toLowerCase()
      .split(/\s+/)
      .map((word, index) => {
        if (index > 0 && minorWords.has(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, (c) => c.toLowerCase());
  };

  const toSnakeCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  };

  const toKebabCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const toConstantCase = (str: string) => {
    return str
      .trim()
      .toUpperCase()
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  };

  const conversions = [
    { key: "sentence", name: "Sentence case", fn: toSentenceCase, desc: "Standard prose capitalization", color: "text-cyan-400" },
    { key: "title", name: "Title Case", fn: toTitleCase, desc: "Capitalize major headline words", color: "text-violet-400" },
    { key: "upper", name: "UPPERCASE", fn: toUpperCase, desc: "All capital letters", color: "text-fuchsia-400" },
    { key: "lower", name: "lowercase", fn: toLowerCase, desc: "All lowercase characters", color: "text-sky-400" },
    { key: "camel", name: "camelCase", fn: toCamelCase, desc: "JS / TS variables & methods", color: "text-emerald-400" },
    { key: "snake", name: "snake_case", fn: toSnakeCase, desc: "Python variables & SQL columns", color: "text-amber-400" },
    { key: "kebab", name: "kebab-case", fn: toKebabCase, desc: "URLs, CSS classes & slugs", color: "text-pink-400" },
    { key: "constant", name: "CONSTANT_CASE", fn: toConstantCase, desc: "Config & environment keys", color: "text-rose-400" },
  ];

  const handleCopy = (textToCopy: string, key: string) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applyDirectConversion = (fn: (s: string) => string) => {
    setInputText(fn(inputText));
  };

  return (
    <div className="space-y-8">
      {/* Input Area */}
      <div className="p-6 rounded-3xl bg-[#0c101c]/90 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
            Source Text Input
          </label>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500">
              {inputText.length} characters
            </span>
            <button
              onClick={() => setInputText("")}
              disabled={!inputText}
              className="text-xs font-mono text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors disabled:opacity-30"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste any text to see instant multi-case conversions..."
          rows={5}
          className="w-full p-4 rounded-2xl bg-[#080b14] border border-white/[0.1] text-slate-100 placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 leading-relaxed"
        />

        {/* Quick Apply Buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-xs font-mono text-slate-500 self-center mr-1">Quick Apply:</span>
          {conversions.slice(0, 4).map((c) => (
            <button
              key={c.key}
              onClick={() => applyDirectConversion(c.fn)}
              disabled={!inputText}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono border border-white/[0.08] transition-all disabled:opacity-30"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Multi-Case Results Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300">
          Generated Case Variations ({conversions.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversions.map((conv) => {
            const converted = inputText ? conv.fn(inputText) : "";
            const isCopied = copiedKey === conv.key;

            return (
              <div
                key={conv.key}
                className="p-5 rounded-2xl bg-[#0c101c]/80 border border-white/[0.08] hover:border-white/[0.16] transition-all duration-200 space-y-3 flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-mono font-bold ${conv.color}`}>
                      {conv.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{conv.desc}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#080b14] border border-white/[0.06] font-mono text-xs text-slate-200 break-all select-all min-h-[44px] flex items-center">
                    {converted || <span className="text-slate-600 font-sans text-xs">Waiting for text...</span>}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleCopy(converted, conv.key)}
                    disabled={!converted}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center gap-1.5 transition-all disabled:opacity-30"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
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
