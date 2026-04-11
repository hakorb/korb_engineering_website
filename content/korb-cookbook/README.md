# korb-cookbook content

Drop recipe data into `recipes/` (one JSON per recipe) and photos
into `photos/`. List each recipe in the top-level `manifest.json`.

## Item shape

```json
{
  "name": "Brisket",
  "category": "BBQ",
  "photo": "photos/brisket.jpg",
  "recipe": "recipes/brisket.json"
}
```

Each `recipes/<slug>.json` file follows the cookbook tool's recipe
schema (ingredients, steps, prep_time, cook_time, servings).

Required in manifest: `name`, `recipe`.
