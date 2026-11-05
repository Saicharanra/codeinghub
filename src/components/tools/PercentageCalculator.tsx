"use client";

import React, { useState } from "react";
import {
  calculateMarksPercentage,
  calculatePercentageOfNumber,
  calculatePercentageChange,
} from "@/lib/calculators/percentage";
import ResultPanel from "./shared/ResultPanel";
import { AlertCircle, RotateCcw, Sparkles } from "lucide-react";
import { trackCalculationCompleted } from "@/lib/analytics";
import { showToast } from "@/components/common/Toast";

export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState<"marks" | "ofNumber" | "change">("marks");

  // Mode A state
  const [obtainedMarks, setObtainedMarks] = useState<string>("442");
  const [totalMarks, setTotalMarks] = useState<string>("500");

  // Mode B state
  const [percentValue, setPercentValue] = useState<string>("15");
  const [targetNumber, setTargetNumber] = useState<string>("240");

  // Mode C state
  const [originalValue, setOriginalValue] = useState<string>("80");
  const [newValue, setNewValue] = useState<string>("100");

  // Calculations
  const marksResult = calculateMarksPercentage(obtainedMarks, totalMarks);
  const numberResult = calculatePercentageOfNumber(percentValue, targetNumber);
  const changeResult = calculatePercentageChange(originalValue, newValue);

  const resetActiveTab = () => {
    if (activeTab === "marks") {
      setObtainedMarks("");
      setTotalMarks("");
    } else if (activeTab === "ofNumber") {
      setPercentValue("");
      setTargetNumber("");
    } else {
      setOriginalValue("");
      setNewValue("");
    }
    showToast("Inputs cleared", "info");
  };

  const loadExample = () => {
    if (activeTab === "marks") {
      setObtainedMarks("442");
      setTotalMarks("500");
    } else if (activeTab === "ofNumber") {
      setPercentValue("15");
      setTargetNumber("240");
    } else {
      setOriginalValue("80");
      setNewValue("100");
    }
    showToast("Sample data loaded", "success");
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-lg bg-white border border-[#E7E7E3]">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => {
              setActiveTab("marks");
              trackCalculationCompleted("percentage-calculator", "marks_percentage");
            }}
            className={`px-3 py-1.5 rounded text-[13px] sm:text-[14px] transition-colors ${
              activeTab === "marks"
                ? "bg-[#176B50] text-white font-semibold"
                : "text-[#737373] font-medium hover:text-[#202124] hover:bg-[#FAFAF8]"
            }`}
          >
            Mode A: Marks Percentage
          </button>
          <button
            onClick={() => {
              setActiveTab("ofNumber");
              trackCalculationCompleted("percentage-calculator", "percentage_of_number");
            }}
            className={`px-3 py-1.5 rounded text-[13px] sm:text-[14px] transition-colors ${
              activeTab === "ofNumber"
                ? "bg-[#176B50] text-white font-semibold"
                : "text-[#737373] font-medium hover:text-[#202124] hover:bg-[#FAFAF8]"
            }`}
          >
            Mode B: % of a Number
          </button>
          <button
            onClick={() => {
              setActiveTab("change");
              trackCalculationCompleted("percentage-calculator", "percentage_change");
            }}
            className={`px-3 py-1.5 rounded text-[13px] sm:text-[14px] transition-colors ${
              activeTab === "change"
                ? "bg-[#176B50] text-white font-semibold"
                : "text-[#737373] font-medium hover:text-[#202124] hover:bg-[#FAFAF8]"
            }`}
          >
            Mode C: Percentage Change
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadExample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] sm:text-[14px] font-medium text-[#176B50] hover:text-[#12543E] bg-[#EBF5F1] hover:bg-[#DDF0E8] border border-[#C8E3D8] rounded transition-colors"
            title="Load sample values"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Example</span>
          </button>
          <button
            onClick={resetActiveTab}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] sm:text-[14px] font-medium text-[#737373] hover:text-[#991B1B] transition-colors"
            title="Reset active calculation inputs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Mode Content Grids */}
      {activeTab === "marks" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] space-y-4 shadow-subtle">
            <h3 className="text-card-title font-semibold text-[#202124]">
              Exam Score &amp; Marks Inputs
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="text-[14px] sm:text-[15px] font-semibold text-[#202124] block mb-1.5">
                  Marks Obtained *
                </label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={obtainedMarks}
                  onChange={(e) => setObtainedMarks(e.target.value)}
                  placeholder="e.g. 442"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
                />
              </div>

              <div>
                <label className="text-[14px] sm:text-[15px] font-semibold text-[#202124] block mb-1.5">
                  Total Maximum Marks *
                </label>
                <input
                  type="number"
                  step="any"
                  min="0.01"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
                />
              </div>
            </div>

            {!marksResult.isValid && marksResult.error && (
              <div className="p-3.5 rounded-lg bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#991B1B] flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
                <span>{marksResult.error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-[#E7E7E3]">
              <span className="text-xs font-mono text-[#737373]">Live calculation enabled</span>
              <button
                type="button"
                onClick={() => {
                  if (marksResult.isValid) {
                    showToast(`Marks Percentage: ${marksResult.percentageFormatted}`, "success");
                    trackCalculationCompleted("percentage-calculator", "marks_calc_click");
                  }
                }}
                disabled={!marksResult.isValid}
                className="px-4 py-2.5 rounded-md bg-[#176B50] hover:bg-[#12543E] text-white text-[15px] font-semibold transition-colors disabled:opacity-40"
              >
                Calculate Percentage
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <ResultPanel
              label="Marks Percentage"
              value={marksResult.isValid ? marksResult.percentageFormatted : "—"}
              description={
                marksResult.isValid
                  ? `Computed as (${marksResult.fractionRatio}) × 100.`
                  : "Enter marks obtained and total maximum marks."
              }
              statusBadge={
                marksResult.isValid
                  ? {
                      text: `${marksResult.fractionRatio} Marks`,
                      type: "success",
                    }
                  : undefined
              }
              copyValue={marksResult.isValid ? marksResult.percentageFormatted : undefined}
            />
          </div>
        </div>
      )}

      {activeTab === "ofNumber" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] space-y-4 shadow-subtle">
            <h3 className="text-card-title font-semibold text-[#202124]">
              Percentage of a Number Inputs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[14px] sm:text-[15px] font-semibold text-[#202124] block mb-1.5">
                  What is (%) *
                </label>
                <input
                  type="number"
                  step="any"
                  value={percentValue}
                  onChange={(e) => setPercentValue(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
                />
              </div>

              <div>
                <label className="text-[14px] sm:text-[15px] font-semibold text-[#202124] block mb-1.5">
                  Of this number *
                </label>
                <input
                  type="number"
                  step="any"
                  value={targetNumber}
                  onChange={(e) => setTargetNumber(e.target.value)}
                  placeholder="e.g. 240"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
                />
              </div>
            </div>

            {!numberResult.isValid && numberResult.error && (
              <div className="p-3.5 rounded-lg bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#991B1B] flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
                <span>{numberResult.error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-[#E7E7E3]">
              <span className="text-xs font-mono text-[#737373]">Live calculation enabled</span>
              <button
                type="button"
                onClick={() => {
                  if (numberResult.isValid) {
                    showToast(`Result: ${numberResult.resultFormatted}`, "success");
                    trackCalculationCompleted("percentage-calculator", "of_number_calc_click");
                  }
                }}
                disabled={!numberResult.isValid}
                className="px-4 py-2.5 rounded-md bg-[#176B50] hover:bg-[#12543E] text-white text-[15px] font-semibold transition-colors disabled:opacity-40"
              >
                Calculate Value
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <ResultPanel
              label="Calculated Result"
              value={numberResult.isValid ? numberResult.resultFormatted : "—"}
              description={
                numberResult.isValid
                  ? numberResult.statement
                  : "Enter percentage and target number to calculate."
              }
              statusBadge={
                numberResult.isValid
                  ? {
                      text: "Formula: (P / 100) × X",
                      type: "info",
                    }
                  : undefined
              }
              copyValue={numberResult.isValid ? numberResult.resultFormatted : undefined}
            />
          </div>
        </div>
      )}

      {activeTab === "change" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] space-y-4 shadow-subtle">
            <h3 className="text-card-title font-semibold text-[#202124]">
              Original and New Value Inputs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[14px] sm:text-[15px] font-semibold text-[#202124] block mb-1.5">
                  Original Value (V₁) *
                </label>
                <input
                  type="number"
                  step="any"
                  value={originalValue}
                  onChange={(e) => setOriginalValue(e.target.value)}
                  placeholder="e.g. 80"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
                />
              </div>

              <div>
                <label className="text-[14px] sm:text-[15px] font-semibold text-[#202124] block mb-1.5">
                  New Value (V₂) *
                </label>
                <input
                  type="number"
                  step="any"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
                />
              </div>
            </div>

            {!changeResult.isValid && changeResult.error && (
              <div className="p-3.5 rounded-lg bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#991B1B] flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
                <span>{changeResult.error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-[#E7E7E3]">
              <span className="text-xs font-mono text-[#737373]">Live calculation enabled</span>
              <button
                type="button"
                onClick={() => {
                  if (changeResult.isValid) {
                    showToast(`Percentage Change: ${changeResult.changeFormatted}`, "success");
                    trackCalculationCompleted("percentage-calculator", "change_calc_click");
                  }
                }}
                disabled={!changeResult.isValid}
                className="px-4 py-2.5 rounded-md bg-[#176B50] hover:bg-[#12543E] text-white text-[15px] font-semibold transition-colors disabled:opacity-40"
              >
                Calculate Change
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <ResultPanel
              label="Percentage Change"
              value={changeResult.isValid ? changeResult.changeFormatted : "—"}
              description={
                changeResult.isValid
                  ? `Shift of ${changeResult.difference > 0 ? "+" : ""}${
                      changeResult.difference
                    } units (${changeResult.type}).`
                  : "Enter original and new values to evaluate change."
              }
              statusBadge={
                changeResult.isValid
                  ? {
                      text:
                        changeResult.type === "increase"
                          ? "Increase"
                          : changeResult.type === "decrease"
                          ? "Decrease"
                          : "No Change",
                      type:
                        changeResult.type === "increase"
                          ? "success"
                          : changeResult.type === "decrease"
                          ? "warning"
                          : "neutral",
                    }
                  : undefined
              }
              copyValue={changeResult.isValid ? changeResult.changeFormatted : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}
