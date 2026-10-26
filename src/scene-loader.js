// Keep the portfolio content independent of the larger, optional 3D download.
const loadScene = () => import('./background.jsx').catch(() => {
  document.getElementById('scene-controls').textContent = '';
});
if ('requestIdleCallback' in window) requestIdleCallback(loadScene, { timeout: 1200 });
else setTimeout(loadScene, 100);
