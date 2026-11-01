import React from "react";

interface PageHeaderProps {
  badge?: string;
  badgeColor?: "indigo" | "purple" | "emerald" | "amber" | "cyan";
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  badge,
  badgeColor = "cyan",
  title,
  description,
  children,
}: PageHeaderProps) {
  const badgeClasses = {
    cyan: "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]",
    indigo: "bg-indigo-950/60 text-indigo-300 border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]",
    purple: "bg-violet-950/60 text-violet-300 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]",
    emerald: "bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    amber: "bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
  };

  return (
    <div className="relative mb-8 md:mb-12">
      {/* Background ambient lighting */}
      <div className="absolute -top-12 left-1/3 w-3/4 max-w-2xl h-36 bg-gradient-to-r from-cyan-500/10 via-violet-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      {badge && (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border mb-4 ${badgeClasses[badgeColor]}`}
        >
          {badge}
        </span>
      )}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
        {description}
      </p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
