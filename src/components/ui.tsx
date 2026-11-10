import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Chevrons } from "./Chevrons";

/* ---------- Icons (24px grid, 1.75 stroke, square caps to match the chevron mark) ---------- */

type IconProps = { className?: string };

export function ArrowRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" className={`nudge ${className}`} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" className={`nudge nudge-up ${className}`} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Small chevron bullet for lists, echoing the logo. */
export function Bullet({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" className={`mt-[0.45em] h-2.5 w-2.5 shrink-0 text-muted ${className}`} aria-hidden="true">
      <path d="M3 1.5 7.5 6 3 10.5" />
    </svg>
  );
}

/** Kept for existing call sites: an arrow that nudges on group hover. */
export function Arrow({ className = "" }: IconProps) {
  return <ArrowRight className={`h-4 w-4 ${className}`} />;
}

/* ---------- Labels ---------- */

/** Bordered uppercase tag, e.g. "WE'RE HIRING". */
export function BoxLabel({ children, live = false }: { children: ReactNode; live?: boolean }) {
  return (
    <span className="label-mono inline-flex items-center gap-3 border border-white/70 bg-ink/60 px-4 py-2.5 text-white backdrop-blur-sm">
      {live && <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" aria-hidden="true" />}
      {children}
    </span>
  );
}

/** Small muted uppercase section label, e.g. "WHAT YOU'LL DO". */
export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`label-mono flex items-center gap-3 text-muted ${className}`}>
      <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
      {children}
    </p>
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

/* ---------- Buttons & links ---------- */

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

/** Text link with a trailing arrow, used in section headers. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-muted"
    >
      {children}
      <ArrowRight />
    </Link>
  );
}

/** Back link at the top of detail pages. */
export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-white">
      <ArrowLeft />
      {children}
    </Link>
  );
}

/* ---------- Layout ---------- */

export function Container({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & Omit<ComponentProps<"div">, "className" | "children">) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** Label + headline on the left, optional "see all" link on the right. */
export function SectionHeader({
  label,
  title,
  link,
  className = "mb-14",
}: {
  label: ReactNode;
  title: ReactNode;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div data-reveal className={`flex flex-col justify-between gap-6 md:flex-row md:items-end ${className}`}>
      <div>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{title}</h2>
      </div>
      {link && <MoreLink href={link.href}>{link.label}</MoreLink>}
    </div>
  );
}

/** Top-of-page hero shared by every inner page. */
export function PageHero({
  label,
  title,
  intro,
  back,
  children,
  size = "md",
}: {
  label: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  back?: { href: string; label: string };
  children?: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Chevrons className="chevrons-in absolute -right-40 top-0 h-[560px] sm:-right-10" />
      <Container className="rise relative py-16 sm:py-24">
        {back ? <BackLink href={back.href}>{back.label}</BackLink> : null}
        <div className={back ? "mt-8" : undefined}>
          <BoxLabel>{label}</BoxLabel>
        </div>
        <h1
          className={`mt-10 max-w-4xl font-bold tracking-[-0.035em] ${
            size === "lg" ? "text-[clamp(3rem,9vw,6.5rem)] leading-[0.95]" : "text-[clamp(2.5rem,7vw,5rem)] leading-[1]"
          }`}
        >
          {title}
        </h1>
        {intro ? <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{intro}</p> : null}
        {children}
      </Container>
    </section>
  );
}
