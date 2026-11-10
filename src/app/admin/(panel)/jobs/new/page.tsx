import Link from "next/link";
import { Flash, PageHeader } from "@/components/admin/kit";
import { JobForm } from "../JobForm";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function NewJobPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <Link href="/admin/jobs" className="text-sm text-muted hover:text-white">← Jobs</Link>
      <div className="mt-4"><PageHeader title="Post a job" /></div>
      <Flash error={error} />
      <JobForm />
    </>
  );
}
