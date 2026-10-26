// Uses MapLibre's official scroll-to-location and terrain examples.
// Map tiles/style: OpenFreeMap; underlying geographic data: OpenStreetMap.
import { Map, Marker, setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import { CHAPTERS, CAMPUS_CENTER } from './map-chapters';
import { addNepalLandscape } from './nepal-landscape';

setWorkerUrl(workerUrl);

export function mountMapStory() {
  const container = document.getElementById('journey-map-canvas');
  if (!container || container.dataset.mounted) return;
  container.dataset.mounted = 'true';
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const phone = matchMedia('(max-width: 768px)');
  const hint = document.getElementById('journey-hint');
  const pauseButton = document.getElementById('journey-pause');
  const entries = CHAPTERS.map(chapter => ({ ...chapter, element: document.querySelector(chapter.selector) }))
    .filter(chapter => chapter.element);
  let active = null;
  let loaded = false;
  let paused = false;
  let pendingFrame = 0;
  let hadMapError = false;
  let setLandscapeChapter = () => {};

  let map;
  try {
    map = new Map({
      container,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      ...CHAPTERS[0].camera,
      interactive: false, // Scrolling controls the story; the map never traps input.
      attributionControl: { compact: true },
      maxPixelRatio: 1.5,
    });
  } catch {
    hint.textContent = 'Map unavailable. Your education story is still below.';
    pauseButton.hidden = true;
    return;
  }

  const pin = document.createElement('div');
  pin.className = 'campus-pin';
  pin.innerHTML = '<span></span><b>Pulchowk Campus</b>';
  pin.setAttribute('aria-hidden', 'true');
  new Marker({ element: pin, anchor: 'bottom' }).setLngLat(CAMPUS_CENTER).addTo(map);
  pin.hidden = true;
  map.getCanvas().setAttribute('aria-hidden', 'true');

  function showChapter(chapter, immediate = false) {
    active = chapter;
    document.getElementById('journey-place').textContent = chapter.place;
    document.getElementById('journey-title').textContent = chapter.title;
    document.getElementById('journey-description').textContent = chapter.description;
    document.getElementById('journey-counter').textContent = `0${chapter.step + 1} / 04`;
    document.querySelectorAll('.journey-stops span').forEach((stop, index) => {
      stop.classList.toggle('active', index <= chapter.step);
    });
    entries.forEach(entry => entry.element.classList.toggle('map-chapter-active', entry === chapter));
    // Hide the campus marker until the city-scale view to avoid a floating pin
    // during the globe-to-country flight.
    pin.hidden = chapter.step < 2;
    document.getElementById('nepal-legend').hidden = chapter.step >= 2;
    if (loaded) {
      setLandscapeChapter(chapter.step);
      let camera = { ...chapter.camera };
      if (chapter.countryWide) {
        // Fit the complete country on each screen, rather than a fixed zoom
        // which could crop Nepal on phones or make neighbouring countries dominate.
        const fitted = map.cameraForBounds([[80.04,26.32],[88.22,30.5]], {
          padding: phone.matches ? { top:22, bottom:48, left:26, right:26 } : 42,
          bearing: -8, maxZoom: 6.8,
        });
        if (fitted) camera = { ...camera, ...fitted, zoom: fitted.zoom - .1, pitch: phone.matches ? 0 : 18 };
      } else if (phone.matches && chapter.step === 1) camera.zoom = 6.6;
      map.stop();
      if (immediate || preference.matches) map.jumpTo(camera);
      else map.flyTo({ ...camera, duration: chapter.step === 1 ? 2600 : 1900, curve: 1.25 });
    }
  }

  function updateChapter(immediate = false) {
    pendingFrame = 0;
    if (paused) return;
    // On phones the sticky map occupies the upper part of the screen. Trigger
    // chapters in the reading area beneath it, rather than behind the map.
    const mapBottom = document.querySelector('.journey-map').getBoundingClientRect().bottom;
    const focusLine = phone.matches
      ? Math.min(innerHeight - 60, mapBottom + (innerHeight - mapBottom) * .38)
      : innerHeight * .6;
    let next = entries[0];
    for (const entry of entries) {
      if (entry.element.getBoundingClientRect().top <= focusLine) next = entry;
    }
    if (next !== active || immediate) showChapter(next, immediate);
  }

  function scheduleUpdate() {
    if (!pendingFrame) pendingFrame = requestAnimationFrame(() => updateChapter());
  }

  map.on('style.load', () => {
    map.setProjection({ type: 'mercator' });
    // Keep the community style's place labels and buildings, while omitting
    // optional POI icons whose sprite variants may not be hosted by the source.
    for (const layer of map.getStyle().layers) {
      if (layer.type === 'symbol' && layer.layout?.['icon-image']) {
        map.setLayoutProperty(layer.id, 'icon-image', null);
      }
    }
  });
  map.on('load', async () => {
    loaded = true;
    hadMapError = false;
    hint.textContent = preference.matches ? 'Reduced motion · views change without flying' : 'Scroll to follow the journey';
    updateChapter(true); // Also restore the right destination after an anchor jump.
    try {
      setLandscapeChapter = await addNepalLandscape(map);
      setLandscapeChapter(active?.step ?? 0);
    } catch {
      hint.textContent = 'Landscape detail unavailable · the education journey still works';
    }
  });
  map.on('error', () => {
    if (!loaded && !hadMapError) {
      hadMapError = true;
      hint.textContent = 'Map tiles could not load. You can still read the story.';
    }
  });

  pauseButton.addEventListener('click', () => {
    paused = !paused;
    map.stop();
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.textContent = paused ? 'Resume journey' : 'Pause journey';
    hint.textContent = paused ? 'Map held in place' : preference.matches
      ? 'Reduced motion · views change without flying' : 'Scroll to follow the journey';
    if (!paused) updateChapter();
  });
  preference.addEventListener('change', () => {
    map.stop();
    if (loaded && active) showChapter(active, true);
    if (!paused) hint.textContent = preference.matches
      ? 'Reduced motion · views change without flying' : 'Scroll to follow the journey';
  });
  const resize = new ResizeObserver(() => {
    map.resize();
    if (loaded && !paused) updateChapter(true);
    else scheduleUpdate();
  });
  resize.observe(container);
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  updateChapter(true);

  if (import.meta.hot) import.meta.hot.dispose(() => {
    resize.disconnect();
    cancelAnimationFrame(pendingFrame);
    window.removeEventListener('scroll', scheduleUpdate);
    window.removeEventListener('resize', scheduleUpdate);
    map.remove();
    delete container.dataset.mounted;
  });
}
