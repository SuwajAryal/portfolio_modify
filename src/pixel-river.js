// Arrange existing community pixel-art assets into a vertical river landscape.
// This is a Nepal-inspired illustration, not a surveyed map or flow simulation.
// Original artwork, exact source links, and licences: public/pixel-river/CREDITS.md.
const canvas = document.getElementById('pixel-river');
const ctx = canvas.getContext('2d');
const pause = document.getElementById('pixel-river-pause');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
ctx.imageSmoothingEnabled = false;

async function loadSprite(filename) {
  const image = new Image();
  image.src = `${import.meta.env.BASE_URL}pixel-river/${filename}`;
  await image.decode();
  return image;
}

async function mountRiver() {
  const [snow, world, cliffs, water] = await Promise.all([
    loadSprite('snow-mountains.png'), loadSprite('punyworld.png'),
    loadSprite('cliffs.png'), loadSprite('flowing-water.png'),
  ]);
  // Cache the terrain. Only the small river surface needs to change each frame.
  const terrain = document.createElement('canvas');
  terrain.width = canvas.width;
  terrain.height = canvas.height;
  const ground = terrain.getContext('2d');
  ground.imageSmoothingEnabled = false;

  // Original snowy mountain background, followed by existing top-down ground tiles.
  ground.fillStyle = '#e5ece8';
  ground.fillRect(0, 0, 192, 640);
  ground.drawImage(snow, 0, 0, snow.width, snow.height, 0, 0, 192, 180);
  for (let y = 180; y < 640; y += 16) {
    for (let x = 0; x < 192; x += 16) {
      // Puny World's rocky uplands, green ground, then pale cultivated land.
      const source = y < 244 ? [64, 16] : y < 456 ? [0, 0] : [192, 0];
      ground.drawImage(world, ...source, 16, 16, x, y, 16, 16);
    }
  }
  // Ansimuz's cliff sprites form the valley sides and two elevation drops.
  for (const [x, y] of [[0,180],[144,180],[0,276],[144,340]]) {
    ground.drawImage(cliffs, 112, 16, 48, 96, x, y, 48, 96);
  }
  for (const [x, y] of [[0,250],[140,268],[0,326],[142,404],[10,406]]) {
    ground.drawImage(world, 0, 112, 48, 48, x, y, 48, 48);
  }
  // Existing small trees, stones, and crops add detail without new artwork.
  for (const [x,y] of [[12,474],[144,468],[20,548],[154,590],[18,600]]) {
    ground.drawImage(world, 0, 416, 16, 16, x, y, 16, 16);
  }
  for (let y = 500; y < 620; y += 32) {
    for (const x of [12,28,148,164]) ground.drawImage(world, 32, 448, 16, 16, x, y, 16, 16);
  }

  // Channel control points are layout coordinates, not real river coordinates.
  // All channels join the same trunk. Water gets wider as it reaches the plains.
  const channels = [
    { width: 6, points: [[100,142],[108,180],[92,216],[92,244]] },
    { width: 10, points: [[92,244],[60,284],[60,312],[104,360],[104,392],[68,432],[68,460]] },
    { width: 20, points: [[68,460],[92,496],[120,528],[104,568],[76,604],[76,644]] },
    { width: 5, points: [[26,246],[26,268],[60,300]] },
    { width: 6, points: [[170,304],[148,328],[104,360]] },
  ];
  const riverPixels = [];
  for (const channel of channels) {
    for (let segment = 1; segment < channel.points.length; segment++) {
      const [x1,y1] = channel.points[segment - 1];
      const [x2,y2] = channel.points[segment];
      for (let y = y1; y < y2; y += 2) {
        const x = Math.round((x1 + (x2 - x1) * (y - y1) / (y2 - y1)) / 2) * 2;
        riverPixels.push({ x: x - channel.width / 2, y, width: channel.width });
      }
    }
  }
  // Rotate the artist's 13-frame right-to-left water strip so it flows downward.
  const waterTile = document.createElement('canvas');
  waterTile.width = waterTile.height = 16;
  const tile = waterTile.getContext('2d');
  tile.imageSmoothingEnabled = false;
  let frame = 0;
  let timer;
  let held = reducedMotion.matches;
  function draw() {
    ctx.drawImage(terrain, 0, 0);
    tile.clearRect(0, 0, 16, 16);
    tile.save();
    tile.translate(0, 16);
    tile.rotate(-Math.PI / 2);
    tile.drawImage(water, frame * 16, 0, 16, 16, 0, 0, 16, 16);
    tile.restore();
    // Pixel-width banks connect the reused ground art to the animated water.
    ctx.fillStyle = '#d5ca9f';
    for (const pixel of riverPixels) ctx.fillRect(pixel.x - 2, pixel.y, pixel.width + 4, 2);
    ctx.fillStyle = ctx.createPattern(waterTile, 'repeat');
    for (const pixel of riverPixels) ctx.fillRect(pixel.x, pixel.y, pixel.width, 2);
    frame = (frame + 1) % 13;
  }
  function syncPlayback() {
    clearInterval(timer);
    pause.setAttribute('aria-pressed', String(held));
    pause.textContent = held ? 'Play water' : 'Pause water';
    if (!held && !document.hidden) timer = setInterval(draw, 110);
  }
  draw();
  syncPlayback();
  pause.addEventListener('click', () => { held = !held; syncPlayback(); });
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', () => { held = reducedMotion.matches; syncPlayback(); });
}
mountRiver().catch(() => {
  pause.hidden = true;
  canvas.setAttribute('aria-label', 'Landscape illustration unavailable. The portfolio remains readable.');
});
