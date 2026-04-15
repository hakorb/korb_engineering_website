# Expand Tool

Significantly expand and improve an existing tool.

**Arguments:** $ARGUMENTS

## Instructions

The user wants to build out an existing tool with more features.

### Step 1: Find the tool

Search for the tool by name in `app.js` SECTIONS to find its file path. Read the entire file to understand its current structure, features, and line count.

### Step 2: Plan improvements

Based on what the tool currently has, identify what's missing or could be expanded. Consider:
- More data/content (exercises, templates, presets, etc.)
- Better visualization (charts, diagrams, canvas)
- More interactive features (calculators, builders, generators)
- Import/export capabilities
- Print-friendly layouts
- Tab-based organization if the tool has grown complex

### Step 3: Expand the tool

Rewrite the complete file with all existing features preserved plus new ones.

**Mandatory conventions:**
- Single self-contained HTML file
- No external dependencies except Google Fonts (JetBrains Mono)
- VFD dark theme: `#050a0f` background, `#00d4ff` cyan, `#ff9900` orange accents
- Mobile-first responsive, inputs >= 16px font-size
- Keep existing localStorage keys/prefix intact
- Don't break existing saved data

### Step 4: Rebuild and commit

```bash
node scripts/build-sections.mjs
node scripts/build-seo-stubs.mjs
node scripts/audit.mjs
```

Stage the changed tool file and generated files. Commit with `git -c commit.gpgsign=false` and the `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` trailer. Push to origin/main.
