import React from 'react';

const technologies = [
  {
    name: 'React',
    color: '#61DAFB',
    icon: (
      <svg width="24" height="24" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: 'Next.js',
    color: '#FFFFFF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.1" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="currentColor"/>
        <path d="M115.012 54H127.125V125.97H115.012V54Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Node.js',
    color: '#339933',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.896.104l-10.42 6.002A1.218 1.218 0 00.865 7.16v9.682a1.21 1.21 0 00.61 1.053l10.42 6.002a1.22 1.22 0 001.218 0l10.42-6.002a1.218 1.218 0 00.61-1.053V7.16a1.218 1.218 0 00-.61-1.054L13.114.104a1.223 1.223 0 00-1.218 0zM12 17.585l-4.148-2.396V10.4l4.148-2.396 4.148 2.396v4.789L12 17.585z"/>
      </svg>
    )
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.666 18.52c-2.385-2.023-4.576-6.19-4.576-9.605 0-2.32 1.583-4.838 3.52-6.85.454-.47 1.033-.942 1.055-1.57.042.846 1.48 2.222 1.942 2.766 1.63 1.91 2.923 4.12 2.923 6.136 0 3.125-1.633 6.942-3.834 9.123-.332.328-.682.686-1.03.8v4.61s-.494.07-1.127-.584v-4.826H11.666z"/>
      </svg>
    )
  },
  {
    name: 'Meta Ads',
    color: '#0668E1',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm5.176 16.5c-2.008 0-3.66-1.242-4.57-3.08-1.077 2.18-3.14 3.08-5.068 3.08-2.83 0-5.038-2.05-5.038-4.5s2.208-4.5 5.038-4.5c2.036 0 3.738 1.096 4.7 2.87 1.134-2.32 3.16-2.87 5.114-2.87 2.83 0 5.148 2.05 5.148 4.5s-2.318 4.5-5.148 4.5h-.176z"/>
      </svg>
    )
  },
  {
    name: 'Instagram',
    color: '#E4405F',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
      </svg>
    )
  },
  {
    name: 'TikTok',
    color: '#00F2FE',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.025c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.5 5.39-3.79 6.88-2.29 1.48-5.32 1.65-7.75.46-2.43-1.18-4.22-3.41-4.71-6.02-.49-2.6.21-5.35 1.87-7.4 1.65-2.04 4.18-3.29 6.79-3.27v4.06c-1.37-.02-2.73.49-3.71 1.45-.98.96-1.53 2.33-1.47 3.7.06 1.36.72 2.67 1.79 3.51 1.07.84 2.47 1.11 3.79.74 1.32-.36 2.4-1.32 2.93-2.58.53-1.26.54-2.7.01-3.96V.025h2.47z"/>
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    color: '#06B6D4',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    )
  },
  {
    name: 'SEO',
    color: '#10B981',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <path d="M11 8v6"></path>
        <path d="M8 11h6"></path>
      </svg>
    )
  },
  {
    name: 'Google Ads',
    color: '#EA4335',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.111 14.477l-4.522-2.607a.644.644 0 010-1.118l4.522-2.607a.644.644 0 01.966.559v5.214a.644.644 0 01-.966.559z"/>
      </svg>
    )
  }
];

export default function TechStrip() {
  return (
    <div className="tech-strip-container">
      <div className="tech-strip-overlay-left" />
      <div className="tech-strip-overlay-right" />
      
      <div className="tech-strip-track">
        {/* We duplicate the list twice to create an infinite seamless loop */}
        {[...technologies, ...technologies].map((tech, index) => (
          <div key={index} className="tech-strip-item">
            <span className="tech-strip-icon" style={{ color: tech.color }}>
              {tech.icon}
            </span>
            <span className="tech-strip-text">{tech.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .tech-strip-container {
          position: relative;
          width: 100%;
          padding: 24px 0;
          overflow: hidden;
          background: rgba(3, 7, 18, 0.4);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          z-index: 5;
        }

        .tech-strip-overlay-left,
        .tech-strip-overlay-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }

        .tech-strip-overlay-left {
          left: 0;
          background: linear-gradient(to right, var(--bg, #010108), transparent);
        }

        .tech-strip-overlay-right {
          right: 0;
          background: linear-gradient(to left, var(--bg, #010108), transparent);
        }

        .tech-strip-track {
          display: flex;
          align-items: center;
          gap: 40px;
          width: max-content;
          animation: scroll-tech 35s linear infinite;
        }

        .tech-strip-track:hover {
          animation-play-state: paused;
        }

        .tech-strip-item {
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
        }

        .tech-strip-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 8px currentColor);
          opacity: 0.8;
          transition: opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease;
        }

        .tech-strip-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.3rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.3s ease, text-shadow 0.3s ease;
          cursor: default;
        }

        .tech-strip-item:hover .tech-strip-icon {
          opacity: 1;
          filter: drop-shadow(0 0 12px currentColor);
          transform: scale(1.1);
        }

        .tech-strip-item:hover .tech-strip-text {
          color: #fff;
          text-shadow: 0 0 16px rgba(255, 255, 255, 0.4);
        }

        @keyframes scroll-tech {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Scroll exactly half of the total width (since items are duplicated) */
            transform: translateX(calc(-50% - 20px));
          }
        }

        /* Light mode adjustments */
        html.light-mode .tech-strip-container {
          background: rgba(255, 255, 255, 0.4);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        html.light-mode .tech-strip-overlay-left {
          background: linear-gradient(to right, #f8fafc, transparent);
        }
        
        html.light-mode .tech-strip-overlay-right {
          background: linear-gradient(to left, #f8fafc, transparent);
        }

        html.light-mode .tech-strip-text {
          color: rgba(0, 0, 0, 0.4);
        }
        
        html.light-mode .tech-strip-item:hover .tech-strip-text {
          color: #000;
          text-shadow: none;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .tech-strip-text {
            font-size: 1rem;
          }
          .tech-strip-icon svg {
            width: 20px;
            height: 20px;
          }
          .tech-strip-container {
            padding: 16px 0;
          }
        }
      `}</style>
    </div>
  );
}
