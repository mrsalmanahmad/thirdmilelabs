import Link from "next/link";
import type { Settings } from "@/lib/settings";
import { Chevrons } from "./Chevrons";
import { Container } from "./ui";

export function CtaBand({ s }: { s: Settings }) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <Chevrons className="absolute -right-24 top-1/2 h-[130%] -translate-y-1/2 opacity-70" />
      <Container className="relative py-24 sm:py-32">
        <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          <span className="text-muted">→</span> {s.ctaTitle}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{s.ctaSubtitle}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/contact" className="btn-solid">
            Start a project
          </Link>
          <a href={`mailto:${s.contactEmail}`} className="btn-outline">
            {s.contactEmail}
          </a>
        </div>
      </Container>
    </section>
  );
}
