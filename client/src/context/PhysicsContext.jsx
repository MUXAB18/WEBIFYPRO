import React, { createContext, useContext, useRef, useEffect } from 'react';

/**
 * PhysicsContext — ONE global RAF loop for the entire app.
 * Provides:
 *   physics.current.mouseX/Y   — normalized 0–1 (smoothed, lag 0.07)
 *   physics.current.rawX/Y     — raw px position
 *   physics.current.scrollVel  — scroll velocity (px/frame, decays)
 *   physics.current.scrollY    — current scrollY
 */
const PhysicsCtx = createContext(null);
export const usePhysics = () => useContext(PhysicsCtx);

const lerp = (a, b, t) => a + (b - a) * t;

export function PhysicsProvider({ children }) {
  const physics = useRef({
    rawX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    rawY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    mouseX: 0.5,
    mouseY: 0.5,
    smoothX: 0.5,
    smoothY: 0.5,
    scrollVel: 0,
    scrollY: 0,
    prevScrollY: 0,
  });

  useEffect(() => {
    const p = physics.current;

    const onMouse = (e) => {
      p.rawX = e.clientX;
      p.rawY = e.clientY;
      p.mouseX = e.clientX / window.innerWidth;
      p.mouseY = e.clientY / window.innerHeight;
    };

    const onScroll = () => {
      p.scrollVel = window.scrollY - p.prevScrollY;
      p.prevScrollY = p.scrollY;
      p.scrollY = window.scrollY;
    };

    let raf;
    const tick = () => {
      p.smoothX = lerp(p.smoothX, p.mouseX, 0.07);
      p.smoothY = lerp(p.smoothY, p.mouseY, 0.07);
      p.scrollVel = lerp(p.scrollVel, 0, 0.12);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <PhysicsCtx.Provider value={physics}>{children}</PhysicsCtx.Provider>;
}
