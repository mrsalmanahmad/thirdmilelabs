import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { Chevrons } from "@/components/Chevrons";
import { CtaBand } from "@/components/CtaBand";
import { JobRow } from "@/components/JobRow";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceGrid } from "@/components/ServiceGrid";
import { BoxLabel, Container, SectionLabel } from "@/components/ui";

const PROCESS = [
  { title: "Discover", body: "We dig into the problem, the users and the constraints, then agree on the smallest thing worth building." },
  { title: "Design", body: "Flows, architecture and a clear plan with milestones you can hold us to." },
  { title: "Build & test", body: "Short cycles, weekly demos, and QA running alongside development instead of after it." },
  { title: "Launch & support", body: "We ship to production, monitor it, and keep improving it with real usage data." },
];

export default async function HomePage() {
  const [s, services, projects, jobs] = await Promise.all([
    getSettings(),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { published: true, featured: true }, orderBy: { order: "asc" } }),
    prisma.job.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Chevrons className="chevrons-in absolute -right-40 top-10 h-[640px] sm:-right-16 lg:right-0" />
        <Container className="rise relative pb-24 pt-20 sm:pb-32 sm:pt-28">
          <BoxLabel>{s.heroEyebrow}</BoxLabel>
          <h1 className="mt-10 max-w-4xl text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            {s.heroTitle}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{s.heroSubtitle}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-solid">Start a project →</Link>
            <Link href="/work" className="btn-outline">See our work</Link>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="border-t border-line">
        <Container className="py-24 sm:py-28">
          <div data-reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel>What we build</SectionLabel>
              <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                From first prototype to production.
              </h2>
            </div>
            <Link href="/services" className="group text-sm font-semibold">
              All services <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <ServiceGrid services={services} />
        </Container>
      </section>

      {/* Work */}
      {projects.length > 0 && (
        <section className="border-t border-line">
          <Container className="py-24 sm:py-28">
            <div data-reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionLabel>Selected work</SectionLabel>
                <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                  Products we&apos;ve shipped.
                </h2>
              </div>
              <Link href="/work" className="group text-sm font-semibold">
                All projects <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div data-reveal="stagger" className="grid gap-5 lg:grid-cols-2">
              {projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* About / why */}
      <section className="border-t border-line">
        <Container data-reveal className="grid gap-14 py-24 sm:py-28 lg:grid-cols-2">
          <div>
            <SectionLabel>Why Third Mile</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{s.aboutTitle}</h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-muted">{s.aboutBody}</p>
        </Container>
        <Container className="pb-24 sm:pb-28">
          <SectionLabel className="mb-8">How we work</SectionLabel>
          <ol data-reveal="stagger" className="grid border-l border-t border-line-strong sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="border-b border-r border-line-strong p-8">
                <p className="text-sm font-semibold tracking-[0.2em] text-muted">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Careers */}
      {jobs.length > 0 && (
        <section className="border-t border-line">
          <Container className="py-24 sm:py-28">
            <div data-reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <BoxLabel>We&apos;re hiring</BoxLabel>
                <h2 className="mt-8 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                  Join the team in Lahore.
                </h2>
              </div>
              <Link href="/careers" className="group text-sm font-semibold">
                All open roles <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div data-reveal="stagger" className="mt-10 border-t border-line">
              {jobs.slice(0, 4).map((j) => (
                <JobRow key={j.id} job={j} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand s={s} />
    </>
  );
}
