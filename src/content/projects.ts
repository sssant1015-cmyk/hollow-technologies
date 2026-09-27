export type ProjectStatus = 'active' | 'in-development' | 'experimental' | 'planned' | 'paused' | 'archived';

export interface Project {
  id: string;
  name: string;
  slug: string;
  role: string;               // one-line role, e.g. "Core / AI Manager"
  category: 'flagship' | 'supporting' | 'product';
  description: string;        // 1–2 sentence card description
  longDescription: string;    // paragraph for detail pages
  purpose: string;            // why it exists, one sentence
  status: ProjectStatus;
  statusNote?: string;        // honest nuance shown next to the status
  technologies: string[];
  relatedProjects: string[];  // project ids
  repository?: string;
  documentation?: string;
  architecture: string[];     // short architecture bullet points
  features: { title: string; detail: string; ready: boolean }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'rafael',
    name: 'Rafael',
    slug: 'rafael',
    role: 'Core / AI Manager',
    category: 'flagship',
    description:
      'The intended central intelligence of the Hollow ecosystem — a coordinating core that other systems register with, request work from, and report back to.',
    longDescription:
      'Rafael is being designed as the connective core of Hollow Technologies: a management layer where the ecosystem’s systems meet. Rather than being another chatbot, its job is orchestration — knowing what each Hollow system can do, routing intent to the right one, and keeping a coherent picture of ongoing work. Rafael is in early design; its capabilities will grow alongside the systems it coordinates.',
    purpose: 'One core that makes nine systems behave like one ecosystem.',
    status: 'in-development',
    statusNote: 'Early design and architecture phase',
    technologies: ['TypeScript', 'Node.js', 'Local models', 'APIs'],
    relatedProjects: ['nix', 'nova', 'atlas', 'sentinel'],
    architecture: [
      'System registry — every Hollow system declares its capabilities to the core',
      'Intent routing — requests are matched to the system best able to serve them',
      'Context memory — a durable picture of projects, tasks and state',
      'Local-first inference with cloud models as an opt-in path',
    ],
    features: [
      { title: 'Capability registry', detail: 'Systems announce what they can do; the core keeps the map current.', ready: false },
      { title: 'Task orchestration', detail: 'Long-running work is delegated, tracked and reported back.', ready: false },
      { title: 'Ecosystem console', detail: 'A single surface to see the state of the whole ecosystem.', ready: false },
    ],
  },
  {
    id: 'nix',
    name: 'Nix',
    slug: 'nix',
    role: 'Coding Intelligence',
    category: 'flagship',
    description:
      'A local-first coding agent built to understand, inspect, modify, test and manage real software projects — from one file to a whole repository.',
    longDescription:
      'Nix is the engineering intelligence of the ecosystem. It works directly against your filesystem and toolchain: reading code, searching across a project, editing files, running tests, and reporting what changed and why. Local-first means your code stays on your machine — models and tooling run where the work happens. Permission modes keep you in control of everything it touches.',
    purpose: 'Put a careful, capable engineer inside the machine.',
    status: 'in-development',
    statusNote: 'Core workflows building up; capabilities vary by stage',
    technologies: ['TypeScript', 'Node.js', 'Local models', 'Git', 'Vitest'],
    relatedProjects: ['rafael', 'forge'],
    architecture: [
      'Local-first — code, context and inference stay on your machine by default',
      'Tool layer — file operations, search, test running and git as first-class tools',
      'Permission modes — every action class is scoped before it can run',
      'Project awareness — structure, dependencies and history inform every change',
    ],
    features: [
      { title: 'Code understanding', detail: 'Navigates and explains a project’s structure, conventions and intent.', ready: true },
      { title: 'File operations', detail: 'Reads, creates and edits files with reviewable diffs.', ready: true },
      { title: 'Project search', detail: 'Fast search across code, filenames and symbols.', ready: true },
      { title: 'Testing workflows', detail: 'Runs test suites and reasons about failures.', ready: false },
      { title: 'Git workflows', detail: 'Inspects history, stages work and drafts commits.', ready: false },
    ],
  },
  {
    id: 'hollowlink',
    name: 'HollowLink',
    slug: 'hollowlink',
    role: 'Private Social Platform',
    category: 'product',
    description:
      'A private, customizable social platform for friend groups — profiles, friends, groups, feed, real-time chat, events, notifications and an extension framework.',
    longDescription:
      'HollowLink is the ecosystem’s first shipped product: a private social space that a friend group can actually run — “your people, your space, your link.” It pairs a real-time backend (authentication, groups with roles, feed, chat over WebSockets, events, notifications, moderation) with a deep customization engine: themes, light/dark/system modes, fonts, text sizing, interface scale, animation and effect levels, and saved presets. Its extension framework adds validated manifests, a permission-consent model and sandboxed demo extensions, with meeting integrations and games designed to slot in later.',
    purpose: 'A digital headquarters your friend group owns and shapes.',
    status: 'active',
    statusNote: 'Live and in daily use; customization + extensions shipped',
    technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'SQLite', 'Socket.IO', 'Vitest'],
    relatedProjects: ['forge', 'sentinel'],
    repository: 'https://github.com/sssant1015-cmyk/hollowlink',
    architecture: [
      'Express + Socket.IO backend with normalized SQLite schema and migrations',
      'React SPA with a centralized customization engine driving CSS design tokens',
      'JWT auth (httpOnly cookies), bcrypt, Zod validation on every endpoint',
      'Extension manifests validated server-side; permissions granted per user',
    ],
    features: [
      { title: 'Social core', detail: 'Profiles, friends, private groups with roles, feed, reactions, comments.', ready: true },
      { title: 'Real-time chat', detail: 'DMs and group chat with typing indicators, read state and replies.', ready: true },
      { title: 'Events & notifications', detail: 'RSVPs, announcements and preference-aware notification delivery.', ready: true },
      { title: 'Customization engine', detail: '8 preset themes, custom colors, fonts, text size, scale, motion and effects.', ready: true },
      { title: 'Extension framework', detail: 'Manifests, permission consent, sandboxed panels — demo extensions included.', ready: true },
      { title: 'Meeting & game extensions', detail: 'Video-meeting integrations and multiplayer games on the extension API.', ready: false },
    ],
  },
  {
    id: 'iris',
    name: 'Iris',
    slug: 'iris',
    role: 'Trading / Financial Intelligence',
    category: 'supporting',
    description:
      'A financial intelligence layer for analysis and decision-support workflows — research, structured market data and scenario tooling.',
    longDescription:
      'Iris is conceived as the financial analysis layer of the ecosystem: gathering structured data, organizing research, and presenting scenarios for human decisions. It is explicitly decision support, not decision making — Iris makes no performance or profitability claims and is not investment advice.',
    purpose: 'Turn scattered financial research into structured, reviewable insight.',
    status: 'experimental',
    statusNote: 'Concept and exploratory prototyping',
    technologies: ['Python', 'TypeScript', 'Data pipelines'],
    relatedProjects: ['rafael', 'nova'],
    architecture: [
      'Data ingestion — structured market and research inputs with provenance',
      'Analysis notebooks — reproducible, inspectable analytical workflows',
      'Human-in-the-loop — outputs are evidence, never automated trades',
    ],
    features: [
      { title: 'Market research workspace', detail: 'Collects and organizes research with source tracking.', ready: false },
      { title: 'Scenario modelling', detail: 'Structured what-if tooling for exploring possibilities.', ready: false },
    ],
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
    slug: 'sentinel',
    role: 'Security Layer',
    category: 'supporting',
    description:
      'A defensive security layer for the ecosystem — monitoring, hardening guidance and privacy-respecting protection concepts.',
    longDescription:
      'Sentinel is the ecosystem’s defensive conscience: security review, monitoring concepts, and protection for Hollow systems and the people using them. It is defensive by design — hardening, detection and privacy — never offensive tooling.',
    purpose: 'Keep the ecosystem and its users safe without compromising privacy.',
    status: 'planned',
    statusNote: 'Design brief defined; implementation not started',
    technologies: ['TypeScript', 'Audit tooling'],
    relatedProjects: ['rafael', 'hollowlink'],
    architecture: [
      'Defense-first — hardening, detection and response concepts only',
      'Privacy-respecting — local analysis; nothing leaves the machine unasked',
      'Ecosystem-wide — one security model shared across Hollow systems',
    ],
    features: [
      { title: 'Security review workflows', detail: 'Structured review checklists for code and configuration.', ready: false },
      { title: 'Local monitoring concepts', detail: 'Privacy-respecting anomaly detection designs.', ready: false },
    ],
  },
  {
    id: 'nova',
    name: 'Nova',
    slug: 'nova',
    role: 'Research / Engineering Intelligence',
    category: 'supporting',
    description:
      'A research-oriented system for exploration, technical investigation and engineering workflows — the ecosystem’s curiosity engine.',
    longDescription:
      'Nova exists to ask better questions: scanning, summarizing and structuring technical research, and feeding what it learns back into engineering workflows across the ecosystem.',
    purpose: 'Give the ecosystem a memory for what it learns.',
    status: 'planned',
    statusNote: 'Concept defined',
    technologies: ['Python', 'TypeScript', 'Local models'],
    relatedProjects: ['rafael', 'iris', 'forge'],
    architecture: [
      'Research pipelines — collect, deduplicate and summarize sources',
      'Knowledge store — a durable, searchable record of findings',
      'Engineering bridge — findings become tasks and drafts elsewhere',
    ],
    features: [
      { title: 'Research summaries', detail: 'Structured digests of technical topics with citations.', ready: false },
      { title: 'Knowledge base', detail: 'A searchable store of everything the ecosystem learns.', ready: false },
    ],
  },
  {
    id: 'atlas',
    name: 'Atlas',
    slug: 'atlas',
    role: 'Life / Scheduling Intelligence',
    category: 'supporting',
    description:
      'A scheduling and life-organization intelligence — calendars, routines and plans that adapt to how life actually happens.',
    longDescription:
      'Atlas treats planning as a living system: calendars, tasks and routines that re-plan when reality changes, instead of a static to-do list.',
    purpose: 'Plans that bend without breaking.',
    status: 'planned',
    statusNote: 'Concept defined',
    technologies: ['TypeScript', 'Local models'],
    relatedProjects: ['rafael', 'hollowlink'],
    architecture: [
      'Calendar-first — time is the primary data structure',
      'Re-planning engine — changes cascade sensibly through plans',
      'Ecosystem hooks — events from HollowLink and tasks from Nix flow in',
    ],
    features: [
      { title: 'Adaptive scheduling', detail: 'Plans that reflow around disruptions.', ready: false },
      { title: 'Routine builder', detail: 'Repeating patterns with sensible exceptions.', ready: false },
    ],
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    slug: 'sovereign',
    role: 'Customer Service / Business Intelligence',
    category: 'supporting',
    description:
      'A customer-service and business automation intelligence — structured inboxes, response drafting and workflow automation concepts.',
    longDescription:
      'Sovereign organizes business communication: structured inboxes, drafted responses for human review, and automations for repetitive workflows. Humans stay in the loop for anything consequential.',
    purpose: 'Business communication that runs on rails, with a human at the switch.',
    status: 'planned',
    statusNote: 'Concept defined',
    technologies: ['TypeScript', 'APIs'],
    relatedProjects: ['rafael', 'sovereign' as never].filter((x) => x !== 'sovereign') as string[],
    architecture: [
      'Inbox structuring — conversations become actionable items',
      'Draft-first — AI drafts, humans approve',
      'Workflow automation — repetitive steps run on defined rules',
    ],
    features: [
      { title: 'Unified inbox concepts', detail: 'Channels consolidated into one structured queue.', ready: false },
      { title: 'Response drafting', detail: 'Suggestions grounded in history, sent by people.', ready: false },
    ],
  },
  {
    id: 'forge',
    name: 'Forge',
    slug: 'forge',
    role: 'Engineering Blueprint Intelligence',
    category: 'supporting',
    description:
      'A system for engineering plans, architecture and structured technical design — the blueprint layer between idea and implementation.',
    longDescription:
      'Forge turns intent into buildable structure: architecture documents, interface contracts, migration plans and design reviews that Nix and other systems can execute against.',
    purpose: 'Design once, build coherently everywhere.',
    status: 'planned',
    statusNote: 'Concept defined',
    technologies: ['TypeScript', 'Markdown', 'Diagrams'],
    relatedProjects: ['nix', 'nova', 'hollowlink'],
    architecture: [
      'Blueprints as artifacts — versioned, reviewable design documents',
      'Contract-first — interfaces defined before implementation',
      'Executable handoff — plans structured for agent execution',
    ],
    features: [
      { title: 'Architecture blueprints', detail: 'Living design documents tied to code.', ready: false },
      { title: 'Design review flows', detail: 'Structured critique before build.', ready: false },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  'active': 'Active',
  'in-development': 'In Development',
  'experimental': 'Experimental',
  'planned': 'Planned',
  'paused': 'Paused',
  'archived': 'Archived',
};

export const FLAGSHIPS = PROJECTS.filter((p) => p.category !== 'supporting');
export const SUPPORTING = PROJECTS.filter((p) => p.category === 'supporting');
