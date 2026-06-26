import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const SERVICES = [
  {
    title: 'Web Development',
    color: '#00d4ff',
    emissive: '#004455',
    position: [-3.5, 1.2, -2],
  },
  {
    title: 'Digital Marketing',
    color: '#ff006e',
    emissive: '#440015',
    position: [-1.5, -1.8, -3],
  },
  {
    title: 'E-Commerce',
    color: '#f59e0b',
    emissive: '#3d2800',
    position: [-4.5, -0.5, -1],
  },
  {
    title: 'Social Media Mgmt',
    color: '#06ffa5',
    emissive: '#003322',
    position: [-2.2, 1.8, -4],
  },
];

function ServiceOrb({ service, index }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const currentScale = useRef(1);

  useFrame((state) => {
    const t = state.clock.elapsedTime + index * 1.5;
    if (groupRef.current) {
      groupRef.current.position.y = service.position[1] + Math.sin(t * 0.45) * 0.12;
    }
    if (sphereRef.current) {
      sphereRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 1.0) * 0.15;
    }
  });

  return (
    <group
      ref={groupRef}
      position={service.position}
      onClick={() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <Float speed={1.0} rotationIntensity={0.06} floatIntensity={0.15}>
        {/* Orb sphere — reduced 32x32 → 16x16 segments */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={service.emissive}
            emissive={service.color}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Glow ring — reduced segments 60 → 24 */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.025, 6, 24]} />
          <meshBasicMaterial color={service.color} transparent opacity={0.5} />
        </mesh>

        {/* Point light — reduced intensity range */}
        <pointLight color={service.color} intensity={1.2} distance={2.5} />
      </Float>
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


