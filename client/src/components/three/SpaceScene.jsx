import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import ParticleField from './ParticleField';
import AIPlanet from './AIPlanet';
import ServiceOrbs from './ServiceOrbs';
import ProjectCards3D from './ProjectCards3D';

import { useMobile } from '../../hooks/useMobile';

const lerp = (a, b, t) => a + (b - a) * t;

// ── Cache scroll outside useFrame to avoid layout reflow every frame ──
let cachedScrollProgress = 0;
if (typeof window !== 'undefined') {
  const updateScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    cachedScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
}

function CinematicCamera() {
  const { camera } = useThree();
  const smooth = useRef({ x: 0, y: 0, z: 8, roll: 0 });
  const mouseVel = useRef({ x: 0, prevX: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = state.pointer.x * 0.5;
    const my = state.pointer.y * 0.3;
    mouseVel.current.x = mx - mouseVel.current.prevX;
    mouseVel.current.prevX = mx;

    // Use cached value — no layout reflow
    const s = smooth.current;
    s.x = lerp(s.x, mx, 0.03);
    s.y = lerp(s.y, my, 0.03);
    const targetZ = 8 - cachedScrollProgress * 14;
    s.z = lerp(s.z, targetZ, 0.03);
    const rollTarget = -mouseVel.current.x * 2.5;
    s.roll = lerp(s.roll, rollTarget, 0.05);
    const breathe = Math.sin(t * 0.4) * 0.05;

    camera.position.x = s.x;
    camera.position.y = s.y + breathe;
    camera.position.z = s.z;
    camera.rotation.z = s.roll;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 8, 8]} />
      <meshBasicMaterial color="#6366f1" wireframe />
    </mesh>
  );
}

export default function SpaceScene() {
  const isMobile = useMobile();
  const [isLight, setIsLight] = useState(
    () => document.documentElement.classList.contains('light-mode')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light-mode'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (isLight) return null;

  // Cap DPR aggressively — biggest single win for fill-rate jitter
  const dpr = isMobile ? [1, 1] : [1, Math.min(window.devicePixelRatio, 1.2)];

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={dpr}
      gl={{
        antialias: false,            // Disable MSAA — huge GPU saving, barely visible
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,              // Not needed, saves memory bandwidth
        depth: true,
      }}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        background: 'linear-gradient(135deg, #010108 0%, #050118 50%, #010108 100%)',
      }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} color="#a855f7" intensity={2.0} />
      <pointLight position={[10, 5, 5]} color="#00d4ff" intensity={1.5} />
      {/* Removed 3rd point light — reduces draw calls */}

      <CinematicCamera />

      <Suspense fallback={<LoadingFallback />}>
        <ParticleField />
        <AIPlanet />
        <ServiceOrbs />
        <ProjectCards3D />
      </Suspense>
    </Canvas>
  );
}
