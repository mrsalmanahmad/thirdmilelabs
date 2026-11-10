import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/actions/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { Logo } from "@/components/Logo";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const [unreadMessages, unreadApps] = await Promise.all([
    prisma.message.count({ where: { read: false } }),
    prisma.application.count({ where: { read: false } }),
  ]);

  const items = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/messages", label: "Messages", badge: unreadMessages },
    { href: "/admin/applications", label: "Applications", badge: unreadApps },
    { href: "/admin/jobs", label: "Jobs" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/content", label: "Site content" },
  ];

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-line bg-surface lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-5 lg:py-7">
          <Logo href="/admin" compact />
        </div>
        <div className="px-3 pb-3 lg:flex-1">
          <AdminNav items={items} />
        </div>
        <div className="hidden space-y-1 border-t border-line p-3 lg:block">
          <Link href="/" target="_blank" className="block px-3 py-2 text-sm text-muted hover:text-white">
            View site ↗
          </Link>
          <form action={logout}>
            <button className="w-full px-3 py-2 text-left text-sm text-muted hover:text-white">Sign out</button>
          </form>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:py-12">{children}</div>
        <div className="flex gap-4 border-t border-line px-5 py-4 text-sm text-muted lg:hidden">
          <Link href="/" target="_blank">View site ↗</Link>
          <form action={logout}><button>Sign out</button></form>
        </div>
      </div>
    </div>
  );
}
