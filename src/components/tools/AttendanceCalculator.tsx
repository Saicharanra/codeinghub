"use client";

import React, { useState } from "react";
import { calculateAttendance } from "@/lib/calculators/attendance";
import ResultPanel from "./shared/ResultPanel";
import { AlertCircle, RotateCcw, Info, Sparkles } from "lucide-react";
import { trackCalculationCompleted } from "@/lib/analytics";
import { showToast } from "@/components/common/Toast";

export default function AttendanceCalculator() {
  const [conducted, setConducted] = useState<string>("48");
  const [attended, setAttended] = useState<string>("34");
  const [target, setTarget] = useState<string>("75");

  const result = calculateAttendance(conducted, attended, target);

  const resetCalculator = () => {
    setConducted("");
    setAttended("");
    setTarget("75");
    showToast("Inputs reset", "info");
  };

  const loadExample = () => {
    setConducted("48");
    setAttended("34");
    setTarget("75");
    showToast("Sample attendance loaded", "success");
  };

  const presetTargets = ["75", "80", "85", "90"];

  return (
    <div className="space-y-6">
      {/* Quick Target Presets & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-white border border-[#E7E7E3]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-mono text-[#737373] uppercase tracking-wider">
            Target Presets:
          </span>
          {presetTargets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setTarget(preset);
                trackCalculationCompleted("attendance-calculator", `target_${preset}`);
              }}
              className={`px-3 py-1 rounded text-[13px] sm:text-[14px] font-medium transition-colors ${
                target === preset
                  ? "bg-[#176B50] text-white font-semibold"
                  : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadExample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] sm:text-[14px] font-medium text-[#176B50] hover:text-[#12543E] bg-[#EBF5F1] hover:bg-[#DDF0E8] border border-[#C8E3D8] transition-colors"
            title="Load sample attendance data"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Example</span>
          </button>
          <button
            onClick={resetCalculator}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] sm:text-[14px] font-medium text-[#737373] hover:text-[#991B1B] bg-[#FAFAF8] border border-[#E7E7E3] hover:border-[#F5C2C7] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-xl bg-white border border-[#E7E7E3] space-y-4 shadow-subtle">
          <h3 className="text-card-title font-semibold text-[#202124]">
            Course Attendance Details
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="text-[14px] sm:text-[15px] font-semibold text-[#202124] block mb-1.5">
                Total Classes Conducted So Far *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={conducted}
                onChange={(e) => setConducted(e.target.value)}
                placeholder="e.g. 48"
                className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
              />
            </div>

            <div>
              <label className="text-[14px] sm:text-[15px] font-semibold text-[#202124] block mb-1.5">
                Total Classes You Attended *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={attended}
                onChange={(e) => setAttended(e.target.value)}
                placeholder="e.g. 34"
                className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
              />
            </div>

            <div>
              <label className="text-[14px] sm:text-[15px] font-semibold text-[#202124] block mb-1.5">
                Target Attendance Percentage (%) *
              </label>
              <input
                type="number"
                min="1"
                max="100"
                step="0.5"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g. 75"
                className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-[15px] focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
              />
            </div>
          </div>

          {!result.isValid && result.error && (
            <div className="p-3.5 rounded-lg bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#991B1B] flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
              <span>{result.error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between border-t border-[#E7E7E3]">
            <span className="text-xs font-mono text-[#737373]">Live calculation enabled</span>
            <button
              type="button"
              onClick={() => {
                if (result.isValid) {
                  showToast(`Current Attendance: ${result.currentPercentageFormatted}`, "success");
                  trackCalculationCompleted("attendance-calculator", "manual_calc_click");
                }
              }}
              disabled={!result.isValid}
              className="px-4 py-2.5 rounded-md bg-[#176B50] hover:bg-[#12543E] text-white text-[15px] font-semibold transition-colors disabled:opacity-40"
            >
              Calculate Attendance
            </button>
          </div>

          {/* Assumption Notice */}
          <div className="p-3.5 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3] flex items-start gap-2.5 text-xs text-[#737373] leading-relaxed">
            <Info className="w-4 h-4 text-[#176B50] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#202124] block mb-0.5">Calculation Assumption:</strong>
              The projection assumes every upcoming class is attended consecutively without absence until your attendance reaches the designated target threshold.
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 space-y-4">
          <ResultPanel
            label="Current Attendance Rate"
            value={result.isValid ? result.currentPercentageFormatted : "—"}
            description={
              result.isValid
                ? `${attended || 0} of ${conducted || 0} classes attended.`
                : "Enter class counts and target percentage."
            }
            statusBadge={
              result.isValid
                ? {
                    text:
                      result.status === "above"
                        ? "Safe Above Target"
                        : result.status === "below"
                        ? "Below Target"
                        : result.status === "unstarted"
                        ? "Classes Not Started"
                        : "Target Met",
                    type:
                      result.status === "above" || result.status === "exact"
                        ? "success"
                        : result.status === "below"
                        ? "warning"
                        : "neutral",
                  }
                : undefined
            }
            copyValue={result.isValid ? result.currentPercentageFormatted : undefined}
          >
            {result.isValid && (
              <div className="pt-2 border-t border-[#E7E7E3] space-y-2.5">
                {result.classesNeeded > 0 && (
                  <div className="p-3 rounded bg-[#FEF3C7] border border-[#FDE68A] text-xs space-y-1">
                    <span className="font-semibold text-[#92400E] block">
                      Classes Needed:
                    </span>
                    <p className="text-[#B45309]">
                      You must attend <strong>{result.classesNeeded}</strong> more consecutive class
                      {result.classesNeeded === 1 ? "" : "es"} to achieve {target}%.
                    </p>
                  </div>
                )}

                {result.classesCanMiss > 0 && (
                  <div className="p-3 rounded bg-[#EBF5F1] border border-[#C8E3D8] text-xs space-y-1">
                    <span className="font-semibold text-[#176B50] block">
                      Safe Bunk Capacity:
                    </span>
                    <p className="text-[#176B50]">
                      You can safely skip up to <strong>{result.classesCanMiss}</strong> class
                      {result.classesCanMiss === 1 ? "" : "es"} while maintaining at least {target}%.
                    </p>
                  </div>
                )}

                {result.message && (
                  <p className="text-xs text-[#737373] leading-relaxed">
                    {result.message}
                  </p>
                )}
              </div>
            )}
          </ResultPanel>
        </div>
      </div>
    </div>
  );
}
