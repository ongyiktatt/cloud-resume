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

The file targets **service delivery management and end user computing**, and is kept
**universal across both lanes** rather than tuned to a single advert: every line has to
hold up for an EUC Manager, EUC Lead/Specialist, Service Delivery Manager or IT Service
Manager role. The governing filter is that a line stays only if it serves service delivery
or end user computing. That choice is load-bearing:

- Leadership, vendor governance and delivery scope come first.
- Cloud and network engineering are **out as hands-on capability** — the infrastructure
  lane was declined deliberately. AWS survives only as certifications.
- **One standing exception: the `Systems & Platforms (Technical Grounding)` skills line.**
  Service delivery adverts routinely ask for demonstrable platform depth, and the
  differentiator is a manager who can still do the work. Keep it tight and accurately
  levelled — no architecture, no clustering.
- The document is **A4** (`\documentclass[a4paper,…]`), switched from US Letter on
  4 Oct 2026 for the Singapore market.
- No claim to lead a large team. The honest model is a lean regional owner with
  vendor-supplied engineers in two markets.
- **Infrastructure-as-code tooling is deliberately absent.** Do not reintroduce
  provisioning-as-code language, state-management vocabulary or a certification row for
  it — that invites a question about state handling that cannot be defended.
- Wargaming bullets are **present tense** while the role runs to 31 Dec 2026. Convert them
  to past tense on 1 Jan 2027.

**The website in `src/data/data.tsx` is a separate artefact.** It targets the same lane —
`homePageMeta`, the hero and the skills groups all lead with service delivery and end user
computing — but its portfolio entries deliberately carry more cloud and tooling detail
than this file allows. Do not copy website copy into the résumé: the PDF is the more
conservative document, and the infrastructure-as-code prohibition above still applies
there.

## Calibration — do not inflate

This knowledge used to sit in the source as comments. It belongs here instead.

- **Windows Server** is build imaging at McDonald's, troubleshooting only at SAFRA, and
  staging at Systems Design. No server-upgrade or migration programme leadership is
  claimed anywhere.
- **Platform claims stay at administration level**: VMware vSphere, Windows Server, WSUS
  patch management, and **Ivanti endpoint management** — never "Ivanti MDM", and never
  scoped to enrolled mobile devices.
- **Zabbix** is the named monitoring platform behind the proactive-monitoring claim.
- **Not claimed anywhere**: SCCM, PKI, SCOM, Citrix, Nutanix, Autopilot, Ansible,
  post-incident review ownership, or any infrastructure-as-code tooling.
- **Never invent a figure.** Where no number was supplied, none is asserted, and the
  existing percentages are not to be rounded or softened.
- **AI tooling is claimed as assisted delivery only** — AI-assisted script authoring and
  debugging, AI-assisted drafting, and validating output before use. Do not escalate it
  to strategy or leadership wording.
- **The WannaCry bullet stays client-agnostic** ("60+ retail sites"). Naming the client
  would disclose an involvement that could not be confirmed as publicly known.

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
- **There is no hard `\newpage` in the file any more** (removed 28 Sep 2026, never
  restored), so pagination is fully automatic. Combined with A4 that means **every content
  edit needs the compiled PDF checked** — nothing local can show where the page boundary
  falls, and the whole document is `\small`, so one added bullet can push an entry over.

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
are kept here so they can be restored without rewriting them:

- **SAFRA as a contract role** — whether that engagement was a contract was never
  confirmed. If it becomes relevant, the date field is
  `{May 2021 -- Jun 2022 (Contract)}`.

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
