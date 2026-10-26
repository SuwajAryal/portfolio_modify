# Suwaj's portfolio — a scroll-driven education journey

The map follows the page: **Nepal → Himalayan rivers → Kathmandu Valley → Pulchowk Campus**.
As visitors scroll through the bachelor’s and master’s cards, the camera settles
on the same campus with a different framing. Scrolling upward reverses the story.

Both degrees are at Pulchowk Campus according to the portfolio data. No additional
schools, degree-specific buildings, or personal history have been invented.

## Community components

- MapLibre GL JS: map rendering, terrain, hillshade, and camera transitions.
- Official MapLibre scroll-to-location example: the chapter-based approach.
- OpenFreeMap: the restored Liberty map style, geographic tiles, and label fonts.
- OpenStreetMap and OpenMapTiles: underlying map data and cartography.
- Mapterhorn: open elevation tiles used for Himalayan relief and 3D terrain.
- Natural Earth: Nepal's detailed boundary, regional river paths, and mountain labels.
- Motion and Lucide: section transitions and interface icons.

This version uses ordinary JavaScript and CSS. The previous React globe has been
removed because MapLibre handles both the Himalayan landscape and the campus map.
No AI-generated images, models, or textures are used. See SOURCES.md and the
website's credits page for source links and notices.

## How it behaves

1. Introduction: Nepal fits in view on desktop and phones, outlined in gold with neighbouring areas muted. A clear NEPAL label and introduction establish where I am from immediately.
2. About: a wider central Nepal view includes Himalayan relief and river corridors, centred on the same coordinate as the Kathmandu chapter.
3. Education heading: the Kathmandu Valley comes into view.
4. Bachelor’s card: the camera moves into the Pulchowk Campus area.
5. Master’s card: the same campus remains in focus for postgraduate study.

The map stays beside the story on desktop and above the reading area on phones.
There are no drag/zoom controls: ordinary page scrolling controls the destinations.
Every camera view is straight down and north-up, with rotation and padding reset.
Central Nepal, Kathmandu, and both campus views share the same campus-area centre,
so the transition into the valley only zooms and never detours north first. The pin is
anchored to its circle, independently of its caption, to prevent a visual offset.
Pause journey freezes the camera; Resume catches up with the current section.
Reduced-motion preferences change destinations immediately without camera flights.
The map leaves the screen after Education, and the remaining portfolio continues.

Live map tiles need an internet connection. The campus pin is an approximate
campus-area location, not a surveyed building or department location. If map tiles
or WebGL are unavailable, the portfolio text remains readable.

Mountain relief comes from elevation data, with 1.35× vertical exaggeration for
legibility. River paths are geographic features, not live discharge or simulated
flow. Natural Earth is generalised cartography and omits smaller tributaries.
Landscape overlays fade before the campus scene, where terrain is flattened for
a consistent overhead map. The earlier shaded Liberty map is restored, with
community source attribution visible. The campus view shows its surrounding area
with a centred pin.

## Run locally

Install Node.js LTS from https://nodejs.org, then open a terminal in this folder:

```sh
npm install
npm run dev
```

Open the Local address printed by Vite. On Windows, use npm.cmd if PowerShell
blocks the npm script.

```sh
npm run build
npm run preview
```

The build creates dist and includes community license notices. This experiment
repository does not automatically publish a website or change the original site.

## Where to edit

The academic content has been expanded from the supplied
`Suwaj_Aryal_CV_Academic_final.docx`. Existing biography, projects, skills, and
interests are retained, with additional teaching, thesis findings, publications,
manuscripts, honours, affiliations, and languages in `data.js`. The former
conference submission now appears under its published title and status from the
new CV. Manuscripts are listed separately from published work. Master’s completion
is not inferred from the CV’s 2024–2026 date range. The existing downloadable PDF
is unchanged; the Word source is not bundled with the website.

| File | Purpose |
| --- | --- |
| data.js | Your biography, education, projects, and contact information |
| index.html | Story structure, map container, and reading sections |
| src/map-chapters.js | Destinations, zoom levels, captions, and section selectors |
| src/map-story.js | Connects scroll position to MapLibre camera flights |
| src/nepal-landscape.js | Adds real terrain, hillshade, the Nepal spotlight, river paths, and mountain labels |
| public/data/nepal-geography.geojson | Small regional extract from the cited public-domain Natural Earth sources |
| scripts/prepare-nepal-data.mjs | Recreates that extract from pinned source files; full downloads stay in the ignored .cache folder |
| src/journey.css | Sticky map and responsive story layout |
| src/portfolio.js | Fills the portfolio and education cards; connects Motion/Lucide |
| src/premium.css | General typography, colours, and page styling |
| src/scene-loader.js | Loads the optional map separately from the main content |
| public/sources.html | Visitor-facing credits |
| SOURCES.md | Sources, dataset revision, attribution, and location notes |
| CONTRIBUTING.md | Your preference for community components and no AI-generated visuals |

To add another school later, add its real education entry in data.js and a
matching destination in src/map-chapters.js. The campus coordinate is defined
once in that file, so both existing degrees share it.

Run `node scripts/prepare-nepal-data.mjs` to rebuild the Nepal extract. It downloads
the pinned public source files if they are absent locally. The prepared extract
is committed, so normal installation/builds do not download the full datasets.
