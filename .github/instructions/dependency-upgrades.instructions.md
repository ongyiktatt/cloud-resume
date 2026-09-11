---
description: "Use when upgrading, adding, removing or auditing npm/yarn dependencies, bumping package.json versions, refreshing yarn.lock, or investigating yarn audit / yarn outdated output."
applyTo: "package.json,yarn.lock"
---

# Dependency management

## Verify before you change

- **Check a package is actually used before bumping or keeping it.** This repo has a
  history of dead devDependencies (eslint plugins absent from the ESLint config, tools
  with no npm script, stub `@types/*` packages, `prettier-plugin-tailwindcss` installed
  but never registered). `src/` only really imports `@headlessui/react`,
  `@heroicons/react`, `classnames`, `next/*`, `react`, `react-dom` and
  `react-google-recaptcha`.
- `yarn why <pkg>` returning "We couldn't find a match!" is the confirmation that a
  package is genuinely gone.
- Measure a bump before committing: copy `package.json` + `yarn.lock` to a scratch dir,
  patch, `yarn install --ignore-scripts`, then diff `yarn audit --json` results. Leaves
  the repo untouched.

## Reading the audit output

- **`yarn audit` counts dependency *paths*, not packages.** Always reduce to distinct
  modules from the JSON (`data.resolution.path` gives the full chain) before quoting a
  number — otherwise it is misleading and moves for no real reason.
- **`yarn outdated` only reports direct dependencies.** A patched top-level copy can sit
  next to a vulnerable nested one. Enumerate every copy with
  `find node_modules -path "*/<pkg>/package.json" -not -path "*/<pkg>/node_modules/*"`.
- `yarn outdated` has both a `Wanted` and a `Latest` column. Diff `Current` vs `Wanted`
  as a separate step from `Current` vs `Latest` — most of the safe wins are within-major.
- The fix for nested-copy advisories is a plain **`yarn upgrade`** (refresh the lockfile
  within declared ranges), **not** `resolutions`. A global `resolutions` pin clobbers the
  separate top-level copy that other tooling needs.
- `yarn audit` flags some dev-only modules as production because `next@16` itself depends
  on `postcss`. Check whether a module reaches the shipped bundle before treating it as
  production exposure.

## Version constraints (do not "fix" these)

- **React is pinned to 18 on purpose.** Next 16's Pages Router peers `react: ^18.2.0`, and
  React 19 would force a `@headlessui/react` v2 migration (`^16 || ^17 || ^18` today).
- **`resolutions["@types/react"]` must move in lockstep with the `@types/react`
  devDependency.** `@types/react-google-recaptcha` declares `@types/react: "*"`, which
  otherwise resolves to React 19 types and breaks JSX.
- `tailwindcss` 3 → 4 is a CSS-first config migration; `typescript` and
  `postcss-preset-env` majors are also outstanding. Treat all three as separate projects,
  not incidental bumps.
