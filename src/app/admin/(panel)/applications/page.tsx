import Link from "next/link";
import { deleteApplication, setApplicationRead } from "@/actions/admin";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { Badge, PageHeader } from "@/components/admin/kit";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

type Props = { searchParams: Promise<{ job?: string }> };

export default async function ApplicationsPage({ searchParams }: Props) {
  const { job } = await searchParams;
  const jobId = Number(job) || undefined;
  const [jobs, apps] = await Promise.all([
    prisma.job.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { applications: true } } } }),
    prisma.application.findMany({
      where: jobId ? { jobId } : undefined,
      orderBy: [{ read: "asc" }, { createdAt: "desc" }],
      include: { job: { select: { title: true } } },
    }),
  ]);

  return (
    <>
      <PageHeader title="Applications" sub="Candidates who applied through the careers page." />

      <div className="mb-6 flex flex-wrap gap-2">
        <Link href="/admin/applications" className={`px-3 py-1.5 text-sm ${!jobId ? "bg-white text-ink" : "border border-line-strong text-muted hover:text-white"}`}>
          All
        </Link>
        {jobs.map((j) => (
          <Link
            key={j.id}
            href={`/admin/applications?job=${j.id}`}
            className={`px-3 py-1.5 text-sm ${jobId === j.id ? "bg-white text-ink" : "border border-line-strong text-muted hover:text-white"}`}
          >
            {j.title} ({j._count.applications})
          </Link>
        ))}
      </div>

      {apps.length === 0 && <p className="text-muted">No applications yet.</p>}
      <div className="space-y-4">
        {apps.map((a) => (
          <article key={a.id} id={`a${a.id}`} className={`card p-6 ${a.read ? "opacity-70" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold">{a.name}</h2>
                  {!a.read && <Badge tone="solid">New</Badge>}
                </div>
                <p className="text-sm text-muted">{a.job.title}</p>
              </div>
              <p className="text-xs text-neutral-500">{formatDate(a.createdAt)}</p>
            </div>
            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <div><dt className="inline text-muted">Email: </dt><dd className="inline"><a className="hover:underline" href={`mailto:${a.email}`}>{a.email}</a></dd></div>
              {a.phone && <div><dt className="inline text-muted">Phone: </dt><dd className="inline">{a.phone}</dd></div>}
              <div><dt className="inline text-muted">CV: </dt><dd className="inline"><a className="underline" href={a.cvUrl} target="_blank" rel="noopener noreferrer">Open CV ↗</a></dd></div>
              {a.linkedin && <div><dt className="inline text-muted">Profile: </dt><dd className="inline"><a className="underline" href={a.linkedin} target="_blank" rel="noopener noreferrer">Open ↗</a></dd></div>}
            </dl>
            {a.message && <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed">{a.message}</p>}
            <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-line pt-4 text-sm">
              <form action={setApplicationRead}>
                <input type="hidden" name="id" value={a.id} />
                <input type="hidden" name="read" value={a.read ? "0" : "1"} />
                <button className="text-muted hover:text-white">{a.read ? "Mark unreviewed" : "Mark reviewed"}</button>
              </form>
              <form action={deleteApplication} className="ml-auto">
                <input type="hidden" name="id" value={a.id} />
                <ConfirmButton message={`Delete application from ${a.name}?`}>Delete</ConfirmButton>
              </form>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
