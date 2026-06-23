import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function PulseRing({ radius, color, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.scale.setScalar(1 + Math.sin(t) * 0.08);
      ref.current.material.opacity = 0.3 + Math.sin(t) * 0.2;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} />
    </mesh>
  );
}

function OrbitingParticles({ count = 60, radius = 2.8 }) {
  const ref = useRef();
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.6;
      positions[i * 3] = Math.cos(angle) * (radius + jitter);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 2] = Math.sin(angle) * (radius + jitter);
      sizes[i] = Math.random() * 0.06 + 0.02;
    }
    return { positions, sizes };
  }, [count, radius]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial color="#00d4ff" size={0.05} transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function AIPlanet() {
  const groupRef = useRef();
  const sphereRef = useRef();
  const wireRef = useRef();
  const glowRef = useRef();

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

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.12;
      sphereRef.current.rotation.x = Math.sin(t * 0.07) * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.08;
      wireRef.current.rotation.z = t * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.12 + Math.sin(t * 1.2) * 0.04;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, 0, 0]}>
      {/* Core glowing sphere */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[1.6, 6]} />
        <MeshDistortMaterial
          color="#1a0a3e"
          emissive="#6366f1"
          emissiveIntensity={0.8}
          distort={0.25}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.65, 3]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Pulse rings */}
      <PulseRing radius={2.0} color="#6366f1" speed={1.0} />
      <PulseRing radius={2.4} color="#00d4ff" speed={0.7} />
      <PulseRing radius={2.8} color="#a855f7" speed={1.4} />

      {/* Orbiting particles */}
      <OrbitingParticles count={80} radius={3.0} />

      {/* Floating logo text */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
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

      {/* Point light for local glow */}
      <pointLight color="#6366f1" intensity={8} distance={8} />
      <pointLight color="#00d4ff" intensity={4} distance={6} position={[2, 1, 2]} />
    </group>
  );
}
