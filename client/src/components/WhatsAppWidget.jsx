import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, ChevronRight, Globe, Megaphone, BarChart2, HelpCircle, Zap } from 'lucide-react';


const WA_NUMBER = '923708316591';

const menuItems = [
  {
    id: 'web',
    icon: <Globe size={18} />,
    label: 'Website Development',
    sublabel: 'React, MERN, Full-Stack',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.15)',
    border: 'rgba(0,212,255,0.25)',
    message: 'Hi Webify Pro! 👋 I\'m interested in getting a *Website* built. Can you share your packages and pricing?',
  },
  {
    id: 'marketing',
    icon: <Megaphone size={18} />,
    label: 'Digital Marketing',
    sublabel: 'Meta Ads, Facebook, Growth',
    color: '#ff006e',
    glow: 'rgba(255,0,110,0.15)',
    border: 'rgba(255,0,110,0.25)',
    message: 'Hi Webify Pro! 👋 I need help with *Digital Marketing* (Meta Ads / Social Media). Can you share details?',
  },
  {
    id: 'social',
    icon: <BarChart2 size={18} />,
    label: 'Social Media Management',
    sublabel: 'Instagram, TikTok, Strategy',
    color: '#06ffa5',
    glow: 'rgba(6,255,165,0.15)',
    border: 'rgba(6,255,165,0.25)',
    message: 'Hi Webify Pro! 👋 I\'m looking for *Social Media Management* services. What plans do you offer?',
  },
  {
    id: 'quote',
    icon: <Zap size={18} />,
    label: 'Get a Quick Quote',
    sublabel: 'Tell us your project idea',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.25)',
    message: 'Hi Webify Pro! 👋 I have a project idea and would like to get a *quick quote*. Can we talk?',
  },
  {
    id: 'other',
    icon: <HelpCircle size={18} />,
    label: 'General Inquiry',
    sublabel: 'Something else on your mind?',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.15)',
    border: 'rgba(99,102,241,0.25)',
    message: 'Hi Webify Pro! 👋 I have a general inquiry. Can you help me?',
  },
];

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [hasPopped, setHasPopped] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const widgetRef = useRef(null);

  // Auto-open hint after 8 seconds (only once)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasPopped) {
        setHasPopped(true);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [hasPopped]);

  // Stop pulse after first open
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleMenuClick = (item) => {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(item.message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      <div
        ref={widgetRef}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {/* ── POPUP PANEL ── */}
        <div
          className={`wa-popup-panel ${isOpen ? 'wa-popup-open' : ''}`}
          aria-hidden={!isOpen}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #128c7e, #25d366)',
            borderRadius: '18px 18px 0 0',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            {/* Avatar */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '1.3rem' }}>💼</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '0.95rem', lineHeight: 1.2 }}>
                Webify Pro
              </div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#a8f0bc', display: 'inline-block', boxShadow: '0 0 6px #a8f0bc' }} />
                Online — Typically replies instantly
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp menu"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '8px',
                width: '32px', height: '32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff',
                transition: 'background 0.2s ease',
                flexShrink: 0,
              }}
              className="wa-close-x"
            >
              <X size={16} />
            </button>
          </div>

          {/* Greeting bubble */}
          <div style={{
            padding: '16px 20px 12px',
            background: 'var(--surface-card, rgba(5,5,20,0.95))',
          }}>
            <div style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.18)',
              borderRadius: '4px 14px 14px 14px',
              padding: '12px 14px',
              color: 'var(--text-muted, rgba(255,255,255,0.75))',
              fontSize: '0.84rem',
              lineHeight: '1.5',
              maxWidth: '90%',
            }}>
              👋 Hey there! How can we help you today? <strong style={{ color: 'var(--text, #f9fafb)' }}>Pick a topic below</strong> and we'll be right with you on WhatsApp!
            </div>
          </div>

          {/* Menu options */}
          <div style={{
            background: 'var(--surface-card, rgba(5,5,20,0.95))',
            padding: '0 12px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`wa-menu-${item.id}`}
                onClick={() => handleMenuClick(item)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={`WhatsApp inquiry: ${item.label}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 12px',
                  background: hoveredId === item.id ? item.glow : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${hoveredId === item.id ? item.border : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.22s ease',
                  transform: hoveredId === item.id ? 'translateX(-3px)' : 'translateX(0)',
                  boxShadow: hoveredId === item.id ? `0 4px 18px ${item.glow}` : 'none',
                }}
              >
                {/* Icon badge */}
                <div style={{
                  width: '34px', height: '34px', borderRadius: '9px',
                  background: item.glow,
                  border: `1px solid ${item.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, flexShrink: 0,
                  transition: 'box-shadow 0.22s ease',
                  boxShadow: hoveredId === item.id ? `0 0 14px ${item.glow}` : 'none',
                }}>
                  {item.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    color: hoveredId === item.id ? item.color : 'var(--text, #f9fafb)',
                    fontWeight: '600', fontSize: '0.82rem',
                    transition: 'color 0.22s ease',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    color: 'var(--text-dim, rgba(255,255,255,0.45))',
                    fontSize: '0.7rem', marginTop: '1px',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {item.sublabel}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={15}
                  style={{
                    color: hoveredId === item.id ? item.color : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.22s ease',
                    transform: hoveredId === item.id ? 'translateX(2px)' : 'translateX(0)',
                    flexShrink: 0,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '0 0 20px 20px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem' }}>
              Powered by WhatsApp Business
            </span>
          </div>
        </div>

        {/* ── FAB BUTTON ── */}
        <div style={{ position: 'relative' }}>
          {/* Pulse ring */}
          {showPulse && !isOpen && (
            <span className="wa-fab-pulse" aria-hidden="true" />
          )}

          {/* Tooltip bubble */}
          {!isOpen && hasPopped && showPulse && (
            <div className="wa-tooltip-bubble">
              <span>💬 Chat with us!</span>
              <div className="wa-tooltip-arrow" />
            </div>
          )}

          <button
            id="wa-chat-widget-btn"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? 'Close WhatsApp chat menu' : 'Open WhatsApp chat menu'}
            aria-expanded={isOpen}
            className="wa-fab-btn"
          >
            <span className={`wa-fab-icon ${isOpen ? 'wa-icon-rotated' : ''}`}>
              {isOpen
                ? <X size={22} />
                : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                )
              }
            </span>
          </button>
        </div>
      </div>

      <style>{`
        /* ── FAB BUTTON ── */
        .wa-fab-btn {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #128c7e, #25d366);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 8px 28px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          position: relative;
          z-index: 2;
        }
        .wa-fab-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 36px rgba(37,211,102,0.55), 0 2px 8px rgba(0,0,0,0.4);
        }
        .wa-fab-btn:active { transform: scale(0.96); }

        /* Icon rotate on open */
        .wa-fab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
        }
        .wa-icon-rotated { transform: rotate(90deg); }

        /* ── PULSE RING ── */
        .wa-fab-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(37,211,102,0.5);
          animation: wa-pulse 2s ease-out infinite;
          pointer-events: none;
        }
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        /* ── TOOLTIP ── */
        .wa-tooltip-bubble {
          position: absolute;
          bottom: 68px;
          right: 0;
          background: var(--surface-card, rgba(5,5,20,0.95));
          border: 1px solid rgba(37,211,102,0.3);
          border-radius: 12px 12px 4px 12px;
          padding: 9px 14px;
          white-space: nowrap;
          color: var(--text, #f9fafb);
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35), 0 0 16px rgba(37,211,102,0.12);
          animation: wa-tooltip-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          pointer-events: none;
        }
        .wa-tooltip-arrow {
          position: absolute;
          bottom: -6px;
          right: 18px;
          width: 10px;
          height: 10px;
          background: var(--surface-card, rgba(5,5,20,0.95));
          border-right: 1px solid rgba(37,211,102,0.3);
          border-bottom: 1px solid rgba(37,211,102,0.3);
          transform: rotate(45deg);
        }
        @keyframes wa-tooltip-in {
          from { opacity: 0; transform: translateY(8px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── POPUP PANEL ── */
        .wa-popup-panel {
          width: 320px;
          border-radius: 20px;
          background: var(--surface-card, rgba(5,5,20,0.95));
          border: 1px solid rgba(37,211,102,0.2);
          box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(37,211,102,0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          overflow: hidden;
          transform-origin: bottom right;

          /* Hidden state */
          opacity: 0;
          transform: scale(0.85) translateY(16px);
          pointer-events: none;
          transition:
            opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wa-popup-open {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
        }

        /* ── CLOSE X HOVER ── */
        .wa-close-x:hover {
          background: rgba(255,255,255,0.25) !important;
        }

        /* ── LIGHT MODE ── */
        html.light-mode .wa-popup-panel {
          background: rgba(255,255,255,0.98) !important;
          border-color: rgba(37,211,102,0.25) !important;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 0 40px rgba(37,211,102,0.06) !important;
        }
        html.light-mode .wa-tooltip-bubble {
          background: rgba(255,255,255,0.98) !important;
          color: #0d0e1a !important;
          border-color: rgba(37,211,102,0.3) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
        }
        html.light-mode .wa-tooltip-arrow {
          background: rgba(255,255,255,0.98) !important;
        }

        /* ── MOBILE ── */
        @media (max-width: 480px) {
          .wa-popup-panel {
            width: calc(100vw - 24px);
            right: 0;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: rgba(5, 5, 20, 0.99) !important;
          }
          html.light-mode .wa-popup-panel {
            background: rgba(255,255,255,0.99) !important;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppWidget;
