import React from 'react';
import type { ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { CornerPlus } from './CornerPlus';

interface PanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  dragHandle?: ReactNode;
  noPadding?: boolean;
  showMenu?: boolean;
}

const Panel: React.FC<PanelProps> = ({ 
  title, 
  subtitle, 
  children, 
  className = '', 
  action,
  dragHandle,
  noPadding = false,
  showMenu = false
}) => {
  return (
    <div className={`
      relative flex flex-col
      bg-surface-light dark:bg-surface border border-border-subtle-light dark:border-border-subtle rounded-none
      shadow-sm dark:shadow-none
      ${className}
    `}>
      {/* Corner Crosshairs */}
      <CornerPlus className="-top-1.5 -left-1.5" />
      <CornerPlus className="-top-1.5 -right-1.5" />
      <CornerPlus className="-bottom-1.5 -left-1.5" />
      <CornerPlus className="-bottom-1.5 -right-1.5" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle-light dark:border-border-subtle bg-black/[0.02] dark:bg-white/[0.02] shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {dragHandle}
          <div className="flex items-baseline gap-2 min-w-0">
            <h3 className="text-xs font-semibold font-mono tracking-widest text-gray-900 dark:text-gray-100 uppercase truncate">
              {title}
            </h3>
            {subtitle && (
              <span className="text-[10px] text-gray-500 font-sans truncate max-w-[150px]">
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 ml-2 shrink-0">
            {action}
            {showMenu && (
              <button className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
                  <MoreHorizontal size={14} />
              </button>
            )}
        </div>
      </div>

      {/* Body */}
      <div className={`flex-1 min-h-0 ${noPadding ? '' : 'p-4'}`}>
        {children}
      </div>
    </div>
  );
};

export default Panel;





