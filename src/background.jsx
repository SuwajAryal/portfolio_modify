import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A stylised illustration of a catchment, not surveyed terrain or a flow model.
const riverX = z => Math.sin(z * 0.48) * 0.8;
const elevation = (x, z) => {
  const distance = Math.abs(x - riverX(z));
  const ridge = Math.pow(Math.min(distance / 4, 1), 1.2);
  return 0.02 + ridge * (1.2 + 1.1 * Math.pow(Math.sin(z * 0.65 + x * 0.6), 2))
    + Math.max(0, distance - 0.7) * 0.12 * Math.sin(x * 3 + z * 2);
};

function makeTerrain() {
  const geometry = new THREE.PlaneGeometry(14, 18, 90, 110);
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;
  const colors = new Float32Array(positions.count * 3);
  const low = new THREE.Color('#123e40');
  const high = new THREE.Color('#456975');
  const snow = new THREE.Color('#b6d7d9');
  for (let i = 0; i < positions.count; i++) {
    const y = elevation(positions.getX(i), positions.getZ(i));
    positions.setY(i, y);
    const color = low.clone().lerp(high, Math.min(y / 2.4, 1));
    if (y > 1.9) color.lerp(snow, Math.min((y - 1.9) * 1.7, 0.85));
    color.toArray(colors, i * 3);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function Landscape({ moving, pointer }) {
  const group = useRef();
  const particles = useRef();
  const phase = useRef(0);
  const terrain = useMemo(makeTerrain, []);
  const river = useMemo(() => new THREE.CatmullRomCurve3(
    Array.from({ length: 100 }, (_, i) => {
      const z = -8.9 + i / 99 * 17.8;
      return new THREE.Vector3(riverX(z), 0.15, z);
    })
  ), []);
  const flow = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(65 * 3);
    for (let i = 0; i < 65; i++) {
      const p = river.getPoint(i / 65);
      positions.set([p.x, p.y + 0.17, p.z], i * 3);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [river]);

  useEffect(() => () => { terrain.dispose(); flow.dispose(); }, [terrain, flow]);
  useFrame((_, delta) => {
    if (!moving) return;
    // Delta is elapsed time: movement stays consistent at different frame rates.
    phase.current += Math.min(delta, 0.05) * 0.045;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.current.x * 0.09, 3, delta);
    const position = particles.current.geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const p = river.getPoint((i / position.count + phase.current) % 1);
      position.setXYZ(i, p.x + Math.sin(i * 3.1) * 0.06, p.y + 0.17, p.z);
    }
    position.needsUpdate = true;
  });

  return <group ref={group} rotation={[0, -0.2, 0]}>
    <mesh geometry={terrain}><meshStandardMaterial vertexColors roughness={0.9} flatShading /></mesh>
    <mesh position={[0, 0.015, 0]} geometry={terrain}>
      <meshBasicMaterial color="#61c8bb" wireframe transparent opacity={0.045} />
    </mesh>
    <mesh>
      <tubeGeometry args={[river, 160, 0.13, 8, false]} />
      <meshStandardMaterial color="#09aeb6" emissive="#086a70" emissiveIntensity={0.65} roughness={0.3} />
    </mesh>
    <points ref={particles} geometry={flow} frustumCulled={false}>
      <pointsMaterial color="#b7ffe9" size={0.065} sizeAttenuation transparent opacity={0.85} />
    </points>
  </group>;
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="scene-fallback" /> : this.props.children; }
}

function Background() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(!document.hidden);
  const [supported, setSupported] = useState(true);
  const pointer = useRef({ x: 0 });
  useEffect(() => {
    const hero = document.getElementById('hero');
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = true;
    const update = () => setVisible(onScreen && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; update(); });
    const move = event => { pointer.current.x = event.clientX / innerWidth * 2 - 1; };
    const motion = () => setReduced(media.matches);
    observer.observe(hero);
    hero.addEventListener('pointermove', move, { passive: true });
    media.addEventListener('change', motion);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      hero.removeEventListener('pointermove', move);
      media.removeEventListener('change', motion);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  const moving = visible && !paused && !reduced;
  return <>
    <SceneBoundary>
      {supported && <Canvas camera={{ position: [7, 8, 11], fov: 43 }} dpr={[1, 1.5]}
        frameloop={moving ? 'always' : 'demand'} gl={{ antialias: true, alpha: true }}
        fallback={<div className="scene-fallback" />}
        onCreated={({ camera, gl }) => {
          camera.lookAt(0, 0, 0);
          gl.domElement.addEventListener('webglcontextlost', () => setSupported(false), { once: true });
        }}>
        <fog attach="fog" args={['#0b1120', 13, 29]} />
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 9, -5]} intensity={3} color="#bce7ee" />
        <pointLight position={[-4, 4, 3]} intensity={15} color="#34d399" />
        <Landscape moving={moving} pointer={pointer} />
      </Canvas>}
    </SceneBoundary>
    {createPortal(<div className="scene-caption">
      <span>HIMALAYAN FLOW <small>A stylised river catchment</small></span>
      <button type="button" onClick={() => setPaused(value => !value)}
        aria-pressed={paused} disabled={reduced || !supported}>
        {!supported ? 'Still background' : reduced ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion'}
      </button>
    </div>, document.getElementById('scene-controls'))}
  </>;
}

createRoot(document.getElementById('river-scene')).render(<Background />);
