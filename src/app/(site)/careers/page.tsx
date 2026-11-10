import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { JobRow } from "@/components/JobRow";
import { Chip, Container, PageHero, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Third Mile Labs in Lahore.",
};

const PERKS = [
  { title: "Real products", body: "Work on shipped client products and our own, not throwaway demos." },
  { title: "Learn fast", body: "Mentorship from senior engineers, code reviews and time to learn new tools." },
  { title: "Two days off", body: "Friday and Saturday off, 10 AM – 7 PM on working days." },
];

export default async function CareersPage() {
  const [s, jobs] = await Promise.all([
    getSettings(),
    prisma.job.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <PageHero
        label={jobs.length > 0 ? "We're hiring" : "Careers"}
        title={<>Build what&apos;s next with us.</>}
        intro={s.careersIntro}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Chip solid>Lahore</Chip>
          <Chip>On-site</Chip>
          <Chip>10 AM – 7 PM</Chip>
          <Chip>Fri &amp; Sat off</Chip>
        </div>
      </PageHero>

      <section className="border-t border-line">
        <Container className="py-20">
          <SectionLabel>Open roles · {String(jobs.length).padStart(2, "0")}</SectionLabel>
          <div data-reveal="stagger" className="mt-8 border-t border-line">
            {jobs.map((j) => (
              <JobRow key={j.id} job={j} />
            ))}
          </div>
          {jobs.length === 0 && (
            <p className="mt-8 text-lg text-muted">
              No open roles right now. Send your CV to{" "}
              <a className="text-white underline" href={`mailto:${s.careersEmail}`}>{s.careersEmail}</a> and we&apos;ll reach out
              when something fits.
            </p>
          )}
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-20">
          <SectionLabel className="mb-8">Why join</SectionLabel>
          <div data-reveal="stagger" className="grid gap-5 md:grid-cols-3">
          {PERKS.map((p, i) => (
            <div key={p.title} className="card spotlight p-8">
              <p className="label-mono text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
          </div>
        </Container>
      </section>
    </>
  );
}
