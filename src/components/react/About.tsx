import React from 'react';
import Panel from './Panel';
import BracketLink from './BracketLink';
import { EXPERIENCE_DATA, MOCK_PROJECTS } from '../../constants';
import { Briefcase } from 'lucide-react';
import avatarImage from '../../assets/avatar.png';

// --- Reused Components from Dashboard (Now Static) ---

const ExperienceLogContent = () => (
  <Panel 
    title="EXPERIENCE_LOG" 
    subtitle="CAREER_TRAJECTORY"
    className="h-full min-h-[400px]"
    action={<Briefcase size={14} className="text-gray-400" />}
  >
      {/* Changed space-y-8 to flex gap-8 to prevent margin collapse on absolute element */}
      <div className="flex flex-col gap-8 relative">
          <div className="absolute top-2 bottom-2 left-1.5 w-px bg-gray-200 dark:bg-white/10"></div>
          {EXPERIENCE_DATA.map((job, idx) => (
              <div key={idx} className="relative pl-6 group">
                  <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-surface-light dark:border-surface ${job.active ? 'bg-accent-teal animate-pulse' : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-accent-teal transition-colors'}`}></div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                      <h4 className="text-sm font-bold font-mono text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                          {job.company}
                      </h4>
                      <span className="text-[10px] font-mono text-gray-400">{job.period}</span>
                  </div>
                  <div className="text-xs text-accent-teal font-medium mb-2">{job.role}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {job.description}
                  </p>
              </div>
          ))}
          <div className="pt-4">
              <BracketLink href="https://linkedin.com/in/ankeethysuvarna">View_Full_History_On_LinkedIn</BracketLink>
          </div>
      </div>
  </Panel>
);

const ActiveModulesContent = () => (
  <Panel
    title="ACTIVE_MODULES"
    subtitle="PROJECT_STATUS"
    className="min-h-[200px]"
    noPadding
  >
    <div className="divide-y divide-gray-200 dark:divide-white/5">
        {MOCK_PROJECTS.map((project) => (
          <div key={project.id} className="p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group cursor-pointer flex justify-between items-center">
             <div>
                <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-accent-teal transition-colors">
                        {project.name}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${project.status === 'shipping' ? 'bg-accent-green' : project.status === 'active' ? 'bg-accent-blue' : 'bg-gray-500'}`} />
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">{project.tags.join(' • ')}</div>
             </div>
             <div className="text-right">
                <div className="text-[10px] font-mono text-gray-400 mb-1">Progress</div>
                <div className="text-xs font-mono text-gray-700 dark:text-gray-300">{project.progress}%</div>
             </div>
          </div>
        ))}
        <div className="p-2 text-center bg-gray-50 dark:bg-black/20">
             <span className="text-[9px] font-mono text-gray-400">System Activity: High</span>
        </div>
    </div>
  </Panel>
);

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      
      {/* Intro Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-12">
            <Panel title="ABOUT_ME" subtitle="PROFILE_DATA" className="bg-surface-light dark:bg-surface">
                <div className="flex flex-col md:flex-row items-start gap-8">
                     <div className="shrink-0">
                         <div className="w-32 h-32 md:w-40 md:h-40 border border-gray-200 dark:border-white/10 p-1 bg-white dark:bg-black/20">
                            <img 
                                src={avatarImage.src}
                                alt="Ankeeth Suvarna" 
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                         </div>
                     </div>
                     <div className="space-y-4 max-w-2xl">
                         <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-tight">Ankeeth Suvarna</h1>
                         <div className="flex flex-wrap gap-2">
                             <span className="px-2 py-1 bg-accent-teal/10 text-accent-teal text-[10px] font-mono uppercase tracking-wider">Founder</span>
                             <span className="px-2 py-1 bg-accent-orange/10 text-accent-orange text-[10px] font-mono uppercase tracking-wider">Agentic_Engineer</span>
                             <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-mono uppercase tracking-wider">Athlete</span>
                         </div>
                         <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                             I am constantly thinking about how software engineering will evolve in an AI-native world. 
                             My quest is to build the "Intelligent System"—a proactive, context-aware digital twin that acts on my behalf.
                             Currently helping businesses build their next-gen AI solutions and training teams to code 10x faster using agentic workflows.
                         </p>
                         <div className="pt-2 flex gap-4">
                             <BracketLink href="https://twitter.com/imankeeth">X / Twitter</BracketLink>
                             <BracketLink href="https://linkedin.com/in/ankeethysuvarna">LinkedIn</BracketLink>
                             <BracketLink href="https://github.com/imankeeth">GitHub</BracketLink>
                         </div>
                     </div>
                </div>
            </Panel>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
         {/* Left Column: Experience */}
         <div className="lg:col-span-7 h-full">
            <ExperienceLogContent />
         </div>

         {/* Right Column: Projects & Logs */}
         <div className="lg:col-span-5 flex flex-col gap-4">
            <ActiveModulesContent />
            
            <Panel title="PERSONAL_LOGS" subtitle="LATEST_NOTES" className="min-h-[150px]">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-mono leading-relaxed">
                   &gt; 2025-03-10: Exploring new agentic patterns with Claude 3.7.<br/>
                   &gt; 2025-02-15: Refactoring Aura Core for better context management.<br/>
                   &gt; 2025-01-20: MMA Training intensity increased. Focus on defense.
                </div>
            </Panel>
         </div>
      </div>
    </div>
  );
};

export default About;





