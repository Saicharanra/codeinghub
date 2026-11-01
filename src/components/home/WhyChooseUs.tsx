import React from "react";
import { Zap, Lock, ShieldCheck, WifiOff, Command, CheckCheck } from "lucide-react";

export default function WhyChooseUs() {
  const pillars = [
    {
      title: "Zero Server Roundtrips",
      description:
        "Every single calculator and converter runs directly in your browser. Whether you enter 8 semesters of GPA or format 5,000 lines of JSON, feedback is sub-millisecond.",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      tag: "0ms Latency",
      accent: "hover:border-amber-500/40",
    },
    {
      title: "Zero Data Logging",
      description:
        "We never upload your grades, attendance records, or private JSON payloads to a backend server. Your inputs remain in your device memory.",
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      tag: "100% In-Browser",
      accent: "hover:border-emerald-500/40",
    },
    {
      title: "No Deceptive Popups",
      description:
        "Tired of calculator sites with 15 ad banners, fake download buttons, and countdown timers? Coding Hub keeps advertisements clean, clearly labeled, and non-intrusive.",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      tag: "Clean UX",
      accent: "hover:border-cyan-500/40",
    },
    {
      title: "Accredited University Formulas",
      description:
        "Our CGPA credit-weighting algorithms and attendance formulas match official criteria from accredited universities and collegiate examination boards.",
      icon: <CheckCheck className="w-5 h-5 text-violet-400" />,
      tag: "Verified Math",
      accent: "hover:border-violet-500/40",
    },
    {
      title: "Works Offline Once Loaded",
      description:
        "Because our core tools execute client-side JavaScript, they remain fully operational even if your campus library Wi-Fi drops out.",
      icon: <WifiOff className="w-5 h-5 text-rose-400" />,
      tag: "Offline Capable",
      accent: "hover:border-rose-500/40",
    },
    {
      title: "Keyboard-First Workflows",
      description:
        "Press Ctrl+K (or ⌘K) from anywhere to search tools and tutorials instantly. One-click copy buttons copy formatted output without annoying alerts.",
      icon: <Command className="w-5 h-5 text-fuchsia-400" />,
      tag: "Ctrl + K Ready",
      accent: "hover:border-fuchsia-500/40",
    },
  ];

  return (
    <section className="my-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0c101c] via-[#090d18] to-[#06080e] border border-white/[0.08] shadow-2xl relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
          PRODUCT PHILOSOPHY
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Why Coding Hub Feels Different
        </h2>
        <p className="text-slate-400 text-sm">
          Built by developers and students who were fed up with bloated, ad-stuffed utility websites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] ${pillar.accent} hover:-translate-y-0.5 transition-all duration-200 space-y-3 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                {pillar.icon}
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                {pillar.tag}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{pillar.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
