// Adapted from Vasco Asturiano's MIT-licensed React Globe.gl country example.
// Data revisions and license notices are documented in SOURCES.md.
import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Globe from 'react-globe.gl';
import { MeshPhongMaterial } from 'three';
import { loadGeography } from './geographic-data';

const NEPAL = { lat: 28.3, lng: 84, altitude: 1.65 };
const WORLD = { lat: 18, lng: 70, altitude: 2.4 };
const HOME = [{ lat: 27.7172, lng: 85.324, text: 'Kathmandu' }];

class GlobeBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <div className="globe-message">The interactive globe needs WebGL. Your portfolio is still available below.</div>
      : this.props.children;
  }
}

function EarthExplorer() {
  const globe = useRef();
  const viewport = useRef();
  const onScreen = useRef(true);
  const [size, setSize] = useState({ width: 600, height: 580 });
  const [geography, setGeography] = useState(null);
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const [riversVisible, setRiversVisible] = useState(true);
  const [bordersVisible, setBordersVisible] = useState(true);
  const [selectedRiver, setSelectedRiver] = useState('');
  const [hovered, setHovered] = useState(null);
  const [status, setStatus] = useState('Himalayan headwaters · Nepal');
  const [rotating, setRotating] = useState(false);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const material = useMemo(() => new MeshPhongMaterial({ color: '#071e2e', shininess: 18 }), []);

  useEffect(() => {
    const abort = new AbortController();
    loadGeography(abort.signal).then(setGeography).catch(error => {
      if (error.name !== 'AbortError') setError(true);
    });
    return () => abort.abort();
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: Math.round(entry.contentRect.width), height: Math.round(entry.contentRect.height) });
    });
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const controls = globe.current.controls();
    controls.autoRotate = rotating && !reduced;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom = false; // Let the mouse wheel scroll the page.
    controls.enablePan = false;
    controls.enableDamping = !reduced;
  }, [ready, rotating, reduced]);

  useEffect(() => {
    if (!ready) return;
    const update = () => {
      if (document.hidden || !onScreen.current) globe.current.pauseAnimation();
      else globe.current.resumeAnimation();
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
      update();
    });
    observer.observe(viewport.current);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [ready]);

  useEffect(() => () => material.dispose(), [material]);

  function focus(view, description) {
    if (!globe.current || !ready) return;
    setRotating(false);
    globe.current.pointOfView(view, reduced ? 0 : 1100);
    setStatus(description);
  }

  function focusRiver(name) {
    setSelectedRiver(name);
    setRiversVisible(true);
    const path = geography?.rivers.find(river => river.name === name);
    if (!path) return;
    const [lng, lat] = path.coordinates[Math.floor(path.coordinates.length / 2)];
    focus({ lat, lng, altitude: 1.25 }, `${name} · Natural Earth river line`);
  }

  function nudge(degrees) {
    const current = globe.current.pointOfView();
    focus({ ...current, lng: current.lng + degrees }, 'Exploring the globe');
  }

  const riverOptions = ['Ganges', 'Brahmaputra', 'Nile', 'Amazonas'].filter(
    name => geography?.rivers.some(river => river.name === name)
  );

  return <>
    <div className="globe-heading"><span className="live-dot" /> EARTH / RIVER SYSTEMS <span>01 — EXPLORE</span></div>
    <div className="globe-viewport" ref={viewport}>
      {error ? <div className="globe-message">Map data could not load. Please refresh to try again.</div>
        : !geography ? <div className="globe-message">Loading the world’s rivers…</div>
        : <Globe ref={globe} width={size.width} height={size.height}
          backgroundColor="rgba(0,0,0,0)" globeMaterial={material}
          atmosphereColor="#44bfc8" atmosphereAltitude={0.14}
          showGraticules animateIn={false}
          polygonsData={geography.countries}
          polygonCapColor={country => country.properties.ADM0_A3 === 'NPL' ? '#eac17f'
            : country === hovered ? '#2d7781' : '#163c4b'}
          polygonSideColor={() => '#15333d'}
          polygonStrokeColor={() => bordersVisible ? '#50848d' : null}
          polygonAltitude={0.003} polygonsTransitionDuration={0}
          polygonLabel={country => country.properties.ADMIN}
          onPolygonHover={setHovered}
          onPolygonClick={(country, event, coordinates) => focus(
            { ...coordinates, altitude: 1.45 }, country.properties.ADMIN
          )}
          pathsData={riversVisible ? geography.rivers : []}
          pathPoints="coordinates" pathPointLat={point => point[1]} pathPointLng={point => point[0]}
          pathPointAlt={0.014} pathColor={path => path.name === selectedRiver ? '#ffcf7e' : '#62dfd5'}
          pathStroke={path => path.name === selectedRiver ? 2.6 : 1.25} pathLabel="name" pathTransitionDuration={0}
          onPathClick={path => focusRiver(path.name)}
          labelsData={HOME} labelText="text" labelSize={0.7} labelDotRadius={0.25}
          labelColor={() => '#ffe0ab'} labelAltitude={0.015}
          onGlobeReady={() => {
            globe.current.pointOfView(NEPAL, 0);
            globe.current.renderer().setPixelRatio(Math.min(devicePixelRatio, 1.5));
            globe.current.renderer().domElement.setAttribute('aria-hidden', 'true');
            setReady(true);
          }}
        />}
      <div className="globe-drag-hint">Drag to explore <span>·</span> Select a river below</div>
    </div>
    <div className="globe-toolbar" aria-label="Globe controls">
      <div className="globe-view-buttons">
        <button disabled={!ready} onClick={() => { setSelectedRiver(''); focus(NEPAL, 'Himalayan headwaters · Nepal'); }}>Nepal</button>
        <button disabled={!ready} onClick={() => { setSelectedRiver(''); focus(WORLD, 'World river systems'); }}>World</button>
        <button disabled={!ready} aria-label="Rotate globe west" onClick={() => nudge(-30)}>←</button>
        <button disabled={!ready} aria-label="Rotate globe east" onClick={() => nudge(30)}>→</button>
      </div>
      <select aria-label="Focus on a river" disabled={!ready} value={selectedRiver}
        onChange={event => focusRiver(event.target.value)}>
        <option value="" disabled>Explore a river</option>
        {riverOptions.map(name => <option key={name} value={name}>{name === 'Amazonas' ? 'Amazon' : name}</option>)}
        {selectedRiver && !riverOptions.includes(selectedRiver) && <option>{selectedRiver}</option>}
      </select>
    </div>
    <div className="globe-layers" aria-label="Map layers">
      <button disabled={!ready} aria-pressed={riversVisible} onClick={() => setRiversVisible(!riversVisible)}><i className="layer-dot river-dot" /> Rivers</button>
      <button disabled={!ready} aria-pressed={bordersVisible} onClick={() => setBordersVisible(!bordersVisible)}><i className="layer-dot border-dot" /> Borders</button>
      <button disabled={!ready || reduced} aria-pressed={rotating} onClick={() => setRotating(!rotating)}>{reduced ? 'Reduced motion' : rotating ? 'Stop rotation' : 'Auto-rotate'}</button>
    </div>
    <div className="globe-meta"><p role="status">{status}</p><a href="./sources.html">Map & code credits ↗</a></div>
  </>;
}

export function mountGlobe() {
  const host = document.getElementById('earth-globe');
  const root = host.__globeRoot ??= createRoot(host);
  root.render(<GlobeBoundary><EarthExplorer /></GlobeBoundary>);
}
