"use server";

import { prisma } from "@/lib/db";
import { isEmail, isUrl, str } from "@/lib/utils";

export type FormState = { ok: boolean; message?: string; errors?: Record<string, string> } | null;

const MAX = 5000;

export async function submitContact(_prev: FormState, form: FormData): Promise<FormState> {
  // Honeypot: real users never fill the hidden "website" field.
  if (str(form, "website")) return { ok: true };

  const data = {
    name: str(form, "name").slice(0, 200),
    email: str(form, "email").slice(0, 200),
    company: str(form, "company").slice(0, 200),
    service: str(form, "service").slice(0, 200),
    budget: str(form, "budget").slice(0, 100),
    message: str(form, "message").slice(0, MAX),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!isEmail(data.email)) errors.email = "Please enter a valid email.";
  if (data.message.length < 10) errors.message = "A few more words about your project, please.";
  if (Object.keys(errors).length) return { ok: false, errors };

  await prisma.message.create({ data });
  return { ok: true, message: "Thanks! We've got your message and will reply within one business day." };
}

export async function submitApplication(_prev: FormState, form: FormData): Promise<FormState> {
  if (str(form, "website")) return { ok: true };

  const jobId = Number(str(form, "jobId"));
  const job = Number.isInteger(jobId) ? await prisma.job.findFirst({ where: { id: jobId, published: true } }) : null;
  if (!job) return { ok: false, message: "This role is no longer open." };

  const data = {
    jobId,
    name: str(form, "name").slice(0, 200),
    email: str(form, "email").slice(0, 200),
    phone: str(form, "phone").slice(0, 50),
    cvUrl: str(form, "cvUrl").slice(0, 1000),
    linkedin: str(form, "linkedin").slice(0, 1000),
    message: str(form, "message").slice(0, MAX),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!isEmail(data.email)) errors.email = "Please enter a valid email.";
  if (!isUrl(data.cvUrl)) errors.cvUrl = "Add a link to your CV (Google Drive, Dropbox, etc.).";
  if (data.linkedin && !isUrl(data.linkedin)) errors.linkedin = "That doesn't look like a valid URL.";
  if (Object.keys(errors).length) return { ok: false, errors };

  await prisma.application.create({ data });
  return { ok: true, message: `Application received for ${job.title}. We'll be in touch soon.` };
}
