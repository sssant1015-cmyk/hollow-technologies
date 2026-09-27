/**
 * The Hollow sigil — a coiled energy-dragon rendered as pure geometry.
 * Not an "H in a circle": a serpentine line that coils into a hollow
 * core, with circuit nodes at head and tail. Parametric so it renders
 * at any size, animates, and doubles as favicon/app-icon.
 */
export function Sigil({ size = 34, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="hlg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--accent-soft)" />
          <stop offset="1" stopColor="var(--signal)" />
        </linearGradient>
        <radialGradient id="hlc" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* hollow core */}
      <circle cx="32" cy="32" r="15" fill="url(#hlc)" className={animated ? 'sigil-pulse' : undefined} />
      <circle cx="32" cy="32" r="9" stroke="url(#hlg)" strokeOpacity="0.35" strokeWidth="1" />

      {/* serpentine dragon body — one continuous coil around the void */}
      <path
        d="M 50 14
           C 38 10, 20 14, 16 26
           C 12.5 36.5, 22 42, 32 40.5
           C 40 39.3, 44 34, 41 28.5
           C 38.4 23.6, 30.5 23, 26.5 27
           C 23.4 30.1, 25 35.5, 30 36"
        stroke="url(#hlg)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* head — angular snout, not cartoonish */}
      <path d="M 50 14 L 57 11.5 L 51.5 19.5" stroke="url(#hlg)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* eye-node */}
      <circle cx="47.4" cy="15.6" r="1.7" fill="var(--accent-soft)" className={animated ? 'sigil-eye' : undefined} />

      {/* circuit nodes trailing the tail */}
      <circle cx="30" cy="36" r="1.6" fill="var(--signal)" />
      <circle cx="16" cy="26" r="1.3" fill="var(--signal)" opacity="0.7" />
    </svg>
  );
}
