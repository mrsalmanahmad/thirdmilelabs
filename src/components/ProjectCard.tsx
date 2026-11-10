import Link from "next/link";
import type { Project } from "@prisma/client";
import { hostname, pad2, tagList } from "@/lib/utils";
import { ArrowRight } from "./ui";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="card spotlight group flex flex-col overflow-hidden p-8 transition-colors duration-300 hover:border-white/50 sm:p-10"
    >
      {/* Oversized index numeral as a quiet visual anchor */}
      <span
        className="font-display pointer-events-none absolute -z-10 -right-3 -top-8 select-none text-[11rem] font-bold leading-none tracking-tighter text-white/[0.035] transition-colors duration-500 group-hover:text-white/[0.07]"
        aria-hidden="true"
      >
        {pad2(index + 1)}
      </span>

      <div className="flex items-center gap-3">
        <span className="label-mono text-muted">{project.category}</span>
        {project.year && (
          <>
            <span className="h-px w-4 bg-line-strong" aria-hidden="true" />
            <span className="label-mono text-muted">{project.year}</span>
          </>
        )}
      </div>

      <h3 className="mt-16 text-4xl font-bold tracking-tight sm:text-5xl">{project.name}</h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{project.tagline}</p>

      <div className="mb-10 mt-8 flex flex-wrap gap-2">
        {tagList(project.tags).slice(0, 4).map((t) => (
          <span key={t} className="border border-line-strong px-3 py-1 text-xs text-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-line pt-6 text-sm font-medium">
        <span className="font-mono text-xs text-muted">{hostname(project.url)}</span>
        <span className="inline-flex items-center gap-2">
          Case study <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
