# CLAUDE.md

This file is the working agreement between Harrison and any Claude session touching this repo. Read it first. It replaces the flattery and guesswork that burn the first ten messages of every session.

---

## Who Harrison is, and what this site actually is

Harrison Korb is a civil/aviation engineer from a family engineering firm. His grandfather Monte Walter Korb worked on Saturn V and founded the firm in 1972. His father Alan runs Florida operations; his uncle Andy runs Korb Eng FL Inc. Harrison's aviation focus is TX/OK/NM.

**korb.engineering** is a GitHub Pages single-page app hosting 230+ self-contained HTML tools. It is three things at once, and all three are legitimate:

1. A personal engineering playground where Harrison ships small tools weekly.
2. A suite of real civil/aviation tools Harrison uses in practice.
3. Gifts — tools built for specific family members and friends (Alan's Virtual Caddy, Anita's Texas Garden, AJ's Synthesizer, etc.). These are not toys. They are in active use. Bugs in them embarrass Harrison personally.

Do not refer to the site as a "portfolio" or a "demo." It is a production site used by real people, one of whom is Harrison's dad.

---

## Architecture you must not fight

- **Vanilla HTML/CSS/JS only.** No React, no Vue, no build step, no bundler, no TypeScript. If you feel the urge to `npm install`, stop.
- **No dev server.** GitHub Pages auto-deploys from `main`. Harrison tests in production. Commit and push is the deploy.
- **Single `index.html` + `app.js` shell** that hash-routes (`#home`, `#tools`, `#repository`, `#<tool>`). The `SECTIONS` registry in `app.js` is the source of truth for which tools exist.
- **Every tool is one self-contained HTML file** under `tools/<category>/<kebab-case-name>.html`. Categories are `aviation`, `civil`, `misc`, `hk`. Tools load in an `<iframe>`.
- **Self-contained means self-contained.** Google Fonts is the only external dependency any tool is allowed to use. No CDN JS, no external CSS, no image hotlinks, no API calls that can disappear.
- **localStorage is the database.** Prefix every key with `korb_<toolname>_`. Never touch keys from another tool. There is no backend and there will not be one.
- **Mobile-first, for real.** 16px+ font on inputs (iOS will zoom otherwise), 44px+ touch targets, `touch-action: manipulation`, `viewport-fit=cover`, `env(safe-area-inset-*)`. Harrison will open your tool on his phone. If it breaks, the whole tool is broken.

---

## The VFD dark theme (memorize this)

```
--bg:        #050a0f
--surface:   #0a1018
--surface-2: #0e1520
--border:    #1a2535
--text:      #e2e8f0
--text-dim:  #8892a2

--cyan:      #00d4ff   (primary accent, links, active state)
--orange:    #ff6600   (warnings, secondary)
--green:     #10b981   (success, positive)
--red:       #ef4444   (errors, destructive)
--gold:      #fbbf24   (medieval/premium tint)
```

- Font: **JetBrains Mono ONLY**. Imported from Google Fonts. No system fonts, no serifs, no Inter, no Roboto. The one exception: Alan's Caddy uses Georgia for headings because Alan is 70+ and mono body-copy is hard on his eyes.
- Every tool currently copy-pastes these variables into its own `:root`. This is known tech debt. Do not "fix" it by extracting to a shared stylesheet without asking — that's an architectural decision, not a cleanup.

---

## How Harrison works with Claude

Harrison is fast, direct, and ships a lot. What he needs from you:

- **Skip the preamble.** Don't say "Great question!" or "I'll help you with that!" Just do the work.
- **No em-dashes as a speech mannerism.** He notices.
- **No emoji in code, docs, or commits** unless explicitly requested. The Star Fox tool's Unicode icons are an exception because they're in-game glyphs.
- **Parallelize.** When he gives you 3 tasks, spawn 3 background agents and handle the 4th in foreground. Don't do them sequentially.
- **Honest criticism beats flattery.** When he asks "is it good?", he wants a real answer with weaknesses named. When he asks you to review something, assume he can take it.
- **Quality bar is high.** Harrison will catch a broken feature months later and be annoyed. When you build a tool, test the critical path in your head before you declare done. The Caddy club selector shipped broken with a `+10` tolerance bug because the original build didn't think about the nearest-neighbor case.
- **Ship complete, not "MVP."** A 1700-line tool that actually works beats a 400-line "foundation to build on." Harrison does not come back and build on foundations. Finish it.
- **Long files are fine.** Self-contained HTML tools are allowed to be 2000-3000 lines. Don't apologize for file size.

---

## Family and user context (this changes how you build)

When Harrison says he's building a tool "for X", assume the tool has to work for X's actual life, not a generic user:

- **Alan (Harrison's dad)** — 70s, Florida, golfer. Hesitant with tech, prone to thinking "it doesn't work" when behavior is unexpected. Needs BIG TEXT, high contrast options, plain-English labels, no cryptic glyphs, explicit "tap this then that" instructions. Anything built for Alan must pass a "hand this to a 70-year-old cold" test.
- **Anita** — Frisco, TX. Gardener. USDA Zone 8a, Blackland Prairie clay, last frost ~Mar 15, first frost ~Nov 15. Tools for her need to feel personal and lovely, not sterile.
- **AJ** — uses AJ's Synthesizer. Music person.
- **Andy (uncle)** — global ME, Korb Eng FL Inc.
- **Monte Walter (grandfather)** — deceased, Saturn V engineer, Georgia Tech '50. Honor him in references.

For aviation/civil tools, the audience is Harrison himself plus occasional peers. Use real engineering conventions, real FAA / AASHTO / TRB vocabulary. Don't dumb it down.

---

## Tool quality checklist (run this in your head before declaring done)

1. Does the critical feature actually work? Trace one example end-to-end.
2. Is there a mobile layout? Open in a 375px-wide mental browser.
3. Are inputs 16px+ font and 44px+ tall?
4. Does localStorage persist under `korb_<tool>_*`?
5. Is there a sensible empty state?
6. Are destructive actions confirmed?
7. Are all external link `target="_blank" rel="noopener"`?
8. Does the VFD palette match the spec exactly?
9. Does it work offline after first load?
10. Did you register it in `app.js` alphabetically in the right category?

---

## Commit and git conventions

- `git -c commit.gpgsign=false commit -m "..."` — GPG signing is disabled for this repo.
- Commit messages: one-line subject under 72 chars, then a blank line, then a short body explaining *why*. Use imperative mood. Example subjects that fit the house style:
  - `Alan's Virtual Caddy: fix club selector + senior-friendly polish`
  - `RFQ Tracker: expand pursuit lifecycle states`
  - `Add Anita's Texas Garden tool`
- Co-author footer: `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
- HEREDOC for multi-line bodies so formatting survives.
- Never amend. Never force-push. Never `-A` or `add .` — add specific files.
- Commit each tool on its own when you're batch-building multiple tools with agents.

---

## Things Harrison has told me he does NOT want

- A "preview server" / local dev loop. GitHub Pages is the dev loop.
- Frameworks of any kind.
- CSS-in-JS.
- Build-time code generation (for now — he may change his mind on SEO stubs).
- Facial recognition features (refused outright).
- Files or folders with spaces in names. Underscores or hyphens only.
- Analytics that phone home without disclosure.
- Anyone's credit card on any form. Ever.

---

## Known tech debt (do not fix without permission)

- VFD palette copy-pasted into every tool (~230 copies).
- `app.js` is 1579+ lines with a hand-maintained `SECTIONS` registry and a `TOOL_DESCRIPTIONS` map of ~240 entries.
- No SEO — the whole site is behind hash routing and iframes, so Google indexes one page.
- No telemetry, so nobody knows which tools get used.
- ~13 tools have opaque descriptions the auto-generator had to guess at: BuildBook Project, Build Orchestrator, Korb Dossier, The Void, Jung-Ho Bridge, Trend Synthesis, Situation Monitor, Inbox Sandbox, Korb Farm Collective, Sociopath Identifier, Leadership Forge, Relationship Tracker, Korb Terminal.
- No shared UI primitives — every tool reimplements modals, toggles, toasts.
- No data export / backup — if a user clears localStorage, their Caddy bag or garden beds are gone.

Harrison knows about all of these. Flag them when they become relevant, but don't surprise-refactor them.

---

## When in doubt

- If the task is ambiguous, ask **one** pointed question and then commit to a direction.
- If you'd use a framework, use vanilla JS instead.
- If you'd add a dependency, inline it instead.
- If you'd write 400 lines, write the 1200 that actually finishes the job.
- If you'd hedge on a review, be direct instead.
- If you'd flatter, criticize instead.
- If the user says "build X for Y", remember Y is a real person and build accordingly.

---

## The one-sentence mission

**Ship self-contained, mobile-first, VFD-themed tools that real people — including Harrison's family — actually use, without introducing build steps, dependencies, or bullshit.**

That's the whole job.
