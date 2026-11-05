"use client";

import React, { useState } from "react";
import {
  FileCode2,
  Check,
  Copy,
  Trash2,
  Download,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { processJson } from "@/lib/calculators/json";
import { trackCalculationCompleted } from "@/lib/analytics";
import { showToast } from "@/components/common/Toast";

export default function JsonFormatter() {
  const sampleJson = `{
  "name": "Coding Hub",
  "type": "Developer Platform",
  "version": 1.0,
  "privacy": {
    "clientSideOnly": true,
    "serverUploads": false
  },
  "tools": [
    "CGPA Calculator",
    "Percentage Calculator",
    "Attendance Calculator",
    "JSON Formatter",
    "Word Counter",
    "Text Case Converter"
  ]
}`;

  const [inputJson, setInputJson] = useState<string>(sampleJson);
  const [indentMode, setIndentMode] = useState<2 | 4 | "compact">(2);
  const [copied, setCopied] = useState(false);

  const result = processJson(inputJson, indentMode);

  const loadSample = () => {
    setInputJson(sampleJson);
    showToast("Sample JSON loaded", "success");
  };

  const handleClear = () => {
    setInputJson("");
    showToast("Editor cleared", "info");
  };

  const handleCopy = () => {
    if (!result.isValid || !result.formatted) return;
    navigator.clipboard.writeText(result.formatted);
    setCopied(true);
    showToast("Formatted JSON copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result.isValid || !result.formatted) return;
    const blob = new Blob([result.formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = indentMode === "compact" ? "minified.json" : "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("JSON file downloaded", "success");
  };

  return (
    <div className="space-y-6">
      {/* Control Bar: Indentation options & sample load */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-white border border-[#E7E7E3]">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-mono font-medium text-[#737373] uppercase tracking-wider mr-1">
            Indentation:
          </span>
          <button
            onClick={() => {
              setIndentMode(2);
              trackCalculationCompleted("json-formatter", "indent_2_spaces");
            }}
            className={`px-3 py-1 rounded text-[13px] sm:text-[14px] font-medium transition-colors ${
              indentMode === 2
                ? "bg-[#176B50] text-white font-semibold"
                : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
            }`}
          >
            2 Spaces
          </button>
          <button
            onClick={() => {
              setIndentMode(4);
              trackCalculationCompleted("json-formatter", "indent_4_spaces");
            }}
            className={`px-3 py-1 rounded text-[13px] sm:text-[14px] font-medium transition-colors ${
              indentMode === 4
                ? "bg-[#176B50] text-white font-semibold"
                : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
            }`}
          >
            4 Spaces
          </button>
          <button
            onClick={() => {
              setIndentMode("compact");
              trackCalculationCompleted("json-formatter", "minify_compact");
            }}
            className={`px-3 py-1 rounded text-[13px] sm:text-[14px] font-medium transition-colors ${
              indentMode === "compact"
                ? "bg-[#176B50] text-white font-semibold"
                : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
            }`}
          >
            Minify (Compact)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] sm:text-[14px] font-medium text-[#176B50] hover:text-[#12543E] bg-[#EBF5F1] hover:bg-[#DDF0E8] border border-[#C8E3D8] transition-colors"
            title="Load sample JSON payload"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Sample</span>
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded text-[13px] sm:text-[14px] font-medium text-[#737373] hover:text-[#991B1B] bg-[#FAFAF8] border border-[#E7E7E3] hover:border-[#F5C2C7] flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Status Banners */}
      {!result.isValid ? (
        <div className="p-3.5 rounded-lg bg-[#FDF2F2] border border-[#F5C2C7] text-[#991B1B] flex items-start gap-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#DC2626]" />
          <div className="space-y-0.5 text-xs font-mono">
            <div className="font-semibold text-[#991B1B]">
              Syntax Error {result.line && `at Line ${result.line}, Column ${result.column}`}
            </div>
            <p className="text-[#B91C1C]">{result.error}</p>
          </div>
        </div>
      ) : inputJson.trim() ? (
        <div className="p-3 rounded-lg bg-[#EBF5F1] border border-[#C8E3D8] text-[#176B50] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#176B50]" />
            <span className="font-semibold">Valid RFC 8259 JSON</span>
          </div>
          <div className="flex items-center gap-3 text-[#737373]">
            <span>{result.linesCount} lines</span>
            <span>{result.charCount} chars</span>
            <span>{result.byteSize} bytes</span>
          </div>
        </div>
      ) : null}

      {/* Editor & Viewer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[13px] font-mono text-[#737373] px-1">
            <span className="font-semibold uppercase tracking-wider text-[#202124]">
              Raw JSON Input
            </span>
            <span>{inputJson.length} chars</span>
          </div>
          <div className="rounded-lg border border-[#E7E7E3] bg-white overflow-hidden focus-within:border-[#176B50] focus-within:ring-1 focus-within:ring-[#176B50] transition-colors">
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Paste or type raw JSON here..."
              rows={16}
              className="w-full p-4 bg-transparent text-[#202124] font-mono text-[14px] sm:text-[14.5px] focus:outline-none resize-y leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[13px] font-mono text-[#737373] px-1">
            <span className="font-semibold uppercase tracking-wider text-[#202124]">
              Formatted / Minified Output
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                disabled={!result.isValid || !result.formatted}
                className="hover:text-[#176B50] transition-colors disabled:opacity-30 p-1"
                title="Download JSON file"
                aria-label="Download JSON file"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                disabled={!result.isValid || !result.formatted}
                className="hover:text-[#176B50] transition-colors disabled:opacity-30 p-1"
                title="Copy to clipboard"
                aria-label="Copy to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-[#176B50]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="relative rounded-lg border border-[#E7E7E3] bg-[#FAFAF8] overflow-hidden">
            <textarea
              value={result.isValid ? result.formatted : ""}
              readOnly
              rows={16}
              className="w-full p-4 bg-transparent text-[#202124] font-mono text-[14px] sm:text-[14.5px] focus:outline-none resize-y leading-relaxed select-all"
              placeholder="Formatted output will appear here..."
              spellCheck={false}
            />
            {result.isValid && result.formatted && (
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-2.5 py-1 rounded bg-white hover:bg-[#FAFAF8] text-xs font-mono font-medium text-[#202124] border border-[#E7E7E3] flex items-center gap-1.5 transition-colors shadow-sm"
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
            )}
          </div>
        </div>
      </div>

      {/* Privacy guarantee reminder */}
      <div className="p-3.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] flex items-center gap-2 text-xs text-[#737373]">
        <ShieldCheck className="w-4 h-4 text-[#176B50] flex-shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> Your JSON objects, API responses, and database payloads are parsed entirely in your browser using native JavaScript. No network requests are made.
        </span>
      </div>
    </div>
  );
}
