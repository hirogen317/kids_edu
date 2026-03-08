# Kids Edu Monorepo

Initial monorepo scaffold for an AI-native kids education product.

## Stack

- `pnpm` workspaces
- Next.js 16 App Router in `apps/web`
- Prisma ORM 7 in `packages/db`
- PostgreSQL 17 in Docker Compose
- Shared provider-agnostic AI contract in `packages/ai`

## Quick Start

This section is the source of truth for local setup.

1. Use the pinned Node version:

   ```bash
   nvm use
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create local environment variables:

   ```bash
   cp .env.example .env
   ```

   The default local PostgreSQL host port is `5433`.

4. Start PostgreSQL:

   ```bash
   pnpm db:up
   ```

5. Generate the Prisma client and run the first migration:

   ```bash
   pnpm db:generate
   pnpm db:migrate:dev -- --name init
   ```

6. Start the web app:

   ```bash
   pnpm dev
   ```

## Environment Notes

- Copy `.env.example` to `.env` before running the app or database tooling.
- Local PostgreSQL runs in Docker and is exposed on host port `5433`.
- The default local `DATABASE_URL` is:

  ```bash
  postgresql://kids_edu:kids_edu@localhost:5433/kids_edu?schema=public
  ```

## Workspace Layout

- `apps/web`: marketing site and future product surface
- `packages/db`: Prisma schema, migrations, and database client
- `packages/ai`: AI provider interfaces and baseline contracts
- `packages/config`: shared product configuration
