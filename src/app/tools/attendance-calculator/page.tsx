import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/components/tools/shared/ToolLayout";
import AttendanceCalculator from "@/components/tools/AttendanceCalculator";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Attendance Calculator - Calculate Classes Needed for 75% or 80%",
  description:
    "Free student attendance calculator. Compute your current attendance rate, determine exact upcoming lectures needed to hit 75% or 80%, and see how many classes you can safely miss.",
  canonicalUrl: "/tools/attendance-calculator",
});

export default function AttendanceCalculatorPage() {
  const howToUseSteps = [
    {
      title: "Enter Conducted Classes",
      description: "Type the total number of lecture and lab sessions held by your professors so far.",
    },
    {
      title: "Enter Attended Classes",
      description: "Type how many of those conducted sessions you physically attended and marked present.",
    },
    {
      title: "Set Target Percentage",
      description: "Choose 75%, 80%, or enter your university's custom exam eligibility cutoff.",
    },
  ];

  const faqs = [
    {
      question: "Why do universities mandate 75% attendance?",
      answer: "Regulatory education boards (such as UGC and AICTE) enforce minimum attendance criteria to ensure students complete requisite practical coursework and laboratory credits before sitting for semester end examinations.",
    },
    {
      question: "What mathematical formula calculates classes needed?",
      answer: "When your current attendance is below your target P (expressed as a decimal, e.g. 0.75), and assuming you attend every future class without absence, the minimum consecutive classes needed X is: X = ceil( (P × Total - Attended) / (1 - P) ).",
    },
    {
      question: "How is the safe skip / bunk limit calculated?",
      answer: "If your attendance is already above the target P, the number of classes you can miss Y before falling below P is: Y = floor( (Attended / P) - Total ).",
    },
    {
      question: "Can I ever reach 100% attendance if I have missed a class?",
      answer: "No. Because each missed class permanently remains in the total conducted count, mathematically your fraction can never reach 1.0 (100%) once any single absence occurs.",
    },
  ];

  const explanationContent = (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#202124] mb-1">
          1. Current Attendance Formula
        </h4>
        <div className="p-3 rounded bg-[#FAFAF8] border border-[#E7E7E3] font-mono text-xs text-[#176B50]">
          Current Attendance (%) = (Classes Attended / Total Classes Conducted) × 100
        </div>
      </div>

      <div>
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#202124] mb-1">
          2. Classes Needed Formula
        </h4>
        <div className="p-3 rounded bg-[#FAFAF8] border border-[#E7E7E3] font-mono text-xs text-[#176B50]">
          Classes Needed = Math.ceil( ((Target × Total Conducted) - Attended) / (1 - Target) )
        </div>
        <p className="text-xs text-[#737373] mt-1">
          Where Target is expressed as a decimal (e.g. 0.75 for 75%).
        </p>
      </div>

      <div>
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#202124] mb-1">
          3. Safe Bunks Formula
        </h4>
        <div className="p-3 rounded bg-[#FAFAF8] border border-[#E7E7E3] font-mono text-xs text-[#176B50]">
          Safe Skips = Math.floor( (Attended / Target) - Total Conducted )
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      toolId="attendance-calculator"
      category="Student Tools"
      title="College Attendance & Bunk Calculator"
      description="Stay safely above your college attendance benchmark. Determine your exact percentage, calculate upcoming lectures needed, and check safe skip allowances."
      breadcrumbLabel="Attendance Calculator"
      schemaApplicationCategory="EducationalApplication"
      howToUseSteps={howToUseSteps}
      explanationTitle="Mathematical Derivations & Calculations"
      explanationContent={explanationContent}
      faqs={faqs}
      relatedCategory="Student Tools"
    >
      <AttendanceCalculator />
    </ToolLayout>
  );
}
