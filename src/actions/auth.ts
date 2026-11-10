"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth";
import { str } from "@/lib/utils";

// Basic brute-force brake (per server instance).
let failures = 0;
let lockedUntil = 0;

function same(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return "ADMIN_PASSWORD is not configured on the server.";
  if (Date.now() < lockedUntil) return "Too many attempts. Try again in a minute.";

  if (!same(str(form, "password"), expected)) {
    failures += 1;
    if (failures >= 5) {
      lockedUntil = Date.now() + 60_000;
      failures = 0;
    }
    await new Promise((r) => setTimeout(r, 600));
    return "Incorrect password.";
  }

  failures = 0;
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
