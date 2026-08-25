# prakritisrimal.github.io

Personal site for Prakriti Srimal. Architect, urban designer, urban data scientist.
Static HTML, no build step, no framework, served by GitHub Pages from the root of
the `main` branch.

Live at <https://prakritisrimal.github.io>

## Pages

| File | What it is |
|---|---|
| `index.html` | Landing page. Title card, four featured chapters over a pinned dot field, the full chapter index, and the practice graph. |
| `isochronic-city.html` | Master's thesis, Bartlett B-Pro. Process plates, design, awards and publications. |
| `speed-of-a-city.html` | Essay. London and Dubai, pace and the odds of an encounter. |

Everything is a single self-contained file: markup, styles and script in one
document. There is nothing to compile. Open a file, edit it, push it.

## Layout

```
.
├── index.html
├── isochronic-city.html
├── speed-of-a-city.html
├── check-assets.js          run before every push
├── prep-media.sh            compress video, extract poster frames
├── .nojekyll                stops GitHub from running Jekyll over the site
├── assets/
│   ├── isochroniccity/      10 videos, 4 stills
│   │   ├── posters/         one .jpg per video, same filename
│   │   └── logos/           8 award and publication logos
│   └── speed/               essay imagery
├── notes/
│   ├── ASSET-MAP.md         which file fills which slot
│   └── LOGO-RENAME.md       logo naming, and how the two render modes work
├── archive/                 superseded versions, not linked from anywhere
└── media-src/               original exports. NOT committed. See .gitignore
```

## Working on it

### 1. Adding or replacing media

Put original exports in `media-src/`, then:

```bash
bash prep-media.sh
```

That writes web-sized H.264 into `assets/isochroniccity/` and pulls a poster
frame for each clip into `assets/isochroniccity/posters/`.

Compression is not optional here. GitHub Pages soft-limits bandwidth at 100 GB a
month. Ten clips at raw export size is roughly 300 MB per visitor, which is about
300 visits before the ceiling and unusable on mobile data. Compressed it is
around 40 MB per visit.

Never commit `media-src/`. Git keeps every version of every binary forever, so
re-exporting a 30 MB clip five times leaves 150 MB in history that cannot be
removed without rewriting it.

### 2. Checking before you push

```bash
node check-assets.js
```

It resolves every local `src`, `href`, `poster`, `data-src` and `data-poster`
across all HTML files and verifies each one exists **with exact case**. It also
warns about a missing root `index.html` or `.nojekyll`, and lists files in
`assets/` that nothing links to. Exits non-zero if anything is broken.

This exists because Windows ignores filename case and GitHub Pages does not.
`Assets/Hero.JPG` loads perfectly on a local machine and 404s live, and the only
symptom is a blank slot with no error.

### 3. Previewing locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. Do not open the files by double-clicking. The
`file://` protocol blocks the fetches and observers these pages rely on, so what
you see will not match what ships.

## Things that will bite

- **Do not use Git LFS for the video.** GitHub Pages does not serve LFS files. It
  returns the pointer text instead, so every clip 404s and there is no error
  explaining why. Commit the MP4s as ordinary binaries.
- **Lowercase filenames, always.** See above.
- **`docs/` is reserved.** GitHub Pages can be configured to deploy from a folder
  called `docs/`, which is why the notes live in `notes/` instead.
- **`.nojekyll` must stay.** Without it GitHub runs Jekyll over the repo and drops
  any folder beginning with an underscore.
- **This repo is public.** Nothing in it is private, including `notes/` and
  `archive/`. Check before committing anything you would not publish.

## Media slots

Each figure on the project page declares its own source:

```html
<figure class="slot"
        data-src="assets/isochroniccity/08-masterplan.mp4"
        data-poster="assets/isochroniccity/posters/08-masterplan.jpg"
        data-alt="Masterplan"></figure>
```

The extension decides what gets built. `.mp4`, `.webm` and `.mov` become a video;
anything else becomes an image. Videos are muted, looped, `playsinline` and
`preload="none"`, and only load and play once half the frame is on screen. They
pause on scroll-away and on tab change. Add `data-controls="true"` for a longer
clip that should have a real player rather than a silent loop, which is what the
Unity walkthrough uses.

Swapping a video for a still, or the reverse, is a one-word edit to the filename.

See `notes/ASSET-MAP.md` for the full slot-to-file table and
`notes/LOGO-RENAME.md` for the logo naming and the two logo render modes.

## Custom domain

The domain currently points at a Wix site. To move it here: add a `CNAME` file at
the root containing `prakritisrimal.com`, point the DNS A records at GitHub's four
IPs, add a `www` CNAME, then enable Enforce HTTPS in Settings. In that order, or
certificate provisioning fails and visitors get a warning on your own name.

## Contact

<prakritisrimal@gmail.com> · [LinkedIn](https://www.linkedin.com/in/prakriti-srimal-7390ab1a5/) · [GitHub](https://github.com/psrimal)
