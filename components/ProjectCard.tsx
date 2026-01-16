
import React from 'react';
import { Github, ExternalLink, Cpu, Code2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative flex flex-col bg-white border border-slate-200 rounded-lg p-6 transition-all duration-300 hover:blueprint-border hover:-translate-y-1 h-full">
      {/* Serial ID decorative element */}
      <div className="absolute top-3 right-4 mono text-[10px] text-slate-300 font-bold select-none">
        REF: {project.id.toUpperCase()}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-indigo-50 rounded text-indigo-600">
          {project.category === 'Hardware' ? <Cpu size={14} /> : <Code2 size={14} />}
        </div>
        <span className="tech-label text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded mono">
          {project.topic}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
        {project.title}
      </h3>
      
      <div className="space-y-2.5 flex-grow mb-6">
        {project.description.map((point, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="text-slate-300 mt-1.5 shrink-0 text-[10px] mono">0{idx+1}</span>
            <p className="text-slate-600 text-sm leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-auto space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-tighter mono"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {project.githubLink && (
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-md hover:bg-indigo-600 transition-colors uppercase tracking-widest"
          >
            <Github size={14} />
            Source Repository
          </a>
        )}
      </div>
    </div>
  );
};
