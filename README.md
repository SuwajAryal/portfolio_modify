# Suwaj Aryal | Research portfolio

My portfolio covers water resources, hydropower engineering, and research on river and sediment modelling.

[Visit the portfolio](https://suwajaryal.github.io/) · [View the previous website](https://suwajaryal.github.io/archive/portfolio-2026-10-26/)

## How the website works

This is a JavaScript website. Vite prepares the files for hosting. MapLibre displays the map, Motion handles small page animations, and Lucide supplies the icons. The pixel illustrations are local GIF files, so they do not need a video service.

The page opens with my research focus, followed by research interests, thesis work, and publications. The education map follows my studies from school through postgraduate study. The left column follows a river from Himalayan headwaters through the hills to the Terai, with climate risks connecting the three landscapes.

## Files I usually need

| What I want to change | Where to look |
| --- | --- |
| Biography, education, experience, research, or contact details | `data.js` |
| Section order, page headings, and the CV button | `index.html` |
| Fonts, colours, and text sizes | `src/academic.css` |
| River story captions and animation controls | `src/explorer-journey.js` |
| Left artwork size and positioning | `src/explorer-journey.css` |
| Map destinations and captions | `src/map-chapters.js` |
| Map behaviour when scrolling | `src/map-story.js` |
| Pixel animations and still images | `public/journey-art/` |
| Downloadable CV | `public/Resume_suwaj_academic.pdf` |
| Credits and data sources | `SOURCES.md` and `public/sources.html` |

For a normal content update, I only need to edit `data.js`. Text goes inside quotation marks. Each education entry has a degree, institution, period, status, and highlights. Education is stored newest first and displayed oldest first. Experience is displayed newest first.

## Preview on my computer

Install Node.js first, then open a terminal in this folder.

```sh
npm ci
npm run dev
```

Open the local address shown in the terminal. Saved changes appear in the browser. Press Ctrl+C in the terminal to stop the preview.

To check the finished build:

```sh
npm run build
npm run preview
```

`dist/` contains the finished website. It is generated, so I should edit the source files rather than files inside `dist/`. On Windows, `PREVIEW.cmd` can open an existing build.

## Replace the CV

Replace `public/Resume_suwaj_academic.pdf` with the new PDF using the same filename. The download button then uses that file after the next build. If I change the filename, I also need to update the link in `index.html`.

## Publish an update

The live repository is [SuwajAryal.github.io](https://github.com/SuwajAryal/SuwajAryal.github.io). Its Pages workflow builds the website and publishes it after a push to `main`. I can check progress in the repository's Actions tab. If a build fails, the previous successful deployment stays available.

[portfolio_modify](https://github.com/SuwajAryal/portfolio_modify) is the separate working copy for experiments. Pushing there does not replace the live site. A finished change needs to reach the live repository to be published.

## Previous versions

The website that was live before this redesign is kept at `public/archive/portfolio-2026-10-26/`. Its original files are also preserved in the live repository's `archive/portfolio-before-river-story-2026-10-26` branch.

The earlier research design is preserved in the experiment repository's `archive/research-before-publication-2026-10-26` branch. Git history keeps the intermediate changes too.

## Map and artwork notes

The education map uses labelled pin markers for Reliance International Academy at Milan Chowk, Kapan, Kathmandu Model College in Bagbazar, and Pulchowk Campus. Campus positions are approximate map locations, not surveyed building entrances. The river lines show mapped geography, not live flow measurements.

The map and Google Fonts need an internet connection. The written content and local illustrations remain available if the map cannot load. Animation can be paused, and reduced-motion preferences are respected.

Community libraries, geographic data, font licences, artwork provenance, and the climate source are recorded in [SOURCES.md](SOURCES.md) and the website's credits page. The selected explorer scenes are original generated pixel artwork; earlier community asset experiments are retained with their credits.
