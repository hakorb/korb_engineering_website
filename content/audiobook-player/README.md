# audiobook-player content

Drop audiobook files (`.mp3`, `.m4a`, `.m4b`, `.ogg`) into `audio/`
and list them in `manifest.json`. Multi-chapter books are supported
via the `chapters` array.

## Item shape

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "narrator": "Narrator",
  "cover": "covers/book.jpg",
  "chapters": [
    { "title": "Chapter 1", "file": "audio/book/ch01.mp3" },
    { "title": "Chapter 2", "file": "audio/book/ch02.mp3" }
  ]
}
```

For single-file audiobooks, replace `chapters` with `"file": "audio/book.m4b"`.
