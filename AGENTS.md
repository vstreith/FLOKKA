# FLOKKA

FLOKKA is a French e-commerce platform for custom-printed textile (sports clubs / associations). It is a single Next.js 14 (App Router) application with a Prisma + SQLite backend and JWT-based admin auth.

## Cursor Cloud specific instructions

### Service overview
- Single service: a Next.js 14 app (frontend + API routes under `src/app/api/**`) backed by Prisma/SQLite.
- Public site (`/`, `/boutique/[slug]`, `/contact`, ...) plus an admin back-office under `/admin` (login at `/admin/login`).
- Standard commands live in `package.json` scripts (`dev`, `build`, `start`, `db:generate`, `db:push`, `db:seed`, `db:studio`). Package manager is npm (`package-lock.json`).

### Environment
- A `.env` file (gitignored) is required with `DATABASE_URL="file:./dev.db"`. `JWT_SECRET` is optional (falls back to a hardcoded dev value in `src/lib/auth.ts`).
- The startup update script runs `npm install` and `npx prisma generate`. It does NOT create or seed the database.
- First-time DB setup (creates `prisma/dev.db` and loads sample data) — run once if the DB is missing:
  - `npx prisma db push` then `npm run db:seed`
  - Seeding is idempotent (upserts). The DB file and `.env` persist in the VM snapshot, so this is normally not needed on subsequent sessions.

### Running
- Dev server: `npm run dev` (serves on port 3000). Run it in a background/tmux session.
- Seeded admin login: `admin@flokka.fr` / `admin123` (used at `/admin/login`).

### Gotchas
- `npm run lint` (`next lint`) is INTERACTIVE and will hang: the repo has no committed ESLint config, so it prompts to set one up. Do not rely on it in non-interactive contexts unless an ESLint config is added.
- Most `/api/*` routes require a Bearer JWT (obtained from `POST /api/auth/login`); unauthenticated calls return `{"error":"Non autorisé"}`. To inspect data without a token, query SQLite directly via Prisma (e.g. `npx tsx -e "..."`) or `npm run db:studio`.
- The app code currently lives on the `cursor/flokka-website-f2db` branch; the `main` branch is only a stub README.
