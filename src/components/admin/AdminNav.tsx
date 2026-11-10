"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; badge?: number };

export function AdminNav({ items }: { items: Item[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Admin">
      {items.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex shrink-0 items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-white text-ink" : "text-muted hover:bg-raised hover:text-white"
            }`}
          >
            {item.label}
            {!!item.badge && (
              <span className={`px-1.5 text-[11px] font-semibold ${active ? "bg-ink text-white" : "bg-white text-ink"}`}>
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
