// Reuse existing community artwork and footage. This module only connects
// their players, the preview buttons, and the page's regional colour palette.
const river = document.getElementById('river-background');
const illustration = document.getElementById('illustrated-background');
const buttons = [...document.querySelectorAll('[data-landscape]')];
const note = document.getElementById('landscape-note');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const riverSource = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/db/Trishuli_River_at_Pida_Village%2C_Dhading_District%2C_Nepal.webm/Trishuli_River_at_Pida_Village%2C_Dhading_District%2C_Nepal.webm.480p.vp9.webm';
let player;
let selection = reducedMotion.matches ? 'still' : 'river';
let request = 0;

async function chooseLandscape(mode) {
  selection = mode;
  const currentRequest = ++request;
  river.pause();
  player?.pause();
  river.hidden = mode !== 'river';
  illustration.hidden = mode !== 'illustration';
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.landscape === mode)));
  document.body.dataset.landscape = mode;
  note.textContent = mode === 'river'
    ? 'Real flowing water on the Trishuli River, Nepal. Film by Muhammad Saddam Hussein, CC BY 4.0.'
    : mode === 'illustration'
      ? 'Cold Mountain by Felipe Da Silva Pinho. An existing 2D illustrated scene; it is not a geographic depiction of Nepal.'
      : 'A quiet snow, hill-green, and Terai-sand palette, without background motion.';
  if (mode === 'river') {
    river.muted = true;
    if (!river.getAttribute('src')) river.src = riverSource;
    try { await river.play(); }
    catch { if (selection === 'river') note.textContent = 'River playback unavailable. Choose the 2D scene or enjoy the still palette.'; }
  }
  if (mode === 'illustration') {
    if (!player) {
      const { default: lottie } = await import('lottie-web/build/player/lottie_light');
      if (currentRequest !== request) return;
      player = lottie.loadAnimation({ container: illustration, renderer: 'svg',
        loop: true, autoplay: false, path: `${import.meta.env.BASE_URL}landscape/cold-mountain.json`,
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } });
    }
    if (selection === 'illustration' && !document.hidden) player.play();
  }
}
buttons.forEach(button => button.addEventListener('click', () => chooseLandscape(button.dataset.landscape)));
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) chooseLandscape('still'); });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { river.pause(); player?.pause(); }
  else if (selection === 'river') river.play().catch(() => {});
  else if (selection === 'illustration') player?.play();
});

// Colour changes follow the page, rather than claiming these separate assets
// simulate a connected Nepal catchment or the flow of a particular river.
const regions = [
  { element: document.getElementById('hero'), name: 'mountains' },
  { element: document.getElementById('experience'), name: 'hills' },
  { element: document.getElementById('skills'), name: 'terai' },
];
let frame = 0;
function updateRegion() {
  frame = 0;
  let region = regions[0];
  for (const entry of regions) if (entry.element.getBoundingClientRect().top < innerHeight * .5) region = entry;
  document.body.dataset.region = region.name;
}
window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateRegion); }, { passive: true });
updateRegion();
chooseLandscape(selection);
