# video-player content

Drop `.mp4` / `.webm` / `.mov` / `.m4v` files into `video/` and list
them in `manifest.json`.

## Item shape

```json
{
  "title": "Video Title",
  "description": "Optional description",
  "duration": 3600,
  "thumbnail": "thumbnails/clip.jpg",
  "file": "video/clip.mp4"
}
```

Required: `title`, `file`.

## Size note

GitHub repos cap individual files at ~25 MB before warnings, hard
limit 100 MB. For HD videos, push the actual file to a GitHub
**Release** asset and set `file` to the asset's download URL.
