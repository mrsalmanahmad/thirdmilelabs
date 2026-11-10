import Link from "next/link";
import type { Project } from "@prisma/client";
import { hostname, tagList } from "@/lib/utils";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/work/${project.slug}`} className="card group flex flex-col p-8 transition-colors hover:border-white/50 sm:p-10">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">{project.category}</p>
        <p className="text-sm font-semibold tracking-[0.2em] text-muted">{String(index + 1).padStart(2, "0")}</p>
      </div>

      <h3 className="mt-14 text-4xl font-bold tracking-tight sm:text-5xl">{project.name}</h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{project.tagline}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tagList(project.tags).slice(0, 4).map((t) => (
          <span key={t} className="border border-line-strong px-3 py-1 text-xs text-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-line pt-6 text-sm font-medium">
        <span className="text-muted">{hostname(project.url)}</span>
        <span className="inline-flex items-center gap-2">
          Case study <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
