import '@testing-library/jest-dom/vitest';

// jsdom lacks matchMedia — stub it before anything runs.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// jsdom lacks IntersectionObserver (used by Reveal) — stub as "immediately visible".
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  class IO {
    constructor(cb: IntersectionObserverCallback) {
      // reveal everything synchronously
      queueMicrotask(() => cb([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver));
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
    root = null;
    rootMargin = '';
    thresholds = [];
  }
  (window as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver = IO as unknown as typeof IntersectionObserver;
}
