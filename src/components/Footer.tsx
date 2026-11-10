import Link from "next/link";
import type { Settings } from "@/lib/settings";
import { Logo } from "./Logo";
import { ArrowUpRight } from "./ui";

export function Footer({ s }: { s: Settings }) {
  const socials = [
    { label: "LinkedIn", href: s.linkedin },
    { label: "Instagram", href: s.instagram },
    { label: "Facebook", href: s.facebook },
    { label: "X", href: s.x },
    { label: "GitHub", href: s.github },
  ].filter((l) => l.href);

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            AI automations, LLM apps, web and mobile products, built and tested in Lahore.
          </p>
        </div>

        <div>
          <p className="footer-heading">Company</p>
          <ul className="footer-list">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="footer-heading">Get in touch</p>
          <ul className="footer-list">
            <li><a href={`mailto:${s.contactEmail}`}>{s.contactEmail}</a></li>
            {s.contactPhone && <li><a href={`tel:${s.contactPhone.replace(/\s/g, "")}`}>{s.contactPhone}</a></li>}
            <li className="text-muted">{s.address}</li>
            {s.officeHours && <li className="text-muted">{s.officeHours}</li>}
          </ul>
        </div>

        {socials.length > 0 && (
          <div>
            <p className="footer-heading">Follow</p>
            <ul className="footer-list">
              {socials.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5">
                    {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Oversized wordmark, cropped by the bottom edge */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8" aria-hidden="true">
        <p className="font-display -mb-[0.22em] select-none whitespace-nowrap text-[clamp(3.5rem,15.5vw,11.5rem)] font-bold leading-none tracking-[-0.05em] text-ghost">
          THIRD MILE
        </p>
      </div>

      <div className="relative border-t border-line bg-ink">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Third Mile Labs. All rights reserved.</p>
          <p className="font-mono">thirdmilelabs.com</p>
        </div>
      </div>
    </footer>
  );
}
