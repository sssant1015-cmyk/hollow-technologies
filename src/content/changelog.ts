export interface ChangelogEntry {
  project: string;          // project id or 'hollow-technologies'
  version: string;
  date: string;             // ISO date
  category: 'added' | 'changed' | 'fixed' | 'security' | 'performance' | 'experimental';
  summary: string;
  changes: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    project: 'hollowlink',
    version: '0.2.0',
    date: '2026-09-27',
    category: 'added',
    summary: 'Customization engine and extension framework.',
    changes: [
      'Centralized theming: dark/light/system, 8 preset themes, custom colors with contrast warnings',
      'Fonts, text size, UI scale, radius, animation and effect controls with live preview',
      'Per-user preferences synced server-side with validation and local offline persistence',
      'Extension framework: validated manifests, permission consent, sandboxed panels',
      'Three builtin demo extensions (Hello, Theme Showcase, Test Widget)',
    ],
  },
  {
    project: 'hollowlink',
    version: '0.1.2',
    date: '2026-09-26',
    category: 'fixed',
    summary: 'Mobile navigation and sharing fixes.',
    changes: [
      'Mobile bottom nav now reaches Notifications, Profile and Settings',
      'Tunnel/CORS fix so the app works through public share links',
      'One-click launcher with automatic tunnel URL capture',
    ],
  },
  {
    project: 'hollowlink',
    version: '0.1.1',
    date: '2026-09-26',
    category: 'security',
    summary: 'Invite-gated registration and admin tooling.',
    changes: [
      'Optional invite-code gate for registration (timing-safe comparison)',
      'Admin promotion CLI and enforced notification preferences',
      'Server-side same-origin handling hardened',
    ],
  },
  {
    project: 'hollowlink',
    version: '0.1.0',
    date: '2026-09-25',
    category: 'added',
    summary: 'First working release of the platform.',
    changes: [
      'Authentication, profiles, friends, groups with roles, feed, reactions, comments',
      'Real-time chat over WebSockets with typing indicators and read state',
      'Events with RSVPs, notifications, moderation reports, global search',
      '49 backend and frontend tests; production build verified',
    ],
  },
  {
    project: 'hollow-technologies',
    version: '0.1.0',
    date: '2026-09-27',
    category: 'added',
    summary: 'The Hollow Technologies website goes online.',
    changes: [
      'Brand identity: dragon sigil, energy-field hero, dark-first design system',
      'Nine-system ecosystem with interactive graph and project pages',
      'Documentation hub, roadmap, changelog and command-palette search',
    ],
  },
];

export const CATEGORY_LABELS: Record<ChangelogEntry['category'], string> = {
  added: 'Added',
  changed: 'Changed',
  fixed: 'Fixed',
  security: 'Security',
  performance: 'Performance',
  experimental: 'Experimental',
};
