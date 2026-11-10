import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { ContactForm } from "@/components/ContactForm";
import { Container, PageHero, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project. We reply within one business day.",
};

export default async function ContactPage() {
  const [s, services] = await Promise.all([
    getSettings(),
    prisma.service.findMany({ orderBy: { order: "asc" }, select: { title: true } }),
  ]);

  return (
    <>
      <PageHero label="Contact us" title={s.ctaTitle} intro={s.ctaSubtitle} />
      <Container className="rise pb-24">
        <div className="grid gap-14 lg:grid-cols-[1.7fr_1fr]">
          <div className="card p-6 sm:p-10">
            <ContactForm services={services.map((x) => x.title)} />
          </div>

          <aside className="divide-y divide-line border-y border-line [&>div]:py-7">
            <div>
              <SectionLabel>Email</SectionLabel>
              <a href={`mailto:${s.contactEmail}`} className="font-display mt-3 block text-xl font-semibold underline-offset-4 hover:underline">
                {s.contactEmail}
              </a>
            </div>
            {s.contactPhone && (
              <div>
                <SectionLabel>Phone / WhatsApp</SectionLabel>
                <a href={`tel:${s.contactPhone.replace(/\s/g, "")}`} className="font-display mt-3 block text-xl font-semibold underline-offset-4 hover:underline">
                  {s.contactPhone}
                </a>
              </div>
            )}
            <div>
              <SectionLabel>Office</SectionLabel>
              <p className="font-display mt-3 text-xl font-semibold">{s.address}</p>
              <p className="mt-1 text-muted">{s.officeHours}</p>
            </div>
            <div>
              <SectionLabel>Careers</SectionLabel>
              <a href={`mailto:${s.careersEmail}`} className="font-display mt-3 block text-xl font-semibold underline-offset-4 hover:underline">
                {s.careersEmail}
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
