# Site Review

Review the korb.engineering site and recommend improvements.

## Instructions

### Step 1: Gather current state

- Run `node scripts/audit.mjs` and check findings
- Count tools per section from sections.json
- Check `git log --oneline -20` for recent changes
- Identify smallest tools by line count: `wc -l tools/aviation/*.html tools/civil/*.html tools/misc/*.html tools/hk/*.html 2>/dev/null | sort -n | head -30`

### Step 2: Review areas

Check for:
- **Thin tools** (<300 lines) that could be expanded
- **Accessibility issues** flagged by audit
- **Broken features** (test a sampling of tools in the browser if preview is available)
- **Missing descriptions** or registry entries
- **CSS/UX issues** on the homepage and navigation
- **SEO** — meta tags, sitemap, OG image status

### Step 3: Report

Organize findings by priority:
1. **Bugs/broken** — things that don't work
2. **Quick wins** — easy improvements with high impact
3. **Build-outs** — tools worth expanding
4. **Polish** — nice-to-haves

Keep recommendations concise and actionable. Ask the user which ones to implement.
