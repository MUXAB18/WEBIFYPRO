import React, { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';

/**
 * CookieBanner — Minimal GDPR consent banner.
 * Appears once per device, persisted via localStorage.
 */
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('webify_cookie_consent');
    if (!consent) {
      // Show after small delay so it doesn't compete with page load
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('webify_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('webify_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="cookie-banner"
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99990,
        width: 'min(560px, 92vw)',
        background: 'rgba(6,6,20,0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: '20px',
        padding: '20px 24px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        animation: 'cookieSlideUp 0.45s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: 'rgba(99,102,241,0.15)',
        border: '1px solid rgba(99,102,241,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6366f1',
        flexShrink: 0,
      }}>
        <Cookie size={18} />
      </div>

      {/* Text */}
      <p style={{
        flex: 1,
        fontSize: '0.82rem',
        color: 'rgba(255,255,255,0.7)',
        lineHeight: '1.5',
        minWidth: '180px',
        margin: 0,
      }}>
        We use cookies to enhance your experience.{' '}
        <a
          href="#"
          style={{ color: '#6366f1', textDecoration: 'underline', fontWeight: '600' }}
          onClick={e => e.preventDefault()}
        >
          Learn more
        </a>
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: '8px 16px',
            borderRadius: '100px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'Outfit, sans-serif',
          }}
          className="cookie-decline-btn"
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            padding: '8px 18px',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            border: 'none',
            color: '#fff',
            fontSize: '0.8rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s ease',
            fontFamily: 'Outfit, sans-serif',
            boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
          }}
          className="cookie-accept-btn"
        >
          <Check size={13} />
          Accept
        </button>
      </div>

      {/* Close X */}
      <button
        onClick={decline}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.3)',
          cursor: 'pointer',
          padding: '4px',
          lineHeight: 1,
        }}
      >
        <X size={14} />
      </button>

      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .cookie-decline-btn:hover { border-color: rgba(255,255,255,0.3) !important; color: #fff !important; }
        .cookie-accept-btn:hover { box-shadow: 0 6px 20px rgba(99,102,241,0.5) !important; transform: translateY(-1px); }
      `}</style>
    </div>
  );
};

export default CookieBanner;
