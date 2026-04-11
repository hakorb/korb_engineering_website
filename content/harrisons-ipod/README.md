# harrisons-ipod content library

Drop `.mp3` files into `audio/`, then add an entry per song to
`manifest.json`. The iPod tool fetches this manifest on load and
shows a "Sync Repo Library" button that imports each track into your
local IndexedDB store.

## Item shape

```json
{
  "title": "Song Title",
  "artist": "Artist",
  "album": "Album",
  "file": "audio/artist-song.mp3"
}
```

`title` and `file` are required. `artist` defaults to "Unknown Artist",
`album` to "Unknown Album". `file` may be a relative path or a full
URL (use a Release asset URL for tracks larger than ~25 MB).

## Tip

Filenames in the form `Artist - Title.mp3` are auto-parsed if you
omit `artist` and `title` from the manifest entry.
