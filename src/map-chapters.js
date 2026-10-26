// Camera destinations live in one place so another school can be added later.
// Approximate campus-area centre, not a surveyed building or department pin.
// Pulchowk Campus occupies the area between Pulchowk Road and Mitra Marg.
const campus = [85.3213, 27.6826];

export const CHAPTERS = [
  { selector: '#hero', step: 0, place: 'NEPAL · MY HOME', title: 'Where mountains meet water.', countryWide: true,
    description: 'Himalayan headwaters. River systems. The landscape behind my interest in water and hydropower.',
    camera: { center: [84.1, 28.15], zoom: 5.7, pitch: 25, bearing: -8 } },
  { selector: '#about', step: 1, place: 'THE HIMALAYAS · NEPAL', title: 'From the mountains, downstream.',
    description: 'A closer look at the terrain and river systems that connect my home to my engineering work.',
    camera: { center: [84.4, 28.55], zoom: 7.3, pitch: 52, bearing: -10 } },
  { selector: '#education', step: 2, place: 'KATHMANDU VALLEY', title: 'Where I studied.',
    description: 'Pulchowk Campus, Tribhuvan University. Lalitpur, Nepal.',
    camera: { center: [85.32, 27.7], zoom: 11, pitch: 25, bearing: -12 } },
  { selector: '[data-education-index="1"]', step: 3, place: 'PULCHOWK CAMPUS · 2018–2023', title: 'Civil engineering foundations.',
    description: 'B.E. in Civil Engineering — the beginning of my university journey.',
    camera: { center: campus, zoom: 15.8, pitch: 40, bearing: -18 } },
  { selector: '[data-education-index="0"]', step: 3, place: 'PULCHOWK CAMPUS · 2024–PRESENT', title: 'A deeper focus on water.',
    description: 'M.Sc. in Hydropower Engineering — continuing at the same campus.',
    camera: { center: campus, zoom: 16.2, pitch: 45, bearing: 6 } },
];
export const CAMPUS_CENTER = campus;
