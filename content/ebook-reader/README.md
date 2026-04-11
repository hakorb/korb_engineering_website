# ebook-reader content

Drop `.epub` files into `books/` and list them in `manifest.json`.

## Item shape

```json
{
  "title": "Book Title",
  "author": "Author",
  "cover": "covers/book.jpg",
  "file": "books/book.epub"
}
```

Required: `title`, `file`. The reader uses epub.js, so anything that
opens in a generic EPUB reader works here.
