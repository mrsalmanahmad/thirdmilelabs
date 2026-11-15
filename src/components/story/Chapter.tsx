import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ui";

/** Statement whose words light up as the chapter's `--p` advances. */
export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <p className={`word-reveal ${className}`} style={{ "--n": words.length } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i} className="word" style={{ "--i": i } as CSSProperties}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

/**
 * One "mile" of the story. On desktop the left column (mile number, title,
 * statement) sticks while the right column's details scroll past.
 */
export function Chapter({
  id,
  n,
  kicker,
  title,
  statement,
  tone = "dark",
  children,
}: {
  id: string;
  n: string;
  kicker: string;
  title: ReactNode;
  statement: string;
  tone?: "dark" | "dim" | "light";
  children: ReactNode;
}) {
  const light = tone === "light";
  return (
    <section
      id={id}
      data-chapter
      data-tone={tone}
      aria-labelledby={`${id}-title`}
      className={`story-chapter relative scroll-mt-20 ${
        light ? "story-light bg-paper text-ink" : tone === "dim" ? "bg-surface" : ""
      }`}
    >
      <Container className="grid gap-12 py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-0">
        <div className="lg:sticky lg:top-20 lg:flex lg:h-[calc(100svh-5rem)] lg:flex-col lg:justify-center">
          <p className={`label-mono flex items-center gap-3 ${light ? "text-ink/60" : "text-muted"}`}>
            <span className={`h-px w-6 ${light ? "bg-ink/30" : "bg-line-strong"}`} aria-hidden="true" />
            Mile {n} · {kicker}
          </p>
          <p className="mile-num mt-4" aria-hidden="true">
            {n}
          </p>
          <h2 id={`${id}-title`} className="mt-2 max-w-xl text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            {title}
          </h2>
          <WordReveal
            text={statement}
            className="mt-6 max-w-xl text-xl leading-relaxed sm:text-2xl sm:leading-relaxed"
          />
        </div>
        <div className="flex flex-col gap-5 lg:py-[28vh]">{children}</div>
      </Container>
    </section>
  );
}

/** Detail card used in the chapters' scrolling column. */
export function StoryCard({
  label,
  title,
  children,
  light = false,
}: {
  label: string;
  title: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <article
      data-reveal
      className={`p-8 transition-colors duration-300 ${
        light ? "border border-ink/15 bg-white hover:border-ink/40" : "card spotlight hover:border-white/40"
      }`}
    >
      <p className={`label-mono ${light ? "text-ink/60" : "text-muted"}`}>{label}</p>
      <h3 className="mt-5 text-2xl font-bold tracking-tight">{title}</h3>
      <div className={`mt-3 leading-relaxed ${light ? "text-neutral-700" : "text-muted"}`}>{children}</div>
    </article>
  );
}
