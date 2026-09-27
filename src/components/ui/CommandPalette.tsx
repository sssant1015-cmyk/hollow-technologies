import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../../content/projects';
import { LABS } from '../../content/labs';
import { CHANGELOG } from '../../content/changelog';
import { ROADMAP } from '../../content/roadmap';

interface Entry {
  label: string;
  kind: 'Page' | 'Project' | 'Lab' | 'Doc' | 'Log' | 'Roadmap';
  path: string;
  keywords: string;
}

let globalOpen: (() => void) | null = null;
export function openPalette() { globalOpen?.(); }

function buildIndex(): Entry[] {
  const pages: Entry[] = [
    { label: 'Home', kind: 'Page', path: '/', keywords: 'hollow technologies start' },
    { label: 'About', kind: 'Page', path: '/about', keywords: 'company philosophy vision' },
    { label: 'Ecosystem', kind: 'Page', path: '/ecosystem', keywords: 'systems network map' },
    { label: 'Projects', kind: 'Page', path: '/projects', keywords: 'all systems' },
    { label: 'Technology', kind: 'Page', path: '/technology', keywords: 'stack ai infrastructure' },
    { label: 'Hollow Labs', kind: 'Page', path: '/labs', keywords: 'experiments prototypes' },
    { label: 'Documentation', kind: 'Page', path: '/docs', keywords: 'guides reference' },
    { label: 'Roadmap', kind: 'Page', path: '/roadmap', keywords: 'plan now next later' },
    { label: 'Changelog', kind: 'Page', path: '/changelog', keywords: 'releases versions history' },
    { label: 'Contact', kind: 'Page', path: '/contact', keywords: 'email form inquiry' },
  ];
  const projects: Entry[] = PROJECTS.map((p) => ({
    label: `${p.name} — ${p.role}`,
    kind: 'Project',
    path: `/projects/${p.slug}`,
    keywords: `${p.name} ${p.role} ${p.description} ${p.technologies.join(' ')}`.toLowerCase(),
  }));
  const labs: Entry[] = LABS.map((l) => ({
    label: `${l.name} — ${l.tagline}`,
    kind: 'Lab',
    path: '/labs',
    keywords: `${l.name} ${l.description}`.toLowerCase(),
  }));
  const logs: Entry[] = CHANGELOG.map((c) => ({
    label: `${c.project} v${c.version} — ${c.summary}`,
    kind: 'Log',
    path: '/changelog',
    keywords: `${c.project} ${c.version} ${c.summary}`.toLowerCase(),
  }));
  const road: Entry[] = ROADMAP.map((r) => ({
    label: r.title,
    kind: 'Roadmap',
    path: '/roadmap',
    keywords: `${r.title} ${r.detail}`.toLowerCase(),
  }));
  const docs: Entry[] = [
    { label: 'Ecosystem overview', kind: 'Doc', path: '/docs/ecosystem', keywords: 'architecture systems' },
    { label: 'Nix overview', kind: 'Doc', path: '/docs/nix', keywords: 'coding agent permission modes' },
    { label: 'HollowLink overview', kind: 'Doc', path: '/docs/hollowlink', keywords: 'social platform self-host' },
    { label: 'Security practices', kind: 'Doc', path: '/docs/security', keywords: 'auth validation privacy disclosure' },
    { label: 'Development guide', kind: 'Doc', path: '/docs/development', keywords: 'setup build test contribute' },
  ];
  return [...pages, ...projects, ...labs, ...logs, ...road, ...docs];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    globalOpen = () => setOpen(true);
    return () => { globalOpen = null; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSel(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 9);
    return index
      .filter((e) => `${e.label} ${e.keywords}`.toLowerCase().includes(q))
      .slice(0, 9);
  }, [query, index]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  if (!open) return null;

  return (
    <div className="palette-overlay" onClick={() => setOpen(false)}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Search Hollow Technologies" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSel(0); }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            if (e.key === 'Enter' && results[sel]) go(results[sel]!.path);
          }}
          placeholder="Search Hollow Technologies…"
          aria-label="Search query"
        />
        <div className="palette-list" role="listbox">
          {results.length === 0 ? (
            <p className="palette-empty">Nothing in the void matches “{query}”.</p>
          ) : (
            results.map((r, i) => (
              <button
                key={`${r.kind}-${r.path}-${r.label}`}
                className={`palette-item ${i === sel ? 'sel' : ''}`}
                onClick={() => go(r.path)}
                onMouseEnter={() => setSel(i)}
                role="option"
                aria-selected={i === sel}
              >
                <span className="kind">{r.kind}</span>
                <span>{r.label}</span>
              </button>
            ))
          )}
        </div>
        <div className="palette-foot">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
