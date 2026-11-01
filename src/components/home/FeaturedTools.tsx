import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Percent,
  CalendarCheck,
  FileCode2,
  Type,
  CaseSensitive,
  ArrowRight,
} from "lucide-react";

export default function FeaturedTools() {
  const studentTools = [
    {
      name: "CGPA Calculator",
      description: "Compute cumulative GPA across multiple terms with simple average or semester credit-weighting.",
      icon: <GraduationCap className="w-4 h-4 text-[#176B50]" />,
      path: "/tools/cgpa-calculator",
    },
    {
      name: "Percentage Calculator",
      description: "Convert obtained test marks to percentages, calculate mark differences, and verify grade thresholds.",
      icon: <Percent className="w-4 h-4 text-[#176B50]" />,
      path: "/tools/percentage-calculator",
    },
    {
      name: "Attendance Calculator",
      description: "Determine current lecture attendance and calculate consecutive classes needed to meet 75% or 80% criteria.",
      icon: <CalendarCheck className="w-4 h-4 text-[#176B50]" />,
      path: "/tools/attendance-calculator",
    },
  ];

  const developerTools = [
    {
      name: "JSON Formatter",
      description: "Validate syntax, fix indentation (2 or 4 spaces), compact JSON, and locate errors entirely in your browser.",
      icon: <FileCode2 className="w-4 h-4 text-[#176B50]" />,
      path: "/tools/json-formatter",
    },
    {
      name: "Word Counter",
      description: "Track word counts, characters with and without whitespace, sentences, paragraphs, and reading times live.",
      icon: <Type className="w-4 h-4 text-[#176B50]" />,
      path: "/tools/word-counter",
    },
    {
      name: "Text Case Converter",
      description: "Transform strings into uppercase, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.",
      icon: <CaseSensitive className="w-4 h-4 text-[#176B50]" />,
      path: "/tools/text-case-converter",
    },
  ];

  return (
    <section className="py-14 sm:py-16 border-b border-[#E7E7E3]">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#202124] tracking-tight">
            Featured Tools
          </h2>
          <p className="text-xs sm:text-sm text-[#737373] mt-1">
            Compact, client-side utilities with zero tracking and immediate calculation.
          </p>
        </div>
        <Link
          href="/tools"
          className="text-xs sm:text-sm font-medium text-[#176B50] hover:text-[#12543E] transition-colors inline-flex items-center gap-1"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-10">
        {/* Category 1: Student Tools */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737373] mb-4">
            Student Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studentTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.path}
                className="group p-5 rounded-lg border border-[#E7E7E3] bg-[#FFFFFF] hover:border-[#176B50]/60 transition-colors flex flex-col justify-between shadow-subtle"
              >
                <div>
                  <div className="w-8 h-8 rounded bg-[#EBF5F1] flex items-center justify-center mb-3">
                    {tool.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors mb-1.5">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-[#737373] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 mt-2 text-xs font-medium text-[#176B50] inline-flex items-center gap-1">
                  <span>Open tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Category 2: Developer Tools */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737373] mb-4">
            Developer Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {developerTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.path}
                className="group p-5 rounded-lg border border-[#E7E7E3] bg-[#FFFFFF] hover:border-[#176B50]/60 transition-colors flex flex-col justify-between shadow-subtle"
              >
                <div>
                  <div className="w-8 h-8 rounded bg-[#EBF5F1] flex items-center justify-center mb-3">
                    {tool.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-[#202124] group-hover:text-[#176B50] transition-colors mb-1.5">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-[#737373] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 mt-2 text-xs font-medium text-[#176B50] inline-flex items-center gap-1">
                  <span>Open tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
