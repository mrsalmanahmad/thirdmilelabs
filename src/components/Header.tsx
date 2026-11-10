"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ArrowRight } from "./ui";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Header({ openRoles }: { openRoles: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled || open ? "border-line bg-ink/85" : "border-transparent bg-ink/0"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo compact />

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-2 text-sm font-medium transition-colors duration-200 ${
                  active ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {item.label}
                {item.href === "/careers" && openRoles > 0 && (
                  <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center bg-white px-1 font-mono text-[11px] font-medium text-ink">
                    {openRoles}
                  </span>
                )}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-white transition-transform duration-300 ease-out ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <Link href="/contact" className="btn-solid !py-2.5 !text-sm">
            Start a project <ArrowRight />
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line-strong transition-colors hover:border-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-0.5 w-4 bg-white transition-all duration-300 ease-out ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-4 bg-white transition-all duration-300 ease-out ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu: height animates via grid rows, links slide in one after another */}
      <div
        id="mobile-nav"
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav className="h-[calc(100dvh-5rem)] overflow-hidden" aria-label="Mobile">
          <div className="flex flex-col border-t border-line px-5 py-4">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                className={`font-display flex items-center justify-between border-b border-line py-5 text-3xl font-bold tracking-tight transition-all duration-500 ease-out ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                } ${pathname.startsWith(item.href) ? "text-white" : "text-white/80"}`}
              >
                <span>
                  {item.label}
                  {item.href === "/careers" && openRoles > 0 && (
                    <span className="ml-2 text-sm font-medium text-muted">({openRoles} open)</span>
                  )}
                </span>
                <ArrowRight className="h-5 w-5 text-muted" />
              </Link>
            ))}
            <Link
              href="/contact"
              style={{ transitionDelay: open ? `${80 + NAV.length * 50}ms` : "0ms" }}
              className={`btn-solid mt-6 justify-center transition-all duration-500 ease-out ${
                open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              Start a project
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
