// Camera destinations live in one place so another school can be added later.
// Approximate campus-area centre, not a surveyed building or department pin.
// Pulchowk Campus occupies the area between Pulchowk Road and Mitra Marg.
const campus = [85.3213, 27.6826];

export const CHAPTERS = [
  { selector: '#place', step: 0, place: 'NEPAL · MY HOME', title: 'Where mountains meet water.', countryWide: true,
    description: 'Himalayan headwaters. River systems. The landscape behind my interest in water and hydropower.',
    camera: { center: [84.1, 28.15], zoom: 5.7, pitch: 0, bearing: 0 } },
  { selector: '#about', step: 1, place: 'CENTRAL NEPAL · HIMALAYAN HEADWATERS', title: 'From the mountains, downstream.',
    description: 'A wider view of central Nepal: Himalayan ridges, river corridors, and the Kathmandu Valley below.',
    // Share the valley's exact centre: the next chapter only zooms in.
    // A wider view includes the mountains without moving the camera into Tibet.
    camera: { center: campus, zoom: 6.5, pitch: 0, bearing: 0 } },
  { selector: '#education', step: 2, place: 'KATHMANDU VALLEY', title: 'Where I studied.',
    description: 'From school in Kapan to Bagbazar and Pulchowk Campus. Kathmandu Valley, Nepal.',
    camera: { center: campus, zoom: 11, pitch: 0, bearing: 0 } },
  { selector: '[data-education-index="3"]', step: 2, place: 'KAPAN · 2015', title: 'My school years.',
    description: 'Reliance International Academy, Kapan, Kathmandu. School Leaving Certificate, 2015.',
    camera: { center: [85.36,27.731], zoom: 11.6, pitch: 0, bearing: 0 } },
  { selector: '[data-education-index="2"]', step: 2, place: 'BAGBAZAR · 2018', title: 'The next step.',
    description: 'Higher Secondary Education (+2) at Kathmandu Model College, Bagbazar, Kathmandu. 2018.',
    camera: { center: [85.322,27.705], zoom: 12, pitch: 0, bearing: 0 } },
  { selector: '[data-education-index="1"]', step: 3, place: 'PULCHOWK CAMPUS · 2018 to 2023', title: 'Civil engineering foundations.',
    description: 'B.E. in Civil Engineering. The beginning of my university journey.',
    camera: { center: campus, zoom: 12.4, pitch: 0, bearing: 0 } },
  { selector: '[data-education-index="0"]', step: 3, place: 'PULCHOWK CAMPUS · 2024 to 2026', title: 'A deeper focus on water.',
    description: 'M.Sc. in Hydropower Engineering. Completed at Pulchowk Campus in 2026.',
    camera: { center: campus, zoom: 13, pitch: 0, bearing: 0 } },
];
export const CAMPUS_CENTER = campus;
