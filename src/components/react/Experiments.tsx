import React, { useState } from "react";
import Panel from "./Panel";
import { EXPERIMENTS_DATA } from "../../constants";
import {
  ArrowRight,
  GitFork,
  Star,
  Circle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TechButton from "./TechButton";

const ITEMS_PER_PAGE = 6;

const Experiments: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(EXPERIMENTS_DATA.length / ITEMS_PER_PAGE);

  const currentExperiments = EXPERIMENTS_DATA.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1920px] w-full mx-auto pb-20">
      {/* Header Panel */}
      <Panel
        title="R&D_LAB"
        subtitle="ACTIVE_PROTOTYPES"
        className="mb-4 bg-surface-light dark:bg-surface"
      >
        <div className="p-4 md:p-6">
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-4">
            Experiments & <span className="text-accent-blue">Dev Tools</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed text-sm">
            A collection of proofs-of-concept, developer tools, and open-source
            contributions. Most of these are built to test specific hypotheses about
            AI-native workflows and agentic interfaces.
            <br />
            <br />
            <span className="text-xs font-mono text-accent-orange opacity-80">
              &gt; Warning: Some projects are unstable prototypes. Use with caution.
            </span>
          </p>
        </div>
      </Panel>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {currentExperiments.map((exp) => {
          const Icon = exp.icon;
          return (
            <a
              key={exp.id}
              href={exp.path}
              className="group relative flex flex-col no-underline"
            >
              <Panel
                title={`MODULE: ${exp.title}`}
                subtitle={exp.version}
                className="h-full cursor-pointer hover:border-accent-teal/50 transition-colors bg-surface-light dark:bg-surface hover:shadow-2xl"
                action={
                  <Icon
                    size={14}
                    className="text-gray-400 group-hover:text-accent-teal transition-colors"
                  />
                }
                noPadding
              >
                <div className="flex flex-col h-full p-5">
                  {/* Status Pill */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-xs border text-[10px] font-mono uppercase tracking-wider
                        ${
                          exp.status === "Stable"
                            ? "border-accent-green/30 bg-accent-green/10 text-accent-green"
                            : exp.status === "Beta"
                              ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
                              : exp.status === "Archived"
                                ? "border-gray-500/30 bg-gray-500/10 text-gray-500"
                                : "border-accent-orange/30 bg-accent-orange/10 text-accent-orange"
                        }
                      `}
                    >
                      <Circle size={6} fill="currentColor" />
                      {exp.status}
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                      <Clock size={10} /> {exp.date}
                    </span>
                  </div>

                  <div className="mb-6 flex-1">
                    <h3 className="text-xl font-bold font-mono text-gray-900 dark:text-white mb-1 group-hover:text-accent-teal transition-colors">
                      {exp.title}
                    </h3>
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide opacity-80">
                      {exp.subtitle}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-mono text-gray-500 dark:text-gray-400 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                      <div className="flex gap-4">
                        {exp.githubUrl && (
                          <GitFork
                            size={14}
                            className="text-gray-400 hover:text-white transition-colors"
                          />
                        )}
                        {exp.demoUrl && (
                          <Star
                            size={14}
                            className="text-gray-400 hover:text-white transition-colors"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-gray-900 dark:text-white group-hover:text-accent-teal transition-colors">
                        INITIALIZE <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            </a>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-surface-light dark:bg-surface border border-border-subtle-light dark:border-border-subtle p-4">
          <TechButton
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft size={14} /> Previous
          </TechButton>

          <span className="text-xs font-mono text-gray-500">
            PAGE {currentPage} OF {totalPages}
          </span>

          <TechButton
            variant="ghost"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next <ChevronRight size={14} />
          </TechButton>
        </div>
      )}
    </div>
  );
};

export default Experiments;
