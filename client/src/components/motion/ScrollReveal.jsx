import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal — Cinematic Z-depth scroll reveal
 *
 * Elements fly in from depth (Z-axis) as user scrolls.
 * Simulates "jumping through space-time layers" on section entry.
 *
 * directions: 'up' | 'down' | 'left' | 'right' | 'depth' | 'scale'
 */
const PRESETS = {
  up:    { y: 70, z: -60, rotateX: 12, opacity: 0 },
  down:  { y: -70, z: -60, rotateX: -12, opacity: 0 },
  left:  { x: 80, z: -60, rotateY: -14, opacity: 0 },
  right: { x: -80, z: -60, rotateY: 14, opacity: 0 },
  depth: { z: -150, scale: 0.75, opacity: 0 },
  scale: { scale: 0.6, z: -80, opacity: 0 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  stagger = 0,
  style,
  className,
}) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from = { ...PRESETS[direction] };
    const to = { y: 0, x: 0, z: 0, scale: 1, rotateX: 0, rotateY: 0, opacity: 1 };

    // Strip out heavy 3D transforms on mobile to ensure buttery smooth scrolling
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      if (from.z) delete from.z;
      if (from.rotateX) delete from.rotateX;
      if (from.rotateY) delete from.rotateY;
    }

    const targets = stagger > 0 ? el.children : el;

    const tween = gsap.fromTo(
      targets,
      { ...from, transformOrigin: 'center center', transformPerspective: 900 },
      {
        ...to,
        duration,
        delay,
        ease: 'power3.out',
        stagger,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, delay, duration, stagger]);

  return (
    <div
      ref={ref}
      style={{ willChange: 'transform, opacity', ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
