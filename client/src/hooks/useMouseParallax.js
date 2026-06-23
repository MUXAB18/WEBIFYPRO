import { useRef, useEffect } from 'react';

export function useMouseParallax(strength = 0.05) {
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Call this in useFrame to get lerped values
  const getLerped = (delta = 0.016) => {
    smooth.current.x += (mouse.current.x - smooth.current.x) * (1 - Math.pow(0.85, delta * 60));
    smooth.current.y += (mouse.current.y - smooth.current.y) * (1 - Math.pow(0.85, delta * 60));
    return {
      x: smooth.current.x * strength,
      y: smooth.current.y * strength,
    };
  };

  return { mouse, smooth, getLerped };
}
