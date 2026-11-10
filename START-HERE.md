# AW11 Parts Exchange handover for Claude

## Requested outcome

Import the source in this ZIP into [cdAether/Parts-Hub](https://github.com/cdAether/Parts-Hub). Check the remote branch first and preserve any existing work. The owner approved a public source repository with sensitive values replaced or omitted. GitHub rejected writes from the previous connection, so verify that the current GitHub connection can push before attempting a deployment.

The owner also wants the website hosted from GitHub. Treat that as a deployment goal to resolve separately from the source import. GitHub Pages can serve a public static catalogue. To preserve the working dashboard, use a server deployment built from the GitHub repo. The current app depends on Cloudflare Workers, D1, R2 and Sites-managed authentication. A standalone Worker deployment needs its own trusted authentication or gateway. Do not trust identity headers supplied directly by clients. Configure hosting IDs and credentials outside Git and use placeholders in public documentation.

## What is in this package

- Current sanitised application source, dependency lockfile, build scripts and database schema/migration.
- [Project brief](docs/PROJECT_BRIEF.md) with feature status, previous verification, operating rules and planned work.
- [Hosted verification checklist](docs/HOSTED_VERIFICATION.md) for sign-in, records, revision history, photos and catalogue export.
- [README](README.md) with local setup and framework details.

The app source is at the ZIP root. Include dotfiles when importing. The live deployment is recorded as `<CURRENT_SITE_URL>` and its Sites identity as `<SITES_PROJECT_ID>`. Live database contents, photo binaries, private handover notes, secrets and prior Git history are outside this package. The previous build checks apply to the recovered source, and no new hosted deployment has been verified from this export.

## Technical map

| Area | Source |
| --- | --- |
| Dashboard and catalogue export | `app/page.tsx`, `app/workspace.tsx` |
| Identity | `app/chatgpt-auth.ts` |
| Owner-scoped records, revisions and photos | `app/api/records/route.ts`, `app/api/history/route.ts`, `app/api/photos/route.ts` |
| Worker and storage bindings | `worker/index.ts`, `.openai/hosting.json`, `vite.config.ts` |
| Database schema and migrations | `db/schema.ts`, `drizzle/` |

Use Node.js 22.13 or newer. From the extracted project root, run `npm run install:ci`, `npm run dev` for local development and `npm run build` for the Worker build. See the README for local migrations and mock sign-in. Use the hosted verification checklist before switching live traffic. If the owner requests data migration, plan a separately verified export/import for D1 records and revisions plus R2 photos, and map identities so existing records remain accessible only to their owner. The existing JSON backup is partial.

Polycam support is planned. Start by testing a sample share/embed link or textured mesh export for a single exact unit. Keep the 3D viewer optional and load it on demand. Confirm that sharing permissions match the intended audience.
