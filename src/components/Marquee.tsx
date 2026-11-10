import { LogoMark } from "./Logo";

/** Infinite horizontal ticker. The second copy is decorative (aria-hidden). */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) return null;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 pr-8">
          <span className="font-display whitespace-nowrap text-lg font-medium text-muted sm:text-xl">{item}</span>
          <LogoMark className="h-3 w-auto text-line-strong" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={label} className="marquee-mask overflow-hidden border-y border-line py-7">
      <div className="marquee-track flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
