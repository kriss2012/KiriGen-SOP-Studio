#!/usr/bin/env bash
# One-time local setup: installs deps, copies .env, spins up Postgres,
# runs migrations, and seeds demo data.
set -euo pipefail

echo "==> Checking for pnpm"
command -v pnpm >/dev/null 2>&1 || { echo "pnpm not found — installing via corepack"; corepack enable && corepack prepare pnpm@9.1.0 --activate; }

echo "==> Installing dependencies"
pnpm install

if [ ! -f .env ]; then
  echo "==> Creating .env from .env.example"
  cp .env.example .env
  echo "    Edit .env and fill in real secrets before continuing (API keys, JWT secret, etc.)"
fi

echo "==> Starting Postgres + Redis (docker compose)"
pnpm docker:up -d postgres redis || docker compose -f docker/docker-compose.yml up -d postgres redis

echo "==> Waiting for Postgres to accept connections"
until docker compose -f docker/docker-compose.yml exec -T postgres pg_isready -U kirigen >/dev/null 2>&1; do
  sleep 1
done

echo "==> Running Prisma migrations"
pnpm db:generate
pnpm db:migrate

echo "==> Seeding demo data"
pnpm db:seed

echo ""
echo "Setup complete. Next steps:"
echo "  pnpm dev            # run web (port 3000) + api (port 4000) together"
echo "  http://localhost:4000/api/docs   # Swagger UI"
