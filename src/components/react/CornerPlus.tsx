import React from 'react';

export const CornerPlus = ({ className }: { className: string }) => (
  <svg 
    className={`absolute w-2.5 h-2.5 text-gray-400 dark:text-gray-700 pointer-events-none z-10 ${className}`} 
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1" />
  </svg>
);






