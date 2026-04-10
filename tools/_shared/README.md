# _shared

Opt-in shared assets for korb.engineering tools. Existing tools continue to
copy-paste their own VFD palette; new or refactored tools can use these files
instead of duplicating boilerplate.

## Files

- **korb.css** — VFD palette CSS variables, baseline typography, and a small
  set of primitives (`.korb-btn`, `.korb-input`, `.korb-card`, `.korb-modal`,
  `.korb-toast`, etc.).

## Usage

From any tool under `tools/<category>/<tool>.html`:

```html
<link rel="stylesheet" href="../_shared/korb.css">
```

Everything in this folder is additive. Never remove a legacy palette block
from an existing tool without testing the tool end-to-end first.
