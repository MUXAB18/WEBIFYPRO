import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

/**
 * MagneticCard — Zero-gravity 3D magnetic tilt system
 *
 * Physics model:
 *  - Mouse enter → spring scale-up (elastic.out)
 *  - Mouse move → rotateX/Y + translateZ toward viewer (depth pull)
 *  - Internal radial glow follows cursor within card
 *  - Mouse leave → spring return (elastic.out 1, 0.45)
 *
 * Usage:
 *   <MagneticCard glowColor="#00d4ff" data-cursor-color="#00d4ff">
 *     {children}
 *   </MagneticCard>
 */
export default function MagneticCard({
  children,
  glowColor = '#6366f1',
  tiltStrength = 18,
  scaleHover = 1.03,
  zDepth = 22,
  style,
  className,
  onClick,
  ...rest
}) {
  const wrapRef = useRef();
  const innerRef = useRef();
  const glowRef = useRef();

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && typeof navigator !== 'undefined' && 
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    
    if (isMobile) return;

    const wrap = wrapRef.current;
    const inner = innerRef.current;
    const glow = glowRef.current;
    if (!wrap || !inner) return;

    // Velocity tracking for cinematic feel
    let lastX = 0, lastY = 0;
    let velX = 0, velY = 0;

    const onEnter = () => {
      gsap.to(inner, {
        scale: scaleHover,
        z: zDepth,
        duration: 0.55,
        ease: 'elastic.out(1, 0.5)',
        overwrite: true,
      });
      if (glow) gsap.to(glow, { opacity: 1, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(inner, {
        rotateX: 0, rotateY: 0,
        scale: 1, z: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.45)',
        overwrite: true,
      });
      if (glow) {
        gsap.to(glow, {
          left: '50%', top: '50%',
          opacity: 0,
          duration: 0.5, ease: 'power2.out',
        });
      }
    };

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // −0.5 → +0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Velocity for roll effect
      velX = (e.clientX - lastX) * 0.5;
      velY = (e.clientY - lastY) * 0.5;
      lastX = e.clientX;
      lastY = e.clientY;

      gsap.to(inner, {
        rotateY: x * tiltStrength,
        rotateX: -y * tiltStrength,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      });

      // Move internal glow to cursor
      if (glow) {
        gsap.to(glow, {
          left: `${(x + 0.5) * 100}%`,
          top: `${(y + 0.5) * 100}%`,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('mousemove', onMove);

    return () => {
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('mousemove', onMove);
    };
  }, [tiltStrength, scaleHover, zDepth]);

  return (
    <div
      ref={wrapRef}
      style={{ perspective: '1000px', ...style }}
      className={className}
      onClick={onClick}
      {...rest}
    >
      <div
        ref={innerRef}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          position: 'relative',
          height: '100%',
        }}
      >
        {/* Radial glow that follows cursor inside card */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            width: '200px', height: '200px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${glowColor}28 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 0,
            left: '50%', top: '50%',
            opacity: 0,
            filter: 'blur(2px)',
          }}
        />
        {children}
      </div>
    </div>
  );
}
