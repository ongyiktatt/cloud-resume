---
description: "Use when editing resume/resume.tex, the published résumé PDF, its LaTeX layout or positioning, or the CI steps that compile it."
applyTo: "resume/**,.github/workflows/main.yml"
---

# Résumé (LaTeX source)

`resume/resume.tex` is the **source of truth** for the résumé PDF. The website does not
render résumé content — it only links the compiled file.

**This file is the authority.** `resume.tex` is deliberately kept free of editing notes so
it reads as a document; it carries only a one-line pointer back here. Anything you learn
while editing it belongs in this file, not as a comment in the source.

## Positioning is deliberate — do not drift

The file declares **VARIANT A: IT Manager / Regional IT Infrastructure Leadership**, and
that choice is load-bearing:

- Leadership, vendor governance and delivery scope come first.
- Cloud appears **only as governance evidence** (cost/vendor/SLA oversight, identity
  governance, least-privilege access, release credential hygiene) — never as hands-on
  build capability.
- No claim to lead a large team. The honest model is a lean regional owner with
  vendor-supplied engineers in two markets.
- **Terraform and IaC are deliberately absent.** Do not reintroduce "Infrastructure as
  Code", "Terraform" or "provisioned as code". The Terraform certification row has been
  removed outright — see *Deliberately removed content* below to put it back.
- Wargaming bullets are **present tense** while the role runs to 31 Dec 2026. Convert them
  to past tense on 1 Jan 2027.

**The website in `src/data/data.tsx` is a separate artefact.** It now targets the same
role — `homePageMeta` and the hero both lead with IT Manager / regional IT operations —
but it deliberately carries more AWS and automation detail than this file allows. Do not
copy website copy into the résumé: the PDF is the more conservative document, and the
Terraform/IaC prohibition above still applies there.

## Layout traps

These all cause silent damage — the typeset output looks fine while being wrong:

- **Never add a global `\setlist[itemize]{…}` override.** It also applies to the outer
  heading list and the certification list, whose spacing the template's negative
  `\vspace` values were calibrated against — the text then overlaps. Scope list spacing
  to `\resumeItemListStart` only, and never set `topsep=0pt`.
- **The four two-column macros silently overflow.** `\resumeSubheading`,
  `\resumeSubSubheading`, `\resumeProjectHeading` and `\resumeCertItem` use `tabular*`
  with `l@{\extracolsep{\fill}}r`, and those columns do not wrap: past `0.97\textwidth`
  LaTeX prints beyond the right margin with **no warning at all**. The right-hand
  argument is a **date field only** — keep it short or `{}`.
- The hard `\newpage` before SAFRA keeps that entry from being orphaned, so **any edit
  above it requires a pagination re-check**.
- Two open questions are parked in the source as `% TODO:` comments: the endpoint
  monitoring platform is still unnamed, and it is unconfirmed whether the SAFRA role was
  a contract (a `(Contract)` variant line sits commented out beneath that heading).

## How the PDF reaches the site

There is no local TeX toolchain, so a `.tex` edit can only be structurally checked
locally; CI is the real build. In the `main.yml` **build** job, in order:

1. `Restore the compiled resume PDF` — `actions/cache/restore@v6`, key
   `resume-pdf-v1-${{ hashFiles('resume/resume.tex') }}`, path
   `public/assets/Resume_Ong Yik Tatt.pdf`.
2. `Build resume PDF` — `xu-cheng/latex-action@v4`, skipped entirely on a cache hit.
3. `Publish resume PDF as a static asset` — `mv resume/resume.pdf "public/assets/Resume_Ong Yik Tatt.pdf"`.
4. `Cache the compiled resume PDF` — an explicit `actions/cache/save@v6`.

Two design points worth preserving:

- The key is the **hash of the source**, not the commit, because the committed PDF can lag
  what CI compiled — a hit is therefore always the right PDF.
- The save is a separate step rather than `actions/cache`'s post-step, because a post-step
  runs even after a failure and would cache a stale PDF under the new source's key.

A LaTeX failure fails the job, so a stale PDF is never shipped silently.

The committed `public/assets/Resume_Ong Yik Tatt.pdf` is a local-dev fallback only — CI
always overwrites it (restore on a hit, `mv` on a miss).

**The published filename contains spaces and its one reference is percent-encoded**:
`src/data/data.tsx` links to `/assets/Resume_Ong%20Yik%20Tatt.pdf`. Do not "fix" that to a
literal space. If the file is ever renamed, update that literal, the three paths in
`main.yml` and the two entries in `.gitignore` together.

## Deliberately removed content

These were taken out of `resume.tex` by decision, not by accident, and the exact snippets
live here so they can be restored without rewriting them:

- **Terraform certification row** — removed so the keyword never appears anywhere in the
document. Add it back with the other certifications only if that positioning changes:

  ```latex
  \resumeCertItem{Hashicorp Certified: Terraform Associate \textit{--- in progress}}{Est. Nov 2026}
  ```

- **2027 sabbatical entry** — add as the first entry under Experience if the 2027 gap
  should be visible on the timeline. Do this on the same day the Wargaming bullets are
  converted to past tense:

  ```latex
  \resumeSubheading
    {Career Development Sabbatical}{Jan 2027 -- Present}
    {Cloud Infrastructure Engineering}{Singapore}
    \resumeItemListStart
      \resumeItem{Built and shipped a production portfolio site on AWS --- S3, CloudFront, WAF, Lambda, SNS, Route 53 --- with a keyless GitHub Actions release pipeline via OIDC.}
      \resumeItem{Operate a multi-site Proxmox VE and MikroTik homelab covering VLANs, VPN tunnels, firewall rules and network segmentation.}
    \resumeItemListEnd
  ```
