import Link from "next/link";
import type { Service } from "@prisma/client";
import { pad2 } from "@/lib/utils";
import { ArrowUpRight } from "./ui";

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div data-reveal="stagger" className="grid gap-px border border-line-strong bg-line-strong sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Link
          key={s.id}
          href={`/services#service-${s.id}`}
          className={`group flex flex-col p-7 sm:min-h-60 sm:p-8 transition-colors duration-300 ${
            s.highlighted ? "bg-white text-ink" : "spotlight bg-surface hover:bg-raised"
          }`}
        >
          <div className="flex items-start justify-between">
            <span className={`label-mono ${s.highlighted ? "text-ink/60" : "text-muted"}`}>{pad2(i + 1)}</span>
            <span
              className={`flex h-9 w-9 items-center justify-center border transition-colors duration-300 ${
                s.highlighted
                  ? "border-ink/20 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
                  : "border-line-strong text-muted group-hover:border-white group-hover:bg-white group-hover:text-ink"
              }`}
            >
              <ArrowUpRight />
            </span>
          </div>
          <h3 className="mt-8 text-2xl sm:mt-14 font-bold tracking-tight">{s.title}</h3>
          <p className={`mt-3 leading-relaxed ${s.highlighted ? "text-ink/70" : "text-muted"}`}>{s.description}</p>
        </Link>
      ))}
    </div>
  );
}
