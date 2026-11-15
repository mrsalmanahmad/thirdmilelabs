"use client";

import { useEffect, useRef, useState } from "react";

type Chapter = { id: string; label: string };

/**
 * Drives the scroll story:
 *  - writes `--p` (0 → 1) on every chapter section, which the CSS uses to fill
 *    the mile numbers and light up the statement words;
 *  - shows a floating "road" pill with the current mile and overall progress.
 */
export function StoryProgress({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(-1);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      let current = -1;
      for (const [i, el] of els.entries()) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
        el.style.setProperty("--p", p.toFixed(4));
        if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) current = i;
      }
      const first = els[0].getBoundingClientRect();
      const last = els[els.length - 1].getBoundingClientRect();
      const overall = Math.min(1, Math.max(0, (vh * 0.5 - first.top) / (last.bottom - first.top)));
      fillRef.current?.style.setProperty("--road", overall.toFixed(4));
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  const visible = active >= 0;
  const current = chapters[Math.max(active, 0)];

  return (
    <nav
      aria-label="Story progress"
      className={`story-pill fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 border border-line-strong bg-ink/85 py-2 pl-5 pr-2 text-white shadow-[0_10px_40px_rgb(0_0_0/0.5)] backdrop-blur-md transition-[opacity,translate] duration-500 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="label-mono hidden whitespace-nowrap text-muted sm:inline" aria-live="polite">
        Mile {String(Math.max(active, 0) + 1).padStart(2, "0")} · <span className="text-white">{current.label}</span>
      </span>
      <span className="relative flex items-center">
        <span ref={fillRef} className="story-road" aria-hidden="true" />
        {chapters.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-label={`Mile ${i + 1}: ${c.label}`}
            aria-current={i === active ? "step" : undefined}
            className="relative z-10 flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`block h-2.5 w-2.5 border transition-colors duration-300 ${
                i <= active ? "border-white bg-white" : "border-line-strong bg-ink"
              }`}
            />
          </a>
        ))}
      </span>
    </nav>
  );
}
