"use client";

import React, { useState } from "react";
import { Copy, Check, Trash2, Clock, Volume2, AlignLeft } from "lucide-react";
import { analyzeText } from "@/lib/calculators/wordCounter";
import { trackCalculationCompleted } from "@/lib/analytics";

export default function WordCounter() {
  const [text, setText] = useState<string>(
    "Coding Hub provides fast, client-side tools for university students and developers. Calculate semester GPAs, simulate attendance, format API JSON, and convert variable casing without data leakage."
  );
  const [copied, setCopied] = useState(false);

  const stats = analyzeText(text);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    trackCalculationCompleted("word-counter", "copy_stats");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      {/* 4 Main Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] text-center shadow-subtle">
          <span className="text-[11px] font-mono font-medium uppercase text-[#737373] block mb-1">
            Words
          </span>
          <span className="text-3xl font-mono font-bold text-[#202124]">
            {stats.wordsCount}
          </span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] text-center shadow-subtle">
          <span className="text-[11px] font-mono font-medium uppercase text-[#737373] block mb-1">
            Characters
          </span>
          <span className="text-3xl font-mono font-bold text-[#202124]">
            {stats.charsWithSpaces}
          </span>
          <span className="text-[10px] font-mono text-[#737373] block mt-0.5">
            ({stats.charsWithoutSpaces} w/o spaces)
          </span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] text-center shadow-subtle">
          <span className="text-[11px] font-mono font-medium uppercase text-[#737373] block mb-1">
            Sentences
          </span>
          <span className="text-3xl font-mono font-bold text-[#202124]">
            {stats.sentencesCount}
          </span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] text-center shadow-subtle">
          <span className="text-[11px] font-mono font-medium uppercase text-[#737373] block mb-1">
            Paragraphs
          </span>
          <span className="text-3xl font-mono font-bold text-[#202124]">
            {stats.paragraphsCount}
          </span>
        </div>
      </div>

      {/* Editor Area with Control Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#737373] px-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#202124]">
              <Clock className="w-3.5 h-3.5 text-[#176B50]" />
              <span>~{stats.readingTimeMinutes} min reading</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-[#202124]">
              <Volume2 className="w-3.5 h-3.5 text-[#176B50]" />
              <span>~{stats.speakingTimeMinutes} min speaking</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="px-2.5 py-1 rounded bg-[#FAFAF8] hover:bg-white text-[#202124] text-xs font-mono flex items-center gap-1 transition-colors disabled:opacity-30 border border-[#E7E7E3]"
              title="Copy all text"
              aria-label="Copy text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#176B50]" />
                  <span className="text-[#176B50]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#737373]" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="px-2.5 py-1 rounded bg-[#FAFAF8] hover:bg-[#FDF2F2] text-[#737373] hover:text-[#991B1B] text-xs font-mono flex items-center gap-1 transition-colors disabled:opacity-30 border border-[#E7E7E3] hover:border-[#F5C2C7]"
              title="Clear editor"
              aria-label="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-[#E7E7E3] bg-white overflow-hidden focus-within:border-[#176B50] focus-within:ring-1 focus-within:ring-[#176B50] transition-colors shadow-subtle">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type, write, or paste your text here to begin live analysis..."
            rows={12}
            className="w-full p-4 sm:p-5 bg-transparent text-[#202124] text-sm focus:outline-none resize-y leading-relaxed"
          />
        </div>
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-lg bg-white border border-[#E7E7E3] flex items-center justify-between font-mono text-xs">
          <span className="text-[#737373]">Avg Word Length</span>
          <span className="font-semibold text-[#202124]">
            {stats.avgWordLength} characters
          </span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E7E7E3] flex items-center justify-between font-mono text-xs">
          <span className="text-[#737373]">Whitespaces</span>
          <span className="font-semibold text-[#202124]">
            {stats.charsWithSpaces - stats.charsWithoutSpaces}
          </span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E7E7E3] flex items-center justify-between font-mono text-xs">
          <span className="text-[#737373]">Reading Pace</span>
          <span className="font-semibold text-[#176B50]">200 WPM Standard</span>
        </div>
      </div>
    </div>
  );
}
