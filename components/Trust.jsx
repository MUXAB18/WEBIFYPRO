"use client";
import React, { useEffect, useRef, useState } from 'react';

// Animated count-up stat component
function CountUpStat({ target, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          setCount(Math.round(current));
          if (current >= target) clearInterval(timer);
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{ flex: '1 1 200px', padding: '20px', textAlign: 'center' }}>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 'clamp(3rem, 5vw, 4rem)',
        fontWeight: '800',
        color: 'var(--color-primary)',
        lineHeight: '1',
        marginBottom: '12px',
        position: 'relative',
        display: 'inline-block',
      }}>
        {count}{suffix}
        <span style={{
          position: 'absolute',
          bottom: '10px', right: '-10px',
          width: '8px', height: '8px',
          background: 'var(--color-accent)',
          borderRadius: '50%',
        }} />
      </div>
      <div style={{
        fontSize: '1.1rem',
        color: 'var(--color-text)',
        fontWeight: '600',
      }}>
        {label}
      </div>
    </div>
  );
}

const Trust = () => {
  return (
    <section id="trust" style={{
      padding: '80px 6%',
      background: 'var(--color-bg)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '1.8rem',
            color: 'var(--color-primary)',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
          }}>
            Trusted digital solutions for ambitious businesses.
          </h2>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
        }}>
          <CountUpStat target={20} suffix="+" label="Projects Completed" />
          <CountUpStat target={5} suffix="+" label="Businesses Helped" />
          <CountUpStat target={5} suffix="+" label="Years of Experience" />
          <CountUpStat target={95} suffix="%" label="Client Satisfaction" />
        </div>
      </div>
    </section>
  );
};

export default Trust;
