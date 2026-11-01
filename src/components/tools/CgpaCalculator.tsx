"use client";

import React, { useState } from "react";
import { Plus, Trash2, RotateCcw, Award, Info, Check, Share2 } from "lucide-react";

interface SemesterRow {
  id: string;
  semesterName: string;
  gpa: string;
  credits: string;
}

export default function CgpaCalculator() {
  const [useCreditWeights, setUseCreditWeights] = useState<boolean>(true);
  const [semesters, setSemesters] = useState<SemesterRow[]>([
    { id: "1", semesterName: "Semester 1", gpa: "3.75", credits: "20" },
    { id: "2", semesterName: "Semester 2", gpa: "3.85", credits: "22" },
    { id: "3", semesterName: "Semester 3", gpa: "3.60", credits: "21" },
    { id: "4", semesterName: "Semester 4", gpa: "3.90", credits: "20" },
  ]);
  const [copied, setCopied] = useState(false);

  const addSemester = () => {
    const nextNum = semesters.length + 1;
    setSemesters([
      ...semesters,
      {
        id: Date.now().toString(),
        semesterName: `Semester ${nextNum}`,
        gpa: "",
        credits: "20",
      },
    ]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length <= 1) return;
    setSemesters(semesters.filter((s) => s.id !== id));
  };

  const updateSemester = (id: string, field: "gpa" | "credits" | "semesterName", val: string) => {
    setSemesters(
      semesters.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const resetAll = () => {
    setSemesters([
      { id: "1", semesterName: "Semester 1", gpa: "", credits: "20" },
      { id: "2", semesterName: "Semester 2", gpa: "", credits: "20" },
    ]);
  };

  const validSemesters = semesters.filter(
    (s) => s.gpa !== "" && !isNaN(parseFloat(s.gpa)) && parseFloat(s.gpa) >= 0
  );

  let calculatedCgpa = 0;
  let simpleAverage = 0;
  let totalCredits = 0;

  if (validSemesters.length > 0) {
    const totalGpa = validSemesters.reduce((acc, s) => acc + parseFloat(s.gpa), 0);
    simpleAverage = totalGpa / validSemesters.length;

    let weightedSum = 0;
    validSemesters.forEach((s) => {
      const gpa = parseFloat(s.gpa);
      const cred = parseFloat(s.credits) || 0;
      weightedSum += gpa * cred;
      totalCredits += cred;
    });

    calculatedCgpa =
      useCreditWeights && totalCredits > 0
        ? weightedSum / totalCredits
        : simpleAverage;
  }

  const isScale10 = calculatedCgpa > 4.0 || validSemesters.some((s) => parseFloat(s.gpa) > 4.0);
  const maxScale = isScale10 ? 10.0 : 4.0;
  const percentageEstimate = isScale10
    ? (calculatedCgpa * 9.5).toFixed(1)
    : ((calculatedCgpa / 4.0) * 100).toFixed(1);

  const getStanding = (cgpa: number, is10: boolean) => {
    if (cgpa === 0) return { label: "Awaiting Input", color: "text-slate-400", bg: "bg-white/[0.04] border-white/[0.08]" };
    if (is10) {
      if (cgpa >= 8.5) return { label: "First Class with Distinction", color: "text-cyan-400", bg: "bg-cyan-950/60 border-cyan-500/40" };
      if (cgpa >= 7.0) return { label: "First Class", color: "text-blue-400", bg: "bg-blue-950/60 border-blue-500/40" };
      if (cgpa >= 5.5) return { label: "Second Class", color: "text-amber-400", bg: "bg-amber-950/60 border-amber-500/40" };
      return { label: "Pass Class", color: "text-rose-400", bg: "bg-rose-950/60 border-rose-500/40" };
    } else {
      if (cgpa >= 3.75) return { label: "Summa Cum Laude / High Distinction", color: "text-cyan-400", bg: "bg-cyan-950/60 border-cyan-500/40" };
      if (cgpa >= 3.5) return { label: "Magna Cum Laude / Dean's List", color: "text-violet-400", bg: "bg-violet-950/60 border-violet-500/40" };
      if (cgpa >= 3.0) return { label: "Cum Laude / Good Standing", color: "text-indigo-400", bg: "bg-indigo-950/60 border-indigo-500/40" };
      if (cgpa >= 2.0) return { label: "Satisfactory Standing", color: "text-amber-400", bg: "bg-amber-950/60 border-amber-500/40" };
      return { label: "Academic Warning", color: "text-rose-400", bg: "bg-rose-950/60 border-rose-500/40" };
    }
  };

  const standing = getStanding(calculatedCgpa, isScale10);

  const handleCopySummary = () => {
    const text = `Coding Hub - CGPA Summary:
Calculated CGPA: ${calculatedCgpa.toFixed(2)} / ${maxScale.toFixed(1)}
Simple Average: ${simpleAverage.toFixed(2)}
Total Semesters: ${validSemesters.length}
Total Credits: ${totalCredits}
Academic Standing: ${standing.label}
Calculated at https://codinghub.dev/tools/cgpa-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Configuration & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c101c]/90 border border-white/[0.08] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Calculation Method</h2>
            <p className="text-xs text-slate-400">
              {useCreditWeights
                ? "Credit-Weighted CGPA (Official University Standard)"
                : "Simple Arithmetic Average (Equal weight per term)"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseCreditWeights(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              !useCreditWeights
                ? "bg-white/[0.12] text-white border border-white/[0.2] shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Simple Average
          </button>
          <button
            onClick={() => setUseCreditWeights(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              useCreditWeights
                ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Credit-Weighted (Recommended)
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Semester Input Rows */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300">
              Semester Records ({semesters.length})
            </h3>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-3">
            {semesters.map((sem, index) => (
              <div
                key={sem.id}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0c101c]/80 border border-white/[0.08] hover:border-violet-500/40 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs font-mono font-semibold text-cyan-400">
                  #{index + 1}
                </div>

                <div className="flex-1 min-w-[120px]">
                  <input
                    type="text"
                    value={sem.semesterName}
                    onChange={(e) => updateSemester(sem.id, "semesterName", e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none focus:border-b border-cyan-400"
                    placeholder={`Semester ${index + 1}`}
                  />
                </div>

                <div className="w-24">
                  <label className="text-[10px] font-mono text-slate-400 block mb-0.5">GPA / SGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={sem.gpa}
                    onChange={(e) => updateSemester(sem.id, "gpa", e.target.value)}
                    placeholder="3.8"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm font-mono font-bold text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                {useCreditWeights && (
                  <div className="w-24">
                    <label className="text-[10px] font-mono text-slate-400 block mb-0.5">Credits</label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      max="40"
                      value={sem.credits}
                      onChange={(e) => updateSemester(sem.id, "credits", e.target.value)}
                      placeholder="20"
                      className="w-full px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm font-mono font-bold text-white focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
                    />
                  </div>
                )}

                <button
                  onClick={() => removeSemester(sem.id)}
                  disabled={semesters.length <= 1}
                  className="p-2 text-slate-500 hover:text-rose-400 disabled:opacity-20 disabled:hover:text-slate-500 rounded-lg hover:bg-white/[0.04] transition-colors"
                  title="Delete semester row"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addSemester}
            className="w-full py-3 rounded-2xl border border-dashed border-white/[0.15] hover:border-cyan-400/60 bg-white/[0.02] hover:bg-white/[0.04] text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Next Semester</span>
          </button>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#101626] to-[#0a0d17] border border-white/[0.1] shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient background glow inside card */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="text-xs uppercase font-mono font-semibold text-slate-400 tracking-wider">
                Overall CGPA
              </span>
              <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${standing.bg} ${standing.color}`}>
                {standing.label}
              </span>
            </div>

            <div className="text-center py-4 relative">
              <div className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                {calculatedCgpa > 0 ? calculatedCgpa.toFixed(2) : "0.00"}
              </div>
              <p className="text-xs font-mono text-slate-400 mt-2">
                Out of {maxScale.toFixed(1)} scale • {validSemesters.length} Semesters Recorded
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Simple Average</span>
                <span className="text-lg font-mono font-bold text-slate-200">
                  {simpleAverage > 0 ? simpleAverage.toFixed(2) : "0.00"}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Total Credits</span>
                <span className="text-lg font-mono font-bold text-slate-200">
                  {useCreditWeights ? totalCredits : "N/A"}
                </span>
              </div>
              <div className="col-span-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  Estimated Academic Percentage
                </span>
                <span className="text-xl font-mono font-extrabold text-cyan-400">
                  {calculatedCgpa > 0 ? `${percentageEstimate}%` : "0%"}
                </span>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                  ({isScale10 ? "Formula: CGPA × 9.5" : "Formula: (CGPA / 4.0) × 100"})
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                onClick={handleCopySummary}
                disabled={calculatedCgpa === 0}
                className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] flex items-center justify-center gap-2 transition-all disabled:opacity-30"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Summary Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-cyan-400" />
                    <span>Copy Breakdown Report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-mono font-semibold text-cyan-300">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>How Credit-Weighted CGPA Works</span>
            </div>
            <p className="leading-relaxed">
              In a credit-based system, a 24-credit term has higher weight than an 18-credit term.
            </p>
            <p className="font-mono text-[11px] text-slate-400 bg-black/40 p-2 rounded-lg border border-white/[0.05]">
              CGPA = ∑ (GPA × Credits) / ∑ (Total Credits)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
