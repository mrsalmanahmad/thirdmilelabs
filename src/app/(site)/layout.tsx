import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";

// Content is edited live from /admin, so always render fresh.
export const dynamic = "force-dynamic";

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
    </>
  );
}
