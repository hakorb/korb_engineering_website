# Korb.Engineering

Personal engineering tools archive. Static site hosted on AWS S3 + CloudFront.

## Structure

```
├── index.html          # Single-page app shell
├── app.js              # SPA router & view rendering
├── style.css           # VFD aesthetic theme
├── base.css            # CSS reset
├── tools/
│   ├── aviation/       # Aviation tools (.html files)
│   ├── civil/          # Civil Engineering tools
│   │   └── pdf-editor.html
│   ├── hk/             # HK section (password-protected)
│   └── misc/           # Miscellaneous tools
└── .github/
    └── workflows/
        └── deploy.yml  # Auto-deploy to S3 on push
```

## Adding Tools

Two steps:

1. **Drop** a standalone `.html` file into the appropriate `tools/` folder:
   - `tools/aviation/` — Aviation tools
   - `tools/civil/` — Civil Engineering tools
   - `tools/hk/` — HK (personal) tools
   - `tools/misc/` — Miscellaneous tools

2. **Register** the tool in `app.js` by adding an entry to the section's `tools` array:

```js
// Open app.js, find the SECTIONS object, and add to the relevant section:
civil: {
  title: '',
  icon: K_LOGO_SVG,
  tools: [
    { name: 'PDF Editor', file: './tools/civil/pdf-editor.html' },
    { name: 'Your New Tool', file: './tools/civil/your-tool.html' }  // ← add here
  ]
}
```

That's it. Push to `main` and the tool will appear automatically.

### Tool file requirements
- Must be a self-contained `.html` file (all CSS/JS inline or loaded via CDN)
- Embedded in an iframe with `allow-scripts allow-same-origin allow-popups allow-forms allow-downloads`
- The tool card name comes from the `name` field, the path from `file`

### Adding a tool to a section that has no tools yet

If the section (e.g., `aviation`) doesn't have a `tools` array, add one:

```js
aviation: {
  title: '',
  icon: `<svg ...>...</svg>`,
  tools: [
    { name: 'Flight Calculator', file: './tools/aviation/flight-calc.html' }
  ]
}
```

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deployment

Pushes to `main` auto-deploy to S3 via GitHub Actions. Requires these repository secrets:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_S3_BUCKET` | S3 bucket name (`korb.engineering`) |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |
| `AWS_REGION` | AWS region (`us-east-2`) |
