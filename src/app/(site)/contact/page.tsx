import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { Chevrons } from "@/components/Chevrons";
import { ContactForm } from "@/components/ContactForm";
import { BoxLabel, Container, SectionLabel } from "@/components/ui";

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
    <section className="relative overflow-hidden">
      <Chevrons className="absolute -right-48 top-0 h-[560px] opacity-80 sm:-right-24" />
      <Container className="relative py-20 sm:py-28">
        <BoxLabel>Contact us</BoxLabel>
        <h1 className="mt-10 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1] tracking-[-0.03em]">
          {s.ctaTitle}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{s.ctaSubtitle}</p>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.7fr_1fr]">
          <div className="card p-6 sm:p-10">
            <ContactForm services={services.map((x) => x.title)} />
          </div>

          <aside className="space-y-10">
            <div>
              <SectionLabel>Email</SectionLabel>
              <a href={`mailto:${s.contactEmail}`} className="mt-3 block text-xl font-semibold hover:underline">
                {s.contactEmail}
              </a>
            </div>
            {s.contactPhone && (
              <div>
                <SectionLabel>Phone / WhatsApp</SectionLabel>
                <a href={`tel:${s.contactPhone.replace(/\s/g, "")}`} className="mt-3 block text-xl font-semibold hover:underline">
                  {s.contactPhone}
                </a>
              </div>
            )}
            <div>
              <SectionLabel>Office</SectionLabel>
              <p className="mt-3 text-xl font-semibold">{s.address}</p>
              <p className="mt-1 text-muted">{s.officeHours}</p>
            </div>
            <div>
              <SectionLabel>Careers</SectionLabel>
              <a href={`mailto:${s.careersEmail}`} className="mt-3 block text-xl font-semibold hover:underline">
                {s.careersEmail}
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
