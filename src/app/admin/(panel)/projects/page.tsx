import Link from "next/link";
import { deleteProject } from "@/actions/admin";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { Badge, Flash, PageHeader } from "@/components/admin/kit";
import { prisma } from "@/lib/db";
import { hostname } from "@/lib/utils";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const { saved } = await searchParams;
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageHeader title="Projects" sub="Portfolio shown on the Work page and home page.">
        <Link href="/admin/projects/new" className="btn-solid !py-2.5 !text-sm">+ Add project</Link>
      </PageHeader>
      <Flash saved={saved} />
      {projects.length === 0 && <p className="text-muted">No projects yet.</p>}
      <div className="card divide-y divide-line">
        {projects.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-4 p-5">
            <span className="w-6 text-sm text-muted">{p.order}</span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <Link href={`/admin/projects/${p.id}`} className="text-lg font-semibold hover:underline">{p.name}</Link>
                {p.published ? <Badge tone="solid">Live</Badge> : <Badge>Hidden</Badge>}
                {p.featured && <Badge>Featured</Badge>}
              </div>
              <p className="mt-1 truncate text-sm text-muted">{hostname(p.url)} · {p.tagline}</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link href={`/admin/projects/${p.id}`} className="text-muted hover:text-white">Edit</Link>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={p.id} />
                <ConfirmButton message={`Delete project "${p.name}"?`}>Delete</ConfirmButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
