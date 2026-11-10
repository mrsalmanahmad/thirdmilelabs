import Link from "next/link";
import type { Settings } from "@/lib/settings";
import { Logo } from "./Logo";

export function Footer({ s }: { s: Settings }) {
  const socials = [
    { label: "LinkedIn", href: s.linkedin },
    { label: "Instagram", href: s.instagram },
    { label: "Facebook", href: s.facebook },
    { label: "X", href: s.x },
    { label: "GitHub", href: s.github },
  ].filter((l) => l.href);

  return (
    <footer className="border-t border-line">
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
          </ul>
        </div>

        {socials.length > 0 && (
          <div>
            <p className="footer-heading">Follow</p>
            <ul className="footer-list">
              {socials.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Third Mile Labs. All rights reserved.</p>
          <p>thirdmilelabs.com</p>
        </div>
      </div>
    </footer>
  );
}
