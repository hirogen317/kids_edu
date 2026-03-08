# AGENTS.md

## User Persona
- Kids: 3 year Japanese Girls curious about the world, love Hiranaga, mathmatics, and science.
- User: A father who enjoys studying together with his kids.

## Repo Shape
- `apps/web`: Next.js app.
- `packages/db`: Prisma schema, migrations, and database client ownership.
- `packages/ai`: AI interfaces and adapters.
- `packages/config`: Shared configuration.

## Key Rules
- Follow the setup instructions in `README.md`.
- Use versions pinned in repo files such as `.nvmrc`, `package.json`, and `compose.yaml`.
- Keep Prisma ownership in `packages/db`.
- Keep AI provider contracts in `packages/ai`.
- Import workspace packages through package entrypoints, not internal files.
- Keep the app bootable without requiring DB or AI availability.

## Validation
- Use root `pnpm` scripts when possible.
- Do not claim a change is verified unless the relevant command was actually run.
