# IsoChronic City: slot to file map

Everything below is wired in `isochronic-city.html`. Filenames match your folder
exactly, including the underscores and the British "optimisation" spelling.

| # | Section | File | Type |
|---|---|---|---|
| hero | Hero, 21:9 | `hero.jpg` | still |
| 01 | Formation and Selection of Spatial Signature | `01-selection_of_spatial_signatures.mp4` | video |
| 02 | Urban Decay | `02-urban_decay.jpg` | still |
| 03 | Design Goals | `03-design_goals.mp4` | video |
| 04 | Grading the City | `04-grading_of_the_city.mp4` | video |
| 05 | Space Syntax: Angular Step Depth | `05-angular_step_depth.jpg` | still |
| 06 | Optimization Algorithm | `06-optimisation_algorithm.mp4` | video |
| 07 | IsoChronic Generative Loop | `07-isochronic_generative_loop.jpg` | still |
| 08 | Masterplan | `08-masterplan.mp4` | video |
| 09 | Emplacement of Interventions | `09-emplacement_of_interventions.mp4` | video |
| 10 | Design, left: **Void segments** | `10b.mp4` | video, GUESSED |
| 11 | Design, middle: **Mobile segments** | `10c-market_place.mp4` | video |
| 12 | Design, right: **Elevated segments** | `10a-elevated_wallkway.mp4` | video |
| 13 | Final, 21:9 | `11_unity.mp4` | video with controls |

All paths sit under `assets/isochroniccity/`.

## Posters

Every `.mp4` needs a matching poster at
`assets/isochroniccity/posters/<same-name>.jpg`. Ten of them:

```
01-selection_of_spatial_signatures.jpg
03-design_goals.jpg
04-grading_of_the_city.jpg
06-optimisation_algorithm.jpg
08-masterplan.jpg
09-emplacement_of_interventions.jpg
10a-elevated_wallkway.jpg
10b.jpg
10c-market_place.jpg
11_unity.jpg
```

`prep-media.sh` writes these automatically. Without them a video slot is black
until it starts playing.

## Logos

Eight files in `assets/isochroniccity/logos/`, rendered white via
`filter: brightness(0) invert(1)`, so transparent PNG beats JPG:

```
wasa-wls.png  mab.png  inspireli.jpg  arch-hive.png
archdaily.jpg  archidiaries.jpg  ucl.png  bartlett.png
```

Rename yours to match, or edit the eight `src` values in the awards section.
`node check-assets.js` will tell you which ones are wrong.
