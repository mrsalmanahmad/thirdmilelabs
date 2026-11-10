import Link from "next/link";
import type { Job } from "@prisma/client";

export function JobRow({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex flex-col gap-4 border-b border-line py-8 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:justify-between sm:px-4"
    >
      <div>
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{job.title}</h3>
        <p className="mt-2 text-sm text-muted">
          {job.location} · {job.employment} · {job.hours}
        </p>
      </div>
      <span className="inline-flex items-center gap-2 text-sm font-semibold">
        View role <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
