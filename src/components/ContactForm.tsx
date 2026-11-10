"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "@/actions/public";
import { Field, Honeypot } from "./Field";

const BUDGETS = ["Not sure yet", "Under $5k", "$5k – $15k", "$15k – $40k", "$40k+"];

export function ContactForm({ services }: { services: string[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, null);

  if (state?.ok && state.message) {
    return (
      <div className="border border-white bg-white p-10 text-ink">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">Message sent</p>
        <p className="mt-4 text-2xl font-bold tracking-tight">{state.message}</p>
      </div>
    );
  }

  const e = state?.errors ?? {};
  return (
    <form action={action} className="relative grid gap-6 sm:grid-cols-2" noValidate>
      <Honeypot />
      <Field label="Name" name="name" required error={e.name} />
      <Field label="Email" name="email" type="email" required error={e.email} />
      <Field label="Company" name="company" placeholder="Optional" />
      <Field label="What do you need?" name="service">
        <select id="f-service" name="service" className="input" defaultValue="">
          <option value="">Choose a service</option>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
          <option>Something else</option>
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Budget" name="budget">
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b, i) => (
              <label key={b} className="cursor-pointer">
                <input type="radio" name="budget" value={b} defaultChecked={i === 0} className="peer sr-only" />
                <span className="inline-block border border-line-strong px-4 py-2 text-sm text-muted transition peer-checked:border-white peer-checked:bg-white peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-white">
                  {b}
                </span>
              </label>
            ))}
          </div>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field
          label="Tell us about your project"
          name="message"
          as="textarea"
          rows={6}
          required
          error={e.message}
          placeholder="What are you building, who is it for, and when do you need it?"
        />
      </div>
      {state && !state.ok && state.message && <p className="text-sm text-red-400 sm:col-span-2">{state.message}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className="btn-solid disabled:opacity-60">
          {pending ? "Sending…" : "Send message →"}
        </button>
      </div>
    </form>
  );
}
