# Community sources and asset provenance

No AI-generated images, textures, models, or terrain are used in this version.
The old custom terrain has been removed. The globe is an integration of existing
open-source software with public-domain geographic data.

| Part | Community source | License / use |
| --- | --- | --- |
| Interactive globe, camera controls, map layers | [React Globe.gl](https://github.com/vasturiano/react-globe.gl) by Vasco Asturiano | MIT; installed package version is pinned in package-lock.json |
| Country-layer integration pattern | [Official choropleth example](https://github.com/vasturiano/react-globe.gl/blob/master/example/choropleth-countries/index.html) | MIT; adapted data loading, polygons, hover and label pattern. No GDP/population visualisation or textures copied. |
| River line layer API | [Official paths documentation](https://github.com/vasturiano/react-globe.gl#paths-layer) | MIT; real river coordinates replace the example's random paths |
| 3D rendering | [Three.js](https://github.com/mrdoob/three.js) | MIT; used by Globe.gl |
| Country polygons | [Natural Earth 1:110m countries](https://github.com/nvkelso/natural-earth-vector/blob/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_110m_admin_0_countries.geojson) | Public domain; downloaded unchanged to public/data/countries.geojson |
| River lines | [Natural Earth 1:50m rivers](https://github.com/nvkelso/natural-earth-vector/blob/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_50m_rivers_lake_centerlines.geojson) | Public domain; downloaded unchanged to public/data/rivers.geojson |
| Section transitions | [Motion](https://motion.dev/docs/inview) | MIT; documented inView + animate integration |
| Interface icons | [Lucide](https://lucide.dev/) | ISC, with Feather-derived notices included in the package license |
| Page typeface | [Inter](https://github.com/rsms/inter) via Google Fonts | SIL Open Font License 1.1; existing portfolio dependency |

Natural Earth revision: `ca96624a56bd078437bca8184e78163e5039ad19`.
Its [terms](https://www.naturalearthdata.com/about/terms-of-use/) explicitly allow
modification and redistribution of its public-domain geographic data.

The data loader only splits MultiLineString features into individual paths and
extracts river names for the interface. Source files remain unchanged. Natural
Earth is generalised cartography: it omits small rivers and is not a survey,
catchment delineation, discharge dataset, or hydraulic simulation. Boundary
presentation follows the source dataset. River selections follow coordinates
from that dataset; Kathmandu's marker is an approximate city location.

## React Globe.gl example license

MIT License

Copyright (c) 2019 Vasco Asturiano

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Full installed dependency license texts are assembled into
`public/community-licenses.txt` by `npm run build` and copied into `dist`.
