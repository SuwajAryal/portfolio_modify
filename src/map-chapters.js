// Camera destinations live in one place so another school can be added later.
// Approximate campus-area centre, not a surveyed building or department pin.
// Pulchowk Campus occupies the area between Pulchowk Road and Mitra Marg.
const campus = [85.3213, 27.6826];

export const CHAPTERS = [
  { selector: '#hero', step: 0, place: 'NEPAL · MY HOME', title: 'Where mountains meet water.', countryWide: true,
    description: 'Himalayan headwaters. River systems. The landscape behind my interest in water and hydropower.',
    camera: { center: [84.1, 28.15], zoom: 5.7, pitch: 0, bearing: 0 } },
  { selector: '#about', step: 1, place: 'UPPER CENTRAL HIMALAYAS · NEPAL', title: 'From the mountains, downstream.',
    description: 'Himalayan ridges and headwaters in upper central Nepal, north of Kathmandu.',
    // Keep this view near Kathmandu's longitude so the next zoom moves mostly south.
    camera: { center: [85.35, 28.35], zoom: 7.3, pitch: 0, bearing: 0 } },
  { selector: '#education', step: 2, place: 'KATHMANDU VALLEY', title: 'Where I studied.',
    description: 'Pulchowk Campus, Tribhuvan University. Lalitpur, Nepal.',
    camera: { center: campus, zoom: 11, pitch: 0, bearing: 0 } },
  { selector: '[data-education-index="1"]', step: 3, place: 'PULCHOWK CAMPUS · 2018–2023', title: 'Civil engineering foundations.',
    description: 'B.E. in Civil Engineering — the beginning of my university journey.',
    camera: { center: campus, zoom: 12.4, pitch: 0, bearing: 0 } },
  { selector: '[data-education-index="0"]', step: 3, place: 'PULCHOWK CAMPUS · 2024–PRESENT', title: 'A deeper focus on water.',
    description: 'M.Sc. in Hydropower Engineering — continuing at the same campus.',
    camera: { center: campus, zoom: 13, pitch: 0, bearing: 0 } },
];
export const CAMPUS_CENTER = campus;
