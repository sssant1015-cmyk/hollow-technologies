import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/ui/Seo';
import { Reveal, SectionHead, Status } from '../components/ui/primitives';
import { EnergyField } from '../components/motion/EnergyField';
import { EcosystemGraph } from '../components/ecosystem/EcosystemGraph';
import { PROJECTS, FLAGSHIPS } from '../content/projects';
import { LABS } from '../content/labs';
import { TECH_CATEGORIES } from '../content/tech';
import { ROADMAP } from '../content/roadmap';
import { CHANGELOG } from '../content/changelog';

export function Home() {
  return (
    <>
      <Seo
        title="Hollow Technologies"
        description="Hollow Technologies builds an interconnected ecosystem of AI systems, developer tools and digital products. Build beyond the ordinary."
      />

      {/* 1 — HERO · VOID → ENERGY */}
      <section className="hero">
        <EnergyField />
        <div className="wrap hero-inner">
          <p className="eyebrow rise" style={{ animationDelay: '0s' }}>Hollow Technologies · Ecosystem</p>
          <h1>
            <span className="rise" style={{ display: 'block', animationDelay: '0.08s' }}>Engineering the</span>
            <span className="rise accent-line" style={{ display: 'block', animationDelay: '0.2s' }}>intelligent future.</span>
          </h1>
          <div className="hero-sub rise" style={{ animationDelay: '0.32s' }}>
            <span>AI systems</span><span>Software</span><span>Tools</span><span>Digital worlds</span>
          </div>
          <div className="hero-ctas rise" style={{ animationDelay: '0.44s' }}>
            <Link to="/ecosystem" className="btn btn-primary">Explore the ecosystem</Link>
            <a href="#flagships" className="btn">Enter Hollow</a>
          </div>
        </div>
      </section>

      {/* 2 — INTRODUCTION */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">What is Hollow Technologies</p>
            <h2 className="display" style={{ maxWidth: '20ch' }}>
              We build systems, <span className="serif" style={{ color: 'var(--accent-soft)' }}>not just software.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede" style={{ maxWidth: '58ch', marginTop: 'var(--space-3)' }}>
              Hollow Technologies is an independent technology ecosystem: intelligent systems, developer
              tools, and digital products designed to work together — not a collection of disconnected apps.
              Each project is built to be useful on its own and more useful inside the whole.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 — ECOSYSTEM · SYSTEMS */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="The Hollow Ecosystem"
            title={<>Nine systems. <span className="serif" style={{ color: 'var(--accent-soft)' }}>One organism.</span></>}
            lede="Rafael is the intended core. Around it: coding intelligence, research, security, planning, products. Select a node to meet each system."
          />
          <Reveal>
            <EcosystemSection />
          </Reveal>
        </div>
      </section>

      {/* 4 — FLAGSHIPS · PRODUCTS */}
      <section className="section" id="flagships">
        <div className="wrap">
          <SectionHead
            eyebrow="Flagship Systems"
            title="Where to start"
            lede="One product is live today. Two more are deep in development."
          />
          <div className="card-grid">
            {FLAGSHIPS.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <Link to={`/projects/${p.slug}`} className="card project-tile flagship" style={{ display: 'flex' }}>
                  <span className="role">{p.role}</span>
                  <h3 style={{ fontSize: '1.5rem' }}>{p.name}</h3>
                  <Status status={p.status} />
                  <p>{p.description}</p>
                  <div className="tech">
                    {p.technologies.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — TECHNOLOGY */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Technology"
            title="Built with intent"
            lede="What the ecosystem actually uses today — and what it's honestly still exploring."
          />
          <div className="card-grid">
            {TECH_CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={i * 90}>
                <div className="card">
                  <h3>{c.name}</h3>
                  <p className="dim small" style={{ marginBottom: 14 }}>{c.blurb}</p>
                  <p className="mono small" style={{ color: 'var(--ok)', marginBottom: 6 }}>— current</p>
                  <p className="small">{c.current.join(' · ')}</p>
                  <p className="mono small" style={{ color: 'var(--signal)', marginBottom: 6, marginTop: 12 }}>— exploring</p>
                  <p className="small dim">{c.exploring.join(' · ')}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140}>
            <p style={{ marginTop: 'var(--space-3)' }}>
              <Link to="/technology" className="btn btn-sm">Full technology map →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6 — LABS · EXPERIMENTS */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Hollow Labs"
            title="The experimental wing"
            lede="Where ideas earn their way into real systems — or die interestingly."
          />
          <div className="card-grid">
            {LABS.slice(0, 3).map((l, i) => (
              <Reveal key={l.id} delay={i * 90}>
                <div className="card lab-tile">
                  <span className="lab-stage">Experimental · {l.stage}</span>
                  <h3 style={{ marginTop: 8 }}>{l.name}</h3>
                  <p className="dim small">{l.tagline}</p>
                  <p>{l.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140}>
            <p style={{ marginTop: 'var(--space-3)' }}>
              <Link to="/labs" className="btn btn-sm">Enter the labs →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 7 — ROADMAP */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Roadmap"
            title="Now, next, later"
            lede="No fabricated dates. Just what's being built and in what order."
          />
          <Reveal>
            <div style={{ display: 'grid', gap: 12 }}>
              {ROADMAP.filter((r) => r.phase === 'now').slice(0, 3).map((r) => (
                <div key={r.id} className="road-item">
                  <span className="proj">{r.project ? PROJECTS.find((p) => p.id === r.project)?.name : 'Ecosystem'}</span>
                  <div>
                    <strong>{r.title}</strong>
                    <p className="muted small" style={{ margin: '2px 0 0' }}>{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ marginTop: 'var(--space-3)' }}>
              <Link to="/roadmap" className="btn btn-sm">Full roadmap →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8 — CHANGELOG */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Changelog"
            title="Receipts"
            lede="Every real release, documented."
          />
          <Reveal>
            {CHANGELOG.slice(0, 3).map((c) => (
              <article key={`${c.project}-${c.version}`} className="log-entry">
                <div className="log-meta">
                  <span className="log-cat">{c.project} v{c.version}</span>
                  <time className="dim small mono">{c.date}</time>
                </div>
                <div>
                  <strong>{c.summary}</strong>
                  <ul>{c.changes.slice(0, 3).map((ch) => <li key={ch}>{ch}</li>)}</ul>
                </div>
              </article>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <p style={{ marginTop: 'var(--space-3)' }}>
              <Link to="/changelog" className="btn btn-sm">Full history →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 9 — DOCS + CONTACT CLOSING · FUTURE */}
      <section className="section">
        <div className="wrap narrow" style={{ textAlign: 'center' }}>
          <Reveal>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Documentation</p>
            <h2 className="display">Read the blueprints.</h2>
            <p className="lede" style={{ margin: 'var(--space-3) auto var(--space-4)', maxWidth: '52ch' }}>
              Architecture, development guides, and honest security notes — everything needed to understand how Hollow is built.
            </p>
            <div className="hero-ctas" style={{ justifyContent: 'center' }}>
              <Link to="/docs" className="btn btn-primary">Open documentation</Link>
              <Link to="/contact" className="btn">Get in touch</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function EcosystemSection() {
  const [selected, setSelected] = useState('rafael');
  return <EcosystemGraph selected={selected} onSelect={setSelected} />;
}
