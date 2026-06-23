import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * GlitchText — Cinematic glitch + shimmer text effect
 *
 * - Shimmer: CSS animated gradient pass (always on)  
 * - Glitch: periodic GSAP timeline (skew + translate frames)
 * - Text stays readable at all times
 *
 * Usage:
 *   <GlitchText interval={5}>Building Digital</GlitchText>
 */
export default function GlitchText({ children, interval = 5, className, style }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer;

    const runGlitch = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Schedule next glitch with slight randomness
          timer = gsap.delayedCall(interval + Math.random() * 4, runGlitch);
        },
      });

      tl.to(el, { skewX: 10, x: 5, duration: 0.04, ease: 'none' })
        .to(el, { skewX: -7, x: -4, duration: 0.04, ease: 'none' })
        .to(el, { skewX: 4, x: 3, duration: 0.04, ease: 'none' })
        .to(el, { skewX: 0, x: 0, duration: 0.06, ease: 'power2.out' })
        .to(el, { skewX: -3, x: -2, duration: 0.03, ease: 'none' }, '+=0.05')
        .to(el, { skewX: 0, x: 0, duration: 0.08, ease: 'power3.out' });
    };

    // Initial delay before first glitch
    timer = gsap.delayedCall(2.5 + Math.random() * 2, runGlitch);

    return () => {
      timer?.kill();
      gsap.killTweensOf(el);
    };
  }, [interval]);

  return (
    <span
      ref={ref}
      className={`glitch-text-fx ${className || ''}`}
      style={{ display: 'inline-block', willChange: 'transform', ...style }}
    >
      {children}
    </span>
  );
}
