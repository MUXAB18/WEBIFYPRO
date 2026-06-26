import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Simple pulse ring — no individual useFrame, driven by parent
function PulseRing({ radius, color, phaseOffset = 0 }) {
  const ref = useRef();
  // Store ref for parent to update
  ref._phaseOffset = phaseOffset;
  ref._color = color;
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      {/* Reduced segments 80→32 — saves ~60% vertex count */}
      <torusGeometry args={[radius, 0.02, 6, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} depthWrite={false} />
    </mesh>
  );
}

function OrbitingParticles({ count = 40, radius = 2.8 }) {
  const ref = useRef();
  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.6;
      positions[i * 3] = Math.cos(angle) * (radius + jitter);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 2] = Math.sin(angle) * (radius + jitter);
    }
    return { positions };
  }, [count, radius]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00d4ff" size={0.05} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function AIPlanet() {
  const groupRef = useRef();
  const sphereRef = useRef();
  const wireRef = useRef();
  const glowRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(0);
      gsap.to(groupRef.current.scale, {
        x: 1, y: 1, z: 1,
        duration: 2,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.3,
      });
    }
  }, []);

  // Single combined useFrame — was 5 separate (PulseRing x3 + OrbitingParticles + AIPlanet)
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.10;
      sphereRef.current.rotation.x = Math.sin(t * 0.07) * 0.12;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.06;
      wireRef.current.rotation.z = t * 0.04;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.10 + Math.sin(t * 1.0) * 0.03;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.35) * 0.12;
    }
    // Pulse rings driven from here — no child useFrame overhead
    if (ring1Ref.current) {
      const s1 = 1 + Math.sin(t * 1.0) * 0.07;
      ring1Ref.current.scale.setScalar(s1);
      ring1Ref.current.material.opacity = 0.25 + Math.sin(t * 1.0) * 0.15;
    }
    if (ring2Ref.current) {
      const s2 = 1 + Math.sin(t * 0.7 + 1) * 0.07;
      ring2Ref.current.scale.setScalar(s2);
      ring2Ref.current.material.opacity = 0.25 + Math.sin(t * 0.7 + 1) * 0.15;
    }
    if (ring3Ref.current) {
      const s3 = 1 + Math.sin(t * 1.3 + 2) * 0.07;
      ring3Ref.current.scale.setScalar(s3);
      ring3Ref.current.material.opacity = 0.25 + Math.sin(t * 1.3 + 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, 0, 0]}>
      {/* Core sphere — meshStandardMaterial replaces MeshDistortMaterial (huge GPU saving) */}
      <mesh ref={sphereRef}>
        {/* Reduced detail: icosahedron detail 4→2 */}
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#1a0a3e"
          emissive="#6366f1"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Outer glow shell — reduced segments 32x32 → 16x16 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.10}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Pulse rings — controlled by parent useFrame above */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 6, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.02, 6, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.02, 6, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} depthWrite={false} />
      </mesh>

      {/* Orbiting particles */}
      <OrbitingParticles count={30} radius={3.0} />

      {/* Floating logo text */}
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25}>
        <Text
          position={[0, 2.6, 0]}
          fontSize={0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"
          outlineWidth={0.01}
          outlineColor="#6366f1"
        >
          WEBIFY PRO
        </Text>
      </Float>

      {/* Reduced to 1 local point light — was 2 */}
      <pointLight color="#6366f1" intensity={6} distance={8} />
    </group>
  );
}

