# Rebuild

Rebuild all generated files (sections, SEO stubs, audit) and optionally commit.

## Instructions

Run the three build scripts in order:

```bash
node scripts/build-sections.mjs
node scripts/build-seo-stubs.mjs
node scripts/audit.mjs
```

Report the output (tool count, section counts, audit findings).

If there are uncommitted changes to generated files, ask the user if they want to commit and push.
