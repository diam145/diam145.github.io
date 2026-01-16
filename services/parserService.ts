
import { Project, Experience, Involvement } from '../types';

const cleanValue = (line: string, prefix: string) => {
  return line.replace(prefix, '').trim();
};

export const parseProjects = (md: string): Project[] => {
  const sections = md.trim().split(/\n# /).filter(Boolean);
  return sections.map((section, index) => {
    const fullSection = section.startsWith('# ') ? section : '# ' + section;
    const lines = fullSection.split('\n').map(l => l.trim()).filter(Boolean);
    const title = lines[0].replace('# ', '');
    
    const categoryLine = lines.find(l => l.startsWith('## Category:'));
    const category = categoryLine ? cleanValue(categoryLine, '## Category:') : '';

    const topicLine = lines.find(l => l.startsWith('### Topic:'));
    const topic = topicLine ? cleanValue(topicLine, '### Topic:') : (category === 'Software' ? 'Web App' : 'Embedded');
    
    const tagsLine = lines.find(l => l.startsWith('### Tags:'));
    const tags = tagsLine ? cleanValue(tagsLine, '### Tags:').split(',').map(t => t.trim()) : [];
    
    const linkLine = lines.find(l => l.startsWith('#### Link:'));
    const githubLink = linkLine ? cleanValue(linkLine, '#### Link:') : undefined;
    
    const description = lines.filter(l => l.startsWith('- ')).map(l => l.replace('- ', ''));

    return {
      id: `proj-${index}`,
      title,
      category,
      topic,
      tags,
      githubLink,
      description,
      featured: index === 0
    };
  });
};

export const parseWork = (md: string): Experience[] => {
  const sections = md.trim().split(/\n# /).filter(Boolean);
  return sections.map((section, index) => {
    const fullSection = section.startsWith('# ') ? section : '# ' + section;
    const lines = fullSection.split('\n').map(l => l.trim()).filter(Boolean);
    const role = lines[0].replace('# ', '');
    
    const companyLine = lines.find(l => l.startsWith('## Company:'));
    const company = companyLine ? cleanValue(companyLine, '## Company:') : '';
    
    const periodLine = lines.find(l => l.startsWith('### Period:'));
    const period = periodLine ? cleanValue(periodLine, '### Period:') : '';
    
    const description = lines.filter(l => l.startsWith('- ')).map(l => l.replace('- ', ''));

    return {
      id: `exp-${index}`,
      role,
      company,
      period,
      description,
      isCurrent: period.toLowerCase().includes('present')
    };
  });
};

export const parseInvolvement = (md: string): Involvement[] => {
  const sections = md.trim().split(/\n# /).filter(Boolean);
  return sections.map((section, index) => {
    const fullSection = section.startsWith('# ') ? section : '# ' + section;
    const lines = fullSection.split('\n').map(l => l.trim()).filter(Boolean);
    const title = lines[0].replace('# ', '');
    
    const orgLine = lines.find(l => l.startsWith('## Organization:'));
    const organization = orgLine ? cleanValue(orgLine, '## Organization:') : '';
    
    const dateLine = lines.find(l => l.startsWith('### Date:'));
    const date = dateLine ? cleanValue(dateLine, '### Date:') : '';
    
    const catLine = lines.find(l => l.startsWith('### Category:'));
    const category = catLine ? cleanValue(catLine, '### Category:') : 'Involvement';
    
    const linkLine = lines.find(l => l.startsWith('#### Link:'));
    const link = linkLine ? cleanValue(linkLine, '#### Link:') : undefined;
    
    const description = lines.filter(l => l.startsWith('- ')).map(l => l.replace('- ', ''));

    return {
      id: `inv-${index}`,
      title,
      organization,
      date,
      category,
      description,
      link
    };
  });
};
