import React, { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Mail, Cpu, Brain, Layers, Settings, Activity, Radio, Zap, Monitor } from 'lucide-react';
import { PROJECTS_MD, WORK_MD, INVOLVEMENT_MD } from './data/content';
import { parseProjects, parseWork, parseInvolvement } from './services/parserService';
import { SectionHeader } from './components/SectionHeader';
import { ProjectCard } from './components/ProjectCard';
import { ExperienceItem } from './components/ExperienceItem';
import { InvolvementCard } from './components/InvolvementCard';

const App: React.FC = () => {
  const projects = useMemo(() => parseProjects(PROJECTS_MD), []);
  const experiences = useMemo(() => parseWork(WORK_MD), []);
  const involvement = useMemo(() => parseInvolvement(INVOLVEMENT_MD), []);
  
  const [activeTab, setActiveTab] = useState<'Software' | 'Hardware'>('Software');
  const [scrolled, setScrolled] = useState(false);
  const [messages, setMessages] = useState<string[]>([
    'uOttaHack 8 : Project GreenWave (https://github.com/diam145/GreenWave)',
    'KERNAL VERSION 5.15.0-OK',
    'RTL SIMULATION COMPLETE',
    'NEURAL NETWORK OPTIMIZED',
    'FPGA CLOCK STABLE @ 100MHZ',
    'EMBEDDED RTOS RUNNING',
    'READY FOR DEPLOYMENT'
  ]);
  const [tickerText, setTickerText] = useState('SYSTEM INITIALIZED');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const loadStatusMessages = async () => {
      try {
        const response = await fetch('/status.txt');
        if (response.ok) {
          const text = await response.text();
          const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
          if (lines.length > 0) {
            setMessages(lines);
          }
        }
      } catch (error) {
        console.error("Status file not found, using fallbacks.", error);
      }
    };
    
    loadStatusMessages();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    
    let i = 0;
    const interval = setInterval(() => {
      setTickerText(messages[i]);
      i = (i + 1) % messages.length;
    }, 3000);

    return () => clearInterval(interval);
  }, [messages]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.category === activeTab);
  }, [projects, activeTab]);

  const skillGroups = [
    { 
      category: 'Low-Level & Hardware', 
      icon: <Cpu size={18} />,
      list: ['C/C++', 'Assembly', 'Verilog/VHDL', 'SystemVerilog (UVM)', 'RTL Design', 'FPGA Architecture', 'Cadence Virtuoso', 'CMOS Logic'] 
    },
    { 
      category: 'Embedded Systems', 
      icon: <Layers size={18} />,
      list: ['FreeRTOS', 'Linux Internals', 'Bare-Metal', 'ARM Cortex-M', 'CAN Bus', 'I2C/SPI/UART', 'MQTT', 'JTAG/SWD'] 
    },
    { 
      category: 'Software & AI', 
      icon: <Brain size={18} />,
      list: ['Python', 'Java', 'Dart/Flutter', 'JavaScript/TS', 'Go', 'FastAPI', 'PyTorch', 'Whisper ASR', 'Docker'] 
    },
    { 
      category: 'Robotics, Control & Math', 
      icon: <Activity size={18} />,
      list: ['MATLAB/Simulink', 'PID Control', 'Robot Kinematics', 'OpenCV', 'Path Planning', 'Prolog', 'Scheme'] 
    }
  ];

  return (
    <div className="min-h-screen">
      {/* System Status Ticker */}
      <div className="bg-slate-900 py-1.5 px-6 overflow-hidden border-b border-indigo-900/20 sticky top-0 z-[60]">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="mono text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Live Status:</span>
          </div>
          <p className="mono text-[10px] text-emerald-400 font-medium uppercase tracking-widest animate-in fade-in slide-in-from-left duration-1000">
            {tickerText}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-[30px] w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => scrollToSection('about')} className="text-xl font-bold tracking-tighter text-slate-900 flex items-center gap-2 group outline-none">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded flex items-center justify-center font-black group-hover:rotate-90 transition-transform">M</div>
            <span>MOUNTAGA DIALLO<span className="text-indigo-600 text-xs align-top">.sys</span></span>
          </button>
          <div className="hidden md:flex gap-8 items-center text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <button onClick={() => scrollToSection('about')} className="hover:text-indigo-600 transition-colors">BIOS</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-indigo-600 transition-colors">LOG</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-indigo-600 transition-colors">OUTPUT</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-indigo-600 transition-colors">CORE</button>
            <button onClick={() => scrollToSection('honors')} className="hover:text-indigo-600 transition-colors">HONORS</button>
            <a 
              href="mailto:mountaga.diallo1711@gmail.com" 
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              PING_ME
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-48 pb-24 md:pt-64 md:pb-40 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16 items-center">
          <div className="md:col-span-3">
            <div className="flex flex-wrap gap-2 mb-8">
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-white border border-slate-200 rounded text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Radio size={12} className="text-indigo-500" />
                Engineering Internships | May 2026
              </div>
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-white border border-slate-200 rounded text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Zap size={12} className="text-emerald-500" />
                Entry-level roles | May 2026
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
              Designing <span className="text-indigo-600">Hardware</span> <br/>
              Architecting <span className="text-slate-400">Software.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed font-medium">
              Bridging the gap between <span className="text-indigo-600 font-bold">Electrical Engineering</span> and <span className="text-slate-900 font-bold">Computing Technology</span>. Specialized in low-latency systems and silicon verification.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://github.com/diam145" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-indigo-600 transition-all shadow-xl">
                <Github size={20} />
                <span className="font-bold text-sm tracking-widest uppercase">Repos</span>
              </a>
              <a href="https://linkedin.com/in/mdial145" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-lg hover:border-indigo-600 transition-all">
                <Linkedin size={20} className="text-indigo-600" />
                <span className="font-bold text-sm tracking-widest uppercase">Connect</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2 relative">
             <div className="blueprint-border bg-white rounded-2xl p-8 relative overflow-hidden group">
               <div className="scanline"></div>
               <div className="space-y-6 relative z-10">
                 {[
                   { label: 'Embedded Systems', Icon: Cpu, color: 'indigo' },
                   { label: 'Hardware Design', Icon: Layers, color: 'violet' },
                   { label: 'Software Development', Icon: Monitor, color: 'emerald' },
                   { label: 'Control Theory', Icon: Settings, color: 'amber' }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center gap-4 group/item">
                     <div className={`p-2.5 bg-${stat.color}-50 text-${stat.color}-600 rounded-lg border border-${stat.color}-100`}>
                        <stat.Icon size={20} />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-end mb-1">
                          <span className="tech-label text-slate-400 font-bold">{stat.label}</span>
                          <span className="mono text-[9px] font-bold text-slate-900">SYSTEM READY</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                           <div className={`h-full bg-${stat.color}-500 w-[90%] rounded-full group-hover/item:w-full transition-all duration-1000`}></div>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="mt-8 border-t border-slate-100 pt-6">
                 <div className="flex justify-between items-center text-[9px] mono text-slate-400 font-bold uppercase">
                   <div className="flex flex-col">
                     <span>Location:</span>
                     <span className="text-slate-900">uOttawa / Canada</span>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="work" className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            title="Operational Log" 
            subtitle="Professional timeline focusing on R&D and critical system infrastructure."
          />
          <div className="mt-20">
            {experiences.map((exp) => (
              <ExperienceItem key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Validated Output" 
            subtitle="Project archive showcasing expertise from silicon floorplanning to high-level application development."
          />
          
          <div className="flex p-1 bg-slate-200/50 rounded-lg w-fit mb-12 border border-slate-200 mono text-[10px] font-bold uppercase tracking-widest">
            <button 
              onClick={() => setActiveTab('Software')}
              className={`px-6 py-2.5 rounded-md transition-all ${activeTab === 'Software' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'}`}
            >
              LAYER_01: SOFTWARE
            </button>
            <button 
              onClick={() => setActiveTab('Hardware')}
              className={`px-6 py-2.5 rounded-md transition-all ${activeTab === 'Hardware' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'}`}
            >
              LAYER_00: HARDWARE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-black tracking-tighter mb-4 text-white uppercase">Technical Stack_</h2>
            <p className="text-slate-400 max-w-xl">Comprehensive list of languages, tools, and frameworks utilized in recent hardware and software deployments.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillGroups.map((group, i) => (
              <div key={i} className="p-6 border border-slate-800 rounded hover:border-indigo-500/50 transition-colors bg-slate-800/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-indigo-400">{group.icon}</div>
                  <h3 className="font-bold text-sm tracking-widest uppercase">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.list.map((skill, j) => (
                    <span key={j} className="text-[10px] font-bold mono uppercase tracking-tight bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Involvement Section */}
      <section id="honors" className="py-24 bg-slate-50 px-6 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Honors & Involvements" 
            subtitle="Recognition, certifications, and engagement within the technical and academic community."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {involvement.map((item) => (
              <InvolvementCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-slate-950 text-white px-6">
        <div className="max-w-6xl mx-auto border-t border-slate-900 pt-16 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <div className="text-3xl font-black mb-6 tracking-tighter uppercase">MOUNTAGA DIALLO</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Actively seeking internship opportunities in Silicon Engineering, Embedded Systems, and AI Research. Open to relocation.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/diam145" className="p-3 bg-slate-900 rounded border border-slate-800 hover:border-indigo-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/mdial145" className="p-3 bg-slate-900 rounded border border-slate-800 hover:border-indigo-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:mountaga.diallo1711@gmail.com" className="p-3 bg-slate-900 rounded border border-slate-800 hover:border-indigo-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-16">
            <div>
              <div className="tech-label text-indigo-400 mb-6">Navigation</div>
              <ul className="space-y-4 mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">00_HOME</button></li>
                <li><button onClick={() => scrollToSection('work')} className="hover:text-white transition-colors">01_LOG</button></li>
                <li><button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">02_OUTPUT</button></li>
                <li><button onClick={() => scrollToSection('skills')} className="hover:text-white transition-colors">03_CORE</button></li>
                <li><button onClick={() => scrollToSection('honors')} className="hover:text-white transition-colors">04_HONORS</button></li>
              </ul>
            </div>
            <div className="text-right">
              <div className="tech-label text-emerald-400 mb-6">Status</div>
              <div className="mono text-[10px] text-emerald-500 font-bold uppercase tracking-widest animate-pulse">System Active</div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-24 text-[9px] mono text-slate-600 font-bold uppercase tracking-[0.4em] text-center border-t border-slate-900 pt-8">
          Designed_by Mountaga_Diallo // Version_2026.1.0 // Latency_45ms
        </div>
      </footer>
    </div>
  );
};

export default App;
