import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Spotlight } from "@/components/Spotlight";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";

// Pages are cached for instant navigation. Every admin save calls
// revalidatePath(), so edits still show up immediately.
export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, openRoles] = await Promise.all([
    getSettings(),
    prisma.job.count({ where: { published: true } }),
  ]);
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-white px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header openRoles={openRoles} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer s={settings} />
      <ScrollReveal />
      <Spotlight />
    </>
  );
}
