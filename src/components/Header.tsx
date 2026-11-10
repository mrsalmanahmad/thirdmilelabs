"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Header({ openRoles }: { openRoles: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo compact />

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${active ? "text-white" : "text-muted hover:text-white"}`}
              >
                {item.label}
                {item.href === "/careers" && openRoles > 0 && (
                  <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center bg-white px-1 text-[11px] font-semibold text-ink">
                    {openRoles}
                  </span>
                )}
              </Link>
            );
          })}
          <Link href="/contact" className="btn-solid !py-2.5 !text-sm">
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-line-strong md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 block h-0.5 w-4 bg-white transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 block h-0.5 w-4 bg-white transition ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-ink md:hidden" aria-label="Mobile">
          <div className="flex flex-col px-5 py-4">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-line py-4 text-lg font-semibold">
                {item.label}
                {item.href === "/careers" && openRoles > 0 && (
                  <span className="ml-2 text-sm font-medium text-muted">({openRoles} open)</span>
                )}
              </Link>
            ))}
            <Link href="/contact" className="btn-solid mt-5 justify-center">
              Start a project
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
