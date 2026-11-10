import Link from "next/link";
import { Flash, PageHeader } from "@/components/admin/kit";
import { ProjectForm } from "../ProjectForm";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function NewProjectPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <Link href="/admin/projects" className="text-sm text-muted hover:text-white">← Projects</Link>
      <div className="mt-4"><PageHeader title="Add project" /></div>
      <Flash error={error} />
      <ProjectForm />
    </>
  );
}
