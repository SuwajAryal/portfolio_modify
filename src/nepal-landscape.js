// Connect existing MapLibre terrain/hillshade layers to open elevation and
// Natural Earth geography. All source URLs and processing are in SOURCES.md.
export async function addNepalLandscape(map) {
  map.addSource('himalayan-elevation', {
    type: 'raster-dem', url: 'https://tiles.mapterhorn.com/tilejson.json',
    encoding: 'terrarium', tileSize: 512, maxzoom: 12,
  });
  // MapLibre recommends independent DEM sources for terrain and hillshade,
  // because they need different tile resolutions. The browser can cache tiles.
  map.addSource('himalayan-hillshade', {
    type: 'raster-dem', url: 'https://tiles.mapterhorn.com/tilejson.json',
    encoding: 'terrarium', tileSize: 512, maxzoom: 12,
  });
  const firstLabel = map.getStyle().layers.find(layer => layer.type === 'symbol')?.id;
  map.addLayer({ id: 'himalayan-relief', type: 'hillshade', source: 'himalayan-hillshade', maxzoom: 11,
    paint: { 'hillshade-exaggeration': .75, 'hillshade-shadow-color': '#344a58',
      'hillshade-highlight-color': '#ffffff', 'hillshade-accent-color': '#a8a58b' } }, firstLabel);

  const response = await fetch(`${import.meta.env.BASE_URL}data/nepal-geography.geojson`);
  if (!response.ok) throw new Error('Nepal geography could not load.');
  const geography = await response.json();
  const nepal = geography.features.find(feature => feature.properties.kind === 'country');
  map.addSource('nepal-geography', { type: 'geojson', data: geography });
  // De-emphasise neighbouring countries while leaving Nepal's real geography
  // visible. This is a display mask, not a change to the source boundary data.
  map.addSource('nepal-spotlight', { type: 'geojson', data: {
    type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [
      [[-180,-85],[180,-85],[180,85],[-180,85],[-180,-85]],
      nepal.geometry.coordinates[0],
    ] },
  } });

  // Keep the basemap's finer streams visible as the story zooms closer.
  for (const layer of map.getStyle().layers) {
    if (layer.id.startsWith('label_country_')) {
      map.setPaintProperty(layer.id, 'text-opacity', ['interpolate',['linear'],['zoom'],4,0,9,0,10,1]);
    }
    if (layer.type === 'line' && layer['source-layer'] === 'waterway') {
      map.setPaintProperty(layer.id, 'line-color', '#218ca4');
      map.setPaintProperty(layer.id, 'line-opacity', .9);
    }
  }
  const riverFilter = ['==', ['get','kind'], 'river'];
  map.addLayer({ id: 'nepal-river-glow', type: 'line', source: 'nepal-geography', maxzoom: 11, filter: riverFilter,
    paint: { 'line-color': '#35c4d5', 'line-opacity': .24, 'line-blur': 2,
      'line-width': ['interpolate',['linear'],['zoom'],4,3,8,8] } });
  map.addLayer({ id: 'nepal-rivers', type: 'line', source: 'nepal-geography', maxzoom: 11, filter: riverFilter,
    paint: { 'line-color': '#087f99', 'line-opacity': .95,
      'line-width': ['interpolate',['linear'],['zoom'],4,.9,6,1.7,9,3] } });
  map.addLayer({ id: 'nepal-neighbours-muted', type: 'fill', source: 'nepal-spotlight', maxzoom: 10,
    paint: { 'fill-color': '#092131', 'fill-opacity': ['interpolate',['linear'],['zoom'],5,.52,8,.22,10,0] } });
  map.addLayer({ id: 'nepal-outline-glow', type: 'line', source: 'nepal-geography', maxzoom: 10,
    filter: ['==',['get','kind'],'country'], paint: { 'line-color':'#f3d19a','line-width':8,'line-blur':4,'line-opacity':.5 } });
  map.addLayer({ id: 'nepal-outline', type: 'line', source: 'nepal-geography', maxzoom: 10,
    filter: ['==',['get','kind'],'country'], paint: { 'line-color':'#d7a34a','line-width':2.2,'line-opacity':1 } });
  map.addLayer({ id: 'nepal-river-names', type: 'symbol', source: 'nepal-geography', minzoom: 5.4, maxzoom: 10,
    filter: ['all',riverFilter,['==',['get','major'],true]],
    layout: { 'symbol-placement':'line','symbol-spacing':220,'text-field':['get','label'],
      'text-font':['Noto Sans Regular'],'text-size':11,'text-letter-spacing':.04,'text-max-angle':25 },
    paint: { 'text-color':'#07576b','text-halo-color':'#f5fbf8','text-halo-width':1.7 } });
  map.addLayer({ id: 'nepal-peaks', type: 'circle', source: 'nepal-geography', minzoom: 5, maxzoom: 11,
    filter: ['==',['get','kind'],'peak'], paint: { 'circle-color':'#fffaf1','circle-radius':3,
      'circle-stroke-color':'#6c6553','circle-stroke-width':1.2 } });
  map.addLayer({ id: 'nepal-peak-names', type: 'symbol', source: 'nepal-geography', minzoom: 5.1, maxzoom: 11,
    filter: ['==',['get','kind'],'peak'],
    layout: { 'text-field':['get','name'],'text-font':['Noto Sans Regular'],'text-size':11,
      'text-offset':[0,-1.1],'text-anchor':'bottom' },
    paint: { 'text-color':'#253d4e','text-halo-color':'#ffffff','text-halo-width':1.5 } });
  map.addSource('nepal-name', { type:'geojson', data: { type:'Feature',properties:{},
    geometry:{type:'Point',coordinates:[84.1,27.65]} } });
  map.addLayer({ id:'nepal-name',type:'symbol',source:'nepal-name',maxzoom:7,
    layout:{'text-field':'NEPAL','text-font':['Noto Sans Regular'],'text-size':22,'text-letter-spacing':.26,'text-allow-overlap':true},
    paint:{'text-color':'#493720','text-halo-color':'#fff4d7','text-halo-width':2} });
  return function setLandscapeChapter(step) {
    // Modest vertical exaggeration helps the relief read on a small screen.
    // Flatten at city scale so campus buildings and markers remain readable.
    map.setTerrain(step < 2 ? { source:'himalayan-elevation',exaggeration:1.35 } : null);
  };
}
