"use client";

import React, { useState } from "react";
import { Plus, Trash2, RotateCcw, AlertCircle, Info } from "lucide-react";
import {
  SemesterEntry,
  calculateSimpleCgpa,
  validateGpaInput,
} from "@/lib/calculators/cgpa";
import ResultPanel from "./shared/ResultPanel";

export default function CgpaCalculator() {
  const [scale, setScale] = useState<10 | 4>(10);
  const [semesters, setSemesters] = useState<SemesterEntry[]>([
    { id: "sem-1", semesterNumber: 1, gpa: "8.5" },
    { id: "sem-2", semesterNumber: 2, gpa: "8.2" },
    { id: "sem-3", semesterNumber: 3, gpa: "8.8" },
    { id: "sem-4", semesterNumber: 4, gpa: "8.4" },
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
  };

  const result = calculateSimpleCgpa(semesters, scale);

  return (
    <div className="space-y-6">
      {/* Configuration bar: Scale toggle & reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-white border border-[#E7E7E3]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#737373] uppercase tracking-wider">
            Grading Scale:
          </span>
          <button
            onClick={() => setScale(10)}
            className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
              scale === 10
                ? "bg-[#176B50] text-white font-medium"
                : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
            }`}
          >
            10.0 Scale
          </button>
          <button
            onClick={() => setScale(4)}
            className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
              scale === 4
                ? "bg-[#176B50] text-white font-medium"
                : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
            }`}
          >
            4.0 Scale
          </button>
        </div>

        <button
          onClick={resetCalculator}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono text-[#737373] hover:text-[#991B1B] bg-[#FAFAF8] border border-[#E7E7E3] hover:border-[#F5C2C7] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Grid: Inputs on Left, Result on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Semester Entry List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-lg bg-white border border-[#E7E7E3] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#737373] pb-2 border-b border-[#E7E7E3]">
              <span>Semester</span>
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
                    className="flex items-center justify-between gap-3 p-2 rounded bg-[#FAFAF8] border border-[#E7E7E3]"
                  >
                    <div className="flex items-center gap-2 pl-2">
                      <span className="text-xs font-mono font-medium text-[#202124]">
                        Semester {entry.semesterNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max={scale}
                        value={entry.gpa}
                        onChange={(e) => handleGpaChange(entry.id, e.target.value)}
                        placeholder={`0.00 - ${scale.toFixed(1)}`}
                        className={`w-32 px-3 py-1.5 rounded text-sm font-mono text-right bg-white border ${
                          !validation.isValid
                            ? "border-[#DC2626] text-[#991B1B] focus:ring-[#DC2626]"
                            : "border-[#E7E7E3] text-[#202124] focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50]"
                        } focus:outline-none transition-colors`}
                      />

                      {semesters.length > 1 && (
                        <button
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

            <div className="pt-2">
              <button
                onClick={addSemester}
                disabled={semesters.length >= 12}
                className="w-full py-2 rounded border border-dashed border-[#E7E7E3] hover:border-[#176B50] text-xs font-mono text-[#737373] hover:text-[#176B50] bg-[#FAFAF8] hover:bg-white flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Semester ({semesters.length}/12)</span>
              </button>
            </div>
          </div>

          {/* Validation Notice if any entry has error */}
          {!result.isValid && result.error && (
            <div className="p-3 rounded-lg bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#991B1B] flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
              <span>{result.error}</span>
            </div>
          )}

          {/* Notice about unweighted vs credit-weighted */}
          <div className="p-3.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] flex items-start gap-2.5 text-xs text-[#737373] leading-relaxed">
            <Info className="w-4 h-4 text-[#176B50] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#202124] block mb-0.5">Note on Simple Average:</strong>
              This tool computes the simple unweighted average across your semesters. If individual semesters carried different credit hours, exact credit-weighted CGPA requires multiplying each semester GPA by its credit count.
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
                <div className="p-2.5 rounded bg-[#FAFAF8] border border-[#E7E7E3]">
                  <span className="text-[11px] font-mono text-[#737373] block mb-0.5">
                    Percentage Equivalent
                  </span>
                  <span className="text-sm font-mono font-semibold text-[#176B50]">
                    {result.percentageEquivalent}
                  </span>
                </div>
                <div className="p-2.5 rounded bg-[#FAFAF8] border border-[#E7E7E3]">
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
            <div className="p-4 rounded-lg bg-white border border-[#E7E7E3] space-y-2">
              <span className="text-xs font-mono font-medium uppercase text-[#737373] block">
                Semester Breakdown
              </span>
              <div className="flex flex-wrap gap-1.5">
                {semesters.map((s) => (
                  <span
                    key={s.id}
                    className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E3] text-xs font-mono text-[#202124]"
                  >
                    S{s.semesterNumber}: <strong>{parseFloat(s.gpa).toFixed(2)}</strong>
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
