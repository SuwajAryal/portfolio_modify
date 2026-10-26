// Run after downloading the three cited Natural Earth source files into
// .cache/nepal-sources/. Geometry is selected from community data, not drawn.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const directory = '.cache/nepal-sources';
const revision = 'ca96624a56bd078437bca8184e78163e5039ad19';
await mkdir(directory, { recursive: true });
const read = async name => {
  const filename = `ne_10m_${name}.geojson`;
  const localPath = `${directory}/${filename}`;
  let text;
  try { text = await readFile(localPath, 'utf8'); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const response = await fetch(`https://raw.githubusercontent.com/nvkelso/natural-earth-vector/${revision}/geojson/${filename}`);
    if (!response.ok) throw new Error(`Could not download ${filename}`);
    text = await response.text();
    await writeFile(localPath, text);
  }
  return JSON.parse(text);
};
const countries = await read('admin_0_countries');
const rivers = await read('rivers_lake_centerlines');
const mountains = await read('geography_regions_elevation_points');
const nepal = countries.features.find(feature => feature.properties.ADM0_A3 === 'NPL');
if (!nepal) throw new Error('Nepal is missing from the country dataset.');

const inRegion = ([lng, lat]) => lng >= 79 && lng <= 89 && lat >= 25.5 && lat <= 31.5;
const riverAliases = { 'Ghäghara': 'Karnali–Ghaghara', Gandak: 'Gandaki–Narayani', Sapt: 'Koshi / Saptakoshi' };
const regionalRivers = rivers.features.filter(feature => {
  const lines = feature.geometry.type === 'MultiLineString'
    ? feature.geometry.coordinates : [feature.geometry.coordinates];
  return lines.some(line => line.some(inRegion));
}).map(feature => ({
  type: 'Feature', geometry: feature.geometry,
  properties: { source_name: feature.properties.name, rivernum: feature.properties.rivernum,
    label: riverAliases[feature.properties.name] || '', major: Boolean(riverAliases[feature.properties.name]) },
}));
const peakNames = ['Mount Everest', 'Dhaulagiri', 'Kanchenjunga'];
const peaks = mountains.features.filter(feature => peakNames.includes(feature.properties.name))
  .map(feature => ({ type: 'Feature', geometry: feature.geometry, properties: { name: feature.properties.name } }));

const output = { type: 'FeatureCollection', features: [
  { type: 'Feature', geometry: nepal.geometry, properties: { kind: 'country', name: 'Nepal' } },
  ...regionalRivers.map(feature => ({ ...feature, properties: { ...feature.properties, kind: 'river' } })),
  ...peaks.map(feature => ({ ...feature, properties: { ...feature.properties, kind: 'peak' } })),
] };
await writeFile('public/data/nepal-geography.geojson', JSON.stringify(output));
console.log(`Prepared Nepal, ${regionalRivers.length} regional river features, and ${peaks.length} peak labels.`);
