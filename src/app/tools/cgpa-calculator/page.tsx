import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/components/tools/shared/ToolLayout";
import CgpaCalculator from "@/components/tools/CgpaCalculator";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "CGPA Calculator - Free Semester GPA & Cumulative Average Tool",
  description:
    "Calculate your Cumulative Grade Point Average (CGPA) accurately across multiple semesters. Supports both 10.0 and 4.0 grading scales with instant percentage equivalents.",
  canonicalUrl: "/tools/cgpa-calculator",
});

export default function CgpaCalculatorPage() {
  const howToUseSteps = [
    {
      title: "Select Grading Scale",
      description: "Toggle between the 10.0 scale (standard in Indian and European technical colleges) and the 4.0 scale (standard in US and international programs).",
    },
    {
      title: "Input Semester GPAs",
      description: "Enter your GPA for each completed semester. Click 'Add Semester' if you have more terms, or use the trash icon to remove an entry.",
    },
    {
      title: "Review Result & Standing",
      description: "Inspect your instantaneous simple average CGPA, percentage equivalent, and projected degree classification.",
    },
  ];

  const faqs = [
    {
      question: "What is the difference between SGPA and CGPA?",
      answer: "SGPA (Semester Grade Point Average) evaluates your academic performance within a single academic term. CGPA (Cumulative Grade Point Average) aggregates performance across all completed semesters to date.",
    },
    {
      question: "How is simple average CGPA different from credit-weighted CGPA?",
      answer: "A simple average sums all semester GPAs and divides by the semester count. This is mathematically accurate if every semester carries the same number of credit units. If certain semesters contain significantly more credits (e.g. final year projects), credit-weighted CGPA weighs each semester proportionally to its credits.",
    },
    {
      question: "How is CGPA converted to an equivalent percentage?",
      answer: "For the 10.0 scale, Indian universities and examination boards (such as CBSE and AICTE) officially mandate: Percentage = CGPA × 9.5. For the 4.0 scale, institutions typically use: Percentage = (CGPA / 4.0) × 100.",
    },
    {
      question: "Can I improve my cumulative CGPA in later semesters?",
      answer: "Yes. Cumulative CGPA is an ongoing arithmetic average. Earning higher GPAs in subsequent terms steadily raises your aggregate cumulative score.",
    },
  ];

  const explanationContent = (
    <div className="space-y-3">
      <p>
        The simple unweighted CGPA formula is expressed as:
      </p>
      <div className="p-3.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] font-mono text-xs sm:text-sm text-[#176B50]">
        Simple CGPA = (GPA₁ + GPA₂ + ... + GPAₙ) / Total Number of Semesters
      </div>
      <p>
        When all semesters carry identical credit loads (for example, 20 credits per term), the simple average equals the credit-weighted average. When credit allocations vary, students should refer to their collegiate handbook for exact credit weightings.
      </p>
    </div>
  );

  return (
    <ToolLayout
      toolId="cgpa-calculator"
      category="Student Tools"
      title="College & University CGPA Calculator"
      description="Compute your Cumulative Grade Point Average accurately across multiple terms. Add or remove semesters, check percentage equivalents, and view honors standing."
      breadcrumbLabel="CGPA Calculator"
      schemaApplicationCategory="EducationalApplication"
      howToUseSteps={howToUseSteps}
      explanationTitle="Simple Average vs. Credit-Weighted CGPA"
      explanationContent={explanationContent}
      faqs={faqs}
      relatedCategory="Student Tools"
    >
      <CgpaCalculator />
    </ToolLayout>
  );
}
