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

## Tech stack

- Next.js
- React
- TypeScript
- ESLint
