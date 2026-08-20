"use client";
import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, MessageCircle, X } from 'lucide-react';

/**
 * SubmissionPopup
 * Props:
 *   isOpen       – boolean, show/hide
 *   onClose      – fn, called when user dismisses
 *   waUrl        – full WhatsApp URL to open
 *   title        – headline text
 *   subtitle     – secondary text
 *   countdownSec – seconds before auto-redirect (default 4)
 */
const SubmissionPopup = ({
  isOpen,
  onClose,
  waUrl,
  title = 'Message Sent!',
  subtitle = "We've received your message. You can also chat with us directly on WhatsApp."
}) => {
  const [particles, setParticles] = useState([]);
  const openedRef = useRef(false);

  // Generate confetti particles once on open
  useEffect(() => {
    if (!isOpen) {
      openedRef.current = false;
      return;
    }

    const colors = ['#FF6B35', '#0B1E39', '#FF6B35', '#1E6FEA', '#0B1E39'];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.8}s`,
      duration: `${0.8 + Math.random() * 0.8}s`,
      size: `${6 + Math.random() * 8}px`,
      shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'diamond',
    }));
    setParticles(newParticles);
    openedRef.current = false;
  }, [isOpen]);

  const handleWhatsApp = () => {
    openedRef.current = true;
    if (waUrl) {
      const newWin = window.open(waUrl, '_blank');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        window.location.href = waUrl;
      }
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 99998,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          animation: 'popupFadeIn 0.3s ease',
        }}
      />

      {/* Confetti particles */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none', overflow: 'hidden' }}>
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              top: '-20px',
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'diamond' ? '2px' : '2px',
              transform: p.shape === 'diamond' ? 'rotate(45deg)' : 'none',
              animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
              opacity: 0.9,
            }}
          />
        ))}
      </div>

      {/* Modal card */}
      <div
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100000,
          width: 'min(440px, 92vw)',
          background: '#ffffff',
          border: '1px solid rgba(11,30,57,0.06)',
          borderRadius: '32px',
          padding: '48px 40px 40px',
          boxShadow: '0 32px 80px rgba(11, 30, 57, 0.12), 0 0 40px rgba(11, 30, 57, 0.04)',
          textAlign: 'center',
          animation: 'popupSlideUp 0.5s cubic-bezier(0.16,1,0.3,1)',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Glow bg */}
        <div style={{
          position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
          width: '260px', height: '260px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '28px', pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(11,30,57,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(11,30,57,0.02) 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: '#ffffff', border: '1px solid var(--color-border)',
            borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-faint)',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            zIndex: 10,
          }}
          className="popup-close-btn"
        >
          <X size={16} />
        </button>

        {/* Animated checkmark ring */}
        <div style={{
          position: 'relative', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
          width: '88px', height: '88px', marginBottom: '24px',
        }}>
          {/* Spinning ring */}
          <svg width="88" height="88" style={{ position: 'absolute', animation: 'spinRing 3s linear infinite' }}>
            <circle cx="44" cy="44" r="40" fill="none" stroke="rgba(255,107,53,0.2)" strokeWidth="2" />
            <circle cx="44" cy="44" r="40" fill="none" stroke="url(#grad)" strokeWidth="2.5"
              strokeDasharray="60 200" strokeLinecap="round" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FF8B55" />
              </linearGradient>
            </defs>
          </svg>
          {/* Inner glow circle */}
          <div style={{
            width: '68px', height: '68px', borderRadius: '50%',
            background: '#ffffff',
            border: '1px solid rgba(255,107,53,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'checkPop 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both',
            boxShadow: '0 0 30px rgba(255,107,53,0.15)',
          }}>
            <CheckCircle size={32} color="var(--color-accent)" />
          </div>
        </div>

        {/* Title */}
        <h2 className="popup-title" style={{
          fontWeight: '800', fontFamily: 'Outfit, sans-serif',
          color: 'var(--color-primary)', marginBottom: '12px', lineHeight: '1.2',
        }}>
          {title}
        </h2>

        {/* Subtitle */}
        <p className="popup-subtitle" style={{
          color: 'var(--color-text)', lineHeight: '1.65',
          margin: '0 auto 28px', maxWidth: '320px'
        }}>
          {subtitle}
        </p>

        {/* Info row */}
        <div style={{
          display: 'flex', gap: '10px', justifyContent: 'center',
          marginBottom: '32px', flexWrap: 'wrap',
        }}>
          {[
            { icon: '📧', label: 'Email sent' },
            { icon: '⚡', label: 'Response < 2h' },
          ].map(item => (
            <div key={item.label} className="popup-badge" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              borderRadius: '100px', background: '#ffffff',
              border: '1px solid rgba(11,30,57,0.1)',
              color: 'var(--color-primary)', fontWeight: '600',
              boxShadow: '0 2px 12px rgba(11,30,57,0.03)',
            }}>
              <span>{item.icon}</span><span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Manual WhatsApp CTA button */}
        <button
          onClick={handleWhatsApp}
          className="popup-wa-btn"
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #25D366, #20C05C)',
            border: 'none',
            borderRadius: '100px', fontWeight: '700', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            cursor: 'pointer', transition: 'all 0.3s ease',
            fontFamily: 'Outfit, sans-serif',
            boxShadow: '0 12px 32px rgba(37,211,102,0.25)',
            marginBottom: '20px'
          }}
        >
          <MessageCircle size={18} color="#fff" strokeWidth={2.5} />
          Continue to WhatsApp
        </button>

        {/* Dismiss link */}
        <button
          onClick={handleClose}
          style={{
            background: 'none', border: 'none',
            color: 'rgba(11,30,57,0.4)', fontSize: '0.8rem',
            cursor: 'pointer', padding: '8px',
            transition: 'color 0.2s ease',
            fontFamily: 'Outfit, sans-serif'
          }}
          className="popup-dismiss-btn"
        >
          Dismiss
        </button>


      </div>

      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 30px)) scale(0.94); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes checkPop {
          from { transform: scale(0.4); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseBg {
          from { background: rgba(37,211,102,0.02); box-shadow: 0 0 0 rgba(37,211,102,0); }
          to   { background: rgba(37,211,102,0.12); box-shadow: 0 0 20px rgba(37,211,102,0.2); }
        }
        .popup-wa-btn:hover {
          background: #20C05C !important;
          transform: translateY(-2px) !important;
        }
        .popup-close-btn:hover {
          background: rgba(11,30,57,0.08) !important;
          color: var(--color-primary) !important;
        }
        .popup-dismiss-btn:hover {
          color: rgba(11,30,57,0.7) !important;
        }

        /* Default (Desktop) */
        .popup-title { font-size: 1.8rem; }
        .popup-subtitle { font-size: 0.95rem; }
        .popup-badge { padding: 8px 18px; font-size: 0.85rem; }
        .popup-wa-btn { padding: 16px 24px; font-size: 1rem; }

        /* Mobile Responsive */
        @media (max-width: 480px) {
          .popup-title { font-size: 1.4rem !important; }
          .popup-subtitle { font-size: 0.85rem !important; margin-bottom: 16px !important; }
          .popup-badge { padding: 4px 10px !important; font-size: 0.7rem !important; }
          .popup-wa-btn { padding: 12px 18px !important; font-size: 0.85rem !important; }
        }
      `}</style>
    </>
  );
};

export default SubmissionPopup;
