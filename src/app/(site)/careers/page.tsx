import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { Chevrons } from "@/components/Chevrons";
import { JobRow } from "@/components/JobRow";
import { BoxLabel, Chip, Container, SectionLabel } from "@/components/ui";

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
      <section className="relative overflow-hidden">
        <Chevrons className="absolute -right-40 top-0 h-[560px] sm:-right-10" />
        <Container className="relative py-20 sm:py-28">
          <BoxLabel>{jobs.length > 0 ? "We're hiring" : "Careers"}</BoxLabel>
          <h1 className="mt-10 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1] tracking-[-0.03em]">
            Build what&apos;s next with us.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{s.careersIntro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Chip solid>Lahore</Chip>
            <Chip>On-site</Chip>
            <Chip>10 AM – 7 PM</Chip>
            <Chip>Fri &amp; Sat off</Chip>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-20">
          <SectionLabel>Open roles ({jobs.length})</SectionLabel>
          <div className="mt-8 border-t border-line">
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
        <Container className="grid gap-5 py-20 md:grid-cols-3">
          {PERKS.map((p) => (
            <div key={p.title} className="card p-8">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
