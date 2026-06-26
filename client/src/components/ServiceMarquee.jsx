import React from 'react';
import { Code2, Megaphone, Cpu, Smartphone, MonitorSmartphone, Layers, Globe } from 'lucide-react';

const servicesList = [
  {
    name: 'Web Development',
    color: '#00d4ff',
    icon: <Code2 size={24} />
  },
  {
    name: 'Digital Marketing',
    color: '#ff006e',
    icon: <Megaphone size={24} />
  },
  {
    name: 'Mobile Application (Soon)',
    color: '#a855f7',
    icon: <Smartphone size={24} />
  },
  {
    name: 'Social Media Management',
    color: '#06ffa5',
    icon: <Cpu size={24} />
  },
  {
    name: 'UI/UX Design',
    color: '#FFB800',
    icon: <Layers size={24} />
  },
  {
    name: 'SEO Optimization',
    color: '#10B981',
    icon: <Globe size={24} />
  },
  {
    name: 'Web Applications',
    color: '#06B6D4',
    icon: <MonitorSmartphone size={24} />
  }
];

export default function ServiceMarquee() {
  return (
    <div className="service-marquee-container">
      <div className="service-marquee-overlay-left" />
      <div className="service-marquee-overlay-right" />
      
      <div className="service-marquee-track">
        {/* We duplicate the list twice to create an infinite seamless loop */}
        {[...servicesList, ...servicesList].map((svc, index) => (
          <div key={index} className="service-marquee-item">
            <span className="service-marquee-icon" style={{ color: svc.color }}>
              {svc.icon}
            </span>
            <span className="service-marquee-text">{svc.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .service-marquee-container {
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

        .service-marquee-overlay-left,
        .service-marquee-overlay-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }

        .service-marquee-overlay-left {
          left: 0;
          background: linear-gradient(to right, var(--bg, #010108), transparent);
        }

        .service-marquee-overlay-right {
          right: 0;
          background: linear-gradient(to left, var(--bg, #010108), transparent);
        }

        .service-marquee-track {
          display: flex;
          align-items: center;
          gap: 50px;
          width: max-content;
          animation: scroll-marquee 35s linear infinite;
        }

        .service-marquee-track:hover {
          animation-play-state: paused;
        }

        .service-marquee-item {
          display: flex;
          align-items: center;
          gap: 14px;
          white-space: nowrap;
        }

        .service-marquee-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 8px currentColor);
          opacity: 0.85;
          transition: opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease;
        }

        .service-marquee-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.65);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.3s ease, text-shadow 0.3s ease;
          cursor: default;
        }

        .service-marquee-item:hover .service-marquee-icon {
          opacity: 1;
          filter: drop-shadow(0 0 14px currentColor);
          transform: scale(1.15);
        }

        .service-marquee-item:hover .service-marquee-text {
          color: #fff;
          text-shadow: 0 0 16px rgba(255, 255, 255, 0.4);
        }

        @keyframes scroll-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Scroll exactly half of the total width (since items are duplicated) */
            transform: translateX(calc(-50% - 25px));
          }
        }

        /* Light mode adjustments */
        html.light-mode .service-marquee-container {
          background: rgba(255, 255, 255, 0.4);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        html.light-mode .service-marquee-overlay-left {
          background: linear-gradient(to right, #f8fafc, transparent);
        }
        
        html.light-mode .service-marquee-overlay-right {
          background: linear-gradient(to left, #f8fafc, transparent);
        }

        html.light-mode .service-marquee-text {
          color: rgba(0, 0, 0, 0.4);
        }
        
        html.light-mode .service-marquee-item:hover .service-marquee-text {
          color: #000;
          text-shadow: none;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .service-marquee-text {
            font-size: 1.1rem;
          }
          .service-marquee-icon svg {
            width: 22px;
            height: 22px;
          }
          .service-marquee-container {
            padding: 16px 0;
          }
          .service-marquee-track {
            gap: 30px;
          }
          @keyframes scroll-marquee {
            100% {
              transform: translateX(calc(-50% - 15px));
            }
          }
        }
      `}</style>
    </div>
  );
}
