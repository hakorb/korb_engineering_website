# alans-virtual-caddy content

Store golfer profiles, course data, and club configurations here.

## Item shape

```json
{
  "type": "golfer",
  "name": "Alan",
  "clubs": {
    "driver": 230,
    "3-wood": 210,
    "5-wood": 195,
    "4-iron": 180,
    "5-iron": 170,
    "6-iron": 160,
    "7-iron": 150,
    "8-iron": 140,
    "9-iron": 130,
    "PW": 120,
    "SW": 90,
    "LW": 60
  }
}
```

You can also add course JSON files in `data/`:

```json
{
  "type": "course",
  "name": "Stonebriar CC",
  "holes": [
    { "number": 1, "par": 4, "yardage": 385 }
  ]
}
```

Drop JSON files into `data/`, add entries to `manifest.json`, commit and push.
