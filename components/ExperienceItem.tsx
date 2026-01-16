
import React from 'react';
import { Calendar, Building2 } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceItemProps {
  exp: Experience;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ exp }) => {
  if (!exp.role) return null;

  return (
    <div className="relative pl-10 pb-12 last:pb-0 border-l-2 border-slate-100">
      {/* Timeline Node - Attached only to the main entry */}
      <div className={`absolute left-[-11px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-sm ${exp.isCurrent ? 'bg-indigo-600 animate-pulse' : 'bg-slate-300'}`}></div>
      
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
            {exp.role}
          </h3>
          <div className="inline-flex items-center gap-1.5 text-slate-400 font-medium text-xs mono shrink-0">
            <Calendar size={14} className="text-slate-300" />
            {exp.period}
          </div>
        </div>
        
        <div className="text-lg font-bold text-indigo-600 flex items-center gap-2">
          <Building2 size={18} className="text-indigo-400" />
          {exp.company}
        </div>
      </div>
      
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-3">
          {exp.description.map((point, idx) => (
            <div key={idx} className="flex gap-3 text-slate-600">
              <span className="text-indigo-400 mt-1.5 shrink-0 text-xs">●</span>
              <p className="leading-relaxed text-[15px]">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
