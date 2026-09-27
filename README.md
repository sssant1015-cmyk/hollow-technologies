# Hollow Technologies — Website

The official digital headquarters of **Hollow Technologies**: an interconnected ecosystem of
AI systems, developer tools, and digital products.

> Build beyond the ordinary.

## Stack

- **React 18 + TypeScript + Vite** — fast SPA with route-level code splitting
- **No UI framework** — a hand-built design system (`src/styles/`) with design tokens,
  dark/light/system themes, three accents, motion levels and density settings
- **Content-as-data** — every project, lab, roadmap item and changelog entry lives in
  `src/content/` as typed TypeScript data; components never hard-code project facts
- **Vitest + Testing Library** — content-integrity and component tests

## Commands

```bash
npm install
npm run dev        # dev server on :5175
npm run test       # test suite
npm run build      # typecheck + production build
npm run preview    # serve the production build
```

## Structure

```
src/
├── components/
│   ├── ui/          # Sigil (brand mark), primitives, command palette, SEO
│   ├── navigation/  # Header, Footer
│   ├── ecosystem/   # Interactive ecosystem graph
│   └── motion/      # EnergyField hero canvas (Signal Weave)
├── content/         # projects, labs, roadmap, changelog, tech — single source of truth
├── lib/             # preference system (theme/accent/motion/density)
├── pages/           # Home, Ecosystem, Projects (+ detail), Nix, HollowLink, Labs,
│                    # Technology, About, Docs, Roadmap, Changelog, Contact, Legal
└── styles/          # theme.css (tokens) + site.css (components)
```

## Principles

- **Honest statuses everywhere** — Active / In Development / Experimental / Planned.
  Nothing pretends to exist when it doesn't.
- **Accessible** — semantic HTML, keyboard navigation, focus states, reduced-motion support.
- **Performant** — code splitting, canvas capped and paused for `prefers-reduced-motion`,
  no heavyweight animation libraries.
