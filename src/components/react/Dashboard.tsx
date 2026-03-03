import React, { useState, useEffect, useId } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  GripVertical,
  Target,
  Cpu,
  Zap,
  GitCommit,
  Activity,
  Terminal,
  ChevronRight,
  Feather,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
  defaultDropAnimationSideEffects,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAtom, useSetAtom } from "jotai";

import Panel from "./Panel";
import TechButton from "./TechButton";
import BracketLink from "./BracketLink";
import { SERVICES_DATA, WRITINGS_DATA } from "../../constants";
import {
  dashboardLayoutAtom,
  DEFAULT_DASHBOARD_LAYOUT,
  projectModalOpenAtom,
  projectModalIntentAtom,
} from "../../store/atoms";

// --- Sortable Item Wrapper ---
interface SortablePanelProps {
  id: string;
  colSpan: string;
  children: (dragHandleProps: React.ReactNode) => React.ReactNode;
}

const SortablePanel: React.FC<SortablePanelProps> = ({
  id,
  colSpan,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const DragHandle = (
    <div
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-accent-teal transition-colors p-1 -ml-1 outline-none"
    >
      <GripVertical size={14} />
    </div>
  );

  return (
    <div ref={setNodeRef} style={style} className={`${colSpan} h-full`}>
      {children(DragHandle)}
    </div>
  );
};

// --- Panel Content Components ---

const MissionControlContent = ({
  dragHandle,
}: { dragHandle: React.ReactNode }) => {
  const setProjectModalOpen = useSetAtom(projectModalOpenAtom);
  const setProjectModalIntent = useSetAtom(projectModalIntentAtom);

  const handleHireMe = () => {
    setProjectModalIntent("s2");
    setProjectModalOpen(true);
  };

  return (
    <Panel
      title="MISSION_CONTROL // OVERVIEW"
      subtitle="STATUS: OPERATIONAL"
      className="h-full min-h-[320px]"
      dragHandle={dragHandle}
      action={
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
          <span className="text-[10px] text-accent-green font-mono">LIVE</span>
        </div>
      }
    >
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-mono font-medium text-gray-900 dark:text-white tracking-tight mb-3">
              Building the <span className="text-accent-teal">Intelligent System</span>{" "}
              for the AI-native future.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed text-sm">
              I am Ankeeth Suvarna. Founder of{" "}
              <strong className="text-gray-900 dark:text-white">
                The AI Leverage
              </strong>{" "}
              and an Agentic Engineer. I help businesses build next-gen AI solutions
              and train engineering teams to ship production code{" "}
              <span className="text-accent-orange font-mono">10x faster</span> using
              agentic workflows.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Target size={10} />
              <span>Systems_Thinker</span>
            </div>
            <div className="px-2 py-1 bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Cpu size={10} />
              <span>Agentic_Engineer</span>
            </div>
            <div className="px-2 py-1 bg-accent-orange/10 border border-accent-orange/20 text-accent-orange text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={10} />
              <span>MMA_Athlete</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-dashed border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center gap-4">
          <TechButton variant="primary" onClick={handleHireMe}>
            Hire_Me <ArrowRight size={14} />
          </TechButton>
          <div className="flex items-center gap-4">
            <BracketLink href="https://linkedin.com/in/ankeethysuvarna">
              LinkedIn
            </BracketLink>
            <BracketLink href="https://twitter.com/imankeeth">X / Twitter</BracketLink>
          </div>
        </div>
      </div>
    </Panel>
  );
};

const ServicesModuleContent = ({
  dragHandle,
}: { dragHandle: React.ReactNode }) => {
  const setProjectModalOpen = useSetAtom(projectModalOpenAtom);
  const setProjectModalIntent = useSetAtom(projectModalIntentAtom);

  const handleBookClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setProjectModalIntent(id);
    setProjectModalOpen(true);
  };

  return (
    <Panel
      title="CORE_SERVICES"
      subtitle="OPERATIONAL_CAPABILITIES"
      className="h-full min-h-[320px]"
      dragHandle={dragHandle}
      action={<Terminal size={14} className="text-accent-teal" />}
      noPadding
    >
      <div className="divide-y divide-gray-200 dark:divide-white/5 h-full flex flex-col">
        {SERVICES_DATA.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="flex w-full text-left transition-colors group hover:bg-black/5 dark:hover:bg-white/5"
            >
              {/* Main Service Area - Click to Route */}
              <a
                href={service.path}
                className="flex-1 p-4 outline-none text-left min-w-0 no-underline"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-sm text-gray-500 group-hover:text-accent-teal transition-colors shrink-0">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2 group-hover:text-accent-teal transition-colors truncate">
                      {service.title}
                      <ChevronRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 -ml-1 transition-all group-hover:translate-x-1"
                      />
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mb-2 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] text-gray-400 font-mono bg-gray-100 dark:bg-white/5 px-1 py-0.5 rounded-xs whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>

              {/* Side Action - Click to Book */}
              <div className="flex items-center px-4 shrink-0">
                <BracketLink
                  onClick={(e) => handleBookClick(e as React.MouseEvent, service.id)}
                  className="text-[10px] text-accent-teal"
                >
                  BOOK
                </BracketLink>
              </div>
            </div>
          );
        })}

        <div className="mt-auto border-t border-gray-200 dark:border-white/5">
          <a
            href="https://cal.com/ankeeth/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-accent-teal/5 text-center hover:bg-accent-teal/10 transition-colors"
          >
            <span className="text-[10px] font-mono text-accent-teal font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              Available for Q1 2026 bookings <ArrowUpRight size={10} />
            </span>
          </a>
        </div>
      </div>
    </Panel>
  );
};

const QuestLogContent = ({ dragHandle }: { dragHandle: React.ReactNode }) => (
  <Panel
    title="ACTIVE_QUEST"
    subtitle="PRIMARY_OBJECTIVE"
    className="h-full min-h-[240px]"
    dragHandle={dragHandle}
    action={<Target size={14} className="text-accent-orange" />}
  >
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="text-2xl lg:text-3xl font-mono font-light text-gray-300 dark:text-gray-600 mb-4 select-none">
          "The Intelligent System"
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          My current goal is to build the primitives that enable a perfect
          human-agent interface. Moving beyond the Operating System to an{" "}
          <strong className="text-accent-teal font-normal">Intelligent System</strong>{" "}
          that is proactive, context-aware, and executes complex tasks autonomously.
        </p>
        <div className="p-3 bg-accent-teal/5 border border-accent-teal/10 rounded-sm">
          <p className="text-xs text-accent-teal font-mono">
            &gt; Target: Enable 100x productivity for developers through custom
            home-built coding agents.
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
        <span className="flex items-center gap-1">
          <GitCommit size={10} /> Spec-Driven_Dev
        </span>
        <span className="flex items-center gap-1">
          <Activity size={10} /> Context_Optimization
        </span>
      </div>
    </div>
  </Panel>
);

const RecentWritingsContent = ({
  dragHandle,
}: { dragHandle: React.ReactNode }) => {
  return (
    <Panel
      title="TRANSMISSIONS"
      subtitle="RECENT_WRITINGS"
      className="h-full min-h-[320px]"
      dragHandle={dragHandle}
      action={<Feather size={14} className="text-gray-400" />}
      noPadding
    >
      <div className="divide-y divide-gray-200 dark:divide-white/5 h-full flex flex-col">
        {WRITINGS_DATA.slice(0, 10).map((post) => (
          <a
            key={post.id}
            href={post.path}
            className="p-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group cursor-pointer no-underline block"
          >
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h4 className="text-xs font-bold font-mono text-gray-800 dark:text-gray-200 group-hover:text-accent-teal transition-colors truncate">
                {post.title}
              </h4>
              <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap">
                {post.date}
              </span>
            </div>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-1 rounded-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </a>
        ))}
        <div className="mt-auto p-3 text-center border-t border-gray-200 dark:border-white/5">
          <BracketLink href="/writings">VIEW_ALL_ARCHIVES</BracketLink>
        </div>
      </div>
    </Panel>
  );
};

// --- Configuration ---

const PANEL_CONFIG: Record<
  string,
  { colSpan: string; component: React.FC<{ dragHandle: React.ReactNode }> }
> = {
  "mission-control": {
    colSpan: "md:col-span-12 lg:col-span-8",
    component: MissionControlContent,
  },
  "quest-log": {
    colSpan: "md:col-span-12 lg:col-span-4",
    component: QuestLogContent,
  },
  "services-module": {
    colSpan: "md:col-span-12 lg:col-span-6",
    component: ServicesModuleContent,
  },
  "recent-writings": {
    colSpan: "md:col-span-12 lg:col-span-6",
    component: RecentWritingsContent,
  },
};

const Dashboard: React.FC = () => {
  const [layout, setLayout] = useAtom(dashboardLayoutAtom);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Use a stable ID for DndContext to prevent hydration mismatch
  const dndContextId = useId();

  // Prevent hydration mismatch by only rendering DndContext after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback if local storage has stale keys (safety check)
  useEffect(() => {
    const hasInvalidKeys = layout.some((key) => !PANEL_CONFIG[key]);
    if (hasInvalidKeys || layout.length === 0) {
      setLayout(DEFAULT_DASHBOARD_LAYOUT);
    }
  }, [layout, setLayout]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = layout.indexOf(active.id as string);
      const newIndex = layout.indexOf(over.id as string);
      setLayout(arrayMove(layout, oldIndex, newIndex));
    }
    setActiveId(null);
  };

  const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.4",
        },
      },
    }),
  };

  // Render static layout during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-20 min-h-screen content-start">
        {DEFAULT_DASHBOARD_LAYOUT.map((key) => {
          const config = PANEL_CONFIG[key];
          if (!config) return null;
          return (
            <div key={key} className={`${config.colSpan} h-full`}>
              <config.component dragHandle={
                <div className="text-gray-400 p-1 -ml-1">
                  <GripVertical size={14} />
                </div>
              } />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <DndContext
      id={dndContextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={layout} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-20 min-h-screen content-start">
          {layout.map((key) => {
            const config = PANEL_CONFIG[key];
            if (!config) return null;
            return (
              <SortablePanel key={key} id={key} colSpan={config.colSpan}>
                {(dragHandle) => <config.component dragHandle={dragHandle} />}
              </SortablePanel>
            );
          })}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeId && PANEL_CONFIG[activeId as string] ? (
          <div className="h-full w-full cursor-grabbing shadow-2xl scale-[1.02] rounded-sm overflow-hidden bg-surface-light dark:bg-surface">
            {React.createElement(PANEL_CONFIG[activeId as string].component, {
              dragHandle: (
                <div className="text-accent-teal p-1 -ml-1">
                  <GripVertical size={14} />
                </div>
              ),
            })}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Dashboard;
