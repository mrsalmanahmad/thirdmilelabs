import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { lines, pad2 } from "@/lib/utils";
import { CtaBand } from "@/components/CtaBand";
import { Bullet, Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description: "AI automations, LLM apps and AI agents, web applications, mobile apps, QA and test automation, and startup MVPs.",
};

export default async function ServicesPage() {
  const [s, services] = await Promise.all([getSettings(), prisma.service.findMany({ orderBy: { order: "asc" } })]);

  return (
    <>
      <PageHero
        label="What we build"
        title="Services built around shipping."
        intro="One team for strategy, engineering and QA, so nothing gets lost between handoffs."
      >
        <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-2">
          {services.map((svc) => (
            <a
              key={svc.id}
              href={`#service-${svc.id}`}
              className="inline-flex min-h-11 items-center border border-line-strong bg-ink/60 px-4 text-sm font-medium backdrop-blur-sm transition-colors hover:border-white"
            >
              {svc.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="border-t border-line">
        <Container className="py-8">
          {services.map((svc, i) => (
            <article
              data-reveal
              key={svc.id}
              id={`service-${svc.id}`}
              className="grid scroll-mt-28 gap-6 border-b border-line py-14 last:border-b-0 md:grid-cols-[120px_1fr_1fr]"
            >
              <p className="label-mono pt-2 text-muted">
                {pad2(i + 1)}
                {svc.highlighted && <span className="mt-3 block w-fit bg-white px-2 py-1 text-ink">Popular</span>}
              </p>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{svc.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{svc.description}</p>
              </div>
              {svc.details && (
                <ul className="space-y-3 md:pt-2">
                  {lines(svc.details).map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] leading-relaxed">
                      <Bullet />
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
