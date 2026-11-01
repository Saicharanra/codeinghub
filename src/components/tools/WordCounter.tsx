"use client";

import React, { useState, useMemo } from "react";
import { Type, Copy, Check, Trash2, Clock, Volume2, FileText, AlignLeft } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState<string>(
    "Coding Hub is an all-in-one developer and student platform designed for high performance, accessibility, and utility. Students calculate semester CGPA and attendance requirements, while developers format JSON, convert casing conventions, and count words with zero latency."
  );
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const raw = text;
    const trimmed = text.trim();

    // Characters
    const charsWithSpaces = raw.length;
    const charsWithoutSpaces = raw.replace(/\s+/g, "").length;

    // Words
    const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const wordsCount = wordsArray.length;

    // Sentences (split by punctuation followed by space or end)
    const sentencesArray = trimmed
      ? trimmed.split(/[.!?]+(?:\s+|$)/).filter(Boolean)
      : [];
    const sentencesCount = sentencesArray.length;

    // Paragraphs (split by two or more newlines or single newline with non-empty)
    const paragraphsArray = trimmed
      ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0)
      : [];
    const paragraphsCount = paragraphsArray.length;

    // Reading time: standard average 200 words per minute
    const readingTimeMinutes = Math.ceil(wordsCount / 200);

    // Speaking time: standard average 130 words per minute
    const speakingTimeMinutes = Math.ceil(wordsCount / 130);

    // Average word length
    const avgWordLength =
      wordsCount > 0 ? (charsWithoutSpaces / wordsCount).toFixed(1) : "0";

    return {
      wordsCount,
      charsWithSpaces,
      charsWithoutSpaces,
      sentencesCount,
      paragraphsCount,
      readingTimeMinutes,
      speakingTimeMinutes,
      avgWordLength,
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-card border border-slate-800 text-center shadow-sm">
          <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
            Words
          </span>
          <span className="text-3xl font-black text-indigo-400">
            {stats.wordsCount}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-card border border-slate-800 text-center shadow-sm">
          <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
            Characters
          </span>
          <span className="text-3xl font-black text-purple-400">
            {stats.charsWithSpaces}
          </span>
          <span className="text-[10px] text-slate-500 block">
            ({stats.charsWithoutSpaces} w/o spaces)
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-card border border-slate-800 text-center shadow-sm">
          <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
            Sentences
          </span>
          <span className="text-3xl font-black text-blue-400">
            {stats.sentencesCount}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-card border border-slate-800 text-center shadow-sm">
          <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
            Paragraphs
          </span>
          <span className="text-3xl font-black text-pink-400">
            {stats.paragraphsCount}
          </span>
        </div>
      </div>

      {/* Editor Box */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>~{stats.readingTimeMinutes} min reading time</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
              <span>~{stats.speakingTimeMinutes} min speaking time</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-40"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-40"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden focus-within:border-indigo-500/80 transition-all shadow-inner">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to begin live analysis..."
            rows={12}
            className="w-full p-4 sm:p-6 bg-transparent text-slate-100 text-sm sm:text-base focus:outline-none resize-y leading-relaxed"
          />
        </div>
      </div>

      {/* Secondary Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">Avg Word Length</span>
          <span className="text-sm font-semibold text-slate-200">
            {stats.avgWordLength} characters
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">Total Whitespaces</span>
          <span className="text-sm font-semibold text-slate-200">
            {stats.charsWithSpaces - stats.charsWithoutSpaces}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">Reading Level</span>
          <span className="text-sm font-semibold text-emerald-400">General Public</span>
        </div>
      </div>
    </div>
  );
}
