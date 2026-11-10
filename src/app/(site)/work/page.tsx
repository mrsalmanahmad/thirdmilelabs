import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { Container, PageHero } from "@/components/ui";

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
      <PageHero label="Our work" title={<>Real products, in real users&apos; hands.</>} />
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
