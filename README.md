# Third Mile Labs — thirdmilelabs.com

Company website with a built-in admin portal. Next.js 15 (App Router) · Tailwind CSS v4 · Prisma · Postgres.

## Quick start

```bash
docker run -d --name tml-postgres -e POSTGRES_PASSWORD=postgres -p 5434:5432 postgres:16
npm install
cp .env.example .env          # then set ADMIN_PASSWORD and AUTH_SECRET
npm run db:migrate            # creates the tables
npm run db:seed               # services, Svvari + Specfire, the two open roles
npm run dev                   # http://localhost:3000
```

Admin portal: **http://localhost:3000/admin** (password = `ADMIN_PASSWORD`).

Generate a secret with `openssl rand -base64 48`.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, services grid, selected work, why/how we work, open roles, CTA |
| `/services` | All services with detail bullets |
| `/work`, `/work/[slug]` | Portfolio and case-study pages |
| `/careers`, `/careers/[slug]` | Open roles (laid out like the hiring flyers) with apply form |
| `/contact` | Project enquiry form and contact details |

## Admin portal (`/admin`)

- **Dashboard**: unread messages, new applications, open jobs, latest activity
- **Messages**: contact-form enquiries; mark read, reply by email, delete
- **Applications**: candidates per job, with CV links; mark reviewed, delete
- **Jobs**: post, edit, hide/publish, delete roles
- **Projects**: add/edit portfolio items, featured on home, sort order
- **Services**: edit the "What we build" grid (highlight = white card)
- **Site content**: hero text, about copy, CTA, emails, phone, address, social links

All changes go live immediately.

## Project layout

```
prisma/schema.prisma        data model (Setting, Service, Project, Job, Application, Message)
prisma/seed.mjs             initial content
src/app/(site)/             public pages
src/app/admin/              login + admin panel
src/actions/                server actions (public forms, admin CRUD, auth)
src/components/             UI (Logo, Chevrons motif, cards, forms)
src/lib/settings.ts         list of editable site-content fields + defaults
src/middleware.ts           protects /admin
```

## Deploying

**Vercel** (current setup): the project uses the Prisma Postgres integration, which provides
`DATABASE_URL`. Set `ADMIN_PASSWORD` and `AUTH_SECRET` (and optionally `SITE_URL`) in the
project's environment variables. Every deploy runs the `vercel-build` script:

```bash
prisma migrate deploy && node prisma/seed.mjs --if-empty && next build
```

Migrations apply automatically, and the seed only runs against an empty database, so
content edited or deleted in the admin panel is never overwritten.

**Any other Node host:** point `DATABASE_URL` at a Postgres database and run

```bash
npm ci && npm run db:deploy && npm run db:seed && npm run build && npm start
```
