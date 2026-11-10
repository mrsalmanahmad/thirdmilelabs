import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { lines, pad2 } from "@/lib/utils";
import { Chevrons } from "@/components/Chevrons";
import { CtaBand } from "@/components/CtaBand";
import { BoxLabel, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description: "AI automations, LLM apps and AI agents, web applications, mobile apps, QA and test automation, and startup MVPs.",
};

export default async function ServicesPage() {
  const [s, services] = await Promise.all([getSettings(), prisma.service.findMany({ orderBy: { order: "asc" } })]);

  return (
    <>
      <section className="relative overflow-hidden">
        <Chevrons className="chevrons-in absolute -right-40 top-0 h-[520px] sm:-right-10" />
        <Container className="rise relative py-20 sm:py-28">
          <BoxLabel>What we build</BoxLabel>
          <h1 className="mt-10 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1] tracking-[-0.03em]">
            Services built around shipping.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            One team for strategy, engineering and QA, so nothing gets lost between handoffs.
          </p>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-8">
          {services.map((svc, i) => (
            <article
              data-reveal
              key={svc.id}
              id={`service-${svc.id}`}
              className="grid gap-6 border-b border-line py-14 last:border-b-0 md:grid-cols-[120px_1fr_1fr]"
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-muted">{pad2(i + 1)}</p>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{svc.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{svc.description}</p>
              </div>
              {svc.details && (
                <ul className="space-y-3 md:pt-2">
                  {lines(svc.details).map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] leading-relaxed">
                      <span className="text-muted">→</span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </Container>
      </section>

      <CtaBand s={s} />
    </>
  );
}
