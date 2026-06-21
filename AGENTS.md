# FLOKKA

FLOKKA is a French e-commerce platform for custom-printed textile (sports clubs / associations). It is a single Next.js 14 (App Router) application with a Prisma + **PostgreSQL** backend and JWT-based admin auth. Production target: **Supabase** (Postgres) + **Netlify** (hosting).

## Cursor Cloud specific instructions

### Service overview
- Single service: a Next.js 14 app (frontend + API routes under `src/app/api/**`) backed by Prisma/PostgreSQL.
- Public site (`/`, `/boutique/[slug]`, `/contact`, ...) plus an admin back-office under `/admin` (login at `/admin/login`).
- Standard commands live in `package.json` scripts (`dev`, `build`, `start`, `db:migrate`, `db:deploy`, `db:seed`, `db:studio`). Package manager is npm. `postinstall` runs `prisma generate` automatically.

### Local database (PostgreSQL)
- Dev/test uses a **local PostgreSQL** (installed via apt, data persists in the VM snapshot). The Postgres service does NOT auto-start on boot — start it each session with:
  - `sudo pg_ctlcluster 16 main start`
- Local dev DB / role (already created, persisted in snapshot): database `flokka_dev`, role `flokka` / password `flokka_dev_pwd` (has `CREATEDB` for Prisma's shadow DB).
- A `.env` file (gitignored) is required. For local dev both URLs point to local Postgres:
  - `DATABASE_URL="postgresql://flokka:flokka_dev_pwd@localhost:5432/flokka_dev?schema=public"`
  - `DIRECT_URL="..."` (same value locally)
  - `JWT_SECRET` (optional locally; falls back to a dev value in `src/lib/auth.ts`).
- First-time DB setup (only if the local DB is empty/reset):
  - `npx prisma migrate deploy` (apply migrations) then `npm run db:seed` (sample data + admin user).
  - Seeding is mostly idempotent (upserts); sample orders are recreated each run.

### Running
- Dev server: `npm run dev` (port 3000). Run it in a background/tmux session. Ensure Postgres is started first.
- Seeded admin login: `admin@flokka.fr` / `admin123` (at `/admin/login`).

### Pricing / orders model (important domain logic)
- Client-facing price = supplier `basePrice` + club `margin %`, unless a per-club `customPrice` override exists. Single source of truth: `computeEffectivePrice()` in `src/lib/utils.ts`.
- No online payment. Orders are created as `pending`/`unpaid`; the customer pays their club directly. The order API (`/api/shop/[slug]/order`) **recomputes prices server-side** — never trust client-sent prices.

### Production (Vercel + Neon)
- Prisma `datasource` uses `url = DATABASE_URL` (Neon **pooled** endpoint, host with `-pooler`, `?sslmode=require`) and `directUrl = DIRECT_URL` (Neon **direct** endpoint, no `-pooler`) for migrations.
- `vercel.json` build command: `prisma generate && prisma migrate deploy && next build`. Set `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET` in Vercel env vars **before** the first deploy (the build runs migrations).
- Prisma generator `binaryTargets` includes `rhel-openssl-1.0.x` and `rhel-openssl-3.0.x` for Vercel serverless functions — keep them.
- One-time prod seeding (admin user + sample data): run `DATABASE_URL="<neon-direct-url>" DIRECT_URL="<neon-direct-url>" npm run db:seed` once.

### Gotchas
- `npm run lint` (`next lint`) is INTERACTIVE and hangs (no committed ESLint config). Avoid in non-interactive contexts unless a config is added.
- Running `next build` while `next dev` is running corrupts the dev server's `.next` cache (MODULE_NOT_FOUND). Stop the dev server, `rm -rf .next`, then restart dev after a build.
- Most `/api/*` admin routes require a Bearer JWT (from `POST /api/auth/login`). Public shop reads use `/api/shop/[slug]*`.
- The app code lives on the `cursor/flokka-website-f2db` branch; `main` is only a stub README.
