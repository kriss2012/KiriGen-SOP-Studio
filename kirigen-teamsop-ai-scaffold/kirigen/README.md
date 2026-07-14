# KiriGen TeamSOP AI — codebase scaffold

This is a **scaffold**, not a running application: a complete folder
structure, Prisma schema, NestJS API modules, and Next.js pages that
match the architecture described in the project spec. It's meant to be
the starting point you `pnpm install` into and build out — it will not
run as-is (no `node_modules`, no live database, some integrations are
stubs) but every file is real, wired-together code, not placeholders.

## What's actually here

- **`apps/web`** — Next.js 14 frontend. Pages for landing, login,
  dashboard, SOP list/detail/generate. NextAuth wired for credentials +
  Google OAuth. Talks to the API through a `/api/backend/*` rewrite
  (see `next.config.js`) so the browser never calls the NestJS API
  directly.
- **`apps/api`** — NestJS backend. Modules: `auth` (JWT + bcrypt),
  `sop` (CRUD + AI generation), `team` (membership/roles), `analytics`
  (usage summaries), `ai` (provider-agnostic facade over OpenAI /
  Ollama / Loom transcript fetching). Swagger auto-generated at
  `/api/docs`.
- **`prisma/schema.prisma`** — the full data model: `User`,
  `Organization`, `Team`, `TeamMember` (with roles), `SOP`,
  `SopVersion` (immutable snapshots), `ChecklistItem`, `Comment`,
  `AuditLog`, `Workflow`, `TrainingRecord`, `Subscription`.
- **`packages/`** — shared code: `database` (Prisma client singleton),
  `ai` (shared prompt templates), `ui` (design tokens), `utils`.
- **`docker/`** — `Dockerfile.web`, `Dockerfile.api`, and a
  `docker-compose.yml` that runs Postgres + Redis + both apps together.
- **`.github/workflows/`** — a CI pipeline (lint/build/test against a
  throwaway Postgres) and an example deploy pipeline (Vercel + Railway).
- **`docs/`** — `architecture.md` (with a request-flow walkthrough),
  `er-diagram.md`, and `api-spec.yaml` (OpenAPI 3.0 covering every
  scaffolded endpoint).
- **`scripts/setup.sh`** / **`scripts/deploy.sh`** — the commands
  below, scripted.

## Getting this running for real

You'll need Node 20+, `pnpm`, and Docker (for local Postgres/Redis).
Nothing here has been `npm install`ed yet — this environment had no
network access to fetch packages, so dependency installation is the
first thing to do on your own machine.

```bash
# 1. Install dependencies (reads workspaces from the root package.json)
pnpm install

# 2. Copy env vars and fill in real values
cp .env.example .env
#   at minimum: DATABASE_URL, JWT_SECRET, OPENAI_API_KEY

# 3. Start Postgres + Redis
pnpm docker:up          # or: docker compose -f docker/docker-compose.yml up -d postgres redis

# 4. Create tables and seed demo data
pnpm db:generate
pnpm db:migrate
pnpm db:seed

# 5. Run both apps
pnpm dev                # web on :3000, api on :4000
```

Or just run `./scripts/setup.sh` to do steps 1–4 in one go.

Swagger UI for the API is at `http://localhost:4000/api/docs` once
it's running.

## What's stubbed vs. real

Real, working logic (once dependencies are installed and env vars are
set):
- Signup/login with bcrypt + JWT
- SOP CRUD, team membership checks, approve → audit log
- AI generation calling the real OpenAI chat completions API
- Prisma schema + migrations + seed script

Intentional stubs — these need a decision from you before they're
production-ready:
- **OAuth (Google/GitHub)** in `AuthController` — the NextAuth side is
  wired, but there's no server-side Google/GitHub strategy in NestJS;
  either verify NextAuth's session JWT directly in the API, or add
  `passport-google-oauth20` there too.
- **File upload / OCR** for PDF/DOCX import — `SOP.sourceType:
  UPLOADED_DOC` exists in the schema, but there's no S3 upload route or
  text-extraction step yet.
- **Workflow builder canvas** — `Workflow.definition` stores an
  arbitrary JSON graph; no drag-drop UI is scaffolded (would suggest
  `react-flow`).
- **Stripe/Razorpay webhooks** — `Subscription` model exists; no
  webhook handler keeps it in sync yet.
- **Slack/Teams/Discord notifications** — env vars are present in
  `.env.example`; no code sends to them yet.

See `docs/architecture.md` for the reasoning behind the stack choices
and a full request-flow example (transcript → generated SOP).
