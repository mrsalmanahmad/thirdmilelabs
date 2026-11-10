import { prisma } from "./db";

// Every editable piece of site copy, with its default value.
// Admin > Site content writes overrides into the Setting table.
export const SETTING_FIELDS = [
  { key: "heroEyebrow", label: "Hero label", group: "Home · Hero", default: "Software studio · Lahore" },
  { key: "heroTitle", label: "Hero headline", group: "Home · Hero", default: "We turn ideas into working software." },
  {
    key: "heroSubtitle",
    label: "Hero subtitle",
    group: "Home · Hero",
    multiline: true,
    default:
      "Third Mile Labs designs, builds and tests AI automations, LLM products, web platforms and mobile apps for startups and growing businesses.",
  },
  { key: "aboutTitle", label: "About headline", group: "Home · About", default: "Most teams go the extra mile. We go the third." },
  {
    key: "aboutBody",
    label: "About text",
    group: "Home · About",
    multiline: true,
    default:
      "The first mile is the idea. The second is getting something built. The third mile is where most projects stall: the testing, polish and production hardening that turn a demo into a product people rely on. That's the mile we specialise in.",
  },
  { key: "ctaTitle", label: "CTA headline", group: "Call to action", default: "Have an idea? Let's build it." },
  {
    key: "ctaSubtitle",
    label: "CTA text",
    group: "Call to action",
    multiline: true,
    default: "Tell us what you're building. We'll reply within one business day with next steps.",
  },
  {
    key: "careersIntro",
    label: "Careers intro",
    group: "Careers",
    multiline: true,
    default:
      "We're a small, hands-on team in Lahore building AI and software products. If you like shipping real things and learning fast, we'd like to meet you.",
  },
  { key: "contactEmail", label: "Contact email", group: "Contact details", default: "hello@thirdmilelabs.com" },
  { key: "careersEmail", label: "Careers email", group: "Contact details", default: "careers@thirdmilelabs.com" },
  { key: "contactPhone", label: "Phone / WhatsApp", group: "Contact details", default: "" },
  { key: "address", label: "Office address", group: "Contact details", default: "Lahore, Pakistan" },
  { key: "officeHours", label: "Office hours", group: "Contact details", default: "Sun – Thu · 10 AM – 7 PM PKT" },
  { key: "linkedin", label: "LinkedIn URL", group: "Social links", default: "" },
  { key: "instagram", label: "Instagram URL", group: "Social links", default: "" },
  { key: "facebook", label: "Facebook URL", group: "Social links", default: "" },
  { key: "x", label: "X / Twitter URL", group: "Social links", default: "" },
  { key: "github", label: "GitHub URL", group: "Social links", default: "" },
] as const;

export type SettingKey = (typeof SETTING_FIELDS)[number]["key"];
export type Settings = Record<SettingKey, string>;

export async function getSettings(): Promise<Settings> {
  const rows = await prisma.setting.findMany();
  const stored = new Map(rows.map((r) => [r.key, r.value]));
  return Object.fromEntries(
    SETTING_FIELDS.map((f) => [f.key, stored.get(f.key) ?? f.default]),
  ) as Settings;
}
