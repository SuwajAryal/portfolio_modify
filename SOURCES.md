# Community sources and provenance

No AI-generated images, models, textures, or terrain are used.

## Reused background media

- Real video: “Trishuli River at Pida Village, Dhading District, Nepal”, Muhammad
  Saddam Hussein, 23 August 2026. CC BY 4.0. Source:
  https://commons.wikimedia.org/wiki/File:Trishuli_River_at_Pida_Village,_Dhading_District,_Nepal.webm
  Streamed using the existing 480p VP9 transcode, muted, looped, cropped, and
  displayed beneath a colour overlay. No video file is bundled in the repo.
- Existing 2D animation: “Cold Mountain Background”, Felipe Da Silva Pinho.
  https://lottiefiles.com/free-animation/cold-mountain-background-5t8uh8iJBQ
  Original unmodified JSON: https://assets-v2.lottiefiles.com/a/8c483b7a-116a-11ee-ae31-a77a03f91f68/WMaeQ2fkWm.json
  Lottie Simple License, included at public/landscape/LICENSE.txt.
  The generic artwork is not presented as actual Nepal geography.
- Player: https://github.com/airbnb/lottie-web (MIT). Dependency notices are
  included by the existing build process. No React or 3D background is added.

Snow, green, and sand page colours follow the mountains, hills, and Terai concept.
These media do not simulate a connected river flowing through all three regions.

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
