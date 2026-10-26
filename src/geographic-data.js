// Natural Earth GeoJSON stores coordinates as [longitude, latitude].
// Read the actual map data rather than constructing illustrative geography.
export async function loadGeography(signal) {
  async function read(file) {
    const response = await fetch(`${import.meta.env.BASE_URL}data/${file}.geojson`, { signal });
    if (!response.ok) throw new Error(`Could not load ${file}`);
    return response.json();
  }
  const [countries, rivers] = await Promise.all([read('countries'), read('rivers')]);
  const paths = rivers.features.flatMap(feature => {
    const lines = feature.geometry.type === 'MultiLineString'
      ? feature.geometry.coordinates : [feature.geometry.coordinates];
    return lines.map(coordinates => ({
      name: feature.properties.name_en || feature.properties.name || 'River', coordinates,
    }));
  });
  return {
    countries: countries.features.filter(feature => feature.properties.ADM0_A3 !== 'ATA'),
    rivers: paths,
  };
}
