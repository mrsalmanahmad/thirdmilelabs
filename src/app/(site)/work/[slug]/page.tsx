import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { hostname, tagList } from "@/lib/utils";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight, ArrowUpRight, Chip, Container, PageHero, SectionLabel } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every published project; new ones render on first visit and are cached.
export async function generateStaticParams() {
  const rows = await prisma.project.findMany({ where: { published: true }, select: { slug: true } });
  return rows.map((r) => ({ slug: r.slug }));
}

async function getProject(slug: string) {
  return prisma.project.findFirst({ where: { slug, published: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProject((await params).slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function ProjectPage({ params }: Props) {
  const [project, s] = await Promise.all([getProject((await params).slug), getSettings()]);
  if (!project) notFound();

  const others = await prisma.project.findMany({
    where: { published: true, NOT: { id: project.id } },
    orderBy: { order: "asc" },
    take: 2,
  });

  return (
    <>
      <PageHero
        size="lg"
        back={{ href: "/work", label: "All work" }}
        label={project.category}
        title={project.name}
        intro={project.tagline}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-solid group">
            Visit {hostname(project.url)} <ArrowUpRight />
          </a>
        </div>
      </PageHero>

      <section className="border-t border-line">
        <Container data-reveal className="grid gap-14 py-20 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionLabel>Overview</SectionLabel>
            <div className="prose-tml mt-6 max-w-2xl text-lg leading-relaxed">
              {project.description.split(/\n\s*\n/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          <aside className="space-y-10">
            {project.tags && (
              <div>
                <SectionLabel>Stack & scope</SectionLabel>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tagList(project.tags).map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            )}
            {project.year && (
              <div>
                <SectionLabel>Year</SectionLabel>
                <p className="mt-3 text-lg">{project.year}</p>
              </div>
            )}
          </aside>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="border-t border-line">
          <Container data-reveal className="py-16">
            <SectionLabel className="mb-6">More work</SectionLabel>
            <div className="border-t border-line">
              {others.map((o) => (
                <Link
                  key={o.id}
                  href={`/work/${o.slug}`}
                  className="spotlight group flex items-center justify-between gap-6 border-b border-line py-7 transition-colors hover:bg-surface sm:px-6"
                >
                  <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{o.name}</span>
                  <span className="hidden flex-1 text-right text-muted sm:block">{o.tagline}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand s={s} />
    </>
  );
}
