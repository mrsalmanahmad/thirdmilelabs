import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <LogoMark className="h-14 w-auto" />
      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-muted">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">This page took a wrong turn.</h1>
      <Link href="/" className="btn-solid mt-10">Back to home</Link>
    </main>
  );
}
