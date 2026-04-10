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
| `three-r128.min.js` | three.js | r128 | https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js | 589 KB |
| `pdf-3.11.174.min.js` | PDF.js | 3.11.174 | https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js | 313 KB |
| `pdf.worker-3.11.174.min.js` | PDF.js worker | 3.11.174 | https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js | 1062 KB |
| `pdf-lib-1.17.1.min.js` | pdf-lib | 1.17.1 | https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js | 513 KB |
| `html2pdf-0.10.1.bundle.min.js` | html2pdf.js | 0.10.1 | https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js | 885 KB |
| `peerjs-1.5.4.min.js` | PeerJS | 1.5.4 | https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js | 91 KB |

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
