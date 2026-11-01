import React from "react";

interface ToolHeaderProps {
  category: "Student Tools" | "Developer Tools";
  title: string;
  description: string;
}

export default function ToolHeader({
  category,
  title,
  description,
}: ToolHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8 pb-6 border-b border-[#E7E7E3]">
      <div className="inline-block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#176B50] bg-[#EBF5F1] px-2.5 py-0.5 rounded border border-[#C8E3D8] mb-2.5">
        {category}
      </div>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-[#737373] max-w-2xl leading-relaxed">
        {description}
      </p>
    </div>
  );
}
