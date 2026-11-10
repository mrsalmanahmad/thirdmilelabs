import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { NavProgress } from "@/components/NavProgress";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://thirdmilelabs.com"),
  title: {
    default: "Third Mile Labs · We turn ideas into working software",
    template: "%s · Third Mile Labs",
  },
  description:
    "Third Mile Labs is a software studio in Lahore building AI automations, LLM apps and AI agents, web applications, mobile apps and startup MVPs, with QA and test automation built in.",
  openGraph: { siteName: "Third Mile Labs", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Font variables live on <html> so the :root theme tokens that reference them resolve.
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        <NavProgress />
        {children}
      </body>
    </html>
  );
}
