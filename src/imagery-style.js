// Photographic basemap adapted from MapLibre's satellite raster example.
// EOX's original 2016 layer is CC BY 4.0, including commercial display.
// Later vintages have different terms; do not silently change the layer year.
export const IMAGERY_CREDIT = '<a href="https://cloudless.eox.at">EOxCloudless</a> by '
  + '<a href="https://eox.at">EOX IT Services GmbH</a> '
  + '(Contains modified Copernicus Sentinel data 2016 &amp; 2017) · '
  + '<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>';

export const IMAGERY_STYLE = {
  version: 8,
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    'eox-satellite': {
      type: 'raster',
      tiles: ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg'],
      tileSize: 256, maxzoom: 14,
      attribution: IMAGERY_CREDIT,
    },
  },
  layers: [
    { id:'background', type:'background', paint:{'background-color':'#122b2b'} },
    { id:'satellite-photo', type:'raster', source:'eox-satellite',
      paint:{'raster-resampling':'linear','raster-fade-duration':250} },
  ],
};
