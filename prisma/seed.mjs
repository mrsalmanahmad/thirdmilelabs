// Seeds initial content. Safe to re-run: existing rows are left untouched.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  {
    title: "AI Automations",
    description: "Connect AI to your tools and cut hours of manual work.",
    details:
      "Workflow automation across CRMs, inboxes, sheets and internal tools\nDocument processing, extraction and classification\nAI assistants wired into Slack, WhatsApp and email",
  },
  {
    title: "LLM Apps & AI Agents",
    description: "Product features powered by LLMs and AI APIs.",
    details:
      "Chatbots and copilots grounded in your own data (RAG)\nTool-using agents that take real actions\nEvaluation, guardrails and cost control for production AI",
  },
  {
    title: "Web Applications",
    description: "Fast, clean web platforms built to scale.",
    details:
      "SaaS products, dashboards and internal tools\nREST and GraphQL APIs, integrations and payments\nCloud deployment, monitoring and performance tuning",
  },
  {
    title: "Mobile Apps",
    description: "iOS and Android apps your users enjoy.",
    details:
      "Cross-platform apps with React Native / Flutter\nReal-time features: maps, tracking, chat, notifications\nApp Store and Play Store launch support",
  },
  {
    title: "QA & Test Automation",
    description: "Bugs caught before your users ever see them.",
    details:
      "Manual and exploratory testing for web, mobile and APIs\nAutomated end-to-end suites wired into CI\nRelease checklists and regression coverage",
  },
  {
    title: "Startup MVPs",
    description: "From idea to launch-ready product, fast.",
    details:
      "Scope the smallest product that proves the idea\nDesign, build and ship in weeks, not quarters\nIterate with real users after launch",
    highlighted: true,
  },
];

const projects = [
  {
    slug: "svvari",
    name: "Svvari",
    url: "https://svvari.com",
    category: "Mobile App · Platform",
    tagline: "Flat-fee ride-hailing where drivers keep every fare.",
    description:
      "Svvari is a ride-hailing platform that replaces per-ride commissions with a simple subscription. Drivers pay a weekly, monthly or yearly plan and keep 100% of what they earn, while riders get upfront fares, verified drivers and real-time tracking.\n\nWe built the rider and driver apps for iOS and Android along with the platform behind them: live tracking with ETAs, driver and vehicle verification, two-way ratings, subscription billing and payouts.",
    tags: "iOS, Android, Real-time tracking, Subscriptions, Payments",
    order: 1,
  },
  {
    slug: "specfire",
    name: "Specfire",
    url: "https://specfire.ai",
    category: "AI · Developer Tools",
    tagline: "The AI-native API manager.",
    description:
      "Specfire rethinks API management for the AI era. It is an AI-native API manager for teams that design, document and maintain APIs.",
    tags: "AI, LLMs, APIs, Developer tools, SaaS",
    order: 2,
  },
];

const jobs = [
  {
    slug: "junior-software-ai-engineer",
    title: "Junior Software AI Engineer",
    summary:
      "Join our engineering team to build AI-powered product features, backend services and automations for clients and our own products.",
    responsibilities:
      "Build product features using LLMs and AI APIs\nWrite clean Python or JavaScript backend code\nAutomate workflows and connect AI to real tools",
    requirements:
      "BS in CS, SE or IT (fresh grads welcome)\nPython or JavaScript, Git and REST APIs\nHands-on interest in LLMs and AI agents",
  },
  {
    slug: "junior-qa-engineer",
    title: "Junior QA Engineer",
    summary:
      "Help us ship software that just works. You'll test web apps and APIs, report bugs clearly and grow into test automation.",
    responsibilities:
      "Write and run test cases for web apps and APIs\nFind, report and track bugs clearly\nLearn test automation with modern tools",
    requirements:
      "BS in CS, SE or IT (fresh grads welcome)\nBasic knowledge of SDLC and testing\nSharp eye for detail, good communication",
  },
];

async function main() {
  // `--if-empty` (used by the Vercel build) seeds only a brand-new database,
  // so content deleted in the admin panel isn't re-created on every deploy.
  if (process.argv.includes("--if-empty")) {
    const [services, projects, jobs] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.job.count(),
    ]);
    if (services + projects + jobs > 0) {
      console.log("Database already has content, skipping seed.");
      return;
    }
  }
  if ((await prisma.service.count()) === 0) {
    for (const [i, s] of services.entries()) {
      await prisma.service.create({ data: { ...s, order: i + 1 } });
    }
  }
  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: {}, create: p });
  }
  for (const j of jobs) {
    await prisma.job.upsert({ where: { slug: j.slug }, update: {}, create: j });
  }
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
