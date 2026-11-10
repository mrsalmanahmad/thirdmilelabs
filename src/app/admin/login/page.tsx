import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = { title: "Admin login", robots: { index: false } };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <LogoMark className="h-10 w-auto" />
        <h1 className="mt-8 text-3xl font-bold tracking-tight">Admin portal</h1>
        <p className="mt-2 text-sm text-muted">Third Mile Labs · sign in to manage the site.</p>
        <LoginForm />
      </div>
    </main>
  );
}
