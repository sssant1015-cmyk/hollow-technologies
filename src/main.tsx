import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/theme.css';
import './styles/site.css';

// Approved Google Fonts — curated set, display=swap for fast paint.
const fonts = document.createElement('link');
fonts.rel = 'stylesheet';
fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap';
document.head.appendChild(fonts);

// React Router needs the deploy base path on GitHub Pages ("/hollow-technologies/").
// Derive it from the URL itself: on Pages the app always lives under
// /hollow-technologies/; locally there is no subpath.
const pathParts = location.pathname.split('/').filter(Boolean);
const isPagesDeploy = location.hostname.endsWith('github.io');
const basename = isPagesDeploy && pathParts[0] ? `/${pathParts[0]}` : '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
