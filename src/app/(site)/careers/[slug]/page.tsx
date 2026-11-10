import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { lines } from "@/lib/utils";
import { ApplyForm } from "@/components/ApplyForm";
import { Bullet, Chip, Container, PageHero, SectionLabel } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every published job; new ones render on first visit and are cached.
export async function generateStaticParams() {
  const rows = await prisma.job.findMany({ where: { published: true }, select: { slug: true } });
  return rows.map((r) => ({ slug: r.slug }));
}

async function getJob(slug: string) {
  return prisma.job.findFirst({ where: { slug, published: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob((await params).slug);
  return job ? { title: job.title, description: job.summary } : {};
}

export default async function JobPage({ params }: Props) {
  const job = await getJob((await params).slug);
  if (!job) notFound();

  return (
    <>
      {/* Mirrors the hiring flyer layout */}
      <PageHero back={{ href: "/careers", label: "All roles" }} label="We're hiring" title={job.title}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Chip solid>{job.location}</Chip>
            {job.employment && <Chip>{job.employment}</Chip>}
            {job.hours && <Chip>{job.hours}</Chip>}
            {job.daysOff && <Chip>{job.daysOff}</Chip>}
          </div>
          {job.summary && <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted">{job.summary}</p>}
          <div className="mt-10">
            <Link href="#apply" className="btn-solid">Apply now</Link>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <SectionLabel>What you&apos;ll do</SectionLabel>
              <ul className="mt-6 space-y-5">
                {lines(job.responsibilities).map((r) => (
                  <li key={r} className="flex gap-3 text-lg leading-relaxed"><Bullet />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel>What we&apos;re looking for</SectionLabel>
              <ul className="mt-6 space-y-5">
                {lines(job.requirements).map((r) => (
                  <li key={r} className="flex gap-3 text-lg leading-relaxed"><Bullet />{r}</li>
                ))}
              </ul>
            </div>
          </div>
      </PageHero>

      <section id="apply" className="border-t border-line">
        <Container data-reveal className="grid gap-12 py-20 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionLabel>Apply</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight">Apply for this role</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Takes two minutes. We read every application and reply to shortlisted candidates within a week.
            </p>
          </div>
          <ApplyForm jobId={job.id} />
        </Container>
      </section>
    </>
  );
}
