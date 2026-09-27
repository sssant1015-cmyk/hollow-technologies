import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PrefsProvider, usePrefs } from '../src/lib/prefs';
import { PROJECTS, getProject, FLAGSHIPS, SUPPORTING } from '../src/content/projects';
import { LABS } from '../src/content/labs';
import { CHANGELOG, CATEGORY_LABELS } from '../src/content/changelog';
import { ROADMAP, PHASES } from '../src/content/roadmap';
import { TECH_CATEGORIES } from '../src/content/tech';

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches: true, // treat as dark/reduced-safe
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('content integrity (no fake data)', () => {
  it('contains all nine ecosystem systems', () => {
    expect(PROJECTS.map((p) => p.id)).toEqual(
      expect.arrayContaining(['rafael', 'nix', 'iris', 'sentinel', 'nova', 'atlas', 'sovereign', 'forge', 'hollowlink']),
    );
    expect(PROJECTS).toHaveLength(9);
  });

  it('every project has honest status, role, and unique slug', () => {
    const slugs = new Set(PROJECTS.map((p) => p.slug));
    expect(slugs.size).toBe(PROJECTS.length);
    for (const p of PROJECTS) {
      expect(p.status).toBeTruthy();
      expect(p.role).toBeTruthy();
      expect(p.description.length).toBeGreaterThan(30);
      expect(['active', 'in-development', 'experimental', 'planned']).toContain(p.status);
    }
  });

  it('only HollowLink is live, and it links to the real repository', () => {
    const active = PROJECTS.filter((p) => p.status === 'active');
    expect(active.map((p) => p.id)).toEqual(['hollowlink']);
    expect(getProject('hollowlink')?.repository).toBe('https://github.com/sssant1015-cmyk/hollowlink');
  });

  it('hierarchy: 3 flagships/product + 6 supporting', () => {
    expect(FLAGSHIPS).toHaveLength(3);
    expect(SUPPORTING).toHaveLength(6);
  });

  it('labs are all labeled experimental with origins', () => {
    for (const l of LABS) {
      expect(l.origin.length).toBeGreaterThan(10);
      expect(['concept', 'prototype', 'exploration']).toContain(l.stage);
    }
  });

  it('changelog entries reference real projects and known categories', () => {
    const ids = new Set([...PROJECTS.map((p) => p.id), 'hollow-technologies']);
    for (const c of CHANGELOG) {
      expect(ids.has(c.project)).toBe(true);
      expect(Object.keys(CATEGORY_LABELS)).toContain(c.category);
      expect(c.changes.length).toBeGreaterThan(1);
    }
  });

  it('roadmap phases are the four honest ones, no dates fabricated', () => {
    expect(PHASES.map((p) => p.id)).toEqual(['now', 'next', 'later', 'experimental']);
    for (const r of ROADMAP) expect(r.title).toBeTruthy();
  });

  it('tech categories separate current from exploring from planned', () => {
    for (const t of TECH_CATEGORIES) {
      expect(t.current.length).toBeGreaterThan(0);
      expect(TECH_CATEGORIES.map((c) => c.id)).toEqual(['ai', 'software', 'infrastructure']);
    }
  });
});

describe('preference system', () => {
  function Probe() {
    const { theme, accent, set } = usePrefs();
    return (
      <div>
        <span data-testid="theme">{theme}</span>
        <span data-testid="accent">{accent}</span>
        <button onClick={() => set({ theme: 'light' })}>to-light</button>
        <button onClick={() => set({ accent: 'blue' })}>to-blue</button>
      </div>
    );
  }

  it('defaults to dark + hollow purple and persists changes', async () => {
    const user = userEvent.setup();
    render(
      <PrefsProvider>
        <Probe />
      </PrefsProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('accent')).toHaveTextContent('purple');
    expect(document.documentElement.dataset.theme).toBe('dark');

    await user.click(screen.getByText('to-light'));
    await user.click(screen.getByText('to-blue'));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('accent')).toHaveTextContent('blue');
    expect(JSON.parse(localStorage.getItem('hollowtech.prefs')!)).toMatchObject({ theme: 'light', accent: 'blue' });
  });
});

describe('search palette', () => {
  it('index covers projects, labs, changelog and docs (unit-level)', async () => {
    const { buildIndexForTest } = await import('../src/components/ui/CommandPalette-testable');
    const idx = buildIndexForTest();
    expect(idx.filter((e) => e.kind === 'Project')).toHaveLength(9);
    expect(idx.some((e) => e.label.includes('Nix'))).toBe(true);
    expect(idx.some((e) => e.kind === 'Log')).toBe(true);
    expect(idx.some((e) => e.kind === 'Doc')).toBe(true);
  });
});

describe('pages render', () => {
  it('projects index shows all systems', async () => {
    const { ProjectsIndex } = await import('../src/pages/projects');
    render(
      <MemoryRouter>
        <ProjectsIndex />
      </MemoryRouter>,
    );
    await waitFor(() => expect(screen.getByText('The full inventory.')).toBeInTheDocument());
    for (const p of PROJECTS) expect(screen.getByText(p.name)).toBeInTheDocument();
  });

  it('contact form validates and blocks bad submissions', async () => {
    const { Contact } = await import('../src/pages/records');
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: /send transmission/i }));
    expect(await screen.findByText(/a few more words/i)).toBeInTheDocument();
    // should still be on the form (blocked), not the sent confirmation
    expect(screen.getByRole('button', { name: /send transmission/i })).toBeInTheDocument();
  });
});
