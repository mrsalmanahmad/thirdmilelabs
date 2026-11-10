import Link from "next/link";
import { deleteJob, toggleJob } from "@/actions/admin";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { Badge, Flash, PageHeader } from "@/components/admin/kit";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function JobsPage({ searchParams }: Props) {
  const { saved } = await searchParams;
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });

  return (
    <>
      <PageHeader title="Jobs" sub="Post, edit, pause or remove job openings.">
        <Link href="/admin/jobs/new" className="btn-solid !py-2.5 !text-sm">+ Post a job</Link>
      </PageHeader>
      <Flash saved={saved} />
      {jobs.length === 0 && <p className="text-muted">No jobs yet.</p>}
      <div className="card divide-y divide-line">
        {jobs.map((j) => (
          <div key={j.id} className="flex flex-wrap items-center gap-4 p-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <Link href={`/admin/jobs/${j.id}`} className="truncate text-lg font-semibold hover:underline">{j.title}</Link>
                {j.published ? <Badge tone="solid">Live</Badge> : <Badge>Hidden</Badge>}
              </div>
              <p className="mt-1 text-sm text-muted">
                {j.location} · {j.employment} ·{" "}
                <Link href={`/admin/applications?job=${j.id}`} className="underline">{j._count.applications} application{j._count.applications === 1 ? "" : "s"}</Link>
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              {j.published && (
                <Link href={`/careers/${j.slug}`} target="_blank" className="text-muted hover:text-white">View ↗</Link>
              )}
              <Link href={`/admin/jobs/${j.id}`} className="text-muted hover:text-white">Edit</Link>
              <form action={toggleJob}>
                <input type="hidden" name="id" value={j.id} />
                <button className="text-muted hover:text-white">{j.published ? "Hide" : "Publish"}</button>
              </form>
              <form action={deleteJob}>
                <input type="hidden" name="id" value={j.id} />
                <ConfirmButton message={`Delete "${j.title}" and all its applications?`}>Delete</ConfirmButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
