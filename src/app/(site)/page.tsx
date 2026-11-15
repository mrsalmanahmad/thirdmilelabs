import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { pad2 } from "@/lib/utils";
import { Chevrons } from "@/components/Chevrons";
import { LogoMark } from "@/components/Logo";
import { ProjectCard } from "@/components/ProjectCard";
import { Chapter, StoryCard } from "@/components/story/Chapter";
import { StoryProgress } from "@/components/story/StoryProgress";
import { ArrowRight, BoxLabel, Container, SectionLabel } from "@/components/ui";

const CHAPTERS = [
  { id: "mile-1", label: "The idea" },
  { id: "mile-2", label: "The build" },
  { id: "mile-3", label: "The third mile" },
];

function MiniCta({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group mt-4 inline-flex min-h-11 w-fit items-center gap-2 border-b pb-1 text-sm font-semibold transition-colors ${
        light ? "border-ink/30 hover:border-ink" : "border-line-strong hover:border-white"
      }`}
    >
      {children} <ArrowRight />
    </Link>
  );
}

export default async function HomePage() {
  const [s, services, projects] = await Promise.all([
    getSettings(),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="story">
      <StoryProgress chapters={CHAPTERS} />

      {/* ---------- Intro hook ---------- */}
      <section className="relative flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="rise relative flex flex-1 flex-col justify-center py-10">
          <div>
            <BoxLabel live>{s.heroEyebrow}</BoxLabel>
          </div>
          <h1 className="mt-8 text-[clamp(3rem,min(10vw,14svh),8rem)] font-bold leading-[0.88] tracking-[-0.055em]">
            Every product
            <br />
            is three miles
            <br />
            <span className="text-muted">long.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Most teams stop after two. Scroll to see what happens on the third.
          </p>
        </Container>

        {/* The road: a preview of the three chapters */}
        <Container className="relative pb-8">
          <ol className="relative grid grid-cols-3 items-start">
            <span className="road-line absolute inset-x-0 top-[21px] h-px" aria-hidden="true" />
            {CHAPTERS.map((c, i) => (
              <li key={c.id} className={i === 2 ? "justify-self-end text-right" : i === 1 ? "justify-self-center text-center" : ""}>
                <a href={`#${c.id}`} className="group relative inline-flex min-h-11 flex-col gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center border bg-ink transition-colors duration-300 group-hover:border-white ${
                      i === 2 ? "border-white" : "border-line-strong"
                    } ${i === 1 ? "mx-auto" : i === 2 ? "ml-auto" : ""}`}
                  >
                    {i === 2 ? <LogoMark className="h-4 w-auto" /> : <span className="label-mono">{pad2(i + 1)}</span>}
                  </span>
                  <span className="label-mono text-muted transition-colors group-hover:text-white">
                    <span className="hidden sm:inline">Mile {pad2(i + 1)} · </span>
                    {c.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex items-center gap-3 text-muted" aria-hidden="true">
            <span className="relative block h-10 w-px overflow-hidden bg-line">
              <span className="scroll-cue absolute inset-0 bg-white" />
            </span>
            <span className="label-mono">Scroll</span>
          </div>
        </Container>
      </section>

      {/* ---------- Mile 01 ---------- */}
      <Chapter
        id="mile-1"
        n="01"
        kicker="The idea"
        title="Find the smallest thing worth building."
        statement="Every product starts as a hunch. We dig into the problem, the users and the constraints until the hunch becomes a plan you can hold us to."
      >
        <StoryCard label="Step 01 · Discover" title="Understand the problem">
          We dig into the problem, the users and the constraints, then agree on the smallest thing worth building.
        </StoryCard>
        <StoryCard label="Step 02 · Design" title="Shape the solution">
          Flows, architecture and a clear plan with milestones. You see exactly what gets built, in what order, and why.
        </StoryCard>
        <StoryCard label="You leave with" title="A plan, not a pitch deck">
          <ul className="mt-1 space-y-2">
            {["User flows and key screens", "Technical architecture", "Milestones you can hold us to", "The smallest version worth shipping"].map((x) => (
              <li key={x} className="flex gap-3">
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </StoryCard>
        <MiniCta href="/contact">Have an idea? Start at mile one</MiniCta>
      </Chapter>

      {/* ---------- Mile 02 ---------- */}
      <Chapter
        id="mile-2"
        n="02"
        kicker="The build"
        tone="dim"
        title="Real software, every single week."
        statement="Short cycles and weekly demos. You never wait months to see progress, and you can change course while it is still cheap to."
      >
        <div data-reveal="stagger" className="grid border-l border-t border-line-strong">
          {services.map((svc, i) => (
            <Link
              key={svc.id}
              href={`/services#service-${svc.id}`}
              className="spotlight group grid grid-cols-[3rem_1fr_auto] items-start gap-4 border-b border-r border-line-strong bg-ink p-6 transition-colors hover:bg-raised"
            >
              <span className="label-mono pt-1.5 text-muted">{pad2(i + 1)}</span>
              <span>
                <span className="font-display block text-xl font-bold tracking-tight">{svc.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{svc.description}</span>
              </span>
              <ArrowRight className="mt-1.5 h-4 w-4 text-muted group-hover:text-white" />
            </Link>
          ))}
        </div>
        <StoryCard label="Every week" title="A demo, not a status update">
          Working software on a link you can click. Feedback goes straight into next week&apos;s cycle.
        </StoryCard>
        <MiniCta href="/services">Everything we build</MiniCta>
      </Chapter>

      {/* ---------- Mile 03: the turn ---------- */}
      <Chapter
        id="mile-3"
        n="03"
        kicker="The third mile"
        tone="light"
        title={s.aboutTitle}
        statement="This is where most projects stall: the testing, polish and production hardening that turn a demo into a product people rely on. It's the mile we specialise in."
      >
        <StoryCard light label="From day one" title="QA runs alongside the build">
          Testing isn&apos;t a phase at the end. Test cases, automation and bug triage happen in the same sprint as the
          code they cover.
        </StoryCard>
        <StoryCard light label="Before launch" title="Hardened for production">
          Performance, security and edge cases get the same attention as features. We ship when it&apos;s ready for real
          users, not when it demos well.
        </StoryCard>
        <StoryCard light label="After launch" title="Monitored and improved">
          We watch it in production and keep improving it with real usage data. The third mile doesn&apos;t end at launch.
        </StoryCard>
        <MiniCta light href="/services">How QA fits into every project</MiniCta>
      </Chapter>

      {/* ---------- Arrival: the work ---------- */}
      {projects.length > 0 && (
        <section className="border-t border-line">
          <Container className="py-24 sm:py-32">
            <div data-reveal className="mb-14 max-w-2xl">
              <SectionLabel>Arrived</SectionLabel>
              <h2 className="mt-5 text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                Products that went the full distance.
              </h2>
            </div>
            <div data-reveal="stagger" className="grid gap-5 lg:grid-cols-2">
              {projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ---------- Climax CTA ---------- */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <Chevrons className="absolute -right-24 top-1/2 h-[130%] -translate-y-1/2 opacity-80" />
        <Container data-reveal className="relative py-28 sm:py-40">
          <SectionLabel>Your turn</SectionLabel>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.05em]">
            Ready to go the full three miles?
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{s.ctaSubtitle}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/contact" className="btn-solid">
              Start a project <ArrowRight />
            </Link>
            <a href={`mailto:${s.contactEmail}`} className="btn-outline font-mono !text-sm !font-medium">
              {s.contactEmail}
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
