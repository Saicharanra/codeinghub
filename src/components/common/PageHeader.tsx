import React from "react";

interface PageHeaderProps {
  badge?: string;
  badgeColor?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  badge,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10 pb-6 border-b border-[#E7E7E3]">
      {badge && (
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#176B50] mb-2">
          {badge}
        </div>
      )}
      <h1 className="text-page-title font-bold text-[#202124] tracking-tight mb-2.5">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-[#737373] max-w-3xl leading-relaxed font-normal">
        {description}
      </p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
