"use client";

import React, { useState } from "react";
import {
  FileCode2,
  Check,
  Copy,
  Trash2,
  Download,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function JsonFormatter() {
  const sampleJson = `{
  "platform": "Coding Hub",
  "status": "active",
  "version": 1.0,
  "features": [
    "Student Calculators",
    "Developer Tools",
    "Technical Tutorials"
  ],
  "author": {
    "name": "Coding Hub Engineering",
    "verified": true
  }
}`;

  const [inputJson, setInputJson] = useState<string>(sampleJson);
  const [outputJson, setOutputJson] = useState<string>(sampleJson);
  const [indentation, setIndentation] = useState<2 | 4 | "compact">(2);
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const formatJson = (content: string, indent: 2 | 4 | "compact") => {
    if (!content.trim()) {
      setOutputJson("");
      setError(null);
      setIsValid(true);
      return;
    }

    try {
      const parsed = JSON.parse(content);
      const formatted =
        indent === "compact"
          ? JSON.stringify(parsed)
          : JSON.stringify(parsed, null, indent);
      setOutputJson(formatted);
      setError(null);
      setIsValid(true);
    } catch (err: any) {
      setIsValid(false);
      let errorMsg = err.message || "Invalid JSON syntax";

      let line: number | undefined;
      let col: number | undefined;

      const posMatch = errorMsg.match(/position (\d+)/);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const upToPos = content.substring(0, pos);
        const lines = upToPos.split("\n");
        line = lines.length;
        col = lines[lines.length - 1].length + 1;
      }

      setError({
        message: errorMsg,
        line,
        column: col,
      });
    }
  };

  const handleInputChange = (val: string) => {
    setInputJson(val);
    formatJson(val, indentation);
  };

  const handleIndentChange = (newIndent: 2 | 4 | "compact") => {
    setIndentation(newIndent);
    formatJson(inputJson, newIndent);
  };

  const loadSample = () => {
    setInputJson(sampleJson);
    formatJson(sampleJson, indentation);
  };

  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setError(null);
    setIsValid(true);
  };

  const handleCopy = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputJson) return;
    const blob = new Blob([outputJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action and Configuration Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c101c]/90 border border-white/[0.08] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Indentation:
          </span>
          <button
            onClick={() => handleIndentChange(2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              indentation === 2
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            2 Spaces
          </button>
          <button
            onClick={() => handleIndentChange(4)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              indentation === 4
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            4 Spaces
          </button>
          <button
            onClick={() => handleIndentChange("compact")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              indentation === "compact"
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            Minify (Compact)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadSample}
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono border border-white/[0.08] transition-all"
          >
            Load Sample
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-200 flex items-start gap-3 animate-in fade-in shadow-[0_0_20px_rgba(244,63,94,0.2)]">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs font-mono">
            <div className="font-bold text-rose-300">
              Syntax Error {error.line && `at Line ${error.line}, Column ${error.column}`}
            </div>
            <p className="text-rose-200/90">{error.message}</p>
          </div>
        </div>
      )}

      {/* Editor & Viewer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span className="font-semibold uppercase tracking-wider text-slate-300">
              Input Raw JSON
            </span>
            <span>{inputJson.length} characters</span>
          </div>
          <div className="relative rounded-2xl border border-white/[0.1] bg-[#080b14] overflow-hidden focus-within:border-cyan-400/80 transition-all shadow-inner">
            <textarea
              value={inputJson}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Paste or type raw JSON here..."
              rows={18}
              className="w-full p-4 bg-transparent text-slate-100 font-mono text-xs sm:text-sm focus:outline-none resize-y leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold uppercase tracking-wider text-slate-300">
                Formatted Output
              </span>
              {isValid && inputJson.trim() && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Valid RFC 8259</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                disabled={!outputJson || !isValid}
                className="hover:text-cyan-400 transition-colors disabled:opacity-30 p-1"
                title="Download JSON file"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopy}
                disabled={!outputJson || !isValid}
                className="hover:text-cyan-400 transition-colors disabled:opacity-30 p-1"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <div className="relative rounded-2xl border border-white/[0.1] bg-[#0c101c]/90 overflow-hidden shadow-inner">
            <textarea
              value={outputJson}
              readOnly
              rows={18}
              className="w-full p-4 bg-transparent text-cyan-200 font-mono text-xs sm:text-sm focus:outline-none resize-y leading-relaxed select-all"
              placeholder="Formatted output will appear here..."
              spellCheck={false}
            />
            {outputJson && (
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-mono font-medium text-white border border-white/[0.15] flex items-center gap-1.5 transition-all shadow-md backdrop-blur-md"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
