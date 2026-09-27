import { useState } from 'react';
import { Seo } from '../components/ui/Seo';
import { Reveal } from '../components/ui/primitives';
import { ROADMAP, PHASES } from '../content/roadmap';
import { CHANGELOG, CATEGORY_LABELS } from '../content/changelog';
import { PROJECTS } from '../content/projects';

export function Roadmap() {
  return (
    <>
      <Seo title="Roadmap" description="What the Hollow ecosystem is building now, next, later — and what stays experimental." />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Roadmap</p>
          <h1 className="display">Honest sequence, no invented dates.</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {PHASES.map((phase, pi) => (
            <Reveal key={phase.id} delay={pi * 60}>
              <div className="phase-block">
                <div className="phase-title">
                  <span className="phase-num">0{pi + 1}</span>
                  <h2>{phase.label}</h2>
                  <span className="dim small">{phase.blurb}</span>
                </div>
                {ROADMAP.filter((r) => r.phase === phase.id).map((r) => (
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
          ))}
        </div>
      </section>
    </>
  );
}

export function Changelog() {
  const [filter, setFilter] = useState<string>('all');
  const projects = ['all', ...new Set(CHANGELOG.map((c) => c.project))];
  const shown = filter === 'all' ? CHANGELOG : CHANGELOG.filter((c) => c.project === filter);
  return (
    <>
      <Seo title="Changelog" description="Every real release across the Hollow ecosystem — added, changed, fixed, secured." />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Changelog</p>
          <h1 className="display">The record.</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="tag-row" style={{ marginBottom: 'var(--space-4)' }}>
            {projects.map((p) => (
              <button key={p} className={`chip ${filter === p ? '' : ''}`} style={{ cursor: 'pointer', borderColor: filter === p ? 'var(--accent)' : undefined, color: filter === p ? 'var(--accent-soft)' : undefined }} onClick={() => setFilter(p)}>
                {p === 'all' ? 'all projects' : p}
              </button>
            ))}
          </div>
          {shown.map((c) => (
            <Reveal key={`${c.project}-${c.version}`}>
              <article className="log-entry">
                <div className="log-meta">
                  <span className="log-cat">{CATEGORY_LABELS[c.category]}</span>
                  <strong className="small">{c.project} v{c.version}</strong>
                  <time className="dim small mono">{c.date}</time>
                </div>
                <div>
                  <strong>{c.summary}</strong>
                  <ul>{c.changes.map((ch) => <li key={ch}>{ch}</li>)}</ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

const INQUIRY_TYPES = ['General', 'Project feedback', 'Partnership / integration', 'Security disclosure'] as const;

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; type: string; message: string }>({ name: '', email: '', type: INQUIRY_TYPES[0]!, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'A name helps us reply.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'That email does not look right.';
    if (form.message.trim().length < 12) errs.message = 'A few more words, please.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  return (
    <>
      <Seo title="Contact" description="Contact Hollow Technologies — general inquiries, project feedback, partnerships and security disclosure." />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1 className="display">Open a channel.</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap narrow">
          {sent ? (
            <Reveal>
              <div className="card" style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
                <p className="eyebrow" style={{ justifyContent: 'center' }}>Transmission received</p>
                <h2>Thanks, {form.name.split(' ')[0]}.</h2>
                <p className="muted" style={{ marginTop: 10 }}>
                  Your message has been noted. As an independent project, replies come when there's
                  something real to say — usually within a few days.
                </p>
                <p className="dim small">This demo form validates locally and does not transmit data anywhere — there is no mail server behind it yet.</p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form onSubmit={submit} noValidate>
                <div className="field">
                  <label htmlFor="c-name">Name</label>
                  <input id="c-name" className={`input ${errors.name ? 'input-error' : ''}`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ada Lovelace" aria-describedby={errors.name ? 'e-name' : undefined} />
                  {errors.name && <span id="e-name" className="small" style={{ color: 'var(--exp)' }}>{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" className={`input ${errors.email ? 'input-error' : ''}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@somewhere.tld" aria-describedby={errors.email ? 'e-email' : undefined} />
                  {errors.email && <span id="e-email" className="small" style={{ color: 'var(--exp)' }}>{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="c-type">Inquiry type</label>
                  <select id="c-type" className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {INQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" className="input" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What's on your mind?" aria-describedby={errors.message ? 'e-msg' : undefined} />
                  {errors.message && <span id="e-msg" className="small" style={{ color: 'var(--exp)' }}>{errors.message}</span>}
                </div>
                {/* honeypot spam trap */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: -9999 }} aria-hidden="true" />
                <button type="submit" className="btn btn-primary">Send transmission</button>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

export function Legal() {
  return <LegalPage kind="privacy" />;
}
export function LegalTerms() {
  return <LegalPage kind="terms" />;
}
export function LegalSecurity() {
  return <LegalPage kind="security" />;
}

function LegalPage({ kind }: { kind: 'privacy' | 'terms' | 'security' }) {
  const meta = {
    privacy: { title: 'Privacy', h: 'Privacy', body: PRIVACY },
    terms: { title: 'Terms', h: 'Terms of Service', body: TERMS },
    security: { title: 'Security', h: 'Security', body: SECURITY },
  }[kind];
  return (
    <>
      <Seo title={meta.title} description={`${meta.h} — Hollow Technologies`} />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Legal</p>
          <h1 className="display">{meta.h}</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap narrow docs-body">
          <Reveal>
            {meta.body.map((s) => (
              <div key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((p) => <p key={p} className="muted">{p}</p>)}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}

const PRIVACY = [
  { h: 'The short version', p: ['Hollow Technologies is an independent project. This website collects nothing: no analytics, no trackers, no cookies beyond your own saved theme preference stored locally in your browser.'] },
  { h: 'HollowLink', p: ['The HollowLink product stores the data its users create (accounts, posts, messages) in its operator\'s own database. It has no third-party telemetry. Your data lives where the operator deployed it — for a friend group, that is usually the friend running it.'] },
  { h: 'Contact form', p: ['The contact form on this site validates input in your browser and does not yet transmit or store submissions; no personal data is collected by it.'] },
  { h: 'Future review', p: ['This policy is a good-faith description of current behavior. It is marked for professional legal review as the projects grow.'] },
];

const TERMS = [
  { h: 'Use of this site', p: ['This website is provided as-is, for information about the Hollow Technologies ecosystem. It may change without notice.'] },
  { h: 'Software and projects', p: ['Projects described here are in various states — active, in development, experimental, or planned. Their status is stated on each project page. Experimental projects are not products and carry no guarantees.'] },
  { h: 'Open source', p: ['Where a project is published (such as HollowLink on GitHub), its repository license governs use of the code.'] },
  { h: 'Liability', p: ['Nothing here constitutes professional, financial, or investment advice. Iris-related material is decision-support concept only. These terms are marked for future legal review.'] },
];

const SECURITY = [
  { h: 'Posture', p: ['Hollow systems are built defensively: authentication with hashed credentials, server-side authorization on every endpoint, validated inputs, and sandboxed extension permissions in HollowLink.'] },
  { h: 'Local-first privacy', p: ['The ecosystem\'s direction is local-first: intelligence and data processing run on your machine by default, and nothing is collected from your devices — ever.'] },
  { h: 'Reporting a vulnerability', p: ['If you find a security issue in a Hollow project, report it through GitHub (repository security advisories) or the contact form marked "Security disclosure". Responsible disclosure is honored and credited.'] },
  { h: 'No offensive tooling', p: ['Sentinel and all security-adjacent work is strictly defensive. Offensive capabilities are out of scope, permanently.'] },
];
