"use client";
import React, { useState, useRef, useEffect, memo } from 'react';
import { X, ChevronRight } from 'lucide-react';

const WA_NUMBER = '923708316591';

const OPTIONS = [
  { label: '🌐 Website Design', msg: "Hi Webify Pro! I'm interested in a new website design. Could you share some details?" },
  { label: '🛒 E-Commerce Store', msg: "Hi Webify Pro! I want to build an E-Commerce store. Can we discuss this?" },
  { label: '🎨 UI/UX Branding', msg: "Hi Webify Pro! I need help with UI/UX and branding. What are your packages?" },
  { label: '📈 Digital Marketing', msg: "Hi Webify Pro! I'm interested in your digital marketing / SEO services." },
  { label: '💬 General Inquiry', msg: "Hi Webify Pro! I have a general question." }
];

const WhatsAppWidget = memo(function WhatsAppWidget({ isTouchDevice }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const widgetRef = useRef(null);
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSendToWhatsApp = (msg) => {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || 'Hello Webify Pro!')}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleOptionClick = (msg) => {
    handleSendToWhatsApp(msg);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    handleSendToWhatsApp(customMsg);
    setCustomMsg('');
  };


  return (
    <div ref={widgetRef} style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      
      {/* Menu Popup */}
      <div 
        style={{
          position: 'absolute',
          bottom: '100%',
          right: '0',
          marginBottom: '16px',
          width: '280px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'bottom right'
        }}
      >
        {/* Header */}
        <div style={{
          background: '#25D366',
          padding: '16px 20px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <BotIcon />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700' }}>Webify Pro</h4>
            <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.9 }}>Hi! How can we help you? 👋</p>
          </div>
        </div>

        {/* Options */}
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {OPTIONS.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt.msg)}
              className="wa-option-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 14px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: 'var(--color-primary)',
                fontSize: '0.85rem',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{opt.label}</span>
              <ChevronRight size={14} color="var(--color-primary)" style={{ opacity: 0.5 }} />
            </button>
          ))}
        </div>
        
        {/* Custom Message Input */}
        <form onSubmit={handleCustomSubmit} style={{
          padding: '12px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          gap: '8px',
          background: '#f8f9fa'
        }}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={customMsg}
            onChange={(e) => setCustomMsg(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 14px',
              border: '1px solid var(--color-border)',
              borderRadius: '20px',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: 'Outfit, sans-serif'
            }}
          />
          <button 
            type="submit"
            disabled={!customMsg.trim()}
            style={{
              background: customMsg.trim() ? '#25D366' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: customMsg.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <div style={{ position: 'relative' }}>
        {/* Pulsing ring behind button */}
        {!isOpen && (
          <div className="wa-pulse-ring" style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            borderRadius: '50%', background: '#25D366', zIndex: -1,
            pointerEvents: 'none', opacity: 0.3
          }} />
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`wa-fab-btn ${isOpen ? 'active' : ''}`}
          aria-label="Toggle WhatsApp Menu"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#25D366',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative'
          }}
        >
          {/* Notification Badge */}
          {!isOpen && (
            <span style={{
              position: 'absolute', top: '-2px', right: '-2px', width: '14px', height: '14px',
              background: '#FF0000', border: '2px solid var(--color-bg)', borderRadius: '50%', zIndex: 2
            }} />
          )}
          
          {isOpen ? <X size={26} /> : <WhatsAppIcon size={32} />}
        </button>
      </div>

      <style>{`
        @keyframes waPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .wa-pulse-ring {
          animation: waPulse 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .wa-option-btn:hover {
          background: rgba(11, 30, 57, 0.05) !important;
          transform: translateX(4px);
        }
        .wa-fab-btn:hover {
          box-shadow: 0 12px 40px rgba(37, 211, 102, 0.5) !important;
          transform: translateY(-2px);
        }
        .wa-fab-btn.active {
          background: var(--color-primary) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
          transform: rotate(90deg);
        }
      `}</style>
    </div>
  );
});

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function BotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

export default WhatsAppWidget;
