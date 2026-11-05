"use client";

import React, { useState } from "react";
import { Plus, Trash2, RotateCcw, AlertCircle, Info, Calculator, Sparkles } from "lucide-react";
import {
  SemesterEntry,
  calculateSimpleCgpa,
  validateGpaInput,
} from "@/lib/calculators/cgpa";
import ResultPanel from "./shared/ResultPanel";
import { trackCalculationCompleted } from "@/lib/analytics";
import { showToast } from "@/components/common/Toast";

export default function CgpaCalculator() {
  const [scale, setScale] = useState<10 | 4>(10);
  const [semesters, setSemesters] = useState<SemesterEntry[]>([
    { id: "sem-1", semesterNumber: 1, gpa: "8.50" },
    { id: "sem-2", semesterNumber: 2, gpa: "8.20" },
    { id: "sem-3", semesterNumber: 3, gpa: "8.80" },
    { id: "sem-4", semesterNumber: 4, gpa: "8.40" },
  ]);

  const handleGpaChange = (id: string, value: string) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === id ? { ...s, gpa: value } : s))
    );
  };

  const addSemester = () => {
    if (semesters.length >= 12) return;
    const nextNum = semesters.length + 1;
    const newEntry: SemesterEntry = {
      id: `sem-${Date.now()}`,
      semesterNumber: nextNum,
      gpa: "",
    };
    setSemesters((prev) => [...prev, newEntry]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length <= 1) return;
    setSemesters((prev) => {
      const remaining = prev.filter((s) => s.id !== id);
      return remaining.map((s, idx) => ({
        ...s,
        semesterNumber: idx + 1,
      }));
    });
  };

  const resetCalculator = () => {
    setSemesters([
      { id: "sem-1", semesterNumber: 1, gpa: "" },
      { id: "sem-2", semesterNumber: 2, gpa: "" },
    ]);
    showToast("Calculator reset", "info");
  };

  const loadSample = () => {
    if (scale === 10) {
      setSemesters([
        { id: "sem-1", semesterNumber: 1, gpa: "8.65" },
        { id: "sem-2", semesterNumber: 2, gpa: "8.90" },
        { id: "sem-3", semesterNumber: 3, gpa: "8.40" },
        { id: "sem-4", semesterNumber: 4, gpa: "9.10" },
      ]);
    } else {
      setSemesters([
        { id: "sem-1", semesterNumber: 1, gpa: "3.70" },
        { id: "sem-2", semesterNumber: 2, gpa: "3.85" },
        { id: "sem-3", semesterNumber: 3, gpa: "3.60" },
        { id: "sem-4", semesterNumber: 4, gpa: "3.90" },
      ]);
    }
    showToast("Sample semester GPAs loaded");
  };

  const handleCalculateClick = () => {
    trackCalculationCompleted("cgpa-calculator", "manual_calculate");
    if (result.isValid) {
      showToast(`CGPA computed: ${result.cgpaFormatted}`);
    } else {
      showToast(result.error || "Please enter valid semester GPAs", "info");
    }
  };

  const result = calculateSimpleCgpa(semesters, scale);

  return (
    <div className="space-y-6">
      {/* Configuration bar: Scale toggle & quick actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#E7E7E3] shadow-subtle">
        <div className="flex items-center gap-2">
          <label htmlFor="scale-select" className="text-xs font-mono text-[#737373] uppercase tracking-wider">
            Grading Scale:
          </label>
          <button
            id="scale-10"
            type="button"
            onClick={() => {
              setScale(10);
              trackCalculationCompleted("cgpa-calculator", "scale_10");
            }}
            className={`px-3 py-1 rounded text-[13px] sm:text-[14px] font-medium transition-colors ${
              scale === 10
                ? "bg-[#176B50] text-white font-semibold shadow-sm"
                : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
            }`}
          >
            10.0 Scale
          </button>
          <button
            id="scale-4"
            type="button"
            onClick={() => {
              setScale(4);
              trackCalculationCompleted("cgpa-calculator", "scale_4");
            }}
            className={`px-3 py-1 rounded text-[13px] sm:text-[14px] font-medium transition-colors ${
              scale === 4
                ? "bg-[#176B50] text-white font-semibold shadow-sm"
                : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
            }`}
          >
            4.0 Scale
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-[13px] sm:text-[14px] font-medium text-[#176B50] hover:text-[#12543E] bg-[#EBF5F1] hover:bg-[#DDF0E8] border border-[#C8E3D8] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Example</span>
          </button>

          <button
            type="button"
            onClick={resetCalculator}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-[13px] sm:text-[14px] font-medium text-[#737373] hover:text-[#991B1B] bg-[#FAFAF8] hover:bg-[#FDF2F2] border border-[#E7E7E3] hover:border-[#F5C2C7] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Result on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Semester Entry List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] space-y-3.5 shadow-subtle">
            <div className="flex items-center justify-between text-xs font-mono text-[#737373] pb-2 border-b border-[#E7E7E3]">
              <span>Academic Semester</span>
              <span>Semester GPA (Max {scale.toFixed(1)})</span>
            </div>

            <div className="space-y-2.5">
              {semesters.map((entry) => {
                const validation = entry.gpa.trim()
                  ? validateGpaInput(entry.gpa, scale)
                  : { isValid: true };

                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] focus-within:border-[#176B50] transition-colors"
                  >
                    <label
                      htmlFor={`sem-input-${entry.id}`}
                      className="text-[14px] sm:text-[15px] font-semibold text-[#202124] pl-1 cursor-pointer"
                    >
                      Semester {entry.semesterNumber}
                    </label>

                    <div className="flex items-center gap-2">
                      <input
                        id={`sem-input-${entry.id}`}
                        type="number"
                        step="0.01"
                        min="0"
                        max={scale}
                        value={entry.gpa}
                        onChange={(e) => handleGpaChange(entry.id, e.target.value)}
                        placeholder={`e.g. ${(scale * 0.85).toFixed(2)}`}
                        className={`w-36 px-3 py-1.5 rounded-md text-[15px] font-mono text-right bg-white border ${
                          !validation.isValid
                            ? "border-[#DC2626] text-[#991B1B] focus:ring-[#DC2626]"
                            : "border-[#E7E7E3] text-[#202124] focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50]"
                        } focus:outline-none transition-colors`}
                        aria-label={`GPA for Semester ${entry.semesterNumber}`}
                      />

                      {semesters.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSemester(entry.id)}
                          className="p-1.5 rounded text-[#737373] hover:text-[#991B1B] hover:bg-[#FDF2F2] transition-colors"
                          title={`Remove Semester ${entry.semesterNumber}`}
                          aria-label={`Remove Semester ${entry.semesterNumber}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={addSemester}
                disabled={semesters.length >= 12}
                className="w-full sm:w-1/2 py-2.5 rounded-md border border-dashed border-[#E7E7E3] hover:border-[#176B50] text-[14px] sm:text-[15px] font-semibold text-[#737373] hover:text-[#176B50] bg-[#FAFAF8] hover:bg-white flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
              >
                <Plus className="w-4 h-4" />
                <span>Add Semester ({semesters.length}/12)</span>
              </button>

              <button
                type="button"
                onClick={handleCalculateClick}
                className="w-full sm:w-1/2 py-2.5 rounded-md bg-[#176B50] hover:bg-[#12543E] text-white text-[15px] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Cumulative CGPA</span>
              </button>
            </div>
          </div>

          {/* Validation Notice if any entry has error */}
          {!result.isValid && result.error && (
            <div className="p-3.5 rounded-lg bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#991B1B] flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
              <span>{result.error}</span>
            </div>
          )}

          {/* Notice about unweighted vs credit-weighted */}
          <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E3] flex items-start gap-2.5 text-xs text-[#737373] leading-relaxed">
            <Info className="w-4 h-4 text-[#176B50] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#202124] block mb-0.5">Note on Simple Average:</strong>
              This tool computes the simple unweighted arithmetic mean across your semesters. If individual semesters carried significantly different credit hours, exact credit-weighted CGPA requires multiplying each semester GPA by its credit count.
            </div>
          </div>
        </div>

        {/* Result Area */}
        <div className="lg:col-span-5 space-y-4">
          <ResultPanel
            label="Calculated Cumulative GPA"
            value={result.isValid ? result.cgpaFormatted : "—"}
            description={
              result.isValid
                ? `Calculated across ${result.semesterCount} entered semester${
                    result.semesterCount === 1 ? "" : "s"
                  }.`
                : "Enter your semester GPAs to compute your simple average CGPA."
            }
            statusBadge={
              result.isValid
                ? {
                    text: `${result.semesterCount} Semesters`,
                    type: "success",
                  }
                : undefined
            }
            copyValue={result.isValid ? result.cgpaFormatted : undefined}
          >
            {result.isValid && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E7E7E3]">
                <div className="p-2.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3]">
                  <span className="text-[11px] font-mono text-[#737373] block mb-0.5">
                    Percentage Equivalent
                  </span>
                  <span className="text-sm font-mono font-semibold text-[#176B50]">
                    {result.percentageEquivalent}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3]">
                  <span className="text-[11px] font-mono text-[#737373] block mb-0.5">
                    Academic Standing
                  </span>
                  <span className="text-xs font-semibold text-[#202124] line-clamp-1">
                    {result.honorsClassification}
                  </span>
                </div>
              </div>
            )}
          </ResultPanel>

          {/* Summary Breakdown of Entered Semesters */}
          {result.isValid && (
            <div className="p-4 rounded-xl bg-white border border-[#E7E7E3] space-y-2 shadow-subtle">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#737373] block">
                Semester Breakdown
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {semesters.map((s) => (
                  <span
                    key={s.id}
                    className="px-2.5 py-1 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-xs font-mono text-[#202124]"
                  >
                    S{s.semesterNumber}: <strong>{s.gpa ? parseFloat(s.gpa).toFixed(2) : "—"}</strong>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}