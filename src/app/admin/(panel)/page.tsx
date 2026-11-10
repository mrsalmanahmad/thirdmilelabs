import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Badge, PageHeader } from "@/components/admin/kit";

export default async function Dashboard() {
  const [unreadMsg, unreadApp, openJobs, projects, recentMsgs, recentApps] = await Promise.all([
    prisma.message.count({ where: { read: false } }),
    prisma.application.count({ where: { read: false } }),
    prisma.job.count({ where: { published: true } }),
    prisma.project.count({ where: { published: true } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.application.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { job: { select: { title: true } } } }),
  ]);

  const stats = [
    { label: "Unread messages", value: unreadMsg, href: "/admin/messages" },
    { label: "New applications", value: unreadApp, href: "/admin/applications" },
    { label: "Open jobs", value: openJobs, href: "/admin/jobs" },
    { label: "Live projects", value: projects, href: "/admin/projects" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" sub="Overview of enquiries, hiring and site content.">
        <Link href="/admin/jobs/new" className="btn-solid !py-2.5 !text-sm">+ Post a job</Link>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 transition-colors hover:border-white/50">
            <p className="text-4xl font-bold">{s.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Latest messages</h2>
          <div className="card divide-y divide-line">
            {recentMsgs.length === 0 && <p className="p-5 text-sm text-muted">No messages yet.</p>}
            {recentMsgs.map((m) => (
              <Link key={m.id} href={`/admin/messages#m${m.id}`} className="block p-4 hover:bg-raised">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate font-semibold">{m.name}</p>
                  {!m.read && <Badge tone="solid">New</Badge>}
                </div>
                <p className="mt-1 truncate text-sm text-muted">{m.message}</p>
                <p className="mt-1 text-xs text-neutral-500">{formatDate(m.createdAt)}</p>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Latest applications</h2>
          <div className="card divide-y divide-line">
            {recentApps.length === 0 && <p className="p-5 text-sm text-muted">No applications yet.</p>}
            {recentApps.map((a) => (
              <Link key={a.id} href={`/admin/applications#a${a.id}`} className="block p-4 hover:bg-raised">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate font-semibold">{a.name}</p>
                  {!a.read && <Badge tone="solid">New</Badge>}
                </div>
                <p className="mt-1 truncate text-sm text-muted">{a.job.title}</p>
                <p className="mt-1 text-xs text-neutral-500">{formatDate(a.createdAt)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
