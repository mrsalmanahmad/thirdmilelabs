import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { Chevrons } from "@/components/Chevrons";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { BoxLabel, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Products designed, built and tested by Third Mile Labs.",
};

export default async function WorkPage() {
  const [s, projects] = await Promise.all([
    getSettings(),
    prisma.project.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <section className="relative overflow-hidden">
        <Chevrons className="chevrons-in absolute -right-40 top-0 h-[520px] sm:-right-10" />
        <Container className="rise relative py-20 sm:py-28">
          <BoxLabel>Our work</BoxLabel>
          <h1 className="mt-10 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1] tracking-[-0.03em]">
            Real products, in real users&apos; hands.
          </h1>
        </Container>
      </section>
      <section className="border-t border-line">
        <Container className="py-20">
          {projects.length === 0 ? (
            <p className="text-muted">New case studies coming soon.</p>
          ) : (
            <div data-reveal="stagger" className="grid gap-5 lg:grid-cols-2">
              {projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}
        </Container>
      </section>
      <CtaBand s={s} />
    </>
  );
}
