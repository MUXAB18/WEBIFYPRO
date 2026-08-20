"use client";
import React from 'react';
import { 
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, 
  SiPostgresql, SiFramer, SiFigma, SiMongodb, SiShopify, SiFlutter, SiFirebase 
} from 'react-icons/si';

const technologies = [
  { name: "Next.js", icon: <SiNextdotjs size={18} /> },
  { name: "React", icon: <SiReact size={18} /> },
  { name: "React Native", icon: <SiReact size={18} /> },
  { name: "Flutter", icon: <SiFlutter size={18} /> },
  { name: "TypeScript", icon: <SiTypescript size={18} /> },
  { name: "Node.js", icon: <SiNodedotjs size={18} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={18} /> },
  { name: "Firebase", icon: <SiFirebase size={18} /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={18} /> },
  { name: "MongoDB", icon: <SiMongodb size={18} /> },
  { name: "Framer Motion", icon: <SiFramer size={18} /> },
  { name: "Figma", icon: <SiFigma size={18} /> },
  { name: "Shopify Plus", icon: <SiShopify size={18} /> },
];

const TechStack = () => {
  return (
    <section style={{ padding: 'var(--section-pad-y) var(--section-pad-x)', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        <p style={{ 
          fontSize: '0.85rem', 
          fontWeight: '600', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em', 
          color: 'var(--color-text)', 
          marginBottom: '32px' 
        }}>
          Engineered with modern technologies
        </p>
        
        <div className="tech-grid">
          {technologies.map((tech, idx) => (
            <div key={idx} className="tech-pill">
              <span className="tech-icon">{tech.icon}</span>
              {tech.name}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }
        .tech-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 100px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          color: var(--color-primary);
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: default;
        }
        .tech-pill:hover {
          border-color: var(--color-primary) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(11, 30, 57, 0.08);
          color: var(--color-accent) !important;
        }
        .tech-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }
        .tech-pill:hover .tech-icon {
          opacity: 1;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .tech-grid {
            gap: 10px;
          }
          .tech-pill {
            padding: 8px 14px;
            font-size: 0.85rem;
            gap: 6px;
          }
        }
      `}</style>
    </section>
  );
};

export default TechStack;
