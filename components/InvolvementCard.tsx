
import React from 'react';
import { Trophy, Award, BookOpen, Users, ExternalLink } from 'lucide-react';
import { Involvement } from '../types';

interface InvolvementCardProps {
  item: Involvement;
}

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'award': return <Trophy size={16} />;
    case 'certification': return <Award size={16} />;
    case 'hackathon': return <BookOpen size={16} />;
    default: return <Users size={16} />;
  }
};

const getBadgeColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'award': return 'bg-amber-50 text-amber-600 border-amber-100';
    case 'certification': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'hackathon': return 'bg-violet-50 text-violet-600 border-violet-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

export const InvolvementCard: React.FC<InvolvementCardProps> = ({ item }) => {
  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-lg p-6 hover:blueprint-border transition-all h-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getBadgeColor(item.category)}`}>
          {getIcon(item.category)}
          {item.category}
        </div>
        <span className="mono text-[10px] text-slate-400 font-bold">{item.date}</span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{item.title}</h3>
      <div className="text-xs font-bold text-indigo-600 mb-4 uppercase tracking-wider">{item.organization}</div>

      <ul className="space-y-2 mb-6 flex-grow">
        {item.description.map((desc, i) => (
          <li key={i} className="text-sm text-slate-600 flex gap-2">
            <span className="text-indigo-400 shrink-0 mt-1">▹</span>
            {desc}
          </li>
        ))}
      </ul>

      {item.link && (
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors uppercase tracking-widest mt-auto border-t border-slate-50 pt-4"
        >
          View Documentation
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
};
