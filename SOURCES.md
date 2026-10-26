# Community sources and provenance

No AI-generated images, models, textures, or terrain are used.

| Part | Source | License / attribution |
| --- | --- | --- |
| Map renderer and terrain | https://github.com/maplibre/maplibre-gl-js | BSD-3-Clause; full installed notice included in public/community-licenses.txt |
| Scroll-driven camera approach | https://maplibre.org/maplibre-gl-js/docs/examples/fly-to-a-location-based-on-scroll-position/ | Official MapLibre example, adapted to this portfolio's sections and degree entries |
| Terrain and hillshade patterns | https://maplibre.org/maplibre-gl-js/docs/examples/3d-terrain/ and https://maplibre.org/maplibre-gl-js/docs/examples/add-a-hillshade-layer/ | Official MapLibre examples |
| Satellite raster integration | https://maplibre.org/maplibre-gl-js/docs/examples/display-a-satellite-map/ | Official MapLibre example; uses the original EOX 2016 layer rather than the example's newer vintage |
| Satellite photographs | https://cloudless.eox.at/documentation/faq and https://cloudless.eox.at/license-non-commercial | EOxCloudless original 2016 layer, CC BY 4.0; full linked attribution visible on map and screenshots |
| Label font glyph hosting | https://openfreemap.org/ | Noto Sans glyph endpoint; the previous Liberty street/vector basemap is not used |
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
only the 149 KB regional extract is shipped. Photographic context comes from
EOX satellite tiles. No street-map tiles or extruded building overlays are used.

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
The community library renders satellite photographs draped over elevation data.
The old React Globe.gl explorer is
removed in this revision and remains available only in Git history.

## Satellite layer and camera alignment

The EOX WMTS capabilities identify `s2cloudless_3857` as the original 2016 layer:
https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml . The HTTPS tile template is
`https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg`.
EOX confirms the original 2016 product permits commercial and non-commercial
embedded basemaps under CC BY 4.0. Newer vintages have different conditions and
must not be substituted without checking them. We stream tiles directly, with
no bulk download, tile redistribution, or local imagery copies.

The required on-screen attribution follows the current EOX guide:
EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH
(Contains modified Copernicus Sentinel data 2016 & 2017), CC BY 4.0.
It stays visible in the map's attribution control rather than inside a collapsed
menu. Screenshots and exported media must retain that embedded attribution.

This is an older Sentinel mosaic, not current imagery. Raster requests are
capped at level 14 and campus camera zoom at 13 to avoid promising building-level
detail. The tile year and attribution are centralised in src/imagery-style.js.

Camera bearing and pitch are zero throughout: north is up and the view is
vertical. Every destination explicitly resets padding; Kathmandu and education
share the same campus-area target. The marker circle anchors to the coordinate,
with its caption positioned separately so label height cannot move the pin.

The map requests satellite tiles from EOX, font glyphs from OpenFreeMap, and
elevation tiles from Mapterhorn. It does not need a private API key or collect visitor location.
Full installed dependency notices are regenerated by npm run build and shipped
as public/community-licenses.txt.
