<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- Everything below is hand-maintained; `next dev` only upserts the block above. -->

# cloud-resume

Personal resume site for **ongyiktatt.com**: Next.js 16 (Pages Router) + React 18 + Tailwind 3 + TypeScript (strict), deployed as a **static export** to S3/CloudFront. The contact form is the only dynamic feature and is backed by an AWS Lambda.

## Commands

| Command                                                 | Notes                                                                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn dev`                                              | `tsc --build` then `next dev` (Turbopack).                                                                                                        |
| `yarn build`                                            | `yarn compile && next build` → static export in `out/`. **This is exactly what CI runs.**                                                         |
| `yarn compile`                                          | `tsc --build` only — a fast type-check without a full build.                                                                                      |
| `yarn lint`                                             | ⚠️ **Mutates files** (`prettier --write` + `eslint --fix`). Not a check.                                                                          |
| `yarn eslint 'src/**/*.{ts,tsx}' --max-warnings=0`      | Read-only lint check (no `--fix`). Use this to verify instead of `yarn lint`.                                                                     |

There is no test suite.

## Architecture

- **Static export.** `next.config.js` sets `output: 'export'`; there is no Next.js server, no API routes and no SSR. `out/` is the deployable artifact, so anything needing a secret must live in AWS.
- **Turbopack is the default bundler** for both `next dev` and `next build`. Any `webpack` key in `next.config.js` makes the build fail by design — do not add one.
- **Deploy** is GitHub Actions (`.github/workflows/main.yml`): push to `main` → `yarn build` → `aws s3 sync out/ …` → CloudFront invalidation.
- **Content is data-driven.** Copy lives in `src/data/data.tsx` (types in `src/data/dataDef.ts`); site-wide constants and env-var fallbacks live in `src/config.ts`. Prefer editing data over components.
- **Contact form**: `src/components/Sections/Contact/ContactForm.tsx` → Lambda Function URL from `src/config.ts`. The backend is `aws/recaptcha-verify/` — see its [README](./aws/recaptcha-verify/README.md).

## Conventions

- TypeScript is `strict` with `noUnusedLocals`/`noUnusedParameters`. CI type-checks with `tsc --build` **before** `next build`, so a type error fails the deploy.
- ESLint runs at `--max-warnings=0` (`eslint.config.mjs`) and enforces things that look unusual:
  - `simple-import-sort` — imports must be sorted (unused imports are auto-removed by `--fix`).
  - `react/jsx-sort-props` — JSX props in alphabetical order.
  - `object-curly-spacing: never` — `{a, b}`, never `{ a, b }`.
  - `react-memo/require-memo` + `require-usememo` — every component needs `memo()`, and every local value passed into JSX or a dependency array needs `useMemo`/`useCallback` (use the `// eslint-disable-next-line react-memo/require-memo` escape only for `next/dynamic`, as `src/pages/index.tsx` does).
- The `react-memo` plugin is **vendored and patched** at `tools/eslint-plugin-react-memo/` (upstream is from 2015). Read its [README](./tools/eslint-plugin-react-memo/README.md) before touching it.
- Prettier (`.prettierrc`): single quotes, no bracket spacing, 120 columns, `bracketSameLine`, `arrowParens: avoid`. It does **not** set `jsxSingleQuote`, so Prettier rewrites JSX attributes to double quotes — running it over `src/data/data.tsx` produces ~100 lines of unrelated churn. Avoid.
- Both `NEXT_PUBLIC_*` values are **required** — `src/config.ts` throws at build time when one is missing or empty, and GitHub Actions substitutes `""` for an unset repository variable, so empty counts as missing. Locally they go in `.env.local`; in CI they come from the `RECAPTCHA_SITE_KEY` and `CONTACT_VERIFY_URL` repository variables. There are no committed fallbacks.
- Components are `memo()`-wrapped function components with a default export; pages live in `src/pages/`, sections in `src/components/Sections/`.
- Nav scroll-spy (`src/hooks/useNavObserver.tsx`) deliberately uses a thin detection band with `threshold: 0`. Section ids are `hero, about, resume, portfolio, contact` — there is no `#home`.

## AWS

- The CLI authenticates through **`aws login`** (short-lived). Sessions expire and then fail with `CreateOAuth2Token … authorization grant is invalid`. Ask the user to re-run `aws login` — never run it on their behalf.
- `NEXT_PUBLIC_*` values are inlined into the bundle at build time, so they are public. Never put a secret in one; the reCAPTCHA secret lives only in the Lambda's environment.
- Deployment, CORS and SNS details: [aws/recaptcha-verify/README.md](./aws/recaptcha-verify/README.md). For live resource ids and infra constraints, see `.github/instructions/aws-infrastructure.instructions.md`.

## Reference

- User-facing setup and customization guide: [README.md](./README.md)
- Next.js 16 docs are vendored at `node_modules/next/dist/docs/` (Pages Router pages under `02-pages/`). Read the relevant page before using a Next API — this version differs from older releases.

