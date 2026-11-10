import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
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
      <Header openRoles={openRoles} />
      <main>{children}</main>
      <Footer s={settings} />
      <ScrollReveal />
    </>
  );
}
