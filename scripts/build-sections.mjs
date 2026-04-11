#!/usr/bin/env node
/* ============================================================
   build-sections.mjs
   ------------------------------------------------------------
   Scans tools/<category>/*.html and regenerates
   tools/_generated/sections.json — a single source of truth
   for what tools exist, their display name, and their
   description, derived from each tool's own <title> and
   <meta name="description"> tags.

   This is a BUILD-TIME helper. It writes one JSON file that
   app.js can optionally consume in the future. It does NOT
   touch app.js or the hand-maintained SECTIONS registry.
   This keeps the change additive and non-breaking.

   Usage:
     node scripts/build-sections.mjs
     npm run build:sections
   ============================================================ */

import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT       = join(__dirname, '..');
const TOOLS_DIR  = join(ROOT, 'tools');
const OUT_DIR    = join(TOOLS_DIR, '_generated');
const OUT_FILE   = join(OUT_DIR, 'sections.json');

// Public categories — emitted to sections.json, sitemap, and SEO stubs.
// HK is intentionally excluded: it's a personal section gated behind a
// client-side password in app.js, and emitting its tool URLs to public
// indexes (sections.json, sitemap.xml, /t/) would advertise paths that
// the GitHub Pages static host cannot actually protect. The hk SECTIONS
// entry in app.js still works at runtime; it's just no longer publicly
// enumerable. See SECURITY-REVIEW notes (H1).
const CATEGORIES = ['aviation', 'civil', 'misc'];
const PRIVATE_CATEGORIES = ['hk'];

// --- Overrides & cleanup ---------------------------------------------
// Some tool files have generic or misleading <title>s. Map filename →
// preferred display name here. Anything not in this map uses the title
// tag or a title-cased filename fallback.
const NAME_OVERRIDES = {
  // intentionally empty; populate as needed when a tool title diverges
  // from the name shown in the SECTIONS registry
};

// Skip files that exist in tools/ but are not real tools
const SKIP = new Set([
  'README.md',
  'Local PDF Editor – Korb Engineering.mhtml' // MHTML is not a live tool
]);

// --- helpers ---------------------------------------------------------
function extractTag(html, name) {
  const re = new RegExp(
    '<meta[^>]+name=["\']' + name + '["\'][^>]*content=["\']([^"\']*)["\']',
    'i'
  );
  const m = html.match(re);
  return m ? m[1].trim() : '';
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return '';
  return m[1].replace(/\s+/g, ' ').trim();
}

function slugToName(slug) {
  return slug
    .replace(/\.html$/, '')
    .split('-')
    .map((p) => p.length ? p[0].toUpperCase() + p.slice(1) : p)
    .join(' ');
}

// --- main ------------------------------------------------------------
async function main() {
  const out = {
    generated_at: new Date().toISOString(),
    generator: 'scripts/build-sections.mjs',
    note: 'Additive index derived from tool <title> and <meta description> tags. app.js still owns the hand-maintained SECTIONS registry; this file is a source of truth for build-time helpers (SEO stubs, sitemap, future auto-registry).',
    categories: {}
  };

  let total = 0;
  let withDescription = 0;

  for (const cat of CATEGORIES) {
    const dir = join(TOOLS_DIR, cat);
    if (!existsSync(dir)) { out.categories[cat] = []; continue; }

    const entries = await readdir(dir);
    const htmlFiles = entries
      .filter((f) => f.endsWith('.html') && !SKIP.has(f))
      .sort((a, b) => a.localeCompare(b));

    const tools = [];
    for (const f of htmlFiles) {
      const abs = join(dir, f);
      let html = '';
      try {
        html = await readFile(abs, 'utf8');
      } catch (e) {
        console.warn('  skip (read error):', relative(ROOT, abs));
        continue;
      }

      const rawTitle = extractTitle(html);
      const description = extractTag(html, 'description');
      const override = NAME_OVERRIDES[f];

      // Normalize title: strip " — Korb Engineering" / " | Korb ..." suffixes
      const cleanTitle = rawTitle
        .replace(/\s*[—|–-]\s*Korb.*$/i, '')
        .replace(/\s*[—|–-]\s*korb\.engineering.*$/i, '')
        .trim();

      const name = override || cleanTitle || slugToName(f);

      const stats = await stat(abs);
      tools.push({
        name,
        file: './' + relative(ROOT, abs).replace(/\\/g, '/'),
        slug: f.replace(/\.html$/, ''),
        description,
        bytes: stats.size,
        modified: stats.mtime.toISOString()
      });
      total++;
      if (description) withDescription++;
    }

    out.categories[cat] = tools;
  }

  out.stats = { total, with_description: withDescription };

  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + '\n', 'utf8');

  console.log('build-sections: wrote', relative(ROOT, OUT_FILE));
  console.log('  tools:', total, '  with description:', withDescription);
  for (const cat of CATEGORIES) {
    console.log('  ' + cat.padEnd(10), out.categories[cat].length);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
