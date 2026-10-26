# Suwaj's portfolio — Earth and rivers

A separate experiment for [Suwaj Aryal's portfolio](https://suwajaryal.github.io).
This version uses community software and public-domain map data. No AI-generated
images, models, textures, or hand-built terrain are used.

## What we are combining

| Source | What it contributes |
| --- | --- |
| React Globe.gl + Three.js | Existing interactive globe, camera, atmosphere, country polygons, and river paths |
| Natural Earth | Actual country boundaries and river centre lines |
| Motion | Subtle section entrances, respecting reduced-motion preferences |
| Lucide | Consistent open-source interface icons |

The globe follows the official React Globe.gl country example and documented path
layer. All sources and notices are listed in [SOURCES.md](SOURCES.md) and on the
website's credits page. Project preferences are saved in [CONTRIBUTING.md](CONTRIBUTING.md).

## Try the features

- Drag the globe or use the west/east arrow buttons.
- Choose Nepal or World for a preset view.
- Select the Ganges, Brahmaputra, Nile, or Amazon to focus on that river.
- Toggle Rivers and Borders independently.
- Enable auto-rotation if desired. It is off initially and disabled for reduced motion.
- Select a country or river on the globe to focus it.

The globe pauses its rendering when off-screen or when its browser tab is hidden.
Mouse-wheel zoom is disabled so visitors can scroll the portfolio normally.
Keyboard buttons provide alternatives to dragging the globe.

Natural Earth's small-scale maps omit many smaller rivers. This is geographic
exploration, not a hydraulic simulation, discharge visualisation, or survey map.

## Run locally

Install Node.js LTS from https://nodejs.org, then open a terminal in this folder:

```sh
npm install
npm run dev
```

Open the Local address printed by Vite. On Windows, use `npm.cmd` if PowerShell
blocks the `npm` script.

```sh
npm run build
npm run preview
```

The build creates `dist`, including geographic data and community license notices.
The original portfolio and this experiment have separate repositories. This
repository does not automatically publish a live website.

## Where to edit

| File | Purpose |
| --- | --- |
| `data.js` | Your biography, projects, education, skills, and contact information |
| `index.html` | Page structure and the globe container |
| `style.css` | Original base styles |
| `src/premium.css` | Updated layout, typography, globe controls, and responsive styles |
| `src/portfolio.js` | Fills the page from data.js; connects Motion and Lucide |
| `src/globe.jsx` | Connects the existing globe component to map data and controls |
| `src/geographic-data.js` | Reads GeoJSON; splits river lines into paths the library accepts |
| `src/scene-loader.js` | Loads the optional globe separately from the portfolio content |
| `public/data/` | Natural Earth datasets copied unchanged from the cited revision |
| `public/sources.html` | Visitor-facing credits |
| `scripts/write-notices.mjs` | Collects installed dependency license texts for the build |
| `public/Resume_suwaj.pdf` | Original CV, unchanged |

React is still JavaScript. Here it controls the Earth explorer; the rest of the
portfolio remains ordinary HTML and JavaScript. React Globe.gl already uses
Three.js internally, so React Three Fiber is not needed for this component.

## Learn by changing one thing

1. In `src/globe.jsx`, change `NEPAL.altitude`: a smaller value moves closer.
2. Change `atmosphereColor` to adjust the globe's halo.
3. Change the river and country colour settings without changing the geography.
4. Add another named river to `riverOptions` if that name exists in the source data.
5. In `src/premium.css`, change the page spacing or typography.

This is integration code: the community libraries provide the rendering and
interaction systems; our modules connect them to this portfolio.

## Suggested next community integrations

- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/): a detailed map of a real project, with your watershed boundaries or flood extents exported from GIS as GeoJSON. Unlike the global overview, this would let visitors inspect an actual study area. Map tiles and any additional datasets need their own sources and attribution.
- [Plotly.js](https://plotly.com/javascript/): interactive hydrographs, sediment rating curves, or model-versus-observation plots using your own research results.

These are suggestions, not installed features. They would add evidence of your
engineering work. We should select actual project data before building them.
