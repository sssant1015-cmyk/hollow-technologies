export interface LabProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: 'interface' | 'ai' | 'tooling' | 'visual';
  stage: 'concept' | 'prototype' | 'exploration';
  origin: string; // honest note about where the idea came from
}

export const LABS: LabProject[] = [
  {
    id: 'signal-weave',
    name: 'Signal Weave',
    tagline: 'Energy that listens',
    description:
      'The interactive energy-field system behind this site’s hero — a canvas particle web where nodes react to the cursor like a living circuit. Built to explore how “alive” a page can feel at 60fps.',
    domain: 'visual',
    stage: 'prototype',
    origin: 'Grew out of building the Hollow Technologies hero; too interesting to keep in a drawer.',
  },
  {
    id: 'sigil-forge',
    name: 'Sigil Forge',
    tagline: 'A logo that is a system',
    description:
      'Parametric SVG generation of the Hollow dragon-sigil — one geometry, endless renditions: favicon, splash, watermark, app icon. Exploring whether a brand mark can be code.',
    domain: 'interface',
    stage: 'prototype',
    origin: 'Born from designing the Hollow Technologies identity itself.',
  },
  {
    id: 'void-radio',
    name: 'Void Radio',
    tagline: 'Ambient machine soundscapes',
    description:
      'Generative ambient audio built from system events — file changes, test runs, git commits become a quiet electronic soundscape of your workspace.',
    domain: 'ai',
    stage: 'concept',
    origin: 'A “what if the machine could hum” experiment from late-night build sessions.',
  },
  {
    id: 'glass-console',
    name: 'Glass Console',
    tagline: 'The terminal, reconsidered',
    description:
      'A concept for a local development console with layered glass UI, inline diffs and AI annotations — reimagining what a terminal looks like when intelligence is built in.',
    domain: 'tooling',
    stage: 'concept',
    origin: 'Sketches for what Nix’s interface could become.',
  },
  {
    id: 'echo-chamber',
    name: 'Echo Chamber',
    tagline: 'Debating models against each other',
    description:
      'Two local models argue opposite positions on a technical question while a third judges — an experiment in using disagreement to surface stronger answers.',
    domain: 'ai',
    stage: 'exploration',
    origin: 'An inquiry into whether structured disagreement beats single-model answers.',
  },
  {
    id: 'orbit-notes',
    name: 'Orbit Notes',
    tagline: 'Notes in motion',
    description:
      'A spatial note-taking prototype where ideas orbit topics and cluster by similarity — testing whether spatial memory beats folders and tags.',
    domain: 'interface',
    stage: 'concept',
    origin: 'A question about how thought is actually organized.',
  },
];

export const STAGE_LABELS: Record<LabProject['stage'], string> = {
  'concept': 'Concept',
  'prototype': 'Prototype',
  'exploration': 'Exploration',
};
