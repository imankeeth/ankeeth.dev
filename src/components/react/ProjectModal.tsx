import React, { useEffect, useState } from "react";
import {
  X,
  ArrowRight,
  CheckCircle,
  Terminal,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { SERVICES_DATA } from "../../constants";
import { projectModalIntentAtom, projectModalOpenAtom } from "../../store/atoms";
import Panel from "./Panel";
import TechButton from "./TechButton";

const TEMPLATES: Record<string, string> = {
  s1: "We have a team of [NUMBER] engineers. We are looking to adopt agentic workflows to improve velocity.\n\nCurrent Stack: [React/Python/etc]\n\nPrimary Goal: Ship faster / Reduce technical debt / Up-skill team",
  s2: "We are looking to build [PRODUCT_NAME].\n\nCore capabilities required:\n1. \n2. \n\nTarget timeline: [Q1 2026]\nEstimated Budget Range: ",
  s3: "We need a strategic review of our [AI Strategy / Infrastructure].\n\nCurrent Challenges:\n- \n- \n\nDesired Outcome:",
  default: "> Describe the objective...",
};

const ProjectModal: React.FC = () => {
  const [isOpen, setIsOpen] = useAtom(projectModalOpenAtom);
  const [intent, setIntent] = useAtom(projectModalIntentAtom);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("s2");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const nextServiceId = intent ?? "s2";
    setSelectedServiceId(nextServiceId);
    setFormData((prev) => ({
      ...prev,
      description: TEMPLATES[nextServiceId] ?? TEMPLATES.default,
    }));
    setStep(1);
  }, [isOpen, intent]);

  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, setIsOpen]);

  const handleServiceChange = (id: string) => {
    setSelectedServiceId(id);
    setIntent(id);
    setFormData((prev) => ({
      ...prev,
      description: TEMPLATES[id] ?? TEMPLATES.default,
    }));
  };

  const handleNext = () => {
    if (!formData.name || !formData.email || !formData.description) return;
    setStep(2);
  };

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-white/90 dark:bg-graphite/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          <motion.div
            className="relative z-10 flex h-[90vh] w-full max-w-3xl flex-col md:h-auto md:max-h-[85vh]"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Panel
              title="Initialize Protocol"
              subtitle={`ENGAGEMENT: ${selectedServiceId.toUpperCase()}`}
              className="flex h-full flex-col bg-surface-light shadow-2xl dark:bg-surface"
              noPadding
              dragHandle={
                <div className="mr-2 text-accent-teal opacity-80">
                  <Terminal size={14} />
                </div>
              }
              action={
                <button
                  type="button"
                  onClick={close}
                  className="text-gray-400 transition-colors hover:text-black dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              }
            >
              <div className="flex h-full flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  <div className="mb-8 flex shrink-0 items-center gap-4 text-xs font-mono uppercase tracking-widest">
                    <div
                      className={`flex items-center gap-2 ${step === 1 ? "text-accent-teal" : "text-gray-400"}`}
                    >
                      <span className="font-bold">01 // Configuration</span>
                    </div>
                    <div className="h-px w-12 bg-gray-200 dark:bg-white/10" />
                    <div
                      className={`flex items-center gap-2 ${step === 2 ? "text-accent-orange" : "text-gray-400"}`}
                    >
                      <span className="font-bold">02 // Uplink</span>
                    </div>
                  </div>

                  {step === 1 ? (
                    <div className="space-y-8 pb-2">
                      <div className="space-y-3">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                          Select Engagement Protocol
                        </label>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                          {SERVICES_DATA.map((service) => {
                            const Icon = service.icon;
                            const isSelected = selectedServiceId === service.id;

                            return (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => handleServiceChange(service.id)}
                                className={`relative flex flex-col items-start gap-2 border p-3 text-left transition-all duration-200 ${
                                  isSelected
                                    ? "border-accent-teal bg-accent-teal/5 text-gray-900 dark:text-white"
                                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-black/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/5"
                                }`}
                              >
                                {isSelected && (
                                  <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-accent-teal" />
                                )}
                                <div
                                  className={`${isSelected ? "text-accent-teal" : "text-gray-400"}`}
                                >
                                  <Icon size={14} />
                                </div>
                                <div>
                                  <div className="mb-1 text-xs font-bold font-mono uppercase tracking-tight">
                                    {service.title}
                                  </div>
                                  <div className="text-[10px] leading-snug opacity-70">
                                    {service.description.slice(0, 50)}...
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="h-px border-t border-dashed border-gray-200 bg-gray-200 dark:border-white/10 dark:bg-white/5" />

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                              Your Name
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-none border-b border-gray-300 bg-transparent py-2 font-mono text-sm text-gray-900 transition-colors focus:border-accent-teal focus:outline-none dark:border-white/20 dark:text-white"
                              placeholder="Jane Doe"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="w-full rounded-none border-b border-gray-300 bg-transparent py-2 font-mono text-sm text-gray-900 transition-colors focus:border-accent-teal focus:outline-none dark:border-white/20 dark:text-white"
                              placeholder="jane@example.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                              Company / Organization
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-none border-b border-gray-300 bg-transparent py-2 font-mono text-sm text-gray-900 transition-colors focus:border-accent-teal focus:outline-none dark:border-white/20 dark:text-white"
                              placeholder="Acme Corp (Optional)"
                              value={formData.company}
                              onChange={(e) =>
                                setFormData({ ...formData, company: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-gray-500">
                            <span>Operational Brief</span>
                            <button
                              type="button"
                              className="cursor-pointer text-accent-teal hover:underline"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  description:
                                    TEMPLATES[selectedServiceId] ?? TEMPLATES.default,
                                })
                              }
                            >
                              Reset Template
                            </button>
                          </label>
                          <textarea
                            className="h-48 w-full resize-none rounded-none border border-gray-300 bg-gray-50 p-4 font-mono text-sm leading-relaxed text-gray-900 transition-colors focus:border-accent-teal focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({ ...formData, description: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full min-h-[400px] w-full border border-gray-200 bg-white p-1 dark:border-white/10">
                      <iframe
                        src="https://cal.com/ankeeth/30min?embed=true"
                        className="h-full w-full"
                        frameBorder="0"
                        title="Book a call"
                      />
                    </div>
                  )}
                </div>

                <div className="z-20 shrink-0 border-t border-gray-200 bg-gray-50/50 p-4 dark:border-white/10 dark:bg-black/20 md:p-6">
                  <div className="flex justify-end">
                    {step === 1 ? (
                      <TechButton
                        variant="primary"
                        onClick={handleNext}
                        disabled={
                          !formData.name || !formData.email || !formData.description
                        }
                        className="w-full md:w-auto"
                      >
                        Initiate_Sequence <ArrowRight size={14} />
                      </TechButton>
                    ) : (
                      <TechButton
                        variant="accent"
                        onClick={close}
                        className="w-full md:w-auto"
                      >
                        Protocol_Complete <CheckCircle size={14} />
                      </TechButton>
                    )}
                  </div>
                </div>
              </div>
            </Panel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
