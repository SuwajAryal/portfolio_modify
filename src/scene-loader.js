// Keep the portfolio content independent of the larger, optional 3D download.
const loadScene = () => import('./globe.jsx').then(module => module.mountGlobe()).catch(() => {
  document.getElementById('earth-globe').textContent = 'The globe is unavailable. You can still explore the portfolio below.';
});
if ('requestIdleCallback' in window) requestIdleCallback(loadScene, { timeout: 1200 });
else setTimeout(loadScene, 100);
