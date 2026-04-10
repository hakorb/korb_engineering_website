#!/usr/bin/env node
/* ============================================================
   build-seo-stubs.mjs
   ------------------------------------------------------------
   The problem: korb.engineering is a hash-routed SPA behind an
   iframe shell, so Google only ever sees ONE page. That's a
   self-inflicted SEO wound for a 230+ tool archive.

   The fix: at build/commit time, generate one tiny real HTML
   page per tool under /t/<category>/<slug>.html containing:
     - <title> and <meta description> from the tool file itself
     - <link rel="canonical"> pointing at the stub URL
     - JSON-LD WebApplication for the individual tool
     - noscript fallback with a human-readable summary
     - client-side redirect into the SPA hash route so real
       users still land in the main app

   Also regenerates sitemap.xml with every stub + the homepage.

   This script depends on tools/_generated/sections.json — run
   `npm run build:sections` first (or just `npm run build`).
   ============================================================ */

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const SECTIONS  = join(ROOT, 'tools', '_generated', 'sections.json');
const OUT_DIR   = join(ROOT, 't');
const SITE      = 'https://korb.engineering';

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function fallbackDescription(name, category) {
  const cat = ({
    aviation: 'aviation engineering',
    civil:    'civil engineering',
    misc:     'productivity and personal',
    hk:       'personal'
  })[category] || 'engineering';
  return `${name} — a free, browser-based ${cat} tool from Korb Engineering. No signup, no downloads, works on mobile.`;
}

function hashRouteFor(slug) {
  return `/#${slug}`;
}

function stubHtml({ name, description, category, slug }) {
  const canonical   = `${SITE}/t/${category}/${slug}.html`;
  const spaUrl      = `${SITE}${hashRouteFor(slug)}`;
  const title       = `${name} — Korb Engineering`;
  const desc        = description || fallbackDescription(name, category);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': name,
    'description': desc,
    'url': canonical,
    'applicationCategory': 'EngineeringApplication',
    'operatingSystem': 'Any (browser-based)',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'isPartOf': { '@type': 'WebSite', 'name': 'Korb Engineering', 'url': SITE + '/' }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="Korb Engineering">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(desc)}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<meta http-equiv="refresh" content="0; url=${spaUrl}">
<style>
  body {
    background: #050a0f;
    color: #e2e8f0;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;
    padding: 40px 20px;
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.5;
  }
  h1 { color: #00d4ff; font-size: 1.6rem; margin: 0 0 8px; }
  a  { color: #00d4ff; }
  .cat { color: #8892a2; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; }
</style>
</head>
<body>
<div class="cat">${escapeHtml(category)}</div>
<h1>${escapeHtml(name)}</h1>
<p>${escapeHtml(desc)}</p>
<p>Opening the full app… if you are not redirected, <a href="${spaUrl}">launch ${escapeHtml(name)}</a>.</p>
<p><a href="${SITE}/">Back to Korb Engineering</a></p>
<script>
  // Use replace() so the stub does not clutter browser history.
  try { location.replace(${JSON.stringify(spaUrl)}); } catch (e) {}
</script>
</body>
</html>
`;
}

function sitemapXml(urls) {
  const now = new Date().toISOString().slice(0, 10);
  const body = urls
    .map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
  if (!existsSync(SECTIONS)) {
    console.error('missing', relative(ROOT, SECTIONS), '— run `npm run build:sections` first.');
    process.exit(1);
  }
  const data = JSON.parse(await readFile(SECTIONS, 'utf8'));

  // Wipe and recreate /t so deleted tools don't leave zombie stubs.
  if (existsSync(OUT_DIR)) await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const urls = [SITE + '/'];
  let wrote = 0;

  for (const [category, tools] of Object.entries(data.categories || {})) {
    const catDir = join(OUT_DIR, category);
    await mkdir(catDir, { recursive: true });
    for (const t of tools) {
      const html = stubHtml({
        name: t.name,
        description: t.description,
        category,
        slug: t.slug
      });
      await writeFile(join(catDir, t.slug + '.html'), html, 'utf8');
      urls.push(`${SITE}/t/${category}/${t.slug}.html`);
      wrote++;
    }
  }

  await writeFile(join(ROOT, 'sitemap.xml'), sitemapXml(urls), 'utf8');

  console.log('build-seo-stubs: wrote', wrote, 'stubs under /t/');
  console.log('  sitemap.xml: ' + urls.length + ' urls');
}

main().catch((e) => { console.error(e); process.exit(1); });
