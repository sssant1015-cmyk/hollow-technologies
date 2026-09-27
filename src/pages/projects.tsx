import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/ui/Seo';
import { Reveal, SectionHead, Status, CodeBlock } from '../components/ui/primitives';
import { PROJECTS, getProject } from '../content/projects';

export function ProjectsIndex() {
  const flagships = PROJECTS.filter((p) => p.category !== 'supporting');
  const supporting = PROJECTS.filter((p) => p.category === 'supporting');
  return (
    <>
      <Seo title="Projects" description="Every system in the Hollow ecosystem — flagships, supporting intelligence, and the live product." />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Projects</p>
          <h1 className="display">The full inventory.</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Flagship & products" title="The pointed end" />
          <div className="card-grid">
            {flagships.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </div>
          <div style={{ height: 'var(--space-5)' }} />
          <SectionHead eyebrow="Supporting systems" title="The connective ring" lede="Planned and experimental systems that will plug into the core as it comes online." />
          <div className="card-grid">
            {supporting.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  return (
    <Reveal delay={i * 70}>
      <Link to={`/projects/${p.slug}`} className="card project-tile" style={{ display: 'flex' }}>
        <span className="role">{p.role}</span>
        <h3 style={{ fontSize: '1.4rem' }}>{p.name}</h3>
        <Status status={p.status} note={p.statusNote} />
        <p>{p.description}</p>
        <div className="tech">{p.technologies.slice(0, 3).map((t) => <span key={t} className="chip">{t}</span>)}</div>
      </Link>
    </Reveal>
  );
}

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const p = slug ? getProject(slug) : undefined;
  if (!p) {
    return (
      <>
        <Seo title="Project not found" description="This system does not exist in the Hollow ecosystem." />
        <section className="page-hero"><div className="wrap">
          <p className="eyebrow">404</p>
          <h1 className="display">No such system.</h1>
          <p style={{ marginTop: 'var(--space-3)' }}><Link to="/projects" className="btn btn-primary">Back to projects</Link></p>
        </div></section>
      </>
    );
  }
  const related = p.relatedProjects.map((id) => PROJECTS.find((x) => x.id === id)).filter(Boolean) as typeof PROJECTS;

  return (
    <>
      <Seo title={p.name} description={p.description} />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{p.role}</p>
          <h1 className="display">{p.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Status status={p.status} note={p.statusNote} />
            <span className="dim">·</span>
            <span className="muted small">{p.purpose}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap eco-wrap" style={{ alignItems: 'start' }}>
          <div>
            <Reveal>
              <p className="lede">{p.longDescription}</p>
            </Reveal>
            <Reveal delay={100}>
              <h3 style={{ marginTop: 'var(--space-4)', marginBottom: 12 }}>Architecture</h3>
              <ul style={{ paddingLeft: 18, color: 'var(--text-mid)', lineHeight: 1.9 }}>
                {p.architecture.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </Reveal>
            <Reveal delay={140}>
              <h3 style={{ marginTop: 'var(--space-4)', marginBottom: 12 }}>Capabilities</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {p.features.map((f) => (
                  <div key={f.title} className="card" style={{ padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'baseline' }}>
                    <span className={`status ${f.ready ? 'active' : 'planned'}`} style={{ flexShrink: 0 }}>
                      {f.ready ? 'Working' : 'Planned'}
                    </span>
                    <div>
                      <strong className="small">{f.title}</strong>
                      <p className="small muted" style={{ margin: 0 }}>{f.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div style={{ position: 'sticky', top: 110 }}>
            <Reveal delay={80}>
              <div className="card">
                <p className="eyebrow" style={{ marginBottom: 10 }}>System card</p>
                <Status status={p.status} note={p.statusNote} />
                <p className="mono small dim" style={{ margin: '14px 0 6px' }}>TECHNOLOGIES</p>
                <div className="tag-row">{p.technologies.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                <p className="mono small dim" style={{ margin: '14px 0 6px' }}>RELATED</p>
                <div className="tag-row">
                  {related.map((r) => <Link key={r.id} to={`/projects/${r.slug}`} className="chip" style={{ color: 'var(--accent-soft)' }}>{r.name} →</Link>)}
                </div>
                <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
                  {p.repository ? <a className="btn btn-sm" href={p.repository} target="_blank" rel="noreferrer">GitHub ↗</a> : null}
                  <Link className="btn btn-sm" to={`/docs/${p.slug === 'nix' || p.slug === 'hollowlink' ? p.slug : 'ecosystem'}`}>Documentation</Link>
                  <Link className="btn btn-sm" to="/changelog">Changelog</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export function NixPage() {
  const nix = getProject('nix')!;
  return (
    <>
      <Seo title="Nix — Coding Intelligence" description="Nix is a local-first coding agent that understands, inspects, modifies and tests real software projects." />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{nix.role} · Flagship</p>
          <h1 className="display" style={{ maxWidth: '14ch' }}>
            Nix<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
          <p className="lede" style={{ maxWidth: '30ch', fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            The coding intelligence inside the machine.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}><Status status={nix.status} note={nix.statusNote} /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <Reveal>
            <p className="lede">{nix.longDescription}</p>
          </Reveal>
          <Reveal delay={100}>
            <h3 style={{ marginTop: 'var(--space-4)' }}>How it works</h3>
            <ul style={{ paddingLeft: 18, color: 'var(--text-mid)', lineHeight: 2 }}>
              <li><strong>Local-first</strong> — your code never has to leave your machine; models run where the work happens.</li>
              <li><strong>Project awareness</strong> — structure, dependencies and git history inform every change.</li>
              <li><strong>Real tools</strong> — file operations, search and test running are first-class actions, not text tricks.</li>
              <li><strong>Reviewable by design</strong> — every edit is a diff you approve, every command is logged.</li>
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <h3 style={{ marginTop: 'var(--space-4)' }}>Permission modes</h3>
            <p className="muted">Every action class is scoped before it can run. Implementation status varies by development stage.</p>
            <CodeBlock title="permission modes" lang="text" code={`full access      →  read, write, run — for trusted projects
ask before doing →  every consequential action needs a yes
read only        →  understanding without touching`} />
          </Reveal>

          <Reveal delay={160}>
            <h3 style={{ marginTop: 'var(--space-4)' }}>Capabilities</h3>
            <div style={{ display: 'grid', gap: 10 }}>
              {nix.features.map((f) => (
                <div key={f.title} className="card" style={{ padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'baseline' }}>
                  <span className={`status ${f.ready ? 'active' : 'planned'}`} style={{ flexShrink: 0 }}>{f.ready ? 'Working' : 'Building'}</span>
                  <div>
                    <strong className="small">{f.title}</strong>
                    <p className="small muted" style={{ margin: 0 }}>{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function HollowLinkPage() {
  const hl = getProject('hollowlink')!;
  const planned = hl.features.filter((f) => !f.ready);
  const shipped = hl.features.filter((f) => f.ready);
  return (
    <>
      <Seo title="HollowLink" description="HollowLink is a private, deeply customizable social platform for friend groups — live today, with an extension framework for what comes next." />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{hl.role} · Shipping product</p>
          <h1 className="display" style={{ maxWidth: '13ch' }}>HollowLink<span style={{ color: 'var(--accent)' }}>.</span></h1>
          <p className="lede" style={{ maxWidth: '44ch' }}>
            Your people. Your space. Your link. A private social platform a friend group can actually
            run — and completely make its own.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Status status={hl.status} note={hl.statusNote} />
            {hl.repository ? <a className="btn btn-sm" href={hl.repository} target="_blank" rel="noreferrer">GitHub ↗</a> : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="What's live" title="A real product, used daily" lede="Everything below ships today and runs on real data — no mockups." />
          <div className="card-grid">
            {shipped.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <div className="card">
                  <span className="status active" style={{ marginBottom: 8 }}>Live</span>
                  <h3>{f.title}</h3>
                  <p>{f.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <SectionHead eyebrow="Personalization" title="Your HollowLink should look like yours" lede="The customization engine is shipped: themes, light/dark/system, fonts, text size, colors, animation and density — with saved presets." />
          <Reveal>
            <CodeBlock title="customization surface" lang="text" code={`theme mode     →  dark · light · system
presets        →  hollow dark · midnight · cyber · ember · ocean · forest …
custom colors  →  accent, background, surface, text — contrast-checked
typography     →  7 curated fonts · 4 text sizes
interface      →  compact · comfortable · spacious
motion         →  none · reduced · normal · high (reduced-motion honored)`} />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <SectionHead eyebrow="Extensions" title="Built to grow" lede="The extension framework ships today — validated manifests, permission consent, sandboxed panels. Integrations and games are designed for, not promised." />
          <div style={{ display: 'grid', gap: 10 }}>
            {planned.map((f) => (
              <Reveal key={f.title}>
                <div className="card" style={{ padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'baseline' }}>
                  <span className="status planned" style={{ flexShrink: 0 }}>Planned</span>
                  <div>
                    <strong className="small">{f.title}</strong>
                    <p className="small muted" style={{ margin: 0 }}>{f.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="notice" style={{ marginTop: 'var(--space-3)' }}>
              <strong>Honesty note:</strong> meeting integrations, games and music extensions are architecture today —
              they are clearly labeled <em>planned</em> until they actually exist.
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
