// The portfolio stays readable while the optional map library loads.
const loadScene = () => import('./map-story.js').then(module => module.mountMapStory()).catch(() => {
  document.getElementById('journey-hint').textContent = 'The map is unavailable. Continue reading the story.';
  document.getElementById('journey-pause').hidden = true;
});
if ('requestIdleCallback' in window) requestIdleCallback(loadScene, { timeout: 1200 });
else setTimeout(loadScene, 100);
