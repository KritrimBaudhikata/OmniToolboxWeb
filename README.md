# SuperAppWeb

SuperAppWeb is a Next.js web app that bundles a collection of useful online tools.

## Local development

Requirements:

- Node.js 20+
- npm

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Run smoke check:

```bash
npm run smoke
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Auth + Google Drive sync

This repo includes app-wide Google Drive draft sync:

- User signs in with Google through Firebase Authentication.
- Server verifies Firebase ID token at `/api/auth/verify`.
- Tool drafts are saved in the user Google Drive `appDataFolder` per tool route.
- The app server does not store tool content.
- Sign-in session persists, so users do not need to re-sign on every page.

### Environment setup

1. Copy `.env.example` to `.env.local`.
2. Fill Firebase client vars (`NEXT_PUBLIC_FIREBASE_*`) from your Firebase web app config.
3. Fill Firebase admin vars (`FIREBASE_ADMIN_*`) from a Firebase service account key.
4. Enable **Google** sign-in provider in Firebase Authentication.
5. Enable **Google Drive API** in Google Cloud for the same project.
6. Add required authorized domains (localhost, staging, production).
7. Restart the dev server.

### Firebase cost note

- Yes, Firebase Auth can be free at low usage on Spark.
- Cost can apply if you exceed free limits or enable paid features.
- Avoid phone auth if you want predictable low cost (SMS is billed separately).
- Set Firebase and Google Cloud budget alerts before moving to production scale.

## Security for public repository

This repository is intended to be public. Please follow these rules before every commit:

1. Never commit secrets (API keys, tokens, passwords, private keys, certificates).
2. Keep local environment variables only in `.env.local` (already ignored by git).
3. Commit only sanitized examples such as `.env.example`.
4. Review changed files with `git status` and `git diff` before committing.
5. Run the secret scan:

```bash
npm run security:scan
```

If the security scan reports any finding, remove or rotate the secret immediately and recommit.

## Deployment

Deployment notes are documented in `info_files/DEPLOYMENT_CHECKLIST.md`.

### Netlify manual-only deploy policy

To conserve deploy credits:

- `main` is production (custom subdomain/domain).
- `staging` is branch deploy (Netlify domain).
- Auto deploys and auto preview deploys should remain disabled in Netlify UI.
- `netlify.toml` uses an ignore gate. Builds run only when `MANUAL_DEPLOY_APPROVED=true`.

Manual deploy example:

```bash
MANUAL_DEPLOY_APPROVED=true netlify deploy --build --context branch-deploy
```

Production deploy example:

```bash
MANUAL_DEPLOY_APPROVED=true netlify deploy --build --context production
```

## Legal pages

If you change sign-in, sync, or storage behavior, update legal copy in:

- `src/lib/legal.ts`
- `/privacy` and `/terms` page content rendered from that file

## Tech stack

- Next.js
- React
- TypeScript
- ESLint
