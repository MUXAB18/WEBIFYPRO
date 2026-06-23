import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const SERVICES = [
  {
    title: 'Web Development',
    desc: 'Custom high-performance websites built with React, Node.js & MERN stack.',
    icon: '⬡',
    color: '#00d4ff',
    emissive: '#004455',
    position: [-3.5, 1.2, -2],
    href: '#services',
  },
  {
    title: 'Digital Marketing',
    desc: 'Meta Ads, Facebook growth, and digital strategies to boost your presence.',
    icon: '◈',
    color: '#ff006e',
    emissive: '#440015',
    position: [-1.5, -1.8, -3],
    href: '#services',
  },
  {
    title: 'Mobile Applications',
    desc: 'Cross-platform mobile apps built with Flutter for iOS and Android.',
    icon: '◎',
    color: '#a855f7',
    emissive: '#2a0055',
    position: [-4.5, -0.5, -1],
    href: '#services',
  },
  {
    title: 'Social Media Mgmt',
    desc: 'Building and managing your brand presence across all major platforms.',
    icon: '✦',
    color: '#06ffa5',
    emissive: '#003322',
    position: [-2.2, 1.8, -4],
    href: '#services',
  },
];

function ServiceOrb({ service, index }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);
  const currentScale = useRef(1);

  useFrame((state) => {
    const t = state.clock.elapsedTime + index * 1.5;
    if (groupRef.current) {
      groupRef.current.position.y = service.position[1] + Math.sin(t * 0.5) * 0.15;
    }
    if (sphereRef.current) {
      sphereRef.current.material.emissiveIntensity = hovered ? 2.0 : 0.6 + Math.sin(t * 1.2) * 0.2;
      targetScale.current = hovered ? 1.3 : 1.0;
      currentScale.current += (targetScale.current - currentScale.current) * 0.08;
      sphereRef.current.scale.setScalar(currentScale.current);
    }
  });

  return (
    <group
      ref={groupRef}
      position={service.position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
        {/* Orb sphere */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={service.emissive}
            emissive={service.color}
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.025, 8, 60]} />
          <meshBasicMaterial color={service.color} transparent opacity={hovered ? 0.9 : 0.5} />
        </mesh>

        {/* Point light */}
        <pointLight color={service.color} intensity={hovered ? 4 : 1.5} distance={3} />

        {/* HTML overlay card */}
        <Html
          center
          distanceFactor={6}
          style={{
            width: '200px',
            pointerEvents: 'none',
            userSelect: 'none',
            transform: `translateY(${hovered ? '-70px' : '-55px'}) translateX(10px)`,
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div style={{
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${service.color}55`,
            borderRadius: '16px',
            padding: '14px 16px',
            boxShadow: hovered ? `0 0 30px ${service.color}44` : `0 0 12px ${service.color}22`,
            transition: 'all 0.4s ease',
            opacity: hovered ? 1 : 0.8,
          }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{service.icon}</div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: '700',
              fontSize: '0.85rem',
              color: service.color,
              marginBottom: '4px',
            }}>
              {service.title}
            </div>
            {hovered && (
              <div style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: '1.4',
              }}>
                {service.desc}
              </div>
            )}
          </div>
        </Html>
      </Float>

      {/* Connecting line to center (visual orbit trace) */}
      <mesh>
        <tubeGeometry args={[
          new THREE.LineCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(
              -service.position[0] * 0.4,
              -service.position[1] * 0.4,
              -service.position[2] * 0.4
            )
          ), 6, 0.005, 4, false
        ]} />
        <meshBasicMaterial color={service.color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function ServiceOrbs() {
  return (
    <group>
      {SERVICES.map((service, index) => (
        <ServiceOrb key={service.title} service={service} index={index} />
      ))}
    </group>
  );
}
