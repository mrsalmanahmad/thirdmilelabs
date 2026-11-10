import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { pad2, tagList } from "@/lib/utils";
import { Chevrons } from "@/components/Chevrons";
import { CtaBand } from "@/components/CtaBand";
import { JobRow } from "@/components/JobRow";
import { Marquee } from "@/components/Marquee";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ArrowRight, BoxLabel, Container, SectionHeader, SectionLabel } from "@/components/ui";

const PROCESS = [
  { title: "Discover", body: "We dig into the problem, the users and the constraints, then agree on the smallest thing worth building." },
  { title: "Design", body: "Flows, architecture and a clear plan with milestones you can hold us to." },
  { title: "Build & test", body: "Short cycles, weekly demos, and QA running alongside development instead of after it." },
  { title: "Launch & support", body: "We ship to production, monitor it, and keep improving it with real usage data." },
];

export default async function HomePage() {
  const [s, services, projects, allProjects, jobs] = await Promise.all([
    getSettings(),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { published: true, featured: true }, orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { published: true }, select: { tags: true } }),
    prisma.job.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
  ]);

  const capabilities = [
    ...new Set([...services.map((x) => x.title), ...allProjects.flatMap((p) => tagList(p.tags))]),
  ];

  const stats = [
    { value: pad2(services.length), label: "Core services" },
    { value: pad2(allProjects.length), label: "Products shipped" },
    { value: "QA", label: "In every sprint" },
    { value: s.address.split(",")[0] || "Lahore", label: "Home base" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Chevrons className="chevrons-in absolute -right-40 top-10 h-[640px] sm:-right-16 lg:right-0" />
        <Container className="rise relative pb-20 pt-16 sm:pb-28 sm:pt-24">
          <BoxLabel live>{s.heroEyebrow}</BoxLabel>
          <h1 className="mt-10 max-w-4xl text-[clamp(2.75rem,8vw,6.25rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            {s.heroTitle}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{s.heroSubtitle}</p>
          <div className="mt-12 flex flex-wrap gap-3 sm:gap-4">
            <Link href="/contact" className="btn-solid">
              Start a project <ArrowRight />
            </Link>
            <Link href="/work" className="btn-outline">See our work</Link>
          </div>

          <dl className="mt-20 grid max-w-4xl grid-cols-2 border-l border-t border-line sm:grid-cols-4">
            {stats.map((st) => (
              <div key={st.label} className="border-b border-r border-line bg-ink/50 px-5 py-5 backdrop-blur-sm">
                <dt className="label-mono text-muted">{st.label}</dt>
                <dd className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{st.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Marquee items={capabilities} label="Capabilities" />

      {/* Services */}
      <section>
        <Container className="py-24 sm:py-28">
          <SectionHeader
            label="What we build"
            title="From first prototype to production."
            link={{ href: "/services", label: "All services" }}
          />
          <ServiceGrid services={services} />
        </Container>
      </section>

      {/* Work */}
      {projects.length > 0 && (
        <section className="border-t border-line">
          <Container className="py-24 sm:py-28">
            <SectionHeader
              label="Selected work"
              title={<>Products we&apos;ve shipped.</>}
              link={{ href: "/work", label: "All projects" }}
            />
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
        <Container data-reveal className="grid gap-10 py-24 sm:py-28 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionLabel>Why Third Mile</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{s.aboutTitle}</h2>
          </div>
          <p className="max-w-xl self-end text-lg leading-relaxed text-muted">{s.aboutBody}</p>
        </Container>
        <Container className="pb-24 sm:pb-28">
          <SectionLabel className="mb-8">How we work</SectionLabel>
          <ol data-reveal="stagger" className="grid border-l border-t border-line-strong sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="spotlight group relative border-b border-r border-line-strong p-8">
                {/* Progress tick: fills on hover, reads as a step along the timeline */}
                <span
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <p className="label-mono text-muted">Step {pad2(i + 1)}</p>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
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
                <BoxLabel live>We&apos;re hiring</BoxLabel>
                <h2 className="mt-8 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                  Join the team in Lahore.
                </h2>
              </div>
              <Link href="/careers" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                All open roles <ArrowRight />
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
