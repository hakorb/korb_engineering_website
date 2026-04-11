# music-library content

Drop audio files (`.mp3`, `.m4a`, `.wav`, `.ogg`) into `audio/` and
list them in `manifest.json`.

## Item shape

```json
{
  "title": "Track",
  "artist": "Artist",
  "album": "Album",
  "year": 2025,
  "file": "audio/track.mp3",
  "cover": "covers/album.jpg"
}
```

Required: `title`, `file`. The Music Library tool reads this on load
and offers a "Sync Repo Library" button.
