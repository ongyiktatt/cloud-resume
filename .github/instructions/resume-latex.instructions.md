---
description: "Use when editing resume/resume.tex, the published résumé PDF, its LaTeX layout or positioning, or the CI steps that compile it."
applyTo: "resume/**,.github/workflows/main.yml"
---

# Résumé (LaTeX source)

`resume/resume.tex` is the **source of truth** for the résumé PDF. The website does not
render résumé content — it only links the compiled file.

**This file is the authority.** `resume.tex` carries a short header of claim-discipline
notes (added 14 Nov 2026) plus a one-line pointer back here; any further editing rationale
belongs in this file rather than in the source's comment header.

## Positioning is deliberate — do not drift

As of **14 Nov 2026** this file is the **cloud-targeted variant**: an Infrastructure
Engineer aimed at **cloud infrastructure / operations** roles — Cloud Infrastructure
Engineer, Cloud Engineer, Cloud Operations Engineer, Senior Infrastructure Engineer —
leading with the AWS certifications, then Azure. It replaced the Windows Server /
identity / endpoint positioning of 10 Nov.

A **17 Nov 2026** edit re-aimed the document at that lane without adding a claim: the
summary was cut from four dense paragraphs to three and reordered to lead with production
operations and the cloud evidence; the header tagline became *Infrastructure as Code,
Network Security & Production Operations*; Skills were reordered (Networking & Security
promoted to fourth, Endpoint demoted to last, and a new **Operations, Automation &
Observability** line leading with incident escalation and problem management); the
homelab project was retitled to lead with infrastructure as code. No service, tool or
metric was added — see *Calibration* below for what remains off-limits. Certifications were
briefly reordered by relevance and reverted the same day; see the site-identity note below
for why.

- The **master version** (Windows Server / identity / endpoint) is **not in the working
tree** — the 14 Nov change overwrote it. Recover it with
  `git show 2da309d:resume/resume.tex` if that market is targeted again. Only one `.tex`
is compiled and published, so keeping both live needs a second file plus a workflow
  change.
- The claim discipline is written into the header of `resume.tex`; keep the two in step:
  - **Azure** is limited to production-evidenced services — Entra ID, Conditional
    Access, RBAC. No VNet / NSG / VM / Storage claims.
  - **AWS** is limited to what ongyiktatt.com actually uses — S3, CloudFront, Route 53,
    ACM, WAF, Lambda, SNS, IAM.
  - **Terraform appears as "in progress / currently building" only** — the skills line,
    the summary sentence and the homelab project. Never claim completed
    Terraform-provisioned infrastructure, modules or managed remote state.
  - Not claimed: Python, Kubernetes, Ansible, CloudWatch, Azure Policy, Azure Monitor,
    and no AWS landing-zone project or AWS homelab.
- The manager titles at Wargaming and TabSquare remain **administrative seniority, never
  people management**. No claim to lead a large team.
- Networking stays at perimeter level: Layer 4/7 policy across Palo Alto and Check Point,
  F5 web application firewall, VLAN segmentation, VPN. Configuration and troubleshooting,
  not network design.
- The document is **A4** (`\documentclass[a4paper,…]`), switched from US Letter on
  4 Oct 2026 for the Singapore market.
- Wargaming bullets are **present tense** while the role runs to 31 Dec 2026. Convert them
  to past tense on 1 Jan 2027.

**The website in `src/data/data.tsx` targets the same lane** and carries the same claims —
`homePageMeta.title` is "Infrastructure Engineer — AWS & Azure Certified" and the manifest
name is "Yik Tatt Ong | Infrastructure Engineer". Its portfolio entries go into more detail
than the PDF. Do not copy site copy into the résumé.

The site matches the PDF's claims, wording, Skills group order **and** certification
order. Relevance ordering for the certificates was tried on 17 Nov 2026 and reverted the
same day: this block prints a date in the right-hand column, so an out-of-sequence list
reads as an error on both surfaces. Both are strictly newest-to-oldest. The
manifest in `public/site.webmanifest` carries the site name too.

## Calibration — do not inflate

This knowledge used to sit in the source as comments. It belongs here instead.

- **Windows Server** is administration, troubleshooting and standard build imaging —
  hands-on administration, never server-upgrade or migration programme leadership. The
  S$2M Tier-3 co-location project is an **application** migration, not a server build-out.
- **Platform claims stay at administration level**: VMware vSphere, Proxmox VE and Docker
  (lab and homelab scale), Windows Server, WSUS patch management, and **Ivanti endpoint
  management** — never "Ivanti MDM", and never scoped to enrolled mobile devices.
- **Zabbix** is the named monitoring platform behind the proactive-monitoring claim.
- **Terraform is an in-progress claim only.** The skills line marks it `(in progress)`,
  the summary says "currently building", and the homelab bullet says provisioning is
  *being extended* into Terraform. Do not upgrade that to proficiency, completed modules
  or a managed-state claim.
- **Not claimed anywhere**: SCCM, PKI, SCOM, Citrix, Nutanix, Autopilot, Ansible, Python,
  Kubernetes, CloudWatch, Azure Policy, Azure Monitor, post-incident review ownership.
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
- **Two of the four two-column macros can still overflow silently.** `\resumeSubheading`
  and `\resumeSubSubheading` use `tabular*` with `l@{\extracolsep{\fill}}r`, whose
  columns do not wrap: past `0.97\textwidth` LaTeX prints beyond the right margin with
  **no warning at all**, and the right-hand argument must stay a short date. On
  14 Nov 2026 `\resumeProjectHeading` and `\resumeCertItem` were rewritten to use
  `tabularx` with a `>{\raggedright\arraybackslash}X` left column so long tech-stack
  lists wrap — keep them that way, and keep the right column for dates or `{}`.
- **There is no hard `\newpage` in the file any more** (removed 28 Sep 2026, never
  restored), so pagination is fully automatic. Combined with A4 that means **every content
  edit needs the compiled PDF checked** — nothing local can show where the page boundary
  falls, and the whole document is `\small`, so one added bullet can push an entry over.
- **There is a deliberate `\vspace{6pt}` before `\section{Education}`.** The certification list
  closes without the `\resumeItemListEnd` -5pt that every other section ends with, so the last
  cert row and the EDUCATION heading sat tighter than every other gap. Do not delete it as
  "stray spacing" — the mismatch is visible at four cert rows.
- **`needspace` guards the entry headings — do not remove it.** `\resumeSubheading`,
  `\resumeSubSubheading` and `\resumeProjectHeading` each open with
  `\needspace{8\baselineskip}` (7 for projects), added 17 Nov 2026 after an automatic
  break orphaned the SAFRA heading and its first two bullets at the foot of page 1. With
  the package gone the same split returns silently. This is *not* a `\newpage`: it only
  defers a break that would strand a heading, so it adapts to content changes. If an entry
  is ever orphaned anyway, raise the `\baselineskip` count rather than adding a page break.

## How the PDF reaches the site

TinyTeX is installed locally at `~/Library/TinyTeX/bin/universal-darwin` (added 17 Nov
2026, **not on `PATH`** — export it per shell). `pdflatex`, `latexmk` and `pdftoppm` are
therefore available, so pagination and layout can be checked locally instead of through a
CI round-trip. CI remains the published build. In the `main.yml` **build** job, in order:

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

- **Two certifications trimmed from both surfaces on 17 Nov 2026** — the MD-102 endpoint credential (off-lane
  for cloud infrastructure/operations) and Cloud Practitioner (redundant beneath Solutions Architect). The
  four that remain are AZ-104, CloudOps Engineer – Associate, Solutions Architect – Associate and ITIL 4
  Foundation, strictly newest to oldest. Restore either by pasting the matching line back into the
  `Certifications` block of `resume.tex` **and** the `certification` array in `src/data/data.tsx` — they
  must move together:

  ```latex
  \resumeCertItem{\href{https://learn.microsoft.com/en-us/users/yiktattong-4161/credentials/ae5cff38fbbc119e}{Microsoft 365 Certified: Endpoint Administrator Associate (MD-102)}}{Oct 2026}
  \resumeCertItem{\href{https://www.credly.com/badges/46c9f759-e3bc-42ae-8cab-73fd6da6f8ac/linked_in_profile}{AWS Certified Cloud Practitioner}}{May 2026}
  ```

  If MD-102 returns, also restore the "Endpoint Administrator Associate (MD-102)" clause in the About
  paragraph of `src/data/data.tsx`, which currently reads "passed Microsoft's Azure Administrator Associate
  (AZ-104), having added the AWS Solutions Architect and CloudOps Engineer associates earlier in the year".

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
