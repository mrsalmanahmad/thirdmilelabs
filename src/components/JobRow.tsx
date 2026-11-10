import Link from "next/link";
import type { Job } from "@prisma/client";
import { ArrowRight } from "./ui";

export function JobRow({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="spotlight group flex flex-col gap-5 border-b border-line py-8 transition-colors duration-300 hover:bg-surface sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div>
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{job.title}</h3>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          {[job.location, job.employment, job.hours].filter(Boolean).map((part, i) => (
            <span key={part} className="inline-flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 bg-line-strong" aria-hidden="true" />}
              {part}
            </span>
          ))}
        </p>
      </div>
      <span className="inline-flex items-center gap-3 text-sm font-semibold">
        View role
        <span className="flex h-11 w-11 items-center justify-center border border-line-strong transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink">
          <ArrowRight />
        </span>
      </span>
    </Link>
  );
}
