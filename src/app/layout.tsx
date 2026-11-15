import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavProgress } from "@/components/NavProgress";

// Self-hosted from @fontsource-variable packages (latin, variable weight), so
// builds never depend on fetching from Google Fonts.
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const display = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});
const mono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
  preload: false, // only used for small labels
});

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
