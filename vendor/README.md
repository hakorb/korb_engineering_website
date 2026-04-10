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
| `chart-4.4.1.umd.min.js` | Chart.js | 4.4.1 | https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js | ~200 KB |
| `filesaver-2.0.5.min.js` | FileSaver.js | 2.0.5 | https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js | 3 KB |
| `localforage-1.10.0.min.js` | localForage | 1.10.0 | https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js | 30 KB |
| `qrcodejs-1.0.0.min.js` | qrcodejs | 1.0.0 | https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js | 20 KB |
| `qrcode-generator-1.4.4.min.js` | qrcode-generator | 1.4.4 | https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js | 20 KB |
| `proj4-2.12.1.js` | proj4js | 2.12.1 | https://unpkg.com/proj4@2.12.1/dist/proj4.js | 93 KB |
| `leaflet-1.9.4.js` | Leaflet | 1.9.4 | https://unpkg.com/leaflet@1.9.4/dist/leaflet.js | 148 KB |
| `leaflet-1.9.4.css` | Leaflet CSS | 1.9.4 | https://unpkg.com/leaflet@1.9.4/dist/leaflet.css | 15 KB |
| `geotiff-2.1.3.js` | geotiff.js | 2.1.3 | https://unpkg.com/geotiff@2.1.3/dist-browser/geotiff.js | 318 KB |
| `exifr-7.1.3.umd.js` | exifr | 7.1.3 | https://cdn.jsdelivr.net/npm/exifr@7.1.3/dist/full.umd.js | 76 KB |
| `piexifjs-1.0.6.js` | piexifjs | 1.0.6 | https://cdn.jsdelivr.net/npm/piexifjs@1.0.6/piexif.js | 79 KB |
| `jspdf-autotable-3.8.2.min.js` | jsPDF AutoTable | 3.8.2 | https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js | 39 KB |
| `jspdf-autotable-3.8.4.min.js` | jsPDF AutoTable | 3.8.4 | https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.4/jspdf.plugin.autotable.min.js | 39 KB |
| `pdfmake-0.2.7.min.js` | pdfmake | 0.2.7 | https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js | 1358 KB |
| `pdfmake-vfs_fonts-0.2.7.js` | pdfmake vfs fonts | 0.2.7 | https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js | 798 KB |
| `react-18.3.1.production.min.js` | React | 18.3.1 | https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js | 11 KB |
| `react-dom-18.3.1.production.min.js` | ReactDOM | 18.3.1 | https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js | 132 KB |
| `babel-standalone-7.26.9.min.js` | Babel standalone | 7.26.9 | https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.26.9/babel.min.js | 3016 KB |
| `three-r128-OrbitControls.js` | three.js OrbitControls | r128 | https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js | 26 KB |
| `three-r128-OBJExporter.js` | three.js OBJExporter | r128 | https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/OBJExporter.js | 6 KB |
| `three-r128-PLYExporter.js` | three.js PLYExporter | r128 | https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/PLYExporter.js | 12 KB |
| `three-r128-GLTFExporter.js` | three.js GLTFExporter | r128 | https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/GLTFExporter.js | 58 KB |
| `three-r128-ConvexGeometry.js` | three.js ConvexGeometry | r128 | https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/geometries/ConvexGeometry.js | 1 KB |
| `three-r128-ConvexHull.js` | three.js ConvexHull | r128 | https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/math/ConvexHull.js | 23 KB |

> Note: `tools/aviation/KorbPhotogrammetrySuite.html` originally pulled jsPDF 2.5.2,
> but that version is 404 on cdnjs. Repointed to `jspdf-2.5.1.umd.min.js` (same
> UMD surface; no breaking changes between 2.5.1 and 2.5.2).

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
