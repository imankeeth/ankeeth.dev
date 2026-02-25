import React from 'react';
import { CornerPlus } from './CornerPlus';
import { motion, type MotionProps } from 'framer-motion';

interface TechButtonProps extends MotionProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  icon?: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const TechButton: React.FC<TechButtonProps> = ({ 
  children, 
  variant = 'secondary', 
  icon, 
  active = false,
  className = '',
  ...props 
}) => {
  
  const baseStyles = "relative group flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gray-900 text-white dark:bg-white dark:text-black border border-transparent hover:bg-gray-800 dark:hover:bg-gray-200",
    secondary: "bg-transparent text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5",
    ghost: "bg-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent",
    accent: "bg-accent-teal/10 text-accent-teal border border-accent-teal/20 hover:bg-accent-teal/20"
  };

  const activeStyles = active ? "border-accent-teal text-accent-teal bg-accent-teal/5" : "";

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${activeStyles} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Corner Decorations - Only for Secondary/Outline style or when active */}
      {(variant === 'secondary' || variant === 'accent' || active) && (
        <>
          <CornerPlus className="-top-1 -left-1 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CornerPlus className="-top-1 -right-1 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CornerPlus className="-bottom-1 -left-1 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CornerPlus className="-bottom-1 -right-1 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
      )}
      
      {icon && <span className="opacity-80">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default TechButton;
