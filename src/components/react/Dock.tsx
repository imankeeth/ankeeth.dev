import React from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "../../constants";

interface DockProps {
  currentPath?: string;
}

const Dock: React.FC<DockProps> = ({ currentPath = "/" }) => {
  // Helper to check active state, handling singular/plural mismatches
  const isItemActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/") {
      // Handle the /writings (post) vs /writing (list) case
      if (path === "/writings" && currentPath.startsWith("/writings"))
        return true;
      return currentPath.startsWith(path);
    }
    return false;
  };

  return (
    <div className="fixed bottom-12 left-0 right-0 z-50 hidden md:flex items-center justify-center pointer-events-none">
      {/* Main Nav Container */}
      <div className="relative pointer-events-auto bg-surface-light/95 dark:bg-surface/95 backdrop-blur-md shadow-2xl mx-auto border border-gray-200 dark:border-white/10">
        <nav className="flex divide-x divide-gray-200 dark:divide-white/5 relative z-10">
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item.path);
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={item.path}
                className={`
                  relative group flex items-center gap-2 px-6 py-3 min-w-[120px] justify-center
                  transition-colors duration-200 outline-none no-underline
                  ${
                    isActive
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  }
                `}
              >
                {/* Active State: Brackets & Tint */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockHighlight"
                    className="absolute inset-0 z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-teal" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-teal" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent-teal" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent-teal" />

                    {/* Background Tint */}
                    <div className="absolute inset-0 bg-accent-teal/5 dark:bg-accent-teal/10" />
                  </motion.div>
                )}

                <span
                  className={`relative z-10 opacity-80 group-hover:opacity-100 transition-opacity ${isActive ? "text-accent-teal" : ""}`}
                >
                  <Icon size={16} />
                </span>

                <span className="relative z-10 font-mono text-[11px] uppercase tracking-widest font-medium">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Dock;
