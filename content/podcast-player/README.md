# podcast-player content

Drop podcast episode files into `audio/` and list them in
`manifest.json`. Episodes are grouped by `show`.

## Item shape

```json
{
  "show": "Show Name",
  "episode": "Episode Title",
  "number": 12,
  "published": "2025-04-01",
  "duration": 2700,
  "file": "audio/show/ep012.mp3",
  "notes": "Show notes here"
}
```

Required: `show`, `episode`, `file`.
