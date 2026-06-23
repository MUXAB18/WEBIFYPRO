import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const PROJECTS = [
  {
    title: 'WEB DEVELOPMENT',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MERN'],
    color: '#00d4ff',
    position: [3, 2.5, -8],
    rotOffset: 0,
  },
  {
    title: 'DIGITAL MARKETING',
    category: 'Digital Marketing',
    tags: ['Meta Ads', 'Facebook', 'Growth'],
    color: '#ff006e',
    position: [-2, -1.5, -12],
    rotOffset: 1.2,
  },
  {
    title: 'MOBILE APP DEV',
    category: 'Mobile Application',
    tags: ['Flutter', 'Dart', 'Firebase'],
    color: '#a855f7',
    position: [5, -2, -16],
    rotOffset: 2.4,
  },
];

function ProjectCard({ project, index }) {
  const groupRef = useRef();
  const planeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime + project.rotOffset;
    if (groupRef.current) {
      groupRef.current.position.y = project.position[1] + Math.sin(t * 0.35) * 0.3;
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.04;
      groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.02;
    }
    if (planeRef.current) {
      planeRef.current.material.emissiveIntensity = hovered ? 0.3 : 0.05 + Math.sin(t) * 0.03;
    }
  });

  return (
    <group
      ref={groupRef}
      position={project.position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={() => {
        const el = document.getElementById('portfolio');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <Float speed={0.8} floatIntensity={0.15} rotationIntensity={0.03}>
        {/* Card plane */}
        <mesh ref={planeRef}>
          <planeGeometry args={[3.2, 2.0, 1, 1]} />
          <meshStandardMaterial
            color="#0d0d1a"
            emissive={project.color}
            emissiveIntensity={0.08}
            transparent
            opacity={0.92}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Border glow frame */}
        <mesh>
          <planeGeometry args={[3.28, 2.08, 1, 1]} />
          <meshBasicMaterial
            color={project.color}
            transparent
            opacity={hovered ? 0.5 : 0.2}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Neon corner accents */}
        {[[-1.55, 0.95, 0.01], [1.55, 0.95, 0.01], [-1.55, -0.95, 0.01], [1.55, -0.95, 0.01]].map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.12, 0.12, 0.005]} />
            <meshBasicMaterial color={project.color} transparent opacity={0.9} />
          </mesh>
        ))}

        {/* Point light for glow */}
        <pointLight
          color={project.color}
          intensity={hovered ? 3 : 0.8}
          distance={4}
          position={[0, 0, 0.5]}
        />

        {/* HTML overlay */}
        <Html center distanceFactor={8}>
          <div style={{
            width: '280px',
            padding: '18px 20px',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            {/* Category tag */}
            <div style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: '20px',
              border: `1px solid ${project.color}66`,
              color: project.color,
              fontSize: '0.65rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              marginBottom: '10px',
              textTransform: 'uppercase',
            }}>
              {project.category}
            </div>

            {/* Title */}
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: '800',
              fontSize: '0.95rem',
              color: '#ffffff',
              marginBottom: '8px',
              letterSpacing: '0.05em',
            }}>
              {project.title}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  padding: '2px 8px',
                  background: `${project.color}22`,
                  border: `1px solid ${project.color}44`,
                  borderRadius: '6px',
                  fontSize: '0.6rem',
                  color: project.color,
                  fontWeight: '600',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {hovered && (
              <div style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: project.color,
                fontSize: '0.72rem',
                fontWeight: '600',
              }}>
                <span style={{ width: '16px', height: '1px', background: project.color, display: 'inline-block' }} />
                View Project
              </div>
            )}
          </div>
        </Html>
      </Float>
    </group>
  );
}

export default function ProjectCards3D() {
  return (
    <group>
      {PROJECTS.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </group>
  );
}
