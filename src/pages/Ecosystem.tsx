import { useState } from 'react';
import { Seo } from '../components/ui/Seo';
import { Reveal, SectionHead } from '../components/ui/primitives';
import { EcosystemGraph } from '../components/ecosystem/EcosystemGraph';
import { PROJECTS } from '../content/projects';

export function EcosystemPage() {
  const [selected, setSelected] = useState('rafael');
  return (
    <>
      <Seo
        title="Ecosystem"
        description="The Hollow ecosystem: nine interconnected systems — Rafael, Nix, HollowLink, Iris, Sentinel, Nova, Atlas, Sovereign and Forge."
      />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">The Hollow Ecosystem</p>
          <h1 className="display">One organism, nine organs.</h1>
          <p className="lede" style={{ marginTop: 'var(--space-3)', maxWidth: '56ch' }}>
            Systems register with the core, routes carry intent, products give it a face.
            Select a node — or browse the full inventory below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <EcosystemGraph selected={selected} onSelect={setSelected} />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Inventory" title="Every system, plainly stated" lede="Statuses are factual. Planned means planned." />
          <div className="card-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <div className="card project-tile" style={{ minHeight: 200 }}>
                  <span className="role">{p.role}</span>
                  <h3>{p.name}</h3>
                  <p className="status" style={{ margin: 0 }}>{p.status.replace('-', ' ')}{p.statusNote ? <span className="status-note"> — {p.statusNote}</span> : null}</p>
                  <p>{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
