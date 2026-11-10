import Link from "next/link";
import type { Settings } from "@/lib/settings";
import { Chevrons } from "./Chevrons";
import { ArrowRight, Container, SectionLabel } from "./ui";

export function CtaBand({ s }: { s: Settings }) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-surface">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <Chevrons className="absolute -right-24 top-1/2 h-[130%] -translate-y-1/2 opacity-70" />
      <Container data-reveal className="relative py-24 sm:py-32">
        <SectionLabel>Next step</SectionLabel>
        <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl">{s.ctaTitle}</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{s.ctaSubtitle}</p>
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
  );
}
