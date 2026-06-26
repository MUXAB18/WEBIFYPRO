import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const PROJECTS = [
  {
    title: 'WEB DEVELOPMENT',
    color: '#00d4ff',
    position: [3, 2.5, -8],
    rotOffset: 0,
  },
  {
    title: 'DIGITAL MARKETING',
    color: '#ff006e',
    position: [-2, -1.5, -12],
    rotOffset: 1.2,
  },
  {
    title: 'SOCIAL MEDIA MGT',
    color: '#06ffa5',
    position: [5, -2, -16],
    rotOffset: 2.4,
  },
];

function ProjectCard({ project }) {
  const groupRef = useRef();
  const planeRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime + project.rotOffset;
    if (groupRef.current) {
      groupRef.current.position.y = project.position[1] + Math.sin(t * 0.3) * 0.2;
    }
    if (planeRef.current) {
      planeRef.current.material.emissiveIntensity = 0.05 + Math.sin(t * 0.8) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      position={project.position}
      onClick={() => {
        const el = document.getElementById('portfolio');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      {/* Slower Float = less per-frame matrix recalculation */}
      <Float speed={0.5} floatIntensity={0.1} rotationIntensity={0.02}>
        {/* Card plane */}
        <mesh ref={planeRef}>
          <planeGeometry args={[3.2, 2.0, 1, 1]} />
          <meshStandardMaterial
            color="#0d0d1a"
            emissive={project.color}
            emissiveIntensity={0.06}
            transparent
            opacity={0.88}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Border glow — BackSide plane */}
        <mesh>
          <planeGeometry args={[3.28, 2.08, 1, 1]} />
          <meshBasicMaterial
            color={project.color}
            transparent
            opacity={0.18}
            side={2}
          />
        </mesh>

        {/* 2 corner accents instead of 4 */}
        {[[-1.55, 0.95, 0.01], [1.55, -0.95, 0.01]].map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.12, 0.12, 0.005]} />
            <meshBasicMaterial color={project.color} transparent opacity={0.85} />
          </mesh>
        ))}

        {/* Steady point light */}
        <pointLight color={project.color} intensity={0.6} distance={3} position={[0, 0, 0.5]} />
      </Float>
    </group>
  );
}

export default function ProjectCards3D() {
  return (
    <group>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </group>
  );
}
