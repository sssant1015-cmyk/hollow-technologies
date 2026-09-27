import { useEffect } from 'react';

const SITE = 'Hollow Technologies';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Per-page metadata: title, description, Open Graph, Twitter. */
export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title === SITE ? `${SITE} — Build beyond the ordinary` : `${title} · ${SITE}`;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', document.title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SITE);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', document.title);
    setMeta('name', 'twitter:description', description);
  }, [title, description]);
  return null;
}
