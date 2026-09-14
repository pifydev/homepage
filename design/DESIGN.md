# pify.dev design direction

Reading this as: a single-page open-source landing for developers who run or evaluate the pi coding agent, in a hard-edged pixel-grid typographic language, dial **ENERGY 2 / RHYTHM 2 / MOTION 1**.

Direction comes from the owner's brand assets (the pixel-grid P with one indigo cell, Geist and Geist Mono) and the two sites they asked to learn from (pi.dev, omp.sh). Concepts were generated three ways, judged three ways, and merged; see `BRIEF.md` for the facts behind every line of copy.

## Identity

- **Thesis:** pi deliberately left features out. Pify ships exactly those as ordinary Pi Packages, so pi stays minimal.
- **Motif: the snapped-on cell.** The logo is a P on a 4x4 grid with one detached indigo square. That square is the page's only colour. It means "the thing you add": it replaces the `$` prompt in every command block, marks the active tab, sits at the left edge of every section rule, lights one cell per package in the 4x4 mini grid, and snaps into place once as the headline's full stop. Sixteen cells, sixteen packages.
- **Voice:** a maintainer talking. Short sentences, real commands, catalog descriptions verbatim, and "Not covered" where nothing exists.

## Palette

Neutral zinc plus one accent. Neutrals do not count toward the palette; the accent is the single core colour.

| token | light | dark | role |
|---|---|---|---|
| `--bg` | `#ffffff` | `#09090b` | page |
| `--surface` | `#f4f4f5` | `#18181b` | code panels, hover fills |
| `--fg` | `#09090b` | `#fafafa` | text, primary button fill |
| `--muted` | `#52525b` | `#a1a1aa` | secondary text |
| `--line` | `#e4e4e7` | `#27272a` | hairlines |
| `--accent` | `#6366f1` | `#818cf8` | the cell, focus ring, tab marker |
| `--accent-text` | `#4f46e5` | `#818cf8` | accent used as text (rare) |
| `--selection-bg` / `--selection-fg` | `#4f46e5` / `#ffffff` | `#818cf8` / `#09090b` | text selection (6.3:1 light, 6.7:1 dark) |

Measured contrast (WCAG relative luminance):

| pair | light | dark |
|---|---|---|
| fg on bg | 19.9 | 19.1 |
| fg on surface | 18.1 | 17.0 |
| muted on bg | 7.7 | 7.8 |
| muted on surface | 7.0 | 6.9 |
| accent as shape on bg (3:1 needed) | 4.5 | 6.7 |
| accent-text on bg (4.5:1 needed) | 6.3 | 6.7 |
| bg on fg (button label) | 19.9 | 19.1 |

Rule: `--accent` is never body text in light mode (4.47:1 is under AA). Shapes, underlines and focus rings only. `--accent-text` exists for the rare inline accent word.

Hairlines (`--line`) are for borders only. Anything that must be perceived on its own, such as the idle link underline and the outline of an unlit grid cell, uses `--muted` (7.7:1 light, 7.8:1 dark), because `--line` sits at 1.3:1 against the page.

Default theme follows the OS (the favicon already does), with an Auto / Light / Dark control in the header and footer.

## Typography

Geist and Geist Mono, local TTF via `next/font/local`. Weights loaded: Geist 400 / 500 / 600, Geist Mono 400 / 500. Reason: they are the brand fonts the owner supplied; the sans/mono split separates prose (Geist) from anything a terminal would print (Mono).

| role | spec |
|---|---|
| h1 | Geist 600, clamp(40px, 1.6rem + 3vw, 56px), line-height 1.05, tracking -0.025em |
| h2 | Geist 600, clamp(28px, 1.2rem + 1.6vw, 36px), line-height 1.15, tracking -0.02em |
| lede | Geist 400, 18 to 20px, line-height 1.55 |
| body | Geist 400, 17px, line-height 1.6, max 62ch |
| small | Geist 400, 14px, line-height 1.5 |
| label | Geist Mono 500, 12px, uppercase, tracking 0.06em |
| command | Geist Mono 400, 15px (hero) / 14px (elsewhere) |

Mono uppercase labels are used because both reference sites share them and because they mark machine-facing text; tracking is kept modest.

## Layout system

Base unit u = 16px, the logo cell. Content width 72u (1152px). Section padding 5u on mobile, 7u on desktop. Every section opens with a full-width hairline carrying one 1u indigo cell at the left content edge and a mono index label ("02 / Install"). Radius is 0 everywhere: the logo is made of squares.

Section compositions, in order, each different from its neighbour:

1. **Hero:** left 7 columns (eyebrow, headline with snapping cell, lede, tabbed install block, footnote, two buttons), right 4 columns: mono ledger mapping pi.dev's "What we didn't build" to Pify packages with filled and hollow cells.
2. **Why:** sticky heading in 4 columns, three paragraphs of prose in 7.
3. **Install:** a horizontal three-step strip, then code left (7) with README comments and a list right (5), then a one-line aside for plain pi.
4. **Packages:** bundle chips, then a sticky 4x4 mini grid (3 columns) beside a hairline ledger of sixteen rows in three groups (9 columns). Hover or focus on a row lights its cell; a chip lights its bundle and rewrites the install line.
5. **Principles:** full-width heading and lede, eight rules in two columns of hairline rows. Heading reads "Rules that recur across the READMEs" because not every rule appears in every README.
6. **Book:** table of contents left (5), prose and buttons right (7).
7. **Closing:** hero-sized heading, one install line, links, and the 4x4 grid fully lit.
8. **Footer:** one row.

## Motion (dial 1)

- Load: one animation. The headline's cell and the nav mark's accent square start two cells right and one up and snap in over 360ms with `steps(3, end)` after 240ms. Text is visible at first paint.
- Scroll: nothing.
- Hover: 150ms colour transitions; link underline switches to the accent; mini-grid cell fills.
- `prefers-reduced-motion`: the snap is removed and transitions drop to zero.

## Decisions, one line each

- Headline "Pi packages for the parts pi left out": names the category pi itself uses and states the thesis in seven words.
- Cell as full stop: lets the single load animation perform the word "snapped" and puts the motif in the focal point.
- Install tabs npm / npx / plain pi: the three real install paths; bundles are taught in the Packages section instead of the hero.
- Footnote about `pify setup`: keeps the one-liner honest for a machine without pi.
- Hero ledger with hollow cells for MCP and background bash: the argument of the page in one screen, honest about what does not exist.
- Solid black or white primary button: keeps indigo meaning "a cell", and a large indigo button would fail AA for white text in light mode.
- Ledger, not cards, for packages: sixteen identical cards is the pattern to avoid; rows scan faster and the mini grid carries the 16 = 16 idea.
- Bundle chips rewrite the command: the visitor leaves with `pify install core`, not a picture.
- CLI comments are the README's own: no invented behaviour.
- Principles glossed with the README sentence that states them: verifiable, not slogans.
- Eleven chapter links go to the real chapter URLs from the docs sitemap.
- Download counts are the only numbers on the page and they are real: npm's downloads API, last 7 days, per package and as a total, revalidated hourly, and the total is shown only when all sixteen lookups succeed. No stars, no testimonials, no logo bar.
- Dot-grid background at 2u (32px) in `--grid-dot`: the owner asked for pi.dev's texture, and the dots are the logo's pixel grid at page scale. Dots are non-text, kept faint (light `#d4d4d8`, dark `#2c2c31`), and command panels stay opaque so code never sits on dots.
- Footer is one row: five links and a theme control do not need four columns.
- Zinc neutrals rather than paper or pure black: the mark is already `#09090b`, and it keeps the page from reading as either reference.
