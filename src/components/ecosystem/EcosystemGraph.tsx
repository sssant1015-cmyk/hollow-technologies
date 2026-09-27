import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, getProject, STATUS_LABELS, type Project } from '../../content/projects';

/**
 * Data-driven ecosystem map. Topology derives from each project's
 * relatedProjects — Rafael is the hub; everything else connects to
 * what it actually relates to. Nodes light their edges on hover/click;
 * the detail panel shows the selected system.
 */

// deterministic layout (hand-tuned hub-and-spoke, desktop coordinates)
const LAYOUT: Record<string, { x: number; y: number }> = {
  rafael: { x: 50, y: 34 },
  nix: { x: 22, y: 20 },
  forge: { x: 24, y: 52 },
  nova: { x: 50, y: 66 },
  atlas: { x: 80, y: 20 },
  iris: { x: 10, y: 74 },
  sentinel: { x: 74, y: 48 },
  hollowlink: { x: 44, y: 90 },
  sovereign: { x: 82, y: 82 },
};

export function EcosystemGraph({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const edges = useMemo(() => {
    const seen = new Set<string>();
    const list: [string, string][] = [];
    for (const p of PROJECTS) {
      for (const rel of p.relatedProjects) {
        const key = [p.id, rel].sort().join('~');
        if (!seen.has(key) && LAYOUT[rel]) {
          seen.add(key);
          list.push([p.id, rel]);
        }
      }
    }
    return list;
  }, []);

  const related = (id: string) =>
    new Set([id, ...(getProject(id)?.relatedProjects ?? []), ...PROJECTS.filter((p) => p.relatedProjects.includes(id)).map((p) => p.id)]);

  const active = related(selected);
  const project = getProject(selected)!;

  return (
    <div className="eco-wrap">
      <div className="eco-graph">
        <svg viewBox="0 0 100 104" className="eco-svg" role="img" aria-label="Map of the Hollow ecosystem">
          {edges.map(([a, b]) => {
            const lit = active.has(a) && active.has(b);
            const p1 = LAYOUT[a]!;
            const p2 = LAYOUT[b]!;
            const mx = (p1.x + p2.x) / 2 + (b > a ? 3 : -3);
            const my = (p1.y + p2.y) / 2;
            return (
              <path
                key={`${a}~${b}`}
                className={`eco-edge ${lit ? 'lit' : ''}`}
                d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
              />
            );
          })}
          {PROJECTS.map((p) => {
            const pos = LAYOUT[p.id]!;
            const isSel = p.id === selected;
            const lit = active.has(p.id);
            return (
              <g
                key={p.id}
                className={`eco-node ${lit ? 'lit' : ''}`}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => onSelect(p.id)}
                role="button"
                aria-label={`${p.name} — ${p.role}`}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(p.id); } }}
              >
                <circle r={isSel ? 6.5 : 4.4} fill="var(--ink-2)" stroke={isSel ? 'var(--accent)' : 'var(--line-strong)'} strokeWidth={isSel ? 1.4 : 1} />
                <circle r="1.4" cy={-0.2} fill={p.status === 'active' ? 'var(--ok)' : p.status === 'in-development' ? 'var(--accent)' : p.status === 'experimental' ? 'var(--exp)' : 'var(--text-lo)'} />
                <text y="15" textAnchor="middle">{p.name}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="eco-detail card" aria-live="polite">
        <div className="fade-key" key={project.id}>
          <p className="eyebrow" style={{ marginBottom: 8 }}>{project.role}</p>
          <h3 style={{ fontSize: '1.6rem' }}>{project.name}</h3>
          <p className="status" style={{ margin: '10px 0' }}>
            {STATUS_LABELS[project.status]}
            {project.statusNote ? <span className="status-note">— {project.statusNote}</span> : null}
          </p>
          <p>{project.description}</p>
          <div className="tag-row" style={{ margin: '14px 0' }}>
            {project.technologies.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn btn-sm btn-primary" to={`/projects/${project.slug}`}>Open {project.name} →</Link>
            <button className="btn btn-sm" onClick={() => onSelect(nextProject(project))}>Next system →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function nextProject(p: Project): string {
  const idx = PROJECTS.findIndex((x) => x.id === p.id);
  return PROJECTS[(idx + 1) % PROJECTS.length]!.id;
}
