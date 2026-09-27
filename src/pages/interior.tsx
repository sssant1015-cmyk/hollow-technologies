import { Link } from 'react-router-dom';
import { Seo } from '../components/ui/Seo';
import { Reveal } from '../components/ui/primitives';
import { TECH_CATEGORIES } from '../content/tech';
import { LABS, STAGE_LABELS } from '../content/labs';

export function About() {
  return (
    <>
      <Seo title="About" description="What Hollow Technologies is, what it builds, and why the projects are one interconnected ecosystem." />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1 className="display" style={{ maxWidth: '16ch' }}>One independent builder. One coherent ecosystem.</h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <Reveal>
            <p className="lede">
              Hollow Technologies is the work of a single independent developer building an interconnected
              ecosystem of AI systems, developer tools, and digital products. No offices, no investors, no
              headcount theater — just systems being built carefully, in public view of their own documentation.
            </p>
            <p className="muted">
              The premise is simple: most software is built as islands. Hollow's projects are designed as
              organs of one body — Rafael as the coordinating core, Nix as the engineering intelligence,
              HollowLink as the social product people actually use, and a ring of supporting systems for
              research, security, planning, finance and business work.
            </p>
            <p className="muted">
              Everything on this site is honest about its state. Products that exist say so. Concepts that
              are still drawings say that too. The roadmap has no invented dates, the changelog has no
              invented releases, and nothing pretends to be bigger than it is.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="card" style={{ marginTop: 'var(--space-5)' }}>
              <p className="eyebrow" style={{ marginBottom: 10 }}>Philosophy</p>
              <h3>Build beyond the ordinary.</h3>
              <p className="muted" style={{ marginTop: 10 }}>
                Build. Connect. Evolve. — systems first, polish always, honesty throughout. Intelligence
                engineered means the AI serves the workflow, not the demo.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p style={{ marginTop: 'var(--space-4)' }}>
              <Link to="/ecosystem" className="btn btn-primary">See the ecosystem</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function Technology() {
  return (
    <>
      <Seo title="Technology" description="The AI, software and infrastructure stack of the Hollow ecosystem — current, exploring, and planned." />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Technology</p>
          <h1 className="display">The machinery under the void.</h1>
          <p className="lede" style={{ marginTop: 'var(--space-3)', maxWidth: '56ch' }}>
            Separated honestly into what's in production, what's being explored, and what's planned.
            Nothing listed as current is aspirational.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {TECH_CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <div className="phase-block">
                <div className="phase-title">
                  <span className="phase-num">0{i + 1}</span>
                  <h2>{c.name}</h2>
                  <span className="dim small">{c.blurb}</span>
                </div>
                <div className="card-grid">
                  <div className="card">
                    <p className="mono small" style={{ color: 'var(--ok)' }}>— current</p>
                    {c.current.map((t) => <p key={t} className="small" style={{ margin: '6px 0' }}>{t}</p>)}
                  </div>
                  <div className="card">
                    <p className="mono small" style={{ color: 'var(--signal)' }}>— exploring</p>
                    {c.exploring.map((t) => <p key={t} className="small" style={{ margin: '6px 0' }}>{t}</p>)}
                  </div>
                  <div className="card">
                    <p className="mono small" style={{ color: 'var(--text-lo)' }}>— planned</p>
                    {c.planned.map((t) => <p key={t} className="small dim" style={{ margin: '6px 0' }}>{t}</p>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function Labs() {
  return (
    <>
      <Seo title="Hollow Labs" description="Experimental interfaces, AI experiments and prototypes from the Hollow Technologies lab." />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Hollow Labs</p>
          <h1 className="display">Where ideas prove themselves.</h1>
          <p className="lede" style={{ marginTop: 'var(--space-3)', maxWidth: '54ch' }}>
            Experiments, prototypes and oddities. Labs projects are clearly labeled
            experimental — they are not products, and they don't pretend to be.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="card-grid">
            {LABS.map((l, i) => (
              <Reveal key={l.id} delay={i * 70}>
                <article className="card lab-tile" style={{ minHeight: 260, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span className="lab-stage">Experimental · {STAGE_LABELS[l.stage]}</span>
                  <h3 style={{ fontSize: '1.4rem' }}>{l.name}</h3>
                  <p className="small" style={{ color: 'var(--accent-soft)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: 0 }}>{l.tagline}</p>
                  <p className="muted small">{l.description}</p>
                  <p className="dim small" style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--line)' }}>
                    <span className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>origin — </span>
                    {l.origin}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
