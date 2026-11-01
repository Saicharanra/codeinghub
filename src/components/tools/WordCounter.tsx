"use client";

import React, { useState, useMemo } from "react";
import { Type, Copy, Check, Trash2, Clock, Volume2 } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState<string>(
    "Coding Hub provides fast, client-side tools for university students and developers. Calculate semester GPAs, simulate attendance, format API JSON, and convert variable casing without data leakage."
  );
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const raw = text;
    const trimmed = text.trim();

    const charsWithSpaces = raw.length;
    const charsWithoutSpaces = raw.replace(/\s+/g, "").length;

    const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const wordsCount = wordsArray.length;

    const sentencesArray = trimmed
      ? trimmed.split(/[.!?]+(?:\s+|$)/).filter(Boolean)
      : [];
    const sentencesCount = sentencesArray.length;

    const paragraphsArray = trimmed
      ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0)
      : [];
    const paragraphsCount = paragraphsArray.length;

    const readingTimeMinutes = Math.ceil(wordsCount / 200);
    const speakingTimeMinutes = Math.ceil(wordsCount / 130);

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
      {/* Metric Cards Banner with Cool Colors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0c101c]/90 border border-white/[0.08] hover:border-cyan-500/40 text-center shadow-card transition-all">
          <span className="text-xs font-mono font-semibold uppercase text-slate-400 block mb-1">
            Words
          </span>
          <span className="text-3xl sm:text-4xl font-mono font-black text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            {stats.wordsCount}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c101c]/90 border border-white/[0.08] hover:border-violet-500/40 text-center shadow-card transition-all">
          <span className="text-xs font-mono font-semibold uppercase text-slate-400 block mb-1">
            Characters
          </span>
          <span className="text-3xl sm:text-4xl font-mono font-black text-violet-400 drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            {stats.charsWithSpaces}
          </span>
          <span className="text-[10px] font-mono text-slate-500 block">
            ({stats.charsWithoutSpaces} w/o spaces)
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c101c]/90 border border-white/[0.08] hover:border-sky-500/40 text-center shadow-card transition-all">
          <span className="text-xs font-mono font-semibold uppercase text-slate-400 block mb-1">
            Sentences
          </span>
          <span className="text-3xl sm:text-4xl font-mono font-black text-sky-400 drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            {stats.sentencesCount}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c101c]/90 border border-white/[0.08] hover:border-fuchsia-500/40 text-center shadow-card transition-all">
          <span className="text-xs font-mono font-semibold uppercase text-slate-400 block mb-1">
            Paragraphs
          </span>
          <span className="text-3xl sm:text-4xl font-mono font-black text-fuchsia-400 drop-shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            {stats.paragraphsCount}
          </span>
        </div>
      </div>

      {/* Editor Box */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>~{stats.readingTimeMinutes} min reading</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Volume2 className="w-3.5 h-3.5 text-violet-400" />
              <span>~{stats.speakingTimeMinutes} min speaking</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="px-3 py-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-30 border border-white/[0.08]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-30 border border-white/[0.08]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.1] bg-[#080b14] overflow-hidden focus-within:border-cyan-400/80 transition-all shadow-inner">
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
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between font-mono text-xs">
          <span className="text-slate-400">Avg Word Length</span>
          <span className="font-bold text-slate-200">
            {stats.avgWordLength} characters
          </span>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between font-mono text-xs">
          <span className="text-slate-400">Whitespaces</span>
          <span className="font-bold text-slate-200">
            {stats.charsWithSpaces - stats.charsWithoutSpaces}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between font-mono text-xs">
          <span className="text-slate-400">Reading Level</span>
          <span className="font-bold text-emerald-400">Standard English</span>
        </div>
      </div>
    </div>
  );
}
