import React, { useState, useEffect } from "react";
import Panel from "./Panel";
import { WRITINGS_DATA } from "../../constants";
import {
  ArrowRight,
  Search,
  Calendar,
  AudioLines,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TechButton from "./TechButton";

const ITEMS_PER_PAGE = 6;

const WritingIndex: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = WRITINGS_DATA.filter(
    (post) =>
      post.title.toLowerCase().includes(filter.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const currentPosts = filteredPosts.slice(
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
        title="TRANSMISSIONS"
        subtitle="KNOWLEDGE_BASE"
        className="mb-4 bg-surface-light dark:bg-surface"
      >
        <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-4">
              Engineering <span className="text-accent-teal">Logs</span> & Thoughts
            </h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              A collection of essays, technical deep-dives, and mental models on
              Agentic Engineering, Systems Thinking, and the future of software.
            </p>
          </div>

          {/* Search/Filter */}
          <div className="w-full md:w-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={14} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="FILTER_LOGS..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-xs font-mono text-gray-900 dark:text-white focus:border-accent-teal focus:outline-none transition-colors rounded-sm uppercase placeholder-gray-500"
            />
          </div>
        </div>
      </Panel>

      {/* Grid of Writings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {currentPosts.map((post) => (
          <a key={post.id} href={post.path} className="group cursor-pointer h-full no-underline block">
            <Panel
              title={`LOG: ${post.id}`}
              subtitle={post.date}
              className="h-full hover:border-accent-teal/50 transition-all duration-300 hover:-translate-y-1 bg-surface-light dark:bg-surface"
              noPadding
              action={
                post.hasAudio ? (
                  <AudioLines size={14} className="text-accent-orange animate-pulse" />
                ) : null
              }
            >
              <div className="flex flex-col h-full">
                {/* Cover Image Area */}
                <div className="relative aspect-[2/1] overflow-hidden border-b border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-black/20">
                  {post.coverImage ? (
                    <>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-accent-teal/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="text-gray-300 dark:text-white/10" size={48} strokeWidth={1} />
                    </div>
                  )}

                  {/* Overlay Badge */}
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-black/60 text-white text-[9px] font-mono uppercase backdrop-blur-sm border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold font-mono text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-accent-teal transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-200 dark:border-white/5 border-dashed">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={10} /> {post.date}
                    </span>
                    <div className="text-xs font-bold font-mono text-gray-900 dark:text-white group-hover:text-accent-teal transition-colors flex items-center gap-1">
                      ACCESS{" "}
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </a>
        ))}
      </div>

      {filteredPosts.length > ITEMS_PER_PAGE && (
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

      {filteredPosts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-sm font-mono text-gray-400">
            No transmissions found matching filter criteria.
          </p>
          <button
            type="button"
            onClick={() => setFilter("")}
            className="mt-4 text-accent-teal text-xs font-mono hover:underline uppercase"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default WritingIndex;
