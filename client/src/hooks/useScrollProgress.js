import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(sy);
      setScrollProgress(maxScroll > 0 ? sy / maxScroll : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Returns which section is currently in view (0-based index)
  const getSectionIndex = (numSections) => {
    return Math.min(Math.floor(scrollProgress * numSections), numSections - 1);
  };

  return { scrollY, scrollProgress, getSectionIndex };
}
