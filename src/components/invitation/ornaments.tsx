/** Original decorative SVG frames — not copied from any brand. */

export function GoldFrame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 320" className={className} aria-hidden fill="none">
      <rect x="6" y="6" width="188" height="308" rx="10" stroke="currentColor" strokeWidth="0.7" />
      <rect x="12" y="12" width="176" height="296" rx="7" stroke="currentColor" strokeWidth="0.35" opacity="0.7" />
      <path d="M20 28 C40 18, 160 18, 180 28" stroke="currentColor" strokeWidth="0.5" />
      <path d="M20 292 C40 302, 160 302, 180 292" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export function StarMedallion({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill="none">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.4" />
      <path
        d="M50 12 L54 38 L80 30 L62 50 L80 70 L54 62 L50 88 L46 62 L20 70 L38 50 L20 30 L46 38 Z"
        stroke="currentColor"
        strokeWidth="0.7"
      />
    </svg>
  );
}

export function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden fill="none">
      <path
        d="M8 72 C12 40, 40 20, 72 12"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path d="M18 58 C28 48, 42 44, 50 36" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="22" cy="50" r="4" stroke="currentColor" />
      <circle cx="40" cy="38" r="5" stroke="currentColor" />
      <circle cx="56" cy="24" r="3.5" stroke="currentColor" />
    </svg>
  );
}
