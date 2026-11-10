import Link from "next/link";
import { notFound } from "next/navigation";
import { Flash, PageHeader } from "@/components/admin/kit";
import { prisma } from "@/lib/db";
import { JobForm } from "../JobForm";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

export default async function EditJobPage({ params, searchParams }: Props) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const job = await prisma.job.findUnique({ where: { id: Number(id) || 0 } });
  if (!job) notFound();
  return (
    <>
      <Link href="/admin/jobs" className="text-sm text-muted hover:text-white">← Jobs</Link>
      <div className="mt-4"><PageHeader title={`Edit: ${job.title}`} /></div>
      <Flash error={error} />
      <JobForm job={job} />
    </>
  );
}
