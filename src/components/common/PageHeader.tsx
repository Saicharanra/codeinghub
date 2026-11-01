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
        <div className="text-xs font-semibold uppercase tracking-wider text-[#176B50] mb-2">
          {badge}
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-[#737373] max-w-2xl leading-relaxed">
        {description}
      </p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
