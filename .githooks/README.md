# .githooks

Opt-in git hooks for this repo. Nothing in here runs until you point git at
this directory explicitly.

## Install (one-time, per clone)

```sh
git config core.hooksPath .githooks
```

That's it. To disable later:

```sh
git config --unset core.hooksPath
```

## What's in here

### `pre-commit`

When you `git commit` and any staged file lives under
`tools/aviation/`, `tools/civil/`, `tools/misc/`, or `tools/hk/`, this hook
regenerates:

- `tools/_generated/sections.json` (via `scripts/build-sections.mjs`)
- `/t/**` SEO stub pages (via `scripts/build-seo-stubs.mjs`)
- `sitemap.xml`

…and re-stages those artifacts so the commit includes them. If node isn't on
PATH, the hook no-ops instead of failing.

No third-party dependencies (no husky, no lint-staged). Pure bash + node.
