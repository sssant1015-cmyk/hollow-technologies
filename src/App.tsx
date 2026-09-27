import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { PrefsProvider } from './lib/prefs';
import { Header } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { CommandPalette } from './components/ui/CommandPalette';
import { Sigil } from './components/ui/Sigil';
import { Seo } from './components/ui/Seo';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/interior').then((m) => ({ default: m.About })));
const Technology = lazy(() => import('./pages/interior').then((m) => ({ default: m.Technology })));
const Labs = lazy(() => import('./pages/interior').then((m) => ({ default: m.Labs })));
const ProjectsIndex = lazy(() => import('./pages/projects').then((m) => ({ default: m.ProjectsIndex })));
const ProjectDetail = lazy(() => import('./pages/projects').then((m) => ({ default: m.ProjectDetail })));
const NixPage = lazy(() => import('./pages/projects').then((m) => ({ default: m.NixPage })));
const HollowLinkPage = lazy(() => import('./pages/projects').then((m) => ({ default: m.HollowLinkPage })));
const Roadmap = lazy(() => import('./pages/records').then((m) => ({ default: m.Roadmap })));
const Changelog = lazy(() => import('./pages/records').then((m) => ({ default: m.Changelog })));
const Contact = lazy(() => import('./pages/records').then((m) => ({ default: m.Contact })));
const Legal = lazy(() => import('./pages/records').then((m) => ({ default: m.Legal })));
const LegalTerms = lazy(() => import('./pages/records').then((m) => ({ default: m.LegalTerms })));
const LegalSecurity = lazy(() => import('./pages/records').then((m) => ({ default: m.LegalSecurity })));
const DocsPage = lazy(() => import('./pages/Docs').then((m) => ({ default: m.DocsPage })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function NotFound() {
  return (
    <>
      <Seo title="404" description="This page drifted into the void." />
      <section className="page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap">
          <p className="eyebrow">404 · Lost in the void</p>
          <h1 className="display">This system doesn't exist.</h1>
          <p style={{ marginTop: 'var(--space-3)' }}>
            <Link to="/" className="btn btn-primary">Return to the core</Link>
          </p>
        </div>
      </section>
    </>
  );
}

function Loading() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }} aria-label="Loading">
      <Sigil size={44} animated />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PrefsProvider>
        <ScrollToTop />
        <a href="#main" className="btn btn-sm" style={{ position: 'fixed', top: -60, left: 16, zIndex: 200, transition: 'top 0.2s' }}
          onFocus={(e) => (e.currentTarget.style.top = '12px')} onBlur={(e) => (e.currentTarget.style.top = '-60px')}>
          Skip to content
        </a>
        <Header />
        <CommandPalette />
        <main id="main">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/ecosystem" element={<EcosystemPageLazy />} />
              <Route path="/projects" element={<ProjectsIndex />} />
              <Route path="/projects/nix" element={<NixPage />} />
              <Route path="/projects/hollowlink" element={<HollowLinkPage />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs/:slug" element={<DocsPage />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal/privacy" element={<Legal />} />
              <Route path="/legal/terms" element={<LegalTerms />} />
              <Route path="/legal/security" element={<LegalSecurity />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </PrefsProvider>
    </BrowserRouter>
  );
}

// Ecosystem gets its own lazy chunk (graph + detail panel)
const EcosystemPageLazy = lazy(() => import('./pages/Ecosystem').then((m) => ({ default: m.EcosystemPage })));
