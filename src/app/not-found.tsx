import React from "react";
import Link from "next/link";
import { Home, Calculator, BookOpen, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-12 h-12 rounded-lg bg-[#EBF5F1] text-[#176B50] flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>

      <span className="text-xs font-mono uppercase tracking-widest text-[#176B50] mb-2 font-semibold">
        Error 404 • Page Not Found
      </span>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight mb-2">
        Page Not Found
      </h1>

      <p className="max-w-md text-sm text-[#737373] mb-6 leading-relaxed">
        The tool or tutorial page you are looking for may have been moved, renamed, or does not exist.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium text-white bg-[#176B50] hover:bg-[#12543E] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium text-[#202124] hover:text-[#176B50] bg-[#FFFFFF] border border-[#E7E7E3] hover:border-[#D3D3CD] transition-colors"
        >
          <Calculator className="w-3.5 h-3.5 text-[#176B50]" />
          <span>Tools Directory</span>
        </Link>
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium text-[#202124] hover:text-[#176B50] bg-[#FFFFFF] border border-[#E7E7E3] hover:border-[#D3D3CD] transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#176B50]" />
          <span>Tutorials</span>
        </Link>
      </div>
    </div>
  );
}
