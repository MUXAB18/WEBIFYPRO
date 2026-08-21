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
    <div ref={ref} className="stat-card">
      <div className="stat-number">
        {count}{suffix}
        <span className="stat-dot" />
      </div>
      <div className="stat-label">
        {label}
      </div>
    </div>
  );
}

const Trust = ({ stats = {} }) => {
  
  const parseNumber = (numStr) => {
    if (!numStr) return { target: 0, suffix: '' };
    const match = String(numStr).match(/^(\d+)(.*)$/);
    if (match) {
      return { target: parseInt(match[1], 10), suffix: match[2] };
    }
    return { target: parseInt(numStr, 10) || 0, suffix: '' };
  };

  const statsList = stats?.stats && stats.stats.length > 0 ? stats.stats : [
    { number: '20+', label: 'Projects Completed' },
    { number: '5+', label: 'Businesses Helped' },
    { number: '5+', label: 'Years of Experience' },
    { number: '95%', label: 'Client Satisfaction' }
  ];
  return (
    <section id="trust" style={{
      padding: 'var(--section-pad-y) var(--section-pad-x)',
      background: 'var(--color-surface)',
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
            {stats.title || 'Trusted digital solutions for ambitious businesses.'}
          </h2>
        </div>

        <div className="trust-grid">
          {statsList.map((stat, idx) => {
            const { target, suffix } = parseNumber(stat.number);
            return <CountUpStat key={idx} target={target} suffix={suffix} label={stat.label} />;
          })}
        </div>
      </div>

      <style>{`
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .stat-card {
          padding: 20px;
          text-align: center;
        }
        .stat-number {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: var(--color-primary);
          line-height: 1;
          margin-bottom: 12px;
          position: relative;
          display: inline-block;
        }
        .stat-dot {
          position: absolute;
          bottom: 8px;
          right: -12px;
          width: 8px;
          height: 8px;
          background: var(--color-accent);
          border-radius: 50%;
        }
        .stat-label {
          font-size: 1.1rem;
          color: var(--color-text);
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .stat-card {
            padding: 12px;
          }
          .stat-label {
            font-size: 0.9rem;
          }
        }
        @media (max-width: 480px) {
          /* If they truly want 4 in a row, they can change this to repeat(4, 1fr), but 2x2 is best for readability */
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default Trust;
