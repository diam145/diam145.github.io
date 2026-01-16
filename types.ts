
export interface Project {
  id: string;
  title: string;
  category: string;
  topic: string;
  tags: string[];
  description: string[];
  githubLink?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  isCurrent?: boolean;
}

export interface Involvement {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string; // 'Award', 'Certification', 'Hackathon', 'Volunteering'
  description: string[];
  link?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
