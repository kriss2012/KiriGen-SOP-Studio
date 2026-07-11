#!/usr/bin/env bash
# Example production deploy: builds both apps and runs migrations
# against DATABASE_URL. Intended to be triggered by .github/workflows/deploy.yml
# or run manually against a staging/prod database.
set -euo pipefail

echo "==> Installing dependencies"
pnpm install --frozen-lockfile

echo "==> Running Prisma migrations (deploy = no prompts, no drift check)"
pnpm exec prisma migrate deploy --schema=prisma/schema.prisma

echo "==> Building all apps"
pnpm build

echo "==> Done. Deploy apps/web and apps/api build output to your hosting targets"
echo "    (Vercel for web, Railway/Render/Fly/ECS for api — see docker/Dockerfile.api)"
