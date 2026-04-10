# vendor/

Locally-hosted third-party JavaScript libraries used by tools under
`tools/<category>/`. Everything here is self-contained — no CDN, no API calls,
no build step. This directory exists to honor the CLAUDE.md rule that tools
must not depend on external CDNs.

## How to reference from a tool

From any tool under `tools/<category>/<tool>.html`:

```html
<script src="../../vendor/jspdf-2.5.1.umd.min.js"></script>
```

## What's here

| File | Library | Version | Source | Size |
|---|---|---|---|---|
| `jspdf-2.5.1.umd.min.js` | jsPDF | 2.5.1 | https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js | 356 KB |
| `jszip-3.10.1.min.js` | JSZip | 3.10.1 | https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js | 95 KB |

## Pinning policy

Every filename in this directory **must** include the version. That's how you
know what you have, and that's how two tools on different versions of the
same library can coexist without conflict.

When adding a new vendored lib:

1. Download from the canonical CDN to `vendor/<lib>-<version>.min.js`.
2. Verify the first bytes look like a real library (license header + code).
3. Update the table above with source URL and size.
4. Sweep the tools that use the CDN URL over to the local path.
5. Re-run `npm run audit` to confirm the `[deps]` count dropped.

## What's NOT here (intentionally)

- **Google Fonts** — allowed by CLAUDE.md as the only external dep.
- **One-off libs used by a single tool** — inline them into the tool itself
  when feasible. `vendor/` is only for things used by multiple tools.
