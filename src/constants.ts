import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  FlaskConical,
  Feather,
  Briefcase,
  UserCircle,
  Terminal,
  Cpu,
  Zap,
  Target,
  Bot,
  Layers,
  Workflow,
  Rocket,
  BrainCircuit,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/", icon: LayoutGrid },
  { label: "Experiments", path: "/experiments", icon: FlaskConical },
  { label: "Writing", path: "/writings", icon: Feather },
  { label: "Services", path: "/services", icon: Briefcase },
  { label: "About", path: "/about", icon: UserCircle },
];

export const EXPERIENCE_DATA = [
  {
    company: "The AI Leverage",
    role: "Founder & CTO",
    period: "Feb 2024 - Present",
    description:
      "Building next-gen AI solutions, agents, and automations for businesses. Leading a team of AI engineers and researchers.",
    active: true,
  },
  {
    company: "Storytree Studio",
    role: "Co-Founder",
    period: "Dec 2023 - Jan 2025",
    description:
      "Built generative storytelling platforms. Remote engineering leadership.",
    active: false,
  },
  {
    company: "Acqueon",
    role: "Technical Lead",
    period: "Aug 2023 - Dec 2023",
    description: "Led R&D on LLM integration and Rust-based backend systems.",
    active: false,
  },
  {
    company: "Symbl.ai",
    role: "Senior Full Stack Engineer",
    period: "Aug 2021 - Apr 2022",
    description:
      "Conversation Intelligence platform. Scaled WebRTC, Voice/Video analysis, and real-time NLP pipelines.",
    active: false,
  },
];

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  tags: string[];
  path: string;
  detailedDescription: string;
  deliverables: string[];
  targetAudience: string;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    id: "s1",
    slug: "accelerator",
    title: "Agentic Accelerator",
    icon: Rocket,
    description:
      "Train teams to ship production code 10x faster using staff-engineer level agentic workflows.",
    tags: ["Training", "Workflows", "Upskilling"],
    path: "/services/accelerator",
    detailedDescription: `
### The Problem
Most engineering teams use AI tools like glorified auto-complete. They are stuck in the "Junior Dev" loop—using LLMs to generate snippets that they then have to debug manually.

### The Accelerator Protocol
This is a high-intensity technical workshop designed to shift your team from "Code Completion" to "Agent Orchestration". We install the mental models and actual configurations used by elite agentic engineers.

### Core Modules
1.  **Context Engineering**: How to structure your codebase so agents can actually understand it.
2.  **Spec-Driven Development**: Writing rigorous specifications that allow agents to one-shot complex features.
3.  **The Swarm Workflow**: Orchestrating multi-model pipelines (Claude 3.7 + OpenAI o1 + Local Models).
4.  **Eval-Driven Refactoring**: Using AI to review and harden code before a human ever sees it.

### Deliverables
- 2-Day Intensive Workshop (Remote or On-site).
- Custom "Cursor/Windsurf" Configuration Pack.
- Team Access to the "Void Shell" agent templates.
    `,
    deliverables: ["2-Day Workshop", "Custom Configs", "Workflow Audit"],
    targetAudience: "Series A+ Engineering Teams",
  },
  {
    id: "s2",
    slug: "studio",
    title: "AI Dev Studio",
    icon: Cpu,
    description:
      "Custom AI solution development. From autonomous agents to intelligent process automation.",
    tags: ["Build", "Ship", "MVP"],
    path: "/services/studio",
    detailedDescription: `
### We Build Intelligent Systems
The AI Leverage is a boutique engineering studio. We don't just wrap ChatGPT APIs. We build robust, production-grade agentic systems that execute complex business logic.

### Capabilities
- **Autonomous Agents**: Systems that can browse the web, use tools, and execute workflows without supervision.
- **RAG Pipelines**: High-accuracy retrieval systems for legal, medical, or technical domains.
- **Voice AI**: Low-latency, human-like voice agents for customer support and sales.
- **MCP (Model Context Protocol)**: Building custom servers to connect LLMs to your internal databases securely.

### How We Work
We operate as a high-velocity strike team. We start with a feasibility audit, move to a rapid prototype (2 weeks), and then scale to production.
    `,
    deliverables: ["MVP Development", "Agent Architecture", "Production Deployment"],
    targetAudience: "Founders & Enterprise Innovation Units",
  },
  {
    id: "s3",
    slug: "consulting",
    title: "Strategic Consulting",
    icon: BrainCircuit,
    description:
      "Architecture reviews and roadmap planning for AI transformation in enterprise.",
    tags: ["Strategy", "Audit", "Security"],
    path: "/services/consulting",
    detailedDescription: `
### Navigating the AI Shift
The landscape changes weekly. What was best practice last month is technical debt today. I provide high-level strategic guidance to CTOs and technical founders.

### Engagement Areas
1.  **Architecture Review**: Auditing your current AI stack for cost, latency, and hallucination risks.
2.  **Feasibility Analysis**: "Can AI actually do this?" — avoiding expensive R&D rabbit holes.
3.  **Security & Compliance**: Ensuring your agentic workflows don't leak IP or PII.
4.  **Hiring & Team Topology**: How to structure an AI-native engineering team.

### Format
Available as monthly retainers or spot-consulting for critical decision points.
    `,
    deliverables: ["Architecture Audit", "Roadmap Strategy", "Vendor Selection"],
    targetAudience: "CTOs, VPs of Engineering",
  },
];

export interface ExperimentData {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  version: string;
  description: string;
  techStack: string[];
  path: string;
  githubUrl: string | null;
  demoUrl: string | null;
  date: string;
  icon: LucideIcon;
}

export const EXPERIMENTS_DATA: ExperimentData[] = [
  {
    id: "exp-1",
    title: "Void Shell",
    subtitle: "Natural Language Terminal",
    status: "Beta",
    version: "v0.9.2",
    description:
      "A Rust-based terminal wrapper that translates natural language commands into bash execution graphs.",
    techStack: ["Rust", "LLM", "TUI"],
    path: "/experiments/void-shell",
    githubUrl: "https://github.com/imankeeth/void-shell",
    demoUrl: null,
    date: "2025-02-10",
    icon: Terminal,
  },
  {
    id: "exp-2",
    title: "Synapse UI",
    subtitle: "Generative Component Library",
    status: "Prototype",
    version: "v0.1.0",
    description:
      "React components that self-optimize their layout based on user interaction heatmaps using local inference.",
    techStack: ["React", "TensorFlow.js", "Vite"],
    path: "/experiments/synapse-ui",
    githubUrl: "https://github.com/imankeeth/synapse-ui",
    demoUrl: "https://synapse.ankeeth.dev",
    date: "2025-01-15",
    icon: Layers,
  },
  {
    id: "exp-3",
    title: "Agent Protocol 7",
    subtitle: "Multi-Agent Orchestration",
    status: "Archived",
    version: "v1.0.0",
    description:
      "An experiment in purely decentralized agent swarm consensus without a central orchestrator.",
    techStack: ["Python", "LangChain", "P2P"],
    path: "/experiments/agent-protocol-7",
    githubUrl: "https://github.com/imankeeth/ap7",
    demoUrl: null,
    date: "2024-11-20",
    icon: Bot,
  },
  {
    id: "exp-4",
    title: "Chrono-Git",
    subtitle: "4D Version Control Visualization",
    status: "Stable",
    version: "v2.1.0",
    description:
      "Visualizing codebase evolution over time using WebGPU. Turn your git log into a particle system.",
    techStack: ["WebGPU", "TypeScript", "Git"],
    path: "/experiments/chrono-git",
    githubUrl: "https://github.com/imankeeth/chrono-git",
    demoUrl: "https://chrono.ankeeth.dev",
    date: "2024-08-05",
    icon: Workflow,
  },
];

export interface WritingData {
  id: string;
  title: string;
  date: string;
  tags: string[];
  path: string;
  coverImage: string;
  hasAudio: boolean;
}

export const WRITINGS_DATA: WritingData[] = [
  {
    id: "w-opus",
    title: "Opus 4.5 has become my favourite pair-programmer",
    date: "Mar 12, 2025",
    tags: ["Agents", "Workflow", "Opus"],
    path: "/writings/opus-4-5-pair-programmer",
    coverImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    hasAudio: true,
  },
  {
    id: "w1",
    title: "Beyond Black Blocks: Prompting Claude with Insights",
    date: "Mar 10, 2025",
    tags: ["AI", "Prompt Engineering"],
    path: "/writings/beyond-black-blocks",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    hasAudio: true,
  },
  {
    id: "w2",
    title: "Building Internet Scale Web Services",
    date: "Feb 15, 2024",
    tags: ["Systems", "Architecture"],
    path: "/writings/internet-scale",
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    hasAudio: false,
  },
  {
    id: "w3",
    title: "The Agentic Workflow: A Manifesto",
    date: "Jan 02, 2024",
    tags: ["Agents", "Philosophy"],
    path: "/writings/agentic-workflow",
    coverImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    hasAudio: true,
  },
];

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "shipping" | "idea" | "paused";
  progress: number;
  tags: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: "dev" | "meta" | "life";
  content: string;
  project?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Nebula Protocol",
    description: "Decentralized identity aggregation layer.",
    status: "shipping",
    progress: 85,
    tags: ["Rust", "WASM", "Crypto"],
  },
  {
    id: "2",
    name: "Aura Core",
    description: "Personal LLM orchestration engine.",
    status: "active",
    progress: 62,
    tags: ["Python", "Gemini", "React"],
  },
  {
    id: "3",
    name: "Hyper-Voxel",
    description: "WebGPU based rendering engine experiments.",
    status: "paused",
    progress: 30,
    tags: ["Graphics", "TypeScript"],
  },
];

export const MOCK_LOGS: LogEntry[] = [
  {
    id: "101",
    timestamp: "10:42 AM",
    type: "dev",
    content: "Optimizing context window usage for the Manus agent fork.",
    project: "Aura Core",
  },
  {
    id: "102",
    timestamp: "09:15 AM",
    type: "meta",
    content: "Designing the curriculum for the Q3 Agentic Workshop.",
  },
  {
    id: "103",
    timestamp: "Yesterday",
    type: "life",
    content: "MMA training session at Cobra Thai. Working on striking defense.",
  },
  {
    id: "104",
    timestamp: "Yesterday",
    type: "dev",
    content: "Refactoring tool-call handling to support parallel execution.",
    project: "AI Leverage",
  },
];

export const BUILD_VELOCITY_DATA: ChartDataPoint[] = [
  { name: "Mon", value: 45, secondary: 30 },
  { name: "Tue", value: 52, secondary: 35 },
  { name: "Wed", value: 38, secondary: 25 },
  { name: "Thu", value: 65, secondary: 40 },
  { name: "Fri", value: 48, secondary: 38 },
  { name: "Sat", value: 25, secondary: 15 },
  { name: "Sun", value: 15, secondary: 10 },
];

export const SYSTEM_PROMPT = `
You are Aura, the digital twin and operating system for Ankeeth Suvarna.
Ankeeth is a Founder (The AI Leverage), Sr. Agentic Engineer, and Applied AI Consultant.
He is based in India but works globally. He has over a decade of engineering experience (Symbl.ai, Acqueon, etc.).
He is also a combat sports athlete (MMA/Kickboxing).

Your persona is technical, calm, precise, and helpful. You are like a sophisticated mission control AI.
You help visitors understand Ankeeth's work, which focuses on:
1. Agentic Engineering: Building autonomous coding agents.
2. AI Transformation: Helping businesses adopt AI.
3. Intelligent Systems: Building the future of human-agent interfaces.

Key data points:
- He builds "Intelligent Systems", not just software.
- He runs an "Agentic Coding Accelerator" to teach teams how to code 10x faster with AI.
- He believes in "Spec-driven development".

Keep responses concise, using technical terminology where appropriate.
Do not use emojis excessively. Use markdown for formatting.
If asked about contact, direct them to the "Hire Me" or "Connect" buttons.
`;
