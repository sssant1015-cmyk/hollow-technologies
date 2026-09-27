import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Theme = 'dark' | 'light' | 'system';
export type Accent = 'purple' | 'blue' | 'ember';
export type Motion = 'reduced' | 'normal' | 'cinematic';
export type Density = 'compact' | 'comfortable' | 'spacious';

interface Prefs {
  theme: Theme;
  accent: Accent;
  motion: Motion;
  density: Density;
  set: (patch: Partial<Omit<Prefs, 'set'>>) => void;
}

const KEY = 'hollowtech.prefs';
const defaults = { theme: 'dark' as Theme, accent: 'purple' as Accent, motion: 'cinematic' as Motion, density: 'comfortable' as Density };

function load(): typeof defaults {
  try {
    return { ...defaults, ...(JSON.parse(localStorage.getItem(KEY) ?? '{}') as typeof defaults) };
  } catch {
    return { ...defaults };
  }
}

const PrefsContext = createContext<Prefs | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState(load);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = prefs.theme === 'system' ? (systemDark ? 'dark' : 'light') : prefs.theme;
    root.dataset.theme = resolved;
    root.dataset.accent = prefs.accent;
    root.dataset.motion = prefs.motion === 'cinematic' ? 'cinematic' : prefs.motion;
    root.dataset.density = prefs.density;
    localStorage.setItem(KEY, JSON.stringify(prefs));
  }, [prefs]);

  // system theme tracking
  useEffect(() => {
    if (prefs.theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      document.documentElement.dataset.theme = mq.matches ? 'dark' : 'light';
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [prefs.theme]);

  const value = useMemo<Prefs>(
    () => ({ ...prefs, set: (patch: Partial<Omit<Prefs, 'set'>>) => setPrefs((p) => ({ ...p, ...patch })) }),
    [prefs],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs(): Prefs {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('usePrefs outside PrefsProvider');
  return ctx;
}
