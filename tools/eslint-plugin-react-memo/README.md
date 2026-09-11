# eslint-plugin-react-memo (vendored)

A patched copy of [`eslint-plugin-react-memo@0.0.3`](https://github.com/steadicat/eslint-plugin-react-memo)
(MIT), used by `eslint.config.mjs`.

## Why it is vendored

Upstream has not been published since 2015 and calls two `context` members that
ESLint removed:

| Removed | Replacement | Call site |
| --- | --- | --- |
| `context.getScope()` | `sourceCode.getScope(node)` | `getIdentifierMemoStatus()` |
| `context.getFilename()` | `context.filename` | `checkFunction()`, ×2 |

On ESLint 9+ this surfaced as a hard crash rather than a lint error:

```
TypeError: context.getScope is not a function
Rule: "react-memo/require-usememo"
    at getIdentifierMemoStatus (dist/index.js:133:28)
```

No maintained package provides equivalent rules — `eslint-plugin-react-perf` is
the only candidate and its peer range also stops at ESLint 9.

## Provenance

`index.js` is the published `dist/index.js`, verbatim except for the two patches
above (documented in the file header). The patch was validated by linting a
fixture with deliberate violations under both ESLint 8 + the original plugin and
ESLint 10 + this copy: **identical output** — same 9 messages, same lines,
columns, rule IDs and message text.

## Updating

Only if upstream ever ships a release. Otherwise, leave it alone: the two rules
are stable and self-contained.
