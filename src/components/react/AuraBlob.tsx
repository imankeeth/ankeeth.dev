import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { auraOpenAtom } from "../../store/atoms";
import Aura from "./Aura";
import AuraOrb from "./AuraOrb";

const HELP_MESSAGES = [
  "Click or press Cmd+K to access the neural interface.",
  "Searching for a specific project? Just ask.",
  "I can summarize Ankeeth's architectural decisions.",
  "System online. Ready for your queries.",
  "Need to schedule a sync? I can handle that.",
  "Accessing knowledge base... Ask me anything.",
];

const AuraBlob: React.FC = () => {
  const [isAuraOpen, setIsAuraOpen] = useAtom(auraOpenAtom);
  const [showHelpBubble, setShowHelpBubble] = useState(false);
  const [targetHelpMessage, setTargetHelpMessage] = useState("");
  const [displayedHelpText, setDisplayedHelpText] = useState("");
  const [helpMessageIndex, setHelpMessageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsAuraOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsAuraOpen]);

  useEffect(() => {
    if (isAuraOpen) {
      setShowHelpBubble(false);
      return;
    }

    const triggerBubble = () => {
      const msg = HELP_MESSAGES[helpMessageIndex];
      setTargetHelpMessage(msg);
      setShowHelpBubble(true);
      setHelpMessageIndex((prev) => (prev + 1) % HELP_MESSAGES.length);
      setTimeout(() => setShowHelpBubble(false), 6000);
    };

    const triggerTimer = setTimeout(triggerBubble, 2000);
    const interval = setInterval(() => {
      if (!isAuraOpen) {
        triggerBubble();
      }
    }, 30000);

    return () => {
      clearTimeout(triggerTimer);
      clearInterval(interval);
    };
  }, [isAuraOpen, helpMessageIndex]);

  useEffect(() => {
    if (!showHelpBubble) {
      setDisplayedHelpText("");
      return;
    }

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedHelpText(targetHelpMessage.slice(0, currentIndex + 1));
      currentIndex += 1;

      if (currentIndex > targetHelpMessage.length) {
        clearInterval(intervalId);
      }
    }, 30);

    return () => clearInterval(intervalId);
  }, [showHelpBubble, targetHelpMessage]);

  return (
    <>
      <Aura isOpen={isAuraOpen} onClose={() => setIsAuraOpen(false)} />

      <div className="fixed right-4 bottom-12 z-[70] pointer-events-none flex flex-col items-end md:right-6">
        <AnimatePresence>
          {!isAuraOpen && showHelpBubble && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="relative mb-4 mr-2 max-w-[200px] rounded-sm border border-accent-teal/30 bg-surface-light p-3 shadow-xl pointer-events-auto dark:bg-surface"
            >
              <p className="min-h-[2.5em] text-[10px] leading-relaxed font-mono text-gray-600 dark:text-gray-300">
                <span className="mr-1 text-accent-teal">&gt;</span>
                {displayedHelpText}
                <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-accent-teal/50 align-middle" />
              </p>
              <div className="absolute right-6 -bottom-1.5 h-3 w-3 rotate-45 border-r border-b border-accent-teal/30 bg-surface-light dark:bg-surface" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsAuraOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-transform pointer-events-auto group focus:outline-none active:scale-95"
          aria-label="Open Aura"
        >
          <div className="absolute inset-0 rounded-full bg-accent-teal/20 opacity-20 duration-1000 animate-ping" />
          <div className="absolute inset-0 rounded-full border border-accent-teal/20 bg-surface-light dark:bg-surface" />
          <AuraOrb size={56} active className="relative z-10 rounded-full" />
        </button>
      </div>
    </>
  );
};

export default AuraBlob;
