## Checklist

- [ ] Every fact on the page is verifiable: `catalog.json` in pifydev/cli, a package README, or docs.pify.dev. No numbers without a source.
- [ ] No em dash characters in UI text (comma, colon or period instead).
- [ ] Every new link resolves to a real section or URL.
- [ ] Checked in both themes (Auto / Light / Dark) and at 320px wide with no horizontal overflow.
- [ ] Keyboard path still works: tabs, theme control, copy buttons, bundle chips.
- [ ] If packages changed, `lib/packages.ts` mirrors `catalog.json` (counts derive from it) and the hero ledger of pi.dev's "what we didn't build" still tells the truth.
- [ ] `npm run typecheck` and `npm run build` pass locally.
