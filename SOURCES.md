# Community sources and provenance

Community software and geographic data power the map. The original pixel-art
character scenes are a specific, owner-authorized exception to the original
no-generated-assets preference.

## Selected explorer artwork

The owner selected the simpler pixel-art Himalaya, hills, and Terai scenes on
26 October 2026 and authorized integration after a slightly fairer skin-palette
adjustment. These are original AI-generated illustrations, guided by supplied
visual references. Reference images themselves and their watermarks are not
included. The explorer is a stylized stand-in, not a photographic likeness.

`public/journey-art/` contains three four-frame GIF loops and their first-frame
PNG stills. The sheets were split into equal 2×2 frame cells, cropped by two
pixels at each edge to exclude grid seams, downsampled using nearest-neighbour
sampling, and packaged at 48 colours with 350 ms per frame. This is an artistic
journey, not a mapped river network, a physical flow model, or actual footage.
The selected Terai sheet was subsequently extended into a portrait river vignette,
retaining the fair-skinned canoe character and adding low banks and flat farmland.
Its irregular navy outer edges follow the composition of the other two scenes.
For the research-focused redesign, the outside navy backgrounds of all three
sheets were removed using the image-editing tool. Their alpha transparency is
preserved in the PNG stills and GIF loops. Existing scene content and fair-skinned
character identity were retained. The page uses Inter and Source Serif 4, both
under the SIL Open Font License and served through Google Fonts. Source Serif:
https://github.com/adobe-fonts/source-serif
No third-party animation artwork is claimed as the source of these selected
scenes. The earlier community tile draft below remains archived.

## Vertical pixel-art river

This earlier draft has been removed from the rendered page. Its source artwork
and code are retained for reference. The selected original scenes above replace it.

The previous video and Lottie backgrounds are removed. A single full-height left
strip arranges existing 2D sprites into a Nepal-inspired landscape. Snow artwork
is by CraftPix.net (OGA-BY 3.0); ground, trees, and crops are by Shade (CC0);
cliffs are by Luis Zuno / Ansimuz (CC0); the existing 13-frame water animation
is by InThePixel (CC0). Sources, original filenames, and display modifications
are recorded in public/pixel-river/CREDITS.md, alongside the supplied notices.

Code lays out the sprites, joins channels, and rotates the existing water strip
so its animation runs downward. It does not generate new visual assets. All
four image files are served locally. The rail needs no external animation
library, video stream, WebGL, or React. The existing geographic education map
continues to use MapLibre separately. The pixel illustration is not a surveyed
river system or a physical flow simulation.

| Part | Source | License / attribution |
| --- | --- | --- |
| Map renderer and terrain | https://github.com/maplibre/maplibre-gl-js | BSD-3-Clause; full installed notice included in public/community-licenses.txt |
| Scroll-driven camera approach | https://maplibre.org/maplibre-gl-js/docs/examples/fly-to-a-location-based-on-scroll-position/ | Official MapLibre example, adapted to this portfolio's sections and degree entries |
| Terrain and hillshade patterns | https://maplibre.org/maplibre-gl-js/docs/examples/3d-terrain/ and https://maplibre.org/maplibre-gl-js/docs/examples/add-a-hillshade-layer/ | Official MapLibre examples |
| Hosted Liberty map style and tiles | https://openfreemap.org/quick_start/ | OpenFreeMap; built-in source attribution preserved |
| Map data | https://www.openstreetmap.org/copyright | OpenStreetMap contributors, ODbL; source attribution remains visible on the map |
| Vector tile schema / cartography | https://openmaptiles.org/ | OpenMapTiles attribution supplied by the hosted source |
| Himalayan elevation tiles | https://mapterhorn.com/data-access/ | Open elevation sources; attribution and individual data terms at https://mapterhorn.com/attribution/ . Mapterhorn attribution is included on the map. |
| Nepal boundary, rivers, and mountain points | https://www.naturalearthdata.com/ | Public domain; geographic coordinates extracted without redrawing or rounding |
| Section transitions | https://motion.dev/docs/inview | MIT |
| Interface icons | https://lucide.dev/ | ISC, including Feather-derived notices |
| Typeface | https://rsms.me/inter/ | SIL Open Font License; served via Google Fonts |

The three Natural Earth inputs are from revision
ca96624a56bd078437bca8184e78163e5039ad19:
https://github.com/nvkelso/natural-earth-vector/tree/ca96624a56bd078437bca8184e78163e5039ad19/geojson

- ne_10m_admin_0_countries.geojson
- ne_10m_rivers_lake_centerlines.geojson
- ne_10m_geography_regions_elevation_points.geojson

Natural Earth terms: https://www.naturalearthdata.com/about/terms-of-use/
The 1:10m name means 1:10 million map scale, not 10-metre spatial resolution.
`scripts/prepare-nepal-data.mjs` selects Nepal, 17 river features intersecting the
regional bounding box [79,25.5,89,31.5], and three mountain points. It preserves
source coordinates and river identifiers. These are generalised features and
do not represent a complete tributary inventory. Raw files are cached locally;
only the 149 KB regional extract is shipped. Street/campus detail and finer
waterways come from live OpenFreeMap/OpenStreetMap tiles.

River display aliases connect source names Ghäghara, Gandak, and Sapt to the
Karnali–Ghaghara, Gandaki–Narayani, and Koshi/Saptakoshi systems. The source names
remain in feature properties. Naming references:
https://giwmscdnone.gov.np/media/pdf_upload/Nepal%20Statistical%20Year%20book%202023_e3ovoqz.pdf
and https://lib.icimod.org/record/29591/files/GSN-RR14-2.pdf .

Mountain labels are taken from Natural Earth's names/locations. Source elevation
numbers are not displayed. Mapterhorn's Terrarium-encoded 512-pixel DEM tiles are
used independently for terrain and hillshading, as MapLibre recommends. Relief
is displayed at 1.35× vertical exaggeration; the terrain is flattened at city
scale for campus readability. The Nepal spotlight is a display mask using the
source country polygon. The river overlay is static geographic linework, with
no claimed discharge, live conditions, flow speed, or direction.

## Education and campus location

Both degree institutions are taken directly from data.js. The official campus
site is https://pcampus.edu.np/ and its contact page is
https://pcampus.edu.np/contact-us/ .

The camera and marker use an approximate centre within the Pulchowk Campus area
in Lalitpur. They do not identify a particular department, classroom, building,
or a surveyed position. The two degree chapters intentionally share the same
campus coordinate. No route between two different campuses is implied.

## Integration changes

Our code connects chapter positions to MapLibre easeTo/jumpTo, builds the sticky
reading layout, adds a campus label, and honours pause and reduced-motion settings.
The community library renders the terrain and detailed map; the existing hosted
Liberty style supplies the cartography. The old React Globe.gl explorer is
removed in this revision and remains available only in Git history.

The earlier shaded Liberty basemap is restored. All views remain north-up and
straight down. Central Nepal, Kathmandu, and the campus chapters share exactly
the same centre, so the education transition changes zoom without a north/south
detour. The regional view is wider to include Himalayan ridges above the valley.
The marker anchors to its circle independently of the caption below it.

The map requests remote style, font, sprite, and vector tile resources from
OpenFreeMap, plus elevation tiles from Mapterhorn. It does not need a private API key or collect visitor location.
Full installed dependency notices are regenerated by npm run build and shipped
as public/community-licenses.txt.

## Climate context and earlier schools

The river story draws on the World Bank Group's [Nepal Country Climate and Development Report (2022)](https://www.ifc.org/en/insights-reports/2022/nepal-country-climate-and-development-report) and [Climate Change Technical Note (2024)](https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099700403182421281). The text describes vulnerability, glacier-related hazards, erosion, landslides, and downstream flooding without assigning Nepal a fixed global rank.

SLC and +2 details were supplied by Suwaj. The Kapan and Bagbazar cameras show approximate neighbourhoods without school-building pins. The previous site's original files are retained under public/archive/portfolio-2026-10-26.
