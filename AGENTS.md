<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- Everything below is hand-maintained; `next dev` only upserts the block above. -->

# cloud-resume

Personal resume site for **ongyiktatt.com**: Next.js 16 (Pages Router) + React 18 + Tailwind 3 + TypeScript (strict), deployed as a **static export** to S3/CloudFront. The contact form is the only dynamic feature and is backed by an AWS Lambda.

Toolchain: **Node 26** (`.nvmrc`, `engines`) and **Yarn 1**. Run `yarn install` before anything else.

## Public repository

This repository is public, so everything committed is world-readable.

- **Never commit an account id, ARN, role name, bucket name, distribution id, Function URL or the contact-form notification address.** Docs use `<PLACEHOLDER>` values and the real ones are resolved at runtime with the aws CLI — see `.github/instructions/aws-infrastructure.instructions.md`.
- Deploy configuration lives in **GitHub repository variables** read by `.github/workflows/main.yml`. Do not reintroduce literals into the workflow.
- `NEXT_PUBLIC_*` values are inlined into the bundle at build time, so they are **public by design**. No secret belongs in this repo; the reCAPTCHA secret lives only in the Lambda's environment.

## Scoped instructions

These instruction files load automatically for matching paths. Read the one that applies before editing:

| File                                                                                              | Applies to                                                      | Holds                                                                                  |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [aws-infrastructure](./.github/instructions/aws-infrastructure.instructions.md)                     | `aws/**`, `src/config.ts`, Contact section, deploy workflow     | Live AWS resource facts, account quotas, CORS and Free-plan constraints                 |
| [dependency-upgrades](./.github/instructions/dependency-upgrades.instructions.md)                   | `package.json`, `yarn.lock`                                     | How to read `yarn audit`/`yarn outdated`, the React 18 pin, `yarn upgrade` over `resolutions` |
| [resume-latex](./.github/instructions/resume-latex.instructions.md)                                 | `resume/**`, `.github/workflows/main.yml`                       | Résumé positioning rules, LaTeX layout traps, the PDF cache pipeline                   |

[redact-public-docs](./.github/prompts/redact-public-docs.prompt.md) is the checklist for stripping account identifiers before publishing.

## Commands

| Command                                                 | Notes                                                                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn dev`                                              | `tsc --build` then `next dev` (Turbopack).                                                                                                        |
| `yarn build`                                            | `yarn compile && next build` → static export in `out/`. **This is exactly what CI runs.**                                                         |
| `yarn compile`                                          | `tsc --build` only — a fast type-check without a full build.                                                                                      |
| `yarn lint`                                             | ⚠️ **Mutates files** (`prettier --write` + `eslint --fix`). Not a check.                                                                          |
| `yarn eslint 'src/**/*.{ts,tsx}' --max-warnings=0`      | Read-only lint check (no `--fix`). Use this to verify instead of `yarn lint`.                                                                     |

There is no test suite, and **no local LaTeX toolchain** (no `pdflatex`, `latexmk` or `docker`) — `resume/resume.tex` can only be compiled by CI.

## Architecture

- **Static export.** `next.config.js` sets `output: 'export'`; there is no Next.js server, no API routes and no SSR. `out/` is the deployable artifact, so anything needing a secret must live in AWS.
- **Turbopack is the default bundler** for both `next dev` and `next build`. Any `webpack` key in `next.config.js` makes the build fail by design — do not add one.
- **Deploy** is GitHub Actions (`.github/workflows/main.yml`): push to `main` → `yarn build` → `aws s3 sync out/ …` → CloudFront invalidation.
- **Content is data-driven.** Copy lives in `src/data/data.tsx` (types in `src/data/dataDef.ts`); site-wide constants and env-var fallbacks live in `src/config.ts`. Prefer editing data over components.
- **Contact form**: `src/components/Sections/Contact/ContactForm.tsx` → Lambda Function URL from `src/config.ts`. The backend is `aws/recaptcha-verify/` — see its [README](./aws/recaptcha-verify/README.md).
- **The résumé PDF is built from LaTeX in CI.** `resume/resume.tex` is the source of truth; the workflow compiles it and publishes it as `public/assets/Resume_Ong Yik Tatt.pdf`. Read [.github/instructions/resume-latex.instructions.md](./.github/instructions/resume-latex.instructions.md) before editing the source or its CI steps.

## Conventions

- TypeScript is `strict` with `noUnusedLocals`/`noUnusedParameters`. CI type-checks with `tsc --build` **before** `next build`, so a type error fails the deploy.
- ESLint runs at `--max-warnings=0` (`eslint.config.mjs`) and enforces things that look unusual:
  - `simple-import-sort` — imports must be sorted (unused imports are auto-removed by `--fix`).
  - `perfectionist/sort-jsx-props` — JSX props in alphabetical order.
  - `object-curly-spacing: never` — `{a, b}`, never `{ a, b }`.
  - `react-memo/require-memo` + `require-usememo` — every component needs `memo()`, and every local value passed into JSX or a dependency array needs `useMemo`/`useCallback` (use the `// eslint-disable-next-line react-memo/require-memo` escape only for `next/dynamic`, as `src/pages/index.tsx` does).
- The `react-memo` plugin is **vendored and patched** at `tools/eslint-plugin-react-memo/` (upstream is from 2015). Read its [README](./tools/eslint-plugin-react-memo/README.md) before touching it.
- Prettier (`.prettierrc`): single quotes, no bracket spacing, 120 columns, `bracketSameLine`, `arrowParens: avoid`. It does **not** set `jsxSingleQuote`, so Prettier rewrites JSX attributes to double quotes — running it over `src/data/data.tsx` produces ~100 lines of unrelated churn. Avoid.
- **Copy is British English**: `-ise`/`-isation`, `behaviour`, `centre`, `programme` (a scheme — `program` stays for software), `fulfilment`, `organisation`. This covers site copy, the résumé source, comments and documentation. Do not convert it back; note that `yarn.lock` package names such as `@img/colour` are not prose.
- `next-env.d.ts` is tracked but auto-generated: it points at `./.next/types/…` after `next build` and `./.next/dev/types/…` after `next dev`, so it dirties the working tree whenever you switch command. It is not part of the `tsc` program (`tsconfig.json` only includes `./src/**/*`). Revert the churn rather than committing it.
- `.yarnrc` sets `workspaces-experimental false` deliberately. Yarn 1 prints "Workspaces can only be enabled in private projects" once per dependency path on a clean install, because `eslint` publishes a `workspaces` field without `private: true`. Keep the setting if the warning reappears — do not silence it by adding `private: true`.
- Both `NEXT_PUBLIC_*` values are **required** — `src/config.ts` throws at build time when one is missing or empty, and GitHub Actions substitutes `""` for an unset repository variable, so empty counts as missing. Locally, copy `.env.example` to `.env.local` and fill both in (`.env.local` is gitignored — never commit it); in CI they come from the `RECAPTCHA_SITE_KEY` and `CONTACT_VERIFY_URL` repository variables. There are no committed fallbacks.
- Components are `memo()`-wrapped function components with a default export; pages live in `src/pages/`, sections in `src/components/Sections/`.
- Nav scroll-spy (`src/hooks/useNavObserver.tsx`) deliberately uses a thin detection band with `threshold: 0`. Section ids are `hero, about, resume, portfolio, contact` — there is no `#home`. **The rendered order is `Hero → About → Resume → Portfolio → Contact`**, and Resume sitting above Portfolio is deliberate (see the comment in `src/pages/index.tsx`) — keep the `navSections` array in `Header.tsx` in that same visual order or the nav lies.
- **Site identity lives in three places** and they have to change together: `homePageMeta.title` and `homePageMeta.description` in `src/data/data.tsx`, and the `name` field in `public/site.webmanifest`. `src/components/Layout/Page.tsx` renders the first two into `<title>`, `<meta name="description">`, `og:*` and `twitter:*`; the manifest supplies the installed-app name. Changing only the title leaves the retired wording in search results and link previews.

### Editing content and layout

- **Long copy in `src/data/data.tsx` is JSX.** `Hero.description` and `About.description` are `JSX.Element`, and `About` renders them inside `<div className="prose">`, so write one `<p>` per paragraph. A plain string — or several paragraphs inside a single `<p>` — has its blank lines collapsed by HTML whitespace rules.
- **`AboutItem.text` and `PortfolioItem.tech` accept `string | string[]`.** Use an array whenever an entry is more than one word: each entry renders `whitespace-nowrap` with `·` separators, so `ITIL 4 Foundation` cannot break in half. A pre-joined string is broken at any space.
- **Portfolio card sizing is load-bearing.** The wrapper is `w-full p-3 sm:w-1/2 md:w-1/3 lg:w-1/4`; the card is `h-full` for text cards but `h-max` when it renders an `<Image>` (otherwise the image stretches); the stack line keeps `min-w-0` so it shrinks instead of pushing the external-link icon past the card's `overflow-hidden` edge.
- **`Skills` is rendered inside `Resume/index.tsx`** (Work → Certification → Skills → Education). The commented-out `<Skills />` in `src/pages/index.tsx` is a stale leftover — uncommenting it duplicates the section.
- **Skill-bar widths come from CSS custom properties**, `--skill-fill` (animates from 0) and `--skill-level` (always the true value), via `w-[var(--skill-fill)]`. Do not switch to an inline `width`: `globalStyles.scss` uses `--skill-level` for its `@media (scripting: none)` fallback, and a `<noscript><style>` fallback would break hydration.
- **Skills are ranked at render time, not in data order.** `SkillGroup` in `Skills.tsx` sorts a copy by `level` descending (stable, so ties keep their data order), so reordering `skills` in `data.tsx` changes nothing. The group heading reserves two lines (`min-h-14`, bottom-aligned) to keep both columns aligned, while skill labels deliberately reserve no height — a name that wraps pushes its bar, and every bar below it in that column, out of line. Keep skill names short enough to stay on one line at 1280px.

## AWS

- The CLI authenticates through **`aws login`** (short-lived). Sessions expire and then fail with `CreateOAuth2Token … authorization grant is invalid`. Ask the user to re-run `aws login` — never run it on their behalf.
- `NEXT_PUBLIC_*` values are inlined into the bundle at build time, so they are public. Never put a secret in one; the reCAPTCHA secret lives only in the Lambda's environment.
- Deployment, CORS and SNS details: [aws/recaptcha-verify/README.md](./aws/recaptcha-verify/README.md). For live resource ids and infra constraints, see `.github/instructions/aws-infrastructure.instructions.md`.

## Reference

- User-facing setup and customisation guide: [README.md](./README.md)
- Next.js 16 docs are vendored at `node_modules/next/dist/docs/` (Pages Router pages under `02-pages/`). Read the relevant page before using a Next API — this version differs from older releases.

