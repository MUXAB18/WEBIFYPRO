import React, { useRef, useEffect } from 'react';
import { usePhysics } from '../../context/PhysicsContext';

/**
 * ParallaxLayer — CSS 3D depth layer driven by global physics mouse.
 *
 * depth: 1–8
 *   1 = closest (most responsive, moves most)
 *   8 = furthest (slowest, barely moves)
 *
 * The layer translates based on smoothMouse from PhysicsContext,
 * no extra RAF needed — uses CSS will-change + transform.
 */
export default function ParallaxLayer({ children, depth = 4, style, className }) {
  const ref = useRef();
  const physics = usePhysics();

  useEffect(() => {
    const el = ref.current;
    if (!el || !physics) return;

    // Strength inversely proportional to depth (closer = more movement)
    const strength = (9 - depth) * 5; // 1→40px, 8→5px

    let raf;
    const tick = () => {
      const p = physics.current;
      const dx = (p.smoothX - 0.5) * strength;
      const dy = (p.smoothY - 0.5) * strength;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [depth, physics]);

  return (
    <div
      ref={ref}
      style={{ willChange: 'transform', ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
