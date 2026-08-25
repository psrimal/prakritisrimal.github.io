# Logo rename table

Rename the eight files in `assets/isochroniccity/logos/`. Your current names
become public URLs, and `OIP.png` / `P.png` / `f7054f6a-086b-…png` are not names
you want in a portfolio URL.

| Current file | Rename to | Used for | Confidence |
|---|---|---|---|
| `OIP.png` | `wasa-wls.png` | World Architecture Student Awards | certain |
| `MAB_logo.png` | `mab.png` | Media Architecture Biennale 2023 | certain |
| `Inspireli-Awards-2021.jpg` | `inspireli.jpg` | Inspireli Awards | certain |
| `f7054f6a-086b-4b0f-a17e-cf35bd68e50….png` | `arch-hive.png` | Arch Hive | certain |
| `archdaily_logo_hi-res_2022.jpg` | `archdaily.jpg` | ArchDaily | certain |
| `P.png` | `ucl.png` | University College London | certain |
| `Bartlett-School-of-Architecture-logo-….jpg` | `bartlett.jpg` | Bartlett School of Architecture | likely |
| `f0de8c67714761.58c046a2091da.png` | **see note** | ? | ambiguous |
| *(nothing)* | `archidiaries.jpg` | ArchiDiaries | **missing** |

## The note

On prakritisrimal.com the Bartlett entry uses `f0de8c67714761_58c046a2091da.png`
and the ArchiDiaries entry uses `R.jpg`. `R.jpg` is not in your folder, and you
have **two** plausible Bartlett files.

So either:

- `f0de8c…png` is the Bartlett logo and `Bartlett-School-of-Architecture-logo….jpg`
  is a better replacement you downloaded later, in which case **ArchiDiaries has
  no logo** and you need to grab `R.jpg` from the Wix media library; or
- `f0de8c…png` is actually the ArchiDiaries mark, in which case rename it
  `archidiaries.jpg` → no, rename it `archidiaries.png` and change that one
  `src` in the HTML.

Open the two files and look. One minute of checking beats a wrong logo under an
award you actually won.

## Rendering

`filter: brightness(0) invert(1)` makes **every opaque pixel white**, so on a JPG
(no transparency) the entire rectangle turns into a white block. Half your logos
are JPGs, so the default is now a cream plate with the logo sitting on it as-is.

Three that are almost certainly transparent PNGs are set to render inverted white
on dark instead: `mab.png`, `arch-hive.png`, `ucl.png`.

To move a logo between the two treatments, add or remove `mono`:

```html
<div class="award-logo mono">   <!-- white mark on dark, transparent PNG only -->
<div class="award-logo">        <!-- logo on a cream plate, works for anything -->
```

If `wasa-wls.png` (`OIP.png`) turns out to be transparent, add `mono` to it too.
