import { Link } from 'react-router-dom';
import { Sigil } from '../ui/Sigil';
import { PROJECTS } from '../../content/projects';

export function Footer() {
  const flagshipAndProduct = PROJECTS.filter((p) => p.category !== 'supporting');
  const supporting = PROJECTS.filter((p) => p.category === 'supporting');
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand" style={{ marginBottom: 12 }}>
              <Sigil size={30} />
              <span className="wordmark">HOLLOW TECHNOLOGIES<small>Build beyond the ordinary</small></span>
            </div>
            <p>An independent technology ecosystem — intelligent systems, developer tools, and one product you can use today.</p>
          </div>

          <div>
            <h5>Explore</h5>
            <Link to="/ecosystem">Ecosystem</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/labs">Labs</Link>
            <Link to="/technology">Technology</Link>
            <Link to="/docs">Documentation</Link>
          </div>

          <div>
            <h5>Products & Flagships</h5>
            {flagshipAndProduct.map((p) => (
              <Link key={p.id} to={`/projects/${p.slug}`}>{p.name}</Link>
            ))}
          </div>

          <div>
            <h5>Systems</h5>
            {supporting.map((p) => (
              <Link key={p.id} to={`/projects/${p.slug}`}>{p.name}</Link>
            ))}
          </div>

          <div>
            <h5>Company</h5>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/changelog">Changelog</Link>
            <Link to="/legal/privacy">Privacy</Link>
            <Link to="/legal/terms">Terms</Link>
            <Link to="/legal/security">Security</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Hollow Technologies — Build. Connect. Evolve.</span>
          <span className="mono">void → energy → intelligence → systems</span>
        </div>
      </div>
    </footer>
  );
}
