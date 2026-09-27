import { PROJECTS } from '../../content/projects';
import { LABS } from '../../content/labs';
import { CHANGELOG } from '../../content/changelog';
import { ROADMAP } from '../../content/roadmap';

export interface Entry {
  label: string;
  kind: 'Page' | 'Project' | 'Lab' | 'Doc' | 'Log' | 'Roadmap';
  path: string;
  keywords: string;
}

/** Testable mirror of the palette index builder (kept in sync with CommandPalette.tsx). */
export function buildIndexForTest(): Entry[] {
  const pages: Entry[] = [
    { label: 'Home', kind: 'Page', path: '/', keywords: 'start' },
    { label: 'Documentation', kind: 'Page', path: '/docs', keywords: 'guides' },
  ];
  const projects: Entry[] = PROJECTS.map((p) => ({
    label: `${p.name} — ${p.role}`,
    kind: 'Project',
    path: `/projects/${p.slug}`,
    keywords: `${p.name} ${p.role}`.toLowerCase(),
  }));
  const labs: Entry[] = LABS.map((l) => ({ label: `${l.name} — ${l.tagline}`, kind: 'Lab', path: '/labs', keywords: l.name.toLowerCase() }));
  const logs: Entry[] = CHANGELOG.map((c) => ({ label: `${c.project} v${c.version}`, kind: 'Log', path: '/changelog', keywords: c.project }));
  const road: Entry[] = ROADMAP.map((r) => ({ label: r.title, kind: 'Roadmap', path: '/roadmap', keywords: r.title.toLowerCase() }));
  const docs: Entry[] = [{ label: 'Nix overview', kind: 'Doc', path: '/docs/nix', keywords: 'nix' }];
  return [...pages, ...projects, ...labs, ...logs, ...road, ...docs];
}
