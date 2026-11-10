import Link from "next/link";

/** The Third Mile mark: two open chevrons followed by a solid arrowhead. */
export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 76 72" className={className} fill="none" aria-hidden="true">
      <path d="M3 3 L25 36 L3 69" stroke="currentColor" strokeWidth="6.5" strokeLinejoin="miter" />
      <path d="M27 3 L49 36 L27 69" stroke="currentColor" strokeWidth="6.5" strokeLinejoin="miter" />
      <path d="M54 12 L73 36 L54 60 Z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ href = "/", compact = false }: { href?: string; compact?: boolean }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3 text-white" aria-label="Third Mile Labs home">
      <LogoMark className={compact ? "h-7 w-auto" : "h-9 w-auto"} />
      <span className="flex flex-col leading-none">
        <span className={`${compact ? "text-[15px]" : "text-lg"} font-bold tracking-[0.08em]`}>THIRD MILE</span>
        <span className={`${compact ? "mt-1 text-[8px]" : "mt-1.5 text-[9px]"} font-medium tracking-[0.55em] text-muted`}>
          LABS
        </span>
      </span>
    </Link>
  );
}
