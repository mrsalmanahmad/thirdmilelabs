/** Large, faint chevrons used as a background motif (from the brand flyers). */
export function Chevrons({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 600"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M20 20 L200 300 L20 580" stroke="var(--color-ghost)" strokeWidth="44" />
      <path d="M220 20 L400 300 L220 580" stroke="var(--color-ghost)" strokeWidth="44" />
      <path d="M450 50 L560 300 L450 550 Z" fill="var(--color-ghost)" />
    </svg>
  );
}
