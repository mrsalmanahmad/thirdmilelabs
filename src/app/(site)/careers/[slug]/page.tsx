import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { lines } from "@/lib/utils";
import { ApplyForm } from "@/components/ApplyForm";
import { Chevrons } from "@/components/Chevrons";
import { BoxLabel, Chip, Container, SectionLabel } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

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
      <section className="relative overflow-hidden">
        <Chevrons className="absolute -right-40 top-16 h-[600px] sm:-right-10" />
        <Container className="relative py-20 sm:py-24">
          <Link href="/careers" className="text-sm text-muted hover:text-white">← All roles</Link>
          <div className="mt-10">
            <BoxLabel>We&apos;re hiring</BoxLabel>
          </div>
          <h1 className="mt-10 max-w-3xl text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            {job.title}
          </h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <Chip solid>{job.location}</Chip>
            {job.employment && <Chip>{job.employment}</Chip>}
            {job.hours && <Chip>{job.hours}</Chip>}
            {job.daysOff && <Chip>{job.daysOff}</Chip>}
          </div>
          {job.summary && <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted">{job.summary}</p>}

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <SectionLabel>What you&apos;ll do</SectionLabel>
              <ul className="mt-6 space-y-5">
                {lines(job.responsibilities).map((r) => (
                  <li key={r} className="text-lg leading-relaxed">→ {r}</li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel>What we&apos;re looking for</SectionLabel>
              <ul className="mt-6 space-y-5">
                {lines(job.requirements).map((r) => (
                  <li key={r} className="text-lg leading-relaxed">→ {r}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="apply" className="border-t border-line">
        <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_1.6fr]">
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
