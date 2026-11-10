import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavProgress } from "@/components/NavProgress";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

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
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} min-h-screen antialiased`}>
        <NavProgress />
        {children}
      </body>
    </html>
  );
}
