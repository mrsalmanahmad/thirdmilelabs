import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Bordered uppercase tag, e.g. "WE'RE HIRING". */
export function BoxLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-white/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white">
      {children}
    </span>
  );
}

/** Small muted uppercase section label, e.g. "WHAT YOU'LL DO". */
export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-muted ${className}`}>{children}</p>
  );
}

export function Chip({ children, solid = false }: { children: ReactNode; solid?: boolean }) {
  return (
    <span
      className={
        solid
          ? "inline-flex items-center border border-white bg-white px-4 py-2 text-sm font-medium text-ink"
          : "inline-flex items-center border border-line-strong px-4 py-2 text-sm font-medium text-white"
      }
    >
      {children}
    </span>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "solid" | "outline"; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>;

export function ButtonLink({ href, children, variant = "solid", className = "", ...rest }: BtnProps) {
  return (
    <Link
      href={href}
      className={`${variant === "solid" ? "btn-solid" : "btn-outline"} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return <span className={`inline-block transition-transform group-hover:translate-x-1 ${className}`}>→</span>;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
