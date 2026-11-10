import type { Service } from "@prisma/client";
import { pad2 } from "@/lib/utils";

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {services.map((s, i) => (
        <article
          key={s.id}
          className={
            s.highlighted
              ? "flex flex-col border border-white bg-white p-8 text-ink"
              : "card flex flex-col p-8 transition-colors hover:border-white/40"
          }
        >
          <p className={`text-sm font-semibold tracking-[0.2em] ${s.highlighted ? "text-ink/60" : "text-muted"}`}>
            {pad2(i + 1)}
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">{s.title}</h3>
          <p className={`mt-3 leading-relaxed ${s.highlighted ? "text-ink/70" : "text-muted"}`}>{s.description}</p>
        </article>
      ))}
    </div>
  );
}
