import React from "react";
import Panel from "./Panel";
import { SERVICES_DATA } from "../../constants";
import { ArrowRight, Zap } from "lucide-react";
import TechButton from "./TechButton";
import { useSetAtom } from "jotai";
import { projectModalOpenAtom, projectModalIntentAtom } from "../../store/atoms";

const ServicesIndex: React.FC = () => {
  const setProjectModalOpen = useSetAtom(projectModalOpenAtom);
  const setProjectModalIntent = useSetAtom(projectModalIntentAtom);

  const handleBook = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setProjectModalIntent(id);
    setProjectModalOpen(true);
  };

  return (
    <div className="max-w-[1920px] w-full mx-auto pb-20">
      {/* Header Panel */}
      <Panel
        title="SERVICES_MODULE"
        subtitle="OPERATIONAL_CAPABILITIES"
        className="mb-4 bg-surface-light dark:bg-surface"
      >
        <div className="p-4 md:p-6">
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-4">
            Deploying <span className="text-accent-teal">Intelligence</span> At Scale
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed text-sm">
            Specialized engagement protocols for businesses ready to transition from
            AI hype to AI utility. Whether you need to upskill your team, build a
            custom agent, or audit your architecture.
          </p>
        </div>
      </Panel>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {SERVICES_DATA.map((service) => {
          const Icon = service.icon;
          return (
            <a
              key={service.id}
              href={service.path}
              className="group relative flex flex-col h-full no-underline"
            >
              <Panel
                title={`PROTOCOL: ${service.id.toUpperCase()}`}
                subtitle="AVAILABLE"
                className="h-full cursor-pointer hover:border-accent-teal/50 transition-all bg-surface-light dark:bg-surface hover:shadow-2xl hover:-translate-y-1"
                action={
                  <Icon
                    size={14}
                    className="text-gray-400 group-hover:text-accent-teal transition-colors"
                  />
                }
                noPadding
              >
                <div className="flex flex-col h-full p-6">
                  <div className="w-12 h-12 rounded-sm bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-6 text-gray-700 dark:text-gray-300 group-hover:text-accent-teal group-hover:border-accent-teal/30 transition-all">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  <div className="mb-6 flex-1">
                    <h3 className="text-xl font-bold font-mono text-gray-900 dark:text-white mb-3 group-hover:text-accent-teal transition-colors uppercase">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-mono text-gray-500 dark:text-gray-400 rounded-sm uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-gray-900 dark:text-white group-hover:text-accent-teal transition-colors flex items-center gap-2">
                      VIEW_DETAILS <ArrowRight size={12} />
                    </span>
                    <TechButton
                      variant="ghost"
                      onClick={(e) => handleBook(e, service.id)}
                      className="text-[10px] h-8"
                    >
                      Book_Now
                    </TechButton>
                  </div>
                </div>
              </Panel>
            </a>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <Panel
        title="CUSTOM_ENGAGEMENT"
        className="bg-gradient-to-r from-surface-light to-white dark:from-surface dark:to-black/20"
      >
        <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-mono font-bold text-gray-900 dark:text-white mb-2">
              Need something else?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Open to fractional leadership roles and advisory board positions.
            </p>
          </div>
          <TechButton
            variant="primary"
            onClick={() => {
              setProjectModalIntent(null);
              setProjectModalOpen(true);
            }}
          >
            Contact_Me <Zap size={14} />
          </TechButton>
        </div>
      </Panel>
    </div>
  );
};

export default ServicesIndex;
