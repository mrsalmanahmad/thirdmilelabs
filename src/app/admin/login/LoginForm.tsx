"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">Password</span>
        <input name="password" type="password" autoFocus required autoComplete="current-password" className="input" />
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={pending} className="btn-solid w-full justify-center disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in →"}
      </button>
    </form>
  );
}
