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
// Locally Vite serves at "/", so derive it from where the script is loaded from.
const script = document.querySelector('script[type="module"]') as HTMLScriptElement | null;
const basePath = script?.src
  ? new URL('.', script.src).pathname.replace(/\/$/, '')
  : '';
const isPagesDeploy = location.hostname.endsWith('github.io');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={isPagesDeploy && basePath ? basePath : '/'}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
