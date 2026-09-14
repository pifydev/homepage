<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/pify-on-dark-128.png">
    <source media="(prefers-color-scheme: light)" srcset="public/pify-on-light-128.png">
    <img src="public/pify-on-light-128.png" width="96" height="96" alt="Pify logo">
  </picture>
</p>

<h1 align="center">pify.dev</h1>

<p align="center">
  Landing page for <a href="https://github.com/pifydev">Pify</a>: Pi Packages for the
  <a href="https://pi.dev">pi coding agent</a>, the <code>@pify/cli</code> front door,
  and the <a href="https://docs.pify.dev">Pify Agent Book</a>.
</p>

<p align="center">
  <a href="https://github.com/pifydev/homepage/actions/workflows/deploy.yml"><img src="https://github.com/pifydev/homepage/actions/workflows/deploy.yml/badge.svg?branch=main" alt="Next.js application build"></a>
  <a href="https://github.com/pifydev/homepage/actions/workflows/release.yml"><img src="https://github.com/pifydev/homepage/actions/workflows/release.yml/badge.svg" alt="Release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-111827" alt="MIT"></a>
</p>

Built with Next.js 16 (App Router), Tailwind CSS v4 and TypeScript, the same stack as the docs site. Fully static; no server code.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # next typegen && tsc --noEmit
npm run build
```

If `npm run` cannot find `node` in your shell (seen with Git Bash on Windows), call the binary directly: `node node_modules/next/dist/bin/next dev`.

## Content

- `lib/packages.ts` mirrors `catalog.json` from [pifydev/cli](https://github.com/pifydev/cli/blob/main/catalog.json). When a package is published or its description changes, update it there and adjust the "sixteen" copy in the hero and the Packages section. Versions are intentionally not shown.
- Brand assets live in `public/` (logos) and `app/fonts/` (Geist, Geist Mono). `app/icon.svg` is the favicon for modern browsers and follows the OS color scheme; `app/favicon.ico` (16/32/48), `app/apple-icon.png` (180) and `public/icon-192.png` are generated from `public/pify-light-512.png` with `npm run icons`. `app/manifest.ts` is the web manifest.
- The social card (Open Graph and X `summary_large_image`, 1200x630) is rendered at build time by `app/opengraph-image.tsx` from the logo geometry, Geist, and the page headline; `app/twitter-image.tsx` reuses it. Preview at `/opengraph-image`.
- `design/BRIEF.md` is the research the page was built from; `design/DESIGN.md` is the design direction, the palette with measured contrast, and the reason behind each decision.

## CI, deploy and release

- **Build check** (`.github/workflows/deploy.yml`): every pull request and every push to `main` runs `npm ci`, `typecheck` and `build` on Node 22, and fails if an em dash appears in UI text.
- **Deploy**: the Vercel Git integration, as for [pifydev/docs](https://github.com/pifydev/docs). Pushes to `main` become production deployments of https://pify.dev; pull requests get preview URLs from `vercel[bot]`. No build configuration is needed on Vercel; the framework preset is Next.js.
- **Release** (`.github/workflows/release.yml`): pushing a `v*` tag builds the site, checks that the tag matches `package.json`, and creates a GitHub Release with generated notes.

```bash
npm version patch          # or minor / major
git push --follow-tags
```

## License

Site source: MIT. Geist and Geist Mono are licensed under the SIL Open Font License 1.1.
