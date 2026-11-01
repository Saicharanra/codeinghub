"use client";

import React, { useState } from "react";
import { calculateAttendance } from "@/lib/calculators/attendance";
import ResultPanel from "./shared/ResultPanel";
import { AlertCircle, RotateCcw, Info } from "lucide-react";

export default function AttendanceCalculator() {
  const [conducted, setConducted] = useState<string>("48");
  const [attended, setAttended] = useState<string>("34");
  const [target, setTarget] = useState<string>("75");

  const result = calculateAttendance(conducted, attended, target);

  const resetCalculator = () => {
    setConducted("");
    setAttended("");
    setTarget("75");
  };

  const presetTargets = ["75", "80", "85", "90"];

  return (
    <div className="space-y-6">
      {/* Quick Target Presets & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-white border border-[#E7E7E3]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#737373] uppercase tracking-wider">
            Target Presets:
          </span>
          {presetTargets.map((preset) => (
            <button
              key={preset}
              onClick={() => setTarget(preset)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                target === preset
                  ? "bg-[#176B50] text-white font-medium"
                  : "bg-[#FAFAF8] text-[#737373] hover:text-[#202124] border border-[#E7E7E3]"
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>

        <button
          onClick={resetCalculator}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono text-[#737373] hover:text-[#991B1B] bg-[#FAFAF8] border border-[#E7E7E3] hover:border-[#F5C2C7] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-7 p-5 rounded-lg bg-white border border-[#E7E7E3] space-y-4">
          <h3 className="text-sm font-semibold text-[#202124]">
            Course Attendance Details
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-mono text-[#737373] block mb-1">
                Total Classes Conducted So Far *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={conducted}
                onChange={(e) => setConducted(e.target.value)}
                placeholder="e.g. 48"
                className="w-full px-3.5 py-2 rounded border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#737373] block mb-1">
                Total Classes You Attended *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={attended}
                onChange={(e) => setAttended(e.target.value)}
                placeholder="e.g. 34"
                className="w-full px-3.5 py-2 rounded border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#737373] block mb-1">
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
                className="w-full px-3.5 py-2 rounded border border-[#E7E7E3] bg-[#FAFAF8] text-[#202124] font-mono text-sm focus:outline-none focus:border-[#176B50] focus:ring-1 focus:ring-[#176B50] transition-colors"
              />
            </div>
          </div>

          {!result.isValid && result.error && (
            <div className="p-3 rounded bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#991B1B] flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
              <span>{result.error}</span>
            </div>
          )}

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
