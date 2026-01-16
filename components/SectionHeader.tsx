
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">{title}</h2>
      {subtitle && <p className="text-slate-500 max-w-2xl">{subtitle}</p>}
      <div className="h-1.5 w-12 bg-indigo-600 mt-4 rounded-full"></div>
    </div>
  );
};
