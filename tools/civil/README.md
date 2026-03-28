# Civil Engineering Tools

Add tools by dropping `.html` files here and registering in `app.js`:

```js
civil: {
  tools: [
    { name: 'PDF Editor', file: './tools/civil/pdf-editor.html' },
    { name: 'New Tool', file: './tools/civil/new-tool.html' }  // ← add
  ]
}
```

Current tools:
- `pdf-editor.html` — Local PDF editor with markup, annotation, and export
