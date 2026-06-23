import React from 'react';

/**
 * ClientLogoMarquee — Infinite horizontally-scrolling marquee of client brands.
 * Pure CSS scroll animation, zero JS, zero performance overhead.
 */
const clients = [
  { name: 'Awan Digital', icon: '⬡' },
  { name: 'Nova Commerce', icon: '◈' },
  { name: 'SkyBridge Media', icon: '◎' },
  { name: 'PakStore', icon: '◆' },
  { name: 'ZenTech Labs', icon: '⬢' },
  { name: 'UrbanFit Co.', icon: '◉' },
  { name: 'BoldMark Agency', icon: '◇' },
  { name: 'EastEdge Studio', icon: '⬟' },
  { name: 'DataPulse', icon: '◐' },
  { name: 'VortexApps', icon: '◑' },
];

const ClientLogoMarquee = () => {
  const doubled = [...clients, ...clients]; // duplicate for seamless loop

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        padding: '0 0 8px',
        marginBottom: '-20px',
      }}
    >
      {/* Header label */}
      <p style={{
        textAlign: 'center',
        fontSize: '0.7rem',
        fontFamily: 'monospace',
        color: 'rgba(255,255,255,0.28)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}>
        Trusted by forward-thinking brands
      </p>

      {/* Gradient fade edges */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: '120px',
        background: 'linear-gradient(90deg, var(--background), transparent)',
        zIndex: 3,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0,
        width: '120px',
        background: 'linear-gradient(270deg, var(--background), transparent)',
        zIndex: 3,
        pointerEvents: 'none',
      }} />

      {/* Track */}
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          width: 'max-content',
          gap: '0',
        }}
      >
        {doubled.map((client, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 36px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #6366f1, #00d4ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {client.icon}
            </span>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '0.02em',
            }}>
              {client.name}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ClientLogoMarquee;
