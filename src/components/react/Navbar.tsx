import React, { useState, useEffect } from "react";
import { Plus, Moon, Sun, Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import {
  themeAtom,
  projectModalOpenAtom,
  projectModalIntentAtom,
  themeTransitionAtom,
} from "../../store/atoms";
import TechButton from "./TechButton";
import { NAV_ITEMS } from "../../constants";
import avatarImage from "../../assets/avatar.png";

interface NavbarProps {
  currentPath?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath = "/" }) => {
  const [theme] = useAtom(themeAtom);
  const setTransition = useSetAtom(themeTransitionAtom);
  const setProjectModalOpen = useSetAtom(projectModalOpenAtom);
  const setProjectModalIntent = useSetAtom(projectModalIntentAtom);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch by only showing theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = theme === "dark";

  const handleThemeToggle = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setTransition({
      isActive: true,
      type: isDark ? "light" : "dark",
      origin: { x: centerX, y: centerY },
    });
  };

  const handleNewProject = () => {
    setProjectModalIntent(null);
    setProjectModalOpen(true);
  };

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/") {
      if (path === "/writings" && currentPath.startsWith("/writings"))
        return true;
      return currentPath.startsWith(path);
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle-light dark:border-border-subtle bg-surface-light/95 dark:bg-graphite/95 backdrop-blur-md">
      <div className="max-w-[1920px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-8 cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div className="p-1 bg-gray-900 dark:bg-white text-white dark:text-black">
              <Terminal size={14} strokeWidth={3} />
            </div>
            <span className="font-mono font-bold text-gray-900 dark:text-white tracking-tighter text-sm uppercase">
              ankeeth.dev
            </span>
          </div>
        </a>

        {/* Center: Empty (Nav moved to Dock) */}
        <div className="flex-1" />

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleThemeToggle}
            className="p-1 text-gray-500 hover:text-black dark:hover:text-white transition-colors relative overflow-hidden w-6 h-6 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {/* Render a placeholder during SSR and initial hydration to prevent mismatch */}
            {!mounted ? (
              <div className="w-4 h-4" />
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </AnimatePresence>
            )}
          </button>

          <div className="h-4 w-px bg-gray-200 dark:bg-white/10 hidden md:block" />

          <div className="hidden md:flex items-center gap-2">
            <TechButton
              variant="primary"
              icon={<Plus size={14} />}
              onClick={handleNewProject}
            >
              New Project
            </TechButton>
          </div>

          <div className="w-8 h-8 rounded-none border border-gray-200 dark:border-white/20 overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all">
            <img
              src={avatarImage.src}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Menu */}
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-black dark:hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-14 left-0 w-full bg-surface-light dark:bg-surface border-b border-border-subtle-light dark:border-border-subtle overflow-hidden shadow-2xl z-50"
          >
            <div className="p-4 flex flex-col gap-4">
              <nav className="flex flex-col border border-border-subtle-light dark:border-border-subtle">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-left border-b border-border-subtle-light dark:border-border-subtle last:border-0 transition-colors
                        ${
                          isActive(item.path)
                            ? "bg-accent-teal/10 text-accent-teal"
                            : "text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </a>
                  );
                })}
              </nav>
              <div className="grid grid-cols-1 gap-3">
                <TechButton
                  variant="primary"
                  icon={<Plus size={14} />}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNewProject();
                  }}
                  className="w-full"
                >
                  New Project
                </TechButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
