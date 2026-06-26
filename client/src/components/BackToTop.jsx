import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * BackToTop — Floating animated back-to-top button.
 * Appears after scrolling past 400px, positioned bottom-left
 * (WA button occupies bottom-right).
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        id="back-to-top-btn"
        style={{
          position: 'fixed',
          bottom: '96px',
          left: '24px',
          zIndex: 998,
          width: '48px',
          height: '48px',

          borderRadius: '50%',
          background: 'rgba(3,7,18,0.82)',
          border: '1.5px solid rgba(99,102,241,0.5)',
          color: '#6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(99,102,241,0.25)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'all' : 'none',
        }}
        className="back-to-top-btn"
      >
        <ChevronUp size={22} strokeWidth={2.5} />
      </button>

      <style>{`
        .back-to-top-btn:hover {
          border-color: #6366f1 !important;
          background: rgba(99,102,241,0.15) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(99,102,241,0.45) !important;
          transform: translateY(-3px) scale(1.08) !important;
        }
      `}</style>
    </>
  );
};

export default BackToTop;
