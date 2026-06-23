import React, { useRef, useEffect } from 'react';
import { useMobile } from '../../hooks/useMobile';

/**
 * CursorFX — Premium custom cursor system
 * - Dot: follows mouse exactly (pinpoint precision)
 * - Ring: spring-physics lag (stiffness 0.18, damping 0.75)
 * - Trail: 8 particles cascading behind cursor
 * - Color: reads [data-cursor-color] from nearest element
 * - Morphs: scales up on buttons/cards, compresses on click
 */

const TRAIL_COUNT = 8;
const lerp = (a, b, t) => a + (b - a) * t;

export default function CursorFX() {
  const isMobile = useMobile();
  const dotRef = useRef();
  const ringRef = useRef();
  const trailRefs = useRef([]);

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trails = trailRefs.current.filter(Boolean);

    let mX = window.innerWidth / 2;
    let mY = window.innerHeight / 2;

    // Spring state for ring
    let rX = mX, rY = mY;
    let rVx = 0, rVy = 0;
    let rScale = 1, rScaleTarget = 1;

    // Trail cascade positions
    const tPos = Array.from({ length: TRAIL_COUNT }, () => ({ x: mX, y: mY }));

    // Cursor state
    let color = '#6366f1';
    let ringSize = 30;
    let isBtn = false;

    const onMove = (e) => {
      mX = e.clientX;
      mY = e.clientY;
    };

    const onMouseOver = (e) => {
      const el = e.target;
      if (!el) return;

      const btn = el.closest('button, a, [data-magnetic]');
      const card = el.closest('[data-cursor-color]');

      isBtn = !!btn;
      color = card?.dataset?.cursorColor || '#6366f1';
      ringSize = btn ? 48 : 30;
    };

    const onDown = () => { rScaleTarget = 0.55; };
    const onUp = () => { rScaleTarget = 1; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    let raf;
    const tick = () => {
      // Spring physics for ring (mass 1, stiffness 0.18, damping 0.75)
      rVx += (mX - rX) * 0.18;
      rVy += (mY - rY) * 0.18;
      rVx *= 0.75;
      rVy *= 0.75;
      rX += rVx;
      rY += rVy;

      // Smooth scale
      rScale = lerp(rScale, rScaleTarget, 0.2);

      // Cascade trail — each follows the one before it at decreasing speed
      let prevX = mX, prevY = mY;
      tPos.forEach((p, i) => {
        const t = 0.28 - i * 0.024;
        p.x = lerp(p.x, prevX, Math.max(t, 0.04));
        p.y = lerp(p.y, prevY, Math.max(t, 0.04));
        prevX = p.x;
        prevY = p.y;
      });

      // ── Render ──
      if (dot) {
        dot.style.cssText = `
          transform: translate(${mX - 4}px, ${mY - 4}px);
          background: ${color};
          box-shadow: 0 0 12px ${color}cc;
        `;
      }

      if (ring) {
        const half = (ringSize * rScale) / 2;
        ring.style.transform = `translate(${rX - half}px, ${rY - half}px) scale(${rScale})`;
        ring.style.width = ring.style.height = ringSize + 'px';
        ring.style.borderColor = color;
        ring.style.boxShadow = `0 0 ${isBtn ? '20px' : '8px'} ${color}55`;
        ring.style.background = isBtn ? color + '18' : 'transparent';
      }

      trails.forEach((trail, i) => {
        if (!trail) return;
        const p = tPos[i];
        const size = Math.max(4.5 - i * 0.42, 0.8);
        const opacity = ((TRAIL_COUNT - i) / TRAIL_COUNT) * 0.5;
        trail.style.transform = `translate(${p.x - size / 2}px, ${p.y - size / 2}px)`;
        trail.style.width = trail.style.height = size + 'px';
        trail.style.opacity = opacity;
        trail.style.background = color;
        trail.style.boxShadow = i < 3 ? `0 0 6px ${color}88` : 'none';
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Trail particles */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => (trailRefs.current[i] = el)}
          style={{
            position: 'fixed', top: 0, left: 0, zIndex: 99994,
            borderRadius: '50%', pointerEvents: 'none',
            willChange: 'transform, opacity',
            transition: 'background 0.2s ease',
          }}
        />
      ))}

      {/* Ring — spring lag */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          width: '30px', height: '30px', borderRadius: '50%',
          border: '1.5px solid #6366f1',
          pointerEvents: 'none', willChange: 'transform',
          transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1), height 0.25s cubic-bezier(0.4,0,0.2,1), background 0.25s ease, border-color 0.2s ease',
        }}
      />

      {/* Dot — exact position */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#6366f1',
          pointerEvents: 'none', willChange: 'transform',
          mixBlendMode: 'screen',
          transition: 'background 0.2s ease',
        }}
      />
    </>
  );
}
