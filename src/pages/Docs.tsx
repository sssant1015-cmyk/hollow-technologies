import { Link, NavLink, useParams } from 'react-router-dom';
import { Seo } from '../components/ui/Seo';
import { Reveal, CodeBlock } from '../components/ui/primitives';

const DOCS = [
  {
    slug: 'hollow-technologies',
    title: 'Hollow Technologies',
    section: 'Company',
    body: (
      <>
        <p className="lede">The parent ecosystem: what it is, and how the pieces relate.</p>
        <p>Hollow Technologies is an independent technology ecosystem. Its projects fall into three tiers: <strong>flagship systems</strong> (Rafael, Nix), <strong>the live product</strong> (HollowLink), and <strong>supporting systems</strong> (Iris, Sentinel, Nova, Atlas, Sovereign, Forge) that plug into the core as it matures.</p>
        <h2>Core principles</h2>
        <ul>
          <li><strong>Systems, not apps</strong> — every project declares its capabilities to the ecosystem.</li>
          <li><strong>Local-first</strong> — intelligence runs where the data lives, by default.</li>
          <li><strong>Honest status</strong> — active, in-development, experimental, planned. Never inflated.</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'ecosystem',
    title: 'Ecosystem',
    section: 'Architecture',
    body: (
      <>
        <p className="lede">How nine projects become one organism.</p>
        <p>The intended architecture is hub-and-spoke: <strong>Rafael</strong> maintains a capability registry and routes intent. Each spoke system (Nix, Atlas, Iris…) registers what it can do and accepts delegated work. Products like <strong>HollowLink</strong> expose user-facing surfaces that other systems can attach to through its extension framework.</p>
        <h2>Communication model</h2>
        <p>Systems talk through defined interfaces — a capability contract, not shared databases. This keeps each system independently runnable and testable.</p>
        <CodeBlock title="capability contract (concept)" code={`interface Capability {
  id: string;              // 'nix.code.edit'
  description: string;
  permissions: string[];   // least privilege, explicitly granted
  invoke(input: unknown): Promise<CapabilityResult>;
}`} />
      </>
    ),
  },
  {
    slug: 'nix',
    title: 'Nix',
    section: 'Systems',
    body: (
      <>
        <p className="lede">The coding intelligence: local-first agent for real projects.</p>
        <h2>Working modes</h2>
        <p>Nix operates against your filesystem and toolchain with three permission postures:</p>
        <CodeBlock title="permission modes" lang="text" code={`full access      →  read, write, run
ask before doing →  confirm consequential actions
read only        →  analysis without modification`} />
        <h2>Core tools</h2>
        <ul>
          <li>File operations with reviewable diffs</li>
          <li>Project-wide search (names, symbols, content)</li>
          <li>Test running with failure reasoning <span className="dim">(in development)</span></li>
          <li>Git inspection and draft commits <span className="dim">(in development)</span></li>
        </ul>
      </>
    ),
  },
  {
    slug: 'rafael',
    title: 'Rafael',
    section: 'Systems',
    body: (
      <>
        <p className="lede">The intended core: orchestration, registry, routing.</p>
        <p>Rafael is in early design. The model: every Hollow system registers capabilities; Rafael routes intents to the best-suited system and tracks outcomes. Its first prototype milestone is registering two systems and completing one routed task end-to-end.</p>
      </>
    ),
  },
  {
    slug: 'hollowlink',
    title: 'HollowLink',
    section: 'Product',
    body: (
      <>
        <p className="lede">The live product: private social platform with a customization engine and extension framework.</p>
        <h2>Self-hosting quick start</h2>
        <CodeBlock title="terminal" lang="bash" code={`git clone https://github.com/sssant1015-cmyk/hollowlink
cd hollowlink
npm install
cp .env.example .env     # set JWT_SECRET for anything public
npm run migrate
npm run seed             # optional demo data
npm run dev`} />
        <h2>Extension model</h2>
        <p>Extensions declare validated manifests and request permissions; users grant them explicitly. Server-side authorization always mediates — extensions cannot bypass core permission checks.</p>
      </>
    ),
  },
  {
    slug: 'development',
    title: 'Development',
    section: 'Guides',
    body: (
      <>
        <p className="lede">How Hollow projects are built and tested.</p>
        <h2>Toolchain</h2>
        <p>TypeScript everywhere, Vite for frontends, Node.js backends, Zod validation at boundaries, Vitest for tests. Tests run before anything is called done.</p>
        <CodeBlock title="site toolchain" lang="bash" code={`npm install
npm run dev        # local dev server
npm run test       # component + data tests
npm run build      # typecheck + production build`} />
      </>
    ),
  },
  {
    slug: 'security',
    title: 'Security',
    section: 'Guides',
    body: (
      <>
        <p className="lede">Defensive practices and disclosure.</p>
        <p>Hollow systems use hashed credentials, httpOnly session cookies, per-endpoint authorization and validated inputs. Intelligence is local-first; no telemetry is collected from user devices. Vulnerabilities: use GitHub security advisories or the contact form with type "Security disclosure".</p>
      </>
    ),
  },
];

const SECTIONS = [...new Set(DOCS.map((d) => d.section))];

export function DocsPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = DOCS.find((d) => d.slug === slug) ?? DOCS[0]!;
  return (
    <>
      <Seo title={`${doc.title} — Docs`} description={`Documentation: ${doc.title} in the Hollow Technologies ecosystem.`} />
      <div className="wrap docs-layout">
        <aside className="docs-side" aria-label="Documentation navigation">
          {SECTIONS.map((s) => (
            <div key={s}>
              <h4>{s}</h4>
              {DOCS.filter((d) => d.section === s).map((d) => (
                <NavLink key={d.slug} to={`/docs/${d.slug}`} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {d.title}
                </NavLink>
              ))}
            </div>
          ))}
        </aside>
        <div className="docs-body">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Hollow Technologies</Link> <span>/</span> <Link to="/docs">Docs</Link> <span>/</span> <span>{doc.title}</span>
          </nav>
          <Reveal key={doc.slug}>
            <h1 className="display" style={{ fontSize: 'var(--fs-h2)' }}>{doc.title}</h1>
            <div style={{ marginTop: 'var(--space-3)' }}>{doc.body}</div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

export function DocsIndex() {
  return <DocsPage />;
}
