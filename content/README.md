# content/

GitHub-hosted data and media libraries for tools. Store anything a
tool needs: audio, video, ebooks, golfer profiles, course data,
recipes, presets — any JSON or binary content.

Each subfolder corresponds to one tool slug. Drop files into the
appropriate subfolder, list them in that folder's `manifest.json`,
commit, push to GitHub. The tool will fetch the manifest on load and
offer a "Load from Repo Library" button (or auto-load) to pull the
items into the user's local IndexedDB / app state.

## Convention

```
content/
  <tool-slug>/
    manifest.json     # required — schema below
    README.md         # optional — tool-specific notes
    audio/ video/ books/ covers/ data/ ...   # media or data files
```

## manifest.json schema

```json
{
  "version": 1,
  "tool": "harrisons-ipod",
  "items": [
    {
      "title": "Track Title",
      "artist": "Artist Name",
      "album": "Album",
      "file": "audio/song.mp3",
      "cover": "covers/album.jpg",
      "duration": 215
    }
  ]
}
```

Required fields per item: `title`, `file` (relative to that tool's
folder). Everything else is optional and tool-specific.

## How tools consume this

On load, each wired tool runs:

```js
fetch('../../content/<slug>/manifest.json')
  .then(r => r.ok ? r.json() : null)
  .then(manifest => { /* show 'Load Library' button if items.length > 0 */ });
```

The fetch is silent on 404, so tools work fine even if no library
exists. Loading is opt-in; the user clicks the button to actually
import items into their local store. Existing user data is preserved.

## Why GitHub-hosted

- Sync media across devices via the same git push that ships the tool
- No server, no auth, no API keys
- Public read; small files only (Git is not a CDN, soft cap ~25 MB/file)
- For larger libraries, host the binaries on Releases / LFS / S3 and
  point `file` at an absolute URL — the loader accepts both relative
  paths and full URLs.
