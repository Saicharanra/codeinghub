import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Calculator, BookOpen, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-700/40 flex items-center justify-center text-indigo-400 mb-6 shadow-glow">
        <AlertCircle className="w-8 h-8" />
      </div>

      <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
        Error 404
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="max-w-md text-sm sm:text-base text-slate-400 mb-8 leading-relaxed">
        The tool or tutorial page you are looking for may have been moved, renamed, or does not exist.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-glow"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 transition-all"
        >
          <Calculator className="w-4 h-4 text-indigo-400" />
          <span>Browse Tools</span>
        </Link>
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 transition-all"
        >
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>Browse Tutorials</span>
        </Link>
      </div>
    </div>
  );
}
