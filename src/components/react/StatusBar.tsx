import React, { useState } from 'react';
import { Settings, RotateCcw, Sun, Moon, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtom, useSetAtom } from 'jotai';
import { themeAtom, dashboardLayoutAtom, auraPositionAtom, themeTransitionAtom, DEFAULT_DASHBOARD_LAYOUT } from '../../store/atoms';
import BracketLink from './BracketLink';

const StatusBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme] = useAtom(themeAtom);
  const setTransition = useSetAtom(themeTransitionAtom);
  const setDashboardLayout = useSetAtom(dashboardLayoutAtom);
  const setAuraPosition = useSetAtom(auraPositionAtom);
  
  const isDark = theme === 'dark';

  const handleThemeToggle = (e: React.MouseEvent) => {
    // Capture coordinates for the transition origin
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const nextTheme = isDark ? 'light' : 'dark';

    setTransition({
      isActive: true,
      type: nextTheme,
      origin: { x: centerX, y: centerY }
    });
    
    // Close the menu after triggering
    setIsOpen(false);
  };

  const handleReset = () => {
    setDashboardLayout(DEFAULT_DASHBOARD_LAYOUT);
    setAuraPosition({ x: 0, y: 0 });
    setIsOpen(false);
  };

  return (
     <div className="fixed bottom-0 left-0 w-full h-9 z-60 bg-surface-light/90 dark:bg-surface/90 border-t border-border-subtle-light dark:border-border-subtle backdrop-blur-md flex items-center justify-between px-4 font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none">
        {/* Left: System Config */}
        <div className="flex items-center gap-4 relative">
            <button 
               onClick={() => setIsOpen(!isOpen)}
               className={`flex items-center gap-2 hover:text-accent-teal transition-colors outline-none ${isOpen ? 'text-accent-teal' : ''}`}
            >
               <Settings size={12} />
               <span>Sys_Config</span>
            </button>
            
            {/* Popover Menu */}
            <AnimatePresence>
               {isOpen && (
                  <>
                    <motion.div 
                       className="fixed inset-0 z-40 bg-transparent" 
                       onClick={() => setIsOpen(false)}
                    /> 
                    <motion.div
                       initial={{ opacity: 0, y: 8, scale: 0.98 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 8, scale: 0.98 }}
                       transition={{ duration: 0.15, ease: "easeOut" }}
                       className="absolute bottom-full left-0 mb-2 w-48 bg-surface-light dark:bg-surface border border-border-subtle-light dark:border-border-subtle shadow-2xl z-50 p-1"
                    >
                       <div className="flex flex-col">
                          <button 
                             onClick={handleReset}
                             className="flex items-center gap-3 px-3 py-2.5 hover:bg-black/5 dark:hover:bg-white/5 text-left text-xs text-gray-800 dark:text-gray-200 transition-colors group w-full"
                          >
                             <RotateCcw size={12} className="text-gray-400 group-hover:text-accent-orange transition-colors" />
                             <span>Reset_Layout</span>
                          </button>
                          <div className="h-px bg-gray-200 dark:bg-white/5 mx-1" />
                          <button 
                             onClick={handleThemeToggle}
                             className="flex items-center gap-3 px-3 py-2.5 hover:bg-black/5 dark:hover:bg-white/5 text-left text-xs text-gray-800 dark:text-gray-200 transition-colors group w-full"
                          >
                             {isDark ? (
                                <Sun size={12} className="text-gray-400 group-hover:text-yellow-400 transition-colors" />
                             ) : (
                                <Moon size={12} className="text-gray-400 group-hover:text-accent-blue transition-colors" />
                             )}
                             <span>{isDark ? 'Light_Mode' : 'Dark_Mode'}</span>
                          </button>
                       </div>
                    </motion.div>
                  </>
               )}
            </AnimatePresence>
            
            {/* Status Indicators (Hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-4 text-[9px] opacity-60">
                <div className="w-px h-3 bg-gray-300 dark:bg-white/10" />
                <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-accent-green animate-pulse" />
                    SYSTEM_ONLINE
                </span>
                <span>V2.5.0-RC1</span>
            </div>
        </div>

        {/* Right: Credits */}
        <div className="flex items-center gap-3 z-50">
           {/* Mobile: GitHub Icon */}
           <a 
              href="https://github.com/imankeeth"
              target="_blank"
              rel="noreferrer"
              className="sm:hidden text-gray-500 hover:text-black dark:hover:text-white transition-colors"
           >
              <Github size={14} />
           </a>

           {/* Desktop: Text Link */}
           <BracketLink 
              href="https://github.com/imankeeth"
              className="hidden sm:inline-block opacity-70 hover:opacity-100"
           >
              View_Source
           </BracketLink>
           
           <span className="h-3 w-px bg-gray-300 dark:bg-white/20"></span>

           <span className="opacity-60 hidden xs:inline">Created by</span>
           <BracketLink 
              href="https://x.com/imankeeth" 
              className="font-bold"
           >
              @imankeeth
           </BracketLink>
        </div>
     </div>
  );
};

export default StatusBar;
