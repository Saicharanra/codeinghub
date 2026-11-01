"use client";

import React, { useState } from "react";
import { Percent, Sparkles, Check, Share2, HelpCircle, ArrowRight } from "lucide-react";

export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState<"marks" | "change" | "fraction">("marks");

  // Tab 1: Marks to Percentage
  const [obtainedMarks, setObtainedMarks] = useState<string>("485");
  const [totalMarks, setTotalMarks] = useState<string>("600");

  // Tab 2: Percentage Change
  const [initialValue, setInitialValue] = useState<string>("50");
  const [finalValue, setFinalValue] = useState<string>("75");

  // Tab 3: What is X% of Y?
  const [percentX, setPercentX] = useState<string>("18");
  const [numberY, setNumberY] = useState<string>("250");

  const [copied, setCopied] = useState(false);

  // Marks Percentage Calculation
  const obtained = parseFloat(obtainedMarks);
  const total = parseFloat(totalMarks);
  const isMarksValid = !isNaN(obtained) && !isNaN(total) && total > 0;
  const marksPercentage = isMarksValid ? (obtained / total) * 100 : 0;

  // Percentage Change Calculation
  const initial = parseFloat(initialValue);
  const final = parseFloat(finalValue);
  const isChangeValid = !isNaN(initial) && !isNaN(final) && initial !== 0;
  const changePercent = isChangeValid ? ((final - initial) / Math.abs(initial)) * 100 : 0;

  // X% of Y Calculation
  const px = parseFloat(percentX);
  const ny = parseFloat(numberY);
  const isFractionValid = !isNaN(px) && !isNaN(ny);
  const fractionResult = isFractionValid ? (px / 100) * ny : 0;

  const getGradeBracket = (pct: number) => {
    if (pct >= 90) return { grade: "Grade A+ (Outstanding)", color: "text-emerald-400", bar: "bg-emerald-500" };
    if (pct >= 80) return { grade: "Grade A (Excellent)", color: "text-blue-400", bar: "bg-blue-500" };
    if (pct >= 70) return { grade: "Grade B (Very Good)", color: "text-indigo-400", bar: "bg-indigo-500" };
    if (pct >= 60) return { grade: "Grade C (Good)", color: "text-purple-400", bar: "bg-purple-500" };
    if (pct >= 50) return { grade: "Grade D (Pass)", color: "text-amber-400", bar: "bg-amber-500" };
    return { grade: "Grade F (Needs Improvement)", color: "text-rose-400", bar: "bg-rose-500" };
  };

  const gradeInfo = getGradeBracket(marksPercentage);

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("marks")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "marks"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Exam Marks to Percentage
        </button>
        <button
          onClick={() => setActiveTab("change")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "change"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Percentage Increase / Decrease
        </button>
        <button
          onClick={() => setActiveTab("fraction")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "fraction"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Calculate X% of Y
        </button>
      </div>

      {/* Tab 1: Exam Marks to Percentage */}
      {activeTab === "marks" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-card border border-slate-800 space-y-5">
              <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
                <Percent className="w-4 h-4 text-indigo-400" />
                <span>Enter Academic Score</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Marks Obtained (Score)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={obtainedMarks}
                    onChange={(e) => setObtainedMarks(e.target.value)}
                    placeholder="e.g. 485"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 placeholder-slate-500 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Total Maximum Marks
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    placeholder="e.g. 600"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 placeholder-slate-500 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Formula reference */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
                <div className="font-semibold text-slate-300 mb-1">Calculation Formula:</div>
                <code>Percentage (%) = (Marks Obtained / Total Marks) × 100</code>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-card via-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                  Calculated Percentage
                </span>
                <span className={`text-xs font-semibold ${gradeInfo.color}`}>
                  {isMarksValid ? gradeInfo.grade : "Awaiting Input"}
                </span>
              </div>

              <div className="text-center py-4">
                <div className="text-6xl font-black bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  {isMarksValid ? `${marksPercentage.toFixed(2)}%` : "0.00%"}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isMarksValid
                    ? `${obtained} marks out of ${total} total marks`
                    : "Please enter positive numbers"}
                </p>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Score Progress</span>
                  <span>{Math.min(100, Math.max(0, marksPercentage)).toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${gradeInfo.bar}`}
                    style={{ width: `${Math.min(100, Math.max(0, marksPercentage))}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() =>
                  copyResult(
                    `Score: ${obtainedMarks}/${totalMarks} = ${marksPercentage.toFixed(2)}% (${gradeInfo.grade}) via Coding Hub`
                  )
                }
                disabled={!isMarksValid}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 flex items-center justify-center gap-2 transition-all disabled:opacity-40"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-indigo-400" />
                    <span>Copy Result</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Percentage Change */}
      {activeTab === "change" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-card border border-slate-800 space-y-5">
              <h3 className="text-base font-semibold text-slate-200">
                Compare Initial and Final Values
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Original / Initial Value
                  </label>
                  <input
                    type="number"
                    value={initialValue}
                    onChange={(e) => setInitialValue(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    New / Final Value
                  </label>
                  <input
                    type="number"
                    value={finalValue}
                    onChange={(e) => setFinalValue(e.target.value)}
                    placeholder="e.g. 75"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
                <div className="font-semibold text-slate-300 mb-1">Formula:</div>
                <code>Percentage Change = ((Final - Initial) / |Initial|) × 100</code>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-surface-card border border-slate-800 shadow-xl space-y-6 text-center">
              <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider block">
                {changePercent >= 0 ? "Percentage Increase" : "Percentage Decrease"}
              </span>

              <div
                className={`text-5xl font-black ${
                  changePercent >= 0 ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {changePercent >= 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`}
              </div>

              <p className="text-xs text-slate-400">
                Difference: {isChangeValid ? (final - initial).toFixed(2) : "0"} units
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: X% of Y */}
      {activeTab === "fraction" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-card border border-slate-800 space-y-5">
              <h3 className="text-base font-semibold text-slate-200">
                Calculate Exact Fraction
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={percentX}
                    onChange={(e) => setPercentX(e.target.value)}
                    placeholder="18"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Of Number
                  </label>
                  <input
                    type="number"
                    value={numberY}
                    onChange={(e) => setNumberY(e.target.value)}
                    placeholder="250"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-surface-card border border-slate-800 shadow-xl space-y-6 text-center">
              <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider block">
                Result
              </span>

              <div className="text-5xl font-black text-indigo-400">
                {isFractionValid ? fractionResult.toFixed(2) : "0.00"}
              </div>

              <p className="text-xs text-slate-400">
                {percentX}% of {numberY} is {isFractionValid ? fractionResult.toFixed(2) : "0"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
