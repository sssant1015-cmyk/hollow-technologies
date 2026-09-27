export interface RoadmapItem {
  id: string;
  title: string;
  detail: string;
  phase: 'now' | 'next' | 'later' | 'experimental';
  project?: string; // project id
}

export const ROADMAP: RoadmapItem[] = [
  // NOW
  { id: 'r1', phase: 'now', project: 'hollowlink', title: 'HollowLink daily use & hardening', detail: 'Running live with the friend group; polishing real-world rough edges, performance and reliability.' },
  { id: 'r2', phase: 'now', project: 'nix', title: 'Nix core workflows', detail: 'Strengthening code understanding, editing and project search — the daily-driver capabilities.' },
  { id: 'r3', phase: 'now', project: 'rafael', title: 'Rafael architecture design', detail: 'Defining the capability registry and intent-routing model that the rest of the ecosystem will register with.' },
  { id: 'r4', phase: 'now', project: 'hollowlink', title: 'First real extension', detail: 'Proving the extension ecosystem with a genuinely useful extension beyond the demos.' },

  // NEXT
  { id: 'r5', phase: 'next', project: 'nix', title: 'Nix testing & git workflows', detail: 'Test-running with failure reasoning, history inspection and draft commits.' },
  { id: 'r6', phase: 'next', project: 'rafael', title: 'Rafael first prototype', detail: 'A minimal core that can register two systems and route one task end-to-end.' },
  { id: 'r7', phase: 'next', project: 'forge', title: 'Forge blueprint format', detail: 'A versioned, reviewable blueprint artifact that Nix can execute against.' },
  { id: 'r8', phase: 'next', project: 'hollowlink', title: 'Deployment story', detail: 'A one-command deployment path so any friend group can self-host HollowLink.' },

  // LATER
  { id: 'r9', phase: 'later', project: 'atlas', title: 'Atlas adaptive scheduling', detail: 'Calendar-first life planning that re-plans when reality changes.' },
  { id: 'r10', phase: 'later', project: 'nova', title: 'Nova knowledge store', detail: 'A durable, searchable memory of everything the ecosystem learns.' },
  { id: 'r11', phase: 'later', project: 'sovereign', title: 'Sovereign inbox concepts', detail: 'Structured business communication with draft-first automation.' },
  { id: 'r12', phase: 'later', title: 'Ecosystem federation', detail: 'Hollow systems discovering each other across machines, not just processes.' },

  // EXPERIMENTAL
  { id: 'r13', phase: 'experimental', project: 'iris', title: 'Iris analysis workspaces', detail: 'Exploring structured market research and scenario tooling — decision support, never decisions.' },
  { id: 'r14', phase: 'experimental', title: 'Hollow Labs incubation', detail: 'A track for Labs experiments that earn their way into real systems.' },
  { id: 'r15', phase: 'experimental', project: 'sentinel', title: 'Sentinel defensive concepts', detail: 'Privacy-respecting security monitoring designs for the ecosystem.' },
];

export const PHASES: { id: RoadmapItem['phase']; label: string; blurb: string }[] = [
  { id: 'now', label: 'Now', blurb: 'In active development' },
  { id: 'next', label: 'Next', blurb: 'Near-term development' },
  { id: 'later', label: 'Later', blurb: 'Longer-term ideas' },
  { id: 'experimental', label: 'Experimental', blurb: 'Concepts under investigation' },
];
