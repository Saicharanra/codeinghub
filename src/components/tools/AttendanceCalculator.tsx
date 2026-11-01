"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Check,
  Info,
} from "lucide-react";

export default function AttendanceCalculator() {
  const [totalClassesHeld, setTotalClassesHeld] = useState<string>("48");
  const [classesAttended, setClassesAttended] = useState<string>("34");
  const [targetPercentage, setTargetPercentage] = useState<number>(75);
  const [copied, setCopied] = useState(false);

  const total = parseInt(totalClassesHeld, 10);
  const attended = parseInt(classesAttended, 10);

  const isValid =
    !isNaN(total) &&
    !isNaN(attended) &&
    total > 0 &&
    attended >= 0 &&
    attended <= total;

  const currentPercentage = isValid ? (attended / total) * 100 : 0;
  const isTargetMet = currentPercentage >= targetPercentage;

  let classesNeeded = 0;
  if (isValid && !isTargetMet && targetPercentage < 100) {
    const t = targetPercentage / 100;
    const numerator = t * total - attended;
    const denominator = 1 - t;
    classesNeeded = Math.max(0, Math.ceil(numerator / denominator));
  }

  let safeBunks = 0;
  if (isValid && isTargetMet && targetPercentage > 0) {
    const t = targetPercentage / 100;
    safeBunks = Math.max(0, Math.floor(attended / t - total));
  }

  const getStatus = (pct: number, target: number) => {
    if (!isValid) return { label: "Invalid Input", color: "text-slate-400", bg: "bg-white/[0.04] border-white/[0.08]" };
    if (pct >= target + 5) {
      return {
        label: "Safe Zone - Attendance Buffer Exceeded",
        color: "text-emerald-400",
        bg: "bg-emerald-950/60 border-emerald-500/40",
      };
    }
    if (pct >= target) {
      return {
        label: "Target Met - Meets Minimum Benchmark",
        color: "text-cyan-400",
        bg: "bg-cyan-950/60 border-cyan-500/40",
      };
    }
    if (pct >= target - 10) {
      return {
        label: "Shortage Risk - Debarment Warning",
        color: "text-amber-400",
        bg: "bg-amber-950/60 border-amber-500/40",
      };
    }
    return {
      label: "Critical Shortage - Immediate Attendance Needed",
      color: "text-rose-400",
      bg: "bg-rose-950/60 border-rose-500/40",
    };
  };

  const status = getStatus(currentPercentage, targetPercentage);

  const handleCopy = () => {
    const msg = `Coding Hub Attendance Report:
Current Attendance: ${currentPercentage.toFixed(1)}% (${attended}/${total} classes)
Target Requirement: ${targetPercentage}%
Status: ${isTargetMet ? `Target met! You can safely miss ${safeBunks} classes.` : `Need to attend ${classesNeeded} consecutive classes.`}
Calculate yours at https://codinghub.dev/tools/attendance-calculator`;
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Target Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c101c]/90 border border-white/[0.08] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Target Attendance Requirement</h2>
            <p className="text-xs text-slate-400">
              Select mandated university criteria
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[75, 80, 85, 90].map((t) => (
            <button
              key={t}
              onClick={() => setTargetPercentage(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                targetPercentage === t
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]"
              }`}
            >
              {t}%
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0c101c]/90 border border-white/[0.08] space-y-5">
            <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300">
              Enter Current Semester Attendance
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5">
                  Total Classes Conducted (Held So Far)
                </label>
                <input
                  type="number"
                  min="1"
                  value={totalClassesHeld}
                  onChange={(e) => setTotalClassesHeld(e.target.value)}
                  placeholder="e.g. 48"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-slate-100 placeholder-slate-500 text-lg font-mono font-bold focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5">
                  Classes Actually Attended
                </label>
                <input
                  type="number"
                  min="0"
                  max={totalClassesHeld}
                  value={classesAttended}
                  onChange={(e) => setClassesAttended(e.target.value)}
                  placeholder="e.g. 34"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-slate-100 placeholder-slate-500 text-lg font-mono font-bold focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            {attended > total && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Classes attended cannot exceed total classes conducted.</span>
              </div>
            )}
          </div>

          {/* Assumptions */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-3">
            <div className="flex items-center gap-2 font-mono font-semibold text-cyan-300">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Assumptions & Calculation Logic</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-slate-400">
              <li>
                <strong>Future Attendance Assumption:</strong> &quot;Classes needed&quot; calculations assume you attend 100% of upcoming lectures consecutively without absences.
              </li>
              <li>
                <strong>Bunk Buffer:</strong> Tells you how many sessions you can skip before your percentage drops below {targetPercentage}%.
              </li>
            </ul>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#101626] to-[#0a0d17] border border-white/[0.1] shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient glow inside card */}
            <div
              className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
                isTargetMet ? "bg-emerald-600/15" : "bg-amber-600/15"
              }`}
            />

            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="text-xs uppercase font-mono font-semibold text-slate-400 tracking-wider">
                Current Attendance
              </span>
              <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${status.bg} ${status.color}`}>
                Target: {targetPercentage}%
              </span>
            </div>

            <div className="text-center py-2 relative">
              <div
                className={`text-6xl sm:text-7xl font-mono font-black tracking-tight ${
                  isTargetMet
                    ? "text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]"
                    : "text-amber-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.35)]"
                }`}
              >
                {isValid ? `${currentPercentage.toFixed(1)}%` : "0.0%"}
              </div>
              <p className="text-xs font-mono text-slate-400 mt-2">
                {isValid
                  ? `${attended} attended out of ${total} classes held`
                  : "Awaiting valid inputs"}
              </p>
            </div>

            {/* Strategic Action Insight Card */}
            {isValid && (
              <div
                className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                  isTargetMet
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200"
                    : "bg-amber-950/40 border-amber-500/30 text-amber-200"
                }`}
              >
                {isTargetMet ? (
                  <div className="space-y-1">
                    <div className="font-semibold flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Criteria Satisfied!</span>
                    </div>
                    <p className="text-xs text-emerald-300/90">
                      You can safely miss <strong>{safeBunks}</strong> more{" "}
                      {safeBunks === 1 ? "class" : "classes"} while keeping attendance at or above {targetPercentage}%.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Action Required!</span>
                    </div>
                    <p className="text-xs text-amber-300/90">
                      You must attend the next <strong>{classesNeeded}</strong> consecutive{" "}
                      {classesNeeded === 1 ? "class" : "classes"} without skipping to raise attendance to {targetPercentage}%.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Classes Needed</span>
                <span className="text-2xl font-mono font-bold text-slate-100">
                  {isValid ? classesNeeded : 0}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Safe Bunks</span>
                <span className="text-2xl font-mono font-bold text-slate-100">
                  {isValid ? safeBunks : 0}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              disabled={!isValid}
              className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] flex items-center justify-center gap-2 transition-all disabled:opacity-30"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Report Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>Copy Attendance Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
