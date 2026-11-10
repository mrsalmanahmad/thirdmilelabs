"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SETTING_FIELDS } from "@/lib/settings";
import { isUrl, slugify, str } from "@/lib/utils";

function refresh() {
  revalidatePath("/", "layout");
}

function id(form: FormData) {
  const n = Number(str(form, "id"));
  return Number.isInteger(n) && n > 0 ? n : null;
}

const bool = (form: FormData, key: string) => form.get(key) === "on";

/* ---------- Site content ---------- */

export async function saveSettings(form: FormData) {
  await requireAdmin();
  await prisma.$transaction(
    SETTING_FIELDS.map((f) => {
      const value = str(form, f.key);
      return prisma.setting.upsert({ where: { key: f.key }, update: { value }, create: { key: f.key, value } });
    }),
  );
  refresh();
  redirect("/admin/content?saved=1");
}

/* ---------- Services ---------- */

export async function saveService(form: FormData) {
  await requireAdmin();
  const data = {
    title: str(form, "title"),
    description: str(form, "description"),
    details: str(form, "details"),
    order: Number(str(form, "order")) || 0,
    highlighted: bool(form, "highlighted"),
  };
  if (!data.title) redirect("/admin/services?error=Title+is+required");
  const sid = id(form);
  if (sid) await prisma.service.update({ where: { id: sid }, data });
  else await prisma.service.create({ data });
  refresh();
  redirect("/admin/services?saved=1");
}

export async function deleteService(form: FormData) {
  await requireAdmin();
  const sid = id(form);
  if (sid) await prisma.service.delete({ where: { id: sid } });
  refresh();
  redirect("/admin/services");
}

/* ---------- Projects ---------- */

export async function saveProject(form: FormData) {
  await requireAdmin();
  const pid = id(form);
  const name = str(form, "name");
  const data = {
    name,
    slug: slugify(str(form, "slug") || name),
    url: str(form, "url"),
    category: str(form, "category"),
    tagline: str(form, "tagline"),
    description: str(form, "description"),
    tags: str(form, "tags"),
    year: str(form, "year"),
    order: Number(str(form, "order")) || 0,
    featured: bool(form, "featured"),
    published: bool(form, "published"),
  };
  const back = pid ? `/admin/projects/${pid}` : "/admin/projects/new";
  if (!data.name || !data.slug) redirect(`${back}?error=Name+is+required`);
  if (!isUrl(data.url)) redirect(`${back}?error=Website+URL+must+start+with+https://`);

  const clash = await prisma.project.findUnique({ where: { slug: data.slug } });
  if (clash && clash.id !== pid) redirect(`${back}?error=Another+project+already+uses+that+slug`);

  if (pid) await prisma.project.update({ where: { id: pid }, data });
  else await prisma.project.create({ data });
  refresh();
  redirect("/admin/projects?saved=1");
}

export async function deleteProject(form: FormData) {
  await requireAdmin();
  const pid = id(form);
  if (pid) await prisma.project.delete({ where: { id: pid } });
  refresh();
  redirect("/admin/projects");
}

/* ---------- Jobs ---------- */

export async function saveJob(form: FormData) {
  await requireAdmin();
  const jid = id(form);
  const title = str(form, "title");
  const data = {
    title,
    slug: slugify(str(form, "slug") || title),
    location: str(form, "location"),
    employment: str(form, "employment"),
    hours: str(form, "hours"),
    daysOff: str(form, "daysOff"),
    summary: str(form, "summary"),
    responsibilities: str(form, "responsibilities"),
    requirements: str(form, "requirements"),
    published: bool(form, "published"),
  };
  const back = jid ? `/admin/jobs/${jid}` : "/admin/jobs/new";
  if (!data.title || !data.slug) redirect(`${back}?error=Title+is+required`);

  const clash = await prisma.job.findUnique({ where: { slug: data.slug } });
  if (clash && clash.id !== jid) redirect(`${back}?error=Another+job+already+uses+that+slug`);

  if (jid) await prisma.job.update({ where: { id: jid }, data });
  else await prisma.job.create({ data });
  refresh();
  redirect("/admin/jobs?saved=1");
}

export async function toggleJob(form: FormData) {
  await requireAdmin();
  const jid = id(form);
  if (jid) {
    const job = await prisma.job.findUnique({ where: { id: jid } });
    if (job) await prisma.job.update({ where: { id: jid }, data: { published: !job.published } });
  }
  refresh();
  redirect("/admin/jobs");
}

export async function deleteJob(form: FormData) {
  await requireAdmin();
  const jid = id(form);
  if (jid) await prisma.job.delete({ where: { id: jid } });
  refresh();
  redirect("/admin/jobs");
}

/* ---------- Inbox: messages & applications ---------- */

export async function setMessageRead(form: FormData) {
  await requireAdmin();
  const mid = id(form);
  if (mid) await prisma.message.update({ where: { id: mid }, data: { read: form.get("read") === "1" } });
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(form: FormData) {
  await requireAdmin();
  const mid = id(form);
  if (mid) await prisma.message.delete({ where: { id: mid } });
  revalidatePath("/admin", "layout");
}

export async function setApplicationRead(form: FormData) {
  await requireAdmin();
  const aid = id(form);
  if (aid) await prisma.application.update({ where: { id: aid }, data: { read: form.get("read") === "1" } });
  revalidatePath("/admin", "layout");
}

export async function deleteApplication(form: FormData) {
  await requireAdmin();
  const aid = id(form);
  if (aid) await prisma.application.delete({ where: { id: aid } });
  revalidatePath("/admin", "layout");
}
