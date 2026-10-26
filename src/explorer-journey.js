// The owner-selected four-frame pixel scenes are local assets. Ordinary CSS
// handles crossfades; this module connects the page chapters and pause controls.
const scenes = {
  himalayas:{step:'01 / 03',region:'HIMALAYAS',title:'Every river starts somewhere.',description:'Cold air, snowy trails, and the first headwaters.'},
  hills:{step:'02 / 03',region:'THE HILLS',title:'Following the ridgeline.',description:'Green slopes, winding paths, and rivers finding their way downstream.'},
  terai:{step:'03 / 03',region:'THE TERAI',title:'Room for the river to breathe.',description:'The land opens out. A wider channel, quieter banks, and a different pace.'},
};
const panel=document.querySelector('.landscape-panel');
const sections=[...document.querySelectorAll('body > [data-landscape-region]')];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let held=reducedMotion.matches;
let active='himalayas';
let pending=0;

// On phones, show the same artwork at the start of each chapter rather than
// squeezing the reading column beside a large fixed panel.
for (const [name,target] of [['himalayas','.hero-cta'],['hills','#expTimeline'],['terai','#skillsFlex']]) {
  const figure=document.createElement('figure');
  figure.className='mobile-landscape';
  figure.dataset.mobileRegion=name;
  figure.innerHTML=`<img data-scene="${name}" src="${import.meta.env.BASE_URL}journey-art/${name}-still.png" alt="${scenes[name].description}" loading="lazy"><figcaption><span>${scenes[name].region}</span><button type="button" data-art-pause aria-pressed="false">Pause animation</button></figcaption>`;
  document.querySelector(target).before(figure);
}
const images=[...document.querySelectorAll('[data-scene]')];
const controls=[...document.querySelectorAll('[data-art-pause]')];

function updatePlayback() {
  controls.forEach(button=>{
    button.setAttribute('aria-pressed',String(held));
    button.textContent=held?'Play animation':'Pause animation';
  });
  const phone=matchMedia('(max-width:768px)').matches;
  images.forEach(image=>{
    const visibleSurface=phone?!!image.closest('.mobile-landscape'):!!image.closest('.landscape-panel');
    const playing=visibleSurface&&image.dataset.scene===active&&!held&&!document.hidden;
    const desired=`${import.meta.env.BASE_URL}journey-art/${image.dataset.scene}${playing?'':'-still'}.${playing?'gif':'png'}`;
    if(image.getAttribute('src')!==desired) image.setAttribute('src',desired);
  });
}
function showScene(name) {
  active=name;
  const scene=scenes[name];
  document.getElementById('landscape-step').textContent=scene.step;
  document.getElementById('landscape-region').textContent=scene.region;
  document.getElementById('landscape-title').textContent=scene.title;
  document.getElementById('landscape-description').textContent=scene.description;
  document.querySelectorAll('.landscape-image').forEach(image=>{
    const selected=image.dataset.scene===name;
    image.classList.toggle('is-active',selected);
    image.setAttribute('aria-hidden',String(!selected));
  });
  document.querySelectorAll('[data-region-link]').forEach(link=>{
    if(link.dataset.regionLink===name) link.setAttribute('aria-current','step');
    else link.removeAttribute('aria-current');
  });
  updatePlayback();
}
function updateJourney() {
  pending=0;
  let next='himalayas';
  let safeWidth=Infinity;
  for (const section of sections) {
    const bounds=section.getBoundingClientRect();
    if(bounds.top<=innerHeight*.45) next=section.dataset.landscapeRegion;
    // Reserve the narrower width while that chapter is on screen. This avoids
    // covering its text during a transition to a wider landscape below.
    if(bounds.bottom>-100&&bounds.top<innerHeight+100) {
      safeWidth=Math.min(safeWidth,parseFloat(getComputedStyle(section).marginLeft)||0);
    }
  }
  if(Number.isFinite(safeWidth)) panel.style.setProperty('--journey-width',`${safeWidth}px`);
  if(next!==active) showScene(next);
}
function scheduleJourney() { if(!pending)pending=requestAnimationFrame(updateJourney); }
controls.forEach(button=>button.addEventListener('click',()=>{held=!held;updatePlayback();}));
window.addEventListener('scroll',scheduleJourney,{passive:true});
window.addEventListener('resize',()=>{updateJourney();updatePlayback();},{passive:true});
document.addEventListener('visibilitychange',updatePlayback);
reducedMotion.addEventListener('change',()=>{held=reducedMotion.matches;updatePlayback();});
showScene(active);
updateJourney();
