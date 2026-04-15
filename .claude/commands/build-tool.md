# Build Tool

Build a new self-contained HTML tool for korb.engineering.

**Arguments:** $ARGUMENTS

## Instructions

You are building a new tool for the Korb Engineering website — a static GitHub Pages SPA with 244+ self-contained HTML tools.

### Step 1: Parse the request

From the user's description, determine:
- **Tool name** (display name, e.g. "Evan's Daily Sweepstakes")
- **Filename** (kebab-case, e.g. `evans-daily-sweepstakes.html`)
- **Category** (aviation, civil, misc, or hk)
- **Description** (1 sentence for TOOL_DESCRIPTIONS in app.js)

### Step 2: Build the tool

Write the complete HTML file to `tools/{category}/{filename}`.

**Mandatory conventions:**
- Single self-contained HTML file
- No external dependencies except Google Fonts (JetBrains Mono)
- VFD dark theme: `#050a0f` background, `#00d4ff` cyan, `#ff9900` orange accents
- Font: `JetBrains Mono`, monospace
- Mobile-first responsive design
- All `<input>` elements must have `font-size: 16px` minimum (prevents iOS zoom)
- localStorage prefix: `korb_` followed by a short tool-specific prefix
- Touch-friendly: minimum 44px tap targets
- Include `<meta name="viewport" content="width=device-width, initial-scale=1.0">` 
- Include `<meta name="description">` with tool name and "Korb Engineering"
- Title format: `Tool Name // Korb Engineering`
- Make it genuinely useful, polished, and comprehensive — not a stub

### Step 3: Register in app.js

Add the tool to `app.js` in TWO places (maintain alphabetical order):

1. **SECTIONS array** for the correct category:
   ```js
   { name: 'Tool Name', file: './tools/{category}/{filename}' },
   ```

2. **TOOL_DESCRIPTIONS object**:
   ```js
   'Tool Name': 'One-sentence description of what the tool does.',
   ```

Note: Tool names with apostrophes need double quotes: `"Evan's Tool"`

### Step 4: Rebuild generated files

Run these three commands:
```bash
node scripts/build-sections.mjs
node scripts/build-seo-stubs.mjs  
node scripts/audit.mjs
```

### Step 5: Commit and push

Stage only the relevant files (never `git add -A`):
```bash
git add tools/{category}/{filename} app.js \
  tools/_generated/audit.json tools/_generated/audit.md \
  tools/_generated/sections.json sitemap.xml \
  t/{category}/{filename}
```

Commit with:
```bash
git -c commit.gpgsign=false commit -m "Add {Tool Name}: {brief description}

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Then push: `git push origin main`
