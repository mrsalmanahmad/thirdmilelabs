"use client";

import { useActionState } from "react";
import { submitApplication, type FormState } from "@/actions/public";
import { Field, Honeypot } from "./Field";
import { ArrowRight } from "./ui";

export function ApplyForm({ jobId }: { jobId: number }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitApplication, null);

  if (state?.ok && state.message) {
    return (
      <div className="border border-white bg-white p-10 text-ink">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">Application sent</p>
        <p className="mt-4 text-2xl font-bold tracking-tight">{state.message}</p>
      </div>
    );
  }

  const e = state?.errors ?? {};
  return (
    <form action={action} className="relative grid gap-6 sm:grid-cols-2" noValidate>
      <Honeypot />
      <input type="hidden" name="jobId" value={jobId} />
      <Field label="Full name" name="name" required error={e.name} />
      <Field label="Email" name="email" type="email" required error={e.email} />
      <Field label="Phone" name="phone" type="tel" placeholder="+92 3xx xxxxxxx" />
      <Field label="LinkedIn / GitHub" name="linkedin" type="url" placeholder="https://" error={e.linkedin} />
      <div className="sm:col-span-2">
        <Field
          label="CV link"
          name="cvUrl"
          type="url"
          required
          error={e.cvUrl}
          placeholder="https://drive.google.com/…"
          hint="Share a public link to your CV (Google Drive, Dropbox, Notion…)."
        />
      </div>
      <div className="sm:col-span-2">
        <Field
          label="Why this role?"
          name="message"
          as="textarea"
          rows={5}
          placeholder="Tell us about a project you're proud of."
        />
      </div>
      {state && !state.ok && state.message && <p className="text-sm text-red-400 sm:col-span-2">{state.message}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} aria-busy={pending} className="btn-solid w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto">
          {pending ? "Submitting…" : <>Submit application <ArrowRight /></>}
        </button>
      </div>
    </form>
  );
}
