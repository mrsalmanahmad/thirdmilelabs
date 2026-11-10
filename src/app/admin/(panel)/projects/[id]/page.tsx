import Link from "next/link";
import { notFound } from "next/navigation";
import { Flash, PageHeader } from "@/components/admin/kit";
import { prisma } from "@/lib/db";
import { ProjectForm } from "../ProjectForm";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

export default async function EditProjectPage({ params, searchParams }: Props) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const project = await prisma.project.findUnique({ where: { id: Number(id) || 0 } });
  if (!project) notFound();
  return (
    <>
      <Link href="/admin/projects" className="text-sm text-muted hover:text-white">← Projects</Link>
      <div className="mt-4"><PageHeader title={`Edit: ${project.name}`} /></div>
      <Flash error={error} />
      <ProjectForm project={project} />
    </>
  );
}
