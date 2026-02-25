import React from 'react';
import { motion } from 'framer-motion';

interface BracketLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  className?: string;
}

const BracketLink: React.FC<BracketLinkProps> = ({ href, onClick, children, className = '', ...props }) => {
  const isExternal = href?.startsWith('http');
  
  // The inner content with bracket animation
  const content = (
    <motion.span 
      className={`inline-flex items-center font-mono text-xs cursor-pointer group select-none ${className}`}
      whileHover="hover"
      whileTap="tap"
    >
      <motion.span 
        className="text-gray-400 dark:text-gray-600 group-hover:text-accent-teal transition-colors font-bold mr-0.5"
        variants={{
          hover: { x: -2 },
          tap: { x: 0, scale: 0.9 }
        }}
      >
        [
      </motion.span>
      
      <motion.span 
        className="text-gray-700 dark:text-gray-300 group-hover:text-accent-teal decoration-dashed decoration-gray-400/50 underline-offset-4 group-hover:decoration-accent-teal transition-all"
        variants={{
          tap: { scale: 0.95 }
        }}
      >
        {children}
      </motion.span>
      
      <motion.span 
        className="text-gray-400 dark:text-gray-600 group-hover:text-accent-teal transition-colors font-bold ml-0.5"
        variants={{
          hover: { x: 2 },
          tap: { x: 0, scale: 0.9 }
        }}
      >
        ]
      </motion.span>
    </motion.span>
  );

  // If href is present, render as anchor
  if (href) {
    return (
      <a 
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="inline-block focus:outline-none"
        {...props}
      >
        {content}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button 
      onClick={onClick} 
      className="inline-block bg-transparent border-0 p-0 focus:outline-none" 
      type="button"
    >
      {content}
    </button>
  );
};

export default BracketLink;






