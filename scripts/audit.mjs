#!/usr/bin/env node
/* ============================================================
   audit.mjs
   ------------------------------------------------------------
   Walk every tool HTML file under tools/<category>/ and flag
   things worth looking at. This does NOT rewrite anything —
   it just writes a Markdown report to tools/_generated/audit.md
   so you can see the backlog at a glance.

   Checks (per tool):
     - [mobile]     missing viewport meta tag
     - [mobile]     missing viewport-fit=cover
     - [mobile]     inputs without 16px+ font (iOS zoom)
     - [a11y]       no <title>
     - [a11y]       no <meta name="description">
     - [a11y]       no <html lang="...">
     - [a11y]       uses native alert()/confirm()/prompt()
     - [deps]       loads scripts from third-party CDN
                    (cdnjs, unpkg, jsdelivr, googleapis — fonts are OK)
     - [storage]    uses localStorage without a korb_ prefix
     - [size]       file larger than 500 KB
     - [xss]        .innerHTML write near localStorage/JSON.parse

   Usage:
     node scripts/audit.mjs
     npm run audit
   ============================================================ */

import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const TOOLS_DIR = join(ROOT, 'tools');
const OUT_DIR   = join(TOOLS_DIR, '_generated');
const OUT_MD    = join(OUT_DIR, 'audit.md');
const OUT_JSON  = join(OUT_DIR, 'audit.json');
const CATEGORIES = ['aviation', 'civil', 'misc', 'hk'];

const SKIP = new Set([
  'README.md',
  'Local PDF Editor – Korb Engineering.mhtml'
]);

// Third-party CDN hosts we care about (fonts/gstatic are allowed by CLAUDE.md)
const CDN_HOSTS = [
  'cdnjs.cloudflare.com',
  'unpkg.com',
  'cdn.jsdelivr.net',
  'ajax.googleapis.com',
  'maxcdn.bootstrapcdn.com',
  'code.jquery.com'
];
const ALLOWED_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

function checkTool(rel, html, bytes) {
  const findings = [];

  // --- mobile ---
  const viewportMatch = html.match(/<meta[^>]+name=["']viewport["'][^>]*>/i);
  if (!viewportMatch) {
    findings.push({ tag: 'mobile', msg: 'missing <meta name="viewport"> (tool will not be mobile-usable)' });
  } else if (!/viewport-fit\s*=\s*cover/i.test(viewportMatch[0])) {
    findings.push({ tag: 'polish', msg: 'viewport lacks viewport-fit=cover (safe-area insets unused)' });
  }

  // CSS-scoped check: only look at content inside <style>...</style>,
  // and only flag `input { ... font-size: <16px ... }` rules. We exclude
  // rules that *only* target non-text input types (range, color,
  // checkbox, radio, file, submit, button, reset, image) because those
  // do not trigger iOS zoom on focus.
  const NON_TEXT_TYPES = new Set(['range', 'color', 'checkbox', 'radio', 'file', 'submit', 'button', 'reset', 'image', 'hidden']);
  const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  if (styleBlocks) {
    const ruleRe = /(?:^|[\s,{};])(input\b[^{}]{0,120})\{([^{}]{0,400})\}/g;
    const smallRe = /font-size\s*:\s*(?:(1[0-5])(px|pt)|([0-9])(px|pt))\b/;
    let r, hit = false;
    while ((r = ruleRe.exec(styleBlocks)) !== null) {
      const selectorGroup = r[1];
      const body = r[2];
      if (!smallRe.test(body)) continue;
      // Split the selector group on commas, look at each input selector
      // and decide whether at least one could hit a text-entry field.
      const parts = selectorGroup.split(',').map((s) => s.trim()).filter((s) => /(^|\s)input\b/.test(s));
      const anyTextEntry = parts.some((p) => {
        const typeMatches = [...p.matchAll(/\[\s*type\s*=\s*["']?([a-z]+)["']?\s*\]/gi)].map((m) => m[1].toLowerCase());
        if (typeMatches.length === 0) return true; // bare `input` — assume text-entry possible
        return typeMatches.some((t) => !NON_TEXT_TYPES.has(t));
      });
      if (anyTextEntry) { hit = true; break; }
    }
    if (hit) findings.push({ tag: 'mobile', msg: 'input font-size appears <16px (iOS will zoom)' });
  }

  // --- a11y / metadata ---
  if (!/<title[^>]*>[\s\S]*?<\/title>/i.test(html)) {
    findings.push({ tag: 'a11y', msg: 'no <title>' });
  }
  if (!/<meta[^>]+name=["']description["']/i.test(html)) {
    findings.push({ tag: 'a11y', msg: 'no <meta name="description">' });
  }
  if (!/<html[^>]+lang=/i.test(html)) {
    findings.push({ tag: 'a11y', msg: 'no <html lang="...">' });
  }

  // --- native dialogs ---
  // Match bare identifiers only (alert(, confirm(, prompt() — not foo.alert().
  // Ignore matches inside <!-- comments --> by stripping them first.
  const stripped = html.replace(/<!--[\s\S]*?-->/g, '');
  const nativeHits = [];
  if (/(?:^|[^.\w])alert\s*\(/.test(stripped))   nativeHits.push('alert()');
  if (/(?:^|[^.\w])confirm\s*\(/.test(stripped)) nativeHits.push('confirm()');
  if (/(?:^|[^.\w])prompt\s*\(/.test(stripped))  nativeHits.push('prompt()');
  if (nativeHits.length) {
    findings.push({ tag: 'a11y', msg: 'uses native ' + nativeHits.join(', ') + ' (prefer KorbUI)' });
  }

  // --- external deps ---
  const srcMatches = [...html.matchAll(/<(?:script|link)[^>]*(?:src|href)=["']([^"']+)["']/gi)];
  const offenders = new Set();
  for (const m of srcMatches) {
    const url = m[1];
    if (!/^https?:/i.test(url)) continue;
    try {
      const host = new URL(url).host;
      if (ALLOWED_HOSTS.includes(host)) continue;
      if (CDN_HOSTS.includes(host)) offenders.add(host);
    } catch (_) { /* not a real URL */ }
  }
  if (offenders.size) {
    findings.push({ tag: 'deps', msg: 'external CDN: ' + [...offenders].join(', ') });
  }

  // --- localStorage namespacing ---
  // Find localStorage.setItem('...') / localStorage['...'] calls and flag
  // any whose first key argument doesn't start with korb_.
  const setRe = /localStorage\s*(?:\.setItem\s*\(\s*|\[\s*)['"]([^'"]+)['"]/g;
  const badKeys = new Set();
  let sm;
  while ((sm = setRe.exec(html)) !== null) {
    const key = sm[1];
    if (!/^korb_/.test(key)) badKeys.add(key);
  }
  if (badKeys.size) {
    const sample = [...badKeys].slice(0, 3).join(', ');
    findings.push({
      tag: 'storage',
      msg: 'localStorage key not prefixed korb_: ' + sample + (badKeys.size > 3 ? ` (+${badKeys.size - 3} more)` : '')
    });
  }

  // --- size ---
  if (bytes > 500 * 1024) {
    findings.push({ tag: 'size', msg: 'file > 500 KB (' + (bytes / 1024).toFixed(0) + ' KB)' });
  }

  // --- xss: innerHTML writes fed by localStorage / JSON.parse ---
  // Not a perfect check — it's a heuristic that looks inside each inline
  // script block for any line that assigns to innerHTML AND references
  // localStorage or JSON.parse within ~200 chars of that assignment. It
  // catches the common "load saved state → dump into the DOM" pattern
  // without chasing values across function boundaries. Follow up with
  // a human read before rewriting anything. SECURITY-REVIEW L1.
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1]);
  let xssHit = false;
  for (const s of scripts) {
    const innerHits = [...s.matchAll(/\.innerHTML\s*(?:=|\+=)/g)];
    for (const h of innerHits) {
      const start = Math.max(0, h.index - 200);
      const end   = Math.min(s.length, h.index + 200);
      const window_ = s.slice(start, end);
      if (/localStorage|JSON\.parse/.test(window_)) { xssHit = true; break; }
    }
    if (xssHit) break;
  }
  if (xssHit) {
    findings.push({
      tag: 'xss',
      msg: 'innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent'
    });
  }

  return findings;
}

function tagBadge(tag) {
  // Plain text prefix — Markdown, not emoji
  return '`[' + tag + ']`';
}

async function main() {
  const categories = {};
  const summary = { total: 0, clean: 0, with_findings: 0, by_tag: {} };

  for (const cat of CATEGORIES) {
    const dir = join(TOOLS_DIR, cat);
    if (!existsSync(dir)) { categories[cat] = []; continue; }
    const files = (await readdir(dir))
      .filter((f) => f.endsWith('.html') && !SKIP.has(f))
      .sort();
    const results = [];
    for (const f of files) {
      const abs = join(dir, f);
      let html = '';
      let bytes = 0;
      try {
        const st = await stat(abs);
        bytes = st.size;
        html = await readFile(abs, 'utf8');
      } catch (e) { continue; }
      const findings = checkTool(relative(ROOT, abs), html, bytes);
      summary.total++;
      if (findings.length === 0) summary.clean++;
      else {
        summary.with_findings++;
        findings.forEach((f) => { summary.by_tag[f.tag] = (summary.by_tag[f.tag] || 0) + 1; });
      }
      results.push({ file: relative(ROOT, abs), bytes, findings });
    }
    categories[cat] = results;
  }

  // --- emit Markdown report ---
  const lines = [];
  lines.push('# Korb Engineering tool audit');
  lines.push('');
  lines.push('_Generated ' + new Date().toISOString() + ' by `scripts/audit.mjs`. Do not edit by hand._');
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push('- Total tools scanned: **' + summary.total + '**');
  lines.push('- Clean (no findings): **' + summary.clean + '**');
  lines.push('- With findings:       **' + summary.with_findings + '**');
  lines.push('');
  lines.push('### Findings by tag');
  lines.push('');
  lines.push('| Tag | Count |');
  lines.push('|---|---:|');
  const tagOrder = ['mobile', 'polish', 'a11y', 'deps', 'storage', 'size'];
  tagOrder.forEach((t) => {
    if (summary.by_tag[t]) lines.push(`| \`[${t}]\` | ${summary.by_tag[t]} |`);
  });
  lines.push('');

  for (const cat of CATEGORIES) {
    const results = categories[cat] || [];
    const flagged = results.filter((r) => r.findings.length > 0);
    lines.push('## ' + cat + ' (' + flagged.length + ' of ' + results.length + ' with findings)');
    lines.push('');
    if (flagged.length === 0) {
      lines.push('_No findings._');
      lines.push('');
      continue;
    }
    for (const r of flagged) {
      lines.push('### ' + r.file);
      for (const f of r.findings) {
        lines.push('- ' + tagBadge(f.tag) + ' ' + f.msg);
      }
      lines.push('');
    }
  }

  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_MD, lines.join('\n'), 'utf8');
  await writeFile(OUT_JSON, JSON.stringify({ summary, categories }, null, 2) + '\n', 'utf8');

  // --- console output ---
  console.log('audit: scanned ' + summary.total + ' tools');
  console.log('  clean:         ' + summary.clean);
  console.log('  with findings: ' + summary.with_findings);
  tagOrder.forEach((t) => {
    if (summary.by_tag[t]) console.log('  [' + t.padEnd(7) + '] ' + summary.by_tag[t]);
  });
  console.log('  report: ' + relative(ROOT, OUT_MD));
}

main().catch((e) => { console.error(e); process.exit(1); });
