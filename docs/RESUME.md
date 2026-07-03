# DCDeploy Web Redesign - Resume Handoff

Last updated: 2026-07-03

## Current repo/branch state

- Repository: `dcdeploy-labs/dcd-web`
- Base branch: `main`
- Working branch: `cursor/import-nova-deploy-2f16`
- PR: `https://github.com/dcdeploy-labs/dcd-web/pull/1`
- Important: `main` still only contains `README.md`. The full site exists on `cursor/import-nova-deploy-2f16`.
- Deployment issue seen earlier: a deploy pointed at `main` failed because `main` has no `Dockerfile`. To deploy current work, either:
  - merge PR #1 into `main`, or
  - configure DCDeploy to deploy branch `cursor/import-nova-deploy-2f16`.

## High-level goal

Replace the old WordPress-based `dcdeploy.com` with a modern Next.js marketing site for DCDeploy, a PaaS platform.

Initial code was imported from:

```txt
https://github.com/Utkarshya24/nova-deploy
```

Then multiple review/preview pages and full-page homepage candidates were created.

## Tech stack

- Next.js 14.2.15, App Router
- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- Sanity CMS wiring for blog/studio
- Docker standalone output

Key files:

```txt
Dockerfile
package.json
pnpm-lock.yaml
src/app/page.tsx
src/app/v2/page.tsx
src/app/v3/page.tsx
src/app/preview/page.tsx
src/lib/currency.tsx
```

## Important commits on branch

```txt
164d585 Add /v3 VoidRun-inspired linear homepage candidate
a4dfe89 Expand /v2 into a modern 12-section homepage candidate
61b5e4d Add /v2 — minimalist candidate home page (6 sections vs 13)
2949b43 Add /preview/environments — clone-production as a flagship product story
d355833 Add 9 more preview sections, finishing the ideation backlog
d4f393f Add 5 new preview sections (deploy-demo, frameworks, no-bs, templates, status)
88d9fe4 Reframe scale-to-zero as live functionality on microVMs
1591cfe Add shared currency state with India auto-detect (USD default, INR for Asia/Kolkata)
23d5e9e Remove live deploy feed from /preview/live-stats
ef738a3 Add Starter plan ($5/mo + $3 credit, always-on, 2 domains) and voidrun roadmap
21326cd Add /preview hub with 6 candidate home-page sections
5623735 Add 'Start free, ship forever' section + clean up plan listings
9926bfb Fix Docker build: bump base image to Node 22 and pin pnpm 10.33.3
ed20587 Import dcdeploy site from nova-deploy repo
```

## Docker/build notes

Original Dockerfile failed in deployment because it used `node:20` and `corepack prepare pnpm@latest`, which pulled pnpm 11 requiring Node 22+ (`node:sqlite`).

Current fix:

- builder: `node:22`
- runner: `node:22-slim`
- pnpm pinned to `10.33.3`

Verified previously:

```bash
pnpm install --frozen-lockfile
pnpm run build
```

Expected build behavior:

- `.next/standalone/server.js` emitted
- preview pages and `/v2`, `/v3` prerender static

## Currency behavior

Shared currency logic lives at:

```txt
src/lib/currency.tsx
```

Exports:

- `useCurrency()`
- `CurrencyToggle`
- `formatCurrency`
- `pickByCurrency`
- `USD_TO_INR = 85`

Behavior:

1. SSR/first render defaults to USD for hydration stability.
2. On mount:
   - if `localStorage["dcd-currency"]` is `USD` or `INR`, use that.
   - else if timezone is `Asia/Kolkata`, switch to INR.
   - otherwise stay USD.
3. Any manual toggle persists to `localStorage`.

Currency is wired into:

- `/pricing`
- `/`
- `/preview/calculator`
- `/preview/savings`
- `/preview/scale-to-zero`
- `/v2`
- `/v3`

## Public route summary

### Existing imported site

```txt
/                       Original imported rich marketing homepage, heavily modified with free tier + Starter plan callouts
/features
/pricing
/docs
/blog
/blog/[slug]
/about
/contact
/changelog
/studio/[[...index]]
```

### Full-page homepage candidates

```txt
/v2
/v3
```

#### `/v2`

Modern/polished SaaS homepage candidate. More custom and DCDeploy-specific.

Current structure:

1. Hero
2. Framework strip
3. Three differentiators
4. Animated deploy demo
5. Environments / clone production
6. Scale-to-zero lifecycle
7. Use cases
8. Comparison table
9. Migration recipes
10. Pricing
11. No-BS honesty promises
12. Final CTA

Positioning:

- broader and richer than `/v3`
- uses many preview ideas compactly
- avoids fake social proof and fake 35-region claims

#### `/v3`

VoidRun-inspired linear conversion page, adapted to DCDeploy colors/copy.

Important: do not mention "voidrun" or "sandboxes" in public DCDeploy copy.

Current structure:

1. Bold uppercase hero (`PAAS FOR DEVELOPERS WHO SHIP`)
2. Audience chips
3. Problem/Fix split
4. Lifecycle: Connect -> Deploy -> Clone
5. CLI/API code tabs: Deploy / Clone env / Logs
6. Feature grid
7. Capability cards
8. Pricing CTA
9. Final CTA

Positioning:

- simpler, more linear, conversion-focused
- inspired by void-run.com's UX skeleton:
  hero -> audience -> problem/fix -> lifecycle -> code -> features -> capabilities -> CTA
- uses DCDeploy color palette and product language

## Preview hub

Preview index:

```txt
/preview
```

It includes:

- callout to `/v2`
- callout to `/v3`
- grid of preview section candidates

### Preview section routes

```txt
/preview/environments
/preview/cli
/preview/dashboard
/preview/api
/preview/bare-metal
/preview/eu-residency
/preview/showcase
/preview/founder
/preview/open-metrics
/preview/savings
/preview/deploy-demo
/preview/frameworks
/preview/no-bs
/preview/templates
/preview/status
/preview/scale-to-zero
/preview/live-stats
/preview/comparison
/preview/infra
/preview/migration
/preview/use-cases
/preview/calculator
```

### Most important preview concepts

#### `/preview/environments`

Flagship product story: environments as a service.

Concept:

- clone production into isolated environments
- includes services, databases, env vars/secrets, volumes
- use for PR previews, load tests, migration rehearsals, demos, A/B infra tests
- per-minute billing
- two commands:

```bash
dcd env clone production --to load-test-feb
dcd env destroy load-test-feb
```

Caveats to verify before public promotion:

- CLI commands must actually exist.
- DB snapshot timing must be real.
- auto-destroy idle clone behavior must be confirmed.

#### `/preview/scale-to-zero`

Scale-to-zero as current functionality on microVMs.

Important wording decision:

- Use "microVMs"
- Do not use "voidrun"
- Do not use "sandboxes"
- Do not frame as upcoming/roadmap

Core copy:

- free services sleep when idle
- resume from snapshot in under 300ms
- Starter/Pro can opt into always-on

#### `/preview/live-stats`

Counters only.

Removed:

- live deploy feed
- fake streaming deploy rows

Reason:

- there will be a stats API, not a deploy events API.

#### `/preview/showcase`

Contains placeholder customer quotes and has explicit warning banner.

Do not promote until real opt-in customer quotes/logos exist.

#### `/preview/founder`

Founder note layout.

Do not promote until rewritten in actual founder voice and real names/headshots are added.

## Product/pricing decisions captured

### Basic

- free forever
- one service
- DCD-1 microVM
- no credit card
- `*.dcdeploy.app` subdomain with HTTPS
- scale-to-zero idle behavior on microVMs

### Starter

New middle tier:

- $5/month
- ₹425/month
- includes $3 / ₹255 compute credit monthly
- always-on VMs
- 2 custom domains
- DCD-1 or DCD-2 sizes
- email support

### Pro

- prepaid wallet
- per-minute compute
- unlimited services
- all machine sizes
- custom domains
- autoscaling/scale-to-zero
- SLA/support

## Important content decisions

### Remove/avoid these from final homepage

These came from the imported nova-deploy template and are considered fake/unsafe:

- "Trusted by 14,000+ companies"
- fake company logos (Acme/GlobalTech/etc.)
- "2.4M deployments"
- "35+ regions"
- "3Tbps capacity"
- fake testimonials
- fake team/investor stats (`45+ team members`, `$20M+ investors`)

### Prefer these truthful product pillars

- bare metal
- Frankfurt/EU today
- microVM isolation
- scale-to-zero on idle
- per-minute billing
- environment cloning
- free forever Basic
- Starter tier for always-on/custom domains
- docs/CLI/API-first workflow

## Old WordPress site findings

Fetched live `https://dcdeploy.com` earlier.

Old WordPress messaging emphasized:

- "From Code to Cloud, Without the Complexity"
- bare metal performance
- predictable pricing
- secure/isolated/private
- app monitoring
- dedicated support
- Frankfurt data center, more locations coming

Some old WordPress routes were returning 502 through bunny.net.

## Suggested next steps

### Product/design decision

Choose final homepage direction:

- `/v2`: richer modern SaaS homepage candidate
- `/v3`: simpler VoidRun-inspired linear conversion page
- existing `/`: original rich imported site, now less recommended due to visual noise/fake content still present in places

Recommended next design path:

1. Review `/v2` and `/v3` side-by-side.
2. Pick one as canonical homepage.
3. Move chosen page to `/` by replacing `src/app/page.tsx`.
4. Remove or hide unsafe fake content from old `/` if it remains accessible.

### Engineering/product validations

Before promoting environment cloning:

- confirm `dcd env clone` and `dcd env destroy` commands exist or are planned.
- confirm copy-on-write volume behavior.
- confirm DB clone behavior/timing.
- confirm clone auto-destroy behavior and billing policy.

Before promoting status/open metrics:

- identify real stats/status API.
- decide ISR/cache interval.
- confirm metrics are safe/anonymized.

Before promoting showcase/founder:

- replace placeholder quotes/logos.
- founder edits/signs copy.

### Deployment

If deploying from `main`, merge PR #1.

If testing before merge, deploy branch:

```txt
cursor/import-nova-deploy-2f16
```

## Useful commands

```bash
pnpm install
pnpm dev
pnpm run build
```

Docker:

```bash
docker build -t dcd-web .
docker run -p 3000:3000 dcd-web
```

## Quick route review checklist

```txt
/preview        Review hub
/v2             Modern rich homepage candidate
/v3             VoidRun-inspired linear homepage candidate
/pricing        Current pricing page with Basic/Starter/Pro
/               Original imported home with modifications
```

## Current known caveats

- Sanity runtime config still defaults to `your-project-id` in `src/lib/sanity.ts` unless env vars are provided.
- `sanity.config.ts` has projectId `1m0czzio`.
- Blog gracefully falls back if Sanity fetch fails.
- Footer still links to some pages that do not exist yet:
  - `/careers`
  - `/status`
  - `/security`
  - `/privacy`
  - `/terms`
  - `/cookies`
- Mobile nav has no hamburger menu; center nav is hidden under `md`.

## Important user preferences learned

- User wants preview routes to review before merging into homepage.
- User likes environment cloning idea and wants it explored.
- User does not want "voidrun" or "sandboxes" mentioned in DCDeploy public copy.
- Use "microVMs" instead.
- Scale-to-zero should be presented as current functionality, not upcoming.
- Pricing should show USD or INR:
  - INR for India users
  - USD for everyone else
  - manual toggle available

