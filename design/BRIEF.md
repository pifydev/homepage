# Pify landing page: research brief

Written 2026-09-13 from the GitHub org, npm registry, catalog.json in pifydev/cli, docs.pify.dev, and the two reference sites.

## What Pify is

- Pify is a suite of 16 open-source "Pi Packages" (extensions) for the **pi coding agent** (pi.dev, by Earendil Works / Mario Zechner), plus a front-door CLI and a documentation book.
- GitHub org: https://github.com/pifydev (tagline there: "Elevate your code, elevate your life"). npm scope: `@pify`. All 16 packages and the CLI are MIT; the docs repo (pifydev/docs) is GPL-3.0-only. One maintainer (npm user hypnguyen1209).
- `@pify/cli`: installs and updates pi, manages the `@pify/*` packages with short names, scaffolds new Pi Packages, `pify doctor`, `pify profile save/apply`, tab completion. It delegates to `pi install` and never edits pi's settings.
- **Pify Agent Book** (https://docs.pify.dev, repo pifydev/docs): "Source-code reading notes for the Pi Agent SDK, in English and Vietnamese." Follows pi 0.85.0. 11 chapters (Why Pi is worth studying, The three-layer architecture, The agent loop, Model invocation, The Tool system, Messages across boundaries, Event-driven runtime, Context engineering, Context compaction, Session management, Testing and Agent evaluation), a Quickstart, Glossary, 8 how-to guides, Reference, FAQ, Changelog. Built with Next.js 16 + Tailwind v4 + fumadocs.

## Why Pify exists (the narrative hook)

pi.dev's own copy: "Pi ships with powerful defaults but skips features like sub-agents and plan mode. Ask Pi to build what you want, or install a package that does it your way." Its "What we didn't build" list: no MCP, no sub-agents, no permission popups, no plan mode, no to-dos, no background bash. Pify's packages are exactly those missing pieces, built as pi packages so pi stays minimal. Headline of pi.dev: "There are many agent harnesses, but this one is yours."

## Install paths (all real)

```
npm install -g @pify/cli          # the front door
npx @pify/cli setup               # bootstrap without installing permanently
pify setup                        # installs the pi coding agent (safe to re-run)
pify install goal task            # short names resolve to @pify/goal, @pify/task
pify install suite                # every published package (also: core, agents)
pify list | pify update | pify doctor | pify init my-extension
pi install npm:@pify/memory       # plain pi, no pify CLI
```

## Package catalog (from pifydev/cli catalog.json v24, all status "published")

| name | description |
|---|---|
| ask-question | Structured questions on built-in dialogs: 1-4 questions, options with trade-offs, multi-select, Other free-text |
| btw | By-the-way side conversations: a read-only, codebase-aware side agent in a widget, out of the main context |
| goal | Pin a session goal and keep the agent anchored: ordered steps, evidence-gated completion, cost-weighted budget |
| memory | Persistent memory across sessions: two-tier markdown, FTS5 search, secret-scanned writes, consent-gated project tier |
| plan-mode | Read-only planning with an approve-then-execute gate: enforced tool policy, tracked steps, plans as files |
| pretty | Compact theme-aware rendering for built-in tools: summaries, highlighted reads, word-level diff emphasis |
| search | Fuzzy file finding and indexed content search: fffind and ffgrep, with a pure-TypeScript fallback |
| skills | See the skills pi has loaded, what they cost in every request, and which ones ever fire |
| subagent | Spawn scoped subagents: agent_run/agent_result, @agent mentions, custom agent types, ask_supervisor, results delivered not polled |
| swarm | Run many pi agents in parallel: fan-out with per-item routing, concurrency queue, shared mailbox, results delivered not polled |
| task | Task tracking with a dependency graph, evidence-gated completion, live widget, and a sweep when the list finishes |
| todo | Agent working-memory checklist: complete-replacement writes, next-item surfacing, live widget |
| usage | Token and cost reporting: live footer, local-history dashboard with per-project totals, context breakdown |
| workflow | Deterministic agent orchestration through JavaScript scripts: agent()/parallel()/pipeline(), gates, resume |
| worktree | Safe git-worktree management: create/list/merge/remove with safety rails, plus /worktree enter to take the session along |
| yolo | A safety gradient from auto-approve-everything to ask-about-anything: four modes, read-before-write, undo trail, rewind to before a prompt |

Bundles: `suite` (all 16), `core` ("The everyday four: task tracking, planning, memory, and a safety gate": todo, plan-mode, memory, yolo), `agents` ("The agent stack: subagents, parallel fan-out, scripted workflows, worktrees": subagent, swarm, workflow, worktree).

Design principles that recur across the READMEs (real, quotable): plain markdown you can read and commit; enforced at the tool level, not just prompted; consent before reading repo-shipped files; no surprise model calls; measured, not assumed; undo trails; works the same in TTY and CI; Windows-first.

## Brand assets (in the repo)

- Logo: a "P" built on a 4x4 pixel grid (cells of 117.36 units on an 800 viewBox, 165 margin). Mark is near-black `#09090b` on light, white on dark. One **detached accent cell** at the bottom-right of the P: indigo `#6366f1` on light, `#818cf8` on dark. The accent cell reads as "one more cell snapped on", i.e. the extension.
- Files: `app/icon.svg` (favicon, color-scheme aware), `public/pify-light-512.png`, `public/pify-dark-512.png`, `public/pify-on-light-128.png`, `public/pify-on-dark-128.png`, `public/og-image.png` (512x512).
- Fonts (local TTF in `app/fonts/`): Geist Regular/Medium/SemiBold/Bold/ExtraBold/Black, Geist Mono Regular/Medium/SemiBold. These are the brand fonts the owner supplied, so Geist is chosen for a brand reason.

## Reference sites (style the owner asked to learn from, not clone)

- **pi.dev**: warm off-white paper background with a faint dot grid; serif headlines (Plantin) at ~48px, weight 400; tiny uppercase mono nav and labels; install command block with tabs CURL / POWERSHELL / NPM / PNPM / BUN and a COPY button; "$ SCROLL TO CONTINUE"; long editorial, left-aligned text sections with lots of whitespace, each a narrative heading + 2-4 paragraphs + inline code; bracketed CTAs like "[ READ THE DOCUMENTATION ]"; theme toggle Auto/Light/Dark in footer; "What we didn't build" philosophy section. Screenshot: `ref-pi-dev-full.jpeg`.
- **omp.sh**: pure black; Geist 500 headline at ~70px, three lines, one phrase in hot pink ("IDE wired in."); mono uppercase tracked micro-labels ("OMP², SOON!", "COMPATIBLE", "MACOS · LINUX"); install tabs CURL / BREW / BUN / PS1 / MISE with a `$` prompt and COPY / "✓ COPIED"; a vertical numbered side rail 01-08 with icons acting as section nav; a dithered pixel-particle planet horizon in pink/white on the right; row of compatible editor logos. Screenshot: `ref-omp-hero.jpeg`.

Shared DNA: one real install command front and center with a tab switcher, minimal nav (Docs + GitHub), mono micro-labels, exactly one accent color, developer-to-developer voice.

## Technical constraints

- Next.js 16 App Router, Tailwind CSS v4, TypeScript, `next/font/local`. Single page at `/` with in-page anchors. Deploy target Vercel, domain https://pify.dev.
- Light and dark must both work with a toggle (Auto/Light/Dark). Brand already ships both logo variants.
- Only real links: https://docs.pify.dev, https://github.com/pifydev, https://www.npmjs.com/org/pify, https://pi.dev, individual repos https://github.com/pifydev/NAME, npm pages https://www.npmjs.com/package/@pify/NAME.
- No stats (stars are 0, downloads unknown), no testimonials, no fabricated claims. Package count (16) and chapter count (11) are real and verifiable.

## Copy and design rules in force (antislop)

No em dashes anywhere in UI text. No "Get Started / Learn More" CTAs. No buzzwords (seamless, powerful, next-gen, AI-powered). No blue-purple gradient orbs or glow stacks. No glassmorphism on more than one element. No bento mosaic by default. No generic sparkle/lightning icons. No 4-column template footer. Every nav link must resolve to a real section or URL. WCAG AA contrast in both themes. Keyboard-operable with visible focus. Sections vary in composition. Write a one-line reason for every major decision.
